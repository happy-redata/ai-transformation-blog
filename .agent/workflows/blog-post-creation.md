---
description: How to create blog posts for Happy Mates Voice platform following established style and generating all required artifacts
---

# Blog Post Creation Workflow for Happy Mates

This workflow documents the established style, structure, and required artifacts for creating blog posts on the `happymates-blob` platform.

## 1. Content Philosophy & Voice

### 1.1 Core Editorial Identity
The Happy Mates blog follows a **"Premium Minimalist"** Zetland-inspired editorial style:
- **Conversational yet authoritative**: Write as if explaining to an intelligent friend, not lecturing
- **Metaphor-driven explanations**: Complex technical concepts are always paired with relatable real-world metaphors (shipping ports for Kubernetes, passports for Zero Trust, skyscrapers for spreadsheet chaos)
- **Emotional hooks**: Open with a scenario the reader can relate to emotionally
- **Danish-first, English-parallel**: Create bilingual content simultaneously in `da/` and `en/`

| Tone Markers | Style |
|---------|-------|
| Opening | Personal, provocative hook or relatable scenario |
| Technical depth | L100-L200 (accessible, not expert-level) |
| Humor | Self-aware tech jokes (strictly text-based) |
| Call-to-action | End with a thought-provoking question, not a hard sell |
| AI transparency | Always credit AI tools used in `aiTools` frontmatter |
| **Emojis/Smileys** | **STRICTLY FORBIDDEN. Never use emojis or smileys in content, headings, or images.** |
| **ASCII Art** | **STRICTLY FORBIDDEN. Use AI-generated graphics for all diagrams and visualizations.** |

- **Bold** for key terms on first introduction
- Use `>` blockquotes for authoritative quotes with source attribution
- **High-Fidelity Graphics**: Use AI-generated images for architecture, flows, and concept visualization. Save these as colocated assets (e.g., `./diagram-auth-flow.png`).
- **No ASCII Art**: Never use code blocks for diagrams.
- Markdown tables for comparisons and summaries
- Horizontal rules (`---`) to separate major sections and the closing CTA

## 2. Required Artifacts per Post

### 2.1 File Structure
**New Structure (Colocated):**
```
content/posts/
  └── [locale]/
      └── [slug]/
          ├── index.mdx       # The post content
          └── hero-[slug].png # Colocated hero image
# Audio is stored in Azure Blob Storage, NOT in the repo
```

**Output Artifacts:**
- `content/posts/da/[slug]/index.mdx`
- `content/posts/en/[slug]/index.mdx`
- `content/posts/da/[slug]/hero-[slug].png` (referenced as `./hero-[slug].png`)
- `content/posts/da/[slug]/[slug]-da.wav` (generated)

### 2.2 Hero Image (Mandatory)
```
- **Style**: Colorful, friendly illustration using AI generation (Gemini/Imagen 3 or Antigravity)
- **Theme**: Visual metaphor matching the article concept
- **Colors**: Harmonious with Happy Mates brand (teal, orange, purple tones)
- **Avoid**: Dry technical diagrams, stock photography, device frames, emojis/smileys
- **Credit**: Always set `heroImageCredit` in frontmatter (e.g., "Gemini / Imagen 3")

### 2.3 Audio Assets (Recommended for flagship content)

**Audio files are stored externally in Azure Blob Storage** (not in the repository).

```
Azure Blob URL pattern:
https://sthappymatesauthsweden.blob.core.windows.net/audio/[slug]-[locale].wav

Examples:
- https://sthappymatesauthsweden.blob.core.windows.net/audio/kubernetes-for-dummies-da.wav
- https://sthappymatesauthsweden.blob.core.windows.net/audio/trust-for-dummies-en.wav
```

**Audio Generation & Upload:**
1. Generate audio: `npm run generate-audio [slug]`
2. Upload to Azure: `node cli/upload-audio-to-azure.js`
3. Metadata is saved to `public/audio-metadata.json`

**Local files kept only for SFX:**
- `public/audio/intro.wav` - Intro jingle (used by audio generator)
- `public/audio/outro.wav` - Outro jingle (used by audio generator)

## 3. Frontmatter Schema

Every post MUST include this frontmatter structure:

```yaml
---
title: "Post Title: Subtitle for SEO"
excerpt: "Compelling 1-2 sentence summary for cards and search results"
date: YYYY-MM-DD
tags: ["Topic1", "Topic2", "Topic3"]
author: "Author Name"
heroImage: "/images/hero-[slug].png"
heroImageCredit: "Generator / Model Name"
aiTools: ["Tool1", "Tool2"]          # AI tools used in creation
originalSlug: "[slug]"               # Optional, for tracking
audio:                               # Audio generation config
  introJingle: "/audio/jingles/vibe-coding-intro.mp3"
  outroJingle: "/audio/jingles/vibe-coding-outro.mp3"
  defaultVoice: "da-DK-ChristelNeural"  # or "en-US-JennyNeural"
  backgroundMusic: "/audio/music/ambient-tech.mp3"
  language: "da-DK"                  # or "en-US"
footnotes:                           # Source citations
  - text: "Fact or statistic description"
    source: "Source Name"
    url: "https://..."
---
```

### 3.1 Tag Taxonomy
Use established tags for discoverability:
- **Technical**: `Kubernetes`, `DevOps`, `Cloud`, `Zero Trust`, `AI`
- **Conceptual**: `Everything as Code`, `Vibe Coding`, `Digital Transformation`
- **Organizational**: `Ledelse` (Leadership), `Strategi`, `Forening`
- **Level**: `Begynderguide` / `Beginner Guide`

## 4. Audio Marker System (MDX Components)

For posts with audio narration, use these specialized MDX components:

### 4.1 Hidden Audio Markers
```mdx
<Music track="ambient-tech" action="fade-in" />
<Music track="ambient-tech" action="fade-out" />
<Pause duration={1.5} />
<SoundEffect name="success-chime" />
<SoundEffect name="keyboard-typing" />
<Speaker voice="narrator" name="Fortæller">
  Narrated content here.
</Speaker>
```

### 4.2 Voice-Text Inversion Pattern
For content that should differ between visual and audio:

```mdx
<!-- Abbreviation expansion (text shows "AI", audio says "A-I") -->
<Voice text="A-I">AI</Voice>
<Voice text="A-I'en">AI'en</Voice>

<!-- Bilingual pronunciation (American English word in Danish text) -->
<Voice text="compiler" lang="en-US">compiler</Voice>

<!-- Technical terms -->
<Voice text="P.D.F.">PDF</Voice>
<Voice text="Y.A.M.L.">YAML</Voice>
<Voice text="E.A.C.">EaC</Voice>
<Voice text="H.R.">HR</Voice>

<!-- Numeric expressions -->
<Voice text="fireogtyve timer i døgnet syv dage om ugen">24/7</Voice>

<!-- Brand pronunciation -->
<Voice text="GitHub Co-pilot">GitHub Copilot</Voice>
<Voice text="Claude Code">Claude Code</Voice>
<Voice text="Zero Trust">Zero Trust</Voice>

<!-- Danish school abbreviations -->
<Voice text="H F">HF</Voice>
```

### 4.3 Conditional Rendering
```mdx
<!-- Audio-only content (hidden in browser, spoken in audio) -->
<Speak>Welcome to the audio version of this article.</Speak>

<!-- Visual-only content (shown in browser, skipped in audio) -->
<View>Refer to the table below for a full breakdown:</View>
```

### 4.4 Emphasis Patterns
```mdx
<Emphasis type="dramatic">1. marts</Emphasis>  <!-- For key dates/reveals -->
<Emphasis type="strong">Key point here.</Emphasis>
<Emphasis type="soft">Subtle aside.</Emphasis>
<Emphasis type="question">**Is your organization ready?**</Emphasis>
```

## 5. Structural Templates

### 5.1 Educational "For Dummies" Posts
Pattern used in `kubernetes-for-dummies` and `zero-trust-for-dummies`:

1. **Hook**: Relatable question or scenario
2. **Metaphor Introduction**: Visual, everyday comparison
3. **Core Concept**: What is [X]?
4. **Key Components**: Numbered list or table
5. **High-Fidelity Visuals**: 1-2 AI-generated graphics representing the core metaphor or technical flow (save to post folder).
6. **Simple Example**: Code block (for real code/config) or practical application
7. **Why It Matters**: Connection to Happy Mates / reader's context
8. **Getting Started**: Actionable next steps
9. **Summary Table**: Key takeaways
10. **Closing Question**: Engagement CTA

### 5.2 Thought Leadership Posts
Pattern used in `draeb-regnearket` and `everything-as-code-ai`:

1. **Provocative Opening**: Uncomfortable truth or scenario
2. **Speaker Narration**: `<Speaker>` for dramatic effect
3. **Problem Statement**: Current state analysis
4. **Historical Context**: From X to Y evolution
5. **The Shift**: New paradigm introduction
6. **Leadership Message**: Direct address to decision-makers
7. **Concrete Metric**: "Measure success by [X]"
8. **Philosophical Closing**: Question for reflection
9. **Teaser**: Preview of next post in series

### 5.3 Announcement/Update Posts
Pattern used in `fremtidsplaner-q1-2026`:

1. **Audio Greeting**: `<Speak>` welcome message
2. **Context Setting**: Brief overview
3. **Timeline Structure**: Month-by-month breakdown
4. **Key Milestones**: Bulleted highlights
5. **Numbers/Goals**: Specific targets
6. **Closing**: Newsletter CTA or tagline

## 6. Generation Workflow

### Step 1: Content Planning
- Identify the target metaphor and L-level (L100 for beginners, L200 for practitioners)
- Outline the structure using appropriate template (§5.1, §5.2, or §5.3)
- Prepare 2-3 footnote sources with URLs

### Step 2: Hero Image Generation
// turbo
```bash
# Use the generate_image tool to create the hero image
# Prompt pattern: "Colorful, friendly illustration of [metaphor] representing [concept]. 
# Warm teal and orange tones. No text. Clean, modern style suitable for a tech blog hero image."
```
Save to: `public/images/hero-[slug].png`

### Step 3: Danish Content Creation
Create `content/posts/da/[slug].mdx` with:
- Full frontmatter (§3)
- Audio markers for narration (§4)
- Voice inversions for Danish pronunciation

### Step 4: English Content Creation
Create `content/posts/en/[slug].mdx` with:
- Mirrored structure and frontmatter
- Adjusted `audio.defaultVoice` to English voice
- Voice inversions for English pronunciation

### Step 5: Audio Generation & Upload
// turbo
```bash
# Generate audio locally
npm run generate-audio [slug]

# Upload to Azure Blob Storage
node cli/upload-audio-to-azure.js
```
Audio is stored in Azure Blob Storage and served from:
`https://sthappymatesauthsweden.blob.core.windows.net/audio/`

### Step 6: Verification
// turbo
```bash
npm run dev
```
- Verify both locales render correctly
- Check hero image display
- Test audio playback if generated

## 7. Quality Checklist

Before publishing, verify:

- [ ] **Bilingual parity**: DA and EN versions have matching structure
- [ ] **Hero image**: Exists at `/images/hero-[slug].png` with credit in frontmatter
- [ ] **Frontmatter complete**: All required fields populated
- [ ] **AI tools credited**: `aiTools` array lists all AI assistants used
- [ ] **Footnotes verified**: All source URLs are valid
- [ ] **Voice markers**: Abbreviations wrapped in `<Voice>` for correct pronunciation
- [ ] **Tables render**: `remark-gfm` handles all Markdown tables
- [ ] **No broken links**: All internal links resolve
- [ ] **Closing CTA**: Post ends with engaging question, not email link
- [ ] **Audio tested**: If generated, WAV plays correctly with intro/outro jingles

## 8. Example: Minimal Valid Post

```mdx
---
title: "Example Post: A Template"
excerpt: "Brief description for search and cards."
date: 2026-01-07
tags: ["Template", "Example"]
author: "Niels Gregers Johansen"
heroImage: "/images/hero-example.png"
heroImageCredit: "Antigravity / Imagen 3"
aiTools: ["Antigravity", "Gemini"]
audio:
  defaultVoice: "da-DK-ChristelNeural"
  language: "da-DK"
---

<Speak>Welcome to this example post.</Speak>

Have you ever wondered how to write a great blog post? Let me show you.

## The Key Insight

<Voice text="A-I">AI</Voice> is changing how we create content...

---

*What topic would you like us to cover next? Share your thoughts in the comments!*
```

---

**Reference Posts (Gold Standards)**:
- **Educational**: `content/posts/da/kubernetes-for-dummies.mdx`
- **Thought Leadership**: `content/posts/da/draeb-regnearket.mdx`
- **Audio Markers**: `content/posts/da/fremtidsplaner-q1-2026.mdx`
- **Full Audio Experience**: `content/posts/da/zero-trust-for-dummies.mdx`
