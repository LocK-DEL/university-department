# University Department Portfolio Design Foundation

Date: 2026-08-01
Status: Approved for implementation

## 1. Purpose

Create a durable design and agent-operating foundation for `www.universitydepartment.store` so future work by ChatGPT, Codex, Impeccable, and Taste Skill improves the portfolio consistently instead of applying disconnected visual makeovers.

The repository is a bilingual personal portfolio for Liu Wenlong / David Liu. It is not a university website, an education platform, or a generic SaaS product.

## 2. Product truth

The site presents six evidence-based projects across AI applications, automation, research digitization, health technology concepts, intelligent hardware, and agent-assisted engineering workflows.

The public experience consists of:

- Chinese home page and public resume;
- English home page and public resume;
- six Chinese project detail pages;
- six English project detail pages;
- local, privacy-reviewed project evidence;
- direct language counterparts and bilingual SEO metadata.

The canonical host remains `https://www.universitydepartment.store`.

## 3. Primary audiences

### Recruiters and hiring managers

They need to understand the candidate's role, practical capabilities, technical judgment, and evidence quickly.

### Potential clients and collaborators

They need to see what kinds of systems David can scope, prototype, implement, test, and communicate.

### Research and innovation partners

They need accurate boundaries between validated software, local prototypes, design concepts, research participation, and patent-oriented hardware work.

## 4. Visitor outcomes

A successful visitor should be able to:

1. understand David's positioning within the first viewport;
2. identify two or three relevant capabilities without reading every section;
3. open a project and understand problem, role, implementation, evidence, and limitations;
4. switch language without losing page context;
5. open or print the public resume;
6. contact David through GitHub or `liuwenlong0706@outlook.com`.

## 5. Design direction

### Chosen direction: Editorial systems portfolio

The visual world combines the clarity of a technical case study, the authority of a research publication, and the restraint of a premium product portfolio.

It should feel:

- intelligent rather than futuristic;
- self-assured rather than loud;
- technical without resembling a dashboard;
- research-aware without imitating a university brand;
- personal without becoming casual;
- visually distinctive without reducing readability.

### Existing identity to preserve

- deep ink background family;
- restrained cyan/mineral-blue accent;
- strong project evidence and technical status language;
- bilingual Chinese-first structure;
- static, dependency-light architecture;
- clear project-detail hierarchy.

### Existing patterns to reduce

- repeated equal-width card grids;
- tiny uppercase labels above nearly every heading;
- rounded containers around information that does not need containment;
- generic AI symbols, fake diagrams, and decorative code motifs;
- uniform section composition;
- system-dashboard language in the home hero;
- blue glow or grid backgrounds used as the default visual solution;
- all project categories receiving the same visual treatment.

## 6. Information architecture

### Home page mode: Persuade + Experience

The home page must establish positioning, show selected evidence, and direct visitors to project case studies and the resume.

Recommended hierarchy:

1. identity and precise value proposition;
2. selected project evidence or a representative visual artifact;
3. compact capability narrative;
4. six projects with varied composition and truthful statuses;
5. relevant experience and working method;
6. direct contact and resume actions.

### Project pages mode: Read + Experience

Each project page should answer:

1. What problem or opportunity existed?
2. What did David personally own?
3. What was built or designed?
4. What evidence exists?
5. What is verified, conceptual, incomplete, or private?
6. What technical and product judgment does the work demonstrate?

### Resume mode: Read

The resume should prioritize scanability, print quality, truthful claims, and direct project links. Decorative portfolio effects must not interfere with print or reading.

## 7. Visual system principles

### Typography

- Use a self-hosted, license-compatible sans family only after font files are intentionally added to the repository.
- Until then, keep the current local system stack rather than adding external font requests.
- Use display typography sparingly: one dominant statement per viewport.
- Limit paragraph measure to approximately 60–72 characters.
- Use monospace only for evidence labels, code, structured data, or technical metadata.
- Sentence case is the default. Uppercase tracked labels are limited to one per three major sections.

### Color

- Keep one primary accent family.
- Use deep ink and tinted charcoal rather than pure black.
- Use warm white for primary text and blue-gray for secondary text.
- Cyan is an emphasis color, not a fill for every heading or border.
- Status colors communicate meaning and must pass WCAG contrast.
- Purple-to-blue gradients and gradient-clipped text are prohibited by default.

### Layout

- Base desktop layouts on a 12-column mental grid with a maximum content width around 1200–1280px.
- Use variable section structures; do not repeat one card grid throughout a page.
- Prefer editorial grouping, whitespace, alignment, and dividers before adding containers.
- Every multi-column section must define a deliberate mobile collapse.
- The first viewport must remain useful on a 1366×768 laptop.

### Surfaces and radius

- Containers exist only when they communicate grouping or interaction.
- Avoid cards inside cards.
- Use a small radius scale with tighter inner elements and softer major surfaces.
- Borders should be quiet and structural, not decorative stripes.

### Images and evidence

- Real project screenshots, CAD images, diagrams, and verified artifacts outrank synthetic decorations.
- Do not crop evidence in ways that hide important context.
- Every meaningful image needs descriptive alt text or a nearby accessible caption.
- Never fabricate partner logos, university affiliations, metrics, awards, testimonials, or production status.

### Motion

- Default motion intensity is restrained.
- Motion may reveal hierarchy, state change, navigation context, or relationships.
- Avoid perpetual ambient movement on informational content.
- No mandatory wheel hijacking or scroll snapping.
- Every nonessential effect must honor `prefers-reduced-motion`.
- Add GSAP or another animation dependency only when a reviewed interaction cannot be implemented cleanly with CSS or existing JavaScript.

## 8. Content and evidence rules

- Preserve the distinction between local prototype, production deployment, concept work, structural prototype, research participation, and tested system.
- Do not invent performance claims or imply trading profitability.
- Do not present CareRing as validated medical hardware.
- Do not expose private names, identity documents, API keys, local file paths, addresses, or private infrastructure.
- Chinese and English pages must communicate the same level of evidence and limitation, even when wording differs.
- Factual copy, project status, and public contact details require explicit evidence before alteration.

## 9. Technical constraints

- Architecture remains static HTML, CSS, vanilla JavaScript, Python contract tools, pytest, and GitHub Actions unless a separate approved migration spec replaces it.
- Do not add runtime CDN dependencies.
- Do not load Google Fonts or other external fonts.
- Preserve `CNAME` exactly as `www.universitydepartment.store`.
- Preserve all Chinese and English routes, canonical links, hreflang links, project keys, print behavior, and evidence runtimes.
- Check dependency and runtime impact before adding any library.

## 10. Agent and skill responsibilities

### Project skill: `university-department-design`

Owns product-specific truth, visual direction, portfolio modes, and conflict resolution.

### Impeccable

Owns structured design context, UX critique, accessibility, responsive checks, technical audit, hardening, and final polish.

### Taste Skill

Provides anti-template art direction, typography and layout alternatives, and stronger visual differentiation. Its rules are advisory when they conflict with product truth, accessibility, repository constraints, or `DESIGN.md`.

### Codex or implementation agent

Owns repository inspection, incremental implementation, tests, browser verification when available, and reviewable commits.

## 11. Conflict resolution

Apply this order:

1. product truth and privacy;
2. working behavior and route stability;
3. accessibility and readability;
4. `PRODUCT.md`;
5. `DESIGN.md`;
6. `AGENTS.md` implementation rules;
7. Impeccable workflow guidance;
8. Taste Skill creative suggestions;
9. agent defaults.

## 12. Deliverables

This foundation adds:

- root `PRODUCT.md`;
- root `DESIGN.md`;
- root `AGENTS.md`;
- corrected project-specific `SKILL.md`;
- a contract test that protects the foundation from accidental drift;
- an implementation plan for future agents.

## 13. Acceptance criteria

- No project file describes the site as an education platform or university website.
- Product, design, and agent documents agree on audience, routes, public contact, privacy, and technical constraints.
- The project skill explicitly orchestrates Impeccable and Taste Skill rather than duplicating their entire repositories.
- Future agents have a deterministic preflight, implementation, and verification sequence.
- Contract tests can detect missing files and critical product-definition drift.
