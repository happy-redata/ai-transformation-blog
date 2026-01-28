# Audio Storage Migration

## Azure Storage Account
- **Account Name**: sthappymatesauthsweden
- **Resource Group**: rg-happy-mates-sweden1
- **Location**: swedencentral
- **Subscription**: USD5000
- **Subscription ID**: 742e217b-f6e1-4094-9792-49b71fde2e02
- **Container**: audio

## Blob URL Pattern
```
https://sthappymatesauthsweden.blob.core.windows.net/audio/{slug}-{locale}.wav
```

## Examples
- `https://sthappymatesauthsweden.blob.core.windows.net/audio/excel-calendar-mate-example-da.wav`
- `https://sthappymatesauthsweden.blob.core.windows.net/audio/trust-for-dummies-en.wav`

## Metadata
Audio metadata (duration, size, URLs) is stored in:
- `public/audio-metadata.json`

## Files Kept Locally
Only these SFX files remain in `public/audio/`:
- `intro.wav` - Intro jingle (used by audio generator)
- `outro.wav` - Outro jingle (used by audio generator)
- `error.wav` - Error sound effect

## Migration Summary
- **37 audio files** uploaded to Azure Blob Storage
- **~1.1GB** removed from repository
- Content/posts folders: 36MB (images only)
- Public/audio folder: ~800KB (just SFX)

## Connection String
Added to `.env`:
```
AZURE_STORAGE_CONNECTION_STRING="..."
```

## Upload Tool
Use this CLI to upload new audio files:
```bash
node cli/upload-audio-to-azure.js
```