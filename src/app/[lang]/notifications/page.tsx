import Header from '@/components/header';
import Footer from '@/components/footer';
import { isValidLocale } from '@/lib/i18n';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return {
        title: locale === 'da' ? 'Notifikationer | CW Red AI Transformation' : 'Notifications | CW Red AI Transformation',
        description: locale === 'da'
            ? 'Administrer dine notifikationsindstillinger.'
            : 'Manage your notification settings.'
    };
}

export default async function NotificationsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-6 md:px-8 max-w-4xl py-12 md:py-20 flex-1">
                <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-zt-text-main prose-p:font-sans prose-p:text-zt-text-secondary">
                    {locale === 'da' ? (
                        <>
                            <h1>Notifikationer</h1>
                            <p className="lead">Administrer hvordan du modtager opdateringer fra CW Red.</p>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">🔔 Notifikationsindstillinger</h2>
                                <p className="text-gray-600 mb-4">Log ind for at administrere dine notifikationsindstillinger.</p>
                                <Link
                                    href={`/${locale}/login`}
                                    className="inline-block px-6 py-2 bg-zt-accent-orange text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
                                >
                                    Log ind
                                </Link>
                            </div>

                            <div className="my-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold mb-3">Notifikationstyper</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>📧 <strong>E-mail</strong> - Modtag nye artikler og opdateringer</li>
                                    <li>📅 <strong>Arrangementer</strong> - Påmindelser om kommende events</li>
                                    <li>💬 <strong>Fællesskab</strong> - Aktivitet i dit netværk</li>
                                </ul>
                            </div>

                            <p>
                                <Link href={`/${locale}/account`} className="text-zt-accent-orange hover:underline">
                                    ← Tilbage til min konto
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1>Notifications</h1>
                            <p className="lead">Manage how you receive updates from CW Red.</p>

                            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">🔔 Notification Settings</h2>
                                <p className="text-gray-600 mb-4">Sign in to manage your notification preferences.</p>
                                <Link
                                    href={`/${locale}/login`}
                                    className="inline-block px-6 py-2 bg-zt-accent-orange text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
                                >
                                    Sign in
                                </Link>
                            </div>

                            <div className="my-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold mb-3">Notification Types</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>📧 <strong>Email</strong> - Receive new articles and updates</li>
                                    <li>📅 <strong>Events</strong> - Reminders for upcoming events</li>
                                    <li>💬 <strong>Community</strong> - Activity in your network</li>
                                </ul>
                            </div>

                            <p>
                                <Link href={`/${locale}/account`} className="text-zt-accent-orange hover:underline">
                                    ← Back to my account
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
