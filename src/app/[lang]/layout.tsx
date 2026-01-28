import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { locales, Locale, isValidLocale, getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { AuthProvider } from "@/components/AuthProvider";
import { RoleProvider } from "@/components/RoleProvider";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
    weight: ["300", "400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-merriweather"
});

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    return {
        title: dict.home.title,
        description: dict.home.subtitle,
    };
}

export default async function LangLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    return (
        <html lang={lang}>
            <head>
                {/* Microsoft Clarity Analytics */}
                <Script
                    id="clarity-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "uznmtpjy9e");
                        `,
                    }}
                />
            </head>
            <body className={`${inter.variable} ${merriweather.variable} min-h-screen flex flex-col`}>
                <AuthProvider>
                    <RoleProvider>
                        {children}
                        <CookieConsent locale={lang} />
                    </RoleProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

