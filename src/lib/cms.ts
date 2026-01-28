import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Locale, defaultLocale } from './i18n';

const contentDirectory = path.join(process.cwd(), 'content/posts');
const seriesDirectory = path.join(process.cwd(), 'content/series');

export type AudioConfig = {
    introJingle?: string;
    outroJingle?: string;
    defaultVoice?: string;
    backgroundMusic?: string;
    language?: string;
};

// Post status types
export type PostStatus = 'draft' | 'approved' | 'published';

// Series metadata
export type SeriesInfo = {
    slug: string;
    episode: number;
    totalEpisodes?: number;
    nextEpisodeDate?: string;
};

export type Post = {
    slug: string;
    title: string;
    date: string;
    author: string;
    tags?: string[];
    content: string;
    excerpt?: string;
    heroImage?: string;
    heroImageCredit?: string;
    authorImage?: string;
    readingTime?: number;
    audio?: AudioConfig;
    // New fields for series, status and versioning
    status?: PostStatus;
    contentVersion?: string;
    series?: SeriesInfo;
    [key: string]: any;
};

// Series type for series front pages
export type Series = {
    slug: string;
    title: string;
    description?: string;
    heroImage?: string;
    author?: string;
    totalEpisodes?: number;
    nextEpisodeDate?: string;
    episodes: Post[];
};

function getPostsDirectory(locale: Locale): string {
    return path.join(contentDirectory, locale);
}

function getSeriesDirectory(locale: Locale): string {
    return path.join(seriesDirectory, locale);
}

function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    // Strip MDX/JSX components from word count
    const textOnly = content.replace(/<[^>]+>/g, '').replace(/\{[^}]+\}/g, '');
    const words = textOnly.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

function findPostFile(postsDirectory: string, slug: string): string | null {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const dirMdxPath = path.join(postsDirectory, slug, 'index.mdx');
    const dirMdPath = path.join(postsDirectory, slug, 'index.md');

    if (fs.existsSync(mdxPath)) return mdxPath;
    if (fs.existsSync(mdPath)) return mdPath;
    if (fs.existsSync(dirMdxPath)) return dirMdxPath;
    if (fs.existsSync(dirMdPath)) return dirMdPath;
    return null;
}

// Check if a post should be visible based on status and date
function isPostVisible(post: Post, isProduction: boolean, forceShow: boolean = false): boolean {
    // If explicitly forced (e.g. by admin setting), show all posts
    if (forceShow) return true;

    // In development, we might want to see drafts by default, but let's follow the rules if we want to test visibility
    // Check status - only show approved or published posts (drafts are hidden in production)
    const status = post.status || 'published';
    if (status === 'draft' && isProduction) return false;

    // Check date - don't show future posts unless forceShow is true
    const postDate = new Date(post.date);
    const now = new Date();
    if (postDate > now) return false;

    return true;
}

// Parse post data from file contents
function parsePostData(slug: string, fileContents: string): Post {
    const { data, content } = matter(fileContents);

    // Parse series info if present
    let seriesInfo: SeriesInfo | undefined;
    if (data.series) {
        seriesInfo = {
            slug: data.series.slug || data.series,
            episode: data.series.episode || 1,
            totalEpisodes: data.series.totalEpisodes,
            nextEpisodeDate: data.series.nextEpisodeDate,
        };
    }

    return {
        slug,
        content,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        author: data.author || 'Unknown',
        excerpt: data.excerpt || '',
        heroImage: data.heroImage || null,
        heroImageCredit: data.heroImageCredit || null,
        authorImage: data.authorImage || null,
        readingTime: calculateReadingTime(content),
        audio: data.audio || null,
        status: data.status || 'published',
        contentVersion: data.contentVersion || '0.0.0',
        series: seriesInfo,
        tags: data.tags || [],
        ...data,
    };
}

export function getAllPosts(locale: Locale = defaultLocale, includeUnpublished = false, forceShow = false): Post[] {
    const postsDirectory = getPostsDirectory(locale);
    const isProduction = process.env.NODE_ENV === 'production';

    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .map((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            const stat = fs.statSync(fullPath);

            let slug = fileName.replace(/\.mdx?$/, '');
            let fileContentPath = fullPath;

            if (stat.isDirectory()) {
                slug = fileName; // Directory name is the slug
                const indexMdx = path.join(fullPath, 'index.mdx');
                const indexMd = path.join(fullPath, 'index.md');

                if (fs.existsSync(indexMdx)) {
                    fileContentPath = indexMdx;
                } else if (fs.existsSync(indexMd)) {
                    fileContentPath = indexMd;
                } else {
                    return null; // Skip directories without index file
                }
            } else if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) {
                return null; // Skip non-markdown files
            }

            const fileContents = fs.readFileSync(fileContentPath, 'utf8');
            const post = parsePostData(slug, fileContents);

            // Filter based on visibility unless explicitly including unpublished
            if (!includeUnpublished && !isPostVisible(post, isProduction, forceShow)) {
                return null;
            }

            return post;
        })
        .filter(Boolean) as Post[];

    return allPostsData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getPostBySlug(slug: string, locale: Locale = defaultLocale, forceShow = false): Post | null {
    const postsDirectory = getPostsDirectory(locale);
    const isProduction = process.env.NODE_ENV === 'production';

    try {
        const fullPath = findPostFile(postsDirectory, slug);
        if (!fullPath) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const post = parsePostData(slug, fileContents);

        // Don't show draft or future posts unless forceShow is true or explicitly permitted
        if (!isPostVisible(post, isProduction, forceShow)) {
            return null;
        }

        return post;
    } catch (e) {
        return null;
    }
}

// Get all posts in a series
export function getSeriesPosts(seriesSlug: string, locale: Locale = defaultLocale, forceShow = false): Post[] {
    const allPosts = getAllPosts(locale, false, forceShow);
    return allPosts
        .filter((post) => post.series?.slug === seriesSlug)
        .sort((a, b) => (a.series?.episode || 0) - (b.series?.episode || 0));
}

// Get series metadata from series directory
export function getSeriesBySlug(seriesSlug: string, locale: Locale = defaultLocale, forceShow = false): Series | null {
    const seriesDir = getSeriesDirectory(locale);
    const seriesFilePath = path.join(seriesDir, `${seriesSlug}.mdx`);
    const seriesFilePathMd = path.join(seriesDir, `${seriesSlug}.md`);

    let filePath: string | null = null;
    if (fs.existsSync(seriesFilePath)) filePath = seriesFilePath;
    else if (fs.existsSync(seriesFilePathMd)) filePath = seriesFilePathMd;

    // If no dedicated series file, build from posts
    const episodes = getSeriesPosts(seriesSlug, locale, forceShow);

    if (!filePath) {
        // Build series info from first episode
        if (episodes.length === 0) return null;

        const firstEpisode = episodes[0];
        return {
            slug: seriesSlug,
            title: firstEpisode.series?.slug || seriesSlug,
            description: '',
            heroImage: firstEpisode.heroImage,
            author: firstEpisode.author,
            totalEpisodes: firstEpisode.series?.totalEpisodes,
            nextEpisodeDate: episodes.find(e => e.series?.nextEpisodeDate)?.series?.nextEpisodeDate,
            episodes,
        };
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
        slug: seriesSlug,
        title: data.title || seriesSlug,
        description: data.description || '',
        heroImage: data.heroImage,
        author: data.author,
        totalEpisodes: data.totalEpisodes,
        nextEpisodeDate: data.nextEpisodeDate,
        episodes,
    };
}

// Get all series
export function getAllSeries(locale: Locale = defaultLocale, forceShow = false): Series[] {
    const allPosts = getAllPosts(locale, false, forceShow);
    const seriesSlugs = new Set<string>();

    // Collect all unique series slugs from posts
    allPosts.forEach((post) => {
        if (post.series?.slug) {
            seriesSlugs.add(post.series.slug);
        }
    });

    // Build series objects
    return Array.from(seriesSlugs)
        .map((slug) => getSeriesBySlug(slug, locale, forceShow))
        .filter(Boolean) as Series[];
}

// Get next episode info for a series
export function getNextEpisodeInfo(seriesSlug: string, locale: Locale = defaultLocale): { date: string; title?: string } | null {
    const allPosts = getAllPosts(locale, true); // Include unpublished for future episodes
    const futurePosts = allPosts
        .filter((post) => {
            if (post.series?.slug !== seriesSlug) return false;
            const postDate = new Date(post.date);
            return postDate > new Date();
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (futurePosts.length === 0) return null;

    return {
        date: futurePosts[0].date,
        title: futurePosts[0].title,
    };
}

// Admin configuration helpers
export function getAdminConfig() {
    const configDir = path.join(process.cwd(), 'content/settings');
    const configPath = path.join(configDir, 'admin-config.json');

    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    if (fs.existsSync(configPath)) {
        try {
            return JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (e) {
            return { showFutureArticles: false };
        }
    }
    return { showFutureArticles: false };
}

export function saveAdminConfig(config: { showFutureArticles: boolean }) {
    const configDir = path.join(process.cwd(), 'content/settings');
    const configPath = path.join(configDir, 'admin-config.json');

    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
