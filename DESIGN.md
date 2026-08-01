# DESIGN.md

## Design system status

**Visual world:** Editorial systems portfolio  
**Product:** David Liu bilingual personal portfolio  
**Theme:** Deep ink, mineral blue, warm white  
**Default mode:** Dark  
**Design maturity:** Foundation v1

This file is the visual source of truth for the repository. It guides refinement and redesign work, but it does not authorize changes to factual copy, project status, routes, privacy boundaries, or technical architecture.

Read `PRODUCT.md` first.

## Design intent

The site should feel like a carefully edited technical portfolio: clear enough for a recruiter, substantial enough for a collaborator, and distinctive enough to be remembered.

The target is not:

- a university website;
- a dashboard;
- a cyberpunk interface;
- a generic AI landing page;
- an Awwwards experiment that makes evidence difficult to read.

The experience should communicate intelligence through structure, typography, evidence, and restraint rather than through glowing effects or decorative complexity.

## Design modes by surface

### Home: Persuade + Experience

The visitor should understand the positioning, encounter representative work, and choose a project or resume action.

Expression is allowed, but the first viewport must remain readable and actionable on a 1366×768 laptop.

### Project detail: Read + Experience

The artifact and evidence lead. The interface supports comprehension and gives truthful context.

### Resume: Read

Scanability and print quality outrank visual drama.

### Navigation and language controls: Operate

Controls must be predictable, keyboard accessible, compact, and page-context aware.

## Design dials

Default profile:

```text
DESIGN_VARIANCE: 7
MOTION_INTENSITY: 4
VISUAL_DENSITY: 5
```

Interpretation:

- enough layout variation to avoid a template;
- restrained motion that reinforces hierarchy;
- enough information to prove capability without creating a dashboard.

A page-level brief may override the dials, but must state the override before implementation.

## Color system

The current site already uses a viable dark family. Refine it rather than replacing it casually.

### Core tokens

```css
:root {
    --color-ink-950: #07111f;
    --color-ink-900: #0b1826;
    --color-ink-850: #0f2030;
    --color-ink-800: #142a3d;

    --color-paper-050: #f4f7f8;
    --color-paper-100: #e8eef1;
    --color-slate-300: #b5c3cd;
    --color-slate-400: #93a6b4;

    --color-mineral-300: #8bd4ee;
    --color-mineral-400: #62bfdf;
    --color-mineral-500: #399dc5;

    --color-success: #79d6ad;
    --color-warning: #e7bc72;
    --color-danger: #e48c91;

    --color-border-subtle: rgba(232, 238, 241, 0.10);
    --color-border-strong: rgba(139, 212, 238, 0.28);
}
```

These are target semantic values. Existing CSS custom properties may map to them incrementally.

### Usage rules

- Primary background uses ink 950 or 900.
- Major surfaces may step one or two ink values lighter.
- Primary text uses paper 050.
- Secondary text uses slate 300 or 400 after contrast verification.
- Mineral blue is the single brand accent family.
- Cyan is not applied to every heading, border, icon, and link simultaneously.
- Status colors communicate status only.
- Avoid pure black and pure white.
- Avoid purple, violet, indigo-to-blue AI gradients by default.
- Avoid gradient-clipped text.
- Avoid gray text on chromatic backgrounds when contrast is weak.

## Typography

### Current constraint

The repository may not request fonts from Google Fonts, a CDN, or another runtime host.

Until intentionally licensed and self-hosted font assets are added, retain a local system stack. Do not silently add a network font dependency.

### Future font direction

A future typography task may self-host one open-license sans family and one mono companion after license and file-size review. The desired character is contemporary, technical, and human, not geometric-futurist.

### Roles

```text
Display: identity statements and project titles
Heading: section and subsection hierarchy
Body: narrative and evidence explanation
Label: concise metadata only
Mono: code, test counts, architecture labels, structured evidence
```

### Rules

- One dominant display statement per viewport.
- Home H1 should fit in two or three lines on common desktop widths.
- Project titles may be large but must not force unreadable line breaks.
- Body copy measure: approximately 60–72 characters.
- Body line height: approximately 1.65–1.8 for Chinese and 1.55–1.7 for English.
- Use `text-wrap: balance` for short headings and `text-wrap: pretty` for paragraphs where supported.
- Do not use monospace as a general body font.
- Do not inject a decorative serif word into a sans headline.
- Sentence case is the default.
- Small uppercase tracked labels are limited to one per three major sections.
- Eyebrows must add information; labels such as “SECTION 01” are prohibited.

## Type scale

Recommended fluid ranges:

```css
--text-display: clamp(3rem, 7vw, 6.5rem);
--text-h1-project: clamp(2.7rem, 6vw, 5.6rem);
--text-h2: clamp(2rem, 4vw, 3.5rem);
--text-h3: clamp(1.25rem, 2vw, 1.7rem);
--text-body-large: clamp(1.05rem, 1.5vw, 1.22rem);
--text-body: 1rem;
--text-small: 0.86rem;
--text-label: 0.75rem;
```

Use optical judgment; these are bounds, not a requirement to maximize every heading.

## Layout system

### Content widths

```css
--layout-max: 1240px;
--layout-reading: 760px;
--layout-wide-reading: 900px;
--layout-gutter: clamp(20px, 4vw, 56px);
```

### Grid

Use a 12-column mental grid on desktop. CSS Grid is preferred for multi-column composition.

Common patterns:

- 7/5 editorial split;
- 8/4 narrative plus metadata;
- 5/7 visual artifact plus explanation;
- asymmetric 2-column project index;
- full-width evidence moment;
- compact metadata rail.

Do not repeat the same layout family in consecutive major sections more than twice.

### Vertical rhythm

```css
--space-section: clamp(88px, 10vw, 152px);
--space-section-compact: clamp(64px, 8vw, 108px);
--space-block: clamp(28px, 4vw, 56px);
```

Top and bottom space may differ for optical balance.

### Responsive behavior

- Every multi-column layout declares its `<768px` behavior next to the desktop rule.
- Mobile order follows reading priority, not desktop source order by accident.
- Touch targets are at least 44×44px where practical.
- Avoid horizontal overflow from oversized type, code, diagrams, or motion.
- Use `min-height: 100dvh`, not `height: 100vh`, for viewport-scale sections.
- The home hero must not require scrolling before the visitor sees the primary action.

## Radius, borders, and surfaces

### Radius scale

```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 22px;
--radius-round: 999px;
```

Rules:

- `radius-round` is for compact controls, not every label or container.
- Inner controls use smaller radii than their parent surface.
- Cards exist only when they communicate grouping, interaction, or elevation.
- Avoid cards inside cards.
- Prefer spacing, alignment, background shifts, or a single divider before adding a border box.
- Do not place a thick colored stripe on one edge of a rounded card as decoration.
- Shadows must be subtle and tinted to the surrounding ink family.

## Page composition

### Header

- One-line desktop navigation.
- Target height: 64–76px.
- Brand identity remains concise.
- Active and focus states are visible without relying only on color.
- The language control should integrate with navigation or a clear utility area when redesigned; avoid an unexplained floating pill covering content.
- Mobile menu must preserve focus behavior, labels, and no-JavaScript access to important links where feasible.

### Home hero

The hero should answer:

- who David is;
- what he builds;
- what evidence or artifact makes the claim believable;
- where to go next.

Preferred structure:

- concise identity and value proposition;
- one primary and one secondary action;
- one real project artifact, evidence frame, or carefully composed project index preview;
- no fake capability dashboard;
- no generic `<AI />` centerpiece;
- no stats without evidence;
- no long list of capabilities inside the hero.

### About and capability content

Do not default to three equal cards. Use a concise narrative, working-method sequence, capability matrix with real relationships, or selected proof points.

Capabilities should connect to projects rather than exist as unsupported labels.

### Project index

All six projects must remain discoverable, but they should not look identical.

Use varied composition based on evidence type:

- software screenshot;
- report or terminal evidence;
- research platform interface;
- product-flow artifact;
- CAD or physical prototype;
- workflow diagram or documented process.

Each project preview includes:

- category;
- title;
- concise result or purpose;
- truthful status;
- relevant visual evidence;
- direct detail link.

Avoid fake diagrams when real evidence exists.

### Project detail pages

Recommended order:

1. project title, precise summary, status, role;
2. strongest evidence artifact;
3. context and problem;
4. ownership and responsibilities;
5. system, workflow, or design explanation;
6. selected technical details;
7. verification and evidence;
8. limitations and safety boundaries;
9. previous/next project navigation.

Do not make every section a three-card grid. Evidence may be full width. Narrative may be a reading column. Architecture may use a structured diagram when it improves understanding.

### Resume

- Preserve semantic reading order and print styles.
- Do not depend on background color for meaning.
- Links should remain legible when printed.
- Avoid animation and decorative fixed controls in print.
- Use compact spacing without becoming dense.

### Contact

- Use direct, working links.
- Public email is `liuwenlong0706@outlook.com`.
- Resume action must be available when the resume page exists.
- Do not display a disabled “resume coming soon” state after the resume is published.
- Avoid giant CTA copy unsupported by the portfolio's tone.

## Evidence design

Evidence is a core visual asset, not an appendix.

Priority:

1. real screenshots and output;
2. verified local interface frames;
3. CAD and physical prototype images;
4. real architecture or workflow diagrams;
5. clearly labeled concept visuals;
6. decorative abstraction only when it does not pretend to be evidence.

Rules:

- Do not crop away the information needed to interpret evidence.
- Use captions that explain what is shown and what it proves.
- State what the evidence does not prove when relevant.
- Provide descriptive alt text for meaningful images.
- Do not show private names, file paths, credentials, local IPs, or identity data.
- Do not use stock “team” images or invented institutional logos.

## Motion system

### Timing

```css
--motion-fast: 160ms;
--motion-base: 240ms;
--motion-slow: 420ms;
--ease-standard: cubic-bezier(.2, .8, .2, 1);
```

### Allowed uses

- navigation state;
- focus and hover feedback;
- progressive reveal of a major artifact;
- project transition context;
- expanding evidence details;
- reduced, purposeful scroll entry.

### Disallowed defaults

- infinite floating cards;
- cursor-following decoration;
- magnetic controls without a clear benefit;
- bounce or elastic easing;
- wheel hijacking;
- mandatory scroll snap;
- animation on every section;
- motion that delays access to content.

Every nonessential animation must be disabled or simplified under `prefers-reduced-motion: reduce`.

## Accessibility floor

- WCAG AA text contrast.
- Visible focus states.
- Semantic landmarks and headings.
- Skip link remains functional.
- Controls expose names, state, and purpose.
- Language attributes remain correct.
- Language switching works without JavaScript.
- Meaning is not conveyed by color alone.
- Interactive targets are usable by keyboard.
- Evidence galleries remain operable and understandable without pointer hover.
- No motion-dependent comprehension.

## Bilingual behavior

- Chinese remains the default route.
- Language links retain page context.
- English is independently readable and is not a machine-translation placeholder.
- Visual density may differ slightly because of text length, but hierarchy and evidence parity remain equivalent.
- Chinese and English pages use the same status truth and safety boundaries.
- Do not force identical line breaks across languages.

## Anti-pattern list

Reject these unless an explicit approved brief requires them:

- purple-blue AI gradients;
- gradient text;
- centered dark hero with a glow blob and three cards;
- a fake dashboard or terminal as the universal hero visual;
- equal-card grids for every section;
- nested cards;
- excessive pills and badges;
- uppercase eyebrow above every heading;
- repeated left/right zigzag sections;
- random serif emphasis in sans headlines;
- invented metrics or logos;
- fake user testimonials;
- generic icons for every capability;
- large decorative animations without meaning;
- hidden or low-contrast button text;
- mobile layouts left to accidental wrapping;
- new dependencies added only for visual novelty.

## Implementation sequence for redesign work

1. Read `PRODUCT.md`, this file, and `AGENTS.md`.
2. Inspect the target page, relevant CSS, shared scripts, and tests.
3. State a one-line design read and page mode.
4. Decide refinement versus redesign.
5. For a redesign, define the replacement visual world before editing.
6. Implement the smallest coherent surface.
7. Verify desktop and mobile together.
8. Fix findings in one batch.
9. Confirm once more and stop polishing.
10. Run automated checks and report factual, dependency, route, and content changes.

## Definition of done

A UI task is complete only when:

- the page purpose and primary action are obvious;
- the result follows this design system or documents an approved override;
- project truth and privacy remain intact;
- desktop and mobile have been visually checked when tooling is available;
- keyboard and reduced-motion behavior have been considered;
- no generic AI-pattern regression was introduced;
- tests, syntax checks, and production constraints pass;
- the final report lists changed files, design decisions, verification, and remaining limitations.
