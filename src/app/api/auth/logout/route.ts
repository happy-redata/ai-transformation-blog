import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/auth/logout');

export async function POST(request: NextRequest) {
    const session = await getSession();
    const email = session.user?.email;

    session.destroy();

    log.info('User logged out', { email: email ? `${email.substring(0, 3)}***` : 'unknown' });
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
}
