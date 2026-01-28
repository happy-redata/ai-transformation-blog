
import numpy as np
from scipy.io import wavfile
from scipy import signal
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
SR = 44100

def save(filename, t, wave):
    # Normalize
    if np.max(np.abs(wave)) > 0:
        wave = wave / np.max(np.abs(wave)) * 0.9
    
    # Apply fade out to avoid clicks
    fade_len = int(0.01 * SR)
    if len(wave) > fade_len * 2:
        wave[-fade_len:] *= np.linspace(1, 0, fade_len)
        wave[:fade_len] *= np.linspace(0, 1, fade_len)
        
    path = os.path.join(OUTPUT_DIR, filename)
    wavfile.write(path, SR, (wave * 32767).astype(np.int16))
    print(f"✅ Created {filename}")

def generate_sine(freq, duration):
    t = np.linspace(0, duration, int(SR * duration), False)
    return t, np.sin(2 * np.pi * freq * t)

def generate_noise(duration, color='white'):
    samples = int(SR * duration)
    if color == 'white':
        return np.random.normal(0, 1, samples)
    # Pink noise approximation (1/f)
    white = np.random.normal(0, 1, samples)
    b = [0.049922035, -0.095993537, 0.050612699, -0.004408786] 
    a = [1, -2.494956002, 2.017265875, -0.522189400] 
    pink = signal.lfilter(b, a, white)
    return pink

def fm_bell(freq, duration, mod_index=5, mod_ratio=2.0):
    t = np.linspace(0, duration, int(SR * duration), False)
    envelope = np.exp(-5 * t)
    modulator = np.sin(2 * np.pi * freq * mod_ratio * t) * envelope * mod_index
    carrier = np.sin(2 * np.pi * freq * t + modulator) * envelope
    return t, carrier

def apply_reverb(signal, decay=0.5, delay_ms=50):
    delay_samples = int(delay_ms * SR / 1000)
    output = np.copy(signal)
    for i in range(delay_samples, len(signal)):
        output[i] += output[i - delay_samples] * decay
    return output

def marimba_hit(mix, freq, start_time, dur=0.8, amp_scale=0.4):
    duration = len(mix) / SR
    start_idx = int(start_time * SR)
    remaining = duration - start_time
    if remaining <= 0: return
    
    tt = np.linspace(0, min(remaining, dur), int(SR * min(remaining, dur)), False)
    
    # Envelope: Fast attack, exponential decay
    env = np.exp(-8 * tt)
    
    # FM: Modulator at 2*freq (octave up) creates woody tone
    mod = np.sin(2 * np.pi * freq * 2 * tt) * env * 2
    carrier = np.sin(2 * np.pi * freq * tt + mod) * env
    
    end_idx = min(len(mix), start_idx + len(carrier))
    mix[start_idx:end_idx] += carrier[:end_idx-start_idx] * amp_scale

def generate_intro():
    duration = 4.0
    t = np.linspace(0, duration, int(SR * duration), False)
    mix = np.zeros_like(t)
    
    # Intro Pattern (Montuno)
    # C Major
    
    # Bass (C)
    marimba_hit(mix, 130.81, 0.0, dur=1.0)
    marimba_hit(mix, 196.00, 1.5, dur=1.0) # G
    
    # Chords C-E-G
    # 1
    marimba_hit(mix, 261.63, 0.0) 
    marimba_hit(mix, 329.63, 0.25)
    marimba_hit(mix, 392.00, 0.25)
    
    # &
    marimba_hit(mix, 523.25, 0.75) # C5
    marimba_hit(mix, 493.88, 0.75) # B4
    
    # 2 &
    marimba_hit(mix, 392.00, 1.25)
    marimba_hit(mix, 329.63, 1.25)
    
    # Reverb
    wet = apply_reverb(mix, decay=0.4, delay_ms=120)
    wet = apply_reverb(wet, decay=0.3, delay_ms=250)
    
    # Mix Dry + Wet
    final = mix * 0.5 + wet * 0.5
    
    save('intro.wav', t, final)

def generate_outro():
    duration = 4.0
    t = np.linspace(0, duration, int(SR * duration), False)
    mix = np.zeros_like(t)
    
    # Outro Pattern (Resolution)
    # G7 -> C
    
    # G7 Arp (G B D F) - Leading to resolution
    marimba_hit(mix, 196.00, 0.0, dur=1.0) # G3 Bass
    marimba_hit(mix, 392.00, 0.0) # G4
    marimba_hit(mix, 493.88, 0.25) # B4
    marimba_hit(mix, 587.33, 0.5) # D5
    marimba_hit(mix, 698.46, 0.75) # F5
    
    # Resolve to C Major (Grand Finale)
    resolution_time = 1.25
    marimba_hit(mix, 130.81, resolution_time, dur=2.5) # C3 Bass
    marimba_hit(mix, 261.63, resolution_time, dur=2.5) # C4
    marimba_hit(mix, 329.63, resolution_time, dur=2.5) # E4
    marimba_hit(mix, 392.00, resolution_time, dur=2.5) # G4
    marimba_hit(mix, 523.25, resolution_time, dur=2.5) # C5
    
    # Reverb
    wet = apply_reverb(mix, decay=0.4, delay_ms=120)
    wet = apply_reverb(wet, decay=0.3, delay_ms=300) # Long tail
    
    final = mix * 0.5 + wet * 0.5
    save('outro.wav', t, final)

def generate_success():
    duration = 1.0
    t = np.linspace(0, duration, int(SR * duration), False)
    
    # "Ding!" - High C + High E, rapid attack
    f1 = 1046.50 # C6
    f2 = 1318.51 # E6
    
    env = np.exp(-4 * t)
    wave1 = np.sin(2 * np.pi * f1 * t) * env
    wave2 = np.sin(2 * np.pi * f2 * t) * env
    
    # Add a "sparkle" high frequency
    wave3 = np.sin(2 * np.pi * 2093.00 * t) * np.exp(-10 * t) * 0.5
    
    save('success.wav', t, wave1 + wave2 + wave3)

def generate_error():
    duration = 0.6
    t = np.linspace(0, duration, int(SR * duration), False)
    
    # Sawtooth with pitch drop
    freq_start = 150
    freq_end = 50
    freq_inst = np.linspace(freq_start, freq_end, len(t))
    phase = 2 * np.pi * np.cumsum(freq_inst) / SR
    
    wave = signal.sawtooth(phase) * 0.8
    # Low pass filter to make it less harsh
    sos = signal.butter(2, 500, 'lp', fs=SR, output='sos')
    filtered = signal.sosfilt(sos, wave)
    
    # Apply envelope
    env = np.ones_like(t)
    env[-int(0.1*SR):] = np.linspace(1, 0, int(0.1*SR)) # fade out end
    
    save('error.wav', t, filtered * env)

def generate_swoosh():
    duration = 1.0
    t = np.linspace(0, duration, int(SR * duration), False)
    
    noise = np.random.normal(0, 1, len(t))
    
    # Volume Envelope: Rise fast, decay slow
    env = np.exp(-3 * (t - 0.2)**2) * (t > 0) # Gaussian-ish hump
    
    # Filter: Static Lowpass for "air" feel
    sos = signal.butter(4, 1200, 'lp', fs=SR, output='sos')
    filtered = signal.sosfilt(sos, noise)
    
    save('swoosh.wav', t, filtered * env)

if __name__ == "__main__":
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    print("🎹 Generating Advanced SFX with Numpy/Scipy...")
    generate_intro()
    generate_outro()
    generate_success()
    generate_error()
    generate_swoosh()
