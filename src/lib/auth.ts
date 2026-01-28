import { ConfidentialClientApplication, Configuration, LogLevel } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';

// Environment variables
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID!;
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET!;
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID!;

if (!AZURE_CLIENT_ID || !AZURE_CLIENT_SECRET || !AZURE_TENANT_ID) {
    console.warn('⚠️ Missing Azure Credentials in environment variables');
}

export const msalConfig: Configuration = {
    auth: {
        clientId: AZURE_CLIENT_ID,
        clientSecret: AZURE_CLIENT_SECRET,
        authority: `https://login.microsoftonline.com/${AZURE_TENANT_ID}`,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                // console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Verbose,
        },
    },
};

export const cca = new ConfidentialClientApplication(msalConfig);

export async function getGraphClient() {
    const result = await cca.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
    });

    if (!result) {
        throw new Error('Could not acquire token for Graph Client');
    }

    return Client.init({
        authProvider: (done) => {
            done(null, result.accessToken);
        },
    });
}
