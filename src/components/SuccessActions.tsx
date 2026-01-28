'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useState, useEffect } from 'react';

type SuccessActionsProps = {
    locale: string;
    email: string;
    texts: {
        homeButton: string;
        loginButton: string;
    };
};

export default function SuccessActions({ locale, email, texts }: SuccessActionsProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // While hydration/loading happens, we can show a neutral state or skeleton
    // For now, let's just wait until mounted to avoid mismatch
    if (!mounted || isLoading) {
        return <div className="h-12"></div>; // Placeholder space
    }

    if (isAuthenticated) {
        return (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                    href={`/${locale}`}
                    className="inline-block px-8 py-3 bg-zt-accent-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-md"
                >
                    {texts.homeButton}
                </Link>
            </div>
        );
    }

    // Not signed in
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
                href={`/${locale}/login?email=${encodeURIComponent(email)}`}
                className="inline-block px-8 py-3 bg-zt-accent-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-md"
            >
                {texts.loginButton}
            </Link>
        </div>
    );
}
