'use client';

import Link from 'next/link';
import { Post } from '@/lib/cms';
import { Locale } from '@/lib/i18n';

type SeriesNavigationProps = {
    currentPost: Post;
    seriesPosts: Post[];
    locale: Locale;
};

export default function SeriesNavigation({ currentPost, seriesPosts, locale }: SeriesNavigationProps) {
    if (!currentPost.series || seriesPosts.length <= 1) {
        return null;
    }

    const currentIndex = seriesPosts.findIndex(p => p.slug === currentPost.slug);
    const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

    const seriesTitle = currentPost.series.slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="mt-12 pt-8 border-t border-zt-border">
            {/* Series Info */}
            <div className="mb-6 text-center">
                <Link
                    href={`/${locale}/series/${currentPost.series.slug}`}
                    className="inline-flex items-center gap-2 text-zt-accent-teal hover:text-zt-accent-orange transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="font-sans text-sm font-medium">
                        {locale === 'da' ? 'Del af serien' : 'Part of series'}: <strong>{seriesTitle}</strong>
                    </span>
                </Link>
                <p className="text-zt-text-muted text-sm mt-1">
                    {locale === 'da'
                        ? `Episode ${currentPost.series.episode} af ${seriesPosts.length}`
                        : `Episode ${currentPost.series.episode} of ${seriesPosts.length}`}
                </p>
            </div>

            {/* Episode Navigation */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Previous Episode */}
                {prevPost ? (
                    <Link
                        href={`/${locale}/post/${prevPost.slug}`}
                        className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-zt-border hover:border-zt-accent-teal hover:shadow-md transition-all"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zt-accent-teal/10 flex items-center justify-center group-hover:bg-zt-accent-teal/20 transition-colors">
                            <svg className="w-5 h-5 text-zt-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-zt-text-muted uppercase tracking-wide">
                                {locale === 'da' ? 'Forrige episode' : 'Previous episode'}
                            </p>
                            <p className="font-serif font-medium text-zt-text-main truncate group-hover:text-zt-accent-teal transition-colors">
                                {prevPost.title}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <div /> // Empty placeholder
                )}

                {/* Next Episode */}
                {nextPost ? (
                    <Link
                        href={`/${locale}/post/${nextPost.slug}`}
                        className="group flex items-center justify-end gap-3 p-4 bg-white rounded-xl border border-zt-border hover:border-zt-accent-orange hover:shadow-md transition-all text-right"
                    >
                        <div className="min-w-0">
                            <p className="text-xs text-zt-text-muted uppercase tracking-wide">
                                {locale === 'da' ? 'Næste episode' : 'Next episode'}
                            </p>
                            <p className="font-serif font-medium text-zt-text-main truncate group-hover:text-zt-accent-orange transition-colors">
                                {nextPost.title}
                            </p>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zt-accent-orange/10 flex items-center justify-center group-hover:bg-zt-accent-orange/20 transition-colors">
                            <svg className="w-5 h-5 text-zt-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ) : (
                    <div /> // Empty placeholder
                )}
            </div>

            {/* All Episodes */}
            <details className="mt-6">
                <summary className="cursor-pointer text-sm text-zt-text-secondary hover:text-zt-text-main transition-colors py-2 text-center">
                    {locale === 'da' ? 'Se alle episoder' : 'View all episodes'}
                </summary>
                <div className="mt-4 space-y-2">
                    {seriesPosts.map((post, idx) => (
                        <Link
                            key={post.slug}
                            href={`/${locale}/post/${post.slug}`}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${post.slug === currentPost.slug
                                    ? 'bg-zt-accent-teal/10 text-zt-accent-teal'
                                    : 'hover:bg-gray-50'
                                }`}
                        >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${post.slug === currentPost.slug
                                    ? 'bg-zt-accent-teal text-white'
                                    : 'bg-gray-100 text-zt-text-muted'
                                }`}>
                                {idx + 1}
                            </span>
                            <span className={`font-sans text-sm ${post.slug === currentPost.slug ? 'font-medium' : ''
                                }`}>
                                {post.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </details>
        </div>
    );
}
