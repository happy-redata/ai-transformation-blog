import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, getSeriesPosts, getAdminConfig } from '@/lib/cms';
import { cookies } from 'next/headers';
import Header from '@/components/header';
import Footer from '@/components/footer';
import StickyPostHeader from '@/components/StickyPostHeader';
import PostByline from '@/components/PostByline';
import AudioPlayer from '@/components/AudioPlayer';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Locale, isValidLocale, locales, getDictionary } from '@/lib/i18n';
import Image from 'next/image';
import { SoundEffect, Speaker, Pause, Music, Emphasis, Voice, Speak, View } from '@/components/audio/AudioMarkers';
import CommentsSection from '@/components/CommentsSection';
import ActionBlock from '@/components/ActionBlock';
import SeriesNavigation from '@/components/SeriesNavigation';
import remarkGfm from 'remark-gfm';
import fs from 'fs';
import path from 'path';

// Load audio metadata to check if audio exists
function getAudioMetadata(): Record<string, unknown> {
    try {
        const metadataPath = path.join(process.cwd(), 'public/audio-metadata.json');
        if (fs.existsSync(metadataPath)) {
            return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        }
    } catch (e) {
        console.error('Failed to load audio metadata:', e);
    }
    return {};
}

// MDX options with GitHub Flavored Markdown support for tables
const mdxOptions = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
    },
};

// Custom MDX components for audio production
const mdxComponents = {
    SoundEffect,
    Speaker,
    Pause,
    Music,
    Emphasis,
    Voice,
    Speak,
    View,
};

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];

    for (const lang of locales) {
        const posts = getAllPosts(lang);
        for (const post of posts) {
            params.push({ lang, slug: post.slug });
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const locale = isValidLocale(lang) ? lang : 'da';

    // Check for admin status via cookie
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('hm_admin')?.value === 'true';
    const config = getAdminConfig();
    const forceShow = isAdmin && config.showFutureArticles;

    const post = getPostBySlug(slug, locale, forceShow);

    if (!post) {
        return {
            title: 'Not Found | CW Red AI Transformation'
        };
    }

    return {
        title: `${post.title} | CW Red AI Transformation`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.heroImage ? [post.heroImage] : [],
        }
    };
}

export default async function PostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';
    const dict = await getDictionary(locale);

    // Check for admin status via cookie
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('hm_admin')?.value === 'true';
    const config = getAdminConfig();
    const forceShow = isAdmin && config.showFutureArticles;

    const post = getPostBySlug(slug, locale, forceShow);

    if (!post) {
        notFound();
    }

    // Construct audio path from Azure Blob Storage
    const audioKey = `${slug}-${locale}`;
    const audioPath = `https://sthappymatesauthsweden.blob.core.windows.net/audio/${slug}-${locale}.wav`;

    // Get series posts for navigation
    const seriesPosts = post.series ? getSeriesPosts(post.series.slug, locale, forceShow) : [];

    // Check if audio exists
    const audioMetadata = getAudioMetadata();
    const hasAudio = audioKey in audioMetadata;

    return (
        <main className="min-h-screen flex flex-col bg-zt-bg-cream">
            {/* Main header - visible initially */}
            <Header lang={locale} />

            {/* Sticky reading header - appears on scroll */}
            <StickyPostHeader
                title={post.title}
                locale={locale}
                dictionary={dict}
                hasAudio={hasAudio}
            />

            <article className="flex-1">
                {/* ========================================
                    ZETLAND-STYLE HERO SECTION
                    Full-width hero with animated teaser
                   ======================================== */}
                <section className="zetland-hero relative w-full">
                    {/* Full-width Hero Image */}
                    {post.heroImage && (
                        <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
                            <Image
                                src={post.heroImage}
                                alt={post.title}
                                fill
                                className="object-cover object-center"
                                priority
                                sizes="100vw"
                            />
                            {/* Gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Image credit */}
                            {post.heroImageCredit && (
                                <div className="absolute bottom-4 right-4 text-white/60 text-xs font-sans">
                                    {post.heroImageCredit}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Animated Teaser Text - Zetland Style */}
                    <div className={`zetland-teaser ${post.heroImage ? 'absolute bottom-0 left-0 right-0' : 'relative'}`}>
                        <div className="container mx-auto px-6 md:px-8 max-w-4xl pb-12 md:pb-20">
                            {/* Category tag */}
                            {post.tags && post.tags.length > 0 && (
                                <span className="zetland-teaser__category inline-block font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-zt-accent-orange mb-4 animate-fade-in-up">
                                    {post.tags[0]}
                                </span>
                            )}

                            {/* Main Title - Animated */}
                            <h1 className="zetland-teaser__title font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] animate-fade-in-up animation-delay-100">
                                {post.title}
                            </h1>

                            {/* Subtitle / Excerpt - Animated */}
                            {post.excerpt && (
                                <p className="zetland-teaser__subtitle font-serif text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed animate-fade-in-up animation-delay-200">
                                    {post.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Article Content Container with Sidebar */}
                <div className="relative">
                    {/* Desktop: Flex layout with sticky sidebar */}
                    <div className="hidden xl:block absolute left-[calc(50%-400px-100px)] top-0">
                        <div className="sticky top-24">
                            <ActionBlock
                                authorName={post.author}
                                seriesSlug={post.series?.slug}
                                seriesName={post.series?.slug}
                                postUrl={`/${locale}/post/${slug}`}
                                postTitle={post.title}
                                locale={locale}
                            />
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="container mx-auto px-6 md:px-8 max-w-2xl py-10 md:py-16">
                        {/* Byline with author avatar and metadata */}
                        <PostByline
                            author={post.author}
                            authorImage={post.authorImage}
                            date={post.date}
                            readingTime={post.readingTime}
                            locale={locale}
                            minutesLabel={dict.home.minutes}
                        />

                        {/* Audio Player */}
                        <div className="mb-10">
                            <AudioPlayer audioSrc={audioPath} title={post.title} />
                        </div>

                        {/* Article content with premium prose styling */}
                        <div className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:font-serif prose-p:leading-[1.8] prose-p:text-[1.125rem] max-w-none">
                            <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
                        </div>

                        {/* Series Navigation - Links to other episodes */}
                        <SeriesNavigation
                            currentPost={post}
                            seriesPosts={seriesPosts}
                            locale={locale}
                        />

                        {/* Mobile/Tablet: Action Block at end of article */}
                        <div className="xl:hidden">
                            <ActionBlock
                                authorName={post.author}
                                seriesSlug={post.series?.slug}
                                seriesName={post.series?.slug}
                                postUrl={`/${locale}/post/${slug}`}
                                postTitle={post.title}
                                locale={locale}
                            />
                        </div>

                        {/* Comments Section - Suppressed for now
                        <CommentsSection
                            articleSlug={slug}
                            articleTitle={post.title}
                            articleExcerpt={post.excerpt}
                            articleContent={post.content}
                            locale={locale}
                        />
                        */}
                    </div>
                </div>
            </article>

            <Footer lang={locale} />
        </main>
    );
}
