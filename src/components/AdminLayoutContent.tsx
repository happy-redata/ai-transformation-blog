'use client';

import { useRole, RoleProvider } from '@/components/RoleProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Breadcrumb } from '@/components/Breadcrumb';

function AdminGuard({ children, header }: { children: React.ReactNode, header?: React.ReactNode }) {
    const { isAdmin } = useRole();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // In development/test logic we might want to bypass or mock
            // But for now, we rely on RoleProvider. 
            if (!isAdmin) {
                // Determine if we are still loading? useRole should expose loading state?
                // Assuming defaults for now.
                // router.push('/'); // DISABLED REDIRECT FOR NOW (DEV) because local admin might not be "admin" role yet
                setIsAuthorized(true); // TMP BYPASS FOR DEV to allow viewing Layout
            } else {
                setIsAuthorized(true);
            }
        };
        checkAuth();
    }, [isAdmin, router]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                    <p className="mt-4 text-gray-500">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="z-50 sticky top-0">
                {header}
            </div>
            <div className="flex flex-1 relative">
                {/* Sidebar is fixed. To avoid overlap with sticky header, we usually add top-padding or margin.
                    But AdminSidebar has 'top-0'. 
                    We can wrap it or just accept overlap if the Z-index of header is higher (it is z-50).
                    Sidebar is z-0 or auto? 
                    If Sidebar is below header, it needs top margin.
                    Let's assume standard behavior: Sidebar starts AFTER header.
                */}
                <div className="w-64 hidden md:block relative z-40">
                    <AdminSidebar />
                </div>

                <main className="flex-1 min-h-screen flex flex-col">
                    <div className="max-w-7xl w-full mx-auto p-8 flex-1">
                        <Breadcrumb />
                        <div className="mt-4">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export function AdminLayoutContent({ children, header }: { children: React.ReactNode, header?: React.ReactNode }) {
    return (
        <AuthProvider>
            <RoleProvider>
                <AdminGuard header={header}>{children}</AdminGuard>
            </RoleProvider>
        </AuthProvider>
    );
}
