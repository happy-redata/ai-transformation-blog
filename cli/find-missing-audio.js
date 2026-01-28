import fs from 'fs';
import path from 'path';

const CONTENT_DIR = 'content/posts';
const METADATA_FILE = 'public/audio-metadata.json';

const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));

const missing = [];

['da', 'en'].forEach(locale => {
    const dir = path.join(CONTENT_DIR, locale);
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir).forEach(slug => {
        const fullSlug = `${slug}-${locale}`;
        if (!metadata[fullSlug]) {
            missing.push(slug);
        }
    });
});

console.log(JSON.stringify([...new Set(missing)], null, 2));
