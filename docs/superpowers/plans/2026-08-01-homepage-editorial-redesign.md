# Homepage Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the template-like Chinese and English home pages with an evidence-led editorial systems portfolio and one accessible project-stage interaction.

**Architecture:** Keep the site static. Rebuild `index.html` and `en/index.html` with parallel semantic structures, add a page-scoped stylesheet and progressive-enhancement script, and gate the legacy motion runtime away from the new home pages while preserving it everywhere else. Real repository evidence is hydrated from the existing privacy-reviewed base64 assets; projects without publishable imagery use explicitly labeled concept or workflow diagrams rather than fake screenshots.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, Python 3.12 contract tests, GitHub Actions.

## Global Constraints

- Chinese remains the default locale and `/en/` remains the English counterpart.
- Preserve all six project routes, canonical links, hreflang links, `CNAME`, public email, public resume routes, and project truth boundaries.
- Do not add React, Next.js, GSAP, WebGL, external fonts, runtime image CDNs, analytics, trackers, or other third-party runtime dependencies.
- Use `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 5`, and `VISUAL_DENSITY: 5` for the home pages only.
- Keep core navigation, language switching, project links, contact links, and resume links usable without JavaScript.
- Reuse only privacy-reviewed repository evidence.
- Classroom and trading evidence demonstrate local interfaces, not institutional adoption, investment advice, execution results, or profitability.
- CareRing media demonstrates structural form only, not electronics, atomization, safety, health effects, or a validated complete device.
- All nonessential motion must simplify under `prefers-reduced-motion: reduce`.
- No wheel interception, mandatory scroll snap, pointer-following decoration, bounce easing, or perpetual floating animation.

---

### Task 1: Define homepage redesign contracts

**Files:**
- Create: `tests/test_homepage_editorial_contracts.py`

**Interfaces:**
- Consumes: approved routes and truth boundaries from `PRODUCT.md` and the visual requirements in the homepage redesign spec.
- Produces: structural contracts for the two home pages, the page-scoped assets, legacy-motion isolation, evidence sources, accessibility, and dependency boundaries.

- [ ] **Step 1: Add bilingual structure and route contracts**

Create tests that assert both home pages:

```python
HOME_PAGES = (Path("index.html"), Path("en/index.html"))
PROJECT_ROUTES = (
    "knowledge-reconstruction.html",
    "trading-system.html",
    "lab-platform.html",
    "ai-health-concept.html",
    "carering.html",
    "ai-workflow.html",
)

for page in HOME_PAGES:
    source = read(page)
    assert 'class="home-editorial"' in source
    assert 'homepage-editorial.css?v=20260801-home1' in source
    assert 'homepage-editorial.js?v=20260801-home1' in source
    assert 'id="work"' in source
    assert source.count('data-home-project-trigger') == 6
```

Assert every project route, resume route, GitHub route, public email, direct language counterpart, one H1, skip link, and integrated language control are present.

- [ ] **Step 2: Add anti-regression and truth contracts**

Assert the home pages no longer contain:

```python
for forbidden in (
    "capability-panel",
    "hero-panel",
    "button-disabled",
    "简历整理中",
    "Resume coming soon",
):
    assert forbidden not in combined
```

Assert the Chinese and English status strings preserve the verified-local, tested-workflow, concept, structural-prototype, and evidence-preparation boundaries.

- [ ] **Step 3: Add interaction and evidence contracts**

Assert:

```python
runtime = read("homepage-editorial.js")
assert "prefers-reduced-motion: reduce" in runtime
assert "ArrowDown" in runtime and "ArrowUp" in runtime
assert "IntersectionObserver" in runtime
assert "addEventListener(\"wheel\"" not in runtime
assert "classroom-demo-home-hd.b64.txt" in runtime
assert "trading-dashboard-final.part-01.b64.txt" in runtime
assert "carering-prototype-collage.b64.txt" in runtime
```

Assert `script.js` contains an editorial-home guard and still references `motion.js` for non-home pages.

- [ ] **Step 4: Verify the new test is red before implementation**

Run:

```bash
python -m pytest -q tests/test_homepage_editorial_contracts.py
```

Expected: failures because the page-scoped assets and new structure do not exist.

- [ ] **Step 5: Commit the contract**

```bash
git add tests/test_homepage_editorial_contracts.py
git commit -m "test: define editorial homepage contracts"
```

### Task 2: Rebuild the Chinese and English semantic home pages

**Files:**
- Modify: `index.html`
- Modify: `en/index.html`

**Interfaces:**
- Consumes: the approved information architecture, current factual project descriptions, status vocabulary, and existing route pairs.
- Produces: matching `header`, `hero`, `positioning strip`, `work`, `method`, `profile`, `contact`, and `footer` structures consumed by `homepage-editorial.css` and `homepage-editorial.js`.

- [ ] **Step 1: Replace the floating language control with an integrated utility control**

Use a control that satisfies both the explicit bilingual contract and runtime duplicate prevention:

```html
<nav class="language-switcher language-switch" aria-label="语言选择">
    <a href="index.html" lang="zh-CN" aria-current="page">中文</a>
    <span aria-hidden="true">/</span>
    <a href="en/" lang="en">EN</a>
</nav>
```

Use the correct inverse paths in `en/index.html`.

- [ ] **Step 2: Build the hero with truthful evidence and stable actions**

The Chinese H1 is:

```html
<h1><span class="hero-line">我把 AI、科研与产品构想</span><span class="hero-line hero-line--accent">做成可以验证的系统。</span></h1>
```

The English H1 uses independent line breaks and the same semantic hierarchy. Include project, resume, and GitHub actions. Include a reserved hero evidence figure with a classroom evidence image target, truthful caption, and failure fallback.

- [ ] **Step 3: Build the positioning strip and six-project editorial index**

Create six `article` rows, each with:

```html
<button type="button" data-home-project-trigger="0" aria-selected="true" aria-controls="home-project-stage-panel-0">
```

Each row includes number, category, title, truthful status, direct detail link, and mobile-owned evidence. Add a shared desktop stage containing six `data-home-stage-panel` panels in the same order.

- [ ] **Step 4: Build method, profile, contact, and footer sections**

Replace repeated card grids with:

- a four-step method sequence;
- one profile narrative plus structured capability and leadership evidence;
- direct resume, GitHub, and email actions;
- no disabled resume state.

- [ ] **Step 5: Verify source parity and link integrity contracts**

Run:

```bash
python -m pytest -q tests/test_bilingual_portfolio_contracts.py tests/test_bilingual_site_contracts.py tests/test_homepage_editorial_contracts.py
```

Expected: HTML structure tests progress toward green; CSS and JavaScript asset tests remain red until Tasks 3 and 4.

- [ ] **Step 6: Commit the semantic redesign**

```bash
git add index.html en/index.html
git commit -m "feat: rebuild bilingual editorial home pages"
```

### Task 3: Add the page-scoped editorial visual system

**Files:**
- Create: `homepage-editorial.css`

**Interfaces:**
- Consumes: `body.home-editorial` and the semantic class names introduced in Task 2.
- Produces: scoped tokens, responsive layouts, project-stage states, evidence fallbacks, visible focus, and reduced-motion behavior without affecting project or resume pages.

- [ ] **Step 1: Add scoped tokens and base composition**

Define:

```css
.home-editorial {
    --home-ink: #07100f;
    --home-ink-raised: #0d1917;
    --home-paper: #edf1ec;
    --home-paper-muted: #aebbb4;
    --home-signal: #9fe870;
    --home-mineral: #69bfd6;
    --home-rule: rgba(237, 241, 236, 0.14);
    --home-project-transition: 360ms;
}
```

Scope all overrides under `.home-editorial`.

- [ ] **Step 2: Implement desktop and laptop editorial layouts**

Implement:

- compact integrated header;
- 7/5 hero split with stable image aspect ratio;
- positioning strip;
- 5/7 selected-work rail and evidence stage;
- asymmetric method and profile sections;
- restrained contact surface.

Do not use equal-card grids as the dominant layout.

- [ ] **Step 3: Implement mobile-owned project evidence**

Below `768px`:

- hide the shared stage;
- reveal each project row's evidence in document order;
- stack actions and metadata without horizontal overflow;
- preserve 44px controls;
- keep language and resume access visible.

- [ ] **Step 4: Add enhancement, failure, focus, and reduced-motion states**

Add styles for:

```css
.homepage-enhanced .home-project-trigger[aria-selected="true"]
.home-evidence-media.is-ready
.home-evidence-figure.is-unavailable
@media (prefers-reduced-motion: reduce)
```

Content must be visible before `.homepage-enhanced` exists.

- [ ] **Step 5: Commit the visual system**

```bash
git add homepage-editorial.css
git commit -m "style: add editorial homepage visual system"
```

### Task 4: Add bounded progressive enhancement and isolate legacy motion

**Files:**
- Create: `homepage-editorial.js`
- Modify: `script.js`

**Interfaces:**
- Consumes: `data-home-project-trigger`, `data-home-stage-panel`, `data-home-image`, and the existing base64 evidence assets.
- Produces: accessible active-project state, keyboard selection, bounded scroll observation, lazy evidence hydration, image-failure states, section navigation state, and coordinated entry motion.

- [ ] **Step 1: Implement project selection**

Implement `activateProject(index, options)` so it:

- sets `aria-selected` and roving `tabindex` on six triggers;
- hides and exposes the matching stage panel;
- updates no factual copy dynamically;
- never moves focus automatically;
- hydrates the active evidence image;
- supports click, focus, hover on fine pointers, `ArrowUp`, `ArrowDown`, `Home`, and `End`.

- [ ] **Step 2: Add bounded scroll observation and current-section navigation**

Use `IntersectionObserver` for project-row activation and current-section link state. Do not register wheel listeners and do not use mandatory sticky or scroll-snap behavior.

- [ ] **Step 3: Reconstruct privacy-reviewed evidence**

Single-file sources:

```javascript
"classroom-demo-home-hd.b64.txt"
"carering-prototype-collage.b64.txt"
```

Chunked source:

```javascript
[
  "trading-dashboard-final.part-01.b64.txt",
  "trading-dashboard-final.part-02.b64.txt",
  "trading-dashboard-final.part-03.b64.txt",
  "trading-dashboard-final.part-04.b64.txt",
  "trading-dashboard-final.part-05.b64.txt",
]
```

Validate reconstructed WebP signatures, revoke object URLs on `pagehide`, and retain captions and links on failure.

- [ ] **Step 4: Gate the legacy motion layer on editorial home pages**

In `script.js`, keep shared identity, bilingual, menu, resume, and evidence runtimes, but wrap the legacy motion style/runtime installation:

```javascript
const isEditorialHome = document.body?.classList.contains("home-editorial");
if (!isEditorialHome) {
    addStyle('[data-motion-asset="style"]', styleUrl, "motionAsset", "style");
    addScript('[data-motion-asset="runtime"]', runtimeUrl, "motionAsset", "runtime");
}
```

Project and resume pages retain their current behavior.

- [ ] **Step 5: Run JavaScript syntax and focused contracts**

Run:

```bash
node --check homepage-editorial.js
node --check script.js
python -m pytest -q tests/test_homepage_editorial_contracts.py
```

Expected: all pass.

- [ ] **Step 6: Commit the enhancement**

```bash
git add homepage-editorial.js script.js
git commit -m "feat: add accessible editorial project stage"
```

### Task 5: Full verification and pull request

**Files:**
- Review only; no production file is expected unless verification exposes a defect.

**Interfaces:**
- Consumes: the complete redesigned branch.
- Produces: a green, reviewable pull request with explicit visual-verification limitations.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
python -m pytest -q tests
python -m compileall -q tests
node --check script.js
node --check identity-overrides.js
node --check bilingual-runtime.js
node --check motion.js
node --check homepage-editorial.js
node --check resume-entry.js
node --check resume-print.js
node --check project-evidence.js
node --check trading-evidence-final.js
```

Expected: every command exits zero.

- [ ] **Step 2: Scan forbidden runtime dependencies and invariants**

Confirm no Google Fonts, CDN, analytics, wheel listener, mandatory scroll snap, or changed CNAME exists. Confirm both home pages contain all six routes and correct counterpart links.

- [ ] **Step 3: Review the branch diff**

Expected production scope:

```text
index.html
en/index.html
homepage-editorial.css
homepage-editorial.js
script.js
tests/test_homepage_editorial_contracts.py
```

Plus the approved spec and this plan.

- [ ] **Step 4: Create a draft pull request**

Use title:

```text
Redesign bilingual home pages as an editorial systems portfolio
```

The PR body must disclose that automated verification is complete but pixel-level browser screenshots could not be produced when browser tooling is unavailable.
