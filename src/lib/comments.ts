/**
 * Comments System - In-Memory Store with AI Moderation
 * 
 * This is a mockup data store. In production, replace with database.
 * The AI moderation is REAL using Vercel AI SDK + Azure OpenAI.
 */

export type Comment = {
    id: string;
    articleSlug: string;
    userId: string;
    userName: string;
    userEmail: string;
    content: string;
    createdAt: Date;
    isAIResponse: boolean;
    parentId?: string; // For threaded replies
    status: 'approved' | 'pending' | 'rejected';
    moderationReason?: string;
};

export type RateLimitEntry = {
    userId: string;
    lastCommentAt: Date;
};

// In-memory store (replace with database in production)
const commentsStore: Map<string, Comment[]> = new Map();
const rateLimitStore: Map<string, Date> = new Map();

// Rate limit: 1 comment per minute
const RATE_LIMIT_MS = 60 * 1000;

/**
 * Get comments for an article
 */
export function getComments(articleSlug: string): Comment[] {
    const comments = commentsStore.get(articleSlug) || [];
    // Only return approved comments
    return comments
        .filter(c => c.status === 'approved')
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

/**
 * Add a comment (after moderation)
 */
export function addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'status'>): Comment {
    const newComment: Comment = {
        ...comment,
        id: generateId(),
        createdAt: new Date(),
        status: 'approved', // Will be set by moderation
    };

    const existingComments = commentsStore.get(comment.articleSlug) || [];
    existingComments.push(newComment);
    commentsStore.set(comment.articleSlug, existingComments);

    // Update rate limit
    rateLimitStore.set(comment.userId, new Date());

    return newComment;
}

/**
 * Check if user is rate limited
 */
export function isRateLimited(userId: string): { limited: boolean; retryAfterMs?: number } {
    const lastComment = rateLimitStore.get(userId);
    if (!lastComment) {
        return { limited: false };
    }

    const elapsed = Date.now() - lastComment.getTime();
    if (elapsed < RATE_LIMIT_MS) {
        return {
            limited: true,
            retryAfterMs: RATE_LIMIT_MS - elapsed,
        };
    }

    return { limited: false };
}

/**
 * Generate unique ID
 */
function generateId(): string {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Initialize with some mock comments for demo
 */
export function initMockComments(articleSlug: string, articleTitle: string): void {
    if (commentsStore.has(articleSlug) && commentsStore.get(articleSlug)!.length > 0) {
        return; // Already initialized
    }

    const mockComments: Comment[] = [
        {
            id: 'mock_1',
            articleSlug,
            userId: 'mock_user_1',
            userName: 'Maria Sørensen',
            userEmail: 'maria@example.com',
            content: 'Fantastisk forklaring af Kubernetes! Havne-metaforen gør det virkelig let at forstå. 🚢',
            createdAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
            isAIResponse: false,
            status: 'approved',
        },
        {
            id: 'mock_2',
            articleSlug,
            userId: 'ai_curator',
            userName: 'Happy AI',
            userEmail: 'ai@happymates.dk',
            content: 'Tak for din kommentar, Maria! 🎉 Det er præcis formålet med artiklen - at gøre komplekse emner tilgængelige. Har du selv prøvet at arbejde med Kubernetes?',
            createdAt: new Date(Date.now() - 3600000 * 23), // 23 hours ago
            isAIResponse: true,
            parentId: 'mock_1',
            status: 'approved',
        },
        {
            id: 'mock_3',
            articleSlug,
            userId: 'mock_user_2',
            userName: 'Anders Petersen',
            userEmail: 'anders@example.com',
            content: 'Jeg bruger AKS på mit arbejde, og jeg ville ønske jeg havde læst denne artikel før jeg startede. Kunne du lave en opfølger om Helm charts?',
            createdAt: new Date(Date.now() - 3600000 * 12), // 12 hours ago
            isAIResponse: false,
            status: 'approved',
        },
        {
            id: 'mock_4',
            articleSlug,
            userId: 'ai_curator',
            userName: 'Happy AI',
            userEmail: 'ai@happymates.dk',
            content: 'Godt forslag, Anders! 📝 Helm charts er faktisk en naturlig næste skridt efter at forstå Kubernetes basics. Jeg noterer det som et emne til kommende artikler. I mellemtiden kan du læse mere om Helm på deres officielle dokumentation.',
            createdAt: new Date(Date.now() - 3600000 * 11), // 11 hours ago
            isAIResponse: true,
            parentId: 'mock_3',
            status: 'approved',
        },
    ];

    commentsStore.set(articleSlug, mockComments);
}
