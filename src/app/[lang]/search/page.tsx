import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale, getDictionary } from '@/lib/i18n';
import SearchInterface from '@/components/SearchInterface';

export default async function SearchPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />
            <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl flex-1">
                <h1 className="sr-only">
                    {locale === 'da' ? 'Søg' : 'Search'}
                </h1>
                <SearchInterface locale={locale} dictionary={dict} />
            </div>
            <Footer lang={locale} />
        </main>
    );
}
