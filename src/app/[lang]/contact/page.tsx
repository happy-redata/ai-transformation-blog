import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';
import Link from 'next/link';

const content = {
    da: {
        title: 'Kontakt os',
        intro: 'Vi vil meget gerne høre fra dig. Uanset om du har spørgsmål, feedback eller bare vil sige hej.',
        email: {
            label: 'Email',
            value: 'hello@happymates.dk',
            description: 'Vi svarer normalt inden for 24 timer på hverdage.'
        },
        phone: {
            label: 'Telefon',
            value: '+45 22 80 37 50',
            description: 'Telefonisk åbningstid: Hver tirsdag og torsdag mellem kl. 16 og 18.'
        },
        address: {
            label: 'Adresse',
            lines: [
                'CW Red AI Transformation',
                'c/o Kronborg Fonden',
                'Danmark'
            ]
        },
        social: {
            label: 'Følg os',
            links: [
                { name: 'LinkedIn', url: 'https://linkedin.com/company/happymates' },
                { name: 'GitHub', url: 'https://github.com/happymates' }
            ]
        },
        cta: {
            title: 'Bliv en del af fællesskabet',
            description: 'Tilmeld dig CW Red AI Transformation og få adgang til eksklusive artikler, AI-værktøjer og events.',
            button: 'Bliv medlem'
        },
        board: {
            label: 'Bestyrelse',
            members: [
                { name: 'Henrik Mansfeldt Witt', role: 'Formand' },
                { name: 'Niels Gregers Johansen', role: 'Næstformand' },
                { name: 'Per Tromborg', role: 'Kasserer' },
                { name: 'Emil Gregers Hedegaard Johansen', role: 'Bestyrelsesmedlem', focus: 'Branding & Social Tryghed' },
                { name: 'Mikkel Hedegaard Johansen', role: 'Bestyrelsesmedlem', focus: 'Sikkerhed & Teknisk Tryghed' }
            ]
        }
    },
    en: {
        title: 'Contact us',
        intro: "We'd love to hear from you. Whether you have questions, feedback, or just want to say hello.",
        email: {
            label: 'Email',
            value: 'hello@happymates.dk',
            description: 'We typically respond within 24 hours on weekdays.'
        },
        phone: {
            label: 'Phone',
            value: '+45 22 80 37 50',
            description: 'Phone hours: Every Tuesday and Thursday between 16:00 and 18:00.'
        },
        address: {
            label: 'Address',
            lines: [
                'CW Red AI Transformation',
                'c/o Kronborg Fonden',
                'Denmark'
            ]
        },
        social: {
            label: 'Follow us',
            links: [
                { name: 'LinkedIn', url: 'https://linkedin.com/company/happymates' },
                { name: 'GitHub', url: 'https://github.com/happymates' }
            ]
        },
        cta: {
            title: 'Join the community',
            description: 'Sign up for CW Red AI Transformation and get access to exclusive articles, AI tools, and events.',
            button: 'Become a member'
        },
        board: {
            label: 'Board of Directors',
            members: [
                { name: 'Henrik Mansfeldt Witt', role: 'Chairman' },
                { name: 'Niels Gregers Johansen', role: 'Vice Chairman' },
                { name: 'Per Tromborg', role: 'Treasurer' },
                { name: 'Emil Gregers Hedegaard Johansen', role: 'Board Member', focus: 'Branding & Social Trust' },
                { name: 'Mikkel Hedegaard Johansen', role: 'Board Member', focus: 'Security & Technical Trust' }
            ]
        }
    }
};

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const t = content[locale];

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-zt-text-main mb-6">
                        {t.title}
                    </h1>
                    <p className="text-xl text-zt-text-secondary max-w-2xl mx-auto">
                        {t.intro}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Email Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zt-border/50">
                        <div className="w-12 h-12 bg-zt-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-zt-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main mb-2">
                            {t.email.label}
                        </h3>
                        <a
                            href={`mailto:${t.email.value}`}
                            className="text-zt-accent-orange font-bold text-lg hover:underline block mb-2"
                        >
                            {t.email.value}
                        </a>
                        <p className="text-zt-text-secondary text-sm">
                            {t.email.description}
                        </p>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zt-border/50">
                        <div className="w-12 h-12 bg-zt-accent-orange/10 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-zt-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main mb-2">
                            {t.phone.label}
                        </h3>
                        <a
                            href={`tel:${t.phone.value.replace(/\s/g, '')}`}
                            className="text-zt-accent-orange font-bold text-lg hover:underline block mb-2"
                        >
                            {t.phone.value}
                        </a>
                        <p className="text-zt-text-secondary text-sm">
                            {t.phone.description}
                        </p>
                    </div>

                    {/* Address Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zt-border/50">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main mb-2">
                            {t.address.label}
                        </h3>
                        <div className="text-zt-text-secondary">
                            {t.address.lines.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>

                    {/* Social Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zt-border/50">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zt-text-main mb-4">
                            {t.social.label}
                        </h3>
                        <div className="flex gap-4">
                            {t.social.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-zt-bg-cream rounded-full text-sm font-bold text-zt-text-main hover:bg-gray-200 transition-colors"
                                >
                                    {link.name} →
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Board Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-zt-border/50 mb-16">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-zt-text-main mb-6">
                        {t.board.label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {t.board.members.map((member, i) => (
                            <div key={i} className="p-4 bg-zt-bg-cream rounded-xl">
                                <p className="font-bold text-zt-text-main">{member.name}</p>
                                <p className="text-sm text-zt-text-secondary">{member.role}</p>
                                {member.focus && (
                                    <p className="text-xs text-zt-accent-teal mt-1 font-medium">{member.focus}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-zt-accent-teal rounded-3xl p-8 md:p-12 text-white text-center">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                        {t.cta.title}
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                        {t.cta.description}
                    </p>
                    <Link
                        href={`/${locale}/membership`}
                        className="inline-block bg-white text-zt-accent-teal font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {t.cta.button}
                    </Link>
                </div>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
