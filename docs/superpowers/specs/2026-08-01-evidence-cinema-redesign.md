# Evidence Cinema Homepage Redesign

**Date:** 2026-08-01  
**Repository:** `LocK-DEL/university-department`  
**Target branch:** `design/evidence-cinema-v2`  
**Status:** Design approved in conversation; implementation not started

## 1. Purpose

The current bilingual homepage is professional, complete, and evidence-led, but it still resembles a polished technical portfolio template. The second redesign must create a stronger personal identity, a more premium editorial atmosphere, and a clearer emotional arc without weakening factual accuracy, accessibility, or performance.

The approved direction is **Evidence Cinema**: a high-end digital magazine structure with a restrained layer of immersive motion. The site should feel more like a moving editorial feature than a grid of portfolio cards.

The homepage must communicate one distinctive idea:

> David Liu turns unfinished ideas into systems, tests, and evidence.

The redesign must not exaggerate project maturity, invent evidence, or imply institutional deployment, medical validation, trading performance, or production readiness where those claims are not supported.

## 2. Success Criteria

The redesign is successful when:

1. A visitor can recognize the site as David Liu's portfolio rather than a generic technology template.
2. The first viewport has one dominant visual idea instead of several competing modules.
3. The six projects feel like one coherent body of work connected by a shared evidence process.
4. The page feels premium through typography, composition, pacing, and image treatment rather than decorative effects.
5. Real evidence remains clearly separated from concepts, prototypes, workflow diagrams, and evidence still in preparation.
6. Chinese and English versions remain structurally equivalent and factually aligned.
7. The page works with JavaScript disabled, keyboard-only input, reduced motion, image failures, and mobile layouts.
8. Existing routes, canonical metadata, language links, resume paths, public contact details, and project detail pages remain intact.

## 3. Design Positioning

### 3.1 Approved Direction

The visual direction combines:

- **Editorial fashion-magazine composition:** oversized typography, strong cropping, asymmetrical layouts, visible page rhythm, publication-style notes, and generous negative space.
- **Restrained digital-art interaction:** mask reveals, slow evidence transitions, chapter progression, subtle parallax, and spatial composition changes.

The result must be sophisticated and memorable, not noisy or theatrical.

### 3.2 What the Design Must Avoid

The redesign must not use:

- generic repeated project cards;
- excessive rounded containers;
- decorative pill labels as the primary hierarchy;
- full-screen particles;
- cursor-following light blobs;
- exaggerated three-dimensional scenes;
- WebGL;
- video backgrounds;
- wheel hijacking;
- fake page-turn physics;
- animations on every text element;
- external animation frameworks;
- external fonts or asset CDNs;
- invented product screenshots;
- unverified performance, deployment, medical, or investment claims.

## 4. Core Narrative System

The site is organized around a visible evidence chain:

`IDEA → STRUCTURE → SYSTEM → TEST → EVIDENCE`

This is not a decorative slogan. It is the main information architecture for connecting projects from different disciplines.

Each project is mapped to the stages it has genuinely reached:

| Project | Evidence stages |
| --- | --- |
| Classroom Knowledge Reconstruction System | SYSTEM · TEST · EVIDENCE |
| Multi-timeframe Market Analysis and Risk Reporting System | SYSTEM · TEST · EVIDENCE |
| Research Laboratory Digital Platform | STRUCTURE · SYSTEM |
| AI Health Management Product Concept | IDEA · STRUCTURE |
| CareRing Smart Health Wristband | STRUCTURE · PROTOTYPE |
| AI-assisted Research and Intelligent Modeling Workflow | PROCESS · EVIDENCE |

`PROTOTYPE` and `PROCESS` are project-specific extensions. They must not be visually presented as equivalent to tested production evidence.

## 5. Page Architecture

The bilingual homepage will contain six primary regions:

1. Site header
2. Cinematic editorial hero
3. Selected-work index
4. Six project chapters
5. Profile and working-practice editorial section
6. Final contact statement and minimal publication footer

The current project detail pages and resume pages remain unchanged unless a necessary compatibility correction is discovered during implementation.

## 6. Header

The header remains compact and integrated into the page rather than floating as a separate control panel.

It contains:

- David Liu identity mark;
- selected work anchor;
- method/profile anchor;
- contact anchor;
- resume link;
- GitHub link;
- Chinese/English language switch;
- availability/contact indicator where space permits.

On mobile, the header may use the existing accessible menu pattern. The menu must retain:

- a real button element;
- `aria-expanded`;
- `aria-controls`;
- keyboard operability;
- visible focus treatment;
- no scroll lock that traps the user.

The header should be visually quiet so the hero remains dominant.

## 7. Hero: Evidence Cinema Opening

### 7.1 Primary Copy

The first screen uses a minimal editorial composition with a single dominant statement.

English primary line:

> FROM UNFINISHED IDEAS TO EVIDENCE.

Chinese supporting line:

> 把尚未成形的构想，做成可以运行、测试与验证的现实。

The Chinese page may lead with Chinese support while preserving the English editorial headline as the visual anchor. The English page uses the English headline with a natural English supporting paragraph.

### 7.2 Actions

Only two primary actions remain in the hero:

- `VIEW THE WORK` / `查看项目`
- `OPEN RESUME` / `打开简历`

GitHub, language selection, and direct contact remain available in the header and final contact section rather than competing with the hero.

### 7.3 Evidence Background

The hero background is built from real, privacy-reviewed evidence fragments already stored in the repository or explicitly approved for public use:

- classroom system interface detail;
- trading dashboard or terminal detail;
- knowledge-graph or structured-output detail if available;
- CareRing prototype or modeling detail;
- patent-style line drawing or structural documentation if publicly safe.

The fragments are treated like editorial photography:

- enlarged;
- cropped asymmetrically;
- partially obscured by typography or masks;
- layered with restrained opacity and depth;
- never altered in a way that changes the factual meaning of the evidence.

Images must keep meaningful alt text when presented as content. Purely atmospheric duplicate fragments may be hidden from assistive technology only when the same evidence and context are available elsewhere in the page.

### 7.4 Hero Motion

The hero uses only:

- a staged mask reveal for the main headline;
- slow evidence-fragment transitions on an approximately 8–12 second rhythm;
- minimal pointer-based image offset on capable desktop devices;
- a controlled transition from the hero into the project index as the user scrolls.

The hero must not autoplay rapid transitions, flash, or move large content continuously. All motion is disabled or simplified under `prefers-reduced-motion`.

## 8. Selected Work Index

The hero leads into a concise editorial table of contents.

Each row displays:

- chapter number;
- project title;
- category;
- evidence stage;
- direct link to the project chapter or detail page.

The table of contents does not display long descriptions or conventional cards.

Desktop hover and keyboard focus may reveal a temporary background evidence fragment for the corresponding project. This preview must:

- remain nonessential;
- never obscure readable text;
- not steal focus;
- use the same trigger for hover and focus-visible states;
- disappear cleanly when focus leaves;
- be removed on touch-first/mobile layouts.

The index remains a plain usable list when JavaScript is unavailable.

## 9. Project Chapters

Each project becomes a magazine-like chapter rather than an item in a shared card system. A chapter occupies roughly one to two viewports on desktop, depending on the amount of truthful evidence available.

Every chapter contains:

1. Oversized number and project title
2. One-sentence value statement
3. Primary evidence composition
4. Publication-style evidence notes
5. Explicit limitation statement where necessary
6. Direct link to the full project page
7. Visible evidence-chain position

The visual structure changes from project to project while maintaining a consistent editorial system.

### 9.1 Chapter 01: Classroom Knowledge Reconstruction System

**Visual emphasis:** complete local software.

Composition:

- one large system-interface image;
- an optional knowledge-graph or structured-output crop when available and privacy-safe;
- test and runtime notes treated as publication captions.

Approved factual notes:

- 49 tests passed;
- local front-end and back-end operation verified;
- offline-safe mode verified where currently documented;
- public evidence is privacy reviewed.

Required limitation:

- do not imply formal school deployment or institutional adoption.

### 9.2 Chapter 02: Multi-timeframe Market Analysis and Risk Reporting System

**Visual emphasis:** analytical workflow, terminal, and dashboard.

Composition:

- vertical terminal fragment entering the frame;
- dashboard evidence offset against it;
- restrained data-publication styling;
- no profit curves or screenshots that could be interpreted as income claims unless they are explicitly labeled as synthetic or test data.

Approved factual notes:

- 36 tests passed;
- public-data analysis and local reporting workflow implemented;
- system is an analytical and risk-reporting tool.

Required limitation:

- does not constitute investment advice or evidence of returns.

### 9.3 Chapter 03: Research Laboratory Digital Platform

**Visual emphasis:** information architecture and research coordination.

Composition:

- spacious interface or architecture diagram;
- content modules represented as a publication spread;
- more negative space than the verified software chapters.

Approved status:

- front-end structure reviewed;
- public build evidence in preparation.

Required limitation:

- no fabricated screenshots or production-deployment claims.

### 9.4 Chapter 04: AI Health Management Product Concept

**Visual emphasis:** product reasoning, user flow, and system relationship.

Composition:

- product strategy sheet;
- user journey fragments;
- device and service relationship diagram;
- visible `CONCEPT` status.

Required limitation:

- this is a product concept, not a validated medical device or healthcare service;
- do not present health outcomes as verified.

### 9.5 Chapter 05: CareRing Smart Health Wristband

**Visual emphasis:** industrial-design archive.

Composition:

- physical or structural prototype evidence;
- CAD/modeling detail;
- patent-style drawing where available;
- dimension or assembly annotation if publicly suitable;
- asymmetrical collage with the strongest visual impact among the chapters.

Approved status:

- structural prototype;
- 3D modeling and patent-oriented iteration.

Required limitation:

- structural adaptation does not prove sensing, treatment, health, sterilization, or clinical performance.

### 9.6 Chapter 06: AI-assisted Research and Intelligent Modeling Workflow

**Visual emphasis:** the user's cross-domain working method.

Composition:

- a horizontal or stepped sequence from input problem to final artifact;
- requirement fragment;
- AI collaboration or generated intermediate artifact;
- software-operation or modeling stage;
- final documentation, model, drawing, or system output.

Approved status:

- workflow case collection;
- process and output evidence where available.

Required limitation:

- distinguish the user's decisions, review, acceptance, and manual work from AI-assisted generation.

## 10. Project Evidence Notes

Evidence notes use publication-style typography rather than card badges.

Example pattern:

- `EVIDENCE 01 — 49 tests passed`
- `EVIDENCE 02 — Local front-end and back-end verified`
- `LIMIT — No formal institutional deployment claimed`

The notes should be legible, short, and attached to the relevant visual or statement.

Statuses must use a controlled vocabulary shared by both languages:

- VERIFIED LOCAL SOFTWARE
- TESTED LOCAL WORKFLOW
- STRUCTURE REVIEWED
- PUBLIC EVIDENCE IN PREPARATION
- PRODUCT CONCEPT
- STRUCTURAL PROTOTYPE
- WORKFLOW CASE COLLECTION

Translations may be natural rather than literal, but they must preserve the same factual strength.

## 11. Chapter Transitions

Transitions are created through:

- large masks;
- image crop changes;
- chapter number progression;
- title hierarchy replacement;
- evidence-chain stage progression.

Transitions must not use:

- three-dimensional page-turn simulations;
- scroll snapping that prevents normal navigation;
- wheel-event interception;
- long pinned sequences that trap the user;
- animation that delays access to content.

Each project receives one principal transition. Secondary elements should remain calm.

## 12. Profile and Working Practice

After the project chapters, the page shifts from work evidence to the person behind it.

### 12.1 Core Positioning

Primary statement:

> I BUILD BETWEEN DISCIPLINES.

Chinese support:

> 我工作在 AI、科研、产品与工程之间。

Supporting copy:

> 我擅长把尚未定义清楚的问题，拆解成可执行的需求、原型、系统与验证材料。AI 是协作工具，而项目边界、隐私处理、测试设计和最终验收由我负责。

The English version conveys the same authorship and responsibility boundaries.

### 12.2 Capability Groups

Capabilities appear as an editorial taxonomy rather than a grid of skill badges.

Approved groups:

- **AI Applications:** Python, RAG, model APIs, automation
- **Web Systems:** HTML, CSS, JavaScript, React, Next.js
- **Product and Engineering:** requirements, prototyping, CAD, documentation
- **Research Practice:** experimental workflows, bioinformatics, evidence review

Only capabilities supported by the portfolio or resume should appear. The implementation must not expand this list for visual density.

### 12.3 Working Evidence

The section includes three evidence-based positioning statements:

1. **Independent Builder** — requirements, implementation, testing, and project documentation.
2. **Research Coordination** — Chinese-medicine experiments, bioinformatics, and research-project organization.
3. **Cross-domain Leadership** — competition projects, research-team collaboration, and product-plan advancement.

Each statement links to relevant project evidence or the public resume where possible.

## 13. Final Contact Section

The final screen uses a single large closing statement:

> LET'S TURN THE NEXT IDEA INTO EVIDENCE.

Chinese support:

> 让下一个想法，成为可以验证的现实。

The final actions are limited to:

- EMAIL
- GITHUB
- RESUME

The public email remains visible as text:

`liuwenlong0706@outlook.com`

The page ends with small publication-style metadata:

- DAVID LIU / PORTFOLIO 2026
- SHENZHEN · CHINA
- DESIGNED AROUND REAL EVIDENCE

The footer must not introduce a new visual system or duplicate the full navigation.

## 14. Visual System

### 14.1 Color

The palette remains restrained:

- near-black with a subtle warm bias for the primary background;
- bone white for primary typography;
- silver gray for secondary text;
- acid green as the single dominant signal color;
- mineral blue only for selected system-evidence moments.

The exact colors may evolve from the current variables, but contrast must meet WCAG AA for normal text and interactive controls.

### 14.2 Typography

No external font dependency is introduced.

The design uses:

- system sans-serif for major editorial typography;
- a system monospace stack for evidence notes, labels, and publication metadata;
- very large display sizes with carefully controlled line lengths;
- tighter tracking for English display text;
- language-specific adjustments for Chinese line breaks and optical balance.

Chinese and English pages do not need identical line wrapping, but they must retain equivalent visual hierarchy.

### 14.3 Shape Language

- avoid repeated rounded cards;
- use hard editorial edges, open compositions, and image masks;
- reserve small corner radii for real interface screenshots only when needed to preserve their object identity;
- use rules, captions, and spacing rather than boxes to group information.

### 14.4 Image Treatment

- images may crop or extend beyond the normal grid on desktop;
- critical evidence remains visible in at least one uncropped or sufficiently legible presentation;
- captions explain what the image proves and what it does not prove;
- image loading failures reveal a meaningful text fallback;
- lazy loading is used below the first viewport;
- object URLs are revoked after use where generated from repository base64 assets.

## 15. Motion System

The homepage motion system contains only three motion families:

1. **Headline mask reveal**
2. **Slow evidence-fragment transition**
3. **Editorial chapter transition**

Motion principles:

- native scrolling remains authoritative;
- no motion is necessary to understand or reach content;
- only one dominant motion event occurs in a viewport at a time;
- the transition duration should feel deliberate but not delay navigation;
- motion is disabled or reduced under `prefers-reduced-motion`;
- pointer parallax is desktop-only, minimal, and disabled for coarse pointers;
- tab changes or focus changes never automatically scroll the page unless triggered by a native link.

## 16. Responsive Design

### 16.1 Desktop

Desktop uses:

- asymmetrical editorial grids;
- large image crops;
- oversized chapter numbers;
- overlapping but readable evidence compositions;
- index previews on hover and focus;
- persistent but non-blocking evidence-chain progression where appropriate.

### 16.2 Tablet

Tablet reduces overlap and image overflow while preserving:

- editorial hierarchy;
- chapter distinction;
- large typography;
- direct evidence notes;
- accessible controls.

### 16.3 Mobile

Mobile is a separate linear composition rather than a scaled-down desktop collage.

Each chapter follows this pattern:

1. Project number and evidence stage
2. Project title
3. One-sentence description
4. Primary evidence image or diagram
5. Evidence notes
6. Limitation note
7. Full-case link

Mobile removes:

- hover previews;
- cross-screen image collage;
- pointer parallax;
- fragile overlap;
- decorative atmospheric duplicates.

Touch targets remain at least 44 by 44 CSS pixels where practical.

## 17. Accessibility

The implementation must preserve or improve:

- one logical `h1` per page;
- sequential heading hierarchy;
- landmark structure;
- skip link;
- keyboard-accessible navigation and project index;
- visible focus indicators;
- meaningful alt text;
- correct language attributes;
- `aria-current` where appropriate;
- no inaccessible custom scroll behavior;
- reduced-motion support;
- adequate contrast;
- readable content with images disabled;
- complete document-order content without JavaScript.

Decorative evidence fragments must not duplicate verbose alt text. The meaningful project evidence remains available once with a clear caption.

## 18. Technical Architecture

The redesign should remain a static, dependency-light site.

### 18.1 HTML

The Chinese and English homepage HTML files contain the complete semantic content in document order.

JavaScript enhancement must not be required to reveal:

- project titles;
- project descriptions;
- evidence statuses;
- limitations;
- project links;
- profile copy;
- contact information.

### 18.2 CSS

The page-specific stylesheet may replace or substantially refactor `homepage-editorial.css`, but it should remain scoped under a dedicated homepage body class.

CSS responsibilities:

- editorial grid;
- typography;
- evidence cropping;
- chapter composition;
- responsive reflow;
- focus and hover states;
- reduced-motion overrides;
- image-failure fallback visibility;
- no-JavaScript baseline.

### 18.3 JavaScript

A focused homepage script provides progressive enhancement only.

Responsibilities may include:

- loading approved repository evidence from existing encoded assets;
- cycling hero evidence fragments;
- managing index preview state;
- observing chapter visibility for evidence-chain progression;
- applying bounded pointer movement;
- cleaning object URLs;
- handling failed evidence assets;
- pausing nonessential transitions when the document is hidden.

The script must not:

- generate core content;
- intercept wheel events;
- trap focus;
- create critical navigation;
- require a framework;
- load analytics or external assets.

The existing global script may continue handling common navigation behavior if its homepage-specific behavior remains isolated and predictable.

## 19. Data and Evidence Flow

1. Static HTML declares each project, status, description, limitation, links, and fallback copy.
2. Evidence assets are referenced through approved local repository sources.
3. JavaScript decodes or hydrates only the enhanced visual presentation.
4. If hydration fails, the semantic chapter remains complete and visible.
5. Chapter observation updates a decorative/progressive evidence-chain indicator.
6. Language pages use equivalent project keys so copy and stage mappings remain synchronized.

Project truth must be defined in one auditable structure where practical, or verified by tests when duplicated across the two HTML files.

## 20. Error Handling

The implementation must explicitly handle:

- missing evidence files;
- invalid base64 or unsupported image data;
- partial evidence-chunk loading failures;
- image decode failures;
- unavailable `IntersectionObserver`;
- unavailable fine-pointer input;
- JavaScript disabled;
- reduced-motion preference;
- background tab state;
- mobile layout before script execution.

Failures degrade to text, captions, diagrams, and direct project links. They must not leave blank black areas or hide the entire project chapter.

## 21. Performance Boundaries

- no external framework or animation library;
- no WebGL;
- no video background;
- no external fonts;
- first viewport should not decode every project asset immediately;
- below-fold evidence uses lazy or deferred hydration;
- hero evidence uses a small bounded set of fragments;
- duplicate decoded objects should be reused where possible;
- object URLs must be revoked when no longer needed;
- motion should rely primarily on transform, opacity, and clipping;
- layout shifts must be limited through reserved aspect ratios and dimensions.

## 22. SEO and Metadata

Preserve:

- Chinese default homepage;
- English counterpart at `/en/`;
- canonical URLs;
- `hreflang` links;
- descriptive titles and descriptions;
- Open Graph metadata;
- public email;
- project and resume routes;
- `CNAME` value `www.universitydepartment.store`.

Metadata copy may be refined to match the new evidence-centered positioning, but it must remain truthful and readable rather than slogan-only.

## 23. Testing and Verification

Implementation requires automated and source-level verification.

### 23.1 Structural Tests

Tests must verify:

- both languages contain all six projects;
- project links remain valid;
- resume, GitHub, email, and language links remain present;
- evidence stages and limitations remain factually aligned;
- one `h1` per homepage;
- expected landmarks and heading order;
- no critical content exists only in JavaScript;
- the contact email is unchanged;
- canonical and `hreflang` metadata are correct;
- `CNAME` is unchanged.

### 23.2 JavaScript Tests and Checks

At minimum:

- syntax check for the homepage script;
- expected project keys are present;
- no wheel-event interception;
- no forbidden external dependency or CDN;
- reduced-motion behavior is represented in code or CSS;
- image-error and cleanup paths are present.

### 23.3 CSS Contract Checks

Verify:

- dedicated homepage scope;
- mobile breakpoint coverage;
- focus-visible styling;
- reduced-motion overrides;
- no purple/violet regression unless explicitly approved later;
- no external font import;
- no hidden no-JavaScript project content.

### 23.4 Manual Visual Review

Before merge, the implementation should be reviewed at representative widths:

- approximately 1440 px desktop;
- approximately 1024 px tablet/compact desktop;
- approximately 768 px tablet;
- approximately 390 px mobile;
- approximately 320 px minimum width.

Manual review should check:

- headline crop and wrapping;
- image readability;
- chapter pacing;
- evidence-note legibility;
- mobile content order;
- keyboard navigation;
- reduced-motion mode;
- failed-image fallback;
- Chinese/English parity;
- no accidental claims introduced by visual juxtaposition.

If browser rendering is unavailable in the implementation environment, that limitation must be stated before merge and the branch should remain unmerged until a human visual check is completed.

## 24. Scope Boundaries

This redesign includes:

- Chinese homepage;
- English homepage;
- page-specific homepage CSS;
- page-specific progressive-enhancement JavaScript;
- homepage evidence composition;
- tests and workflow updates required for the redesign.

This redesign does not include:

- rewriting all project detail pages;
- rebuilding the resume;
- adding a CMS;
- adding a backend;
- adding analytics;
- adding account features;
- creating unverified project screenshots;
- changing the domain;
- adding new project claims;
- deleting the existing project evidence archive.

## 25. Implementation Sequence

The later implementation plan should proceed in this order:

1. Create or update failing homepage contracts for the approved structure.
2. Rebuild the Chinese semantic homepage without relying on JavaScript.
3. Build the English structural counterpart.
4. Refactor the homepage visual system into Evidence Cinema.
5. Add progressive hero, index, and chapter enhancement.
6. Integrate existing evidence assets and fallbacks.
7. Verify responsive and reduced-motion behavior.
8. Run the full repository test suite and workflow checks.
9. Perform browser-based visual review where available.
10. Open a draft pull request and merge only after visual approval.

## 26. Final Design Decision

The approved redesign transforms the current professional technical portfolio into a distinctive digital editorial experience:

- one cinematic opening;
- one evidence-chain narrative;
- six individually composed project chapters;
- one editorial profile section;
- one decisive contact ending.

The design earns its premium quality through restraint, hierarchy, evidence, and rhythm. It does not rely on decorative complexity or unsupported claims.
