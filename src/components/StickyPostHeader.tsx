'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, Dictionary } from '@/lib/i18n';

type StickyPostHeaderProps = {
    title: string;
    locale: Locale;
    dictionary: Dictionary;
    hasAudio?: boolean;
};

export default function StickyPostHeader({ title, locale, dictionary, hasAudio = false }: StickyPostHeaderProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleScroll = useCallback(() => {
        // Show header after scrolling past hero section (approximately 300px)
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 300);

        // Calculate reading progress
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(100, (scrollY / docHeight) * 100);
        setProgress(scrollProgress);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div
            className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-zt-border z-50 transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-zt-accent-orange transition-all duration-150" style={{ width: `${progress}%` }} />

            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Back Button and Logo */}
                <div className="flex items-center gap-4">
                    <Link
                        href={`/${locale}`}
                        className="flex items-center gap-2 text-zt-text-secondary hover:text-zt-text-main transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <Image
                            src="/logo.svg"
                            alt="Vibe Coding"
                            width={100}
                            height={30}
                            className="h-6 w-auto hidden sm:block"
                        />
                    </Link>
                </div>

                {/* Title (truncated) */}
                <h2 className="font-serif font-bold text-zt-text-main text-sm md:text-base max-w-md truncate px-4">
                    {title}
                </h2>

                {/* Audio Play Button - Only show if audio exists */}
                {hasAudio ? (
                    <button className="flex items-center gap-2 bg-zt-accent-orange hover:bg-orange-600 text-white rounded-full px-4 py-2 transition-colors text-sm font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="hidden sm:inline">{dictionary.home.listen}</span>
                    </button>
                ) : (
                    <div className="w-4" /> // Spacer to maintain layout
                )}
            </div>
        </div>
    );
}

