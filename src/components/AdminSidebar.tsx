'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export function AdminSidebar() {
    const pathname = usePathname();
    const { lang } = useParams();
    const { user } = useAuth();

    // Determine language from params or default to 'da'
    const currentLang = typeof lang === 'string' && lang ? lang : 'da';

    const links = [
        { href: `/${currentLang}/admin/jingles`, label: 'Jingles', icon: '🎵' },
        { href: `/${currentLang}/admin/posts`, label: 'Posts', icon: '📝' },
        { href: `/${currentLang}/admin/users`, label: 'Users', icon: '👥' },
        { href: `/${currentLang}/admin/settings`, label: 'Settings', icon: '⚙️' },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col fixed left-0 top-0 h-full">
            <div className="p-6 border-b border-gray-800">
                <Link href={`/${currentLang}/admin`} className="flex items-center gap-2 mb-1 hover:opacity-80 transition-opacity">
                    <span className="text-xl font-bold">Vibe Admin</span>
                </Link>
                <p className="text-xs text-gray-400">v1.0.0</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname?.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800/50">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                        {user?.name?.[0] || 'A'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.username || 'admin@vibe.coding'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
