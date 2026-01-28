const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content/posts');
const publicImagesDir = path.join(process.cwd(), 'public/images');
const publicAudioDir = path.join(process.cwd(), 'public/audio');

const locales = ['da', 'en'];

console.log('📦 Organizing content...');

locales.forEach(locale => {
    const localeDir = path.join(contentDir, locale);
    if (!fs.existsSync(localeDir)) return;

    const files = fs.readdirSync(localeDir);

    files.forEach(file => {
        if (!file.endsWith('.mdx')) return;

        const slug = file.replace('.mdx', '');
        const oldPath = path.join(localeDir, file);
        const newDir = path.join(localeDir, slug);
        const newPath = path.join(newDir, 'index.mdx');

        console.log(`\n📄 Processing ${locale}/${slug}...`);

        // 1. Create subdirectory
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }

        // 2. Move MDX
        fs.renameSync(oldPath, newPath);
        console.log(`    Moved MDX to ${newDir}/index.mdx`);

        // 3. Update Frontmatter heroImage path
        let content = fs.readFileSync(newPath, 'utf8');
        // Regex to find heroImage: "/images/hero-slug.png"
        // And replace with "./hero-slug.png" ? Or just "hero-slug.png"?
        // Let's use relative path "./" to be explicit.
        const heroRegex = /heroImage:\s*["']\/images\/([^"']+)["']/;
        const match = content.match(heroRegex);

        if (match) {
            const imageName = match[1];
            // Check if this image matches `hero-${slug}.png` or similar
            // User instruction: "place the audio files and images in that folder"
            // So we move the image from public/images to newDir

            const publicImagePath = path.join(publicImagesDir, imageName);
            if (fs.existsSync(publicImagePath)) {
                const newImagePath = path.join(newDir, imageName);
                // Use copy instead of move because the image might be shared between DA and EN posts
                fs.copyFileSync(publicImagePath, newImagePath);
                console.log(`    Copied Image ${imageName} to ${newDir}`);

                // Update frontmatter
                content = content.replace(match[0], `heroImage: "./${imageName}"`);
                fs.writeFileSync(newPath, content);
                console.log(`    Updated frontmatter heroImage`);
            } else {
                console.warn(`   ⚠️ Image not found in public/images: ${imageName}`);
            }
        }

        // 4. Move Audio
        // Audio pattern: public/audio/${slug}-${locale}.wav
        const audioName = `${slug}-${locale}.wav`;
        const publicAudioPath = path.join(publicAudioDir, audioName);

        if (fs.existsSync(publicAudioPath)) {
            const newAudioPath = path.join(newDir, audioName);
            fs.renameSync(publicAudioPath, newAudioPath);
            console.log(`    Moved Audio ${audioName} to ${newDir}`);
        }
    });
});

console.log('\n✅ Content organization complete!');
