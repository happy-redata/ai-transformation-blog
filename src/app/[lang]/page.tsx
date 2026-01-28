import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { getAllPosts, Post, getAdminConfig } from '@/lib/cms';
import { Locale, isValidLocale, getDictionary, formatDateHeader } from '@/lib/i18n';
import ArticleCard from '@/components/ArticleCard';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

// Load audio metadata to check which posts have audio
function getAudioMetadata(): Record<string, unknown> {
    try {
        const metadataPath = path.join(process.cwd(), 'public/audio-metadata.json');
        if (fs.existsSync(metadataPath)) {
            return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        }
    } catch (e) {
        console.error('Failed to load audio metadata:', e);
        // Debug logging
        try {
            const metadataPath = path.join(process.cwd(), 'public/audio-metadata.json');
            if (fs.existsSync(metadataPath)) {
                const content = fs.readFileSync(metadataPath, 'utf8');
                console.error('File content length:', content.length);
                console.error('First 100 chars:', content.substring(0, 100));
                console.error('Last 100 chars:', content.substring(content.length - 100));
            }
        } catch (ignored) {}
    }
    return {};
}

function groupByDate(posts: Post[]) {
    const groups: { [key: string]: Post[] } = {};
    posts.forEach(post => {
        const dateKey = new Date(post.date).toISOString().split('T')[0];
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(post);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    // Check for admin status via cookie
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('hm_admin')?.value === 'true';
    const config = getAdminConfig();
    const forceShow = isAdmin && config.showFutureArticles;

    const posts = getAllPosts(locale, false, forceShow);
    const groupedPosts = groupByDate(posts);
    const audioMetadata = getAudioMetadata();

    // Card accent colors inspired by Zetland
    const cardColors = [
        'bg-zt-card-teal',
        'bg-zt-card-navy',
        'bg-zt-card-azure',
        'bg-zt-card-coral',
    ];

    return (
        <main className="min-h-screen flex flex-col">
            <Header lang={locale} />

            <div className="container mx-auto px-4 max-w-4xl pb-20 pt-8">

                <div className="space-y-16">
                    {groupedPosts.map(([dateKey, groupPosts]) => (
                        <div key={dateKey}>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="font-sans text-sm font-bold uppercase tracking-wider text-zt-accent-orange whitespace-nowrap">
                                    {formatDateHeader(dateKey, locale, dict)}
                                </span>
                                <div className="h-px bg-zt-border flex-1"></div>
                            </div>

                            <div className="space-y-6">
                                {groupPosts.map((post, index) => {
                                    const audioKey = `${post.slug}-${locale}`;
                                    const hasAudio = audioKey in audioMetadata;
                                    return (
                                        <ArticleCard
                                            key={post.slug}
                                            post={post}
                                            locale={locale}
                                            colorClass={cardColors[index % cardColors.length]}
                                            dictionary={dict}
                                            hasAudio={hasAudio}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer lang={locale} />
        </main>
    );
}

