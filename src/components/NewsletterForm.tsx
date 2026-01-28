'use client';

import { useState } from 'react';

interface NewsletterFormProps {
    locale: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
    errorMessage: string;
}

export default function NewsletterForm({
    locale,
    placeholder,
    buttonText,
    successMessage,
    errorMessage
}: NewsletterFormProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage(locale === 'da' ? 'Indtast en gyldig email' : 'Please enter a valid email');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, locale }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(successMessage);
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || errorMessage);
            }
        } catch (error) {
            setStatus('error');
            setMessage(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 border-2 border-zt-border rounded-xl focus:outline-none focus:border-zt-accent-orange transition-colors text-lg"
                    disabled={status === 'loading'}
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-zt-accent-orange text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
                {status === 'loading'
                    ? (locale === 'da' ? 'Tilmelder...' : 'Subscribing...')
                    : buttonText
                }
            </button>

            {status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{message}</span>
                </div>
            )}

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{message}</span>
                </div>
            )}
        </form>
    );
}
