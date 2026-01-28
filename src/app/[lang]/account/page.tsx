import Header from '@/components/header';
import Footer from '@/components/footer';
import { isValidLocale } from '@/lib/i18n';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return {
        title: locale === 'da' ? 'Min konto | CW Red AI Transformation' : 'My Account | CW Red AI Transformation',
        description: locale === 'da'
            ? 'Administrer din CW Red konto og indstillinger.'
            : 'Manage your CW Red account and settings.'
    };
}

export default async function AccountPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    // Note: In a real implementation, we would check authentication here
    // and redirect to login if not authenticated

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-6 md:px-8 max-w-4xl py-12 md:py-20 flex-1">
                <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-zt-text-main prose-p:font-sans prose-p:text-zt-text-secondary">
                    {locale === 'da' ? (
                        <>
                            <h1>Min konto</h1>
                            <p className="lead">Administrer din profil og indstillinger.</p>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">👤 Profil</h2>
                                <p className="text-gray-600">Log ind for at se og redigere din profil.</p>
                                <Link
                                    href={`/${locale}/login`}
                                    className="inline-block mt-4 px-6 py-2 bg-zt-accent-orange text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
                                >
                                    Log ind
                                </Link>
                            </div>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">📧 Nyhedsbrev</h2>
                                <p className="text-gray-600">Administrer dine nyhedsbrevsindstillinger.</p>
                                <Link
                                    href={`/${locale}/newsletter`}
                                    className="inline-block mt-4 text-zt-accent-orange hover:underline"
                                >
                                    Gå til nyhedsbrev →
                                </Link>
                            </div>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">💳 Medlemskab</h2>
                                <p className="text-gray-600">Se og administrer dit medlemskab.</p>
                                <Link
                                    href={`/${locale}/membership`}
                                    className="inline-block mt-4 text-zt-accent-orange hover:underline"
                                >
                                    Gå til medlemskab →
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>My Account</h1>
                            <p className="lead">Manage your profile and settings.</p>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
                                <p className="text-gray-600">Sign in to view and edit your profile.</p>
                                <Link
                                    href={`/${locale}/login`}
                                    className="inline-block mt-4 px-6 py-2 bg-zt-accent-orange text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
                                >
                                    Sign in
                                </Link>
                            </div>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">📧 Newsletter</h2>
                                <p className="text-gray-600">Manage your newsletter preferences.</p>
                                <Link
                                    href={`/${locale}/newsletter`}
                                    className="inline-block mt-4 text-zt-accent-orange hover:underline"
                                >
                                    Go to newsletter →
                                </Link>
                            </div>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">💳 Membership</h2>
                                <p className="text-gray-600">View and manage your membership.</p>
                                <Link
                                    href={`/${locale}/membership`}
                                    className="inline-block mt-4 text-zt-accent-orange hover:underline"
                                >
                                    Go to membership →
                                </Link>
                            </div>
                        </>
                    )}
                </article>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
