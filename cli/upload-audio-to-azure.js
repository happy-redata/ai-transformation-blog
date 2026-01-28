#!/usr/bin/env node
/**
 * Upload audio files to Azure Blob Storage and generate metadata
 * 
 * Usage: node cli/upload-audio-to-azure.js
 * 
 * Requires: AZURE_STORAGE_CONNECTION_STRING in .env
 */

import 'dotenv/config';
import { BlobServiceClient } from '@azure/storage-blob';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const AUDIO_DIR = path.join(process.cwd(), 'public/audio');
const METADATA_FILE = path.join(process.cwd(), 'public/audio-metadata.json');
const CONTAINER_NAME = 'audio';

async function getAudioDuration(filePath) {
    try {
        // Use ffprobe to get duration
        const result = execSync(
            `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`,
            { encoding: 'utf-8' }
        );
        return parseFloat(result.trim());
    } catch (error) {
        console.warn(`  ⚠️  Could not get duration for ${path.basename(filePath)}`);
        return null;
    }
}

function formatDuration(seconds) {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

async function main() {
    console.log('\n🔊 Azure Audio Upload Tool\n');

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!connectionString) {
        console.error('❌ AZURE_STORAGE_CONNECTION_STRING not found in environment');
        console.log('   Add it to your .env file');
        process.exit(1);
    }

    // Connect to Azure Blob Storage
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

    // Ensure container exists
    await containerClient.createIfNotExists({
        access: 'blob' // Public read access for blobs
    });
    console.log(`📦 Container: ${CONTAINER_NAME}\n`);

    // Get all WAV files (only the final mixed ones, not -speech.wav)
    const files = fs.readdirSync(AUDIO_DIR)
        .filter(f => f.endsWith('.wav') && !f.includes('-speech'))
        .filter(f => f !== 'intro.wav' && f !== 'outro.wav' && f !== 'error.wav');

    console.log(`📂 Found ${files.length} audio files to process\n`);

    // Load existing metadata if it exists
    let metadata = {};
    if (fs.existsSync(METADATA_FILE)) {
        try {
            metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
            console.log(`📄 Loaded ${Object.keys(metadata).length} existing metadata entries`);
        } catch (e) {
            console.warn('⚠️ Could not parse existing metadata file, starting fresh');
        }
    }

    for (const file of files) {
        const filePath = path.join(AUDIO_DIR, file);
        const stats = fs.statSync(filePath);
        const blobName = file;

        console.log(`📤 Uploading: ${file}`);

        // Get duration
        const duration = await getAudioDuration(filePath);

        // Upload to Azure
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const fileBuffer = fs.readFileSync(filePath);

        await blockBlobClient.uploadData(fileBuffer, {
            blobHTTPHeaders: {
                blobContentType: 'audio/wav'
            }
        });

        const blobUrl = blockBlobClient.url;
        console.log(`   ✅ Uploaded: ${blobUrl}`);

        // Store metadata
        metadata[file.replace('.wav', '')] = {
            url: blobUrl,
            filename: file,
            size: stats.size,
            durationSeconds: duration,
            durationFormatted: formatDuration(duration),
            uploadedAt: new Date().toISOString()
        };
    }

    // Write metadata file
    fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
    console.log(`\n📄 Metadata saved to: ${METADATA_FILE}`);

    // Summary
    console.log('\n✨ Upload complete!');
    console.log(`   Files uploaded: ${files.length}`);
    console.log(`   Container: ${CONTAINER_NAME}`);
    console.log(`   Storage Account: sthappymatesauthsweden`);

    console.log('\n💡 Next steps:');
    console.log('   1. Update AudioPlayer component to use Azure URLs');
    console.log('   2. Remove audio files from public/audio/ (keep intro/outro)');
    console.log('   3. Commit and push to reduce repo size');
}

main().catch(console.error);
