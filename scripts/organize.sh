#!/bin/bash

# Get the script's directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Base directories (absolute paths)
CONTENT_DIR="$PROJECT_ROOT/content/posts"
PUBLIC_IMG_DIR="$PROJECT_ROOT/public/images"
PUBLIC_AUDIO_DIR="$PROJECT_ROOT/public/audio"

echo "🚀 Starting content reorganization..."
echo "   Project root: $PROJECT_ROOT"
echo "   Content dir:  $CONTENT_DIR"
echo "   Images dir:   $PUBLIC_IMG_DIR"
echo "   Audio dir:    $PUBLIC_AUDIO_DIR"
echo ""

for locale in da en; do
    echo "📂 Processing locale: $locale"
    LOCALE_DIR="$CONTENT_DIR/$locale"
    
    if [ ! -d "$LOCALE_DIR" ]; then
        echo "   ⚠️  Locale directory not found: $LOCALE_DIR"
        continue
    fi
    
    # Count files
    file_count=$(ls -1 "$LOCALE_DIR"/*.mdx 2>/dev/null | wc -l)
    echo "   Found $file_count .mdx files"
    
    # Find .mdx files
    for file in "$LOCALE_DIR"/*.mdx; do
        [ -e "$file" ] || continue
        
        filename=$(basename "$file")
        slug="${filename%.mdx}"
        
        echo ""
        echo "   📄 Processing: $slug"
        
        # Create subdirectory
        mkdir -p "$LOCALE_DIR/$slug"
        echo "      ✅ Created directory: $LOCALE_DIR/$slug"
        
        # Move MDX
        mv "$file" "$LOCALE_DIR/$slug/index.mdx"
        echo "      ✅ Moved MDX to: $LOCALE_DIR/$slug/index.mdx"
        
        # Process Hero Image
        img_path=$(grep "heroImage:" "$LOCALE_DIR/$slug/index.mdx" | sed -E 's/.*heroImage: "\/images\/([^"]+)".*/\1/')
        
        if [ ! -z "$img_path" ] && [ "$img_path" != "heroImage:" ]; then
            src_img="$PUBLIC_IMG_DIR/$img_path"
            dest_img="$LOCALE_DIR/$slug/$img_path"
            
            if [ -f "$src_img" ]; then
                echo "      📷 Copying image: $img_path"
                cp "$src_img" "$dest_img"
                
                # Update frontmatter
                sed -i.bak "s|heroImage: \"/images/$img_path\"|heroImage: \"./$img_path\"|g" "$LOCALE_DIR/$slug/index.mdx"
                rm "$LOCALE_DIR/$slug/index.mdx.bak"
                echo "      ✅ Updated frontmatter heroImage path"
            else
                echo "      ⚠️  Image not found: $src_img"
            fi
        else
            echo "      ℹ️  No heroImage found in frontmatter"
        fi
        
        # Process Audio
        audio_file="$slug-$locale.wav"
        src_audio="$PUBLIC_AUDIO_DIR/$audio_file"
        dest_audio="$LOCALE_DIR/$slug/$audio_file"
        
        if [ -f "$src_audio" ]; then
            echo "      🎵 Moving audio: $audio_file"
            mv "$src_audio" "$dest_audio"
        else
            echo "      ℹ️  No audio file found: $audio_file"
        fi
    done
    echo ""
done

echo "✨ Content reorganization complete!"
echo ""
echo "New structure:"
ls -la "$CONTENT_DIR/da/" | head -20
