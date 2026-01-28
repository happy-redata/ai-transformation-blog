'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useAuth } from './AuthProvider';

type RoleContextType = {
    roles: string[];
    hasRole: (role: string) => boolean;
    isAdmin: boolean;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const SUPER_ADMIN_ROLE = 'super.admin';
const ADMIN_EMAILS = ['niels@happymates.dk'];

export function RoleProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();

    const value = useMemo(() => {
        const roles: string[] = [];

        // Mock role assignment logic
        // In reality, this would likely come from an API call or ID token claim
        if (user?.username && ADMIN_EMAILS.includes(user.username.toLowerCase())) {
            roles.push(SUPER_ADMIN_ROLE);
        }

        const hasRole = (role: string) => roles.includes(role);
        const isAdmin = hasRole(SUPER_ADMIN_ROLE);

        // Set a cookie that server components can read to detect admin status
        if (typeof document !== 'undefined') {
            document.cookie = `hm_admin=${isAdmin ? 'true' : 'false'}; path=/; max-age=3600; SameSite=Lax`;
        }

        return {
            roles,
            hasRole,
            isAdmin,
        };
    }, [user]);

    return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}
