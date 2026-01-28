'use client';

import { ReactNode, useEffect, useState } from 'react';
import { MsalProvider, useMsal, useIsAuthenticated as useMsalIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication, EventType, AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '@/lib/msalConfig';

// Initialize MSAL instance
let msalInstance: PublicClientApplication | null = null;

function getMsalInstance(): PublicClientApplication {
    if (!msalInstance) {
        msalInstance = new PublicClientApplication(msalConfig);
    }
    return msalInstance;
}

// Auth Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);
    const [pca, setPca] = useState<PublicClientApplication | null>(null);

    useEffect(() => {
        const initializeMsal = async () => {
            const instance = getMsalInstance();
            await instance.initialize();

            // Handle redirect promise (for redirect flow)
            await instance.handleRedirectPromise();

            // Set active account if available
            const accounts = instance.getAllAccounts();
            if (accounts.length > 0) {
                instance.setActiveAccount(accounts[0]);
            }

            // Listen for login events
            instance.addEventCallback((event) => {
                if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                    const account = (event.payload as { account: AccountInfo }).account;
                    instance.setActiveAccount(account);
                }
            });

            setPca(instance);
            setIsInitialized(true);
        };

        initializeMsal();
    }, []);

    if (!isInitialized || !pca) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
        );
    }

    return <MsalProvider instance={pca}>{children}</MsalProvider>;
}

// Custom hook to get auth state and methods
export function useAuth() {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useMsalIsAuthenticated();

    const user = accounts[0] || null;

    const login = async () => {
        try {
            await instance.loginPopup(loginRequest);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const loginWithHint = async (email: string) => {
        try {
            console.log('🔐 Starting MSAL login with hint:', email);
            await instance.loginPopup({
                ...loginRequest,
                loginHint: email,
            });
        } catch (error) {
            console.error('Login with hint failed:', error);
            throw error;
        }
    };

    const loginRedirect = async () => {
        try {
            await instance.loginRedirect(loginRequest);
        } catch (error) {
            console.error('Login redirect failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await instance.logoutPopup({
                postLogoutRedirectUri: window.location.origin,
            });
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const getAccessToken = async (scopes: string[] = ['User.Read']) => {
        if (!user) return null;

        try {
            const response = await instance.acquireTokenSilent({
                scopes,
                account: user,
            });
            return response.accessToken;
        } catch (error) {
            // If silent token acquisition fails, try popup
            try {
                const response = await instance.acquireTokenPopup({ scopes });
                return response.accessToken;
            } catch (popupError) {
                console.error('Token acquisition failed:', popupError);
                return null;
            }
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading: inProgress !== InteractionStatus.None,
        login,
        loginWithHint,
        loginRedirect,
        logout,
        getAccessToken,
    };
}

// Re-export for convenience
export { useMsalIsAuthenticated as useIsAuthenticated };
