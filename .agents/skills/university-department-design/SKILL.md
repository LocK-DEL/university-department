---
name: university-department-design
description: Project-specific design director for the bilingual David Liu personal portfolio at universitydepartment.store. Use for any frontend design, redesign, critique, audit, implementation, or polish task in this repository. Reads PRODUCT.md, DESIGN.md, and AGENTS.md; coordinates Impeccable and Taste Skill when available; protects project truth, bilingual routes, evidence, privacy, accessibility, and static-site constraints.
---

# University Department Portfolio Design Director

## Mission

Improve `www.universitydepartment.store` as a premium bilingual personal portfolio for Liu Wenlong / David Liu.

The site must help recruiters, collaborators, clients, and research partners understand:

- what David can build;
- what he personally owned;
- what evidence exists;
- what is verified, conceptual, private, incomplete, or unvalidated;
- how to view the resume or contact him.

This is not a university website, an education platform, a trading service, a medical service, or a generic SaaS landing page.

## Required context

Before acting, read in order:

1. `PRODUCT.md`
2. `DESIGN.md`
3. `AGENTS.md`
4. the target HTML page
5. representative shared CSS and JavaScript
6. relevant tests

If one of the first three files is missing, report it and use the remaining files plus current source as temporary context. Do not invent product positioning.

## Design direction

The approved visual world is:

```text
Editorial systems portfolio
```

It combines:

- technical case-study clarity;
- research-publication authority;
- premium product restraint;
- evidence-led storytelling;
- bilingual readability.

It rejects:

- generic AI landing-page patterns;
- fake dashboards used as portfolio decoration;
- purple-blue gradients;
- repeated equal-card grids;
- nested cards;
- tiny uppercase labels above every section;
- unsupported statistics, logos, testimonials, and claims;
- decorative motion that competes with evidence.

## Page modes

Choose the mode from the target surface.

### Home: Persuade + Experience

The visitor understands David's positioning, encounters representative work, and chooses a project, resume, GitHub, or email action.

### Project detail: Read + Experience

The visitor understands the problem, David's role, the work, technical judgment, evidence, and limitations. Real artifacts lead the page.

### Resume: Read

The visitor scans qualifications and projects. Print quality and factual accuracy outrank visual expression.

### Navigation, menu, language switcher: Operate

Predictability, accessibility, page context, and compact behavior outrank artistic novelty.

## Default design dials

```text
DESIGN_VARIANCE: 7
MOTION_INTENSITY: 4
VISUAL_DENSITY: 5
```

Use these unless the request or surface justifies an override.

Interpretation:

- `DESIGN_VARIANCE 7`: varied editorial composition without chaotic layout;
- `MOTION_INTENSITY 4`: purposeful transitions and reveals, no cinematic overload;
- `VISUAL_DENSITY 5`: enough proof and technical detail without dashboard density.

State any override before implementation.

## One-line design read

Before visual implementation, output exactly one concise design read:

```text
Reading this as: <surface and mode> for <audience>, using the Editorial systems portfolio direction with DESIGN_VARIANCE <n>, MOTION_INTENSITY <n>, and VISUAL_DENSITY <n>.
```

Do not ask a design-style question when `PRODUCT.md`, `DESIGN.md`, the source, or the user request already resolves it.

## Skill orchestration

This skill is the project-specific authority. It does not copy or replace the full Impeccable or Taste Skill repositories.

### Impeccable role

When Impeccable is installed, use it for:

- design-context workflows;
- UX critique;
- accessibility;
- responsive behavior;
- layout, typography, color, and motion refinement;
- hardening;
- performance;
- deterministic anti-pattern checks;
- final polish.

Recommended sequence for a substantial redesign:

```text
$impeccable document
$impeccable critique <target>
$impeccable shape <target>
$impeccable typeset <target>
$impeccable layout <target>
$impeccable adapt <target>
$impeccable harden <target>
$impeccable audit <target>
$impeccable polish <target>
```

Use only the commands needed by the scope. Do not run every command mechanically.

Do not use `overdrive` unless the user explicitly requests experimental work and the target is appropriate.

### Taste Skill role

When `design-taste-frontend` or an equivalent Taste Skill is installed, use it for:

- anti-template art direction;
- layout alternatives;
- stronger typography choices;
- visual differentiation among projects;
- identifying generic AI design patterns;
- proposing a replacement visual world for redesigns.

Taste Skill is advisory. Reject or adapt any suggestion that conflicts with product truth, accessibility, `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, current architecture, or evidence integrity.

Do not default to the aggressive `gpt-taste` variant.

### Without third-party skills

Follow the equivalent rules in `DESIGN.md` directly. Never claim Impeccable, Taste Skill, browser QA, image generation, or another tool ran when it did not.

## Conflict resolution

Apply this order:

1. product truth and privacy;
2. working behavior and route stability;
3. accessibility and readability;
4. `PRODUCT.md`;
5. `DESIGN.md`;
6. `AGENTS.md`;
7. this skill;
8. Impeccable workflow guidance;
9. Taste Skill creative suggestions;
10. agent defaults.

Product truth wins.

When two choices remain valid, prefer the one that preserves more working behavior and makes the evidence easier to understand.

## Workflow

### Phase 1: Inspect

Inspect:

- target route and language counterpart;
- shared and page-specific CSS;
- relevant JavaScript runtimes;
- current visual patterns;
- real available evidence;
- tests and protected behavior;
- generators under `tools/` when repeated markup is involved.

Determine whether the task is:

- refinement: preserve the current visual identity;
- redesign: replace the visual world while preserving product truth and function.

Missing `DESIGN.md` alone does not make a task a redesign.

### Phase 2: Diagnose

For critique or redesign work, identify findings in this order:

1. product clarity;
2. information hierarchy;
3. evidence quality;
4. typography;
5. layout and rhythm;
6. color and contrast;
7. responsive behavior;
8. interaction and motion;
9. accessibility;
10. technical and performance risks.

Tie every finding to a specific page element, selector, component, or user outcome.

Do not write vague advice such as “make it more premium.”

### Phase 3: Shape

Before editing a substantial surface, define:

- page purpose;
- primary audience;
- primary action;
- page mode;
- design dials;
- retained content and function;
- replaced visual patterns;
- evidence strategy;
- desktop composition;
- mobile collapse;
- motion purpose;
- verification plan.

For multi-step work, write a spec and implementation plan under `docs/superpowers/`.

### Phase 4: Implement

Work incrementally.

Rules:

- preserve routes, data, copy truth, SEO, and integrations;
- use semantic HTML;
- prefer CSS Grid for multi-column layouts;
- reuse or map existing CSS variables before creating parallel token systems;
- check current dependencies before adding imports;
- avoid new runtime dependencies;
- keep generator output idempotent;
- define mobile behavior with the desktop rule;
- support `prefers-reduced-motion`;
- keep changes focused and reviewable.

Do not rewrite the framework or architecture only for aesthetics.

### Phase 5: Visual QA

When browser tooling is available:

1. capture or inspect desktop and mobile in one bounded pass;
2. check hierarchy, type, spacing, overflow, controls, evidence, and language counterparts;
3. batch all fixes;
4. confirm once more;
5. stop polishing.

Minimum target viewports:

- 1366×768 small laptop;
- wide desktop;
- approximately 390px mobile.

Also check keyboard focus and reduced motion.

If browser tooling is unavailable, state that visual QA was not performed.

### Phase 6: Technical verification

Run focused tests first, then the repository baseline:

```bash
python -m pytest -q tests
python -m compileall -q tests
node --check script.js
node --check identity-overrides.js
node --check bilingual-runtime.js
node --check motion.js
node --check resume-entry.js
node --check resume-print.js
node --check project-evidence.js
node --check trading-evidence-final.js
test "$(tr -d '\r\n' < CNAME)" = "www.universitydepartment.store"
```

If a command cannot run, report the exact reason. Do not replace verification with confidence language.

### Phase 7: Completion report

Report:

- changed files;
- design read and dials;
- major design decisions;
- factual-copy changes;
- dependency changes;
- route, SEO, and bilingual changes;
- tests and visual checks;
- remaining limitations.

## Portfolio-specific composition rules

### Home hero

The hero must show identity, value, evidence, and action.

Use:

- concise positioning;
- one primary and at most one secondary action;
- one real project artifact, evidence frame, or meaningful portfolio preview;
- readable content on a small laptop.

Do not use:

- a fake capability dashboard;
- a generic `<AI />` centerpiece;
- unsupported statistics;
- a long capability list;
- an empty dark hero with glow decoration;
- a trust-logo wall without real relationships.

### Capability section

Connect capabilities to project evidence.

Do not default to three equal cards. Alternatives include:

- an editorial capability map;
- a concise working-method sequence;
- capabilities paired with representative projects;
- a two-column narrative and proof layout.

### Project index

All six projects remain discoverable.

Differentiate them by real evidence type:

- classroom software interface;
- trading report or terminal output;
- research-platform interface;
- health-product flow artifact;
- CareRing CAD or prototype;
- AI-assisted engineering workflow.

Each preview contains:

- category;
- title;
- concise purpose or result;
- truthful status;
- evidence or honest placeholder;
- direct detail link.

Do not make six copies of the same card.

### Project detail pages

Prioritize:

1. title, summary, role, and status;
2. strongest evidence;
3. problem and context;
4. ownership;
5. system, workflow, or design;
6. technical details;
7. verification;
8. limitations and safety boundaries;
9. project navigation.

Do not use a three-card grid for every section.

### Resume

Preserve print behavior, semantic order, working links, and factual accuracy.

No decorative animation is needed.

### Language switcher

It must link to the direct counterpart and work without JavaScript.

When redesigning, integrate it into navigation or a clearly intentional utility position. Do not allow it to cover page content on mobile.

## Evidence and copy rules

Real evidence outranks decorative visuals.

Do not fabricate:

- metrics;
- customers;
- testimonials;
- partner logos;
- university affiliation;
- medical validation;
- trading performance;
- production adoption;
- certifications;
- awards not already supported.

Preserve the allowed status vocabulary in `PRODUCT.md`.

Trading copy must not become advice or imply autonomous execution.

CareRing copy must not imply validated sensing, atomization, electronics, health effects, or complete-device performance.

## Typography rules

- No external runtime font requests.
- Keep the local stack until approved self-hosted fonts are added.
- One dominant display statement per viewport.
- Body measure remains readable.
- Monospace is reserved for technical metadata.
- Sentence case is the default.
- Maximum one uppercase eyebrow per three major sections.
- No random serif word inside a sans headline.
- No gradient text.

## Color and surface rules

- Use one mineral-blue accent family.
- Use tinted ink, charcoal, warm white, and blue-gray.
- Avoid pure black.
- Verify WCAG contrast.
- Avoid cyan borders on every surface.
- Avoid excessive glassmorphism.
- Avoid nested cards.
- Use containers only when grouping or interaction needs them.

## Motion rules

Motion must communicate hierarchy, state, navigation, or relationship.

Do not default to:

- infinite loops;
- magnetic controls;
- cursor-following effects;
- bounce easing;
- wheel hijacking;
- mandatory scroll snapping;
- animation on every section.

Do not add GSAP unless a reviewed interaction clearly needs it.

## Preflight checklist

Before editing:

- [ ] Product identity is correct.
- [ ] Target route and counterpart are identified.
- [ ] Page mode is identified.
- [ ] Design dials are stated.
- [ ] Existing source and tests are inspected.
- [ ] Refinement versus redesign is explicit.
- [ ] Factual-copy impact is known.
- [ ] Evidence and privacy impact is known.
- [ ] Desktop and mobile behavior are planned.
- [ ] Dependency impact is known.

## Finish checklist

Before completion:

- [ ] Purpose and primary action are clear.
- [ ] Product truth wins over visual novelty.
- [ ] Evidence is easier to understand.
- [ ] Chinese and English behavior remain correct.
- [ ] Desktop and mobile were checked when tooling was available.
- [ ] Focus and reduced motion were considered.
- [ ] No generic AI-pattern regression was introduced.
- [ ] No unsupported claims were added.
- [ ] Tests and syntax checks passed or exact failures were reported.
- [ ] Final report lists all material changes and limitations.
