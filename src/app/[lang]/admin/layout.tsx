import { AdminLayoutContent } from '@/components/AdminLayoutContent';
import Header from '@/components/header';
import { Metadata } from 'next';
import { Locale, isValidLocale } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'HappyMates Admin',
    description: 'Administration dashboard',
};

export default async function AdminRootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    // Standard Top Nav (Header) injected into Admin Layout
    const header = <Header lang={locale} />;

    return (
        <AdminLayoutContent header={header}>
            {children}
        </AdminLayoutContent>
    );
}
