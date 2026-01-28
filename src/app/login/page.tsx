'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
    const { user, isAuthenticated, isLoading, login, logout } = useAuth();
    const router = useRouter();

    // Redirect to home if already authenticated
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push('/da');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-500">Loading...</div>
            </main>
        );
    }

    if (isAuthenticated && user) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-lg border max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Logged In</h1>
                    <p className="text-gray-600 mb-1">{user.name}</p>
                    <p className="text-gray-500 text-sm mb-6">{user.username}</p>
                    <button
                        onClick={logout}
                        className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg border max-w-md w-full text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
                <p className="text-gray-600 mb-8">
                    Sign in with your Microsoft account to continue.
                </p>

                <button
                    onClick={handleLogin}
                    className="w-full bg-[#0078d4] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#106ebe] transition-colors flex items-center justify-center gap-3"
                >
                    <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
                        <rect width="10" height="10" fill="#f25022" />
                        <rect x="11" width="10" height="10" fill="#7fba00" />
                        <rect y="11" width="10" height="10" fill="#00a4ef" />
                        <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
                    </svg>
                    Sign in with Microsoft
                </button>

                <p className="text-gray-400 text-xs mt-6">
                    Secure authentication powered by Microsoft Azure AD
                </p>
            </div>
        </main>
    );
}
