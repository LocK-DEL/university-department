# Bilingual Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a complete, independently addressable English edition of the existing portfolio while preserving every Chinese route, the current visual system, shared project evidence, privacy boundaries and the canonical domain.

**Architecture:** Keep the site fully static. Dedicated English HTML files live under `en/`, while shared CSS, JavaScript and evidence assets remain at repository root and are referenced with relative paths. Chinese and English pages contain explicit, JavaScript-independent counterpart links, and shared evidence runtimes detect stable `data-project-key` values instead of translated titles.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, Python 3.12 generation/contract scripts, pytest and GitHub Actions.

## Global Constraints

- Chinese remains the default locale and all existing Chinese routes must remain available.
- Create exactly eight English pages: `en/index.html`, `en/resume.html` and six files under `en/projects/` matching the approved route names.
- Do not add translation APIs, localization frameworks, CMS software, external fonts or runtime CDN dependencies.
- The visible language control is `中文 | EN`, is keyboard accessible and works without JavaScript.
- The canonical host remains `https://www.universitydepartment.store`.
- `x-default` points to the Chinese counterpart.
- English HTML source may contain Chinese characters only in the intentional visible label `中文`.
- Public email remains `liuwenlong0706@outlook.com`.
- English copy must distinguish verified local prototypes, concept work and production systems accurately.
- Trading-system copy must not provide investment advice, performance claims or order-execution claims.
- CareRing copy must not present structural prototypes as validated health hardware.
- `CNAME` must remain exactly `www.universitydepartment.store`.

---

### Task 1: Add failing bilingual contracts

**Files:**
- Create: `tests/test_bilingual_portfolio_contracts.py`
- Modify: `.github/workflows/scroll-storytelling-checks.yml`

**Interfaces:**
- Consumes: the approved route mapping in `docs/superpowers/specs/2026-07-30-bilingual-portfolio-design.md`.
- Produces: pytest contracts that all later tasks must satisfy.

- [ ] **Step 1: Write the English-page existence and language tests**

```python
ENGLISH_PAGES = (
    Path("en/index.html"),
    Path("en/resume.html"),
    Path("en/projects/knowledge-reconstruction.html"),
    Path("en/projects/trading-system.html"),
    Path("en/projects/lab-platform.html"),
    Path("en/projects/ai-health-concept.html"),
    Path("en/projects/carering.html"),
    Path("en/projects/ai-workflow.html"),
)

@pytest.mark.parametrize("relative_path", ENGLISH_PAGES)
def test_english_page_exists_and_declares_english(relative_path):
    text = (ROOT / relative_path).read_text(encoding="utf-8")
    assert '<html lang="en">' in text
```

- [ ] **Step 2: Add counterpart, SEO, internal-link, source-language, email, resume-print, evidence-runtime and CNAME tests**

```python
def test_english_source_contains_no_unintended_chinese():
    cjk = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff]")
    for relative_path in ENGLISH_PAGES:
        source = (ROOT / relative_path).read_text(encoding="utf-8").replace("中文", "")
        assert not cjk.search(source), relative_path
```

- [ ] **Step 3: Enable push validation for `feat/bilingual-portfolio`**

Add the branch to the existing workflow's `on.push.branches` list without adding write permissions.

- [ ] **Step 4: Run the bilingual contract test and verify red state**

Run: `python -m pytest -q tests/test_bilingual_portfolio_contracts.py`

Expected: failure because the eight English files do not exist.

- [ ] **Step 5: Commit**

```bash
git add tests/test_bilingual_portfolio_contracts.py .github/workflows/scroll-storytelling-checks.yml
git commit -m "test: define bilingual portfolio contracts"
```

### Task 2: Build the static bilingual generator and shared language UI

**Files:**
- Create: `tools/build_bilingual_portfolio.py`
- Generated: `bilingual.css`
- Generated modifications: `index.html`, `resume.html`, `projects/*.html`

**Interfaces:**
- Consumes: the eight Chinese source files and the route-pair mapping.
- Produces: idempotent `patch_chinese_page(...)`, `render_home()`, `render_resume()` and `render_project(project)` output.

- [ ] **Step 1: Define route pairs and canonical URLs**

```python
PAIR_ROUTES = {
    "index.html": ("/", "/en/"),
    "resume.html": ("/resume.html", "/en/resume.html"),
    "projects/knowledge-reconstruction.html": (
        "/projects/knowledge-reconstruction.html",
        "/en/projects/knowledge-reconstruction.html",
    ),
}
```

Include the remaining five approved project routes with the same exact naming.

- [ ] **Step 2: Implement idempotent Chinese-page patching**

The patcher must insert:

```html
<link rel="canonical" href="https://www.universitydepartment.store/...">
<link rel="alternate" hreflang="zh-CN" href="https://www.universitydepartment.store/...">
<link rel="alternate" hreflang="en" href="https://www.universitydepartment.store/en/...">
<link rel="alternate" hreflang="x-default" href="https://www.universitydepartment.store/...">
```

It must also include `bilingual.css`, add a visible counterpart link and add `data-project-key` to project-page `<main>` elements.

- [ ] **Step 3: Generate `bilingual.css`**

Implement compact desktop and mobile styles for `.language-switcher`, `.language-switcher__link`, `.language-switcher__separator` and `.language-switcher--standalone`. Active locale links use `aria-current="page"` and remain visually distinct.

- [ ] **Step 4: Verify idempotency**

Run the generator twice and assert `git diff` is unchanged after the second run.

- [ ] **Step 5: Commit**

```bash
git add tools/build_bilingual_portfolio.py bilingual.css index.html resume.html projects
git commit -m "feat: add explicit bilingual navigation and SEO"
```

### Task 3: Generate English home and public resume

**Files:**
- Generated: `en/index.html`
- Generated: `en/resume.html`

**Interfaces:**
- Consumes: shared root styles/scripts and the public-safe identity/contact details.
- Produces: recruiter-focused English landing and resume pages.

- [ ] **Step 1: Render the English home page**

Use the existing sections and visual classes. The home page must include all six approved projects, direct project-detail links, the public email, GitHub profile and an active link to `resume.html`.

- [ ] **Step 2: Render the English resume**

Include target roles, capabilities, four selected projects, research leadership, awards and medical observation experience. Keep phone number, date of birth, exact address and identity information absent.

- [ ] **Step 3: Preserve print behavior**

Load `../resume-print.js` and retain `data-print-resume` on both print buttons.

- [ ] **Step 4: Run focused tests**

Run: `python -m pytest -q tests/test_bilingual_portfolio_contracts.py -k "english or resume or email"`

Expected: home/resume checks pass; project-page checks remain red until Task 4.

- [ ] **Step 5: Commit**

```bash
git add en/index.html en/resume.html
git commit -m "feat: add English portfolio home and resume"
```

### Task 4: Generate six English project detail pages

**Files:**
- Generated: `en/projects/knowledge-reconstruction.html`
- Generated: `en/projects/trading-system.html`
- Generated: `en/projects/lab-platform.html`
- Generated: `en/projects/ai-health-concept.html`
- Generated: `en/projects/carering.html`
- Generated: `en/projects/ai-workflow.html`

**Interfaces:**
- Consumes: structured project dictionaries in `tools/build_bilingual_portfolio.py`.
- Produces: six pages using the shared `render_project(project)` function and stable `data-project-key` identifiers.

- [ ] **Step 1: Define evidence-based English project data**

Each project dictionary must provide `title`, `label`, `summary`, four overview facts, background, problems/features, responsibilities, workflow, architecture or method, tech stack, verification status, safety note and previous/next navigation.

- [ ] **Step 2: Render pages with consistent engineering hierarchy**

Every page must include Overview, Background/Positioning, My Role, Core Features/Scope, Workflow/Method, Tech Stack, Verification and Limitations/Safety Boundaries.

- [ ] **Step 3: Add explicit page-context language links**

For example, `en/projects/trading-system.html` links directly to `../../projects/trading-system.html`, never to the home page.

- [ ] **Step 4: Run project contracts**

Run: `python -m pytest -q tests/test_bilingual_portfolio_contracts.py -k "project or counterpart or internal"`

Expected: all selected tests pass.

- [ ] **Step 5: Commit**

```bash
git add en/projects
git commit -m "feat: add English project detail pages"
```

### Task 5: Localize shared runtimes and preserve project evidence

**Files:**
- Modify: `script.js`
- Modify: `project-evidence.js`
- Modify: `trading-evidence-final.js`

**Interfaces:**
- Consumes: `document.documentElement.lang` and `.project-page[data-project-key]`.
- Produces: localized navigation labels and localized evidence sections with shared root-relative assets.

- [ ] **Step 1: Localize mobile menu labels**

```javascript
const isEnglish = document.documentElement.lang.startsWith("en");
const menuLabels = isEnglish
    ? { open: "Open navigation menu", close: "Close navigation menu" }
    : { open: "打开导航菜单", close: "关闭导航菜单" };
```

Use `menuLabels` for initial close state and click-state updates.

- [ ] **Step 2: Replace title-based evidence detection**

Read `document.querySelector(".project-page")?.dataset.projectKey` and use `knowledge-reconstruction`, `trading-system` and `carering` as stable identifiers. Retain title matching only as a backward-compatible fallback.

- [ ] **Step 3: Resolve evidence assets from the runtime script URL**

Use `new URL("assets/project-evidence/...", rootUrl)` so both `/projects/` and `/en/projects/` load the same assets.

- [ ] **Step 4: Localize injected headings, captions, alt text, ARIA labels and safety copy**

Select English or Chinese copy from the document language. Locate verification sections by `.verification-panel` or `[data-verification-section]`, not translated heading text.

- [ ] **Step 5: Verify JavaScript syntax**

Run:

```bash
node --check script.js
node --check project-evidence.js
node --check trading-evidence-final.js
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit**

```bash
git add script.js project-evidence.js trading-evidence-final.js
git commit -m "feat: support bilingual project evidence runtimes"
```

### Task 6: Full verification, PR and merge

**Files:**
- Modify: `.github/workflows/scroll-storytelling-checks.yml`

**Interfaces:**
- Consumes: all generated pages, shared runtimes and tests.
- Produces: a read-only CI workflow and a merge-ready pull request.

- [ ] **Step 1: Remove temporary generator commit permissions**

Restore `permissions: contents: read` and remove any workflow step that writes generated files. Keep `feat/bilingual-portfolio` in the push branch list.

- [ ] **Step 2: Run the full test suite**

Run: `python -m pytest -q tests`

Expected: all tests pass.

- [ ] **Step 3: Run source and syntax checks**

Run:

```bash
python -m compileall -q tests tools
node --check script.js
node --check motion.js
node --check resume-entry.js
node --check resume-print.js
node --check project-evidence.js
node --check trading-evidence-final.js
test "$(tr -d '\r\n' < CNAME)" = "www.universitydepartment.store"
```

Expected: all commands exit 0.

- [ ] **Step 4: Review the branch diff**

Confirm that only approved bilingual files, tests, runtime adaptations, workflow validation and design/plan documents are changed. Confirm there are no TODO markers, placeholder copy, secrets, phone numbers or exact addresses.

- [ ] **Step 5: Open and merge the pull request**

Create a PR from `feat/bilingual-portfolio` to `main`, wait for all checks to succeed and merge with the expected head SHA.

- [ ] **Step 6: Verify deployed routes**

Check `/en/`, `/en/resume.html`, all six `/en/projects/*.html` pages, Chinese-English language switching, mobile navigation, print-resume behavior and evidence rendering on the classroom, trading and CareRing pages.
