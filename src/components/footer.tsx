import Link from 'next/link';
import { Locale, getDictionary } from '@/lib/i18n';

type FooterProps = {
    lang: Locale;
};

export default async function Footer({ lang }: FooterProps) {
    const dict = await getDictionary(lang);
    const year = new Date().getFullYear();

    return (
        <footer className="py-12 bg-zt-bg-dark text-white mt-auto">
            <div className="container mx-auto px-6 md:px-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-serif text-xl font-bold mb-4">Happy Mates Society</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {lang === 'da'
                                ? 'En serie af artikler om AI, digital transformation og moderne softwareudvikling.'
                                : 'A series of articles about AI, digital transformation and modern software development.'}
                        </p>
                        <a
                            href="https://happymates.dk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-zt-accent-orange hover:text-orange-400 transition-colors"
                        >
                            happymates.dk →
                        </a>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">
                            {lang === 'da' ? 'Juridisk' : 'Legal'}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={`/${lang}/privacy`} className="text-gray-300 hover:text-white transition-colors">
                                    {lang === 'da' ? 'Privatlivspolitik' : 'Privacy Policy'}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/terms`} className="text-gray-300 hover:text-white transition-colors">
                                    {lang === 'da' ? 'Vilkår og betingelser' : 'Terms & Conditions'}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/cookies`} className="text-gray-300 hover:text-white transition-colors">
                                    {lang === 'da' ? 'Cookiepolitik' : 'Cookie Policy'}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">
                            {lang === 'da' ? 'Kontakt' : 'Contact'}
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Happy Mates Society</li>
                            <li>
                                <a href="mailto:hello@happymates.dk" className="hover:text-white transition-colors">
                                    hello@happymates.dk
                                </a>
                            </li>
                            <li className="pt-2">
                                <a href="tel:+4522803750" className="hover:text-white transition-colors">
                                    {lang === 'da' ? 'Telefon: 22 80 37 50' : 'Phone: +45 22 80 37 50'}
                                </a>
                            </li>
                            <li className="text-gray-400 text-xs">
                                {lang === 'da'
                                    ? 'Hver tirsdag og torsdag ml. 16 og 18'
                                    : 'Every Tuesday and Thursday between 16:00 and 18:00'}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        &copy; {year} Happy Mates Society. {dict.footer.copyright}
                    </p>
                    <p className="text-gray-500 text-xs">
                        {lang === 'da'
                            ? 'Lydproduktion drevet af Azure Neural Voices'
                            : 'Audio powered by Azure Neural Voices'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
