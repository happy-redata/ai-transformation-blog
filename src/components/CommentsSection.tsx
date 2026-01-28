'use client';

/**
 * Comments Section Component
 * 
 * Features:
 * - Display comments with AI responses highlighted
 * - Comment form with authentication check
 * - Rate limit feedback
 * - Real-time moderation feedback
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';

type Comment = {
    id: string;
    userName: string;
    content: string;
    createdAt: string;
    isAIResponse: boolean;
    parentId?: string;
};

type UserInfo = {
    name?: string;
    username?: string;
    localAccountId?: string;
} | null;

type CommentsProps = {
    articleSlug: string;
    articleTitle: string;
    articleExcerpt?: string;
    articleContent?: string;
    locale: 'da' | 'en';
};

// Define return type for useAuth to avoid import issues
type UseAuthReturn = {
    isAuthenticated: boolean;
    user: UserInfo;
    login: () => Promise<void>;
};

export default function CommentsSection({
    articleSlug,
    articleTitle,
    articleExcerpt,
    articleContent,
    locale,
}: CommentsProps) {
    const { isAuthenticated, user, login } = useAuth() as UseAuthReturn;
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [retryAfter, setRetryAfter] = useState(0);

    // Translations
    const t = {
        da: {
            title: 'Kommentarer',
            placeholder: 'Skriv en kommentar...',
            submit: 'Send kommentar',
            submitting: 'Sender...',
            loginRequired: 'Log ind for at kommentere',
            loginButton: 'Log ind med Microsoft',
            noComments: 'Ingen kommentarer endnu. Vær den første!',
            aiLabel: 'AI Kurator',
            rateLimit: 'Vent venligst',
            seconds: 'sekunder',
            successMessage: 'Din kommentar er blevet tilføjet!',
            charCount: 'tegn',
            maxChars: 'Maksimum 1000 tegn',
        },
        en: {
            title: 'Comments',
            placeholder: 'Write a comment...',
            submit: 'Submit comment',
            submitting: 'Sending...',
            loginRequired: 'Log in to comment',
            loginButton: 'Log in with Microsoft',
            noComments: 'No comments yet. Be the first!',
            aiLabel: 'AI Curator',
            rateLimit: 'Please wait',
            seconds: 'seconds',
            successMessage: 'Your comment has been added!',
            charCount: 'characters',
            maxChars: 'Maximum 1000 characters',
        },
    }[locale];

    // Fetch comments
    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(
                `/api/comments?slug=${encodeURIComponent(articleSlug)}&title=${encodeURIComponent(articleTitle)}`
            );
            if (res.ok) {
                const data = await res.json();
                setComments(data.comments || []);
            }
        } catch (err) {
            console.error('Failed to fetch comments:', err);
        }
    }, [articleSlug, articleTitle]);

    useEffect(() => {
        fetchComments();
        // Poll for new comments every 10 seconds
        const interval = setInterval(fetchComments, 10000);
        return () => clearInterval(interval);
    }, [fetchComments]);

    // Rate limit countdown
    useEffect(() => {
        if (retryAfter > 0) {
            const timer = setTimeout(() => setRetryAfter(r => r - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [retryAfter]);

    // Submit comment
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim() || isSubmitting || retryAfter > 0) return;

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    articleSlug,
                    articleTitle,
                    articleExcerpt,
                    articleContent: articleContent?.substring(0, 2000), // Send first 2000 chars for context
                    content: newComment,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 429 && data.retryAfter) {
                    setRetryAfter(data.retryAfter);
                }
                setError(data.error || 'Noget gik galt.');
            } else {
                setSuccess(t.successMessage);
                setNewComment('');
                // Fetch updated comments
                setTimeout(fetchComments, 500);
                // Fetch again after AI might have responded
                setTimeout(fetchComments, 4000);
            }
        } catch (err) {
            setError('Kunne ikke sende kommentar. Prøv igen.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'da' ? 'da-DK' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <section className="mt-16 pt-8 border-t-2 border-zt-border">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-zt-text-main mb-8">
                {t.title}
            </h2>

            {/* Comment Form */}
            <div className="mb-10">
                {isAuthenticated ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder={t.placeholder}
                                disabled={isSubmitting || retryAfter > 0}
                                maxLength={1000}
                                className="w-full min-h-[120px] p-4 rounded-lg border-2 border-zt-border 
                                           bg-white text-zt-text-main font-sans text-base
                                           focus:border-zt-accent-teal focus:ring-2 focus:ring-zt-accent-teal/20
                                           disabled:opacity-50 disabled:cursor-not-allowed
                                           transition-colors resize-y"
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-zt-text-light">
                                {newComment.length}/1000 {t.charCount}
                            </div>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                                ⚠️ {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                                ✅ {success}
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-zt-text-light">
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-zt-accent-teal text-white flex items-center justify-center font-bold text-xs">
                                        {user?.name?.charAt(0) || '?'}
                                    </span>
                                    {user?.name || user?.username}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !newComment.trim() || retryAfter > 0}
                                className="px-6 py-2.5 rounded-lg bg-zt-accent-orange text-white font-sans font-semibold
                                           hover:bg-zt-accent-orange/90 disabled:opacity-50 disabled:cursor-not-allowed
                                           transition-all duration-200 flex items-center gap-2"
                            >
                                {retryAfter > 0 ? (
                                    <>{t.rateLimit} {retryAfter} {t.seconds}</>
                                ) : isSubmitting ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        {t.submitting}
                                    </>
                                ) : (
                                    t.submit
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-6 rounded-xl bg-zt-bg-light border-2 border-dashed border-zt-border text-center">
                        <p className="text-zt-text-secondary mb-4 font-sans">
                            🔒 {t.loginRequired}
                        </p>
                        <button
                            onClick={() => login()}
                            className="px-6 py-2.5 rounded-lg bg-zt-accent-teal text-white font-sans font-semibold
                                       hover:bg-zt-accent-teal/90 transition-colors"
                        >
                            {t.loginButton}
                        </button>
                    </div>
                )}
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-center text-zt-text-light font-sans py-8">
                        💬 {t.noComments}
                    </p>
                ) : (
                    comments.map((comment) => (
                        <article
                            key={comment.id}
                            className={`p-5 rounded-xl transition-all ${comment.isAIResponse
                                ? 'bg-gradient-to-br from-zt-accent-teal/10 to-zt-accent-purple/10 border-l-4 border-zt-accent-teal ml-6'
                                : 'bg-white border border-zt-border hover:shadow-md'
                                }`}
                        >
                            <header className="flex items-center gap-3 mb-3">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${comment.isAIResponse
                                        ? 'bg-gradient-to-br from-zt-accent-teal to-zt-accent-purple text-white'
                                        : 'bg-zt-accent-orange/20 text-zt-accent-orange'
                                        }`}
                                >
                                    {comment.isAIResponse ? '🤖' : comment.userName.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-sans font-semibold text-zt-text-main">
                                            {comment.userName}
                                        </span>
                                        {comment.isAIResponse && (
                                            <span className="px-2 py-0.5 rounded-full bg-zt-accent-teal/20 text-zt-accent-teal text-xs font-semibold">
                                                {t.aiLabel}
                                            </span>
                                        )}
                                    </div>
                                    <time className="text-xs text-zt-text-light">
                                        {formatDate(comment.createdAt)}
                                    </time>
                                </div>
                            </header>
                            <p className="font-sans text-zt-text-main leading-relaxed whitespace-pre-wrap">
                                {comment.content}
                            </p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}
