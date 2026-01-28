
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(process.cwd(), 'migration.log');

function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}\n`;
    console.log(msg);
    fs.appendFileSync(LOG_FILE, line);
}

try {
    log('Starting migration...');

    const contentDir = path.join(process.cwd(), 'content/posts');
    const publicImagesDir = path.join(process.cwd(), 'public/images');
    const publicAudioDir = path.join(process.cwd(), 'public/audio');

    const locales = ['da', 'en'];

    locales.forEach(locale => {
        const localeDir = path.join(contentDir, locale);
        if (!fs.existsSync(localeDir)) {
            log(`Locale dir not found: ${localeDir}`);
            return;
        }

        const files = fs.readdirSync(localeDir);
        log(`Found ${files.length} files in ${locale}`);

        files.forEach(file => {
            if (!file.endsWith('.mdx')) return;

            const slug = file.replace('.mdx', '');
            const oldPath = path.join(localeDir, file);
            const newDir = path.join(localeDir, slug);
            const newPath = path.join(newDir, 'index.mdx');

            log(`Processing ${slug}...`);

            // Check if already migrated
            if (fs.existsSync(newDir)) {
                log(`  Directory ${newDir} already exists. Skipping.`);
                return;
            }

            // Create Directory
            try {
                fs.mkdirSync(newDir, { recursive: true });
                log(`  Created directory: ${newDir}`);
            } catch (e) {
                log(`  ERROR creating directory: ${e.message}`);
                return;
            }

            // Move MDX
            try {
                fs.renameSync(oldPath, newPath);
                log(`  Moved MDX to: ${newPath}`);
            } catch (e) {
                log(`  ERROR moving MDX: ${e.message}`);
                // Attempt copy + delete fallback?
                try {
                    fs.copyFileSync(oldPath, newPath);
                    fs.unlinkSync(oldPath);
                    log(`  Copied & Deleted MDX (fallback)`);
                } catch (e2) {
                    log(`  ERROR Copy/Delete MDX: ${e2.message}`);
                    return;
                }
            }

            // Update Frontmatter & Copy Image
            try {
                let content = fs.readFileSync(newPath, 'utf8');
                const heroRegex = /heroImage:\s*["']\/images\/([^"']+)["']/;
                const match = content.match(heroRegex);

                if (match) {
                    const imageName = match[1];
                    const publicImagePath = path.join(publicImagesDir, imageName);

                    if (fs.existsSync(publicImagePath)) {
                        const newImagePath = path.join(newDir, imageName);
                        fs.copyFileSync(publicImagePath, newImagePath);
                        log(`  Copied image: ${imageName}`);

                        content = content.replace(match[0], `heroImage: "./${imageName}"`);
                        fs.writeFileSync(newPath, content);
                        log(`  Updated frontmatter`);
                    } else {
                        // Check commonly named files (e.g. if slug is different slightly?)
                        // Assuming match[1] is correct
                        log(`  WARNING: Image not found in public: ${imageName}`);
                    }
                }
            } catch (e) {
                log(`  ERROR processing image/frontmatter: ${e.message}`);
            }

            // Move Audio
            const audioName = `${slug}-${locale}.wav`;
            const publicAudioPath = path.join(publicAudioDir, audioName);
            const newAudioPath = path.join(newDir, audioName);

            if (fs.existsSync(publicAudioPath)) {
                try {
                    fs.renameSync(publicAudioPath, newAudioPath);
                    log(`  Moved audio: ${audioName}`);
                } catch (e) {
                    // Try copy + delete
                    try {
                        fs.copyFileSync(publicAudioPath, newAudioPath);
                        fs.unlinkSync(publicAudioPath);
                        log(`  Copied & Deleted Audio (fallback)`);
                    } catch (e2) {
                        log(`  ERROR moving audio: ${e2.message}`);
                    }
                }
            }
        });
    });

    log('Migration completed successfully.');

} catch (error) {
    log(`CRITICAL ERROR: ${error.message}\n${error.stack}`);
}
