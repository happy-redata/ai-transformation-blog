import { Metadata } from 'next';
import { getSeriesBySlug, getAllSeries, getNextEpisodeInfo, getAdminConfig } from '@/lib/cms';
import { cookies } from 'next/headers';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import { Locale, isValidLocale, locales, getDictionary } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];

    for (const lang of locales) {
        const seriesList = getAllSeries(lang);
        for (const series of seriesList) {
            params.push({ lang, slug: series.slug });
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    // Check for admin status via cookie
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('hm_admin')?.value === 'true';
    const config = getAdminConfig();
    const forceShow = isAdmin && config.showFutureArticles;

    const series = getSeriesBySlug(slug, locale, forceShow);

    if (!series) {
        return {
            title: 'Serie ikke fundet | CW Red AI Transformation'
        };
    }

    return {
        title: `${series.title} | CW Red AI Transformation`,
        description: series.description,
        openGraph: {
            title: series.title,
            description: series.description,
            images: series.heroImage ? [series.heroImage] : [],
        }
    };
}

export default async function SeriesPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    // Check for admin status via cookie
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('hm_admin')?.value === 'true';
    const config = getAdminConfig();
    const forceShow = isAdmin && config.showFutureArticles;

    const series = getSeriesBySlug(slug, locale, forceShow);

    if (!series) {
        notFound();
    }

    const nextEpisode = getNextEpisodeInfo(slug, locale);

    // Format date helper
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(locale === 'da' ? 'da-DK' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            {/* Series Hero */}
            <section className="relative w-full">
                {series.heroImage && (
                    <div className="relative w-full h-[50vh] overflow-hidden">
                        <Image
                            src={series.heroImage}
                            alt={series.title}
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </div>
                )}

                <div className={`${series.heroImage ? 'absolute bottom-0 left-0 right-0' : 'relative pt-16'}`}>
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl pb-12">
                        <span className="inline-block font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-zt-accent-orange mb-4">
                            Serie
                        </span>
                        <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold ${series.heroImage ? 'text-white' : 'text-zt-text-main'} mb-4 leading-[1.1]`}>
                            {series.title}
                        </h1>
                        {series.description && (
                            <p className={`font-serif text-lg md:text-xl ${series.heroImage ? 'text-white/90' : 'text-zt-text-secondary'} max-w-3xl leading-relaxed`}>
                                {series.description}
                            </p>
                        )}
                        {series.author && (
                            <p className={`font-sans text-sm ${series.heroImage ? 'text-white/70' : 'text-zt-text-muted'} mt-4`}>
                                Af {series.author}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Series Info */}
            <div className="container mx-auto px-6 md:px-8 max-w-4xl py-10">
                <div className="flex flex-wrap gap-4 mb-8">
                    {series.totalEpisodes && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-zt-accent-orange/10 text-zt-accent-orange rounded-full font-sans text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {series.totalEpisodes} episoder
                        </span>
                    )}
                    {nextEpisode && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-zt-bg-light text-zt-text-secondary rounded-full font-sans text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Næste episode: {formatDate(nextEpisode.date)}
                        </span>
                    )}
                </div>

                {/* Episodes List */}
                <h2 className="font-serif text-2xl font-bold text-zt-text-main mb-6">Episoder</h2>
                <div className="space-y-4">
                    {series.episodes.map((episode, index) => (
                        <Link
                            key={episode.slug}
                            href={`/${locale}/post/${episode.slug}`}
                            className="block group"
                        >
                            <article className="flex gap-6 p-6 bg-white rounded-xl border border-zt-border hover:border-zt-accent-orange/30 hover:shadow-lg transition-all duration-300">
                                {episode.heroImage && (
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                        <Image
                                            src={episode.heroImage}
                                            alt={episode.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 96px, 128px"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-zt-accent-orange text-white rounded-full font-sans text-sm font-bold">
                                            {episode.series?.episode || index + 1}
                                        </span>
                                        <span className="font-sans text-xs text-zt-text-muted uppercase tracking-wider">
                                            Episode {episode.series?.episode || index + 1}
                                        </span>
                                    </div>
                                    <h3 className="font-serif text-lg md:text-xl font-bold text-zt-text-main group-hover:text-zt-accent-orange transition-colors line-clamp-2">
                                        {episode.title}
                                    </h3>
                                    {episode.excerpt && (
                                        <p className="font-sans text-sm text-zt-text-secondary mt-2 line-clamp-2">
                                            {episode.excerpt}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 mt-3 font-sans text-xs text-zt-text-muted">
                                        <span>{formatDate(episode.date)}</span>
                                        {episode.readingTime && (
                                            <span>{episode.readingTime} min læsetid</span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Coming Soon placeholder for future episodes */}
                {nextEpisode && (
                    <div className="mt-6 p-6 bg-zt-bg-light rounded-xl border-2 border-dashed border-zt-border">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zt-accent-orange/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-zt-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-sans font-semibold text-zt-text-main">Næste episode kommer snart</p>
                                <p className="font-sans text-sm text-zt-text-muted">{formatDate(nextEpisode.date)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer lang={locale} />
        </main>
    );
}
