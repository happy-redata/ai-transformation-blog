#!/usr/bin/env node
/**
 * Jingles Generation CLI for happymates-blob
 * Generates placeholder audio files for the Admin Jingles page using Azure TTS
 * 
 * Usage: node cli/generate-jingles.js
 */

import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Jingle Definitions (Placeholders)
const JINGLES = [
    { filename: 'intro.mp3', text: 'Welcome to the Happy Mates Blog. Discover our latest insights on technology and AI.', voice: 'en-US-JennyNeural' },
    { filename: 'outro.mp3', text: 'Thank you for visiting Happy Mates. Stay tuned for more updates. Goodbye!', voice: 'en-US-JennyNeural' },
    { filename: 'success.mp3', text: 'Success!', voice: 'en-US-JennyNeural' },
    { filename: 'error.mp3', text: 'Error. Please check your input.', voice: 'en-US-JennyNeural' },
    { filename: 'swoosh.mp3', text: 'Swoosh', voice: 'en-US-JennyNeural' },
];

/**
 * Generate audio for a single jingle
 */
async function generateJingle(filename, text, voice) {
    return new Promise((resolve, reject) => {
        const outputFile = path.join(OUTPUT_DIR, filename);

        console.log(`  🎵 Generating: ${filename}...`);

        const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
        speechConfig.speechSynthesisVoiceName = voice;
        speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(outputFile);
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakTextAsync(
            text,
            (result) => {
                synthesizer.close();

                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    const stats = fs.statSync(outputFile);
                    const sizeKB = (stats.size / 1024).toFixed(2);
                    console.log(`  ✅ Created: ${filename} (${sizeKB} KB)`);
                    resolve(outputFile);
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
 * Main function
 */
async function main() {
    console.log('\n🎹 Azure Speech Jingle Generator\n');
    console.log(`📂 Output directory: ${OUTPUT_DIR}\n`);

    for (const jingle of JINGLES) {
        try {
            await generateJingle(jingle.filename, jingle.text, jingle.voice);
        } catch (error) {
            console.error(`\n❌ Error processing ${jingle.filename}:`, error.message);
        }
    }

    console.log('\n✨ Jingles generation complete!\n');
}

main().catch(console.error);
