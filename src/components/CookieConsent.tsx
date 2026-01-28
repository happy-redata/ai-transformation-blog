'use client';

import { useState, useEffect } from 'react';

export function CookieConsent({ locale }: { locale: string }) {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShowBanner(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    const texts = {
        da: {
            message: 'Vi bruger cookies til at forbedre din oplevelse. Ved at fortsætte accepterer du vores brug af cookies.',
            accept: 'Acceptér',
            decline: 'Afvis',
            learnMore: 'Læs mere'
        },
        en: {
            message: 'We use cookies to improve your experience. By continuing, you accept our use of cookies.',
            accept: 'Accept',
            decline: 'Decline',
            learnMore: 'Learn more'
        }
    };

    const t = texts[locale as keyof typeof texts] || texts.da;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zt-bg-dark/95 backdrop-blur-sm border-t border-gray-700">
            <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-300 text-sm text-center sm:text-left">
                    {t.message}{' '}
                    <a href={`/${locale}/cookies`} className="text-zt-accent-orange hover:underline">
                        {t.learnMore}
                    </a>
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={declineCookies}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        {t.decline}
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2 text-sm bg-zt-accent-orange text-white rounded-full hover:bg-orange-600 transition-colors"
                    >
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}
