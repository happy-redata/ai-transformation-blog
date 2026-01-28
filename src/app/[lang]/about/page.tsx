import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale, getDictionary } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

// Translations for the about page
const aboutTranslations = {
    da: {
        title: 'Om os',
        subtitle: 'Vi tror på kraften i god softwareudvikling',
        subNav: {
            about: 'Om os',
            team: 'Holdet',
            contact: 'Kontakt',
            faq: 'FAQ',
            ethics: 'Etik',
        },
        principles: [
            {
                number: '#1',
                title: 'Vi er vores medlemmer',
                description: 'Vi er finansieret af vores medlemmer – ikke af annoncører. Det betyder, at vi kan fokusere på at skabe løsninger, der gør en forskel for dig.',
                color: 'bg-[#3d2f5c]',
            },
            {
                number: '#2',
                title: 'Vi giver overblik og graver dybt',
                description: 'Vi fortæller de store historier, men vi går også bagom overskrifterne for at give dig den dybde, som andre medier ikke har tid til.',
                color: 'bg-[#1e4d46]',
            },
            {
                number: '#3',
                title: 'Vi læser højt for dig',
                description: 'Alle vores artikler er indlæst som podcasts, så du kan lytte, mens du pendler, træner eller laver aftensmad.',
                color: 'bg-[#1a3a5c]',
            },
            {
                number: '#4',
                title: 'Vi bygger fællesskab',
                description: 'Vi er mere end et medie. Vi skaber events, samtaler og fællesskaber, hvor du kan møde andre nysgerrige mennesker.',
                color: 'bg-[#c75c2e]',
            },
        ],
        teamTitle: 'Mød Holdet',
        team: [
            {
                name: 'Henrik Mansfeldt Witt',
                role: 'Formand & Stifter',
                description: 'Strategisk ledelse og vision.',
            },
            {
                name: 'Niels Gregers Johansen',
                role: 'Næstformand & Stifter',
                description: 'Daglig ledelse og teknisk ansvarlig.',
            },
            {
                name: 'Per Tromborg',
                role: 'Kasserer',
                description: 'Økonomisk styring og compliance.',
            },
            {
                name: 'Emil Gregers Hedegaard Johansen',
                role: 'Bestyrelsesmedlem',
                description: 'Branding & Social Tryghed.',
            },
            {
                name: 'Mikkel Hedegaard Johansen',
                role: 'Bestyrelsesmedlem',
                description: 'Sikkerhed & Teknisk Tryghed.',
            },
        ],
        joinUs: 'Bliv medlem',
        joinDescription: 'Bli en del af fællesskabet i dag',
    },
    en: {
        title: 'About us',
        subtitle: 'We believe in the power of great software development',
        subNav: {
            about: 'About us',
            team: 'The Team',
            contact: 'Contact',
            faq: 'FAQ',
            ethics: 'Ethics',
        },
        principles: [
            {
                number: '#1',
                title: "We belong to our members",
                description: "We're funded by our members – not advertisers. That means we can focus on software development that actually makes a difference for you.",
                color: 'bg-[#3d2f5c]',
            },
            {
                number: '#2',
                title: 'We provide perspective and depth',
                description: "We tell the big stories, but we also go behind the headlines to give you the depth that other media don\u0027t have time for.",
                color: 'bg-[#1e4d46]',
            },
            {
                number: '#3',
                title: 'We read aloud for you',
                description: 'All our articles are recorded as podcasts, so you can listen while commuting, exercising, or making dinner.',
                color: 'bg-[#1a3a5c]',
            },
            {
                number: '#4',
                title: 'We build community',
                description: "We're more than a media outlet. We create events, conversations, and communities where you can meet other curious people.",
                color: 'bg-[#c75c2e]',
            },
        ],

        teamTitle: 'Meet the Team',
        team: [
            {
                name: 'Henrik Mansfeldt Witt',
                role: 'Chairman & Founder',
                description: 'Strategic leadership and vision.',
            },
            {
                name: 'Niels Gregers Johansen',
                role: 'Vice Chairman & Founder',
                description: 'Daily management and technical lead.',
            },
            {
                name: 'Per Tromborg',
                role: 'Treasurer',
                description: 'Financial management and compliance.',
            },
            {
                name: 'Emil Gregers Hedegaard Johansen',
                role: 'Board Member',
                description: 'Branding & Social Trust.',
            },
            {
                name: 'Mikkel Hedegaard Johansen',
                role: 'Board Member',
                description: 'Security & Technical Trust.',
            },
        ],
        joinUs: 'Become a member',
        joinDescription: 'Join the community today',
    },
};

export default async function AboutPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const t = aboutTranslations[locale];

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            {/* Sub Navigation */}
            <nav className="border-b border-zt-border sticky top-[57px] bg-zt-bg-cream z-40">
                <div className="container mx-auto px-4">
                    <div className="flex gap-8 overflow-x-auto py-4 -mb-px">
                        <Link
                            href={`/${locale}/about`}
                            className="text-sm font-medium text-zt-text-main border-b-2 border-zt-accent-orange pb-4 whitespace-nowrap"
                        >
                            {t.subNav.about}
                        </Link>
                        <Link
                            href={`/${locale}/about#team`}
                            className="text-sm font-medium text-zt-text-secondary hover:text-zt-text-main pb-4 whitespace-nowrap"
                        >
                            {t.subNav.team}
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="text-sm font-medium text-zt-text-secondary hover:text-zt-text-main pb-4 whitespace-nowrap"
                        >
                            {t.subNav.contact}
                        </Link>
                        <Link
                            href={`/${locale}/faq`}
                            className="text-sm font-medium text-zt-text-secondary hover:text-zt-text-main pb-4 whitespace-nowrap"
                        >
                            {t.subNav.faq}
                        </Link>
                        <Link
                            href={`/${locale}/ethics`}
                            className="text-sm font-medium text-zt-text-secondary hover:text-zt-text-main pb-4 whitespace-nowrap"
                        >
                            {t.subNav.ethics}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-zt-text-main mb-6">
                        {t.title}
                    </h1>
                    <p className="font-sans text-xl text-zt-text-secondary">
                        {t.subtitle}
                    </p>
                </div>
            </section>

            {/* Principle Cards */}
            <section className="flex-1 pb-20">
                <div className="container mx-auto px-4 max-w-4xl space-y-8">
                    {t.principles.map((principle, index) => (
                        <div
                            key={index}
                            className={`${principle.color} rounded-3xl p-8 md:p-12 text-white relative overflow-hidden`}
                        >
                            <div className="relative z-10">
                                <span className="text-sm font-bold opacity-80 uppercase tracking-wider">
                                    {principle.number}
                                </span>
                                <h2 className="font-serif text-2xl md:text-4xl font-bold mt-2 mb-4">
                                    {principle.title}
                                </h2>
                                <p className="font-sans text-lg md:text-xl opacity-90 max-w-2xl">
                                    {principle.description}
                                </p>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
                                <svg viewBox="0 0 100 100" className="h-full w-full" fill="currentColor">
                                    <circle cx="80" cy="30" r="40" />
                                    <circle cx="60" cy="70" r="30" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Team Section */}
            <section id="team" className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-center text-zt-text-main mb-16">
                        {t.teamTitle}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {t.team.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-40 h-40 bg-gray-200 rounded-full mb-6 overflow-hidden relative border-4 border-zt-bg-cream">
                                    {/* Placeholder Avatar - using name initials or consistent placeholder */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=200`}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-zt-text-main mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-zt-accent-orange font-bold uppercase tracking-wider text-sm mb-4">
                                    {member.role}
                                </p>
                                <p className="text-zt-text-secondary max-w-xs leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-16 bg-zt-accent-teal text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                        {t.joinUs}
                    </h2>
                    <p className="font-sans text-lg opacity-90 mb-8">
                        {t.joinDescription}
                    </p>
                    <Link
                        href={`/${locale}/membership`}
                        className="inline-block bg-white text-zt-accent-teal font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {t.joinUs}
                    </Link>
                </div>
            </section>

            <Footer lang={locale} />
        </main>
    );
}
