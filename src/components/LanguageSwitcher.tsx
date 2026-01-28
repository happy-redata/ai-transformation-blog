'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, locales, localeNames } from '@/lib/i18n';

type LanguageSwitcherProps = {
    currentLocale: Locale;
};

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    // Get the path without the locale prefix
    const getPathWithoutLocale = () => {
        const segments = pathname.split('/');
        if (locales.includes(segments[1] as Locale)) {
            return '/' + segments.slice(2).join('/');
        }
        return pathname;
    };

    const pathWithoutLocale = getPathWithoutLocale();

    return (
        <div className="flex items-center gap-2">
            {locales.map((locale) => (
                <Link
                    key={locale}
                    href={`/${locale}${pathWithoutLocale}`}
                    className={`
            font-sans text-sm px-2 py-1 rounded transition-colors
            ${currentLocale === locale
                            ? 'bg-zt-text-main text-white'
                            : 'text-zt-text-secondary hover:text-zt-text-main hover:bg-gray-100'
                        }
          `}
                >
                    {locale.toUpperCase()}
                </Link>
            ))}
        </div>
    );
}
