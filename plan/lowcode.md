# Low Code for Dummies — Blog Series Plan

> *"From Monday Demo to Monday Disaster — The Complete Low Code Journey"*

## Series Overview

**Format**: Multi-part series organized into Acts  
**Total Episodes**: 12-15 posts  
**Languages**: DA, EN  
**Target Audience**: Business professionals, IT generalists, and citizen developers

### Core Metaphor

**The Building Blocks of IT** — Just as magnetic blocks snap together to create impressive structures, low-code platforms let anyone build real applications by connecting pre-designed components. No glue, no screws, no soldering — just snap and go.

But what happens when the master builder leaves and nobody knows how the castle was assembled?

### The Narrative Arc

```
ACT I   — The Promise (Episodes 1-2)        🎉 "Look how fast we can build!"
ACT II  — Power Platform Deep Dive (Ep 3-8) 📚 "Master the Microsoft ecosystem"
ACT III — The Competition (Episodes 9-10)   🔄 "What about Salesforce & ServiceNow?"
ACT IV  — The Reckoning (Episodes 11-13)    😰 "Lars retired... now what?"
ACT V   — Sustainable Low Code (Ep 14-15)   ✅ "Do it right from the start"
ACT VI  — The AI Independence Era (Ep 16)   🚀 "Break free from big tech"
```

---

# ACT I: The Promise

## Episode 1: The Magic of Fast — Why Low Code Wins
**Slug**: `lowcode-magic-of-fast`  
**Tone**: Enthusiastic, celebratory 🎉

**Synopsis**:
The genuine revolution. Why low-code is changing how businesses build software:

- **Prototype to Production in Days**: Working apps before requirements are finished
- **Citizen Developers Unleashed**: Business experts solving their own problems
- **Integration Without Agony**: Pre-built connectors everywhere
- **The Visual Experience**: Drag, drop, configure, deploy

**Key Visual**: Timeline comparison — traditional (6 months) vs. low-code (2 weeks)

---

## Episode 2: The Low Code Landscape — Choosing Your Platform
**Slug**: `lowcode-platform-landscape`  
**Tone**: Informative, strategic

**Synopsis**:
A map of the low-code market:

| Platform | Vendor | Sweet Spot | Ecosystem |
|----------|--------|------------|-----------|
| **Power Platform** | Microsoft | M365 / Azure shops | Dominant enterprise |
| **Salesforce Lightning** | Salesforce | CRM-centric orgs | Strong ecosystem |
| **ServiceNow** | ServiceNow | IT/HR/Facilities | Enterprise IT |
| **Mendix / OutSystems** | Various | High-code hybrids | Developer-focused |
| **Google AppSheet** | Google | Workspace shops | Simple apps |

**Why We Focus on Power Platform**: Market dominance, reader relevance, and the deepest feature set to explore.

**Key Visual**: MetroFlow-style platform map

---

# ACT II: Power Platform Deep Dive

*The heart of the series. 6 dedicated episodes on Microsoft's low-code ecosystem.*

---

## Episode 3: Power Platform 101 — The Family Tree
**Slug**: `power-platform-family-tree`  
**Tone**: Foundational, orienting

**Synopsis**:
Understanding the Power Platform product family and how they work together:

**The Core Products**:
```
┌─────────────────────────────────────────────────────────────┐
│                     POWER PLATFORM                          │
├──────────────┬──────────────┬───────────────┬──────────────┤
│  Power Apps  │    Power     │   Copilot     │    Power     │
│              │   Automate   │    Studio     │    Pages     │
├──────────────┼──────────────┼───────────────┼──────────────┤
│  Canvas      │  Cloud Flows │   Chatbots    │  Websites    │
│  Model-Driven│  Desktop RPA │   AI Agents   │  Portals     │
└──────────────┴──────────────┴───────────────┴──────────────┘
                           ▼
              ┌────────────────────────┐
              │      DATAVERSE         │   ← The common data layer
              │   (Microsoft's DB)     │
              └────────────────────────┘
```

**The Rebrand Timeline** — Every product has been renamed at least once:

| Product | Original Name | Introduced | Rebranded | Current Name |
|---------|---------------|------------|-----------|--------------|
| **Power Apps** | PowerApps | Nov 2016 | Oct 2019 | Power Apps |
| **Power Automate** | Microsoft Flow | Nov 2016 | Oct 2019 | Power Automate |
| **Copilot Studio** | Power Virtual Agents | May 2019 | Nov 2023 | Copilot Studio |
| **Power Pages** | Power Apps Portals | Apr 2017 | Oct 2022 | Power Pages |
| **Dataverse** | Common Data Service (CDS) | Nov 2016 | Nov 2020 | Dataverse |

*Note: The October 2019 rebrand was the big "Power Platform" unification, bringing PowerApps and Flow under one banner.*

**The Licensing Maze**:
- Power Apps Premium vs. per-app licenses
- Seeded vs. standalone licenses
- The "free with M365" myth
- When Dataverse changes the equation

**Key Visual**: The Power Platform family tree diagram with timeline

---

## Episode 4: Power Apps Canvas — The Pixel-Perfect Playground
**Slug**: `power-apps-canvas-deep-dive`  
**Tone**: Hands-on, practical

**Synopsis**:
Canvas Apps are where most citizen developers start. Complete creative freedom.

**What Canvas Apps Are**:
- Blank canvas, you control every pixel
- Works on phone, tablet, and desktop
- Excel-like formulas (Power Fx)
- Connect to anything (300+ connectors)

**The Good**:
- Fastest path from idea to app
- Mobile-first design
- No coding required (really)
- Excellent for forms, data entry, inspections

**The Gotchas**:
- Formulas can become unreadable (the 400-character formula problem)
- Performance degradation with complex apps
- Limited offline capabilities
- The "spaghetti canvas" anti-pattern

**Best Use Cases**:
- Field service apps
- Inspection checklists
- Custom forms
- Data collection tools
- Quick internal utilities

**Key Visual**: Before/after — simple form to polished mobile app

---

## Episode 5: Power Apps Model-Driven — The Enterprise Grade
**Slug**: `power-apps-model-driven`  
**Tone**: Enterprise-focused, architectural

**Synopsis**:
Model-Driven Apps are the enterprise workhorse. Less creativity, more structure.

**What Model-Driven Apps Are**:
- Data-first: Design your data model, the UI follows
- Automatic responsive layouts
- Built on Dataverse (required)
- Consistent UX across all apps

**The Philosophy Shift**:
| Canvas Apps | Model-Driven Apps |
|-------------|-------------------|
| "What should it look like?" | "What data do I need?" |
| Pixel-perfect control | Standardized components |
| Quick prototypes | Long-term enterprise apps |
| Any data source | Dataverse required |

**The Good**:
- Consistent, professional appearance
- Built-in security model
- Easy maintenance and updates
- Scales elegantly
- Business rules without code

**The Gotchas**:
- Dataverse licensing costs (see Episode 8)
- Less visual customization
- Steeper learning curve
- Requires data modeling skills

**Best Use Cases**:
- CRM alternatives / extensions
- Case management systems
- Asset management
- Complex business processes
- Multi-entity applications

**Key Visual**: The same app built Canvas vs. Model-Driven

---

## Episode 6: Power Automate — The Invisible Workhorse
**Slug**: `power-automate-deep-dive`  
**Tone**: Workflow-focused, practical

**Synopsis**:
Power Automate is often the most valuable part of Power Platform. The automation engine.

**The Evolution**:
```
2016: Microsoft Flow (born)
2019: Rebranded to Power Automate
2020: Desktop flows (RPA) added
2023: Copilot integration
2024: Process mining integration
```

**Three Types of Flows**:

| Type | What It Does | Use Case |
|------|--------------|----------|
| **Cloud Flows** | Event-driven automation | When email arrives → create task |
| **Desktop Flows** | Robotic Process Automation | Automate legacy Windows apps |
| **Business Process Flows** | Guided stage-gate processes | Lead → Opportunity → Quote → Close |

**The Connector Ecosystem**:
- **Standard** (included): SharePoint, Outlook, Teams, OneDrive
- **Premium** (extra $): Salesforce, SAP, SQL Server, HTTP
- **Custom**: Build your own API connections

**Advanced Patterns**:
- Approval workflows with parallel branching
- Error handling and retry logic
- Parent-child flow architecture
- The 30-day running limit (and how to work around it)

**The Gotchas**:
- Flow debugging is... challenging
- Connector throttling surprises
- Premium connector costs add up
- Flows referencing deprecated connectors (technical debt)

**Key Visual**: Complex approval flow with error handling branches

---

## Episode 7: Copilot Studio — The AI Chatbot Factory
**Slug**: `copilot-studio-history-guide`  
**Tone**: Historical then practical

**Synopsis**:
The most rebranded product in Microsoft history. Understanding where Copilot Studio came from.

**The Rebrand Timeline**:
```
2020: Power Virtual Agents (PVA) launched
      → "Build chatbots without code"
      → Part of Power Platform family
      
2022: PVA gets GPT integration
      → Natural language understanding improves
      
2023: Renamed to "Microsoft Copilot Studio"
      → Aligned with Copilot branding
      → Expanded beyond chatbots to "AI agents"
      
2024: Copilot Studio becomes the AI agent platform
      → Build custom Copilots
      → Connect to enterprise data
      → Multi-channel deployment
      
2025: Integration with Microsoft 365 Copilot
      → Extend M365 Copilot with custom skills
      → Enterprise AI orchestration
```

**What Copilot Studio Actually Does Today**:
- Build conversational AI bots
- Create custom Copilots for specific domains
- Connect to Dataverse, SharePoint, and external APIs
- Deploy to Teams, websites, and other channels
- Extend Microsoft 365 Copilot with custom capabilities

**The Value Proposition**:
- No ML expertise required
- Visual conversation designer
- Built-in natural language understanding
- Enterprise-grade security and compliance

**The Gotchas**:
- Pricing is complex (per message, per session)
- "Copilot" naming confusion (which Copilot?)
- Capability overlap with Azure Bot Service
- Steep learning curve for advanced scenarios

**Key Visual**: Timeline showing the rebrand evolution

---

## Episode 8: Dataverse — The Crown Jewel (and Its Price Tag)
**Slug**: `dataverse-cost-reality`  
**Tone**: Strategic, honest about costs 💰

**Synopsis**:
Dataverse is Microsoft's database-as-a-service for the Power Platform. It's powerful — and expensive.

**What Dataverse Is**:
- A managed relational database
- Built on Azure SQL (under the hood)
- Native security model (row-level, field-level)
- Relationships, validations, business rules included
- The foundation for Model-Driven Apps and Dynamics 365

**Why Microsoft Wants You on Dataverse**:
- Lock-in (data lives in their cloud)
- Upsell path to Dynamics 365
- Better integration across Power Platform
- Enterprise features (audit, compliance, backup)

**The Cost Reality** (as of 2026):

| Item | Cost | Notes |
|------|------|-------|
| **Database capacity** | ~€40/GB/month | Minimum 1 GB included with some licenses |
| **File capacity** | ~€2/GB/month | Attachments, images |
| **Log capacity** | ~€10/GB/month | Audit logs |
| **Per-app license** | ~€5/user/month | Limited to 2 apps per user |
| **Premium license** | ~€20/user/month | Unlimited apps |

**The Hidden Costs**:
- API call limits (request units)
- Storage growth over time
- Backup and retention complexity
- Migration costs if you ever leave

**When Dataverse Makes Sense**:
✅ Model-Driven Apps (required)  
✅ Complex data relationships  
✅ Enterprise security requirements  
✅ Integration with Dynamics 365  
✅ Long-term, strategic applications  

**When to Avoid Dataverse**:
❌ Simple apps that only need SharePoint lists  
❌ Cost-sensitive projects  
❌ Short-term or experimental apps  
❌ When you already have SQL Server  

**Alternatives Within Power Platform**:
- SharePoint lists (free with M365)
- SQL Server (use existing infrastructure)
- Excel files (for really simple needs)
- Azure SQL (more control, similar cost)

**Key Visual**: Cost comparison chart — SharePoint vs. Dataverse vs. Azure SQL

**Pull Quote**: *"Dataverse is a Ferrari. Make sure you need a Ferrari before you buy one."*

---

# ACT III: The Competition

## Episode 9: Salesforce Lightning — The CRM Giant's Low Code
**Slug**: `salesforce-lightning-overview`  
**Tone**: Fair comparison

**Synopsis**:
For organizations already on Salesforce, Lightning is the natural low-code choice.

**The Platform**:
- Lightning App Builder: Drag-and-drop page design
- Flow Builder: Powerful declarative automation
- Apex: When declarative isn't enough (pro-code escape hatch)

**Strengths**:
- Deep CRM integration
- Mature ecosystem (AppExchange)
- Strong declarative automation
- Excellent mobile experience

**Weaknesses**:
- Expensive outside Salesforce use cases
- Vendor lock-in is severe
- "Salesforce skills" are a specialty
- Complex architecture over time

---

## Episode 10: ServiceNow — The IT Department's Platform
**Slug**: `servicenow-app-engine-overview`  
**Tone**: Niche expertise

**Synopsis**:
For IT-centric organizations, ServiceNow offers deep integration with ITSM processes.

**The Platform**:
- App Engine Studio: Low-code app development
- Flow Designer: Workflow automation
- Integration Hub: Connect to external systems

**Strengths**:
- Native ITSM integration
- Enterprise IT feature set
- Strong governance out of the box
- GRC/Security compliance

**Weaknesses**:
- Best for IT/HR/Facilities, less suited for general business
- Expensive licensing
- ServiceNow expertise is specialized
- Can feel "IT-centric" to business users

---

# ACT IV: The Reckoning

## Episode 11: The App Lifecycle — When Apps Grow Up
**Slug**: `lowcode-app-lifecycle`  
**Tone**: Thoughtful, introducing complexity 🤔

**Synopsis**:
The app is live. Users love it. Now what?

**The Inevitable Evolution**:
- Users request "just one more feature"
- The app becomes business-critical
- You need a test environment (oh wait, where is that?)
- Someone asks: "Is this backed up?"

**The ALM Maturity Curve**:
```
Level 0: "It's just a demo"
Level 1: "We use it in production" (😬)
Level 2: "We have dev and prod environments"
Level 3: "We use solutions and version control"
Level 4: "We have CI/CD pipelines"
Level 5: "We have full DevOps like 'real' developers"
```

**Power Platform ALM**:
- Environments (Dev/Test/Prod)
- Solutions (packaging mechanism)
- Azure DevOps / GitHub integration
- Power Platform CLI

**Key Visual**: ALM maturity staircase

---

## Episode 12: The Bus Factor — When Lars Retires
**Slug**: `lowcode-bus-factor-crisis`  
**Tone**: Sobering, urgent ⚠️

**Synopsis**:
The most important episode in the series. The question vendors don't answer.

**The Scenario**:
> Lars built 47 Power Apps over 5 years. He understood every formula, every flow, every connection. Lars just retired. Now what?

**The Knowledge Crisis**:
- No documentation ("it's all in the app")
- Tribal knowledge ("only Lars knew why that filter was there")
- Connection secrets ("the service account password? Lars had it in his head")
- Flow dependencies ("23 flows that nobody can trace")

**Platform-Specific Nightmares**:

**Power Apps**:
- Canvas formulas that span 400 characters
- Flows referencing deprecated connectors
- Environment sprawl (37 personal environments)
- Mixed Dataverse and SharePoint sources

**Salesforce Lightning**:
- Declarative automation nobody can trace
- Process Builder + Flow + Apex combinations
- AppExchange dependencies
- Undocumented Apex triggers

**ServiceNow**:
- Business Rules + Client Scripts + Flow Designer
- Custom tables with cryptic names
- Scheduled jobs running somewhere
- Update sets that never got promoted

**Key Visual**: "Before Lars / After Lars" knowledge gap diagram

---

## Episode 13: The Documentation Debt
**Slug**: `lowcode-documentation-debt`  
**Tone**: Constructive, practical

**Synopsis**:
How to prevent the Lars problem. Documentation that actually works.

**Minimum Viable Documentation**:
Every app should have:
1. **Purpose**: What problem does this solve?
2. **Users**: Who uses it and how often?
3. **Data**: Where does data come from and go to?
4. **Flows**: What automations exist?
5. **Connections**: What services are connected? What credentials?
6. **Owner**: Who is responsible today?

**Documentation Tools**:
- Power Platform Admin Center reporting
- CoE Starter Kit (Microsoft)
- Third-party tools (Expose, Solution Analyzer)
- Good old README files

**The "Hit by a Bus" Test**:
> *If you disappeared tomorrow, could someone else fix this app on Monday?*

---

# ACT V: Sustainable Low Code

## Episode 14: Governance That Works
**Slug**: `lowcode-governance-framework`  
**Tone**: Strategic, solution-oriented

**Synopsis**:
Building a sustainable citizen development program.

**The Center of Excellence Model**:
- Enable, don't block
- Provide training and templates
- Set guardrails, not gates
- Celebrate successes

**The Tiering System**:

| Tier | Criticality | Documentation | Backup Owner | Review |
|------|-------------|---------------|--------------|--------|
| Personal | Individual productivity | None | None | None |
| Team | Team workflow | Basic | Recommended | Annual |
| Department | Business process | Full | Required | Quarterly |
| Enterprise | Business critical | Complete + audit | Multiple | Monthly |

**The Happy Mates 3-2-1 Rule**:
- **3** people understand the app
- **2** people can modify it
- **1** person is accountable

---

## Episode 15: The Pro-Code Escape Hatch
**Slug**: `lowcode-to-procode-migration`  
**Tone**: Forward-looking

**Synopsis**:
When low-code hits its limits, know when and how to graduate.

**Signs It's Time**:
- Performance degradation
- Formula complexity exceeds readability
- Need for unit testing
- Integration complexity
- Team has pro-code skills

**Migration Strategies**:
- Gradual: API layer between low-code and pro-code
- Parallel: Rebuild while maintaining low-code
- Big bang: Full replacement (risky)

**Preserving Value**:
- Extract business logic documentation
- Maintain data during transition
- Keep low-code for prototyping

---

# ACT VI: The AI Independence Era

## Episode 16: The Future — AI-Generated Apps & Digital Sovereignty
**Slug**: `lowcode-ai-independence-era`  
**Tone**: Visionary, provocative, hopeful 🚀

**Synopsis**:
The series finale. A prediction of how AI is about to change everything — and why this might finally break the big tech stranglehold.

**The Paradigm Shift**:

We spent 15 episodes learning platforms owned by Microsoft, Salesforce, and ServiceNow. Each locks you into their ecosystem, their licensing, their data centers.

But a new era is emerging:

```
Yesterday:  Human → Low-Code Platform → App (vendor lock-in)
Tomorrow:   Human → AI Agent → Perfect Code → Your Infrastructure
```

**AI-Generated Development — What's Coming**:

| Capability | Today (2026) | Tomorrow (2028+) |
|------------|--------------|------------------|
| Code Generation | Copilot assists | AI writes complete apps |
| Architecture | Human designs | AI proposes best practices |
| Testing | Manual + unit tests | Auto-generated test suites |
| Deployment | CI/CD pipelines | AI-managed infrastructure |
| Documentation | Often neglected | Auto-generated, always current |
| ALM | Requires discipline | Built-in by default |

**The "Perfect Code" Promise**:
AI-generated code can be:
- **Consistent**: Same patterns everywhere
- **Documented**: Comments and READMEs generated automatically
- **Tested**: Unit tests written alongside code
- **Portable**: No vendor-specific lock-in
- **Maintainable**: Clean architecture, not spaghetti

*The "Lars problem" disappears because the AI can explain and modify any code it generated.*

**Breaking Free from Big Tech**:

| Dependency | Low-Code Reality | AI-Generated Future |
|------------|------------------|---------------------|
| **Data** | Dataverse/Salesforce clouds | Your database, your rules |
| **Runtime** | Vendor infrastructure | Self-hosted or multi-cloud |
| **Licensing** | Per-user/per-app fees | Own your code forever |
| **Updates** | Vendor controls timeline | You control your stack |
| **Exit** | Migration nightmare | Portable by design |

**The Self-Hosting Revolution**:

Once AI generates clean, documented, portable code:
- **Kubernetes anywhere**: Azure, AWS, on-prem, edge
- **Database freedom**: PostgreSQL, MySQL, SQLite
- **No more per-seat licensing**: Host once, serve thousands
- **True ownership**: The code is yours

**The Happy Mates Vision**:

> *"We teach low-code today because it's the fastest path to results. But we're building toward a future where AI generates real code that you actually own — with perfect documentation, built-in testing, and zero vendor lock-in."*

**The Transition Path**:

1. **Today**: Use low-code for speed (but understand the trade-offs)
2. **Near-term**: Leverage AI coding assistants (Copilot, Cursor, Gemini)
3. **Emerging**: AI agents that implement full specifications autonomously
4. **Future**: AI-maintained codebases with human oversight

**What This Means for Citizen Developers**:

- The skills you learn in low-code (logic, data modeling, workflow design) transfer directly
- You become the "specification expert" — the human who knows what to build
- AI handles the implementation; you handle the "why" and "what"

**The Big Tech Question**:

Microsoft, Salesforce, and ServiceNow see this coming. They're racing to embed AI into their platforms to keep you locked in. The question:

> *Will you use AI to go deeper into their ecosystems... or to finally break free?*

**Key Visual**: A progression diagram:
```
[Vendor Cloud] ─── lock-in ───→ [You]
       ↓
[AI Agent] ─── generates ───→ [Your Code] → [Your Infrastructure]
                                    ↓
                              [Your Freedom]
```

**Pull Quote**: *"Low-code was the training wheels. AI-generated code is the bicycle you actually own."*

---

# Series Metadata

| Property | Value |
|----------|-------|
| **Series Slug** | `lowcode-for-dummies` |
| **Total Episodes** | 16 |
| **Author** | Happy Mates Editorial |
| **Languages** | DA, EN |
| **Cadence** | Biweekly (every other Friday) |
| **Start Date** | October 3, 2025 |
| **End Date** | May 1, 2026 |

---

# Publication Schedule

Episodes release every other Friday, starting October 2025:

| # | Episode | Slug | Date |
|---|---------|------|------|
| 1 | The Magic of Fast | `lowcode-magic-of-fast` | 2025-10-03 |
| 2 | The Low Code Landscape | `lowcode-platform-landscape` | 2025-10-17 |
| 3 | Power Platform 101 | `power-platform-family-tree` | 2025-10-31 |
| 4 | Power Apps Canvas | `power-apps-canvas-deep-dive` | 2025-11-14 |
| 5 | Power Apps Model-Driven | `power-apps-model-driven` | 2025-11-28 |
| 6 | Power Automate | `power-automate-deep-dive` | 2025-12-12 |
| 7 | Copilot Studio History | `copilot-studio-history-guide` | 2025-12-26 |
| 8 | Dataverse Cost Reality | `dataverse-cost-reality` | 2026-01-09 |
| 9 | Salesforce Lightning | `salesforce-lightning-overview` | 2026-01-23 |
| 10 | ServiceNow App Engine | `servicenow-app-engine-overview` | 2026-02-06 |
| 11 | App Lifecycle & ALM | `lowcode-app-lifecycle` | 2026-02-20 |
| 12 | The Bus Factor | `lowcode-bus-factor-crisis` | 2026-03-06 |
| 13 | Documentation Debt | `lowcode-documentation-debt` | 2026-03-20 |
| 14 | Governance Framework | `lowcode-governance-framework` | 2026-04-03 |
| 15 | Pro-Code Escape Hatch | `lowcode-to-procode-migration` | 2026-04-17 |
| 16 | AI Independence Era | `lowcode-ai-independence-era` | 2026-05-01 |

**Status Legend**: ✅ Published | 📝 Draft | ⏳ Planned


---

# Visual Asset Summary

**Series Hero Image**: 3D rendered magnetic building blocks (smooth, colorful, floating) snapping together to form a mobile app interface. One key block labeled "Lars" is being pulled away, causing instability. Dark premium background with soft glow effects.

| Episode | Visual |
|---------|--------|
| Ep1 | Timeline: traditional vs. low-code |
| Ep2 | MetroFlow platform map |
| Ep3 | Power Platform family tree |
| Ep4 | Canvas app evolution |
| Ep5 | Canvas vs. Model-Driven comparison |
| Ep6 | Complex approval flow diagram |
| Ep7 | Copilot Studio rebrand timeline |
| Ep8 | Cost comparison chart |
| Ep9 | Salesforce ecosystem |
| Ep10 | ServiceNow architecture |
| Ep11 | ALM maturity staircase |
| Ep12 | "Before/After Lars" knowledge gap |
| Ep13 | Documentation checklist |
| Ep14 | Governance tier pyramid |
| Ep15 | Low-code to pro-code migration path |
| Ep16 | AI independence progression diagram |

---

# Quick Reference: Episode Slugs

```
ACT I — The Promise
├── lowcode-magic-of-fast
└── lowcode-platform-landscape

ACT II — Power Platform Deep Dive
├── power-platform-family-tree
├── power-apps-canvas-deep-dive
├── power-apps-model-driven
├── power-automate-deep-dive
├── copilot-studio-history-guide
└── dataverse-cost-reality

ACT III — The Competition
├── salesforce-lightning-overview
└── servicenow-app-engine-overview

ACT IV — The Reckoning
├── lowcode-app-lifecycle
├── lowcode-bus-factor-crisis
└── lowcode-documentation-debt

ACT V — Sustainable Low Code
├── lowcode-governance-framework
└── lowcode-to-procode-migration

ACT VI — The AI Independence Era
└── lowcode-ai-independence-era
```

---

*Last updated: 2026-01-11*
