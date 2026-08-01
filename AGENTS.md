# AGENTS.md

## Scope

These instructions apply to the entire repository.

The repository publishes Liu Wenlong / David Liu's bilingual personal portfolio at `https://www.universitydepartment.store`.

Before editing any frontend, copy, route, evidence runtime, test, or deployment file, read:

1. `PRODUCT.md`
2. `DESIGN.md`
3. `.agents/skills/university-department-design/SKILL.md`
4. the target page and its shared CSS/JavaScript
5. the tests that protect the target behavior

## Product truth

This is a bilingual personal portfolio. It is not:

- a university website;
- an education platform;
- a trading service;
- a medical service;
- a generic SaaS product.

Do not introduce claims that are not supported by repository evidence.

The public contact email is:

```text
liuwenlong0706@outlook.com
```

The canonical host and CNAME are:

```text
www.universitydepartment.store
```

## Architecture

The current architecture is intentionally static and dependency-light:

- HTML5
- CSS
- vanilla JavaScript
- Python generation and contract scripts
- pytest
- GitHub Actions
- GitHub Pages/custom domain

Do not migrate to React, Next.js, another framework, a CMS, or a build pipeline merely to improve visual quality. A migration requires a separate approved design and implementation spec.

Do not add runtime CDNs, external fonts, analytics, or third-party tracking without explicit approval.

## Agent workflow

### 1. Classify the request

Identify:

- target surface;
- page mode;
- refinement versus redesign;
- factual-copy impact;
- route and runtime impact;
- whether a visual target exists.

Page modes:

- home: `Persuade + Experience`
- project detail: `Read + Experience`
- resume: `Read`
- navigation, menu, language switcher: `Operate`

### 2. Inspect before proposing

Read the target HTML and at least one representative source of incumbent visual truth:

- `style.css`
- `project.css`
- `resume.css`
- relevant page-specific CSS
- relevant JavaScript runtime
- related tests

Do not infer the architecture from a screenshot alone when source is available.

### 3. State the design read

Before a visual implementation, write one sentence in this form:

```text
Reading this as: <surface and mode> for <audience>, using the Editorial systems portfolio direction with DESIGN_VARIANCE <n>, MOTION_INTENSITY <n>, and VISUAL_DENSITY <n>.
```

Default dials:

```text
DESIGN_VARIANCE: 7
MOTION_INTENSITY: 4
VISUAL_DENSITY: 5
```

### 4. Plan a coherent scope

Prefer one coherent page or component family per change.

Do not redesign unrelated routes while touching one component.

For multi-step work, write or update a spec under:

```text
docs/superpowers/specs/
```

Then write an implementation plan under:

```text
docs/superpowers/plans/
```

### 5. Implement incrementally

Preserve working behavior by default.

Check existing dependencies before importing anything.

When changing generated or bilingual pages, identify the source generator or shared runtime and keep output idempotent.

Prefer semantic HTML, CSS Grid, existing CSS variables, and small vanilla JavaScript enhancements.

### 6. Verify in bounded passes

When browser tooling is available:

1. inspect desktop and mobile together;
2. collect findings in one pass;
3. fix them in one batch;
4. confirm once more;
5. stop polishing.

Do not run open-ended screenshot loops.

### 7. Report exactly what changed

The final report must include:

- changed files;
- design decisions;
- factual-copy changes, if any;
- dependency changes, if any;
- route or SEO changes, if any;
- verification performed;
- limitations or checks that could not be performed.

## Skill orchestration

### Project-specific skill

`$university-department-design` is the project design director and final router.

It owns:

- project identity;
- portfolio page modes;
- design direction;
- content-truth boundaries;
- skill conflict resolution;
- repository-specific completion checks.

### Impeccable

Use Impeccable, when installed, for:

- product/design context workflows;
- UX critique;
- layout, typography, color, and motion refinement;
- accessibility;
- responsive behavior;
- performance;
- hardening;
- final polish;
- deterministic anti-pattern checks.

Recommended commands by stage:

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

Do not use `overdrive` by default.

### Taste Skill

Use `design-taste-frontend` or equivalent Taste Skill, when installed, for:

- anti-template visual exploration;
- layout alternatives;
- typography character;
- project-specific visual differentiation;
- identifying generic AI design patterns.

Taste Skill is advisory. It may not override product truth, privacy, accessibility, `PRODUCT.md`, `DESIGN.md`, or repository constraints.

Avoid the aggressive `gpt-taste` variant unless the user explicitly requests experimental motion-heavy art direction and the target is appropriate.

### No installed third-party skill

If Impeccable or Taste Skill is not installed, follow the corresponding principles documented in `DESIGN.md`. Do not claim the skill ran.

## Conflict resolution

Apply this order:

1. product truth and privacy;
2. working behavior and route stability;
3. accessibility and readability;
4. `PRODUCT.md`;
5. `DESIGN.md`;
6. this file;
7. project-specific Skill instructions;
8. Impeccable workflow guidance;
9. Taste Skill creative suggestions;
10. agent defaults.

When two instructions conflict at the same level, choose the option that changes less working behavior and state the trade-off.

## Protected invariants

Do not break or silently alter:

- `CNAME` exactly equal to `www.universitydepartment.store`;
- Chinese default locale;
- all Chinese routes;
- all English routes;
- canonical links;
- `hreflang` links;
- page-context language counterparts;
- stable project keys;
- resume print behavior;
- public email `liuwenlong0706@outlook.com`;
- project evidence privacy controls;
- trading disclaimers and absence of performance claims;
- CareRing validation boundaries;
- no-runtime-CDN rule;
- keyboard navigation and skip-link behavior.

## Copy rules

Do not invent:

- metrics;
- testimonials;
- customer names;
- institutional adoption;
- university affiliation;
- awards;
- team size;
- revenue;
- production usage;
- medical outcomes;
- trading performance;
- product certifications.

Preserve distinctions among:

- publicly deployed;
- verified local software;
- tested CLI or workflow;
- concept;
- structural prototype;
- research participation;
- private evidence.

Ask for evidence only when a requested factual change cannot be supported from the repository. Do not block purely visual work for facts that are not being changed.

## Design implementation rules

- Follow `DESIGN.md`.
- Keep one accent family.
- Avoid purple-blue AI gradients and gradient text.
- Avoid repeated equal-card grids.
- Avoid nested cards.
- Avoid an eyebrow above every section.
- Prefer real project evidence over decorative fake interfaces.
- Do not use a fake dashboard as the universal portfolio metaphor.
- Motion must communicate hierarchy, state, navigation, or relationship.
- Honor `prefers-reduced-motion`.
- Define mobile behavior explicitly for every multi-column layout.
- Do not add a dependency for an effect that CSS or existing JavaScript can implement cleanly.
- Check focus, hover, active, empty, loading, and error states when the surface has them.

## Source and generated files

Before editing repeated bilingual markup, check whether it is generated by a tool under `tools/`.

Generator changes must be idempotent:

```bash
python <generator>
git diff --exit-code
```

Run the generator twice when changing generation logic and confirm the second run produces no diff.

Do not hand-edit generated output in a way that will be overwritten by the next build.

## Testing and verification

Run the focused tests for the changed surface first, then the full suite.

Baseline commands:

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
```

Also verify:

```bash
test "$(tr -d '\r\n' < CNAME)" = "www.universitydepartment.store"
```

For visual changes, check at minimum:

- 1366×768 desktop or equivalent small laptop;
- a wide desktop viewport;
- approximately 390px mobile;
- keyboard focus order;
- reduced-motion behavior;
- Chinese and English counterpart pages;
- no horizontal overflow;
- no content hidden behind fixed controls.

If browser tooling is unavailable, say so explicitly. Do not claim visual verification that did not occur.

## Git and review discipline

- Do not implement redesign work directly on `main` unless the user explicitly requests it.
- Use a focused branch.
- Keep commits reviewable and named by outcome.
- Do not mix unrelated cleanup into a design change.
- Do not delete evidence, tests, or safety copy to make a page visually simpler.
- Before completion, review the diff and confirm production behavior outside the requested scope is unchanged.
