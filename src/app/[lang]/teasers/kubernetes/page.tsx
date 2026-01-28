'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function KubernetesTeaser() {
    const [step, setStep] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Stage-managed teaser animation
        const timers = [
            setTimeout(() => setStep(1), 500),   // Scene 1: Hero
            setTimeout(() => setStep(2), 5000),  // Scene 2: The Metaphor
            setTimeout(() => setStep(3), 10000), // Scene 3: Scaling
            setTimeout(() => setStep(4), 15000), // Scene 4: Website
            setTimeout(() => setStep(5), 20000), // Scene 5: Final CTA
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const handleStart = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        setStep(1);
    };

    return (
        <div className="fixed inset-0 bg-black text-white flex items-center justify-center overflow-hidden font-sans">
            {/* Background Audio */}
            <audio ref={audioRef} src="/audio/kubernetes-for-dummies-en.wav" />

            {step === 0 && (
                <button
                    onClick={handleStart}
                    className="px-8 py-4 bg-zt-accent-orange rounded-full text-xl font-bold hover:scale-105 transition-transform"
                >
                    🎬 Start Teaser
                </button>
            )}

            {/* Scene 1: The Harbor Master */}
            {step === 1 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center animate-fade-in-up">
                    <div className="relative w-full h-1/2 mb-8">
                        <Image
                            src="/images/hero-kubernetes-for-dummies.png"
                            fill
                            className="object-cover rounded-2xl shadow-2xl border-4 border-zt-accent-orange/30"
                            alt="Harbor Master"
                        />
                    </div>
                    <h1 className="text-5xl font-extrabold mb-4 gradient-text animate-reveal">
                        Ever wondered how big apps stay online?
                    </h1>
                    <p className="text-2xl text-gray-400">Meet your new digital harbor master.</p>
                </div>
            )}

            {/* Scene 2: The Metaphor */}
            {step === 2 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-zt-bg-dark animate-fade-in-up">
                    <div className="grid grid-cols-3 gap-8 mb-12">
                        <div className="p-8 bg-blue-900/20 rounded-xl border border-blue-500/30 scale-110">
                            <span className="text-6xl block mb-4">📦</span>
                            <span className="text-xl font-bold">Containers</span>
                        </div>
                        <div className="p-8 bg-amber-900/20 rounded-xl border border-amber-500/30">
                            <span className="text-6xl block mb-4">🏗️</span>
                            <span className="text-xl font-bold">Cranes</span>
                        </div>
                        <div className="p-8 bg-green-900/20 rounded-xl border border-green-500/30">
                            <span className="text-6xl block mb-4">👨‍✈️</span>
                            <span className="text-xl font-bold">Harbor Master</span>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold max-w-2xl px-4">
                        Kubernetes handles the chaos so you don't have to.
                    </h2>
                </div>
            )}

            {/* Scene 3: Scaling */}
            {step === 3 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center animate-fade-in-up">
                    <div className="relative w-full h-2/3 mb-8 overflow-hidden rounded-3xl">
                        <Image
                            src="/images/k8s-scaling-visualized.png"
                            fill
                            className="object-cover scale-110"
                            alt="Scaling"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center pb-12">
                            <h2 className="text-6xl font-black text-white italic">SCALE ON DEMAND</h2>
                        </div>
                    </div>
                </div>
            )}

            {/* Scene 4: Website Showcase */}
            {step === 4 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-white text-black animate-fade-in-up">
                    <div className="w-full max-w-4xl h-3/4 border-8 border-gray-100 rounded-3xl shadow-3xl overflow-hidden relative">
                        {/* Mock Browser Header */}
                        <div className="h-12 bg-gray-100 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <div className="mx-auto bg-white px-8 py-1 rounded-md text-sm text-gray-400 truncate w-1/2">happymates.blog/en/kubernetes-for-dummies</div>
                        </div>
                        <div className="p-8 text-left space-y-4 animate-scroll-up">
                            <div className="h-12 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-6 w-1/2 bg-gray-100 rounded"></div>
                            <div className="h-64 w-full bg-gray-50 rounded"></div>
                            <div className="h-6 w-full bg-gray-100 rounded"></div>
                        </div>
                    </div>
                    <p className="mt-8 text-2xl font-bold">Read the story of how we built this site.</p>
                </div>
            )}

            {/* Scene 5: Final CTA */}
            {step === 5 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-zt-bg-dark animate-fade-in-up">
                    <div className="w-48 h-48 mb-12 relative animate-bounce">
                        <Image src="/logo.svg" fill alt="Logo" />
                    </div>
                    <h1 className="text-6xl font-black mb-8">K8s for Dummies</h1>
                    <p className="text-2xl text-gray-400 mb-12 max-w-xl">Find it now under News and Guides on Happy Mates.</p>
                    <div className="flex gap-4">
                        <div className="px-10 py-5 bg-zt-accent-orange rounded-full text-2xl font-bold shadow-xl">
                            READ NOW
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .animate-scroll-up {
          animation: scrollUp 10s linear infinite;
        }
        @keyframes scrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-reveal {
          animation: revealText 1.5s ease-out forwards;
        }
        @keyframes revealText {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
      `}</style>
        </div>
    );
}
