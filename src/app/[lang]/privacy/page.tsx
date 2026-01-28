import Header from '@/components/header';
import Footer from '@/components/footer';
import { Locale, isValidLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return {
        title: locale === 'da' ? 'Privatlivspolitik | Happy Mates Society' : 'Privacy Policy | Happy Mates Society',
        description: locale === 'da'
            ? 'Læs om hvordan vi behandler dine personoplysninger.'
            : 'Read about how we process your personal data.'
    };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            <Header lang={locale} />

            <div className="container mx-auto px-6 md:px-8 max-w-4xl py-12 md:py-20 flex-1">
                <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-zt-text-main prose-p:font-sans prose-p:text-zt-text-secondary">
                    {locale === 'da' ? (
                        <>
                            <h1>Privatlivspolitik</h1>
                            <p className="lead">Happy Mates Society tager beskyttelsen af dine personoplysninger alvorligt.</p>

                            <h2>1. Dataansvarlig</h2>
                            <p>Vi er dataansvarlige for behandlingen af de personoplysninger, som vi modtager om dig. Vores kontaktoplysninger er:</p>
                            <address className="not-italic">
                                <strong>Happy Mates Society</strong><br />
                                <a href="mailto:hello@happymates.dk">hello@happymates.dk</a>
                            </address>

                            <h2>2. Formål med behandling af personoplysninger</h2>
                            <p>Vi behandler dine personoplysninger til følgende formål:</p>
                            <ul>
                                <li>At levere og forbedre vores tjenester.</li>
                                <li>At kommunikere med dig om medlemskab og arrangementer.</li>
                                <li>At sende nyhedsbreve, hvis du har tilmeldt dig.</li>
                                <li>At overholde gældende lovgivning.</li>
                            </ul>

                            <h2>3. Kategorier af personoplysninger</h2>
                            <p>Vi behandler følgende kategorier af personoplysninger:</p>
                            <ul>
                                <li><strong>Identifikationsoplysninger:</strong> Navn, e-mailadresse.</li>
                                <li><strong>Tekniske data:</strong> IP-adresse, browsertype, besøgsstatistik.</li>
                                <li><strong>Medlemskabsdata:</strong> Betalingshistorik, medlemsstatus.</li>
                            </ul>

                            <h2>4. Retsgrundlag</h2>
                            <p>Vi behandler dine personoplysninger på følgende retsgrundlag:</p>
                            <ul>
                                <li>Opfyldelse af kontrakt (f.eks. medlemskab).</li>
                                <li>Samtykke (f.eks. nyhedsbrev).</li>
                                <li>Legitime interesser (f.eks. forbedring af vores tjenester).</li>
                            </ul>

                            <h2>5. Modtagere af personoplysninger</h2>
                            <p>Vi deler kun dine oplysninger med betroede tredjeparter, der hjælper os med at drive vores tjenester:</p>
                            <ul>
                                <li>Betalingsudbydere (Stripe).</li>
                                <li>Cloudtjenester (Microsoft Azure).</li>
                                <li>E-mailsystemudbydere.</li>
                            </ul>

                            <h2>6. Opbevaring</h2>
                            <p>Vi opbevarer dine personoplysninger, så længe det er nødvendigt for de formål, hvortil de er indsamlet. Medlemskabsdata opbevares i op til 5 år efter ophør af medlemskab af regnskabsmæssige hensyn.</p>

                            <h2>7. Dine rettigheder</h2>
                            <p>Du har følgende rettigheder:</p>
                            <ul>
                                <li><strong>Indsigt:</strong> Du kan anmode om indsigt i de oplysninger, vi har om dig.</li>
                                <li><strong>Berigtigelse:</strong> Du kan anmode om at få rettet forkerte oplysninger.</li>
                                <li><strong>Sletning:</strong> Du kan anmode om at få slettet dine oplysninger.</li>
                                <li><strong>Begrænsning:</strong> Du kan anmode om begrænsning af behandlingen.</li>
                                <li><strong>Dataportabilitet:</strong> Du kan få udleveret dine data i et struktureret format.</li>
                                <li><strong>Indsigelse:</strong> Du kan gøre indsigelse mod behandlingen.</li>
                            </ul>

                            <h2>8. Klageadgang</h2>
                            <p>Du kan klage til Datatilsynet, hvis du mener, at vi behandler dine personoplysninger i strid med reglerne: <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">www.datatilsynet.dk</a></p>

                            <h2>9. Kontakt</h2>
                            <p>Har du spørgsmål til vores behandling af personoplysninger, kan du kontakte os på:</p>
                            <address className="not-italic">
                                <a href="mailto:hello@happymates.dk">hello@happymates.dk</a>
                            </address>

                            <p className="text-sm text-gray-500 mt-8">Sidst opdateret: Januar 2026</p>
                        </>
                    ) : (
                        <>
                            <h1>Privacy Policy</h1>
                            <p className="lead">Happy Mates Society takes the protection of your personal data seriously.</p>

                            <h2>1. Data Controller</h2>
                            <p>We are the data controller for the processing of personal data we receive about you. Our contact details are:</p>
                            <address className="not-italic">
                                <strong>Happy Mates Society</strong><br />
                                <a href="mailto:hello@happymates.dk">hello@happymates.dk</a>
                            </address>

                            <h2>2. Purpose of Processing Personal Data</h2>
                            <p>We process your personal data for the following purposes:</p>
                            <ul>
                                <li>To deliver and improve our services.</li>
                                <li>To communicate with you about membership and events.</li>
                                <li>To send newsletters if you have subscribed.</li>
                                <li>To comply with applicable legislation.</li>
                            </ul>

                            <h2>3. Categories of Personal Data</h2>
                            <p>We process the following categories of personal data:</p>
                            <ul>
                                <li><strong>Identification data:</strong> Name, email address.</li>
                                <li><strong>Technical data:</strong> IP address, browser type, visit statistics.</li>
                                <li><strong>Membership data:</strong> Payment history, membership status.</li>
                            </ul>

                            <h2>4. Legal Basis</h2>
                            <p>We process your personal data on the following legal basis:</p>
                            <ul>
                                <li>Performance of contract (e.g., membership).</li>
                                <li>Consent (e.g., newsletter).</li>
                                <li>Legitimate interests (e.g., improving our services).</li>
                            </ul>

                            <h2>5. Recipients of Personal Data</h2>
                            <p>We only share your data with trusted third parties who help us operate our services:</p>
                            <ul>
                                <li>Payment providers (Stripe).</li>
                                <li>Cloud services (Microsoft Azure).</li>
                                <li>Email system providers.</li>
                            </ul>

                            <h2>6. Retention</h2>
                            <p>We retain your personal data for as long as necessary for the purposes for which they were collected. Membership data is retained for up to 5 years after termination of membership for accounting purposes.</p>

                            <h2>7. Your Rights</h2>
                            <p>You have the following rights:</p>
                            <ul>
                                <li><strong>Access:</strong> You can request access to the data we hold about you.</li>
                                <li><strong>Rectification:</strong> You can request correction of incorrect data.</li>
                                <li><strong>Erasure:</strong> You can request deletion of your data.</li>
                                <li><strong>Restriction:</strong> You can request restriction of processing.</li>
                                <li><strong>Data portability:</strong> You can receive your data in a structured format.</li>
                                <li><strong>Objection:</strong> You can object to the processing.</li>
                            </ul>

                            <h2>8. Complaints</h2>
                            <p>You can lodge a complaint with the Danish Data Protection Agency if you believe we are processing your personal data in violation of the rules: <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">www.datatilsynet.dk</a></p>

                            <h2>9. Contact</h2>
                            <p>If you have questions about our processing of personal data, please contact us at:</p>
                            <address className="not-italic">
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
