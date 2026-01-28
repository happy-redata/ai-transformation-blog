import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';

type Principle = {
    title: string;
    description: string;
};

const content: Record<Locale, { title: string; intro: string; sections: Principle[] }> = {
    da: {
        title: 'Etiske Retningslinjer',
        intro: 'Hos CW Red AI Transformation tror vi på, at teknologi og softwareudvikling skal gå hånd i hånd med høj etik og gennemsigtighed. Her er de principper, vi arbejder efter.',
        sections: [
            {
                title: 'Uafhængighed',
                description: 'Vi er finansieret af vores medlemmer. Det giver os friheden til at fokusere på det indhold, der giver værdi for fællesskabet, uden at skulle tage hensyn til annoncører eller kommercielle særinteresser.'
            },
            {
                title: 'Brug af AI og Troværdighed',
                description: 'Vi omfavner kunstig intelligens som et værktøj til at forbedre vores indhold og arbejdsgange. Vi bruger AI til research, lydproduktion (Azure Neural Voices) og som en "Help AI" sparingspartner. Men det redaktionelle ansvar ligger altid hos mennesker. Vi faktatjekker og sikrer kvaliteten af alt, vi udgiver.'
            },
            {
                title: 'Transparens',
                description: 'Vi er åbne om vores metoder, vores økonomi og vores brug af teknologi. Hvis vi begår fejl, retter vi dem hurtigt og tydeligt.'
            },
            {
                title: 'Fællesskab og Tone',
                description: 'Vi ønsker at skabe et rum for nysgerrighed og lærdom. Vi taler ordentligt til og om hinanden. Vi tror på, at de bedste idéer opstår i et åbent og respektfuldt miljø.'
            }
        ]
    },
    en: {
        title: 'Ethical Guidelines',
        intro: 'At CW Red AI Transformation, we believe that technology and software development must go hand in hand with high ethics and transparency. Here are the principles we work by.',
        sections: [
            {
                title: 'Independence',
                description: 'We are funded by our members. This gives us the freedom to focus on content that brings value to the community, without having to cater to advertisers or commercial special interests.'
            },
            {
                title: 'Use of AI and Credibility',
                description: 'We embrace artificial intelligence as a tool to improve our content and workflows. We use AI for research, audio production (Azure Neural Voices), and as a "Help AI" partner. However, editorial responsibility always lies with humans. We fact-check and ensure the quality of everything we publish.'
            },
            {
                title: 'Transparency',
                description: 'We are open about our methods, our finances, and our use of technology. If we make mistakes, we correct them quickly and clearly.'
            },
            {
                title: 'Community and Tone',
                description: 'We want to create a space for curiosity and learning. We speak respectfully to and about each other. We believe that the best ideas emerge in an open and respectful environment.'
            }
        ]
    }
};

export default async function EthicsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const t = content[locale];

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-zt-text-main mb-6 text-center">
                    {t.title}
                </h1>

                <p className="text-xl text-zt-text-secondary text-center mb-16 leading-relaxed">
                    {t.intro}
                </p>

                <div className="space-y-12">
                    {t.sections.map((section, index) => (
                        <div key={index} className="prose prose-lg max-w-none">
                            <h2 className="font-serif text-2xl font-bold text-zt-text-main mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-zt-accent-teal text-white flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </span>
                                {section.title}
                            </h2>
                            <div className="pl-11 border-l-2 border-zt-border/30">
                                <p className="text-zt-text-secondary">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
