import Header from '@/components/header';
import Footer from '@/components/footer';
import { isValidLocale } from '@/lib/i18n';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return {
        title: locale === 'da' ? 'Giv et medlemskab | CW Red AI Transformation' : 'Gift a Membership | CW Red AI Transformation',
        description: locale === 'da'
            ? 'Giv et CW Red medlemskab i gave til en, du holder af.'
            : 'Gift a CW Red membership to someone you care about.'
    };
}

export default async function GiftPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-6 md:px-8 max-w-4xl py-12 md:py-20 flex-1">
                <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-zt-text-main prose-p:font-sans prose-p:text-zt-text-secondary text-center">
                    {locale === 'da' ? (
                        <>
                            <h1>Giv et medlemskab i gave</h1>
                            <p className="lead">Del glæden ved CW Red med en, du holder af.</p>

                            <div className="my-12 p-8 bg-white rounded-2xl shadow-lg">
                                <div className="text-6xl mb-4">🎁</div>
                                <h2 className="text-2xl font-bold mb-4">Kommer snart</h2>
                                <p>Vi arbejder på at gøre det muligt at give medlemskaber i gave. Hold øje med denne side for opdateringer!</p>
                            </div>

                            <p>
                                <Link href={`/${locale}/membership`} className="text-zt-accent-orange hover:underline">
                                    ← Tilbage til medlemskab
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1>Gift a Membership</h1>
                            <p className="lead">Share the joy of CW Red with someone you care about.</p>

                            <div className="my-12 p-8 bg-white rounded-2xl shadow-lg">
                                <div className="text-6xl mb-4">🎁</div>
                                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                                <p>We're working on making it possible to gift memberships. Stay tuned for updates!</p>
                            </div>

                            <p>
                                <Link href={`/${locale}/membership`} className="text-zt-accent-orange hover:underline">
                                    ← Back to membership
                                </Link>
                            </p>
                        </>
                    )}
                </article>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
