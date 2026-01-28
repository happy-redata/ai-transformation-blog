'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type AudioPlayerProps = {
    audioSrc?: string;
    title?: string;
    className?: string;
};

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ audioSrc, title, className = '' }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Handle play/pause
    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // Handle timeline click/seek
    const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !progressRef.current || !duration) return;

        const rect = progressRef.current.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const newTime = clickPosition * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }, [duration]);

    // Update progress
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoaded(true);
            setHasError(false);
        };
        const handleEnded = () => setIsPlaying(false);
        const handleError = () => {
            setHasError(true);
            setIsLoaded(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // If no audio source, hide completely
    if (!audioSrc) {
        return null;
    }

    // If audio failed to load, hide completely
    if (hasError) {
        return null;
    }

    return (
        <div className={`audio-player ${className}`}>
            <audio ref={audioRef} src={audioSrc} preload="metadata" />

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                className="audio-player__play-btn"
                aria-label={isPlaying ? 'Pause' : 'Afspil'}
            >
                {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>

            {/* Timeline */}
            <div className="audio-player__timeline">
                <div
                    ref={progressRef}
                    className="audio-player__progress-bar"
                    onClick={handleSeek}
                    role="slider"
                    aria-label="Tidslinje"
                    aria-valuenow={currentTime}
                    aria-valuemin={0}
                    aria-valuemax={duration}
                >
                    <div
                        className="audio-player__progress"
                        style={{ width: `${progress}%` }}
                    />
                    <div
                        className="audio-player__handle"
                        style={{ left: `${progress}%` }}
                    />
                </div>
                <div className="audio-player__time">
                    <span>{formatTime(currentTime)}</span>
                    <span>{isLoaded ? formatTime(duration) : '--:--'}</span>
                </div>
            </div>
        </div>
    );
}
