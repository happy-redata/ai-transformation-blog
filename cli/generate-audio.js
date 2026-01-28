#!/usr/bin/env node
/**
 * Audio Generation CLI for happymates-blob
 * Uses Azure Cognitive Services Speech SDK to generate MP3 audio from posts
 * 
 * Usage: node cli/generate-audio.js [slug] [--all] [--locale=da|en]
 */

import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const SPEECH_REGION = process.env.AZURE_SPEECH_REGION;

if (!SPEECH_KEY || !SPEECH_REGION) {
    console.error('❌ Missing AZURE_SPEECH_KEY or AZURE_SPEECH_REGION in .env');
    process.exit(1);
}

// Voice configuration
const VOICES = {
    da: 'da-DK-ChristelNeural',
    en: 'en-US-JennyNeural'
};

// Directories
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'posts');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Get all posts for a locale
 */
function getAllPosts(locale) {
    const postsDir = path.join(CONTENT_DIR, locale);

    if (!fs.existsSync(postsDir)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDir);
    return fileNames
        .map(fileName => {
            const fullPath = path.join(postsDir, fileName);
            const stat = fs.statSync(fullPath);

            let slug = fileName.replace(/\.mdx?$/, '');
            let fileContentPath = fullPath;
            let outputDir = OUTPUT_DIR; // Default to public/audio for backward compatibility or simplistic handling

            if (stat.isDirectory()) {
                slug = fileName;
                const indexMdx = path.join(fullPath, 'index.mdx');
                const indexMd = path.join(fullPath, 'index.md');

                if (fs.existsSync(indexMdx)) {
                    fileContentPath = indexMdx;
                    outputDir = OUTPUT_DIR; // Use global OUTPUT_DIR (public/audio)
                } else if (fs.existsSync(indexMd)) {
                    fileContentPath = indexMd;
                    outputDir = OUTPUT_DIR;
                } else {
                    return null;
                }
            } else if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) {
                return null;
            } else {
                outputDir = OUTPUT_DIR;
            }

            const fileContents = fs.readFileSync(fileContentPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                content,
                locale,
                outputDir // Pass the desired output directory
            };
        })
        .filter(Boolean);
}

/**
 * Convert markdown tables to speech-friendly format
 * Each row is read with column headers repeated for context
 * Example: "| Header1 | Header2 |\n|---|---|\n| A | B |" 
 *   -> "Header1: A. Header2: B."
 */
function convertTablesToSpeech(content) {
    // Split content into lines for processing
    const lines = content.split('\n');
    const result = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Check if this looks like a table header row (starts and ends with |)
        if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
            // Check if next line is a separator row (contains only |, -, :, and spaces)
            const nextLine = lines[i + 1] || '';
            if (/^\|[-:\s|]+\|$/.test(nextLine.trim())) {
                // This is a table! Parse headers
                const headers = line
                    .split('|')
                    .slice(1, -1) // Remove empty first and last from split
                    .map(h => h.trim());

                // Skip header and separator rows
                i += 2;

                // Process data rows
                const speechRows = [];
                while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
                    const row = lines[i];
                    const cells = row
                        .split('|')
                        .slice(1, -1)
                        .map(c => c.trim());

                    // Pair each cell with its header
                    const pairs = headers.map((header, idx) => {
                        let cellValue = cells[idx] || '';
                        // Extract text from Voice tags for speech
                        cellValue = cellValue.replace(/<Voice[^>]*>([^<]*)<\/Voice>/g, '$1');
                        return `${header}: ${cellValue}`;
                    });

                    speechRows.push(pairs.join('. ') + '.');
                    i++;
                }

                result.push(speechRows.join('\n\n'));
                continue;
            }
        }

        result.push(line);
        i++;
    }

    return result.join('\n');
}

/**
 * Clean markdown content for speech synthesis and handle custom tags
 */
function cleanContentForSpeech(content) {
    // 0. Convert tables to speech-friendly format (before other cleaning)
    let cleaned = convertTablesToSpeech(content);

    // 1. Handle Voice tags: <Voice text="Say this" lang="en-US">Show this</Voice>
    cleaned = cleaned.replace(/<Voice\s+([^>]+)>([\s\S]*?)<\/Voice>/g, (match, attributes) => {
        const textMatch = attributes.match(/text="([^"]*)"/);
        const langMatch = attributes.match(/lang="([^"]*)"/);

        const text = textMatch ? textMatch[1] : '';

        if (langMatch) {
            return `<lang xml:lang="${langMatch[1]}">${text}</lang>`;
        }
        return text;
    });

    // 2. Handle Speak tags: <Speak>Say this</Speak> -> Say this
    cleaned = cleaned.replace(/<Speak>([\s\S]*?)<\/Speak>/g, '$1');

    // 3. Handle View tags: <View>Show this</View> -> (empty)
    cleaned = cleaned.replace(/<View>([\s\S]*?)<\/View>/g, '');

    // 4. Handle Pause tags: <Pause duration={2} /> -> <break time="2000ms" />
    cleaned = cleaned.replace(/<Pause\s+duration={(\d+)}[^>]*\/>/g, (match, sec) => {
        return `<break time="${sec}s" />`;
    });

    // 5. Remove OTHER MDX/JSX components (but keep <break /> and <lang>)
    cleaned = cleaned.replace(/<(?!\/?(break|lang))[^>]+>/g, '');

    // 6. Standard Markdown cleaning
    cleaned = cleaned
        // REMOVE ENTIRE HEADING LINES (including the heading text) - don't read headings aloud
        .replace(/^#{1,6}\s+.*$/gm, '')
        // Convert blockquotes with attribution: > "Quote" - Author -> Ifølge Author: Quote
        .replace(/^>\s*"([^"]+)"\s*[-–—]\s*(.+)$/gm, (match, quote, author) => {
            return `Ifølge ${author}: ${quote}`;
        })
        // Convert simple blockquotes: > Quote -> Quote
        .replace(/^>\s+/gm, '')
        // Remove bold/italic markers
        .replace(/\*\*|__/g, '')
        .replace(/\*|_/g, '')
        // Remove ordered list numbers at the start of lines (e.g., "1. ", "2. ")
        .replace(/^\s*\d+\.\s+/gm, '')
        // Remove links, keep text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        // Remove horizontal rules
        .replace(/^---+$/gm, '')
        // Remove emojis
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        // Clean up multiple newlines
        .replace(/\n{2,}/g, '\n\n')
        .trim();

    return cleaned;
}

/**
 * Escape text for SSML
 */
function escapeSsml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        // Since we want to keep our <break /> tags, we un-escape them
        .replace(/&lt;break time=&quot;([^&]+)&quot; \/&gt;/g, '<break time="$1" />')
        // Un-escape <lang> tags
        .replace(/&lt;lang xml:lang=&quot;([^&]+)&quot;&gt;([\s\S]*?)&lt;\/lang&gt;/g, '<lang xml:lang="$1">$2</lang>');
}

/**
 * Generate audio for a single post
 */
/**
 * Generate audio for a single post
 */
async function generateAudio(slug, content, locale, targetDir) {
    return new Promise((resolve, reject) => {
        const cleanContent = cleanContentForSpeech(content);
        const escapedContent = escapeSsml(cleanContent);

        const ssml = `
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${locale}">
    <voice name="${VOICES[locale]}">
        <prosody rate="1.0">
            ${escapedContent}
        </prosody>
    </voice>
</speak>`.trim();

        const outputDir = targetDir || OUTPUT_DIR; // Use targetDir if provided
        // Ensure directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const speechFile = path.join(outputDir, `${slug}-${locale}-speech.wav`);
        const finalFile = path.join(outputDir, `${slug}-${locale}.wav`);

        console.log(`  🎙️  Generating Speech for ${locale.toUpperCase()}: ${slug}...`);

        const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
        // Format for mixing
        speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;

        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(speechFile);
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakSsmlAsync(
            ssml,
            (result) => {
                synthesizer.close();

                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    const stats = fs.statSync(speechFile);
                    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
                    console.log(`  ✅ Speech Created: ${path.basename(speechFile)} (${sizeMB} MB)`);

                    // Mix with Intro/Outro
                    console.log(`  🎛️  Mixing with SFX (waiting for file lock)...`);
                    // Intros are still in public/audio likely
                    const introPath = path.join(OUTPUT_DIR, 'intro.wav');
                    const outroPath = path.join(OUTPUT_DIR, 'outro.wav');

                    if (!fs.existsSync(introPath) || !fs.existsSync(outroPath)) {
                        console.warn(`  ⚠️  Missing intro/outro files, skipping mixing.`);
                        fs.copyFileSync(speechFile, finalFile);
                        resolve(finalFile);
                        return;
                    }

                    // Small delay to ensure Azure SDK has released the file
                    setTimeout(() => {
                        try {
                            const pythonPath = path.join(__dirname, '..', '.venv', 'bin', 'python');
                            const mixerPath = path.join(__dirname, 'mix-audio.py');

                            execSync(`${pythonPath} "${mixerPath}" "${introPath}" "${speechFile}" "${outroPath}" "${finalFile}"`, {
                                stdio: 'inherit'
                            });

                            console.log(`  ✨ Final Audio Ready: ${path.basename(finalFile)}`);
                            resolve(finalFile);
                        } catch (mixErr) {
                            console.error(`  ❌ Mixing Failed: ${mixErr.message}`);
                            // Fallback to speech only
                            fs.copyFileSync(speechFile, finalFile);
                            resolve(finalFile);
                        }
                    }, 1000);

                } else {
                    console.error(`  ❌ Failed: ${result.errorDetails}`);
                    reject(new Error(result.errorDetails));
                }
            },
            (error) => {
                synthesizer.close();
                console.error(`  ❌ Error: ${error}`);
                reject(error);
            }
        );
    });
}


/**
 * Parse CLI arguments
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        all: false,
        locale: null,
        slug: null
    };

    for (const arg of args) {
        if (arg === '--all') {
            options.all = true;
        } else if (arg.startsWith('--locale=')) {
            options.locale = arg.split('=')[1];
        } else if (!arg.startsWith('--')) {
            options.slug = arg;
        }
    }

    return options;
}

/**
 * Main function
 */
async function main() {
    console.log('\n🔊 Azure Speech Audio Generator\n');
    console.log(`📂 Output directory: ${OUTPUT_DIR}\n`);

    const options = parseArgs();
    const locales = options.locale ? [options.locale] : ['da', 'en'];

    let allPosts = [];
    for (const locale of locales) {
        const posts = getAllPosts(locale);
        allPosts = allPosts.concat(posts);
    }

    // Filter by slug if provided
    if (options.slug) {
        allPosts = allPosts.filter(p => p.slug === options.slug);
        if (allPosts.length === 0) {
            console.error(`❌ Post not found: ${options.slug}`);
            process.exit(1);
        }
    }

    console.log(`📝 Posts to process: ${allPosts.length}\n`);

    for (const post of allPosts) {
        console.log(`\n📄 Processing: "${post.title}" (${post.locale})`);

        try {
            await generateAudio(post.slug, post.content, post.locale, post.outputDir);
        } catch (error) {
            console.error(`\n❌ Error processing ${post.slug}:`, error.message);
        }
    }

    console.log('\n✨ Audio generation complete!\n');
}

main().catch(console.error);
