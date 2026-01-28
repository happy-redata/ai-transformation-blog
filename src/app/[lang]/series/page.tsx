import { Locale, getDictionary } from '@/lib/i18n';
import { getAllSeries } from '@/lib/cms';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

type Props = {
    params: Promise<{ lang: Locale }>;
};

export default async function SeriesListPage({ params }: Props) {
    const { lang: locale } = await params;
    const dict = await getDictionary(locale);
    const allSeries = getAllSeries(locale);

    return (
        <>
            <Header lang={locale} />
            <main className="min-h-screen bg-zt-bg-cream">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-b from-zt-accent-teal/10 to-transparent">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-zt-text-main mb-6">
                            {locale === 'da' ? 'Serier' : 'Series'}
                        </h1>
                        <p className="font-serif text-xl text-zt-text-secondary max-w-2xl mx-auto">
                            {locale === 'da'
                                ? 'Udforsk vores komplette serier — hver serie guider dig fra grundlæggende til avanceret forståelse af et emne.'
                                : 'Explore our complete series — each guides you from basics to advanced understanding of a topic.'}
                        </p>
                    </div>
                </section>

                {/* Series Grid */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-6 md:px-8 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-8">
                            {allSeries.map((series) => (
                                <Link
                                    key={series.slug}
                                    href={`/${locale}/series/${series.slug}`}
                                    className="group block"
                                >
                                    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-zt-border">
                                        {/* Hero Image */}
                                        <div className="aspect-[16/9] relative bg-gray-100">
                                            {series.heroImage ? (
                                                <Image
                                                    src={series.heroImage}
                                                    alt={series.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-zt-accent-teal to-zt-accent-purple flex items-center justify-center">
                                                    <span className="text-white text-4xl font-serif font-bold opacity-50">
                                                        {series.title.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                            {/* Episode count badge */}
                                            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {series.episodes.length} {locale === 'da' ? 'episoder' : 'episodes'}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h2 className="font-serif text-xl md:text-2xl font-bold text-zt-text-main mb-3 group-hover:text-zt-accent-teal transition-colors">
                                                {series.title}
                                            </h2>
                                            {series.description && (
                                                <p className="font-sans text-zt-text-secondary text-sm line-clamp-2 mb-4">
                                                    {series.description}
                                                </p>
                                            )}

                                            {/* Episode list preview */}
                                            <div className="space-y-2">
                                                {series.episodes.slice(0, 3).map((ep, idx) => (
                                                    <div key={ep.slug} className="flex items-center gap-2 text-sm">
                                                        <span className="w-6 h-6 rounded-full bg-zt-accent-teal/10 text-zt-accent-teal flex items-center justify-center text-xs font-bold">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="text-zt-text-secondary truncate">{ep.title}</span>
                                                    </div>
                                                ))}
                                                {series.episodes.length > 3 && (
                                                    <p className="text-zt-text-muted text-xs pl-8">
                                                        + {series.episodes.length - 3} {locale === 'da' ? 'flere' : 'more'}...
                                                    </p>
                                                )}
                                            </div>

                                            {/* Author */}
                                            {series.author && (
                                                <p className="mt-4 pt-4 border-t border-zt-border text-sm text-zt-text-muted">
                                                    {locale === 'da' ? 'Af' : 'By'} {series.author}
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {allSeries.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-zt-text-secondary text-lg">
                                    {locale === 'da' ? 'Ingen serier fundet.' : 'No series found.'}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer lang={locale} />
        </>
    );
}
