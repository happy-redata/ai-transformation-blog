'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/cms';
import { Locale, Dictionary } from '@/lib/i18n';
import { useState, useRef } from 'react';

type ArticleCardProps = {
    post: Post;
    locale: Locale;
    colorClass: string;
    dictionary: Dictionary;
    hasAudio?: boolean;
};

export default function ArticleCard({ post, locale, colorClass, dictionary, hasAudio = false }: ArticleCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Construct audio path from Azure Blob Storage
    const audioPath = `https://sthappymatesauthsweden.blob.core.windows.net/audio/${post.slug}-${locale}.wav`;

    const handlePlayPause = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
    };

    const handleAudioError = () => {
        setAudioError(true);
        setIsPlaying(false);
    };

    // Determine if we should show the audio button
    const showAudioButton = hasAudio && !audioError;

    return (
        <Link
            href={`/${locale}/post/${post.slug}`}
            className="group block"
        >
            <article className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                {/* Image Side */}
                <div className="md:w-1/2 aspect-[16/10] md:aspect-auto relative bg-gray-100">
                    {post.heroImage ? (
                        <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Content Side */}
                <div className={`md:w-1/2 p-6 md:p-8 flex flex-col justify-between ${colorClass} text-white`}>
                    <div>
                        {post.tags && post.tags.length > 0 && (
                            <span className="inline-block font-sans text-xs font-bold uppercase tracking-wider opacity-80 mb-3">
                                {post.tags[0]}
                            </span>
                        )}
                        <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:opacity-90 transition-opacity">
                            {post.title}
                        </h2>
                        {post.excerpt && (
                            <p className="font-sans text-sm opacity-80 line-clamp-2 mb-4">
                                {post.excerpt}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <span className="font-sans text-sm opacity-80">{post.author}</span>
                            {post.readingTime && (
                                <>
                                    <span className="opacity-50">•</span>
                                    <span className="font-sans text-sm opacity-80">
                                        {post.readingTime} {dictionary.home.minutes}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Audio Play Button - Only show if audio exists */}
                        {showAudioButton && (
                            <>
                                <audio
                                    ref={audioRef}
                                    src={audioPath}
                                    onEnded={handleAudioEnd}
                                    onError={handleAudioError}
                                    preload="none"
                                />
                                <button
                                    className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${isPlaying
                                        ? 'bg-white text-zt-text-main'
                                        : 'bg-white/20 hover:bg-white/30'
                                        }`}
                                    onClick={handlePlayPause}
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                    <span className="font-sans text-sm font-medium">
                                        {isPlaying ? (locale === 'da' ? 'Pause' : 'Pause') : dictionary.home.listen}
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}

