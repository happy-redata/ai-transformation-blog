import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale, getDictionary } from '@/lib/i18n';
import PricingCard from '@/components/PricingCard';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return {
        title: lang === 'da' ? 'Medlemskab | Voice of Happy Mates' : 'Membership | Voice of Happy Mates',
        description: lang === 'da' ? 'Bliv medlem af Happy Mates Society' : 'Join Happy Mates Society'
    };
}

export default async function MembershipPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    // Hardcoded for now, could be moved to dictionary
    const isDa = locale === 'da';

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-6 md:px-8 py-20 flex-1">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-zt-text-main mb-6">
                        {isDa ? 'Bliv en del af Happy Mates' : 'Join Happy Mates'}
                    </h1>
                    <p className="text-lg text-zt-text-secondary leading-relaxed">
                        {isDa
                            ? 'Få adgang til eksklusive artikler, help AI og et fællesskab af ligesindede teknologi-entusiaster.'
                            : 'Get access to exclusive articles, help AI, and a community of like-minded technology enthusiasts.'}
                    </p>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-zt-border/50">
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main">{dict.values.title1}</h3>
                        <p className="text-zt-text-secondary leading-relaxed text-sm md:text-base">{dict.values.desc1}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main">{dict.values.title2}</h3>
                        <p className="text-zt-text-secondary leading-relaxed text-sm md:text-base">{dict.values.desc2}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main">{dict.values.title3}</h3>
                        <p className="text-zt-text-secondary leading-relaxed text-sm md:text-base">{dict.values.desc3}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main">{dict.values.title4}</h3>
                        <p className="text-zt-text-secondary leading-relaxed text-sm md:text-base">{dict.values.desc4}</p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
                    {/* Free Tier */}
                    <PricingCard
                        title="Free"
                        price="€0"
                        period="/md"
                        variant="default"
                        features={[
                            isDa ? 'Nyhedsbrev' : 'Newsletter',
                            isDa ? 'Udvalgte artikler' : 'Selected articles'
                        ]}
                        buttonText={isDa ? 'Tilmeld Gratis' : 'Sign Up Free'}
                        redirectUrl={`/${locale}/login`}
                        lang={locale}
                    />

                    {/* Pro Tier */}
                    <PricingCard
                        title="Pro Member"
                        price="€10"
                        period="/md"
                        variant="highlight"
                        isPopular={true}
                        popularText={isDa ? 'Mest Populær' : 'Most Popular'}
                        features={[
                            isDa ? 'Alt i Free' : 'Everything in Free',
                            isDa ? 'Fuld adgang til alle artikler' : 'Full access to all articles',
                            isDa ? 'Lyt til artikler (Audio)' : 'Listen to articles (Audio)',
                            isDa ? 'Adgang til vores Help AI' : 'Access to our Help AI',
                            isDa ? 'Invitation til events' : 'Invitation to events'
                        ]}
                        buttonText={isDa ? 'Bliv Pro Member' : 'Become Pro Member'}
                        // Real Stripe Price ID for Pro Member
                        priceId="price_1SlTjt2HFjrOMhtoaLbBWvKb"
                        lang={locale}
                    />

                    {/* Business Tier */}
                    <PricingCard
                        title="Business"
                        price="€100"
                        period="/md"
                        variant="outline"
                        features={[
                            isDa ? 'For 1 person' : 'For 1 person',
                            isDa ? 'Alt i Pro' : 'Everything in Pro',
                            isDa ? 'Inkluderer 5 COINS' : 'Includes 5 COINS',
                            isDa ? 'Jobopslag' : 'Job postings',
                            isDa ? 'Firma profilering' : 'Company branding'
                        ]}
                        buttonText={isDa ? 'Bliv Business Member' : 'Become Business Member'}
                        // Real Stripe Price ID for Business Member
                        priceId="price_1SlTkh2HFjrOMhtoj0nAYIAx"
                        lang={locale}
                    />
                </div>

                {/* Feature Matrix */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-center mb-10 text-zt-text-main">
                        {isDa ? 'Sammenlign Medlemskaber' : 'Compare Memberships'}
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 text-left font-serif font-bold text-gray-700 w-1/3">Feature</th>
                                    <th className="p-4 text-center font-bold text-gray-700 w-1/5">Free</th>
                                    <th className="p-4 text-center font-bold text-zt-accent-orange w-1/5">Pro</th>
                                    <th className="p-4 text-center font-bold text-gray-900 w-1/5">Business</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <FeatureRow
                                    name={isDa ? 'Nyhedsbrev' : 'Newsletter'}
                                    free={true} pro={true} business={true}
                                />
                                <FeatureRow
                                    name={isDa ? 'Udvalgte Artikler' : 'Selected Articles'}
                                    free={true} pro={true} business={true}
                                />
                                <FeatureRow
                                    name={isDa ? 'Alle Artikler (Premium)' : 'All Articles (Premium)'}
                                    free={false} pro={true} business={true}
                                />
                                <FeatureRow
                                    name={isDa ? 'Lyt til Artikler (Audio)' : 'Listen to Articles (Audio)'}
                                    free={false} pro={true} business={true}
                                />
                                <FeatureRow
                                    name={isDa ? 'Adgang til Help AI' : 'Access to Help AI'}
                                    free={false} pro={true} business={true}
                                />
                                <FeatureRow
                                    name={isDa ? 'Event Invitationer' : 'Event Invitations'}
                                    free={false} pro={true} business={true}
                                />
                                <FeatureRow
                                    name={isDa ? 'COINS (Pr. md.)' : 'COINS (Per month)'}
                                    free="0" pro="0" business="5"
                                />
                                <FeatureRow
                                    name={isDa ? 'Jobopslag' : 'Job Postings'}
                                    free={false} pro={false} business={true}
                                />
                                <FeatureRow
                                    name={isDa ? 'Firma Profilering' : 'Company Branding'}
                                    free={false} pro={false} business={true}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer lang={locale} />
        </main>
    );
}

function FeatureRow({ name, free, pro, business }: { name: string, free: boolean | string, pro: boolean | string, business: boolean | string }) {
    const renderCell = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            return value ? (
                <span className="text-green-500 text-xl">●</span> // Simple dot or could be checkmark
            ) : (
                <span className="text-gray-300 text-xl">-</span>
            );
        }
        return <span className="font-medium text-gray-900">{value}</span>;
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-4 text-gray-700 font-medium">{name}</td>
            <td className="p-4 text-center">{renderCell(free)}</td>
            <td className="p-4 text-center">{renderCell(pro)}</td>
            <td className="p-4 text-center">{renderCell(business)}</td>
        </tr>
    );
}
