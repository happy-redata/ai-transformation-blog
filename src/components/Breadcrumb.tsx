'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname?.split('/').filter(Boolean) || [];

    // Map segment to readable name (optional)
    const getName = (segment: string) => {
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/admin" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600">
                        <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Admin
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    // Skip 'admin' as it is root
                    if (segment === 'admin') return null;

                    const href = `/${segments.slice(0, index + 1).join('/')}`;
                    const isLast = index === segments.length - 1;

                    return (
                        <li key={href}>
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                {isLast ? (
                                    <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2">{getName(segment)}</span>
                                ) : (
                                    <Link href={href} className="ml-1 text-sm font-medium text-gray-500 hover:text-blue-600 md:ml-2">
                                        {getName(segment)}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
