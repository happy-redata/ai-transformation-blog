import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return {
        title: locale === 'da' ? 'Cookiepolitik | CW Red AI Transformation' : 'Cookie Policy | CW Red AI Transformation',
        description: locale === 'da'
            ? 'Læs om vores brug af cookies og hvordan vi beskytter dine data.'
            : 'Read about our use of cookies and how we protect your data.'
    };
}

export default async function CookiesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-6 md:px-8 max-w-4xl py-12 md:py-20 flex-1">
                <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-zt-text-main prose-p:font-sans prose-p:text-zt-text-secondary">
                    {locale === 'da' ? (
                        <>
                            <h1>Cookiepolitik</h1>
                            <p className="lead">CW Red AI Transformation bruger cookies til at forbedre din oplevelse på vores hjemmeside.</p>

                            <h2>1. Hvad er cookies?</h2>
                            <p>En cookie er en lille tekstfil, som gemmes på din computer eller mobilenhed, når du besøger en hjemmeside. Cookies gør det muligt for hjemmesiden at huske dine handlinger og indstillinger (såsom login, sprog, skriftstørrelse og andre visningsindstillinger) over en periode, så du ikke behøver at foretage dem hver gang, du besøger siden.</p>

                            <h2>2. Hvordan bruger vi cookies?</h2>
                            <p>Vi bruger cookies til følgende formål:</p>
                            <ul>
                                <li>At sikre, at hjemmesiden fungerer teknisk (nødvendige cookies).</li>
                                <li>At huske dine præferencer, såsom sprogvalg.</li>
                                <li>At analysere trafik på hjemmesiden for at forbedre indhold og brugeroplevelse.</li>
                            </ul>

                            <h2>3. Cookietypeoversigt</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr>
                                            <th>Navn</th>
                                            <th>Formål</th>
                                            <th>Udløb</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>cookie-consent</td>
                                            <td>Husker om du har accepteret eller afvist cookies.</td>
                                            <td>1 år</td>
                                        </tr>
                                        <tr>
                                            <td>NEXT_LOCALE</td>
                                            <td>Husker dit valgte sprog til næste besøg.</td>
                                            <td>Session</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2>4. Sådan afviser eller sletter du cookies</h2>
                            <p>Du kan altid afvise cookies på din computer ved at ændre indstillingerne i din browser. Hvor du finder indstillingerne afhænger af, hvilken browser du anvender. Du skal dog være opmærksom på, at hvis du gør det, er der mange funktioner og services, du ikke kan bruge, fordi de forudsætter, at hjemmesiden kan huske de valg, du foretager.</p>

                            <h2>5. Ejeroplysninger</h2>
                            <p>Denne hjemmeside drives og ejes af:</p>
                            <address className="not-italic">
                                <strong>CW Red AI Transformation</strong><br />
                                <a href="mailto:info@red.dk">info@red.dk</a>
                            </address>
                        </>
                    ) : (
                        <>
                            <h1>Cookie Policy</h1>
                            <p className="lead">CW Red AI Transformation uses cookies to improve your experience on our website.</p>

                            <h2>1. What are cookies?</h2>
                            <p>A cookie is a small text file that is stored on your computer or mobile device when you visit a website. Cookies enable the website to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>

                            <h2>2. How do we use cookies?</h2>
                            <p>We use cookies for the following purposes:</p>
                            <ul>
                                <li>To ensure the website functions technically (necessary cookies).</li>
                                <li>To remember your preferences, such as language selection.</li>
                                <li>To analyze website traffic to improve content and user experience.</li>
                            </ul>

                            <h2>3. Cookie Overview</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Purpose</th>
                                            <th>Expiry</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>cookie-consent</td>
                                            <td>Remembers whether you have accepted or declined cookies.</td>
                                            <td>1 year</td>
                                        </tr>
                                        <tr>
                                            <td>NEXT_LOCALE</td>
                                            <td>Remembers your selected language for next visit.</td>
                                            <td>Session</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2>4. How to reject or delete cookies</h2>
                            <p>You can always reject cookies on your computer by changing the settings in your browser. Where you find the settings depends on which browser you use. However, please be aware that if you do this, there are many features and services you cannot use because they presume that the website can remember the choices you make.</p>

                            <h2>5. Owner Information</h2>
                            <p>This website is operated and owned by:</p>
                            <address className="not-italic">
                                <strong>CW Red AI Transformation</strong><br />
                                <a href="mailto:info@red.dk">info@red.dk</a>
                            </address>
                        </>
                    )}
                </article>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
