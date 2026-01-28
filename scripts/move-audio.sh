#!/bin/bash

# Get the script's directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

CONTENT_DIR="$PROJECT_ROOT/content/posts"
PUBLIC_AUDIO_DIR="$PROJECT_ROOT/public/audio"

echo "🎵 Moving remaining audio files to colocated folders..."
echo ""

for locale in da en; do
    echo "📂 Processing locale: $locale"
    LOCALE_DIR="$CONTENT_DIR/$locale"
    
    # Find all post directories
    for post_dir in "$LOCALE_DIR"/*/; do
        [ -d "$post_dir" ] || continue
        
        slug=$(basename "$post_dir")
        echo "   📄 Checking: $slug"
        
        # Move any matching audio files
        for audio_file in "$PUBLIC_AUDIO_DIR"/${slug}-${locale}*.wav "$PUBLIC_AUDIO_DIR"/${slug}-${locale}*.mp3; do
            [ -f "$audio_file" ] || continue
            filename=$(basename "$audio_file")
            dest="$post_dir$filename"
            
            if [ ! -f "$dest" ]; then
                echo "      🎵 Moving: $filename"
                mv "$audio_file" "$dest"
            else
                echo "      ℹ️  Already exists: $filename"
            fi
        done
    done
    echo ""
done

echo "✨ Audio file migration complete!"
echo ""
echo "Remaining files in public/audio:"
ls -la "$PUBLIC_AUDIO_DIR" | grep -v "intro\|outro\|error\|success\|swoosh"
