import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return {
        title: locale === 'da' ? 'Vilkår og betingelser | Happy Mates Society' : 'Terms and Conditions | Happy Mates Society',
        description: locale === 'da'
            ? 'Læs vores vilkår og betingelser for brug af tjenesten.'
            : 'Read our terms and conditions for using the service.'
    };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-6 md:px-8 max-w-4xl py-12 md:py-20 flex-1">
                <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-zt-text-main prose-p:font-sans prose-p:text-zt-text-secondary">
                    {locale === 'da' ? (
                        <>
                            <h1>Vilkår og betingelser</h1>
                            <p className="lead">Disse vilkår regulerer din brug af Happy Mates Society's tjenester.</p>

                            <h2>1. Accept af vilkår</h2>
                            <p>Ved at tilgå eller bruge vores hjemmeside og tjenester accepterer du at være bundet af disse vilkår og betingelser. Hvis du ikke accepterer alle vilkår, må du ikke bruge vores tjenester.</p>

                            <h2>2. Tjenestebeskrivelse</h2>
                            <p>Happy Mates Society er en forening, der tilbyder:</p>
                            <ul>
                                <li>Fællesskab og netværk for medlemmer.</li>
                                <li>Arrangementer og workshops.</li>
                                <li>Digitale værktøjer og ressourcer.</li>
                                <li>Nyhedsbreve og opdateringer.</li>
                            </ul>

                            <h2>3. Medlemskab</h2>
                            <h3>3.1 Oprettelse af medlemskab</h3>
                            <p>For at blive medlem skal du oprette en konto med korrekte og opdaterede oplysninger. Du er ansvarlig for at holde dine loginoplysninger fortrolige.</p>

                            <h3>3.2 Medlemskabstyper og priser</h3>
                            <p>Vi tilbyder forskellige medlemskabstyper. Priser og inkluderede fordele fremgår af vores hjemmeside. Vi forbeholder os retten til at ændre priser med 30 dages varsel.</p>

                            <h3>3.3 Fortrydelsesret</h3>
                            <p>Du har 14 dages fortrydelsesret fra købsdatoen i henhold til forbrugeraftaleloven.</p>

                            <h2>4. Brugeradfærd</h2>
                            <p>Som bruger af vores tjenester accepterer du at:</p>
                            <ul>
                                <li>Ikke dele dit login med andre.</li>
                                <li>Ikke bruge tjenesterne til ulovlige formål.</li>
                                <li>Respektere andre medlemmer og foreningens værdier.</li>
                                <li>Ikke kopiere eller distribuere indhold uden tilladelse.</li>
                            </ul>

                            <h2>5. Intellektuel ejendomsret</h2>
                            <p>Alt indhold på hjemmesiden, herunder tekst, billeder, logoer og software, tilhører Happy Mates Society eller vores licensgivere og er beskyttet af ophavsret og andre immaterielle rettigheder.</p>

                            <h2>6. Ansvarsbegrænsning</h2>
                            <p>Happy Mates Society hæfter ikke for:</p>
                            <ul>
                                <li>Indirekte tab eller følgeskader.</li>
                                <li>Tab som følge af nedetid eller tekniske fejl.</li>
                                <li>Handlinger foretaget af andre brugere.</li>
                            </ul>

                            <h2>7. Opsigelse</h2>
                            <p>Du kan opsige dit medlemskab til enhver tid. Opsigelsen træder i kraft ved udløbet af den aktuelle betalingsperiode. Vi kan opsige din konto ved brud på disse vilkår.</p>

                            <h2>8. Ændringer af vilkår</h2>
                            <p>Vi kan ændre disse vilkår med 30 dages varsel. Væsentlige ændringer meddeles via e-mail. Fortsat brug af tjenesten efter ændringer udgør accept af de nye vilkår.</p>

                            <h2>9. Lovvalg og værneting</h2>
                            <p>Disse vilkår er underlagt dansk ret. Eventuelle tvister afgøres ved de danske domstole.</p>

                            <h2>10. Kontakt</h2>
                            <p>Har du spørgsmål til disse vilkår, kontakt os på:</p>
                            <address className="not-italic">
                                <strong>Happy Mates Society</strong><br />
                                <a href="mailto:hello@happymates.dk">hello@happymates.dk</a>
                            </address>

                            <p className="text-sm text-gray-500 mt-8">Sidst opdateret: Januar 2026</p>
                        </>
                    ) : (
                        <>
                            <h1>Terms and Conditions</h1>
                            <p className="lead">These terms govern your use of Happy Mates Society's services.</p>

                            <h2>1. Acceptance of Terms</h2>
                            <p>By accessing or using our website and services, you agree to be bound by these terms and conditions. If you do not accept all terms, you may not use our services.</p>

                            <h2>2. Service Description</h2>
                            <p>Happy Mates Society is an association that offers:</p>
                            <ul>
                                <li>Community and networking for members.</li>
                                <li>Events and workshops.</li>
                                <li>Digital tools and resources.</li>
                                <li>Newsletters and updates.</li>
                            </ul>

                            <h2>3. Membership</h2>
                            <h3>3.1 Creating a Membership</h3>
                            <p>To become a member, you must create an account with correct and up-to-date information. You are responsible for keeping your login credentials confidential.</p>

                            <h3>3.2 Membership Types and Prices</h3>
                            <p>We offer different membership types. Prices and included benefits are listed on our website. We reserve the right to change prices with 30 days' notice.</p>

                            <h3>3.3 Right of Withdrawal</h3>
                            <p>You have a 14-day right of withdrawal from the date of purchase in accordance with consumer protection legislation.</p>

                            <h2>4. User Conduct</h2>
                            <p>As a user of our services, you agree to:</p>
                            <ul>
                                <li>Not share your login with others.</li>
                                <li>Not use the services for illegal purposes.</li>
                                <li>Respect other members and the association's values.</li>
                                <li>Not copy or distribute content without permission.</li>
                            </ul>

                            <h2>5. Intellectual Property</h2>
                            <p>All content on the website, including text, images, logos, and software, belongs to Happy Mates Society or our licensors and is protected by copyright and other intellectual property rights.</p>

                            <h2>6. Limitation of Liability</h2>
                            <p>Happy Mates Society is not liable for:</p>
                            <ul>
                                <li>Indirect losses or consequential damages.</li>
                                <li>Losses due to downtime or technical errors.</li>
                                <li>Actions taken by other users.</li>
                            </ul>

                            <h2>7. Termination</h2>
                            <p>You may terminate your membership at any time. The termination takes effect at the end of the current billing period. We may terminate your account for violation of these terms.</p>

                            <h2>8. Changes to Terms</h2>
                            <p>We may change these terms with 30 days' notice. Significant changes will be notified via email. Continued use of the service after changes constitutes acceptance of the new terms.</p>

                            <h2>9. Governing Law and Jurisdiction</h2>
                            <p>These terms are governed by Danish law. Any disputes shall be settled by the Danish courts.</p>

                            <h2>10. Contact</h2>
                            <p>If you have questions about these terms, please contact us at:</p>
                            <address className="not-italic">
                                <strong>Happy Mates Society</strong><br />
                                <a href="mailto:hello@happymates.dk">hello@happymates.dk</a>
                            </address>

                            <p className="text-sm text-gray-500 mt-8">Last updated: January 2026</p>
                        </>
                    )}
                </article>
            </div>

            <Footer lang={locale} />
        </main>
    );
}
