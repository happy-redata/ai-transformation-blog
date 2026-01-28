import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export type SessionData = {
    user?: {
        name?: string;
        email?: string;
        id?: string;
    };
    isLoggedIn: boolean;
};

export const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD || 'complex_password_at_least_32_characters_long',
    cookieName: 'vibe_coding_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export async function getSession() {
    const cookieStore = await cookies();
    return getIronSession<SessionData>(cookieStore, sessionOptions);
}
