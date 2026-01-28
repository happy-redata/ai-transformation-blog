import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';

type FAQItem = {
    question: string;
    answer: string;
};

const faqs: Record<Locale, FAQItem[]> = {
    da: [
        {
            question: 'Hvad får jeg som medlem?',
            answer: 'Som Pro-medlem får du fuld adgang til alle vores dybdegående artikler, mulighed for at lytte til dem som lydfiler, adgang til vores specialiserede Help AI, og invitationer til eksklusive events og vores fællesskab.'
        },
        {
            question: 'Hvem ejer Happy Mates?',
            answer: 'Happy Mates Society er en forening. Det betyder, at vi er ejet af vores medlemmer og ikke af investorer. Overskuddet går til at forbedre foreningen og skabe værdi for medlemmerne.'
        },
        {
            question: 'Hvad går pengene til?',
            answer: 'Vi er 100% finansieret af vores medlemmer. Pengene går til drift af platformen, produktion af indhold, udvikling af værktøjer som vores AI, og afholdelse af events.'
        },
        {
            question: 'Kan jeg dele mit abonnement?',
            answer: 'Et Pro-medlemskab er personligt. Hvis I er en virksomhed, kan I tegne et Business-medlemskab, som giver adgang til firma-profilering og jobopslag udover de personlige fordele.'
        },
        {
            question: 'Hvordan lytter jeg til artiklerne?',
            answer: 'Alle vores artikler er indlæst med neural voice teknologi. Du finder afspilleren i toppen af hver artikel, så du kan lytte med på farten.'
        },
        {
            question: 'Hvordan kontakter jeg jer?',
            answer: 'Du kan skrive til os på hello@happymates.dk. Vi har også telefonisk åbningstid på +45 22 80 37 50 hver tirsdag og torsdag mellem kl. 16 og 18.'
        }
    ],
    en: [
        {
            question: 'What do I get as a member?',
            answer: 'As a Pro member, you get full access to all our in-depth articles, audio versions of stories, access to our specialized Help AI, and invitations to exclusive events and our community.'
        },
        {
            question: 'Who owns Happy Mates?',
            answer: 'Happy Mates Society is an association (forening). This means we are owned by our members, not investors. Profits go towards improving the society and creating value for members.'
        },
        {
            question: 'Where does the money go?',
            answer: 'We are 100% funded by our members. The money goes towards platform operations, content production, development of tools like our AI, and hosting events.'
        },
        {
            question: 'Can I share my subscription?',
            answer: 'A Pro membership is personal. If you are a company, you can sign up for a Business membership, which provides company branding and job postings in addition to personal benefits.'
        },
        {
            question: 'How do I listen to articles?',
            answer: 'All our articles are recorded using neural voice technology. You can find the player at the top of each article, so you can listen on the go.'
        },
        {
            question: 'How do I contact you?',
            answer: 'You can email us at hello@happymates.dk. We are also available by phone at +45 22 80 37 50 every Tuesday and Thursday between 16:00 and 18:00.'
        }
    ]
};

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const items = faqs[locale];

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-zt-text-main mb-8 text-center">
                    {locale === 'da' ? 'Ofte Stillede Spørgsmål' : 'Frequently Asked Questions'}
                </h1>

                <div className="space-y-6">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-zt-border/50">
                            <h3 className="font-serif text-xl font-bold text-zt-text-main mb-4">
                                {item.question}
                            </h3>
                            <p className="text-zt-text-secondary leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-zt-text-secondary mb-4">
                        {locale === 'da' ? 'Fandt du ikke svar?' : "Didn't find your answer?"}
                    </p>
                    <a
                        href="mailto:hello@happymates.dk"
                        className="text-zt-accent-orange font-bold hover:underline"
                    >
                        hello@happymates.dk
                    </a>
                </div>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
