import Link from 'next/link';
import Image from 'next/image';
import { Locale, getDictionary } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import BurgerMenu from './BurgerMenu';

type HeaderProps = {
    lang: Locale;
};

export default async function Header({ lang }: HeaderProps) {
    const dict = await getDictionary(lang);

    return (
        <header className="py-4 border-b border-zt-border sticky top-0 bg-zt-bg-cream/95 backdrop-blur-sm z-50">
            <div className="w-full px-6 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link href={`/${lang}`} className="hover:opacity-80 transition-opacity">
                        <Image
                            src="/logo.svg"
                            alt="Voice of Happy Mates"
                            width={225}
                            height={60}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>
                    <span className="px-2 py-0.5 text-xs font-medium text-zt-text-secondary bg-zt-bg-card border border-zt-border rounded-full uppercase tracking-wide">
                        Preview
                    </span>
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-4">
                    {/* Search Button */}
                    <Link
                        href={`/${lang}/search`}
                        className="p-2 text-zt-text-secondary hover:text-zt-text-main transition-colors"
                        aria-label="Search"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </Link>

                    {/* Find Stories CTA - Desktop */}
                    <Link
                        href={`/${lang}`}
                        className="hidden md:block px-5 py-2.5 bg-zt-accent-orange text-white rounded-full font-bold hover:bg-orange-600 transition-colors shadow-sm text-sm"
                    >
                        {dict.nav.findStories}
                    </Link>

                    {/* Language switcher - hidden on mobile */}
                    <div className="hidden sm:block">
                        <LanguageSwitcher currentLocale={lang} />
                    </div>

                    {/* Burger Menu */}
                    <BurgerMenu
                        locale={lang}
                        dictionary={dict}
                    />
                </div>
            </div>
        </header>
    );
}
