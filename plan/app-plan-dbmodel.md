# Voice of Happy Mates - App Plan & Database Model

> **Platform**: happymates-blob | **Domain**: happymates.blog  
> **Generated**: January 4, 2026

---

## 📊 Executive Summary

This document outlines the development plan and database model for evolving "Voice of Happy Mates" from a file-based CMS to a full-featured membership platform with audio content, events, and community features.

---

## 🏗️ Current Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Voice of Happy Mates                        │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Next.js 16)                                          │
│  ├── /[lang]              # i18n routing (DA/EN)               │
│  ├── /login               # MSAL authentication                │
│  ├── /membership          # Stripe checkout                    │
│  ├── /post/[slug]         # Article pages                      │
│  ├── /search              # Content search                     │
│  ├── /events              # Bootcamp/events listing            │
│  ├── /newsletter          # Signup form                        │
│  └── /admin               # Admin dashboard                    │
├─────────────────────────────────────────────────────────────────┤
│  APIs                                                           │
│  ├── /api/auth/*          # MSAL + session management          │
│  ├── /api/checkout        # Stripe payment flow                │
│  ├── /api/newsletter      # Subscription endpoint              │
│  └── /api/search          # Content search endpoint            │
├─────────────────────────────────────────────────────────────────┤
│  External Services                                              │
│  ├── Azure AD (Entra ID)  # User directory & auth              │
│  ├── Azure Speech         # Text-to-audio generation           │
│  ├── Azure Blob Storage   # Audio asset storage                │
│  ├── Stripe               # Payments & subscriptions           │
│  └── Azure Key Vault      # Secrets management                 │
├─────────────────────────────────────────────────────────────────┤
│  Content                                                        │
│  └── Markdown files       # /content directory (file-based CMS)│
└─────────────────────────────────────────────────────────────────┘
```

### Current Data Sources
| Data Type | Source | Notes |
|-----------|--------|-------|
| Users | Azure AD (Graph API) | Directory-based, no local DB |
| Articles | Markdown files | `/content` directory |
| Audio | Azure Blob Storage | Generated from articles |
| Subscriptions | Stripe | Webhook-driven |
| Newsletter | **None (gap)** | Currently stateless |

---

## 🎯 Development Phases

### Phase 1: Foundation Database (Q1 2026)
**Goal**: Add PostgreSQL + Prisma for persistent app data

| Feature | Priority | Effort |
|---------|----------|--------|
| Database provisioning (Azure PostgreSQL) | 🔴 Critical | 2h |
| Prisma schema + migrations | 🔴 Critical | 4h |
| Newsletter subscriptions table | 🔴 Critical | 2h |
| User preferences sync | 🟡 High | 4h |
| Event registrations | 🟡 High | 3h |

### Phase 2: Membership Sync (Q1-Q2 2026)
**Goal**: Bridge Azure AD + Stripe into unified user profiles

| Feature | Priority | Effort |
|---------|----------|--------|
| Stripe webhook handler (persist subscriptions) | 🔴 Critical | 4h |
| User profile table (linked to Azure AD OID) | 🔴 Critical | 4h |
| Membership tier logic | 🟡 High | 3h |
| Admin user management UI | 🟡 High | 6h |

### Phase 3: Content & Analytics (Q2 2026)
**Goal**: Content analytics and progress tracking

| Feature | Priority | Effort |
|---------|----------|--------|
| Article read tracking | 🟡 High | 4h |
| Audio listen completion | 🟡 High | 3h |
| User content bookmarks | 🟢 Medium | 3h |
| Search analytics | 🟢 Medium | 2h |

### Phase 4: Community Features (Q3 2026)
**Goal**: Events, bootcamp, and community engagement

| Feature | Priority | Effort |
|---------|----------|--------|
| Event registration system | 🟡 High | 6h |
| Bootcamp application workflow | 🟡 High | 8h |
| Team formation (Playitas) | 🟢 Medium | 6h |
| Comments/discussions | 🟢 Medium | 8h |

---

## 🗄️ Database Model (Prisma Schema)

```prisma
// schema.prisma
// Happy Mates - Voice of Happy Mates Database Model

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ════════════════════════════════════════════════════════════════
// USERS & MEMBERSHIP
// ════════════════════════════════════════════════════════════════

model User {
  id                String    @id @default(uuid())
  
  // Azure AD Link
  azureOid          String    @unique @map("azure_oid")  // Object ID from Entra ID
  email             String    @unique
  displayName       String?   @map("display_name")
  preferredLanguage String    @default("da") @map("preferred_language") // "da" | "en"
  
  // Profile
  avatarUrl         String?   @map("avatar_url")
  bio               String?
  
  // Timestamps
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  lastLoginAt       DateTime? @map("last_login_at")
  
  // Relations
  membership        Membership?
  preferences       UserPreference[]
  articleProgress   ArticleProgress[]
  audioProgress     AudioProgress[]
  bookmarks         Bookmark[]
  eventRegistrations EventRegistration[]
  bootcampApplications BootcampApplication[]
  
  @@map("users")
}

model Membership {
  id                String    @id @default(uuid())
  userId            String    @unique @map("user_id")
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Stripe Integration
  stripeCustomerId  String?   @unique @map("stripe_customer_id")
  stripeSubscriptionId String? @map("stripe_subscription_id")
  
  // Tier: "free" | "pro" | "business"
  tier              String    @default("free")
  
  // Business tier extras
  companyName       String?   @map("company_name")
  jobPostingCredits Int       @default(0) @map("job_posting_credits")
  coinBalance       Int       @default(0) @map("coin_balance") // Business gets 5 COINS/month
  
  // Billing
  currentPeriodStart DateTime? @map("current_period_start")
  currentPeriodEnd   DateTime? @map("current_period_end")
  cancelAtPeriodEnd  Boolean   @default(false) @map("cancel_at_period_end")
  
  // Status: "active" | "canceled" | "past_due" | "trialing"
  status            String    @default("active")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  @@map("memberships")
}

model UserPreference {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  key       String   // e.g., "email_newsletter", "email_events", "dark_mode"
  value     String   // stored as JSON string for flexibility
  
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  @@unique([userId, key])
  @@map("user_preferences")
}

// ════════════════════════════════════════════════════════════════
// NEWSLETTER
// ════════════════════════════════════════════════════════════════

model NewsletterSubscription {
  id            String    @id @default(uuid())
  email         String    @unique
  
  // Link to user if registered
  userId        String?   @map("user_id")
  
  // Subscription status
  isActive      Boolean   @default(true) @map("is_active")
  confirmedAt   DateTime? @map("confirmed_at")
  unsubscribedAt DateTime? @map("unsubscribed_at")
  
  // Preferences
  language      String    @default("da") // "da" | "en"
  frequency     String    @default("weekly") // "daily" | "weekly" | "monthly"
  
  // Tracking
  source        String?   // "footer", "popup", "landing", etc.
  
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  @@map("newsletter_subscriptions")
}

// ════════════════════════════════════════════════════════════════
// CONTENT ENGAGEMENT
// ════════════════════════════════════════════════════════════════

model ArticleProgress {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  articleSlug String   @map("article_slug") // Matches markdown file slug
  
  // Progress tracking
  readAt      DateTime? @map("read_at")      // First read
  completedAt DateTime? @map("completed_at") // Scrolled to end
  readTimeSeconds Int   @default(0) @map("read_time_seconds")
  
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  @@unique([userId, articleSlug])
  @@map("article_progress")
}

model AudioProgress {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  audioId     String   @map("audio_id")     // Azure Blob reference
  articleSlug String?  @map("article_slug") // If linked to article
  
  // Progress tracking
  currentPosition Int  @default(0) @map("current_position") // Seconds
  totalDuration   Int  @default(0) @map("total_duration")   // Seconds
  completedAt     DateTime? @map("completed_at")
  
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  @@unique([userId, audioId])
  @@map("audio_progress")
}

model Bookmark {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Content reference
  contentType String   @map("content_type") // "article" | "audio" | "event"
  contentId   String   @map("content_id")   // slug or ID
  
  // Optional note
  note        String?
  
  createdAt   DateTime @default(now()) @map("created_at")
  
  @@unique([userId, contentType, contentId])
  @@map("bookmarks")
}

// ════════════════════════════════════════════════════════════════
// EVENTS & BOOTCAMP
// ════════════════════════════════════════════════════════════════

model Event {
  id            String    @id @default(uuid())
  
  // Event details
  slug          String    @unique
  titleDa       String    @map("title_da")
  titleEn       String    @map("title_en")
  descriptionDa String?   @map("description_da")
  descriptionEn String?   @map("description_en")
  
  // Location
  location      String?
  isOnline      Boolean   @default(false) @map("is_online")
  meetingUrl    String?   @map("meeting_url")
  
  // Timing
  startsAt      DateTime  @map("starts_at")
  endsAt        DateTime  @map("ends_at")
  timezone      String    @default("Europe/Copenhagen")
  
  // Capacity
  maxAttendees  Int?      @map("max_attendees")
  
  // Pricing (in cents)
  priceEurCents Int       @default(0) @map("price_eur_cents")
  memberDiscount Int      @default(0) @map("member_discount") // Percentage
  
  // Status: "draft" | "published" | "canceled" | "completed"
  status        String    @default("draft")
  
  // Media
  imageUrl      String?   @map("image_url")
  
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  // Relations
  registrations EventRegistration[]
  
  @@map("events")
}

model EventRegistration {
  id          String   @id @default(uuid())
  eventId     String   @map("event_id")
  event       Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Payment
  amountPaidCents Int?  @map("amount_paid_cents")
  stripePaymentId String? @map("stripe_payment_id")
  
  // Status: "registered" | "attended" | "no_show" | "canceled"
  status      String   @default("registered")
  
  // Extra info
  dietaryNotes String? @map("dietary_notes")
  accessibilityNotes String? @map("accessibility_notes")
  
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  @@unique([eventId, userId])
  @@map("event_registrations")
}

// ════════════════════════════════════════════════════════════════
// BOOTCAMP (Playitas 2026)
// ════════════════════════════════════════════════════════════════

model Bootcamp {
  id            String    @id @default(uuid())
  
  slug          String    @unique
  name          String
  description   String?
  
  // Location & timing
  location      String    // "Playitas Resort, Fuerteventura"
  startsAt      DateTime  @map("starts_at")
  endsAt        DateTime  @map("ends_at")
  
  // Capacity
  maxParticipants Int     @map("max_participants")
  spotsSold       Int     @default(0) @map("spots_sold")
  
  // Pricing (in DKK in this case)
  pricePerSpotDkk Int     @map("price_per_spot_dkk") // 25.000 kr
  
  // Phases: "presale" | "open" | "sold_out" | "completed"
  status        String    @default("presale")
  
  // Application deadline
  applicationDeadline DateTime? @map("application_deadline")
  
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  // Relations
  applications  BootcampApplication[]
  teams         BootcampTeam[]
  
  @@map("bootcamps")
}

model BootcampApplication {
  id          String   @id @default(uuid())
  bootcampId  String   @map("bootcamp_id")
  bootcamp    Bootcamp @relation(fields: [bootcampId], references: [id], onDelete: Cascade)
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Application type: "youth" | "student" | "professional"
  applicantType String  @map("applicant_type")
  
  // Application details
  motivation    String?
  githubUsername String? @map("github_username")
  experience    String? // JSON: { "vibe_coding": true, "copilot": true, etc. }
  
  // Status: "submitted" | "under_review" | "accepted" | "rejected" | "waitlisted"
  status        String  @default("submitted")
  reviewNotes   String? @map("review_notes")
  reviewedBy    String? @map("reviewed_by") // Azure OID of reviewer
  reviewedAt    DateTime? @map("reviewed_at")
  
  // Payment (if accepted)
  paymentStatus String  @default("pending") @map("payment_status") // "pending" | "paid" | "refunded"
  stripePaymentId String? @map("stripe_payment_id")
  
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  // Relation to team assignment
  teamAssignment BootcampTeamMember?
  
  @@unique([bootcampId, userId])
  @@map("bootcamp_applications")
}

model BootcampTeam {
  id          String   @id @default(uuid())
  bootcampId  String   @map("bootcamp_id")
  bootcamp    Bootcamp @relation(fields: [bootcampId], references: [id], onDelete: Cascade)
  
  name        String
  description String?
  
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  members     BootcampTeamMember[]
  
  @@map("bootcamp_teams")
}

model BootcampTeamMember {
  id            String   @id @default(uuid())
  teamId        String   @map("team_id")
  team          BootcampTeam @relation(fields: [teamId], references: [id], onDelete: Cascade)
  applicationId String   @unique @map("application_id")
  application   BootcampApplication @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  
  // Role in team
  role          String   @default("member") // "youth" | "student" | "professional" | "lead"
  
  createdAt     DateTime @default(now()) @map("created_at")
  
  @@map("bootcamp_team_members")
}

// ════════════════════════════════════════════════════════════════
// ANALYTICS & AUDIT
// ════════════════════════════════════════════════════════════════

model AuditLog {
  id          String   @id @default(uuid())
  
  // Actor
  userId      String?  @map("user_id")      // null for system actions
  userEmail   String?  @map("user_email")
  
  // Action
  action      String   // "user.login", "membership.upgraded", "event.registered", etc.
  resourceType String  @map("resource_type") // "user", "membership", "event", etc.
  resourceId  String?  @map("resource_id")
  
  // Details (JSON)
  details     String?  // JSON with action-specific data
  
  // Context
  ipAddress   String?  @map("ip_address")
  userAgent   String?  @map("user_agent")
  
  createdAt   DateTime @default(now()) @map("created_at")
  
  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("audit_logs")
}

model SearchAnalytics {
  id          String   @id @default(uuid())
  
  query       String
  resultsCount Int     @map("results_count")
  
  // Optional user link
  userId      String?  @map("user_id")
  
  // Context
  language    String   @default("da")
  
  createdAt   DateTime @default(now()) @map("created_at")
  
  @@index([query])
  @@index([createdAt])
  @@map("search_analytics")
}
```

---

## 🚀 Implementation Roadmap

### Immediate Next Steps (Week 1)

1. **Provision Azure PostgreSQL**
   ```bash
   az postgres flexible-server create \
     --resource-group rg-happy-mates-sweden1 \
     --name pg-happymates-blob \
     --location swedencentral \
     --sku-name Standard_B1ms \
     --tier Burstable
   ```

2. **Add Prisma to project**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

3. **Create migration job in K8s**
   - Add `k8s/migration-job.yaml`
   - Update `deploy.yml` to run migrations before deployment

4. **Implement Newsletter persistence**
   - Update `/api/newsletter/subscribe` to use Prisma
   - Add confirmation email flow

### Week 2-3

5. **User sync from Azure AD**
   - Create user record on first login
   - Sync profile data via Graph API

6. **Stripe webhook handler**
   - Persist subscription events
   - Update membership tier automatically

---

## 📈 Metrics & Success Criteria

| Metric | Target (Q2 2026) |
|--------|------------------|
| Newsletter subscribers | 500+ |
| Pro members | 50+ |
| Business members | 5+ |
| Bootcamp applications | 30+ |
| Bootcamp spots sold | 10 (250.000 kr) |

---

## 🔐 Security Considerations

1. **Data Residency**: PostgreSQL in Sweden Central (GDPR compliance)
2. **Encryption**: TLS in transit, encryption at rest (Azure default)
3. **Access Control**: 
   - App uses managed identity for DB access
   - Admin actions require `admin` role in Azure AD
4. **Audit Trail**: All significant actions logged to `audit_logs` table
5. **PII Handling**: User data linked to Azure AD, minimal local PII storage

---

## 📚 Related Documentation

- [Provisioning Plan](./prov.md)
- [Azure DB Patterns](/knowledge/azure_database_management_patterns)
- [AKS Deployment Patterns](/knowledge/aks_deployment_pipelines)
- [Plans README](/plans/README.md) - H1 2026 Business Goals

---

*Last updated: January 4, 2026*
