import { NextRequest, NextResponse } from 'next/server';
import { cca, getGraphClient } from '@/lib/auth';
import { getSession } from '@/lib/session';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/auth/callback');

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');

    log.debug('Auth callback received', { hasCode: !!code });

    if (!code) {
        log.warn('Callback without authorization code');
        return NextResponse.redirect(`${process.env.BASE_URL}/login?error=No code`);
    }

    try {
        const tokenRequest = {
            code,
            scopes: ['User.Read'],
            redirectUri: `${process.env.BASE_URL}/api/auth/callback`,
        };

        const response = await cca.acquireTokenByCode(tokenRequest);

        if (response && response.account) {
            const session = await getSession();
            session.user = {
                name: response.account.name,
                email: response.account.username,
                id: response.account.homeAccountId,
            };
            session.isLoggedIn = true;
            await session.save();

            log.info('User authenticated successfully', {
                email: `${response.account.username?.substring(0, 3)}***`
            });
            return NextResponse.redirect(`${process.env.BASE_URL}/`);
        }

        log.warn('Token response missing account');
    } catch (error: any) {
        log.error('Auth callback error', { error: error.message });
    }

    return NextResponse.redirect(`${process.env.BASE_URL}/login?error=Auth failure`);
}
