import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';
import Link from 'next/link';

const eventsTranslations = {
    da: {
        title: 'Events & Bootcamp',
        subtitle: 'Deltag i vores intensive bootcamp-oplevelse på Fuerteventura',
        heroDescription: 'En uges intensiv læring hvor vi bruger AI-værktøjer som GitHub Spark og GitHub Copilot til at skabe innovative IT-løsninger. Kombineret med sport og social træning.',

        upcomingEvent: {
            badge: 'NÆSTE EVENT',
            title: 'Første Bootcamp 2026',
            location: 'Playitas Resort, Fuerteventura',
            dates: '15. - 22. september 2026',
        },

        travelInfo: {
            title: 'Rejseinformation',
            copenhagen: {
                city: 'København',
                departure: 'Tirsdag 15. sept',
                meetTime: 'Mødetid: kl. 06:40',
                flightTime: 'Afgang: kl. 08:40',
                returnDate: 'Tirsdag 22. sept',
                arrivalTime: 'Ankomst: kl. 19:45',
            },
            billund: {
                city: 'Billund',
                departure: 'Tirsdag 15. sept',
                meetTime: 'Mødetid: kl. 05:00',
                flightTime: 'Afgang: kl. 07:00',
                returnDate: 'Tirsdag 22. sept',
                arrivalTime: 'Ankomst: kl. 17:35',
            },
        },

        highlights: [
            {
                icon: '⏰',
                title: '6 timer dagligt',
                description: 'AI-fokuseret udvikling',
            },
            {
                icon: '🤖',
                title: 'AI-Løsning',
                description: 'Byg med Spark & Copilot',
            },
            {
                icon: '👥',
                title: 'Teams af 3',
                description: '1 ung med autisme, 1 studerende, 1 fra forretningen',
            },
        ],

        schedule: {
            title: 'Ugens Program',
            days: [
                {
                    day: 'Tirsdag',
                    date: '15. sept',
                    title: 'Ankomst',
                    activities: [
                        'Afrejse fra København (kl. 08:40) eller Billund (kl. 07:00)',
                        'Ankomst til Playitas Resort, Fuerteventura',
                        'Check-in og indkvartering',
                        'Velkomstmiddag',
                    ],
                },
                {
                    day: 'Onsdag',
                    date: '16. sept',
                    title: 'GitHub Spark Dag',
                    activities: [
                        'Introduktion til ugen, hinanden og AI-værktøjerne',
                        'Introduktion til GitHub Spark',
                        'Vibe coding fundamentals - udvikl ved at beskrive',
                        'Hands-on: Byg din første app med Spark',
                        'Gruppedannelse',
                        'Eftermiddag: Sport og aktiviteter',
                    ],
                },
                {
                    day: 'Torsdag',
                    date: '17. sept',
                    title: 'GitHub Copilot Dag',
                    activities: [
                        'GitHub Copilot best practices',
                        'AI-assisteret kodning i praksis',
                        'Prompt engineering for udviklere',
                        'Gruppearbejde: Start på fælles projekt',
                        'Eftermiddag: Sport og aktiviteter',
                    ],
                },
                {
                    day: 'Fredag',
                    date: '18. sept',
                    title: 'Integration Dag',
                    activities: [
                        'Kombiner Spark og Copilot i arbejdsprocessen',
                        'AI som teammedlem - effektiv collaboration',
                        'Videreudvikling af gruppeprojekt',
                        'Feedback og iteration med AI',
                        'Eftermiddag: Sport og aktiviteter',
                    ],
                },
                {
                    day: 'Lørdag',
                    date: '19. sept',
                    title: 'Social Dag',
                    activities: [
                        'Morgenmøde og kort status på projekter',
                        'Teambuilding aktiviteter',
                        'Sport og udendørs aktiviteter',
                        'Social træning i praksis',
                        'Afslappende aften sammen',
                    ],
                },
                {
                    day: 'Søndag',
                    date: '20. sept',
                    title: 'Innovation Dag',
                    activities: [
                        'Brug AI til at løse komplekse udfordringer',
                        'Eksperimenter med forskellige AI-tilgange',
                        'Gruppearbejde: Finpudsning af løsninger',
                        'Virksomhedscases med AI-fokus',
                        'Eftermiddag: Sport og aktiviteter',
                    ],
                },
                {
                    day: 'Mandag',
                    date: '21. sept',
                    title: 'Præsentation Dag',
                    activities: [
                        'Sidste finpudsning af AI-løsninger',
                        'Forberedelse af præsentationer',
                        'Præsentation for virksomheder - vis jeres AI-kompetencer',
                        'Feedback og evaluering',
                        'Afslutningsfest og diplomer',
                    ],
                },
                {
                    day: 'Tirsdag',
                    date: '22. sept',
                    title: 'Hjemrejse',
                    activities: [
                        'Morgenmad og oppakning',
                        'Check-out fra Playitas Resort',
                        'Afrejse til København eller Billund',
                        'Farvel og tak for en fantastisk uge!',
                    ],
                },
            ],
        },

        techniques: {
            title: 'AI-Drevne Udviklingsteknikker',
            description: 'Vi fokuserer 100% på moderne AI-værktøjer og teknikker til at skabe innovative løsninger.',
            items: [
                'Lær at udvikle intuitivt med GitHub Spark - byg applikationer ved at beskrive hvad du vil have',
                'Mestre AI-assisteret kodning med GitHub Copilot til hurtigere og smartere udvikling',
                'Lær at kommunikere effektivt med AI-værktøjer for at få de bedste resultater',
                'Brug AI til at accelerere hele udviklingsprocessen fra idé til færdig løsning',
                'Samarbejd med AI som en teammedlem og lær at integrere AI i arbejdsprocessen',
                'Brug AI-værktøjer til at finde innovative løsninger på komplekse problemer',
            ],
        },

        technicalApproach: {
            title: 'Teknisk Tilgang',
            subtitle: 'Microsoft 365 + Cloud Native + Self-Hosted = Strategisk Uafhængighed',
            description: 'Vi integrerer self-hosted løsninger baseret på Cloud Native principper indenfor Microsoft 365 økosystemet.',
            benefits: [
                { icon: '🔒', text: 'Løsninger I selv kontrollerer og kan hoste hvor I vil' },
                { icon: '📈', text: 'Moderne arkitektur der er skalerbar og fleksibel' },
                { icon: '🌐', text: 'Mindre afhængighed af store tech-virksomheder' },
            ],
        },

        cta: {
            title: 'Klar til at deltage?',
            description: 'Tilmeld dig vores næste bootcamp og få hands-on erfaring med AI-udvikling',
            button: 'Kontakt os',
        },
    },
    en: {
        title: 'Events & Bootcamp',
        subtitle: 'Join our intensive bootcamp experience in Fuerteventura',
        heroDescription: 'One week of intensive learning where we use AI tools like GitHub Spark and GitHub Copilot to create innovative IT solutions. Combined with sports and social training.',

        upcomingEvent: {
            badge: 'NEXT EVENT',
            title: 'First Bootcamp 2026',
            location: 'Playitas Resort, Fuerteventura',
            dates: 'September 15 - 22, 2026',
        },

        travelInfo: {
            title: 'Travel Information',
            copenhagen: {
                city: 'Copenhagen',
                departure: 'Tuesday Sept 15',
                meetTime: 'Meeting time: 06:40',
                flightTime: 'Departure: 08:40',
                returnDate: 'Tuesday Sept 22',
                arrivalTime: 'Arrival: 19:45',
            },
            billund: {
                city: 'Billund',
                departure: 'Tuesday Sept 15',
                meetTime: 'Meeting time: 05:00',
                flightTime: 'Departure: 07:00',
                returnDate: 'Tuesday Sept 22',
                arrivalTime: 'Arrival: 17:35',
            },
        },

        highlights: [
            {
                icon: '⏰',
                title: '6 hours daily',
                description: 'AI-focused development',
            },
            {
                icon: '🤖',
                title: 'AI Solution',
                description: 'Build with Spark & Copilot',
            },
            {
                icon: '👥',
                title: 'Teams of 3',
                description: '1 young person with autism, 1 student, 1 business professional',
            },
        ],

        schedule: {
            title: 'Weekly Program',
            days: [
                {
                    day: 'Tuesday',
                    date: 'Sept 15',
                    title: 'Arrival',
                    activities: [
                        'Departure from Copenhagen (08:40) or Billund (07:00)',
                        'Arrival at Playitas Resort, Fuerteventura',
                        'Check-in and accommodation',
                        'Welcome dinner',
                    ],
                },
                {
                    day: 'Wednesday',
                    date: 'Sept 16',
                    title: 'GitHub Spark Day',
                    activities: [
                        'Introduction to the week, each other and AI tools',
                        'Introduction to GitHub Spark',
                        'Vibe coding fundamentals - develop by describing',
                        'Hands-on: Build your first app with Spark',
                        'Team formation',
                        'Afternoon: Sports and activities',
                    ],
                },
                {
                    day: 'Thursday',
                    date: 'Sept 17',
                    title: 'GitHub Copilot Day',
                    activities: [
                        'GitHub Copilot best practices',
                        'AI-assisted coding in practice',
                        'Prompt engineering for developers',
                        'Group work: Start on joint project',
                        'Afternoon: Sports and activities',
                    ],
                },
                {
                    day: 'Friday',
                    date: 'Sept 18',
                    title: 'Integration Day',
                    activities: [
                        'Combine Spark and Copilot in workflow',
                        'AI as team member - effective collaboration',
                        'Further development of group project',
                        'Feedback and iteration with AI',
                        'Afternoon: Sports and activities',
                    ],
                },
                {
                    day: 'Saturday',
                    date: 'Sept 19',
                    title: 'Social Day',
                    activities: [
                        'Morning meeting and project status',
                        'Team building activities',
                        'Sports and outdoor activities',
                        'Social training in practice',
                        'Relaxing evening together',
                    ],
                },
                {
                    day: 'Sunday',
                    date: 'Sept 20',
                    title: 'Innovation Day',
                    activities: [
                        'Use AI to solve complex challenges',
                        'Experiment with different AI approaches',
                        'Group work: Fine-tuning solutions',
                        'Business cases with AI focus',
                        'Afternoon: Sports and activities',
                    ],
                },
                {
                    day: 'Monday',
                    date: 'Sept 21',
                    title: 'Presentation Day',
                    activities: [
                        'Final polish of AI solutions',
                        'Preparation of presentations',
                        'Presentation to businesses - show your AI skills',
                        'Feedback and evaluation',
                        'Closing party and diplomas',
                    ],
                },
                {
                    day: 'Tuesday',
                    date: 'Sept 22',
                    title: 'Departure',
                    activities: [
                        'Breakfast and packing',
                        'Check-out from Playitas Resort',
                        'Departure to Copenhagen or Billund',
                        'Goodbye and thanks for an amazing week!',
                    ],
                },
            ],
        },

        techniques: {
            title: 'AI-Driven Development Techniques',
            description: 'We focus 100% on modern AI tools and techniques to create innovative solutions.',
            items: [
                'Learn to develop intuitively with GitHub Spark - build applications by describing what you want',
                'Master AI-assisted coding with GitHub Copilot for faster and smarter development',
                'Learn to communicate effectively with AI tools to get the best results',
                'Use AI to accelerate the entire development process from idea to finished solution',
                'Collaborate with AI as a team member and learn to integrate AI into the workflow',
                'Use AI tools to find innovative solutions to complex problems',
            ],
        },

        technicalApproach: {
            title: 'Technical Approach',
            subtitle: 'Microsoft 365 + Cloud Native + Self-Hosted = Strategic Independence',
            description: 'We integrate self-hosted solutions based on Cloud Native principles within the Microsoft 365 ecosystem.',
            benefits: [
                { icon: '🔒', text: 'Solutions you control and can host wherever you want' },
                { icon: '📈', text: 'Modern architecture that is scalable and flexible' },
                { icon: '🌐', text: 'Less dependence on big tech companies' },
            ],
        },

        cta: {
            title: 'Ready to join?',
            description: 'Sign up for our next bootcamp and get hands-on experience with AI development',
            button: 'Contact us',
        },
    },
};

export default async function EventsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const t = eventsTranslations[locale];

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#1a3a5c] via-[#1e4d46] to-[#3d2f5c] text-white py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
                            {t.title}
                        </h1>
                        <p className="font-sans text-xl md:text-2xl opacity-90 mb-8">
                            {t.subtitle}
                        </p>
                        <p className="font-sans text-lg opacity-80 max-w-2xl mx-auto">
                            {t.heroDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* Upcoming Event Card */}
            <section className="py-12 -mt-8 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-zt-accent-orange">
                        <span className="inline-block bg-zt-accent-orange text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                            {t.upcomingEvent.badge}
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-zt-text-main mb-4">
                            {t.upcomingEvent.title}
                        </h2>
                        <div className="flex flex-wrap gap-6 text-zt-text-secondary">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">📍</span>
                                <span className="text-lg">{t.upcomingEvent.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">📅</span>
                                <span className="text-lg">{t.upcomingEvent.dates}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {t.highlights.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                                <span className="text-5xl mb-4 block">{item.icon}</span>
                                <h3 className="font-serif text-xl font-bold text-zt-text-main mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-zt-text-secondary">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Travel Info */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-zt-text-main mb-12">
                        {t.travelInfo.title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Copenhagen */}
                        <div className="bg-gradient-to-br from-[#1a3a5c] to-[#2a5a8c] rounded-2xl p-8 text-white">
                            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
                                <span>✈️</span> {t.travelInfo.copenhagen.city}
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="font-bold text-sm opacity-80">{t.travelInfo.copenhagen.departure}</p>
                                    <p>{t.travelInfo.copenhagen.meetTime}</p>
                                    <p>{t.travelInfo.copenhagen.flightTime}</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="font-bold text-sm opacity-80">{t.travelInfo.copenhagen.returnDate}</p>
                                    <p>{t.travelInfo.copenhagen.arrivalTime}</p>
                                </div>
                            </div>
                        </div>
                        {/* Billund */}
                        <div className="bg-gradient-to-br from-[#1e4d46] to-[#2e6d66] rounded-2xl p-8 text-white">
                            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
                                <span>✈️</span> {t.travelInfo.billund.city}
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="font-bold text-sm opacity-80">{t.travelInfo.billund.departure}</p>
                                    <p>{t.travelInfo.billund.meetTime}</p>
                                    <p>{t.travelInfo.billund.flightTime}</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="font-bold text-sm opacity-80">{t.travelInfo.billund.returnDate}</p>
                                    <p>{t.travelInfo.billund.arrivalTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Weekly Schedule */}
            <section className="py-16 bg-zt-bg-cream">
                <div className="container mx-auto px-4">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-zt-text-main mb-12">
                        {t.schedule.title}
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {t.schedule.days.map((day, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row">
                                    <div className="bg-gradient-to-br from-zt-accent-orange to-[#e07040] text-white p-6 md:w-48 flex-shrink-0">
                                        <p className="font-bold text-lg">{day.day}</p>
                                        <p className="text-sm opacity-80">{day.date}</p>
                                        <p className="mt-2 text-sm font-medium">{day.title}</p>
                                    </div>
                                    <div className="p-6 flex-1">
                                        <ul className="space-y-2">
                                            {day.activities.map((activity, actIndex) => (
                                                <li key={actIndex} className="flex items-start gap-3 text-zt-text-secondary">
                                                    <span className="text-zt-accent-teal mt-1">•</span>
                                                    <span>{activity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Techniques */}
            <section className="py-16 bg-[#1e4d46] text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">
                            {t.techniques.title}
                        </h2>
                        <p className="text-center text-lg opacity-90 mb-12 max-w-2xl mx-auto">
                            {t.techniques.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {t.techniques.items.map((item, index) => (
                                <div key={index} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <div className="flex items-start gap-4">
                                        <span className="text-zt-accent-orange text-2xl">✓</span>
                                        <p className="text-lg">{item}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Approach */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-zt-text-main mb-4">
                            {t.technicalApproach.title}
                        </h2>
                        <p className="text-xl text-zt-accent-teal font-bold mb-4">
                            {t.technicalApproach.subtitle}
                        </p>
                        <p className="text-zt-text-secondary mb-12 max-w-2xl mx-auto">
                            {t.technicalApproach.description}
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            {t.technicalApproach.benefits.map((benefit, index) => (
                                <div key={index} className="bg-zt-bg-cream rounded-xl p-6">
                                    <span className="text-4xl mb-4 block">{benefit.icon}</span>
                                    <p className="text-zt-text-main font-medium">{benefit.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-zt-accent-teal text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                        {t.cta.title}
                    </h2>
                    <p className="font-sans text-lg opacity-90 mb-8 max-w-xl mx-auto">
                        {t.cta.description}
                    </p>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-block bg-white text-zt-accent-teal font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {t.cta.button}
                    </Link>
                </div>
            </section>

            <Footer lang={locale} />
        </main>
    );
}
