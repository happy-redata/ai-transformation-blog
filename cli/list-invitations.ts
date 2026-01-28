
import { getGraphClient } from '../src/lib/auth';

// Configuration
const DAYS_TO_KEEP = 7;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

async function listInvitations() {
    console.log('🔍 Listing guest invitations to be removed...');

    try {
        const graphClient = await getGraphClient();

        // Calculate cutoff date
        const now = new Date();
        const cutoffDate = new Date(now.getTime() - (DAYS_TO_KEEP * MILLISECONDS_PER_DAY));
        console.log(`📅 Cutoff date: ${cutoffDate.toISOString()}`);

        console.log('📡 Fetching pending guests from Azure AD...');
        const response = await graphClient
            .api('/users')
            .filter("externalUserState eq 'PendingAcceptance'")
            .select('id,displayName,userPrincipalName,createdDateTime,externalUserState')
            .top(999)
            .get();

        const pendingGuests = response.value || [];
        console.log(`found ${pendingGuests.length} pending guests.`);

        let removeCount = 0;
        let keepCount = 0;

        console.log('\n--- Invitations that WOULD BE REMOVED ---');
        for (const guest of pendingGuests) {
            if (!guest.createdDateTime) continue;

            const createdDate = new Date(guest.createdDateTime);

            if (createdDate < cutoffDate) {
                console.log(`[DELETE] ${guest.displayName} (${guest.userPrincipalName}) - Created: ${guest.createdDateTime}`);
                removeCount++;
            } else {
                keepCount++;
            }
        }

        console.log(`\n--- Summary ---`);
        console.log(`Total Pending: ${pendingGuests.length}`);
        console.log(`To Remove (>7 days): ${removeCount}`);
        console.log(`To Keep (<7 days):   ${keepCount}`);

    } catch (error) {
        console.error('❌ Error listing invitations:', error);
        process.exit(1);
    }
}

listInvitations();
