
import numpy as np
import wave
import struct
import sys
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')

def read_wav(path):
    """Read WAV file using wave module (more robust than scipy for various formats)"""
    if not os.path.exists(path):
        print(f"Warning: {path} not found.")
        return 44100, np.array([])
    
    try:
        with wave.open(path, 'rb') as wf:
            n_channels = wf.getnchannels()
            sample_width = wf.getsampwidth()
            framerate = wf.getframerate()
            n_frames = wf.getnframes()
            
            # Read raw audio data
            raw_data = wf.readframes(n_frames)
            
            # Convert to numpy array based on sample width
            if sample_width == 1:
                data = np.frombuffer(raw_data, dtype=np.uint8)
                data = (data.astype(np.float64) - 128) / 128.0
            elif sample_width == 2:
                data = np.frombuffer(raw_data, dtype=np.int16)
                data = data.astype(np.float64) / 32768.0
            elif sample_width == 4:
                data = np.frombuffer(raw_data, dtype=np.int32)
                data = data.astype(np.float64) / 2147483648.0
            else:
                print(f"Unsupported sample width: {sample_width}")
                return framerate, np.array([])
            
            # If stereo, convert to mono
            if n_channels == 2:
                data = data.reshape(-1, 2).mean(axis=1)
            
            print(f"  Read {path}: {len(data)/framerate:.1f}s @ {framerate}Hz")
            return framerate, data
            
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return 44100, np.array([])

def resample(data, old_sr, new_sr):
    if old_sr == new_sr: return data
    if len(data) == 0: return data
    duration = len(data) / old_sr
    new_len = int(duration * new_sr)
    return np.interp(
        np.linspace(0, len(data), new_len),
        np.arange(len(data)),
        data
    )

def write_wav(path, sr, data):
    """Write WAV file using wave module"""
    # Convert to int16
    audio_int16 = (data * 32767).astype(np.int16)
    
    with wave.open(path, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)  # 16-bit
        wf.setframerate(sr)
        wf.writeframes(audio_int16.tobytes())

def mix_audio(intro_path, speech_path, outro_path, output_path):
    target_sr = 44100
    
    print("  Reading audio files...")
    sr1, intro = read_wav(intro_path)
    sr2, speech = read_wav(speech_path)
    sr3, outro = read_wav(outro_path)
    
    # Check if speech was read successfully
    if len(speech) == 0:
        print(f"  ⚠️  Warning: Speech file empty or unreadable!")
    
    # Resample all to 44100
    intro = resample(intro, sr1, target_sr)
    speech = resample(speech, sr2, target_sr)
    outro = resample(outro, sr3, target_sr)
    
    # Pause of 0.5s between sections
    pause = np.zeros(int(0.5 * target_sr))
    
    # Combine
    final = np.concatenate([intro, pause, speech, pause, outro])
    
    print(f"  Final audio length: {len(final)/target_sr:.1f}s")
    
    # Normalize
    max_val = np.max(np.abs(final))
    if max_val > 0:
        final = final / max_val * 0.95
        
    # Save using wave module
    write_wav(output_path, target_sr, final)
    print(f"✅ Mixed audio saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python mix-audio.py <intro_wav> <speech_wav> <outro_wav> <output_wav>")
        sys.exit(1)
        
    mix_audio(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
