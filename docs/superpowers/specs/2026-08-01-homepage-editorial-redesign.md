# Homepage Editorial Redesign

Date: 2026-08-01
Status: Approved visual direction; awaiting written-spec review
Surface: Chinese and English portfolio home pages
Mode: Persuade + Experience

## 1. Goal

Redesign the Chinese and English portfolio home pages into a premium editorial systems portfolio that feels original, technically credible, and competition-ready without reducing recruiter scanability or obscuring project evidence.

The redesign should borrow the qualities associated with strong vibe-coded showcase work—clear concept, memorable interaction, confident art direction, and polished execution—without copying any particular winning website, visual identity, code, animation, or composition.

## 2. Product truth

The site is Liu Wenlong / David Liu's bilingual personal portfolio.

It is not:

- a university website;
- an education platform;
- a generic AI company landing page;
- a medical service;
- a validated medical-device storefront;
- a trading service or investment-advice product.

All factual content, project status, public routes, privacy boundaries, bilingual counterparts, canonical host, and evidence limitations remain governed by `PRODUCT.md`.

## 3. Approved direction

**Direction name:** Editorial AI systems portfolio

**Design formula:**

- 60% high-end editorial portfolio;
- 20% technical case-study publication;
- 20% restrained experimental interaction.

**Design dials:**

```text
DESIGN_VARIANCE: 8
MOTION_INTENSITY: 5
VISUAL_DENSITY: 5
```

This is a page-level override from the repository defaults. It allows a more distinctive homepage while retaining the existing accessibility and performance floor.

## 4. Experience principles

### 4.1 Evidence before decoration

A real screenshot, verified system frame, report fragment, CAD image, prototype image, or real workflow artifact should be used whenever available.

Decorative geometry may support composition, but it must never pose as proof of a system that has not been demonstrated.

### 4.2 One memorable interaction

The homepage should contain one signature interaction rather than many unrelated effects.

Approved signature interaction:

> The featured project evidence stage changes as the visitor moves through the project index. The active project number, short status line, evidence image, and supporting caption transition together as one editorial system.

The interaction must:

- work without wheel hijacking;
- preserve direct project links;
- have a static fallback;
- remain understandable with JavaScript disabled;
- simplify under `prefers-reduced-motion: reduce`;
- not block content while loading.

### 4.3 Recruitment clarity

Within the first viewport, a visitor should understand:

- who David Liu is;
- that he builds AI applications, research systems, and product prototypes;
- that the portfolio contains verifiable work;
- how to view projects or open the resume.

Within approximately one minute, a recruiter should be able to identify:

- target role direction;
- core capabilities;
- representative projects;
- project status and evidence;
- contact and resume paths.

## 5. Visual world

### 5.1 Palette

Retain the deep ink family but make the page less uniformly blue.

Target balance:

```css
--home-ink: #07100f;
--home-ink-raised: #0d1917;
--home-paper: #edf1ec;
--home-paper-muted: #aebbb4;
--home-signal: #9fe870;
--home-mineral: #69bfd6;
--home-rule: rgba(237, 241, 236, 0.14);
--home-surface-soft: rgba(237, 241, 236, 0.045);
```

Rules:

- Warm paper white is the dominant text color.
- Signal green is used for active project state, verified status, and one primary action family.
- Mineral blue remains available for secondary technical information and continuity with project pages.
- Do not use purple, violet, or blue-purple gradients.
- Do not apply both green and blue to every component.
- Status colors remain semantic.

### 5.2 Typography

No runtime font CDN may be added.

For the first implementation pass, use a refined local stack and improve typography through scale, weight, line length, tracking, case, and composition.

Roles:

- Display: large identity statement with tight tracking.
- Editorial heading: section title and project title.
- Body: calm, readable project explanation.
- Mono: status, project number, test counts, route-like labels, and evidence captions.

Rules:

- Hero display may reach `clamp(3.4rem, 8.4vw, 8rem)` but must remain visible on a 1366×768 viewport.
- Chinese and English receive independent line-break treatment.
- Uppercase labels are limited to meaningful metadata.
- Do not place an uppercase eyebrow above every heading.
- Do not use decorative serif fragments inside otherwise sans headlines.

## 6. Homepage information architecture

The content remains a single static page with semantic anchor navigation.

### 6.1 Header

Desktop structure:

- compact David Liu wordmark on the left;
- project, profile, resume, and contact navigation in the center/right;
- integrated `中文 / EN` language control;
- one small availability indicator only when the wording remains truthful.

Changes from the current page:

- remove the floating language pill;
- reduce visual chrome;
- remove animated underlines from every navigation link if they create noise;
- use a restrained current-section state;
- preserve keyboard focus and mobile menu behavior.

### 6.2 Hero

Replace the current capability-panel composition.

Desktop composition:

- left/top: identity metadata and large value statement;
- lower-left: concise supporting paragraph and actions;
- right/lower-right: featured real project evidence stage;
- edge or baseline: project number and verification caption.

Chinese headline direction:

```text
我把 AI、科研与产品构想
做成可以验证的系统。
```

English headline direction:

```text
I turn AI, research,
and product ideas into
systems you can verify.
```

These are design-direction lines. Final copy must be reviewed against existing factual language before implementation.

Actions:

1. Primary: view selected projects.
2. Secondary: open public resume.
3. GitHub remains available as a lower-emphasis text link or utility action.

Hero evidence rules:

- use a real verified project image already in the repository;
- include a truthful caption and project status;
- do not use a fake dashboard, generic terminal, `<AI />`, glowing orb, or decorative capability matrix;
- image loading must not shift the primary text or actions.

### 6.3 Positioning strip

A narrow editorial strip follows the hero and summarizes the working range without generic capability cards.

Preferred structure:

```text
AI applications / automation systems / research platforms / product prototypes
```

Each capability links or visually relates to at least one project rather than existing as an unsupported label.

### 6.4 Selected work stage

All six projects remain discoverable.

Desktop composition:

- left rail: numbered project index with title, category, and truthful status;
- right stage: active evidence artifact with caption and direct project link;
- active item is visually clear without relying only on color;
- project evidence changes through focus, click, or bounded scroll observation;
- no mandatory sticky behavior on short laptop heights.

Default project ordering:

1. Knowledge Reconstruction System
2. Multi-Timeframe Market Analysis and Risk Reporting System
3. Research Laboratory Digital Platform
4. AI Health Management Product Concept
5. CareRing Smart Health Wristband
6. AI-Assisted Research and Intelligent Modeling Workflow

Evidence treatment varies by project:

- classroom system: verified interface frame;
- trading system: dashboard or CLI/report evidence;
- lab platform: real website interface when available;
- AI health concept: clearly labeled product-flow or concept artifact;
- CareRing: CAD or physical structural prototype;
- AI workflow: workflow, modeling output, or patent-drawing process evidence.

Mobile composition:

- project items become a vertical editorial list;
- each item owns its image and status, avoiding a hidden shared hover stage;
- direct detail links remain visible;
- no interaction depends on hover.

### 6.5 Working method

Replace the current repeated feature-card and skill-card grids with one concise workflow narrative.

Recommended four-part sequence:

1. Define the real problem.
2. Build a working path.
3. Verify the output.
4. Document limits and next steps.

Each step should reference a real type of portfolio evidence. Avoid icons unless they add meaning.

### 6.6 Profile and experience

Combine the current About, Skills, and Experience information into a denser editorial section with:

- a short profile narrative;
- a structured capability list;
- selected role and leadership evidence;
- a direct resume action.

Do not repeat project descriptions already visible in the selected-work section.

### 6.7 Contact and footer

The final contact surface should be restrained and direct.

Include:

- public email `liuwenlong0706@outlook.com`;
- GitHub link;
- public resume link;
- a concise opportunity statement in Chinese and English.

Remove any obsolete disabled resume state.

## 7. Component architecture

The current site remains static HTML, CSS, and vanilla JavaScript.

Do not introduce React, Next.js, GSAP, WebGL, or a build framework for this redesign.

Recommended file responsibilities:

- `index.html`: Chinese home semantic structure and factual content.
- `en/index.html`: English home semantic structure and factual content.
- `style.css`: shared visual tokens and home layout styles.
- `homepage-editorial.js`: bounded homepage-only progressive enhancement for the project evidence stage and current-section navigation.
- `script.js`: shared navigation, mobile menu, back-to-top, and existing global behavior; do not overload it with page-specific design logic.
- `tests/test_homepage_editorial_contracts.py`: structural, bilingual, truth, route, and accessibility contracts.

If adding `homepage-editorial.js`, load it only on the two home pages.

## 8. Interaction and motion

### 8.1 Entry motion

Allowed:

- hero text and evidence enter in one coordinated sequence;
- opacity and transform only;
- total visible entrance completes within approximately 700ms;
- content remains present without JavaScript.

### 8.2 Project stage transition

Allowed properties:

- opacity;
- transform;
- clip-path only when progressive enhancement and fallback are both clean.

Transition duration:

```css
--home-project-transition: 360ms;
```

No bounce, elastic easing, perpetual floating, cursor-following, or wheel interception.

### 8.3 Hover and focus

- Project index rows expose the same active state for keyboard focus and pointer hover.
- Buttons use small translation or background changes, not dramatic scaling.
- Evidence details remain available without hover.

### 8.4 Reduced motion

Under `prefers-reduced-motion: reduce`:

- disable coordinated entry transforms;
- switch project evidence without movement;
- preserve opacity only when it does not delay reading;
- disable smooth scrolling where appropriate.

## 9. Responsive behavior

### Desktop: 1200px and above

- full editorial split hero;
- shared project evidence stage;
- generous but controlled section spacing.

### Laptop/tablet: 768px–1199px

- reduce display scale;
- allow evidence stage to move below hero copy when vertical space is limited;
- avoid requiring more than one viewport before the project entry point;
- ensure language and resume controls remain visible.

### Mobile: below 768px

- single-column reading order;
- no floating language control;
- no shared hover-dependent evidence stage;
- project images appear in their own list items;
- display headline uses balanced but non-forced line breaks;
- controls have practical 44px touch targets;
- no horizontal overflow from project numbers or large type.

## 10. Accessibility

Required:

- WCAG AA contrast;
- skip link remains first meaningful focus target;
- semantic header, nav, main, section, article, and footer structure;
- one H1 per page;
- section headings follow logical order;
- current project state is exposed with `aria-current`, `aria-selected`, or equivalent semantics appropriate to the implementation;
- evidence images have descriptive alt text;
- decorative layers are hidden from assistive technology;
- all project links are keyboard reachable;
- language switching works without JavaScript;
- no animation is required to understand content;
- focus is never moved automatically when project evidence changes.

## 11. Performance and dependency constraints

- No external runtime fonts.
- No runtime image CDN.
- No third-party animation framework.
- Reuse repository evidence assets.
- Prefer CSS over JavaScript for visual styling.
- JavaScript enhancement should be small, page-scoped, and resilient.
- Meaningful hero content must render before the enhancement script runs.
- Avoid adding large uncompressed media.
- Preserve the existing forbidden-dependency CI scan.

## 12. Bilingual parity

Both home pages must retain:

- equivalent project ordering;
- equivalent evidence strength;
- equivalent status truth;
- equivalent actions;
- equivalent information hierarchy;
- contextual language counterpart links.

Copy does not need identical line breaks or literal sentence structure.

## 13. Scope boundaries

### Included in the first implementation

- Chinese and English headers;
- Chinese and English home heroes;
- positioning strip;
- selected-work project stage/list;
- working-method section;
- combined profile/capability/experience section;
- contact and footer;
- homepage-specific progressive enhancement;
- desktop, laptop, tablet, and mobile behavior;
- automated homepage contracts.

### Not included

- redesigning the six project detail pages;
- redesigning the resume pages;
- changing project facts or statuses;
- changing route names or the canonical domain;
- adding a CMS or frontend framework;
- sourcing new stock imagery;
- adding unverified claims, testimonials, metrics, or partner logos.

## 14. Error and fallback behavior

- If a project evidence image fails, the project title, status, caption, and direct link remain visible.
- If JavaScript fails, all six project entries and their corresponding evidence remain accessible in document order.
- If motion APIs are unavailable, the layout remains complete without animation.
- If content length expands, cards are not forced to equal heights and text is not clipped.
- If the screen height is short, no critical action is positioned outside the hero through fixed-height assumptions.

## 15. Verification strategy

### Automated

Add contracts that verify:

- both home pages contain all six project routes;
- the public resume and email are available;
- no disabled resume placeholder remains;
- contextual language links remain correct;
- each project preview contains a truthful status;
- the homepage enhancement is loaded only on home pages;
- the enhancement includes reduced-motion handling;
- no forbidden external dependencies are introduced;
- canonical domain and CNAME remain unchanged;
- JavaScript syntax passes;
- the existing full pytest suite remains green.

### Visual

When browser tooling is available, inspect together:

- 1440×900 desktop;
- 1366×768 laptop;
- 1024×768 tablet landscape;
- 768×1024 tablet portrait;
- 390×844 mobile;
- 360×800 mobile.

Check:

- first-viewport clarity;
- evidence readability;
- text wrapping in both languages;
- project-stage keyboard behavior;
- focus visibility;
- image loading and layout stability;
- reduced-motion behavior;
- no horizontal overflow.

## 16. Definition of done

The homepage redesign is complete when:

- the current template-like capability panel and repeated card rhythm are replaced;
- the first viewport communicates identity, work, evidence, and actions clearly;
- all six projects remain directly discoverable;
- at least one memorable but bounded project-evidence interaction works accessibly;
- real evidence leads the visual hierarchy;
- Chinese and English pages maintain parity;
- mobile becomes a complete editorial layout rather than a collapsed desktop design;
- product truth, routes, privacy, and safety boundaries remain intact;
- all automated checks pass;
- visual verification is completed when browser tooling is available.
