import { Configuration, LogLevel, PopupRequest } from '@azure/msal-browser';

// MSAL configuration for SPA authentication
export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '14b5d9f3-6108-40d6-ae84-523f92376920',
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID || '8bfad545-8650-4872-a917-20c9720b906b'}`,
        redirectUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) return;
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        break;
                    case LogLevel.Warning:
                        console.warn(message);
                        break;
                    case LogLevel.Info:
                        // console.info(message);
                        break;
                    case LogLevel.Verbose:
                        // console.debug(message);
                        break;
                }
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Warning,
        },
    },
};

// Login request scopes
export const loginRequest: PopupRequest = {
    scopes: ['User.Read', 'openid', 'profile', 'email'],
};

// Graph API scopes
export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
