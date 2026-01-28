'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type PricingCardProps = {
    title: string;
    price: string;
    period?: string;
    features: string[];
    buttonText: string;
    priceId?: string; // Stripe Price ID
    isPopular?: boolean;
    popularText?: string;
    variant?: 'default' | 'highlight' | 'outline';
    redirectUrl?: string; // For non-stripe actions (e.g. contact page)
    lang?: string;
};

export default function PricingCard({
    title,
    price,
    period,
    features,
    buttonText,
    priceId,
    isPopular,
    popularText,
    variant = 'default',
    redirectUrl,
    lang = 'da'
}: PricingCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAction = async () => {
        if (redirectUrl) {
            router.push(redirectUrl);
            return;
        }

        if (!priceId) {
            console.error('No Price ID provided');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId,
                    successUrl: `${window.location.origin}/${lang}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: `${window.location.href}`,
                    mode: 'subscription',
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Stripe error:', data.error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setIsLoading(false);
        }
    };

    const containerClasses = {
        default: 'bg-white rounded-2xl shadow-sm border border-zt-border p-8 flex flex-col',
        highlight: 'bg-zt-text-main text-white rounded-2xl shadow-xl p-8 flex flex-col transform md:-translate-y-4 relative',
        outline: 'bg-white rounded-2xl shadow-sm border border-zt-border p-8 flex flex-col',
    };

    const buttonClasses = {
        default: 'w-full py-3 px-4 border border-zt-border rounded-lg font-bold hover:bg-gray-50 transition-colors',
        highlight: 'w-full py-3 px-4 bg-zt-accent-orange text-white rounded-lg font-bold hover:bg-orange-600 transition-colors',
        outline: 'w-full py-3 px-4 border border-zt-border rounded-lg font-bold hover:bg-gray-50 transition-colors',
    };

    return (
        <div className={containerClasses[variant]}>
            {isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zt-accent-orange text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    {popularText}
                </div>
            )}

            <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
            <div className="text-3xl font-bold mb-6">
                {price}
                {period && <span className={`text-base font-normal ${variant === 'highlight' ? 'opacity-70' : 'text-gray-500'}`}>{period}</span>}
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                        <svg
                            className={`w-5 h-5 ${variant === 'highlight' ? 'text-zt-accent-orange' : 'text-green-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>

            <button
                onClick={handleAction}
                disabled={isLoading}
                className={`${buttonClasses[variant]} ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
            >
                {isLoading ? 'Loading...' : buttonText}
            </button>
        </div>
    );
}
