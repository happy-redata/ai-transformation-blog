#!/usr/bin/env node
/**
 * SFX Generation CLI for happymates-blob
 * Generates synthesized WAV sound effects
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');

// WAV Header Helper
function writeWavHeader(sampleRate, numChannels, numSamples) {
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = numSamples * blockAlign;
    const buffer = Buffer.alloc(44);

    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataSize, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Subchunk1Size
    buffer.writeUInt16LE(1, 20); // PCM
    buffer.writeUInt16LE(numChannels, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(byteRate, 28);
    buffer.writeUInt16LE(blockAlign, 32);
    buffer.writeUInt16LE(16, 34); // BitsPerSample
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataSize, 40);

    return buffer;
}

// Synth Helpers
const SAMPLE_RATE = 44100;

function createBuffer(duration) {
    return new Float32Array(SAMPLE_RATE * duration);
}

function saveWav(filename, floatBuffer) {
    const pcmBuffer = Buffer.alloc(floatBuffer.length * 2);
    for (let i = 0; i < floatBuffer.length; i++) {
        let s = Math.max(-1, Math.min(1, floatBuffer[i]));
        s = s < 0 ? s * 0x8000 : s * 0x7FFF;
        pcmBuffer.writeInt16LE(s, i * 2);
    }

    const header = writeWavHeader(SAMPLE_RATE, 1, floatBuffer.length);
    const fd = fs.openSync(path.join(OUTPUT_DIR, filename), 'w');
    fs.writeSync(fd, header, 0, 44);
    fs.writeSync(fd, pcmBuffer, 0, pcmBuffer.length);
    fs.closeSync(fd);
    console.log(`✅ Created ${filename}`);
}

// Oscillators
function sine(t, freq) {
    return Math.sin(2 * Math.PI * freq * t);
}

function sawtooth(t, freq) {
    return 2 * ((t * freq) % 1) - 1;
}

function noise() {
    return Math.random() * 2 - 1;
}

// Generators

function generateSuccess() {
    const duration = 1.0;
    const buffer = createBuffer(duration);
    // Arpeggio: C5 (523.25), E5 (659.25), G5 (783.99)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const step = 0.1;

    for (let i = 0; i < buffer.length; i++) {
        const t = i / SAMPLE_RATE;
        // Envelope
        const amp = Math.exp(-3 * t);

        // Note selection
        let freq = notes[notes.length - 1];
        if (t < step) freq = notes[0];
        else if (t < step * 2) freq = notes[1];
        else if (t < step * 3) freq = notes[2];

        buffer[i] = sine(t, freq) * amp * 0.5;
    }
    saveWav('success.wav', buffer);
}

function generateError() {
    const duration = 0.5;
    const buffer = createBuffer(duration);
    for (let i = 0; i < buffer.length; i++) {
        const t = i / SAMPLE_RATE;
        const amp = Math.max(0, 1 - (t / duration));
        // Low sawtooth buzz
        buffer[i] = sawtooth(t, 150) * amp * 0.5;
    }
    saveWav('error.wav', buffer);
}

function generateSwoosh() {
    const duration = 0.8;
    const buffer = createBuffer(duration);
    for (let i = 0; i < buffer.length; i++) {
        const t = i / SAMPLE_RATE;
        // Envelope: Rise then fall
        let amp = 0;
        if (t < 0.2) amp = t / 0.2;
        else amp = 1 - ((t - 0.2) / 0.6);

        // Low pass filter approximation (simple moving average would be better but simple noise works for "air")
        buffer[i] = noise() * amp * 0.3;
    }
    saveWav('swoosh.wav', buffer);
}

function generateMelody(filename, notes) {
    const noteDuration = 0.3;
    const totalDuration = notes.length * noteDuration + 1.0; // +1 for decay
    const buffer = createBuffer(totalDuration);

    for (let i = 0; i < buffer.length; i++) {
        const t = i / SAMPLE_RATE;
        const noteIndex = Math.floor(t / noteDuration);

        let val = 0;
        if (noteIndex < notes.length) {
            const freq = notes[noteIndex];
            const localT = t % noteDuration;
            // Short envelope per note
            const amp = Math.max(0, 1 - (localT / noteDuration));
            val = sine(t, freq) * amp * 0.3;
        } else {
            // trailing decay of last note reverb-ish
            // skipped for simplicity
        }
        buffer[i] = val;
    }
    saveWav(filename, buffer);
}

function main() {
    console.log("🎹 Generating synthesized SFX...");

    // Notes
    const C4 = 261.63;
    const E4 = 329.63;
    const G4 = 392.00;
    const C5 = 523.25;

    // Success
    generateSuccess();

    // Error
    generateError();

    // Swoosh
    generateSwoosh();

    // Intro: C E G C5
    generateMelody('intro.wav', [C4, E4, G4, C5]);

    // Outro: C5 G E C
    generateMelody('outro.wav', [C5, G4, E4, C4]);

    console.log("✨ Done!");
}

main();
