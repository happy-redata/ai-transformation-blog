import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/lib/i18n';

// Middleware runs on Edge runtime - use simple console logging
// Logs at debug level (only visible when LOG_LEVEL=debug)
const shouldLogDebug = process.env.LOG_LEVEL === 'debug';

function logDebug(message: string, meta?: Record<string, unknown>) {
    if (shouldLogDebug) {
        const timestamp = new Date().toISOString();
        console.log(`\x1b[36m[${timestamp}] [DEBUG]\x1b[0m [middleware] ${message}`, meta ? JSON.stringify(meta) : '');
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    logDebug('Request received', { pathname, method: request.method });

    // Check if pathname starts with a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        logDebug('Path has locale, passing through');
        return NextResponse.next();
    }

    // Skip static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/audio') ||
        pathname.startsWith('/styles') ||
        pathname.startsWith('/login') ||
        pathname.includes('.') // files with extensions
    ) {
        logDebug('Static/API path, passing through');
        return NextResponse.next();
    }

    // Redirect to default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    logDebug('Redirecting to default locale', { from: pathname, to: url.pathname });
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api, images, audio, styles, extensions)
        '/((?!_next|api|images|audio|styles|login|.*\\..*).*)',
    ],
};
