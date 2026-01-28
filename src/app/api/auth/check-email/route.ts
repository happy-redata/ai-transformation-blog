import { NextRequest, NextResponse } from 'next/server';
import { getGraphClient } from '@/lib/auth';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/auth/check-email');

/**
 * Check if an email exists in the Azure AD tenant.
 * 
 * Returns:
 * - exists: true if user found in tenant
 * - type: 'member' | 'guest' | null
 * - canLogin: true if user can authenticate
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();
        log.debug('Checking email', { email: `${normalizedEmail.substring(0, 3)}***` });

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        try {
            // Get Graph client with application permissions
            const graphClient = await getGraphClient();

            // Search for user by email (mail or userPrincipalName)
            const users = await graphClient
                .api('/users')
                .filter(`mail eq '${normalizedEmail}' or userPrincipalName eq '${normalizedEmail}'`)
                .select('id,displayName,mail,userPrincipalName,userType,accountEnabled')
                .top(1)
                .get();

            if (users.value && users.value.length > 0) {
                const user = users.value[0];
                const userType = user.userType?.toLowerCase() || 'member';

                log.info('User found in directory', { type: userType, accountEnabled: user.accountEnabled });
                return NextResponse.json({
                    exists: true,
                    type: userType, // 'Member' or 'Guest'
                    canLogin: user.accountEnabled === true,
                    displayName: user.displayName,
                    message: `${userType === 'guest' ? 'Guest' : 'User'} found in directory`,
                });
            }

            log.info('Email not found in directory');
            // User not found in directory
            return NextResponse.json({
                exists: false,
                type: null,
                canLogin: false,
                message: 'Email not found in directory',
            });

        } catch (graphError: unknown) {
            log.error('Graph API error', { error: graphError instanceof Error ? graphError.message : 'Unknown' });

            // Check if it's an authentication/permission error
            if (graphError instanceof Error && graphError.message?.includes('401')) {
                return NextResponse.json(
                    { error: 'Authentication configuration error' },
                    { status: 500 }
                );
            }

            // For other Graph errors, return not found
            // This could happen if the app doesn't have User.Read.All permission
            return NextResponse.json({
                exists: false,
                type: null,
                canLogin: false,
                message: 'Unable to verify email',
            });
        }

    } catch (error: any) {
        log.error('Error checking email', { error: error.message });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
