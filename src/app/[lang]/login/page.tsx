'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale, isValidLocale } from '@/lib/i18n';

const STORAGE_KEY = 'vibe_coding_email';

type CheckEmailResponse = {
    exists: boolean;
    type: 'user' | 'guest' | null;
    invited?: boolean;
    message: string;
    error?: string;
};

export default function LoginPage() {
    const { user, isAuthenticated, isLoading, loginWithHint, logout } = useAuth();
    const router = useRouter();
    const params = useParams();

    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'email' | 'checking' | 'auth'>('email');
    const [error, setError] = useState<string | null>(null);
    const [checkResult, setCheckResult] = useState<CheckEmailResponse | null>(null);

    const lang = params.lang as string;
    const locale: Locale = isValidLocale(lang) ? lang : 'da';

    const texts = {
        da: {
            signIn: 'Log ind',
            emailPlaceholder: 'din@email.dk',
            continue: 'Fortsæt',
            signInWithMicrosoft: 'Log ind med Microsoft',
            signInDescription: 'Indtast din email for at fortsætte.',
            checking: 'Tjekker email...',
            userFound: 'Bruger fundet!',
            guestFound: 'Gæst fundet!',
            invitationCreated: 'Invitation oprettet!',
            continueToMicrosoft: 'Fortsæt til Microsoft login',
            loggedIn: 'Du er logget ind',
            signOut: 'Log ud',
            goHome: 'Gå til forsiden',
            changeEmail: 'Skift email',
            loading: 'Indlæser...',
            secureAuth: 'Sikker godkendelse via Microsoft Azure AD',
            loginError: 'Login fejlede. Prøv igen.',
            emailRequired: 'Email er påkrævet',
        },
        en: {
            signIn: 'Sign In',
            emailPlaceholder: 'your@email.com',
            continue: 'Continue',
            signInWithMicrosoft: 'Sign in with Microsoft',
            signInDescription: 'Enter your email to continue.',
            checking: 'Checking email...',
            userFound: 'User found!',
            guestFound: 'Guest found!',
            invitationCreated: 'Invitation created!',
            continueToMicrosoft: 'Continue to Microsoft login',
            loggedIn: 'You are logged in',
            signOut: 'Sign Out',
            goHome: 'Go to homepage',
            changeEmail: 'Change email',
            loading: 'Loading...',
            secureAuth: 'Secure authentication powered by Microsoft Azure AD',
            loginError: 'Login failed. Please try again.',
            emailRequired: 'Email is required',
        },
    };

    const t = texts[locale] || texts.da;

    // Load email from localStorage or query param on mount
    useEffect(() => {
        // Check query param first
        const searchParams = new URLSearchParams(window.location.search);
        const emailFromQuery = searchParams.get('email');

        if (emailFromQuery) {
            setEmail(emailFromQuery);
        } else {
            const savedEmail = localStorage.getItem(STORAGE_KEY);
            if (savedEmail) {
                setEmail(savedEmail);
            }
        }
    }, []);

    // Redirect to home if already authenticated
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push(`/${locale}`);
        }
    }, [isAuthenticated, isLoading, router, locale]);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim()) {
            setError(t.emailRequired);
            return;
        }

        // Save email to localStorage
        localStorage.setItem(STORAGE_KEY, email.trim().toLowerCase());
        setStep('checking');

        try {
            const response = await fetch('/api/auth/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });

            const result: CheckEmailResponse = await response.json();
            setCheckResult(result);
            setStep('auth');
        } catch (err) {
            console.error('Error checking email:', err);
            setError(t.loginError);
            setStep('email');
        }
    };

    const handleMicrosoftLogin = async () => {
        setError(null);
        try {
            await loginWithHint(email.trim().toLowerCase());
        } catch (err) {
            console.error('Login error:', err);
            setError(t.loginError);
        }
    };

    const handleChangeEmail = () => {
        setStep('email');
        setCheckResult(null);
        setError(null);
    };

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-zt-bg-cream">
                <div className="animate-pulse text-gray-500">{t.loading}</div>
            </main>
        );
    }

    if (isAuthenticated && user) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-zt-bg-cream p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg border max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.loggedIn}</h1>
                    <p className="text-gray-600 mb-1">{user.name}</p>
                    <p className="text-gray-500 text-sm mb-6">{user.username}</p>
                    <div className="space-y-3">
                        <Link
                            href={`/${locale}`}
                            className="block w-full bg-zt-accent-orange text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors text-center"
                        >
                            {t.goHome}
                        </Link>
                        <button
                            onClick={logout}
                            className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            {t.signOut}
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-zt-bg-cream p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg border max-w-md w-full text-center">
                {/* Logo */}
                <Link href={`/${locale}`} className="inline-block mb-8">
                    <Image
                        src="/logo.svg"
                        alt="Vibe Coding"
                        width={180}
                        height={48}
                        className="h-12 w-auto mx-auto"
                        priority
                    />
                </Link>

                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.signIn}</h1>

                {/* Step 1: Email input */}
                {step === 'email' && (
                    <>
                        <p className="text-gray-600 mb-6">{t.signInDescription}</p>
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.emailPlaceholder}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="w-full bg-zt-accent-orange text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                {t.continue}
                            </button>
                        </form>
                    </>
                )}

                {/* Step 2: Checking email */}
                {step === 'checking' && (
                    <div className="py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">{t.checking}</p>
                        <p className="text-gray-400 text-sm mt-2">{email}</p>
                    </div>
                )}

                {/* Step 3: Auth with Microsoft */}
                {step === 'auth' && checkResult && (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">{email}</p>
                            {checkResult.exists && checkResult.type === 'user' && (
                                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                                    ✓ {t.userFound}
                                </span>
                            )}
                            {checkResult.exists && checkResult.type === 'guest' && (
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                    ✓ {t.guestFound}
                                </span>
                            )}
                            {!checkResult.exists && checkResult.invited && (
                                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                                    📧 {t.invitationCreated}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleMicrosoftLogin}
                            className="w-full bg-[#0078d4] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#106ebe] transition-colors flex items-center justify-center gap-3 mb-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
                                <rect width="10" height="10" fill="#f25022" />
                                <rect x="11" width="10" height="10" fill="#7fba00" />
                                <rect y="11" width="10" height="10" fill="#00a4ef" />
                                <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
                            </svg>
                            {t.signInWithMicrosoft}
                        </button>

                        <button
                            onClick={handleChangeEmail}
                            className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                        >
                            ← {t.changeEmail}
                        </button>
                    </>
                )}

                {error && (
                    <p className="text-red-500 text-sm mt-4">{error}</p>
                )}

                <p className="text-gray-400 text-xs mt-6">{t.secureAuth}</p>
            </div>
        </main>
    );
}
