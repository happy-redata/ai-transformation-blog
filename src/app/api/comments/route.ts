/**
 * Comments API - POST handler for submitting comments
 * 
 * Features:
 * - Authentication required
 * - Rate limiting (1 comment per minute)
 * - AI content moderation
 * - Auto AI response generation
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { addComment, isRateLimited, getComments, initMockComments } from '@/lib/comments';
import { moderateComment, generateAIResponse } from '@/lib/ai-moderator';

export async function POST(request: NextRequest) {
    try {
        // 1. Check authentication
        const session = await getSession();
        if (!session.isLoggedIn || !session.user) {
            return NextResponse.json(
                { error: 'Du skal være logget ind for at kommentere.' },
                { status: 401 }
            );
        }

        const { articleSlug, articleTitle, articleExcerpt, articleContent, content } = await request.json();

        // Validate input
        if (!articleSlug || !content || !articleTitle) {
            return NextResponse.json(
                { error: 'Manglende påkrævede felter.' },
                { status: 400 }
            );
        }

        // Content length validation
        if (content.length < 3) {
            return NextResponse.json(
                { error: 'Kommentaren er for kort (minimum 3 tegn).' },
                { status: 400 }
            );
        }

        if (content.length > 1000) {
            return NextResponse.json(
                { error: 'Kommentaren er for lang (maksimum 1000 tegn).' },
                { status: 400 }
            );
        }

        // 2. Check rate limit
        const userId = session.user.id || session.user.email || 'unknown';
        const rateLimit = isRateLimited(userId);

        if (rateLimit.limited) {
            const secondsRemaining = Math.ceil((rateLimit.retryAfterMs || 0) / 1000);
            return NextResponse.json(
                {
                    error: `Du kan kun skrive én kommentar per minut. Prøv igen om ${secondsRemaining} sekunder.`,
                    retryAfter: secondsRemaining
                },
                { status: 429 }
            );
        }

        // 3. AI Content Moderation
        const moderationResult = await moderateComment(
            content,
            articleTitle,
            articleExcerpt || ''
        );

        if (!moderationResult.approved) {
            return NextResponse.json(
                {
                    error: moderationResult.reason || 'Kommentaren blev afvist af vores moderator.',
                    category: moderationResult.category
                },
                { status: 422 }
            );
        }

        // 4. Save the comment
        const newComment = addComment({
            articleSlug,
            userId,
            userName: session.user.name || 'Anonym',
            userEmail: session.user.email || '',
            content,
            isAIResponse: false,
        });

        // 5. Generate AI response (async - doesn't block the response)
        generateAIResponseAsync(
            content,
            articleSlug,
            articleTitle,
            articleExcerpt || '',
            articleContent || ''
        );

        return NextResponse.json({
            success: true,
            comment: newComment,
        });

    } catch (error) {
        console.error('Comment POST error:', error);
        return NextResponse.json(
            { error: 'Der opstod en fejl. Prøv igen senere.' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const articleSlug = searchParams.get('slug');
        const articleTitle = searchParams.get('title');

        if (!articleSlug) {
            return NextResponse.json(
                { error: 'Manglende article slug.' },
                { status: 400 }
            );
        }

        // Initialize mock comments for demo
        if (articleTitle) {
            initMockComments(articleSlug, articleTitle);
        }

        const comments = getComments(articleSlug);

        return NextResponse.json({ comments });

    } catch (error) {
        console.error('Comment GET error:', error);
        return NextResponse.json(
            { error: 'Der opstod en fejl.' },
            { status: 500 }
        );
    }
}

/**
 * Generate AI response asynchronously
 * This runs after the user's comment is saved
 */
async function generateAIResponseAsync(
    userComment: string,
    articleSlug: string,
    articleTitle: string,
    articleExcerpt: string,
    articleContent: string
) {
    try {
        // Small delay to make it feel more natural
        await new Promise(resolve => setTimeout(resolve, 2000));

        const aiResult = await generateAIResponse(
            userComment,
            articleTitle,
            articleExcerpt,
            articleContent
        );

        if (aiResult.success) {
            addComment({
                articleSlug,
                userId: 'ai_curator',
                userName: 'Happy AI',
                userEmail: 'ai@happymates.dk',
                content: aiResult.response,
                isAIResponse: true,
            });
        }
    } catch (error) {
        console.error('AI response generation failed:', error);
        // Don't throw - this is async and shouldn't affect the user
    }
}
