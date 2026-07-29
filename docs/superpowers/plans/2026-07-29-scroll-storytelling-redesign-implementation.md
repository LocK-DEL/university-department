# Scroll Storytelling Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing six-project GitHub Pages portfolio into a high-end black/white/cold-blue scroll-storytelling site without changing verified project facts or touching `main` until final review.

**Architecture:** Keep the site as static HTML/CSS/JavaScript. Add `motion.css` for all animated states and responsive fallbacks, and `motion.js` for one requestAnimationFrame-driven scroll loop plus IntersectionObserver state changes. Preserve semantic HTML and full static readability when JavaScript is unavailable.

**Tech Stack:** HTML5, CSS custom properties, CSS transforms, IntersectionObserver, requestAnimationFrame, Python 3 + pytest contract tests, GitHub Pages.

## Global Constraints

- Work only from branch `codex/scroll-storytelling-redesign`, based on commit `7784ac2a28aa641407ab9e757b88eaf4cf6d7201` or its descendants.
- Use an isolated worktree if available; do not modify the checkout currently serving `main`.
- Do not modify `CNAME`.
- Do not merge or push to `main` during implementation.
- Do not add GSAP, Lenis, Three.js, Swiper, React, npm dependencies, external fonts, CDN scripts, images, video backgrounds, particle libraries, or custom cursor libraries.
- Do not intercept wheel events, prevent native scrolling, or enable mandatory full-page scroll snapping.
- Do not alter verified project functionality, test counts, ownership, source availability, demo availability, hardware completion, or deployment claims.
- Preserve all six project detail URLs and the three legacy migration pages.
- Preserve keyboard navigation, the skip link, mobile-menu Escape behavior, focus visibility, and `prefers-reduced-motion` support.
- Use only `transform` and `opacity` for high-frequency motion wherever possible.
- Every production behavior change must follow RED → GREEN → REFACTOR.
- Each task ends with a focused commit and a clean worktree.

---

## File Map

**Create**

- `motion.css` — all scroll-storytelling states, transitions, sticky layouts, reduced-motion rules, and mobile fallbacks.
- `motion.js` — capability detection, IntersectionObserver setup, one RAF scroll scheduler, scene progress variables, project-stage activation, and pointer parallax.
- `tests/test_scroll_storytelling_contracts.py` — homepage structure, resource, accessibility, and motion architecture contracts.
- `tests/test_project_motion_contracts.py` — shared project-page motion hooks and truthfulness-preservation contracts.

**Modify**

- `index.html` — semantic hooks, progress bar, Hero line wrappers, About metric, skills track, project-stage structure, timeline hooks, contact finale, and motion asset references.
- `style.css` — static black/white/cold-blue visual system and non-motion layout.
- `script.js` — preserve base UI logic; only add safe coordination hooks if strictly required.
- `project.css` — static black/white/cold-blue detail-page visual system.
- `projects/knowledge-reconstruction.html`
- `projects/trading-system.html`
- `projects/lab-platform.html`
- `projects/ai-health-concept.html`
- `projects/carering.html`
- `projects/ai-workflow.html` — shared motion stylesheet/script references and reveal hooks only; verified content stays unchanged.
- `about.html`, `product.html`, `contact.html`, `404.html` — modify only if a local review proves their existing markup cannot display correctly under the new base palette.

**Never modify**

- `CNAME`
- the classroom-system repository
- project source repositories
- `backup/storefront-before-portfolio-20260729`
- `main` during implementation

---

### Task 1: Isolated workspace and baseline contracts

**Files:**
- Create: `tests/test_scroll_storytelling_contracts.py`
- Create: `tests/test_project_motion_contracts.py`

**Interfaces:**
- Produces: reusable Python helpers `read(path) -> str`, `html_paths() -> list[Path]`, and contract tests used by all later tasks.
- Consumes: current repository files from `codex/scroll-storytelling-redesign`.

- [ ] **Step 1: Create or enter an isolated worktree**

Follow `superpowers:using-git-worktrees`. Confirm the active branch is `codex/scroll-storytelling-redesign`, `git status --short` is empty, and `git rev-parse HEAD` includes the design commit.

- [ ] **Step 2: Record the clean baseline**

Run:

```bash
git fetch origin
git status --short
git branch --show-current
git log -3 --oneline --decorate
git diff origin/main...HEAD --stat
python -m http.server 8080
```

In a browser verify the existing homepage, six detail pages, migration pages, and 404 page load before changes. Stop the 8080 server after the check.

- [ ] **Step 3: Write the first failing architecture contracts**

Create `tests/test_scroll_storytelling_contracts.py` with tests that assert:

```python
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_homepage_loads_dedicated_motion_assets():
    html = read("index.html")
    assert 'href="motion.css"' in html
    assert 'src="motion.js"' in html


def test_motion_runtime_files_exist():
    assert (ROOT / "motion.css").is_file()
    assert (ROOT / "motion.js").is_file()


def test_homepage_has_scroll_progress_and_scene_hooks():
    html = read("index.html")
    assert 'class="scroll-progress"' in html
    for scene in ("hero", "about", "skills", "projects", "experience", "contact"):
        assert f'data-scene="{scene}"' in html


def test_no_external_runtime_assets_are_added():
    files = [ROOT / "index.html", ROOT / "style.css", ROOT / "script.js"]
    text = "\n".join(path.read_text(encoding="utf-8") for path in files)
    for forbidden in ("fonts.googleapis.com", "fonts.gstatic.com", "cdnjs", "unpkg", "jsdelivr"):
        assert forbidden not in text
```

Create `tests/test_project_motion_contracts.py` with:

```python
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = sorted((ROOT / "projects").glob("*.html"))


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def test_all_six_project_pages_load_shared_motion_assets():
    assert len(PROJECTS) == 6
    for path in PROJECTS:
        html = read(path)
        assert 'href="../motion.css"' in html, path
        assert 'src="../motion.js"' in html, path


def test_all_project_pages_keep_truth_and_status_sections():
    for path in PROJECTS:
        html = read(path)
        assert "验证状态" in html, path
        assert "返回全部项目" in html, path
        assert "上一个项目" in html, path
        assert "下一个项目" in html, path
```

- [ ] **Step 4: Verify RED**

Run:

```bash
python -m pytest -q tests/test_scroll_storytelling_contracts.py tests/test_project_motion_contracts.py
```

Expected: failures because `motion.css`, `motion.js`, scene hooks, and project references do not yet exist. Do not weaken tests to obtain green.

- [ ] **Step 5: Commit tests only**

```bash
git add tests/test_scroll_storytelling_contracts.py tests/test_project_motion_contracts.py
git commit -m "test: define scroll storytelling contracts"
```

---

### Task 2: Static black/white/cold-blue visual foundation

**Files:**
- Modify: `style.css`
- Modify: `project.css`

**Interfaces:**
- Produces: global CSS variables `--bg-primary`, `--bg-secondary`, `--surface`, `--surface-raised`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent`, `--accent-bright`, `--accent-soft`, `--accent-glow`, `--light-section`, `--light-text`.
- Consumes: existing markup without motion hooks.

- [ ] **Step 1: Add failing palette tests**

Add tests asserting `style.css` contains the exact approved tokens and no old primary values `#07111f`, `#0d1b2a`, `#56c2ff` remain as global theme colors. Add a test asserting `project.css` uses shared variables instead of hardcoded blue backgrounds.

- [ ] **Step 2: Verify RED**

```bash
python -m pytest -q tests/test_scroll_storytelling_contracts.py tests/test_project_motion_contracts.py
```

Expected: palette tests fail against the old theme.

- [ ] **Step 3: Implement the static palette**

At the top of `style.css`, define:

```css
:root {
    --bg-primary: #050505;
    --bg-secondary: #0b0c0e;
    --surface: #111216;
    --surface-raised: #17181c;
    --text-primary: #f4f4f0;
    --text-secondary: #a5a5a1;
    --text-muted: #686a70;
    --border: rgba(255, 255, 255, 0.11);
    --border-strong: rgba(255, 255, 255, 0.22);
    --accent: #8da9ff;
    --accent-bright: #b6c7ff;
    --accent-soft: rgba(141, 169, 255, 0.15);
    --accent-glow: rgba(110, 155, 255, 0.26);
    --light-section: #efeee9;
    --light-text: #111111;
    --light-muted: #5d5d59;
}
```

Map existing selectors to the new variables. Keep the site readable without `motion.css`. Replace saturated blue panels with near-black surfaces, thin borders, restrained gradients, larger whitespace, and sharper typographic contrast. Do not add external fonts.

Update `project.css` to use the same variables. Preserve layout, project facts, status badges, navigation, and responsive rules.

- [ ] **Step 4: Verify GREEN and static preview**

Run tests, then serve on 8080. Check homepage and all six detail pages at 1440×900 and 360×800. Confirm no horizontal overflow, no low-contrast text, and no old bright-blue theme blocks.

- [ ] **Step 5: Commit**

```bash
git add style.css project.css tests
git commit -m "style: establish monochrome cold-blue visual system"
```

---

### Task 3: Motion asset skeleton and semantic scene hooks

**Files:**
- Create: `motion.css`
- Create: `motion.js`
- Modify: `index.html`
- Modify: six `projects/*.html`

**Interfaces:**
- Produces HTML attributes: `data-scene`, `data-reveal`, `data-project-index`, `data-project-accent`, `data-motion-root`.
- Produces CSS classes: `.scroll-progress`, `.reveal`, `.is-visible`, `.project-stage`, `.project-step`, `.project-panel`.
- Produces JavaScript entry `initMotion()`.

- [ ] **Step 1: Extend failing tests**

Add assertions for:

- `motion.css` loads after `style.css`/`project.css`.
- `motion.js` loads with `defer` after `script.js`.
- six homepage sections have `data-scene`.
- all six project cards/steps have unique indexes `0` through `5` and real detail links.
- all six project pages contain `data-motion-root="project"` and at least three `data-reveal` elements.
- no existing project title, status string, or detail URL disappears.

- [ ] **Step 2: Verify RED**

Run the focused tests and confirm missing hooks cause expected failures.

- [ ] **Step 3: Create minimal motion files**

Create `motion.css` with only safe defaults:

```css
html:not(.motion-ready) [data-reveal],
html.reduced-motion [data-reveal] {
    opacity: 1;
    transform: none;
}

.scroll-progress {
    position: fixed;
    inset: 0 0 auto;
    z-index: 1500;
    height: 2px;
    pointer-events: none;
}

.scroll-progress__bar {
    width: 100%;
    height: 100%;
    background: var(--accent);
    transform: scaleX(var(--page-progress, 0));
    transform-origin: left center;
}
```

Create `motion.js` with:

```javascript
(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function initMotion() {
        root.classList.toggle("reduced-motion", reducedMotion.matches);
        root.classList.add("motion-ready");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMotion, { once: true });
    } else {
        initMotion();
    }
})();
```

- [ ] **Step 4: Add semantic hooks without changing facts**

In `index.html`:

- add `<link rel="stylesheet" href="motion.css">` after `style.css`;
- add `<script src="motion.js" defer></script>` after `script.js`;
- add the scroll progress element immediately after the skip link;
- add the approved `data-scene` attributes to the six primary sections;
- add `data-reveal` to headings, intros, cards, timeline entries, and contact content;
- preserve every project description, technology tag, status, and link.

In each project page:

- add `../motion.css` after `../project.css`;
- add `../motion.js` after existing scripts;
- add `data-motion-root="project"` to the body or main wrapper;
- add `data-reveal` only to existing content groups.

- [ ] **Step 5: Verify GREEN and no-JS fallback**

Run tests. Temporarily disable JavaScript in the browser and confirm all content remains visible and navigable.

- [ ] **Step 6: Commit**

```bash
git add index.html motion.css motion.js projects tests
git commit -m "feat: add semantic motion architecture"
```

---

### Task 4: Shared motion runtime, progress, and reveal behavior

**Files:**
- Modify: `motion.js`
- Modify: `motion.css`
- Modify: tests

**Interfaces:**
- Produces `MotionController` internal module with `scheduleFrame()`, `updatePageProgress()`, `observeReveals()`, `setReducedMotion(matches)`.
- CSS consumes `.motion-ready`, `.reduced-motion`, `.is-visible`, and `--page-progress`.

- [ ] **Step 1: Add failing source contracts**

Tests must assert:

- exactly one `requestAnimationFrame` scheduler function exists;
- scroll listener uses `{ passive: true }`;
- IntersectionObserver is used for reveal states;
- no `wheel` listener and no `preventDefault()` in `motion.js`;
- reduced-motion change events update the root class;
- hidden content defaults visible unless `.motion-ready` is present.

- [ ] **Step 2: Verify RED**

Run focused tests and confirm failures are caused by the minimal runtime.

- [ ] **Step 3: Implement the runtime**

Implement a single RAF loop:

```javascript
let framePending = false;

function scheduleFrame() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => {
        framePending = false;
        updatePageProgress();
        updateScenes();
    });
}

window.addEventListener("scroll", scheduleFrame, { passive: true });
window.addEventListener("resize", scheduleFrame, { passive: true });
```

Use IntersectionObserver to add `.is-visible` once. In reduced-motion mode, mark all reveal nodes visible and disable scene transforms. Pause pointer-only effects while `document.hidden` is true.

- [ ] **Step 4: Implement reveal CSS**

Use a maximum starting offset of 32px and no blur stronger than 6px. Use the approved easing `cubic-bezier(0.22, 1, 0.36, 1)`. Add stagger through `--reveal-index`, not dozens of hardcoded selectors.

- [ ] **Step 5: Verify GREEN and behavior**

Run tests. Verify keyboard navigation, anchor navigation, browser back, menu Escape behavior, and Back to Top still work.

- [ ] **Step 6: Commit**

```bash
git add motion.js motion.css tests
git commit -m "feat: add accessible scroll motion runtime"
```

---

### Task 5: Hero and About chapter transition

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `motion.css`
- Modify: `motion.js`
- Modify: tests

**Interfaces:**
- Hero exposes `--hero-progress`, `--pointer-x`, `--pointer-y`.
- About exposes `.about-metric` containing the factual text `06 PROJECTS`.

- [ ] **Step 1: Add failing tests**

Assert:

- the Hero `h1` remains one semantic heading but contains three `.hero-line` wrappers;
- the exact visible idea remains “把复杂问题 / 转化为可以运行的 / AI产品”;
- About contains `06 PROJECTS` and no invented statistics;
- Hero pointer parallax is gated by `(hover: hover) and (pointer: fine)`;
- reduced-motion CSS removes Hero transforms and the About color transition.

- [ ] **Step 2: Verify RED**

Run tests.

- [ ] **Step 3: Implement Hero markup and static styling**

Keep all identity, description, GitHub link, and project CTA facts. Add line wrappers, a purely decorative orbit/grid layer with `aria-hidden="true"`, and no canvas/image/video.

- [ ] **Step 4: Implement scroll progress and pointer interpolation**

Calculate normalized Hero progress from its bounding rectangle, clamp to `[0,1]`, and write `--hero-progress`. Pointer movement should target no more than 12px visual displacement and use interpolation rather than immediate tracking. Disable it on touch devices and reduced motion.

- [ ] **Step 5: Implement About light-section transition**

Use the section’s scroll position to transition background and text using CSS variables. Keep the transition gradual and readable; do not flash from black to white. Add the metric and reveal sequence for the three existing capability cards.

- [ ] **Step 6: Verify and commit**

Run tests and browser checks at 1440×900, 1920×1080, 360×800, and 390×844.

```bash
git add index.html style.css motion.css motion.js tests
git commit -m "feat: add hero and monochrome chapter transition"
```

---

### Task 6: Skills horizontal track with safe mobile fallback

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `motion.css`
- Modify: `motion.js`
- Modify: tests

**Interfaces:**
- HTML: `.skills-scene`, `.skills-sticky`, `.skills-track`, `.skill-card[data-skill-index]`.
- JS writes `--skills-progress` only when desktop capability checks pass.

- [ ] **Step 1: Add failing contracts**

Assert five skill cards remain present and in the original order. Assert desktop sticky classes exist, mobile media rules remove sticky positioning and transforms, and reduced-motion mode uses a normal vertical/grid layout.

- [ ] **Step 2: Verify RED**

Run focused tests.

- [ ] **Step 3: Restructure skills markup**

Wrap the existing five cards in the sticky scene structure. Keep every existing skill title and description unchanged. Add indexes `01`–`05` as decorative text.

- [ ] **Step 4: Implement progress mapping**

Measure the skills scene and write a clamped progress variable. CSS maps the value to a horizontal track translation. Do not intercept scrolling. Limit scene height so the user is not trapped for more than roughly 2.5 viewport heights.

- [ ] **Step 5: Implement focus states**

Determine the nearest active card index from progress and set one class/state per frame only when the index changes. Current card may scale to at most `1.03`; inactive cards remain readable.

- [ ] **Step 6: Verify and commit**

Test mouse, touch emulation, keyboard tabbing, resize, and reduced motion.

```bash
git add index.html style.css motion.css motion.js tests
git commit -m "feat: add responsive skills scroll track"
```

---

### Task 7: Immersive six-project stage

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `motion.css`
- Modify: `motion.js`
- Modify: tests

**Interfaces:**
- HTML: `.projects-scene`, `.projects-sticky`, `.project-stage`, six `.project-step[data-project-index][data-project-accent]`, six `.project-panel`.
- JS function `setActiveProject(index: number) -> void` updates `data-active-project` and `--project-accent` only when index changes.

- [ ] **Step 1: Add failing truth and structure tests**

Assert:

- exactly six project indexes `0..5`;
- project order matches the approved order;
- every project has a real detail URL;
- existing project status strings remain present;
- no `href="#"` and no invented source/demo URL appears;
- auxiliary colors match the approved six values;
- mobile/reduced-motion CSS disables sticky stage and shows all six projects in document flow.

- [ ] **Step 2: Verify RED**

Run tests.

- [ ] **Step 3: Build the semantic project structure**

Retain all six project contents in HTML. Each project step must contain or reference its own visible content so no text is generated solely by JavaScript. Add the stage progress indicator and project numbering.

- [ ] **Step 4: Implement desktop activation**

Use the project step nearest the viewport center as the active index. On change, call `setActiveProject(index)`. Do not rebuild DOM. Manage `aria-hidden` and focusability so inactive stage panels cannot receive tab focus, while mobile flow keeps all links normally focusable.

- [ ] **Step 5: Implement restrained transitions**

Use the same exit/enter system for all projects: outgoing scale down to no less than `.92`, opacity decrease, incoming masked title reveal, low-opacity color glow, vertical number transition. Avoid per-project animation logic beyond color and decorative CSS shape.

- [ ] **Step 6: Verify and commit**

Verify all six steps activate in order under slow and fast scrolling, links remain clickable, browser Back works, and no content flashes at section boundaries.

```bash
git add index.html style.css motion.css motion.js tests
git commit -m "feat: add immersive six-project showcase"
```

---

### Task 8: Experience timeline, contact finale, and detail-page motion

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `motion.css`
- Modify: `motion.js`
- Modify: `project.css`
- Modify: six project pages
- Modify: tests

**Interfaces:**
- Experience items use `data-timeline-index`; JS writes `data-active-timeline`.
- Detail pages use shared `data-reveal` behavior only; no page-specific JavaScript modules.

- [ ] **Step 1: Add failing contracts**

Assert:

- all current experience items remain present;
- timeline has one semantic list and active-state hooks;
- contact still contains the real email/GitHub links;
- contact finale contains `LET’S BUILD SOMETHING REAL.` plus Chinese support text;
- each detail page loads shared motion assets and contains no duplicated inline animation script;
- project titles, validation sections, navigation order, and factual warning text remain present.

- [ ] **Step 2: Verify RED**

Run tests.

- [ ] **Step 3: Implement timeline**

Desktop: sticky year/progress rail and normal scrolling content. Mobile/reduced motion: ordinary vertical timeline. Update the active item only when the nearest index changes.

- [ ] **Step 4: Implement contact finale**

Create a full-width black ending scene with the approved English line, Chinese support text, real contact links, subtle cold-blue glow, and no giant cursor follower.

- [ ] **Step 5: Add restrained detail-page reveal hooks**

Apply shared classes to Hero, overview cards, section headings, feature cards, flows, status/risk notes, and previous/next navigation. Do not change facts. Add project-page motion CSS that limits movement to short fades/upward reveals and keeps reading primary.

- [ ] **Step 6: Verify and commit**

Run tests and all page link checks.

```bash
git add index.html style.css motion.css motion.js project.css projects tests
git commit -m "feat: animate timeline contact and project stories"
```

---

### Task 9: Accessibility, reduced-motion, performance, and final branch verification

**Files:**
- Modify: `motion.css`
- Modify: `motion.js`
- Modify: tests
- Modify other implementation files only when a verified defect requires it.

**Interfaces:**
- Final branch must be independently deployable as a static GitHub Pages site.

- [ ] **Step 1: Add final failing safety contracts**

Add tests asserting:

- `@media (prefers-reduced-motion: reduce)` exists and disables sticky transforms, parallax, long transitions, and reveal hiding;
- mobile breakpoints disable skills/project sticky layouts;
- no external runtime URL in HTML/CSS/JS;
- no `wheel`, `touchmove` prevention, `scroll-snap-type: y mandatory`, or `overflow: hidden` on the root scrolling element;
- no old store terms, phone number, QR references, false claims, or `href="#"`;
- CNAME equals exactly `www.universitydepartment.store`;
- all local CSS/JS links resolve to existing files.

- [ ] **Step 2: Verify RED if any contract is not yet satisfied**

Do not alter tests simply because a defect is inconvenient.

- [ ] **Step 3: Fix minimal verified issues**

Refactor only after tests pass. Ensure one passive scroll listener path, one RAF scheduler, no repeated DOM queries inside the frame loop, and discrete active-index updates.

- [ ] **Step 4: Run automated verification**

```bash
python -m pytest -q tests
python -m compileall -q tests
git diff --check
git grep -n "fonts.googleapis.com\|fonts.gstatic.com\|cdnjs\|jsdelivr\|unpkg" -- '*.html' '*.css' '*.js'
git grep -n "15596827232\|weixin://\|大学拾光优品\|稳定盈利\|保证盈利\|硬件已完成\|应用已上线\|已经量产" -- .
git diff main...HEAD -- CNAME
```

Expected: all tests pass, scans return no forbidden production matches, CNAME has no diff.

- [ ] **Step 5: Run browser verification**

Serve the worktree:

```bash
python -m http.server 8080
```

Verify homepage, six detail pages, three migration pages, and 404 page at:

- 1440×900
- 1920×1080
- 360×800
- 390×844

Also enable reduced motion and verify all content is immediately readable. Check console, network, focus order, mobile menu, Escape, Back to Top, anchors, browser Back, fast scrolling, refresh at `#projects`, and zero resource 404s. Stop the server afterward.

- [ ] **Step 6: Review diff and commit final hardening**

```bash
git status --short
git diff --stat
git diff --check
git diff main...HEAD --name-status
```

Confirm no unrelated files changed. Commit:

```bash
git add index.html style.css script.js project.css motion.css motion.js projects tests
git commit -m "test: harden motion accessibility and performance"
```

If `script.js` was not modified, do not add it.

- [ ] **Step 7: Push only the redesign branch**

```bash
git push -u origin codex/scroll-storytelling-redesign
```

Do not merge `main`. Report the branch SHA, commit list, test count, browser results, known limitations, and exact changed-file list. Leave the worktree clean.

---

## Final Self-Review Checklist

- Every design-spec section maps to a task above.
- The plan contains no placeholder requirements.
- Homepage and detail-page motion share `motion.css` and `motion.js`.
- Mobile and reduced-motion behavior are defined before release.
- No project truth claims are changed.
- No external runtime dependencies are introduced.
- `main` and `CNAME` remain untouched during implementation.
- The final branch can be locally previewed and reviewed before any production merge.
