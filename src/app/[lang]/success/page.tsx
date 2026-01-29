import Link from 'next/link';
import { redirect } from 'next/navigation';
import stripe from '@/lib/stripe';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SuccessActions from '@/components/SuccessActions';
import { Locale, isValidLocale, getDictionary } from '@/lib/i18n';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    return {
        title: `${dict.success.title} | CW Red AI Transformation`,
        description: dict.success.description
    };
}

export default async function SuccessPage({
    params,
    searchParams
}: {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { lang } = await params;
    const { session_id } = await searchParams;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    if (!session_id) {
        redirect(`/${locale}`);
    }

    let customerEmail = '';

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (session.customer_details) {
            customerEmail = session.customer_details.email || '';
        }
    } catch (error) {
        console.error('Error retrieving stripe session:', error);
    }

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>

                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-zt-text-main mb-4">
                        {dict.success.title}
                    </h1>

                    <p className="text-zt-text-secondary text-lg mb-8 leading-relaxed">
                        {dict.success.description}
                        <br />
                        {customerEmail && (
                            <span className="block mt-2 text-sm text-gray-500">
                                {dict.success.confirmation} {customerEmail}
                            </span>
                        )}
                    </p>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 text-left">
                        <h3 className="font-bold text-blue-900 mb-2">
                            {dict.success.whatNext}
                        </h3>
                        <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm md:text-base">
                            <li>{dict.success.nextStep1}</li>
                            <li>{dict.success.nextStep2}</li>
                            <li>{dict.success.nextStep3}</li>
                        </ul>
                    </div>

                    <SuccessActions
                        locale={locale}
                        email={customerEmail}
                        texts={{
                            homeButton: dict.success.homeButton,
                            loginButton: dict.success.loginButton
                        }}
                    />
                </div>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
