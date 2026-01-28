'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, Dictionary } from '@/lib/i18n';
import ArticleCard from '@/components/ArticleCard';
import type { Post } from '@/lib/cms';

interface SearchInterfaceProps {
    locale: Locale;
    dictionary: Dictionary;
}

export default function SearchInterface({ locale, dictionary }: SearchInterfaceProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    // Card accent colors inspired by Zetland
    const cardColors = [
        'bg-zt-card-teal',
        'bg-zt-card-navy',
        'bg-zt-card-azure',
        'bg-zt-card-coral',
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length > 1) {
                setLoading(true);
                fetch(`/api/search?q=${encodeURIComponent(query)}&lang=${locale}`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('Search error:', err);
                        setLoading(false);
                    });
            } else {
                setResults([]);
            }
        }, 300); // 300ms debounce
        return () => clearTimeout(timer);
    }, [query, locale]);

    return (
        <div className="space-y-8 min-h-[50vh]">
            <div className="relative">
                <input
                    type="search"
                    placeholder={locale === 'da' ? 'Søg efter artikler...' : 'Search for articles...'}
                    className="w-full text-2xl md:text-4xl font-serif p-4 border-b-2 border-zt-border bg-transparent focus:outline-none focus:border-zt-accent-orange transition-colors placeholder:text-zt-text-secondary/30"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zt-text-secondary opacity-50">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </div>

            {loading && (
                <div className="text-center text-zt-text-secondary py-12 animate-pulse">
                    {locale === 'da' ? 'Leder i arkiverne...' : 'Searching archives...'}
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="space-y-6">
                    {results.map((post, index) => (
                        <ArticleCard
                            key={post.slug}
                            post={post}
                            locale={locale}
                            colorClass={cardColors[index % cardColors.length]}
                            dictionary={dictionary}
                        />
                    ))}
                </div>
            )}

            {!loading && query.length > 1 && results.length === 0 && (
                <div className="text-center text-zt-text-secondary mt-12 py-12 bg-white/50 rounded-xl">
                    <p className="text-xl font-serif mb-2">
                        {locale === 'da' ? 'Ingen resultater fundet' : 'No results found'}
                    </p>
                    <p className="text-sm">
                        {locale === 'da' ? `Vi fandt ikke noget der matcher "${query}"` : `We didn't find anything matching "${query}"`}
                    </p>
                </div>
            )}

            {!loading && query.length === 0 && (
                <div className="text-center text-zt-text-secondary/50 mt-12">
                    {locale === 'da' ? 'Start med at skrive for at søge' : 'Start typing to search'}
                </div>
            )}
        </div>
    );
}
