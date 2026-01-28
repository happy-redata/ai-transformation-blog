import { NextRequest, NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/newsletter');

// In-memory storage for demo purposes
// In production, replace with database or email service provider (Mailchimp, SendGrid, etc.)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const body = await request.json();
        const { email, locale } = body;

        log.debug('Newsletter subscription request', { locale });

        // Validate email
        if (!email || typeof email !== 'string') {
            log.warn('Missing email in request');
            return NextResponse.json(
                { error: locale === 'da' ? 'Email er påkrævet' : 'Email is required' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            log.warn('Invalid email format', { email: `${normalizedEmail.substring(0, 3)}***` });
            return NextResponse.json(
                { error: locale === 'da' ? 'Ugyldig email format' : 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        if (subscribers.has(normalizedEmail)) {
            log.info('Email already subscribed', { email: `${normalizedEmail.substring(0, 3)}***` });
            return NextResponse.json(
                {
                    success: true,
                    message: locale === 'da'
                        ? 'Du er allerede tilmeldt!'
                        : 'You are already subscribed!'
                },
                { status: 200 }
            );
        }

        // Add subscriber
        subscribers.add(normalizedEmail);

        const duration = Date.now() - startTime;
        log.info('New newsletter subscription', {
            email: `${normalizedEmail.substring(0, 3)}***`,
            locale,
            totalSubscribers: subscribers.size,
            durationMs: duration
        });

        // TODO: In production, integrate with email service provider
        // Examples:
        // - Mailchimp: await mailchimp.lists.addListMember(listId, { email_address: normalizedEmail })
        // - SendGrid: await addContact(normalizedEmail)
        // - Database: await db.newsletterSubscribers.create({ email: normalizedEmail })

        return NextResponse.json({
            success: true,
            message: locale === 'da'
                ? 'Tak for din tilmelding!'
                : 'Thanks for subscribing!'
        });

    } catch (error: any) {
        const duration = Date.now() - startTime;
        log.error('Newsletter subscription error', {
            error: error.message,
            durationMs: duration
        });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET endpoint to check subscription count (admin use)
export async function GET(request: NextRequest) {
    log.debug('Newsletter stats requested');

    return NextResponse.json({
        totalSubscribers: subscribers.size,
        // Don't expose actual emails in production
    });
}
