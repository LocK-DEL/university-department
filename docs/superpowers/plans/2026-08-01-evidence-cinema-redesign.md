# Evidence Cinema Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the bilingual homepage into the approved Evidence Cinema experience: one cinematic opening, one evidence-chain narrative, six individually composed project chapters, one editorial profile section, and one decisive contact ending.

**Architecture:** Keep both homepages fully semantic and complete without JavaScript. Use `homepage-editorial.css` for the page-scoped editorial layout and visual transitions, and keep `homepage-editorial.js` as a dependency-free progressive-enhancement layer for evidence hydration, hero cycling, index previews, chapter progress, and bounded pointer depth. Existing project pages, resume pages, routes, base64 evidence assets, and global navigation behavior remain intact.

**Tech Stack:** Static HTML, scoped CSS, vanilla JavaScript, Python 3.12 contract tests with `pytest`, Node syntax checks, GitHub Actions.

## Global Constraints

- Preserve the Chinese default homepage and English counterpart at `/en/`.
- Preserve all six project routes, resume routes, canonical URLs, `hreflang`, public email `liuwenlong0706@outlook.com`, GitHub profile link, and `CNAME` value `www.universitydepartment.store`.
- Keep one logical `h1` per homepage and complete content in document order without JavaScript.
- Do not add WebGL, video backgrounds, external fonts, external asset CDNs, analytics, animation libraries, wheel interception, mandatory scroll snapping, or focus traps.
- Do not fabricate screenshots or imply formal school deployment, medical validation, production readiness, investment advice, or trading returns.
- Preserve the exact truthful evidence states: 49 tests passed, 36 tests passed, public build evidence in preparation, product concept, structural prototype, and workflow case collection.
- Keep `body.home-editorial` so the existing global script continues to suppress the legacy motion layer only on the redesigned homepages.
- Use native scrolling. Motion must be optional, bounded, and removed or simplified under `prefers-reduced-motion: reduce`.
- Mobile must be a linear editorial story, not a scaled desktop collage.
- Merge only after automated checks pass and a human visual review confirms desktop, tablet, mobile, keyboard, reduced-motion, and image-failure behavior.

---

## File Responsibility Map

- `index.html` — complete Chinese Evidence Cinema homepage semantics and truthful copy.
- `en/index.html` — structurally equivalent English homepage with natural English copy and identical factual strength.
- `homepage-editorial.css` — all Evidence Cinema visual tokens, layout, editorial chapter compositions, responsive behavior, focus states, fallbacks, and reduced-motion rules.
- `homepage-editorial.js` — progressive enhancement only: evidence loading, hero evidence cycling, index preview state, chapter progress, pointer depth, lifecycle cleanup, and failure handling.
- `tests/test_homepage_editorial_contracts.py` — bilingual structure, truth, accessibility, runtime, CSS, asset, route, metadata, and dependency contracts.
- `tests/test_scroll_storytelling_contracts.py` — update only stale exact homepage copy or structural expectations that conflict with the approved design; do not weaken unrelated project-page contracts.
- `.github/workflows/scroll-storytelling-checks.yml` — ensure the feature branch and Evidence Cinema checks run in CI.
- `docs/superpowers/specs/2026-08-01-evidence-cinema-redesign.md` — approved design source of truth; no implementation edits unless a contradiction is discovered and documented.
- `docs/superpowers/plans/2026-08-01-evidence-cinema-redesign.md` — this execution checklist.

---

### Task 1: Replace Homepage Contracts With Evidence Cinema Contracts

**Files:**
- Modify: `tests/test_homepage_editorial_contracts.py`
- Modify only if required by a failing stale assertion: `tests/test_scroll_storytelling_contracts.py`

**Interfaces:**
- Consumes: approved structure and truth vocabulary from `docs/superpowers/specs/2026-08-01-evidence-cinema-redesign.md`.
- Produces: test-enforced selectors and copy contracts used by Tasks 2–6.

- [ ] **Step 1: Change the release token and define the Evidence Cinema project map**

Replace the release constant and add exact project keys:

```python
HOME_RELEASE = "20260801-cinema1"

CINEMA_PROJECTS = (
    ("knowledge-reconstruction", "SYSTEM · TEST · EVIDENCE"),
    ("trading-system", "SYSTEM · TEST · EVIDENCE"),
    ("lab-platform", "STRUCTURE · SYSTEM"),
    ("ai-health-concept", "IDEA · STRUCTURE"),
    ("carering", "STRUCTURE · PROTOTYPE"),
    ("ai-workflow", "PROCESS · EVIDENCE"),
)
```

- [ ] **Step 2: Write the failing bilingual structure contract**

Replace the existing shared-stage expectations with complete chapter expectations:

```python
def test_bilingual_home_pages_use_the_evidence_cinema_surface() -> None:
    for path in HOME_PAGES:
        source = read(path)
        document = parse(source)

        assert 'class="home-editorial evidence-cinema"' in source
        assert f'homepage-editorial.css?v={HOME_RELEASE}' in source
        assert f'homepage-editorial.js?v={HOME_RELEASE}' in source
        assert source.count("data-cinema-hero-layer") >= 3
        assert source.count("data-cinema-index-link") == 6
        assert source.count("data-cinema-chapter") == 6
        assert source.count("data-cinema-stage") == 6
        assert document.h1_count == 1
        assert {"home", "work", "profile", "contact"}.issubset(document.ids)
        assert source.index("skip-link") < source.index("site-header")
        assert source.index('id="work"') < source.index('data-cinema-chapter="knowledge-reconstruction"')
        assert source.index('data-cinema-chapter="ai-workflow"') < source.index('id="profile"')
```

- [ ] **Step 3: Write the failing hero, chapter, and ending copy contracts**

Add:

```python
def test_evidence_cinema_has_one_dominant_opening_and_decisive_ending() -> None:
    chinese = read("index.html")
    english = read("en/index.html")

    for source in (chinese, english):
        assert "FROM" in source
        assert "UNFINISHED IDEAS" in source
        assert "TO EVIDENCE" in source
        assert source.count("data-cinema-primary-action") == 2
        assert "I BUILD BETWEEN DISCIPLINES" in source
        assert "LET&#39;S TURN" in source or "LET'S TURN" in source
        assert PUBLIC_EMAIL in source

    assert "把尚未成形的构想" in chinese
    assert "让下一个想法，成为可以验证的现实" in chinese
    assert "turn unfinished ideas into systems, tests, and evidence" in english.lower()
```

- [ ] **Step 4: Write the failing project-stage and limitation contracts**

Add:

```python
def test_each_project_is_a_complete_truthful_editorial_chapter() -> None:
    chinese = read("index.html")
    english = read("en/index.html")

    for key, stage in CINEMA_PROJECTS:
        for source in (chinese, english):
            assert f'data-cinema-chapter="{key}"' in source
            assert f'data-cinema-stage="{stage}"' in source
            assert f'href="projects/{key}.html"' in source

    for required in (
        "49项测试通过",
        "未声称已被学校正式部署",
        "36项测试通过",
        "不构成投资建议或收益证明",
        "公开构建证据准备中",
        "产品概念",
        "不是已验证的医疗产品",
        "结构原型",
        "不代表健康功能已经验证",
        "工作流案例合集",
        "AI 是协作工具",
    ):
        assert required in chinese

    for required in (
        "49 tests passed",
        "No formal institutional deployment is claimed",
        "36 tests passed",
        "Not investment advice or evidence of returns",
        "Public build evidence in preparation",
        "Product concept",
        "not a validated medical product",
        "Structural prototype",
        "does not validate health functions",
        "Workflow case collection",
        "AI is a collaboration tool",
    ):
        assert required in english
```

- [ ] **Step 5: Write the failing runtime and CSS contracts**

Replace the old shared-stage assertions with:

```python
def test_evidence_cinema_runtime_is_progressive_bounded_and_lifecycle_aware() -> None:
    runtime = read("homepage-editorial.js")

    for required in (
        "installHeroCinema",
        "installIndexPreview",
        "installChapterProgress",
        "installPointerDepth",
        "prefers-reduced-motion: reduce",
        "IntersectionObserver",
        "visibilitychange",
        "pagehide",
        "requestAnimationFrame",
        "classroom-demo-home-hd.b64.txt",
        "trading-dashboard-final.part-01.b64.txt",
        "carering-prototype-collage.b64.txt",
    ):
        assert required in runtime

    assert 'addEventListener("wheel"' not in runtime
    assert "scrollTo(" not in runtime
    assert "scrollIntoView(" not in runtime


def test_evidence_cinema_styles_define_editorial_chapters_and_mobile_linearization() -> None:
    styles = read("homepage-editorial.css")

    for required in (
        "--cinema-ink:",
        "--cinema-paper:",
        "--cinema-signal:",
        ".cinema-hero",
        ".cinema-work-index",
        ".cinema-chapter",
        ".cinema-evidence-chain",
        ".cinema-profile",
        ".cinema-contact",
        "@media (max-width: 900px)",
        "@media (max-width: 767px)",
        "@media (prefers-reduced-motion: reduce)",
        ":focus-visible",
    ):
        assert required in styles

    assert "scroll-snap-type" not in styles
    assert "@import" not in styles
    assert "purple" not in styles.lower()
    assert "violet" not in styles.lower()
```

- [ ] **Step 6: Run the focused tests and confirm they fail for the intended reasons**

Run:

```bash
python -m pytest -q tests/test_homepage_editorial_contracts.py
```

Expected: failures mention missing `evidence-cinema`, `data-cinema-*`, new release token, new chapter markup, and new runtime/CSS function names. Existing route, contact, metadata, and no-external-dependency tests should continue to pass.

- [ ] **Step 7: Commit the failing contracts**

```bash
git add tests/test_homepage_editorial_contracts.py tests/test_scroll_storytelling_contracts.py
git commit -m "test: define Evidence Cinema homepage contracts"
```

---

### Task 2: Rebuild the Chinese Homepage as Complete Semantic Chapters

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: selectors and release token defined in Task 1.
- Produces: complete Chinese document-order content for CSS and JavaScript enhancement.

- [ ] **Step 1: Preserve metadata and switch the page surface**

Keep the existing canonical, `hreflang`, Open Graph, title, description, public routes, and global styles. Change only the homepage release references and body class:

```html
<link rel="stylesheet" href="homepage-editorial.css?v=20260801-cinema1">
...
<body class="home-editorial evidence-cinema">
...
<script src="homepage-editorial.js?v=20260801-cinema1"></script>
```

- [ ] **Step 2: Replace the hero with one dominant cinematic statement**

Use this semantic structure and exact primary copy:

```html
<section class="cinema-hero" id="home" aria-labelledby="cinema-title">
  <div class="cinema-hero__media" aria-hidden="true">
    <div class="cinema-hero__layer is-active" data-cinema-hero-layer="classroom">
      <img data-home-image="classroom" alt="" decoding="async">
    </div>
    <div class="cinema-hero__layer" data-cinema-hero-layer="trading-dashboard">
      <img data-home-image="trading-dashboard" alt="" decoding="async">
    </div>
    <div class="cinema-hero__layer" data-cinema-hero-layer="carering">
      <img data-home-image="carering" alt="" decoding="async">
    </div>
    <div class="cinema-hero__fallback" aria-hidden="true">SYSTEM / TEST / EVIDENCE</div>
  </div>

  <div class="cinema-hero__content container">
    <p class="cinema-kicker">DAVID LIU / PORTFOLIO 2026</p>
    <h1 id="cinema-title" class="cinema-hero__title">
      <span>FROM</span>
      <span>UNFINISHED IDEAS</span>
      <span class="cinema-accent">TO EVIDENCE.</span>
    </h1>
    <p class="cinema-hero__support">把尚未成形的构想，做成可以运行、测试与验证的现实。</p>
    <div class="cinema-hero__actions">
      <a data-cinema-primary-action href="#work">查看项目</a>
      <a data-cinema-primary-action href="resume.html">打开简历</a>
    </div>
  </div>
</section>
```

The atmospheric hero images use empty alt text because the same evidence appears later with meaningful captions. The fallback remains decorative; the primary content is never image-dependent.

- [ ] **Step 3: Build the selected-work index as a plain usable list**

Use six direct links with exact keys and stages:

```html
<section class="cinema-work-index" id="work" aria-labelledby="work-title">
  <div class="container">
    <header class="cinema-section-heading">
      <p>SELECTED WORK / 01</p>
      <h2 id="work-title">六个项目，一条从构想到证据的路径。</h2>
    </header>
    <ol class="cinema-work-index__list">
      <li><a data-cinema-index-link="knowledge-reconstruction" href="#chapter-knowledge-reconstruction"><span>01</span><strong>课堂知识智能重构系统</strong><small>SYSTEM · TEST · EVIDENCE</small></a></li>
      <li><a data-cinema-index-link="trading-system" href="#chapter-trading-system"><span>02</span><strong>多周期行情分析与风控报告系统</strong><small>SYSTEM · TEST · EVIDENCE</small></a></li>
      <li><a data-cinema-index-link="lab-platform" href="#chapter-lab-platform"><span>03</span><strong>科研实验室数字化平台</strong><small>STRUCTURE · SYSTEM</small></a></li>
      <li><a data-cinema-index-link="ai-health-concept" href="#chapter-ai-health-concept"><span>04</span><strong>AI 健康管理产品方案</strong><small>IDEA · STRUCTURE</small></a></li>
      <li><a data-cinema-index-link="carering" href="#chapter-carering"><span>05</span><strong>CareRing 智能健康手环</strong><small>STRUCTURE · PROTOTYPE</small></a></li>
      <li><a data-cinema-index-link="ai-workflow" href="#chapter-ai-workflow"><span>06</span><strong>AI 辅助科研与智能建模工作流</strong><small>PROCESS · EVIDENCE</small></a></li>
    </ol>
    <div class="cinema-index-preview" data-cinema-index-preview aria-hidden="true"></div>
  </div>
</section>
```

- [ ] **Step 4: Build all six complete chapters in document order**

Each article must contain title, one-sentence value, truthful evidence, explicit limitation, full-case link, and stage. Use these exact keys and copy requirements:

| Key | Number | Chinese title | Stage | Required evidence note | Required limitation |
| --- | --- | --- | --- | --- | --- |
| `knowledge-reconstruction` | 01 | 课堂知识智能重构系统 | SYSTEM · TEST · EVIDENCE | `49项测试通过` and `前后端本地运行已验证` | `未声称已被学校正式部署` |
| `trading-system` | 02 | 多周期行情分析与风控报告系统 | SYSTEM · TEST · EVIDENCE | `36项测试通过` and `本地报告流程已实现` | `不构成投资建议或收益证明` |
| `lab-platform` | 03 | 科研实验室数字化平台 | STRUCTURE · SYSTEM | `前端结构已审查` and `公开构建证据准备中` | `不使用虚构截图代替公开证据` |
| `ai-health-concept` | 04 | AI 健康管理产品方案 | IDEA · STRUCTURE | `产品概念` and `用户流程与竞赛方案已完成` | `不是已验证的医疗产品` |
| `carering` | 05 | CareRing 智能健康手环 | STRUCTURE · PROTOTYPE | `结构原型` and `3D建模与专利导向迭代` | `不代表健康功能已经验证` |
| `ai-workflow` | 06 | AI 辅助科研与智能建模工作流 | PROCESS · EVIDENCE | `工作流案例合集` and `需求、软件操作与成果记录` | `AI 是协作工具，项目边界、检查与验收由我负责` |

Use this semantic article contract for every key, with a unique composition class such as `cinema-chapter--software`, `--terminal`, `--platform`, `--concept`, `--hardware`, or `--workflow`:

```html
<article
  class="cinema-chapter cinema-chapter--software"
  id="chapter-knowledge-reconstruction"
  data-cinema-chapter="knowledge-reconstruction"
  data-cinema-stage="SYSTEM · TEST · EVIDENCE"
  aria-labelledby="chapter-title-knowledge-reconstruction"
>
  <div class="cinema-chapter__frame container">
    <header class="cinema-chapter__header">
      <span class="cinema-chapter__number" aria-hidden="true">01</span>
      <p class="cinema-chapter__stage">SYSTEM · TEST · EVIDENCE</p>
      <h2 id="chapter-title-knowledge-reconstruction">课堂知识<br>智能重构系统</h2>
      <p class="cinema-chapter__value">将课堂文本、语音转写、知识提取、知识图谱与题目生成整合为可验证的本地系统。</p>
    </header>

    <figure class="cinema-evidence cinema-evidence--primary">
      <div class="cinema-evidence__media home-evidence-media">
        <img data-home-image="classroom" alt="课堂知识智能重构系统经过脱敏处理的本地运行首页" loading="lazy" decoding="async">
        <div class="home-evidence-fallback"><strong>课堂知识智能重构系统</strong><span>真实界面暂时无法载入，证据说明和详情链接仍然可用。</span></div>
      </div>
      <figcaption>真实本地界面，展示文件上传、知识提取、知识图谱与题目生成入口。</figcaption>
    </figure>

    <dl class="cinema-evidence-notes">
      <div><dt>EVIDENCE 01</dt><dd>49项测试通过</dd></div>
      <div><dt>EVIDENCE 02</dt><dd>前后端本地运行已验证</dd></div>
      <div class="is-limit"><dt>LIMIT</dt><dd>未声称已被学校正式部署</dd></div>
    </dl>

    <a class="cinema-case-link" href="projects/knowledge-reconstruction.html">查看完整案例 ↗</a>
  </div>
</article>
```

For projects without a public screenshot, use a real semantic `<div role="img" aria-label="…">` evidence sheet containing the exact workflow or module names, followed by the explicit limitation. Do not insert an empty `<img>` or invented UI frame.

- [ ] **Step 5: Add a progressive evidence-chain rail outside chapter content**

Add once before the six chapters:

```html
<nav class="cinema-evidence-chain" aria-label="项目证据阶段" data-cinema-evidence-chain>
  <span data-cinema-chain-stage="IDEA">IDEA</span>
  <span data-cinema-chain-stage="STRUCTURE">STRUCTURE</span>
  <span data-cinema-chain-stage="SYSTEM">SYSTEM</span>
  <span data-cinema-chain-stage="TEST">TEST</span>
  <span data-cinema-chain-stage="EVIDENCE">EVIDENCE</span>
</nav>
```

The chain is supplementary. Every article repeats its full stage in plain text so the page remains understandable without enhancement.

- [ ] **Step 6: Replace the old method/profile/contact sections with the approved editorial ending**

Use:

```html
<section class="cinema-profile" id="profile" aria-labelledby="profile-title">
  <div class="container cinema-profile__layout">
    <header>
      <p>PROFILE / 02</p>
      <h2 id="profile-title">I BUILD BETWEEN DISCIPLINES.</h2>
      <p>我工作在 AI、科研、产品与工程之间。</p>
    </header>
    <p class="cinema-profile__statement">我擅长把尚未定义清楚的问题，拆解成可执行的需求、原型、系统与验证材料。AI 是协作工具，而项目边界、隐私处理、测试设计和最终验收由我负责。</p>
    <dl class="cinema-capabilities">
      <div><dt>AI APPLICATIONS</dt><dd>Python / RAG / Model API / Automation</dd></div>
      <div><dt>WEB SYSTEMS</dt><dd>HTML / CSS / JavaScript / React / Next.js</dd></div>
      <div><dt>PRODUCT &amp; ENGINEERING</dt><dd>Requirements / Prototype / CAD / Documentation</dd></div>
      <div><dt>RESEARCH PRACTICE</dt><dd>Experimental workflows / Bioinformatics / Evidence review</dd></div>
    </dl>
  </div>
</section>

<section class="cinema-contact" id="contact" aria-labelledby="contact-title">
  <div class="container">
    <p>CONTACT / 03</p>
    <h2 id="contact-title">LET&#39;S TURN<br>THE NEXT IDEA<br><span>INTO EVIDENCE.</span></h2>
    <p>让下一个想法，成为可以验证的现实。</p>
    <nav aria-label="联系入口">
      <a href="mailto:liuwenlong0706@outlook.com">EMAIL</a>
      <a href="https://github.com/LocK-DEL" target="_blank" rel="noopener noreferrer">GITHUB</a>
      <a href="resume.html">RESUME</a>
    </nav>
    <a class="cinema-contact__email" href="mailto:liuwenlong0706@outlook.com">liuwenlong0706@outlook.com</a>
  </div>
</section>
```

End with the exact publication metadata:

```html
<footer class="cinema-footer">
  <div class="container">
    <span>DAVID LIU / PORTFOLIO 2026</span>
    <span>SHENZHEN · CHINA</span>
    <span>DESIGNED AROUND REAL EVIDENCE</span>
  </div>
</footer>
```

- [ ] **Step 7: Run Chinese-focused contracts**

Run:

```bash
python -m pytest -q tests/test_homepage_editorial_contracts.py -k "routes or contact or truth or dominant or complete"
```

Expected: Chinese assertions pass; English structural assertions may still fail until Task 3.

- [ ] **Step 8: Commit the Chinese semantic homepage**

```bash
git add index.html
git commit -m "feat: rebuild Chinese homepage as Evidence Cinema"
```

---

### Task 3: Build the Structurally Equivalent English Homepage

**Files:**
- Modify: `en/index.html`

**Interfaces:**
- Consumes: the exact semantic classes, data attributes, project keys, and release token from Task 2.
- Produces: bilingual parity for CSS, JavaScript, and tests.

- [ ] **Step 1: Mirror the page surface and relative paths**

Use:

```html
<link rel="stylesheet" href="../homepage-editorial.css?v=20260801-cinema1">
<body class="home-editorial evidence-cinema">
...
<script src="../homepage-editorial.js?v=20260801-cinema1"></script>
```

Keep English canonical and `hreflang` values correct. Project links remain `projects/<slug>.html`, resume remains `resume.html`, and the Chinese language counterpart remains `../`.

- [ ] **Step 2: Use the approved English hero and support copy**

```html
<h1 id="cinema-title" class="cinema-hero__title">
  <span>FROM</span>
  <span>UNFINISHED IDEAS</span>
  <span class="cinema-accent">TO EVIDENCE.</span>
</h1>
<p class="cinema-hero__support">I turn unfinished ideas into systems, tests, and evidence that can be inspected.</p>
<div class="cinema-hero__actions">
  <a data-cinema-primary-action href="#work">VIEW THE WORK</a>
  <a data-cinema-primary-action href="resume.html">OPEN RESUME</a>
</div>
```

- [ ] **Step 3: Use the exact English project map**

| Key | Title | Stage | Evidence notes | Limitation |
| --- | --- | --- | --- | --- |
| `knowledge-reconstruction` | Classroom Knowledge Reconstruction System | SYSTEM · TEST · EVIDENCE | `49 tests passed`; `Local front-end and back-end operation verified` | `No formal institutional deployment is claimed` |
| `trading-system` | Multi-timeframe Market Analysis and Risk Reporting System | SYSTEM · TEST · EVIDENCE | `36 tests passed`; `Local reporting workflow implemented` | `Not investment advice or evidence of returns` |
| `lab-platform` | Research Laboratory Digital Platform | STRUCTURE · SYSTEM | `Front-end structure reviewed`; `Public build evidence in preparation` | `No fabricated screenshot substitutes for public evidence` |
| `ai-health-concept` | AI Health Management Product Concept | IDEA · STRUCTURE | `Product concept`; `User flow and competition proposal completed` | `This is not a validated medical product` |
| `carering` | CareRing Smart Health Wristband | STRUCTURE · PROTOTYPE | `Structural prototype`; `3D modeling and patent-oriented iteration` | `Structural adaptation does not validate health functions` |
| `ai-workflow` | AI-assisted Research and Intelligent Modeling Workflow | PROCESS · EVIDENCE | `Workflow case collection`; `Requirements, software operation, and output records` | `AI is a collaboration tool; project boundaries, review, and acceptance remain my responsibility` |

Use the same article IDs, `data-cinema-chapter`, `data-cinema-stage`, evidence asset keys, fallback classes, note structure, and direct links as the Chinese page. Natural line breaks may differ, but DOM hierarchy and factual strength must match.

- [ ] **Step 4: Use the approved English profile and contact copy**

```html
<h2 id="profile-title">I BUILD BETWEEN DISCIPLINES.</h2>
<p>I work across AI, research, product, and engineering.</p>
<p class="cinema-profile__statement">I turn loosely defined problems into executable requirements, prototypes, systems, and verification material. AI is a collaboration tool; I remain responsible for project boundaries, privacy review, test design, and final acceptance.</p>
```

```html
<h2 id="contact-title">LET&#39;S TURN<br>THE NEXT IDEA<br><span>INTO EVIDENCE.</span></h2>
<p>Let the next idea become something that can be inspected and verified.</p>
```

- [ ] **Step 5: Run all homepage contracts**

Run:

```bash
python -m pytest -q tests/test_homepage_editorial_contracts.py
```

Expected: structure, bilingual truth, routes, metadata, contact, no-external-dependency, and alt/fallback assertions pass. Runtime and CSS assertions may still fail until Tasks 4–6.

- [ ] **Step 6: Commit the English semantic homepage**

```bash
git add en/index.html
git commit -m "feat: build English Evidence Cinema homepage"
```

---

### Task 4: Replace the Homepage Visual System With Editorial Cinema Layouts

**Files:**
- Modify: `homepage-editorial.css`

**Interfaces:**
- Consumes: Task 2–3 semantic classes and data attributes.
- Produces: stable desktop, tablet, mobile, no-JavaScript, failure, focus, and reduced-motion presentation.

- [ ] **Step 1: Replace the root visual tokens**

Keep all rules scoped under `.home-editorial`. Start with:

```css
.home-editorial {
  --cinema-ink: #0a0a08;
  --cinema-ink-raised: #11110e;
  --cinema-paper: #f0eee7;
  --cinema-paper-muted: #aaa99f;
  --cinema-signal: #a7f36b;
  --cinema-mineral: #78bfd0;
  --cinema-rule: rgba(240, 238, 231, 0.16);
  --cinema-rule-strong: rgba(240, 238, 231, 0.34);
  --cinema-shadow: 0 32px 100px rgba(0, 0, 0, 0.38);
  --cinema-gutter: clamp(20px, 4vw, 64px);
  --cinema-section: clamp(112px, 14vw, 220px);
  --cinema-max: 1440px;
  --cinema-reading: 760px;
  --cinema-fast: 180ms;
  --cinema-base: 420ms;
  --cinema-slow: 1100ms;
  --cinema-ease: cubic-bezier(.22, .8, .2, 1);
  min-width: 320px;
  overflow-x: clip;
  margin: 0;
  background: var(--cinema-ink);
  color: var(--cinema-paper);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
}
```

Retain the skip link, focus-visible, `box-sizing`, container, image, heading, and global accessibility resets. Remove obsolete `.home-project-stage`, `.home-project-row`, `.home-project-mobile-evidence`, tablist, and shared-stage styling.

- [ ] **Step 2: Build the cinematic hero without a card frame**

Implement:

```css
.home-editorial .cinema-hero {
  position: relative;
  min-height: calc(100svh - 68px);
  display: grid;
  align-items: end;
  overflow: clip;
  border-bottom: 1px solid var(--cinema-rule);
  isolation: isolate;
}

.home-editorial .cinema-hero__media,
.home-editorial .cinema-hero__layer {
  position: absolute;
  inset: 0;
}

.home-editorial .cinema-hero__layer {
  opacity: 0;
  transform: scale(1.045) translate3d(var(--cinema-pointer-x, 0), var(--cinema-pointer-y, 0), 0);
  transition: opacity var(--cinema-slow) var(--cinema-ease), transform 9s linear;
}

.home-editorial .cinema-hero__layer.is-active {
  opacity: .42;
  transform: scale(1.01) translate3d(var(--cinema-pointer-x, 0), var(--cinema-pointer-y, 0), 0);
}

.home-editorial .cinema-hero__layer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(10, 10, 8, .9) 0 36%, rgba(10, 10, 8, .28) 72%, rgba(10, 10, 8, .78));
}

.home-editorial .cinema-hero__layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(.72) contrast(1.04);
}

.home-editorial .cinema-hero__content {
  position: relative;
  z-index: 2;
  padding-block: clamp(92px, 13vh, 170px) clamp(54px, 8vh, 96px);
}

.home-editorial .cinema-hero__title {
  max-width: 1280px;
  margin: 0;
  font-size: clamp(4rem, 10.5vw, 10.8rem);
  line-height: .82;
  letter-spacing: -.075em;
  text-transform: uppercase;
}

.home-editorial .cinema-hero__title > span {
  display: block;
  overflow: hidden;
}

.home-editorial .cinema-accent {
  color: var(--cinema-signal);
}
```

Actions remain text-forward and rectangular. Do not place the hero copy inside a rounded panel.

- [ ] **Step 3: Style the selected-work index as a publication contents page**

Requirements:

```css
.home-editorial .cinema-work-index {
  position: relative;
  padding-block: var(--cinema-section);
  border-bottom: 1px solid var(--cinema-rule);
}

.home-editorial .cinema-work-index__list {
  position: relative;
  z-index: 2;
  margin: clamp(60px, 8vw, 120px) 0 0;
  padding: 0;
  list-style: none;
}

.home-editorial .cinema-work-index__list a {
  min-height: 92px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) minmax(210px, auto);
  gap: 24px;
  align-items: baseline;
  padding: 24px 0;
  border-top: 1px solid var(--cinema-rule);
  text-decoration: none;
}

.home-editorial .cinema-work-index__list li:last-child a {
  border-bottom: 1px solid var(--cinema-rule);
}

.home-editorial .cinema-index-preview {
  position: absolute;
  right: max(var(--cinema-gutter), calc((100vw - var(--cinema-max)) / 2));
  top: 18%;
  width: min(38vw, 560px);
  aspect-ratio: 4 / 3;
  pointer-events: none;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity var(--cinema-base) var(--cinema-ease), transform var(--cinema-base) var(--cinema-ease);
}

.home-editorial .cinema-index-preview.is-visible {
  opacity: .24;
  transform: translateY(0);
}
```

The preview sits behind readable text, never above it, and is hidden below 901 px.

- [ ] **Step 4: Create the chapter base and six composition variants**

Base:

```css
.home-editorial .cinema-chapter {
  position: relative;
  min-height: 100svh;
  padding-block: var(--cinema-section);
  border-bottom: 1px solid var(--cinema-rule);
  overflow: clip;
}

.home-editorial .cinema-chapter__frame {
  display: grid;
  grid-template-columns: minmax(300px, .82fr) minmax(0, 1.5fr);
  gap: clamp(52px, 8vw, 132px);
  align-items: start;
}

.home-editorial .cinema-chapter__number {
  display: block;
  margin-left: -.08em;
  color: rgba(240, 238, 231, .08);
  font-size: clamp(8rem, 20vw, 20rem);
  font-weight: 800;
  line-height: .7;
  letter-spacing: -.09em;
}

.home-editorial .cinema-chapter__header h2 {
  margin: clamp(-38px, -3vw, -18px) 0 28px;
  font-size: clamp(3.2rem, 7.4vw, 7.8rem);
  letter-spacing: -.065em;
}

.home-editorial .cinema-evidence-notes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin: 28px 0 0;
  border-block: 1px solid var(--cinema-rule);
}

.home-editorial .cinema-evidence-notes > div {
  min-height: 118px;
  padding: 20px;
  border-right: 1px solid var(--cinema-rule);
}

.home-editorial .cinema-evidence-notes .is-limit {
  color: var(--cinema-paper-muted);
}
```

Composition rules:

- `.cinema-chapter--software`: evidence image spans the right column with a wide 16:10 crop.
- `.cinema-chapter--terminal`: use a two-layer evidence composition where the dashboard is wide and a terminal-like note sheet crosses its left edge; no synthetic profit graphic.
- `.cinema-chapter--platform`: increase negative space and use a clean module sheet rather than a fake browser screenshot.
- `.cinema-chapter--concept`: use linear journey and relationship diagrams with a visible `CONCEPT` wordmark.
- `.cinema-chapter--hardware`: allow an asymmetrical collage, preserve at least one uncropped CareRing image, and use patent-style rules and dimensions.
- `.cinema-chapter--workflow`: use a horizontal or stepped sequence of requirement, collaboration, software operation, and final artifact.

Each variant must remain understandable when enhancement classes are absent.

- [ ] **Step 5: Style the evidence-chain rail as supplementary progress**

```css
.home-editorial .cinema-evidence-chain {
  position: sticky;
  top: 68px;
  z-index: 20;
  display: flex;
  gap: clamp(14px, 2vw, 28px);
  justify-content: center;
  padding: 12px var(--cinema-gutter);
  border-bottom: 1px solid var(--cinema-rule);
  background: rgba(10, 10, 8, .88);
  color: var(--cinema-paper-muted);
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: .68rem;
  letter-spacing: .08em;
}

.home-editorial .cinema-evidence-chain [data-cinema-chain-stage].is-active {
  color: var(--cinema-signal);
}
```

The sticky rail must not obscure anchors; add `scroll-margin-top: 124px` to chapter articles.

- [ ] **Step 6: Build the editorial profile and contact ending**

Profile uses a two-column layout with the statement and taxonomy, not cards. Contact uses a full-width large headline and three text links. Use hard edges, rules, and spacing rather than rounded boxes.

Required scale:

```css
.home-editorial .cinema-profile,
.home-editorial .cinema-contact {
  padding-block: var(--cinema-section);
}

.home-editorial .cinema-profile__layout {
  display: grid;
  grid-template-columns: minmax(280px, .8fr) minmax(0, 1.2fr);
  gap: clamp(56px, 10vw, 150px);
}

.home-editorial .cinema-contact h2 {
  margin: 0;
  font-size: clamp(4rem, 11vw, 11rem);
  line-height: .82;
  letter-spacing: -.075em;
}

.home-editorial .cinema-contact h2 span {
  color: var(--cinema-signal);
}
```

- [ ] **Step 7: Implement tablet and mobile as linear re-compositions**

At `max-width: 900px`:

- hide `.cinema-index-preview`;
- remove pointer-depth visual transforms;
- change chapter frame to one column;
- keep full chapter content in order;
- make evidence notes wrap to two columns;
- reduce sticky evidence chain density or allow horizontal overflow without hiding labels.

At `max-width: 767px`:

```css
@media (max-width: 767px) {
  .home-editorial .cinema-hero__title {
    font-size: clamp(3.25rem, 17vw, 5.9rem);
    line-height: .88;
  }

  .home-editorial .cinema-chapter {
    min-height: 0;
    padding-block: 92px;
  }

  .home-editorial .cinema-chapter__frame,
  .home-editorial .cinema-profile__layout {
    display: block;
  }

  .home-editorial .cinema-chapter__number {
    font-size: clamp(7rem, 38vw, 11rem);
  }

  .home-editorial .cinema-evidence-notes {
    grid-template-columns: 1fr;
  }

  .home-editorial .cinema-evidence-notes > div {
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid var(--cinema-rule);
  }

  .home-editorial .cinema-evidence-chain {
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
  }
}
```

Interactive links and menu controls remain at least 44 CSS pixels high where practical.

- [ ] **Step 8: Add explicit no-JavaScript, image-failure, and reduced-motion states**

```css
.home-editorial:not(.homepage-enhanced) .cinema-hero__layer:first-child {
  opacity: .34;
}

.home-editorial .home-evidence-media:not(.is-ready) > img {
  opacity: 0;
}

.home-editorial .home-evidence-media.is-ready > img {
  opacity: 1;
}

.home-editorial .home-evidence-media.is-ready .home-evidence-fallback {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .home-editorial *,
  .home-editorial *::before,
  .home-editorial *::after {
    scroll-behavior: auto !important;
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }

  .home-editorial .cinema-hero__layer {
    transform: none !important;
  }
}
```

- [ ] **Step 9: Run CSS contracts**

Run:

```bash
python -m pytest -q tests/test_homepage_editorial_contracts.py -k "styles or external or source"
```

Expected: CSS contracts pass; runtime-specific tests may still fail.

- [ ] **Step 10: Commit the visual system**

```bash
git add homepage-editorial.css
git commit -m "feat: create Evidence Cinema editorial visual system"
```

---

### Task 5: Refactor the Homepage Runtime Into Progressive Cinema Enhancement

**Files:**
- Modify: `homepage-editorial.js`

**Interfaces:**
- Consumes: `data-home-image`, `data-cinema-hero-layer`, `data-cinema-index-link`, `data-cinema-index-preview`, `data-cinema-chapter`, `data-cinema-stage`, `data-cinema-evidence-chain`, and `data-cinema-chain-stage`.
- Produces: `.homepage-enhanced`, `.is-active`, `.is-visible`, CSS custom properties `--cinema-pointer-x` and `--cinema-pointer-y`, hydrated evidence images, and lifecycle cleanup.

- [ ] **Step 1: Retain the proven evidence loader and rename only presentation selectors**

Keep these existing functions and behavior unless a focused test proves a bug:

```javascript
decodeBase64(encoded)
isValidWebP(bytes)
fetchEncoded(path)
buildSingleSource(path)
buildChunkedSource(paths)
sourceFor(key)
hydrateImage(image)
hydrateWithin(root)
installLazyEvidence()
```

Keep the existing asset maps exactly:

```javascript
const SINGLE_ASSETS = {
  classroom: "assets/project-evidence/classroom-demo-home-hd.b64.txt",
  carering: "assets/project-evidence/carering-prototype-collage.b64.txt",
};

const CHUNKED_ASSETS = {
  "trading-dashboard": [
    "assets/project-evidence/trading-dashboard-final.part-01.b64.txt",
    "assets/project-evidence/trading-dashboard-final.part-02.b64.txt",
    "assets/project-evidence/trading-dashboard-final.part-03.b64.txt",
    "assets/project-evidence/trading-dashboard-final.part-04.b64.txt",
    "assets/project-evidence/trading-dashboard-final.part-05.b64.txt",
  ],
};
```

Update `hydrateImage()` so it accepts `.cinema-evidence__media` as well as `.home-evidence-media`, and sets the fallback state on the nearest `.cinema-evidence` or `.home-evidence-figure`.

- [ ] **Step 2: Implement slow hero evidence cycling**

Add:

```javascript
function installHeroCinema() {
  const layers = [...document.querySelectorAll("[data-cinema-hero-layer]")];
  if (layers.length < 2) return () => {};

  let activeIndex = Math.max(0, layers.findIndex((layer) => layer.classList.contains("is-active")));
  let timer = 0;

  function activate(index) {
    activeIndex = (index + layers.length) % layers.length;
    layers.forEach((layer, layerIndex) => {
      layer.classList.toggle("is-active", layerIndex === activeIndex);
      layer.setAttribute("aria-hidden", "true");
      if (layerIndex === activeIndex) hydrateWithin(layer);
    });
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = 0;
  }

  function start() {
    stop();
    if (reducedMotion.matches || document.hidden) return;
    timer = window.setInterval(() => activate(activeIndex + 1), 9000);
  }

  activate(activeIndex);
  start();

  return () => stop();
}
```

Do not add controls because the atmospheric layers are decorative duplicates; the meaningful evidence is available in chapters. The 9-second transition must stop in background tabs and reduced-motion mode.

- [ ] **Step 3: Implement accessible index preview state without changing navigation**

Add:

```javascript
function installIndexPreview() {
  const links = [...document.querySelectorAll("[data-cinema-index-link]")];
  const preview = document.querySelector("[data-cinema-index-preview]");
  if (!preview || !links.length || !finePointer.matches || !desktopLayout.matches) return;

  function show(link) {
    const key = link.dataset.cinemaIndexLink;
    preview.dataset.cinemaPreview = key;
    preview.classList.add("is-visible");
    preview.setAttribute("aria-hidden", "true");
    preview.replaceChildren();

    if (["classroom", "trading-dashboard", "carering"].includes(key)) {
      const image = document.createElement("img");
      image.alt = "";
      image.dataset.homeImage = key;
      image.decoding = "async";
      preview.append(image);
      hydrateImage(image);
    }
  }

  function hide() {
    preview.classList.remove("is-visible");
  }

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => show(link));
    link.addEventListener("focus", () => show(link));
    link.addEventListener("mouseleave", hide);
    link.addEventListener("blur", hide);
  });
}
```

Before implementation, map project keys to evidence keys explicitly:

```javascript
const INDEX_PREVIEW_ASSETS = {
  "knowledge-reconstruction": "classroom",
  "trading-system": "trading-dashboard",
  carering: "carering",
};
```

Use `INDEX_PREVIEW_ASSETS[key]` in `show()`. Projects without real images receive a CSS/data-key diagram background, not a fabricated image.

- [ ] **Step 4: Implement chapter progress and evidence-chain activation**

Add:

```javascript
function installChapterProgress() {
  const chapters = [...document.querySelectorAll("[data-cinema-chapter]")];
  const chain = document.querySelector("[data-cinema-evidence-chain]");
  const chainStages = [...document.querySelectorAll("[data-cinema-chain-stage]")];
  if (!chapters.length || !chain || !("IntersectionObserver" in window)) return;

  const canonicalStages = ["IDEA", "STRUCTURE", "SYSTEM", "TEST", "EVIDENCE"];

  function activateChapter(chapter) {
    const stageTokens = new Set((chapter.dataset.cinemaStage || "").split(" · "));
    chapters.forEach((item) => item.classList.toggle("is-current", item === chapter));
    chainStages.forEach((item) => {
      const stage = item.dataset.cinemaChainStage;
      item.classList.toggle("is-active", stageTokens.has(stage));
    });
    chain.dataset.cinemaCurrentProject = chapter.dataset.cinemaChapter || "";
  }

  const observer = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
    if (current) activateChapter(current.target);
  }, { rootMargin: "-20% 0px -48%", threshold: [0.18, 0.35, 0.55] });

  chapters.forEach((chapter) => observer.observe(chapter));
}
```

`PROTOTYPE` and `PROCESS` are shown in the article stage text but do not falsely illuminate canonical `TEST` or `EVIDENCE` stages unless those tokens are present.

- [ ] **Step 5: Implement bounded desktop-only pointer depth**

Add:

```javascript
function installPointerDepth() {
  const hero = document.querySelector(".cinema-hero");
  if (!hero || reducedMotion.matches || !finePointer.matches || !desktopLayout.matches) return;

  let frame = 0;
  let nextX = 0;
  let nextY = 0;

  function render() {
    frame = 0;
    hero.style.setProperty("--cinema-pointer-x", `${nextX.toFixed(2)}px`);
    hero.style.setProperty("--cinema-pointer-y", `${nextY.toFixed(2)}px`);
  }

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    nextX = ((event.clientX - bounds.left) / bounds.width - .5) * 10;
    nextY = ((event.clientY - bounds.top) / bounds.height - .5) * 8;
    if (!frame) frame = window.requestAnimationFrame(render);
  }, { passive: true });

  hero.addEventListener("pointerleave", () => {
    nextX = 0;
    nextY = 0;
    if (!frame) frame = window.requestAnimationFrame(render);
  });
}
```

Maximum movement remains 5 px horizontally and 4 px vertically. Do not attach a document-wide pointer listener.

- [ ] **Step 6: Retain section navigation and add lifecycle pause/resume**

Keep `installSectionNavigation()` with the new anchors `#work`, `#profile`, and `#contact`. Initialize and clean up with:

```javascript
let stopHeroCinema = () => {};

function init() {
  if (!document.body.classList.contains("home-editorial")) return;
  document.body.classList.add("homepage-enhanced");
  installLazyEvidence();
  stopHeroCinema = installHeroCinema();
  installIndexPreview();
  installChapterProgress();
  installPointerDepth();
  installSectionNavigation();
}

function restartHeroCinema() {
  stopHeroCinema();
  stopHeroCinema = installHeroCinema();
}

reducedMotion.addEventListener?.("change", restartHeroCinema);
document.addEventListener("visibilitychange", restartHeroCinema);

window.addEventListener("pagehide", () => {
  stopHeroCinema();
  objectUrls.forEach((url) => URL.revokeObjectURL(url));
  objectUrls.clear();
}, { once: true });
```

Ensure repeated `visibilitychange` calls do not install duplicate listeners. `installHeroCinema()` may return only timer cleanup; the layer event setup itself must be idempotent or initialized once with a separate `startHeroTimer()` function. Prefer this safer structure:

```javascript
const heroController = createHeroCinemaController();
heroController.init();
document.addEventListener("visibilitychange", heroController.sync);
reducedMotion.addEventListener?.("change", heroController.sync);
```

where `createHeroCinemaController()` returns `{ init, sync, destroy }` and installs layer state once.

- [ ] **Step 7: Run JavaScript syntax and focused runtime contracts**

Run:

```bash
node --check homepage-editorial.js
python -m pytest -q tests/test_homepage_editorial_contracts.py -k "runtime or source or enhancement"
```

Expected: syntax passes; runtime, source, fallback, cleanup, and homepage-only enhancement tests pass.

- [ ] **Step 8: Commit the progressive enhancement runtime**

```bash
git add homepage-editorial.js
git commit -m "feat: add bounded Evidence Cinema interactions"
```

---

### Task 6: Complete Evidence Composition and Failure States

**Files:**
- Modify: `index.html`
- Modify: `en/index.html`
- Modify: `homepage-editorial.css`
- Modify: `homepage-editorial.js` only if a focused asset or failure test reveals a defect

**Interfaces:**
- Consumes: the three approved repository evidence sources and all chapter semantic structures.
- Produces: one meaningful content presentation per real evidence asset, decorative duplicates hidden from assistive technology, truthful diagrams for projects without public screenshots, and visible fallbacks for every failure path.

- [ ] **Step 1: Audit every evidence visual against the approved truth boundary**

Use exactly this asset policy:

```text
classroom-demo-home-hd.b64.txt
  meaningful chapter use: Classroom Knowledge Reconstruction System
  decorative duplicate use: hero and selected-work preview

trading-dashboard-final.part-01..05.b64.txt
  meaningful chapter use: Market Analysis and Risk Reporting System
  decorative duplicate use: hero and selected-work preview

carering-prototype-collage.b64.txt
  meaningful chapter use: CareRing structural prototype
  decorative duplicate use: hero and selected-work preview
```

No real image is assigned to lab platform, AI health concept, or AI workflow unless a repository file is independently verified as public and truthful during implementation. Those chapters use labeled diagrams and scope sheets.

- [ ] **Step 2: Ensure meaningful images have descriptive alt text and decorative duplicates have `alt=""`**

Required meaningful alt text:

```text
Chinese classroom: 课堂知识智能重构系统经过脱敏处理的本地运行首页
Chinese trading: 多周期行情分析与风控报告系统本地监控界面
Chinese CareRing: CareRing卡片侧插与扩展仓结构原型实拍拼图

English classroom: Privacy-reviewed local interface of the Classroom Knowledge Reconstruction System
English trading: Local monitoring interface of the Multi-timeframe Market Analysis and Risk Reporting System
English CareRing: Physical structural prototype collage showing the CareRing side-slot card and expansion compartment
```

Hero and index-preview images use empty alt because the same evidence is described later.

- [ ] **Step 3: Ensure every real-image container has a visible text fallback**

Every `.cinema-evidence__media` with `data-home-image` must contain `.home-evidence-fallback` with:

- project name;
- evidence type;
- statement that the visual failed to load;
- assurance that notes and the direct case link remain available.

Do not hide the `<figure>` or article when loading fails.

- [ ] **Step 4: Ensure conceptual diagrams remain legible without CSS background images**

Lab platform diagram text must include:

```text
团队门户 / 科研方向 / 文献学习 / 在线考核 / 项目展示 / 人才招募
Team portal / Research directions / Literature learning / Online assessment / Project showcase / Recruitment
```

AI health concept must include:

```text
健康记录 → 生活方式支持 → 艾灸管理场景 → 多设备协同构想
Health record → Lifestyle support → Moxibustion-management scenario → Multi-device concept
```

AI workflow must include:

```text
问题定义 → 需求拆解 → AI协作 → 软件操作 → 人工检查 → 最终成果
Problem definition → Requirement breakdown → AI collaboration → Software operation → Human review → Final artifact
```

- [ ] **Step 5: Extend the source/fallback contract**

Add or update:

```python
def test_evidence_cinema_uses_real_assets_only_where_supported() -> None:
    combined = "\n".join(read(path) for path in HOME_PAGES)
    assert combined.count('data-home-image="classroom"') >= 2
    assert combined.count('data-home-image="trading-dashboard"') >= 2
    assert combined.count('data-home-image="carering"') >= 2
    assert 'data-home-image="lab-platform"' not in combined
    assert 'data-home-image="ai-health-concept"' not in combined
    assert 'data-home-image="ai-workflow"' not in combined
    assert combined.count("home-evidence-fallback") >= 6
```

- [ ] **Step 6: Run focused evidence tests**

Run:

```bash
python -m pytest -q tests/test_homepage_editorial_contracts.py -k "evidence or truth or source or fallback"
node --check homepage-editorial.js
```

Expected: all evidence, truth, source, alt, and fallback assertions pass.

- [ ] **Step 7: Commit the evidence composition pass**

```bash
git add index.html en/index.html homepage-editorial.css homepage-editorial.js tests/test_homepage_editorial_contracts.py
git commit -m "fix: align Evidence Cinema visuals with public proof"
```

---

### Task 7: Verify Compatibility, Accessibility, and Responsive Contracts

**Files:**
- Modify only when a failing contract identifies a real defect: `index.html`, `en/index.html`, `homepage-editorial.css`, `homepage-editorial.js`, `script.js`
- Test: `tests/test_homepage_editorial_contracts.py`
- Test: `tests/test_scroll_storytelling_contracts.py`

**Interfaces:**
- Consumes: complete implementation from Tasks 2–6.
- Produces: regression-safe integration with the existing static site.

- [ ] **Step 1: Verify the legacy motion isolation remains unchanged**

Run:

```bash
python -m pytest -q tests/test_homepage_editorial_contracts.py -k "legacy_motion or enhancement"
```

Expected: `script.js` still contains:

```javascript
const isEditorialHome = document.body?.classList.contains("home-editorial");
```

and does not load `motion.js` or `motion.css` when `isEditorialHome` is true. Do not edit `script.js` merely to rename the new visual direction; the body retains `home-editorial` for compatibility.

- [ ] **Step 2: Add heading-order and landmark assertions if absent**

The parser should collect `h1`, `h2`, `main`, `nav`, `section`, `article`, and footer presence. Require:

```python
assert source.count("<main") == 1
assert source.count("<footer") == 1
assert source.count("<article") >= 6
assert source.index("<h1") < source.index("<h2")
assert 'aria-label="项目证据阶段"' in chinese
assert 'aria-label="Project evidence stages"' in english
```

- [ ] **Step 3: Verify keyboard and focus behavior from source**

Confirm:

- all index entries are native anchors;
- all case links are native anchors;
- mobile menu remains a real button with `aria-expanded` and `aria-controls`;
- no tablist or roving tabindex remains from the old shared-stage interaction;
- focus-visible is defined for links and buttons;
- no JavaScript calls `.focus()` or changes `tabindex` for chapter browsing.

Add source contracts for these conditions.

- [ ] **Step 4: Verify anchor offsets and sticky rail behavior**

CSS must include:

```css
.home-editorial [id] {
  scroll-margin-top: 124px;
}
```

At mobile widths, reduce the rail height or offset so anchor targets are not hidden. The evidence chain may become horizontally scrollable, but content navigation must remain native.

- [ ] **Step 5: Run the full local verification matrix**

Run:

```bash
python -m pytest -q tests
python -m compileall -q tests
node --check script.js
node --check homepage-editorial.js
node --check identity-overrides.js
node --check bilingual-runtime.js
node --check motion.js
node --check resume-entry.js
node --check resume-print.js
node --check project-evidence.js
node --check trading-evidence-final.js
```

Expected: all tests pass, Python test sources compile, and every JavaScript file passes syntax checking.

- [ ] **Step 6: Run the forbidden-dependency and domain checks locally**

Run:

```bash
python - <<'PY'
from pathlib import Path
import re

forbidden_literals = (
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "cdnjs",
    "jsdelivr",
    "unpkg",
)
wheel_listener = re.compile(r"addEventListener\s*\(\s*['\"]wheel")
mandatory_snap = re.compile(r"scroll-snap-type\s*:\s*y\s+mandatory", re.I)

failures = []
for suffix in ("*.html", "*.css", "*.js"):
    for path in Path(".").rglob(suffix):
        text = path.read_text(encoding="utf-8")
        lowered = text.lower()
        if any(item in lowered for item in forbidden_literals):
            failures.append(f"external runtime dependency: {path}")
        if wheel_listener.search(text):
            failures.append(f"wheel listener: {path}")
        if mandatory_snap.search(text):
            failures.append(f"mandatory scroll snap: {path}")

if failures:
    raise SystemExit("\n".join(failures))
PY

test "$(tr -d '\r\n' < CNAME)" = "www.universitydepartment.store"
```

Expected: no output from the Python scan and a zero exit status from the CNAME check.

- [ ] **Step 7: Commit compatibility fixes only if files changed**

```bash
git add index.html en/index.html homepage-editorial.css homepage-editorial.js script.js tests
git commit -m "test: verify Evidence Cinema compatibility and accessibility"
```

If no fixes were needed, do not create an empty commit.

---

### Task 8: Update CI Coverage and Open a Draft Pull Request

**Files:**
- Modify: `.github/workflows/scroll-storytelling-checks.yml`

**Interfaces:**
- Consumes: verified branch implementation.
- Produces: branch CI and a reviewable draft PR without merging.

- [ ] **Step 1: Add the feature branch to push-trigger coverage**

Add under `on.push.branches`:

```yaml
      - design/evidence-cinema-v2
```

Retain pull-request coverage for `main`, full pytest, Python compilation, all JavaScript syntax checks, forbidden dependency scan, and CNAME verification.

- [ ] **Step 2: Run the full verification matrix once more**

Run:

```bash
python -m pytest -q tests
python -m compileall -q tests
node --check homepage-editorial.js
```

Expected: all checks pass before the workflow commit.

- [ ] **Step 3: Commit the CI update**

```bash
git add .github/workflows/scroll-storytelling-checks.yml
git commit -m "ci: verify Evidence Cinema homepage redesign"
```

- [ ] **Step 4: Push the branch and open a draft pull request**

Use:

```text
Title: Redesign bilingual homepages as Evidence Cinema
Base: main
Head: design/evidence-cinema-v2
Draft: true
```

PR body:

```markdown
## Summary

- Replace the current shared-stage portfolio homepage with the approved Evidence Cinema editorial narrative.
- Introduce one cinematic hero, one selected-work contents page, six complete project chapters, an evidence-chain rail, an editorial profile, and a decisive contact ending.
- Preserve truthful project maturity, bilingual parity, existing routes, no-JavaScript content, reduced-motion behavior, and dependency-free static delivery.
- Reuse only privacy-reviewed classroom, trading, and CareRing evidence; projects without public imagery use explicitly labeled diagrams rather than fabricated screenshots.

## Verification

- Full `pytest` suite
- Python test compilation
- JavaScript syntax checks
- Forbidden external dependency, wheel listener, and mandatory scroll-snap scan
- CNAME verification

## Visual Review Gate

This PR must remain unmerged until a human browser review checks approximately 1440 px, 1024 px, 768 px, 390 px, and 320 px widths, plus keyboard navigation, reduced motion, and failed-image fallbacks.
```

- [ ] **Step 5: Confirm GitHub Actions passes on the exact PR head SHA**

Fetch the workflow runs for the PR head commit. Require:

```text
status: completed
conclusion: success
```

If CI fails, inspect the failed job log, apply the smallest root-cause fix on the same branch, rerun the full local checks, and push the correction.

- [ ] **Step 6: Commit nothing further until the visual review**

The draft PR is the handoff point. Do not mark ready or merge solely because CI passes.

---

### Task 9: Human Browser Review and Merge Gate

**Files:**
- Modify only if review finds a real defect: homepage HTML, CSS, JavaScript, or contracts.

**Interfaces:**
- Consumes: draft PR with passing CI.
- Produces: visually reviewed, ready-for-review PR; merge only on explicit user approval.

- [ ] **Step 1: Review the Chinese and English homepages at representative widths**

Check:

```text
1440 px desktop
1024 px compact desktop/tablet landscape
768 px tablet portrait
390 px mobile
320 px minimum width
```

At each width verify:

- hero headline is dominant and not accidentally clipped;
- supporting copy remains readable;
- hero actions are visible without competing with the headline;
- selected-work index text is never obscured by previews;
- every chapter has distinct but coherent composition;
- meaningful evidence is legible at least once;
- evidence notes and limitations remain visually attached to the correct project;
- profile and contact sections feel like the same publication system;
- no horizontal overflow exists except the intentionally scrollable mobile evidence chain;
- Chinese and English hierarchy remain equivalent despite different line wrapping.

- [ ] **Step 2: Review interaction and failure modes**

Verify:

```text
keyboard-only navigation
visible focus states
mobile menu open/close
prefers-reduced-motion: reduce
JavaScript disabled
one evidence asset returning 404
background-tab pause and resume
coarse pointer / touch device behavior
```

Expected:

- no content becomes unreachable;
- no focus is moved automatically;
- no wheel behavior is intercepted;
- hero cycling stops under reduced motion and in hidden tabs;
- failed imagery shows text fallbacks without collapsing chapters;
- touch layouts do not depend on hover or pointer depth.

- [ ] **Step 3: Fix only observed defects and rerun all checks**

For each visual defect:

1. record viewport and observed failure;
2. write or strengthen a contract when the defect is source-testable;
3. apply the smallest HTML/CSS/JS fix;
4. run focused tests;
5. run the full suite;
6. commit with a defect-specific message.

- [ ] **Step 4: Mark the PR ready only after visual approval**

Require all of:

```text
CI success on current head
Chinese visual approval
English visual approval
mobile approval
keyboard approval
reduced-motion approval
failure-state approval
```

- [ ] **Step 5: Merge only after explicit user instruction**

Use squash merge with the current expected head SHA. Report the final merge commit and confirm the PR shows `merged: true`.

---

## Plan Self-Review

- Spec coverage: hero, index, six project chapters, evidence chain, profile, contact, color, typography, image treatment, motion, responsive behavior, accessibility, technical architecture, error handling, performance, SEO, testing, visual review, and merge gate are each assigned to a concrete task.
- Placeholder scan: no `TBD`, `TODO`, `implement later`, or unspecified error-handling step remains.
- Interface consistency: project keys, stages, asset keys, release token, data attributes, CSS classes, and JavaScript function names are defined once and reused consistently.
- Scope check: the plan changes only bilingual homepage files, page-scoped CSS and JavaScript, homepage contracts, and CI. Project detail pages, resume pages, backend, analytics, CMS, and domain remain out of scope.
