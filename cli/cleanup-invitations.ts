
import { getGraphClient } from '../src/lib/auth';

// Configuration
const DAYS_TO_KEEP = 7;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

async function cleanupInvitations() {
    console.log('🔍 Starting cleanup of unaccepted guest invitations...');

    try {
        const graphClient = await getGraphClient();

        // Calculate cutoff date
        const now = new Date();
        const cutoffDate = new Date(now.getTime() - (DAYS_TO_KEEP * MILLISECONDS_PER_DAY));
        console.log(`📅 Cutoff date: ${cutoffDate.toISOString()}`);

        // Fetch pending guests
        // Filter: externalUserState eq 'PendingAcceptance' AND createdDateTime lt cutoff
        // Note: createdDateTime might not be filterable directly in all tenant configs, 
        // so we'll fetch pending guests and filter in memory to be safe and simple.

        console.log('📡 Fetching pending guests from Azure AD...');
        const response = await graphClient
            .api('/users')
            .filter("externalUserState eq 'PendingAcceptance'")
            .select('id,displayName,userPrincipalName,createdDateTime,externalUserState')
            .top(999) // Adjust pagination if you have thousands of pending invites
            .get();

        const pendingGuests = response.value || [];
        console.log(`found ${pendingGuests.length} pending guests.`);

        let deletedCount = 0;
        let diffCount = 0;

        for (const guest of pendingGuests) {
            if (!guest.createdDateTime) {
                console.warn(`⚠️ Guest ${guest.userPrincipalName} has no createdDateTime, skipping.`);
                continue;
            }

            const createdDate = new Date(guest.createdDateTime);

            if (createdDate < cutoffDate) {
                if (process.env.DRY_RUN === 'true') {
                    console.log(`[DRY RUN] Would delete guest: ${guest.displayName} (${guest.userPrincipalName}) - Created: ${guest.createdDateTime}`);
                    deletedCount++;
                    continue;
                }
                
                console.log(`🗑️ Deleting guest: ${guest.displayName} (${guest.userPrincipalName}) - Created: ${guest.createdDateTime}`);

                try {
                    await graphClient.api(`/users/${guest.id}`).delete();
                    deletedCount++;
                } catch (delError) {
                    console.error(`❌ Failed to delete users/${guest.id}:`, delError);
                }
            } else {
                diffCount++;
                // console.log(`⏳ Keeping guest: ${guest.displayName} - Created: ${guest.createdDateTime}`);
            }
        }

        console.log('✅ Cleanup complete.');
        console.log(`Summary: Deleted ${deletedCount} users. Kept ${diffCount} recent invitations.`);

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

cleanupInvitations();
