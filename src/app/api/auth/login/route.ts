import { NextRequest, NextResponse } from 'next/server';
import { cca } from '@/lib/auth';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/auth/login');

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    log.debug('Login attempt', { email: email ? `${email.substring(0, 3)}***` : 'none' });

    if (!email) {
        log.warn('Login attempt without email');
        return NextResponse.redirect(`${process.env.BASE_URL}/login?error=Email required`);
    }

    try {
        const authCodeUrlParameters = {
            scopes: ['User.Read'],
            redirectUri: `${process.env.BASE_URL}/api/auth/callback`,
            loginHint: email,
            prompt: 'select_account',
        };

        const authUrl = await cca.getAuthCodeUrl(authCodeUrlParameters);
        log.info('Redirecting to Azure AD', { email: `${email.substring(0, 3)}***` });
        return NextResponse.redirect(authUrl);
    } catch (error: any) {
        log.error('Login error', { error: error.message });
        return NextResponse.redirect(`${process.env.BASE_URL}/login?error=Auth failed`);
    }
}
