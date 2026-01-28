'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useRole } from '@/components/RoleProvider';
import { Locale } from '@/lib/i18n';

type ClientAuthStatusProps = {
    locale: Locale;
    texts: {
        hi: string;
        signIn: string;
        signOut: string;
    };
};

export default function ClientAuthStatus({ locale, texts }: ClientAuthStatusProps) {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const { isAdmin } = useRole();

    if (isLoading) {
        return (
            <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
        );
    }

    if (isAuthenticated && user) {
        const firstName = (user.name || user.username || 'User').split(' ')[0];
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm font-sans text-zt-text-secondary">
                    {texts.hi} {firstName}
                </span>

                {/* Admin Settings Icon */}
                {isAdmin && (
                    <Link
                        href="/admin"
                        className="text-gray-500 hover:text-zt-accent-orange transition-colors p-1"
                        title="Admin Dashboard"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>
                )}

                <button
                    onClick={logout}
                    className="text-sm font-sans font-medium hover:text-zt-accent-orange transition-colors"
                >
                    {texts.signOut}
                </button>
            </div>
        );
    }

    return (
        <Link
            href={`/${locale}/login`}
            className="text-sm font-sans font-medium hover:text-zt-accent-orange transition-colors"
        >
            {texts.signIn}
        </Link>
    );
}
