'use client';

import { ReactNode } from 'react';

// Sound effect marker - for audio production only (not rendered visually)
type SoundEffectProps = {
    name: string;  // e.g., "typing", "notification", "transition"
    children?: ReactNode;
};

export function SoundEffect({ children }: SoundEffectProps) {
    // Just render children, no visual indicator
    return <>{children}</>;
}

// Speaker marker - for voice/narrator changes (not rendered visually)
type SpeakerProps = {
    voice: string;  // e.g., "narrator", "host", "guest-1"
    name?: string;  // Display name
    children: ReactNode;
};

export function Speaker({ children }: SpeakerProps) {
    // Just render children, no visual indicator
    return <>{children}</>;
}

// Pause marker - for timing in audio production only (not rendered)
type PauseProps = {
    duration: number;  // seconds
};

export function Pause({ }: PauseProps) {
    // Don't render anything for pause cues
    return null;
}

// Music cue - for background music changes (not rendered)
type MusicProps = {
    track: string;
    action: 'start' | 'stop' | 'fade-in' | 'fade-out';
};

export function Music({ }: MusicProps) {
    // Don't render anything for music cues
    return null;
}

// Emphasis for audio - renders with standard styling
type EmphasisProps = {
    type?: 'strong' | 'soft' | 'question' | 'dramatic';
    children: ReactNode;
};

export function Emphasis({ type = 'strong', children }: EmphasisProps) {
    // Keep emphasis styling as it's meaningful for reading
    const styles = {
        strong: 'font-bold',
        soft: 'italic',
        question: '',
        dramatic: 'font-bold underline decoration-zt-accent-orange/30',
    };

    return (
        <span className={styles[type]}>
            {children}
        </span>
    );
}

// Voice marker - specifies what to show vs what to speak
export function Voice({ children, text, lang }: { children: ReactNode; text: string; lang?: string }) {
    // Render children for the viewer
    return <>{children}</>;
}

// Speak marker - content only for the audio version
export function Speak({ children }: { children: ReactNode }) {
    // Don't render anything for the viewer
    return null;
}

// View marker - content only for the text version
export function View({ children }: { children: ReactNode }) {
    // Render children for the viewer
    return <>{children}</>;
}

