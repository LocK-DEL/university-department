# Static Cache and First-Render Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every page renders the final public identity and project title on the first HTML paint, while versioning shared CSS and JavaScript so browsers request the latest deployed assets.

**Architecture:** Replace compatibility-time text mutation with final static HTML copy. Add one explicit release token (`v=20260731-1`) to local CSS and JavaScript references across all public HTML pages, remove `identity-overrides.js` from the loader and repository, and protect the behavior with static contract tests. The domain, URLs, evidence assets and existing visual behavior remain unchanged.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Python 3.12, Pytest, GitHub Pages, GitHub Actions.

## Global Constraints

- Public email is exactly `liuwenlong0706@outlook.com`.
- Public trading project name is exactly `多周期行情分析与风控报告金融交易系统`.
- Old email `3501391833@qq.com` must not remain in public HTML or JavaScript.
- Old names `BTC多周期行情分析与风控报告系统` and `BTC分析系统` must not remain in public HTML or JavaScript.
- No Service Worker, PWA cache or third-party cache library may be added.
- Local CSS and JavaScript references use release token `v=20260731-1`.
- Existing routes, screenshots, tests, privacy boundaries and `CNAME` remain unchanged.
- `CNAME` stays exactly `www.universitydepartment.store`.

---

### Task 1: Add first-render and asset-version regression tests

**Files:**
- Create: `tests/test_static_cache_contracts.py`

**Interfaces:**
- Consumes: existing public HTML files and `script.js`.
- Produces: contracts that reject runtime identity mutation, stale copy and unversioned local CSS/JS references.

- [ ] **Step 1: Write failing tests**

Create tests that enumerate `index.html`, `resume.html` and all six `projects/*.html` pages; assert the old email and old project titles are absent from HTML/JavaScript, assert `identity-overrides.js` is not referenced, assert `script.js` no longer creates the identity runtime, and assert every local `.css`/`.js` HTML reference contains `?v=20260731-1`.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `python -m pytest -q tests/test_static_cache_contracts.py`

Expected: FAIL because current HTML still contains stale trading copy, shared asset references are unversioned, and `script.js` loads `identity-overrides.js`.

- [ ] **Step 3: Commit the failing test**

Commit message: `test: define first-render and cache-busting contracts`.

### Task 2: Make final identity and project copy static

**Files:**
- Modify: `index.html`
- Modify: `projects/trading-system.html`
- Modify any other public HTML page containing the old email or old trading project title.

**Interfaces:**
- Consumes: exact public values in Global Constraints.
- Produces: HTML whose first paint already contains final public copy.

- [ ] **Step 1: Replace stale visible text, metadata, labels and mailto values**

Write the final email and project title directly into all affected HTML, including `<title>`, meta descriptions, breadcrumbs, headings, navigation labels, adjacent-project labels and contact links.

- [ ] **Step 2: Run focused tests**

Run: `python -m pytest -q tests/test_static_cache_contracts.py`

Expected: identity-copy assertions pass; runtime/version assertions may still fail until Tasks 3–4.

- [ ] **Step 3: Commit**

Commit message: `fix: render final public copy in static HTML`.

### Task 3: Remove runtime identity mutation

**Files:**
- Modify: `script.js`
- Delete: `identity-overrides.js`
- Modify existing identity tests that intentionally required the compatibility runtime.

**Interfaces:**
- Consumes: final static HTML from Task 2.
- Produces: page loader with no post-paint text replacement.

- [ ] **Step 1: Remove `identityRuntimeUrl` and identity-script injection**

Delete the loader code that constructs and appends `identity-overrides.js`; leave motion, resume and evidence loaders unchanged.

- [ ] **Step 2: Delete the obsolete compatibility file**

Remove `identity-overrides.js` from the repository.

- [ ] **Step 3: Update identity tests to assert static copy instead of runtime replacement**

The tests must fail if the compatibility file or loader reference returns.

- [ ] **Step 4: Run focused tests**

Run: `python -m pytest -q tests/test_static_cache_contracts.py tests/test_identity_update_contracts.py`

Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `refactor: remove post-paint identity override runtime`.

### Task 4: Version all local CSS and JavaScript references

**Files:**
- Modify: `index.html`
- Modify: `resume.html`
- Modify: `projects/knowledge-reconstruction.html`
- Modify: `projects/trading-system.html`
- Modify: `projects/lab-platform.html`
- Modify: `projects/ai-health-concept.html`
- Modify: `projects/carering.html`
- Modify: `projects/ai-workflow.html`

**Interfaces:**
- Consumes: release token `v=20260731-1`.
- Produces: cache-busted static asset URLs while preserving relative paths.

- [ ] **Step 1: Add `?v=20260731-1` to every local stylesheet and script reference**

Examples: `style.css?v=20260731-1`, `../script.js?v=20260731-1`, `resume-print.js?v=20260731-1`. Do not version anchors, HTML navigation links, mailto links or external GitHub links.

- [ ] **Step 2: Ensure loader URL detection accepts query strings**

Keep the existing `script.js(?:\?|$)` detection behavior so versioned `script.js` continues to locate shared assets.

- [ ] **Step 3: Run focused tests**

Run: `python -m pytest -q tests/test_static_cache_contracts.py`

Expected: PASS.

- [ ] **Step 4: Commit**

Commit message: `fix: version static assets for fresh deployments`.

### Task 5: Full verification and release

**Files:**
- Modify only if verification exposes a real regression.

**Interfaces:**
- Consumes: all changes from Tasks 1–4.
- Produces: merge-ready pull request and a synchronized bilingual branch.

- [ ] **Step 1: Run complete tests**

Run: `python -m pytest -q tests`

Expected: all tests pass with zero failures.

- [ ] **Step 2: Run syntax checks**

Run all JavaScript syntax checks configured in `.github/workflows/scroll-storytelling-checks.yml`, excluding deleted `identity-overrides.js` and including all remaining runtime files.

- [ ] **Step 3: Verify static invariants**

Confirm `CNAME`, all eight Chinese routes, project evidence references, final email, final trading title, and release token.

- [ ] **Step 4: Open PR and wait for complete CI success**

Merge only after tests, syntax checks, dependency scan and CNAME verification all succeed.

- [ ] **Step 5: Synchronize the merged main commit into `feat/bilingual-portfolio`**

Fast-forward or merge the cache-fix commit into the bilingual branch without losing its approved design document.
