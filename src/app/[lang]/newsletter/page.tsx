import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';
import NewsletterForm from '@/components/NewsletterForm';

const content = {
    da: {
        title: 'Nyhedsbrev',
        subtitle: 'Få de seneste nyheder direkte i din indbakke',
        description: 'Tilmeld dig vores nyhedsbrev og bliv opdateret om nye artikler, events og muligheder i Happy Mates Society. Vi sender kun relevante opdateringer – ingen spam.',
        features: [
            {
                icon: '📬',
                title: 'Ugentlige highlights',
                description: 'En opsummering af ugens bedste indhold'
            },
            {
                icon: '🎯',
                title: 'Eksklusive invitationer',
                description: 'Først til at høre om events og workshops'
            },
            {
                icon: '💡',
                title: 'Tech insights',
                description: 'Tips og tricks fra vores community'
            }
        ],
        privacy: 'Vi respekterer dit privatliv. Du kan altid afmelde dig med ét klik.',
        placeholder: 'Din email',
        button: 'Tilmeld nyhedsbrev',
        success: 'Tak for din tilmelding! Tjek din indbakke.',
        error: 'Noget gik galt. Prøv igen.'
    },
    en: {
        title: 'Newsletter',
        subtitle: 'Get the latest news delivered to your inbox',
        description: 'Subscribe to our newsletter and stay updated on new articles, events, and opportunities in Happy Mates Society. We only send relevant updates – no spam.',
        features: [
            {
                icon: '📬',
                title: 'Weekly highlights',
                description: 'A summary of the week\'s best content'
            },
            {
                icon: '🎯',
                title: 'Exclusive invitations',
                description: 'Be the first to hear about events and workshops'
            },
            {
                icon: '💡',
                title: 'Tech insights',
                description: 'Tips and tricks from our community'
            }
        ],
        privacy: 'We respect your privacy. You can unsubscribe anytime with one click.',
        placeholder: 'Your email',
        button: 'Subscribe',
        success: 'Thanks for subscribing! Check your inbox.',
        error: 'Something went wrong. Please try again.'
    }
};

export default async function NewsletterPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const t = content[locale];

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="flex-1 flex items-center justify-center py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left side - Content */}
                        <div>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-zt-text-main mb-4">
                                {t.title}
                            </h1>
                            <p className="text-xl text-zt-accent-orange font-bold mb-4">
                                {t.subtitle}
                            </p>
                            <p className="text-zt-text-secondary mb-8 leading-relaxed">
                                {t.description}
                            </p>

                            <div className="space-y-4">
                                {t.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <span className="text-2xl">{feature.icon}</span>
                                        <div>
                                            <h3 className="font-bold text-zt-text-main">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-zt-text-secondary">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-zt-border/50">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-zt-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-zt-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="font-serif text-2xl font-bold text-zt-text-main">
                                    {locale === 'da' ? 'Bliv en del af fællesskabet' : 'Join the community'}
                                </h2>
                            </div>

                            <NewsletterForm
                                locale={locale}
                                placeholder={t.placeholder}
                                buttonText={t.button}
                                successMessage={t.success}
                                errorMessage={t.error}
                            />

                            <p className="text-xs text-zt-text-secondary text-center mt-6">
                                {t.privacy}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
