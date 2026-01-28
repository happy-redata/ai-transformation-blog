import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/cms';
import { Locale } from '@/lib/i18n';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/search');

export async function GET(request: NextRequest) {
    const startTime = Date.now();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase().trim() || '';
    const lang = (searchParams.get('lang') as Locale) || 'da';

    log.debug('Search request received', { query, lang });

    if (!query) {
        log.debug('Empty query, returning empty results');
        return NextResponse.json([]);
    }

    const posts = getAllPosts(lang);
    log.debug('Posts loaded', { count: posts.length });

    const results = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt?.toLowerCase().includes(query);
        const tagsMatch = post.tags?.some(tag => tag.toLowerCase().includes(query));

        return titleMatch || excerptMatch || tagsMatch;
    });

    // Return filtered list - sending only necessary fields for cards
    const slimResults = results.map(p => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        readingTime: p.readingTime,
        heroImage: p.heroImage,
        tags: p.tags,
        author: p.author
    }));

    const duration = Date.now() - startTime;
    log.info('Search completed', { query, lang, results: results.length, durationMs: duration });

    return NextResponse.json(slimResults);
}
