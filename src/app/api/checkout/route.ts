import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/checkout');

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const body = await request.json();
        const { priceId, successUrl, cancelUrl, mode = 'subscription' } = body;

        log.debug('Checkout session request', { priceId, mode });

        if (!priceId) {
            log.warn('Missing priceId in request');
            return NextResponse.json(
                { error: 'Price ID is required' },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: mode,
            success_url: successUrl,
            cancel_url: cancelUrl,
            automatic_tax: { enabled: true },
            billing_address_collection: 'required',
        });

        const duration = Date.now() - startTime;
        log.info('Checkout session created', {
            sessionId: session.id,
            priceId,
            mode,
            durationMs: duration
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        const duration = Date.now() - startTime;
        log.error('Stripe Checkout Error', {
            error: error.message,
            code: error.code,
            durationMs: duration
        });
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
