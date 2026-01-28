'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Locale, Dictionary } from '@/lib/i18n';
import { useAuth } from '@/components/AuthProvider';
import { useRole } from '@/components/RoleProvider';

type BurgerMenuProps = {
    locale: Locale;
    dictionary: Dictionary;
};

const menuTranslations = {
    da: {
        browse: 'Læs',
        frontPage: 'Dagens forside',
        allStories: 'Alle historier',
        series: 'Serier',
        savedForLater: 'Gemt til senere',
        info: 'Information',
        about: 'Om os',
        contact: 'Kontakt',
        team: 'Holdet',
        faq: 'FAQ',
        ethics: 'Etik',
        community: 'Fællesskab',
        membership: 'Medlemskab',
        events: 'Arrangementer',
        newsletter: 'Nyhedsbrev',
        giftSubscription: 'Giv et medlemskab',
        settings: 'Indstillinger',
        account: 'Min konto',
        notifications: 'Notifikationer',
        signIn: 'Log ind',
        signOut: 'Log ud',
    },
    en: {
        browse: 'Read',
        frontPage: "Today's frontpage",
        allStories: 'All stories',
        series: 'Series',
        savedForLater: 'Saved for later',
        info: 'Information',
        about: 'About us',
        contact: 'Contact',
        team: 'The team',
        faq: 'FAQ',
        ethics: 'Ethics',
        community: 'Community',
        membership: 'Membership',
        events: 'Events',
        newsletter: 'Newsletter',
        giftSubscription: 'Gift a membership',
        settings: 'Settings',
        account: 'My account',
        notifications: 'Notifications',
        signIn: 'Sign in',
        signOut: 'Sign out',
    },
};

export default function BurgerMenu({ locale, dictionary }: BurgerMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const t = menuTranslations[locale];

    // Use MSAL auth
    const { user, isAuthenticated, logout } = useAuth();
    const { isAdmin } = useRole();

    // Wait for client-side mount for portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Portal content - rendered in document.body to avoid header clipping
    const menuPortal = mounted ? createPortal(
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[9999] shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close button inside panel */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors z-10"
                    aria-label="Close menu"
                >
                    <svg className="w-6 h-6 text-zt-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="h-full overflow-y-auto px-6 py-20">
                    {/* User Section */}
                    {isAuthenticated && user && (
                        <div className="mb-8 pb-6 border-b border-gray-200">
                            <p className="text-sm text-gray-500">{dictionary.nav.hi}</p>
                            <p className="font-serif text-xl font-bold text-zt-text-main">
                                {(user.name || user.username || '').split(' ')[0]}
                            </p>
                        </div>
                    )}

                    <MenuSection title={t.browse}>
                        <MenuItem href={`/${locale}`} onClick={() => setIsOpen(false)}>
                            {t.frontPage}
                        </MenuItem>
                        <MenuItem href={`/${locale}`} onClick={() => setIsOpen(false)}>
                            {t.allStories}
                        </MenuItem>
                        <MenuItem href={`/${locale}/series`} onClick={() => setIsOpen(false)}>
                            {t.series}
                        </MenuItem>
                        <MenuItem href={`/${locale}`} onClick={() => setIsOpen(false)}>
                            {t.savedForLater}
                            <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">0</span>
                        </MenuItem>
                    </MenuSection>

                    {/* Information Section */}
                    <MenuSection title={t.info}>
                        <MenuItem href={`/${locale}/about`} onClick={() => setIsOpen(false)}>
                            {t.about}
                        </MenuItem>
                        <MenuItem href={`/${locale}/about#team`} onClick={() => setIsOpen(false)}>
                            {t.team}
                        </MenuItem>
                        <MenuItem href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
                            {t.contact}
                        </MenuItem>
                        <MenuItem href={`/${locale}/faq`} onClick={() => setIsOpen(false)}>
                            {t.faq}
                        </MenuItem>
                    </MenuSection>

                    {/* Community Section */}
                    <MenuSection title={t.community}>
                        <MenuItem href={`/${locale}/membership`} onClick={() => setIsOpen(false)}>
                            {t.membership}
                        </MenuItem>
                        <MenuItem href={`/${locale}/events`} onClick={() => setIsOpen(false)}>
                            {t.events}
                        </MenuItem>
                        <MenuItem href={`/${locale}/newsletter`} onClick={() => setIsOpen(false)}>
                            {t.newsletter}
                        </MenuItem>
                        <MenuItem href={`/${locale}/gift`} onClick={() => setIsOpen(false)}>
                            {t.giftSubscription}
                        </MenuItem>
                    </MenuSection>

                    {/* Settings / Auth Section */}
                    <MenuSection title={t.settings}>
                        {isAuthenticated ? (
                            <>
                                <MenuItem href={`/${locale}/account`} onClick={() => setIsOpen(false)}>
                                    {t.account}
                                </MenuItem>
                                {isAdmin && (
                                    <MenuItem href="/admin" onClick={() => setIsOpen(false)}>
                                        Admin Dashboard
                                    </MenuItem>
                                )}
                                <MenuItem href={`/${locale}/notifications`} onClick={() => setIsOpen(false)}>
                                    {t.notifications}
                                </MenuItem>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        logout();
                                    }}
                                    className="block w-full text-left py-2 px-3 -mx-3 text-lg font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    {t.signOut}
                                </button>
                            </>
                        ) : (
                            <MenuItem href={`/${locale}/login`} onClick={() => setIsOpen(false)}>
                                {t.signIn}
                            </MenuItem>
                        )}
                    </MenuSection>
                </div>
            </div>
        </>,
        document.body
    ) : null;

    return (
        <>
            {/* Burger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <span
                    className={`block w-5 h-0.5 bg-zt-text-main transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
                        }`}
                />
                <span
                    className={`block w-5 h-0.5 bg-zt-text-main transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                        }`}
                />
                <span
                    className={`block w-5 h-0.5 bg-zt-text-main transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                        }`}
                />
            </button>

            {menuPortal}
        </>
    );
}

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{title}</h3>
            <div className="space-y-1">{children}</div>
        </div>
    );
}

function MenuItem({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block py-2 px-3 -mx-3 text-lg font-medium text-zt-text-main hover:bg-gray-100 rounded-lg transition-colors"
        >
            {children}
        </Link>
    );
}
