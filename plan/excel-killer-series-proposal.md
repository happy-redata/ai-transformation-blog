# Excel Killer Series: Proposal

**Series Title (DA):** *"Dræb Regnearket (Med AI)"*  
**Series Title (EN):** *"Death to Spreadsheets (With AI)"*  
**Series Slug:** `excel-killer`  
**Total Episodes:** 3  
**Author:** Happy Mates Redaktionen  
**Metaphor:** *The Spreadsheet Prison Break* — Your Excel file is a prison. AI is the escape tunnel.

---

## Series Overview

This mini-series takes readers from Excel chaos to a fully functional, privacy-respecting web application — built entirely by AI on their local machine. No data leaves their computer. No cloud dependency. Full digital sovereignty.

### Target Audience
- Business users drowning in Excel files they can't share or scale
- IT managers who keep inheriting "mission-critical" spreadsheets
- Leaders curious about AI-assisted development without cloud risk

### Core Innovation
Unlike typical "no-code" tutorials that push users toward cloud platforms, this series emphasizes:
- **Local-first AI**: All data stays on the user's machine
- **Privacy by design**: AI is instructed to never upload data
- **Escape velocity**: Moving beyond spreadsheet limitations permanently

---

## Episode Breakdown

### Episode 1: "Forstå Dit Fængsel" / "Understanding Your Prison"
**Theme:** Spreadsheet Archaeology  
**Metaphor:** The archaeologist examining ancient ruins — your Excel file is a dig site

**Content Outline:**
1. **Opening Hook:** "Your Excel file has 47 columns, 12,000 rows, and one person who understands it. That person is on vacation."
2. **The Upload:** How to analyze an Excel file with local AI
3. **AI as Archaeologist:** Automatic identification of:
   - Data sources (manual entry vs. copied from other systems)
   - Hidden relationships (VLOOKUP chains, cross-sheet references)
   - Schema patterns (headers, data types, validation rules)
4. **The Report:** AI generates a structured analysis:
   - Suggested database schema
   - Identified data sources
   - Complexity score (1-10)
5. **First Insight:** "This spreadsheet should be 3 different applications"

**Key Takeaways:**
| What AI Found | What It Means |
|---------------|---------------|
| 47 columns | Schema needs normalization |
| VLOOKUP chains | Hidden relationships = database joins |
| Manual entry columns | Need input forms |
| Calculated fields | Business logic to extract |

**Hero Image Concept:** 
Isometric illustration of an archaeologist with a magnifying glass examining a giant spreadsheet grid, discovering hidden patterns glowing beneath the surface.

---

### Episode 2: "Byg Prototypen" / "Building the Prototype"
**Theme:** From Data to Interface  
**Metaphor:** The architect turning blueprints into buildings — but the architect is AI

**Content Outline:**
1. **Opening Hook:** "What if you could describe your app in plain Danish, and have it built in 20 minutes?"
2. **Data Security First:** 
   - Instructing AI to never upload data
   - Local database setup (SQLite for simplicity)
   - Data masking scripts for when you *do* need help
3. **The Build Process:**
   - AI reads the archaeological report (Episode 1)
   - Generates: Database schema + migration scripts
   - Generates: Web interface (React/Vue SPA)
   - Generates: Input forms matching original data entry patterns
4. **Iteration Loop:**
   - "The table is wrong — add a filter here"
   - AI modifies in real-time
5. **The First Demo:** 
   - Your Excel data, now in a proper web app
   - Running on localhost

**Key Takeaways:**
| Traditional Approach | AI-Assisted Approach |
|---------------------|----------------------|
| 3-month development cycle | 3-hour prototype |
| External developer costs | Your machine, your AI |
| Data leaves your control | Data never leaves |
| Fixed scope | Iterative refinement |

**Hero Image Concept:**
Isometric illustration of an AI robot architect (friendly, not threatening) building a web interface out of colorful blocks, with a spreadsheet transforming into application windows.

---

### Episode 3: "Test, Test, Test" / "Testing What You Built"
**Theme:** Automation as Quality Assurance  
**Metaphor:** The robot inspector checking every door and window

**Content Outline:**
1. **Opening Hook:** "You've built an app. But does it actually work like your Excel file did?"
2. **The Testing Philosophy:**
   - Trust, but verify (with Playwright)
   - AI-generated test scripts that mimic real user behavior
3. **Browser Automation:**
   - AI controls the browser
   - Fills forms with test data
   - Validates calculations match Excel formulas
   - Screenshots discrepancies
4. **The Regression Suite:**
   - "Run these 50 tests every time you change something"
   - CI/CD for non-developers (GitHub Actions basics)
5. **The Handoff:**
   - Your app is now testable, deployable, maintainable
   - No more "only Lars knows how this works"

**Key Takeaways:**
| Excel Testing | App Testing |
|---------------|-------------|
| Manual comparison | Automated verification |
| "It looks right" | "All 47 tests pass" |
| One person checks | Everyone can validate |
| Changes break silently | Changes break loudly |

**Hero Image Concept:**
Isometric illustration of a friendly robot inspector with a clipboard, systematically checking off items while walking through a web application interface.

---

## Series Metadata for CMS

### Danish Series Definition
```yaml
---
title: "Dræb Regnearket (Med AI)"
description: "En praktisk serie om at transformere Excel-filer til rigtige webapplikationer — med AI der arbejder lokalt og holder dine data private."
heroImage: "/images/hero-excel-killer-series.png"
author: "Happy Mates Redaktionen"
totalEpisodes: 3
---
```

### English Series Definition
```yaml
---
title: "Death to Spreadsheets (With AI)"
description: "A practical series on transforming Excel files into real web applications — with AI that works locally and keeps your data private."
heroImage: "/images/hero-excel-killer-series.png"
author: "Happy Mates Editorial"
totalEpisodes: 3
---
```

---

## Publication Strategy

### Schedule (Suggested)
| Episode | Publish Date | Status |
|---------|--------------|--------|
| Ep 1: Understanding | 2026-01-17 | To Generate |
| Ep 2: Prototyping | 2026-01-24 | To Generate |
| Ep 3: Testing | 2026-01-31 | To Generate |

### Tags
- `AI`, `Excel`, `Prototyping`, `Privacy`, `Begynderguide`, `Digital Transformation`

### Related Content
- Links to: `draeb-regnearket` (thought leadership piece)
- Links to: `lowcode-for-dummies` (alternative approach comparison)

---

## Hero Image Prompts (for Generation)

### Series Hero
> A colorful isometric illustration showing a spreadsheet prison cell with bars made of cells, and an AI-powered door opening to reveal a modern web application interface. Warm teal, orange, and purple tones. No text, no emojis. Clean, modern tech blog style.

### Episode 1 Hero
> Isometric illustration of an archaeologist character examining a giant glowing spreadsheet grid with a magnifying glass. Hidden database schemas and relationship patterns glow beneath the surface. Teal and orange color palette.

### Episode 2 Hero  
> Isometric illustration of a friendly AI robot architect building a modern web application from colorful magnetic blocks. A spreadsheet floats nearby, transforming into application windows. Warm purple and teal tones.

### Episode 3 Hero
> Isometric illustration of a friendly robot inspector with a clipboard walking through a web application, checking off test items. Green checkmarks float in the air. Clean, modern style.

---

## Next Steps

1. **Approve series concept** — Confirm the 3-episode structure
2. **Generate series hero image** — Use the provided prompt
3. **Create series definition files** — `content/series/da/excel-killer.mdx` and `content/series/en/excel-killer.mdx`
4. **Generate Episode 1 content** — Start with "Understanding Your Prison"
5. **Schedule for publication** — Weekly release starting Jan 17

---

*This proposal follows the Happy Mates "Premium Minimalist" editorial style with metaphor-driven explanations, privacy-first positioning, and L100-L200 technical accessibility.*
