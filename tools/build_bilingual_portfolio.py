from __future__ import annotations

import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOST = "https://www.universitydepartment.store"
EMAIL = "liuwenlong0706@outlook.com"
SLUGS = (
    "knowledge-reconstruction", "trading-system", "lab-platform",
    "ai-health-concept", "carering", "ai-workflow",
)
PROJECTS = {
    "knowledge-reconstruction": (
        "Intelligent Classroom Knowledge Reconstruction System", "EDTECH AI · LOCAL PROTOTYPE",
        "A local Flask prototype connecting transcription, NLP extraction, knowledge graphs and AI-assisted question generation.",
        "Python · Flask · Whisper · NLP · Knowledge Graph · Pytest",
        "49 automated tests passed; local frontend, backend and offline-safe mode verified.",
        "Public evidence is sanitized. Student identities, identity-document filenames, private configuration, paths, source classroom data and original audio are not published.",
    ),
    "trading-system": (
        "Multi-Timeframe Market Analysis and Risk Reporting System", "MARKET ANALYSIS · RISK SYSTEM",
        "A Python CLI that organizes public 15-minute, 1-hour and 4-hour data into conditional scenarios, invalidation rules, risk calculations and Markdown reports.",
        "Python · Pandas · NumPy · Requests · Pytest · REST API",
        "36 offline tests passed; public-data adapters and local report generation are implemented.",
        "This project is not investment advice. It has no account access, order execution, performance claim or return guarantee.",
    ),
    "lab-platform": (
        "Digital Research Laboratory Platform", "RESEARCH PLATFORM · WEB PROJECT",
        "A responsive research-team portal for laboratory information, research directions, literature learning, assessment and recruitment.",
        "Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion",
        "Frontend structure reviewed; sanitized public build evidence is still being prepared.",
        "The original project includes real team information. Public screenshots and source packaging require authorization and privacy cleanup.",
    ),
    "ai-health-concept": (
        "AI Health Management Product Concept", "HEALTH AI · PRODUCT CONCEPT",
        "A product and competition concept covering health records, lifestyle support, moxibustion management, risk notices and multi-device scenarios.",
        "AI Product Design · User Flow · Health Technology · HarmonyOS Concept",
        "Product proposal completed; no verified runnable application or online demo is claimed.",
        "This is not a diagnostic system and cannot replace professional medical assessment or advice.",
    ),
    "carering": (
        "CareRing Smart Health Wristband", "SMART WEARABLE · PATENT PROTOTYPE",
        "A structural and patent-prototype project exploring wearable layout, SOS interaction, a detachable cartridge, atomization architecture and CAD automation.",
        "Shapr3D · SolidWorks · Python · CAD · Patent Drawings",
        "Three Shapr3D files, eight STL files and 29 structural or patent images were reviewed across V1 to V7 iterations.",
        "Hardware, firmware, health data and the mobile application are not validated; public material is limited by intellectual-property boundaries.",
    ),
    "ai-workflow": (
        "AI-Assisted Research and Intelligent Modeling Workflow", "AI COLLABORATION · AUTOMATION WORKFLOW",
        "A collection of real AI collaboration cases covering requirement decomposition, controlled execution, SolidWorks automation and patent-drawing processing.",
        "Codex · Python · SolidWorks API · C# · Automation · Acceptance Testing",
        "Real task records, scripts, models and image-processing outputs exist; this is not one installable product.",
        "Third-party tools are workflow foundations, not original source claims. Private paths and unpublished design details remain excluded.",
    ),
}

SEO_A = "<!-- bilingual-seo:start -->"
SEO_B = "<!-- bilingual-seo:end -->"
SW_A = "<!-- language-switcher:start -->"
SW_B = "<!-- language-switcher:end -->"


def save(path: str, text: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text.rstrip() + "\n", encoding="utf-8")


def url(route: str) -> str:
    return HOST + route


def head(title: str, desc: str, zh: str, en: str, css: tuple[str, ...]) -> str:
    styles = "\n".join(f'    <link rel="stylesheet" href="{x}">' for x in css)
    return f'''    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{escape(desc, quote=True)}">
    <meta property="og:title" content="{escape(title, quote=True)}">
    <meta property="og:description" content="{escape(desc, quote=True)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <title>{escape(title)}</title>
    <link rel="canonical" href="{url(en)}">
    <link rel="alternate" hreflang="zh-CN" href="{url(zh)}">
    <link rel="alternate" hreflang="en" href="{url(en)}">
    <link rel="alternate" hreflang="x-default" href="{url(zh)}">
{styles}'''


def switch(zh_href: str, en_href: str, current: str) -> str:
    z = ' aria-current="page"' if current == "zh" else ""
    e = ' aria-current="page"' if current == "en" else ""
    return f'''{SW_A}
    <nav class="language-switcher language-switcher--standalone" aria-label="Language">
        <a class="language-switcher__link" href="{zh_href}" lang="zh-CN"{z}>中文</a>
        <span class="language-switcher__separator" aria-hidden="true">|</span>
        <a class="language-switcher__link" href="{en_href}" lang="en"{e}>EN</a>
    </nav>
{SW_B}'''


def patch(path: str, zh: str, en: str, en_href: str, css: str, key: str | None = None) -> None:
    p = ROOT / path
    s = p.read_text(encoding="utf-8")
    s = re.sub(rf"\s*{re.escape(SEO_A)}.*?{re.escape(SEO_B)}\s*", "\n", s, flags=re.S)
    s = re.sub(rf"\s*{re.escape(SW_A)}.*?{re.escape(SW_B)}\s*", "\n", s, flags=re.S)
    block = f'''{SEO_A}
    <link rel="canonical" href="{url(zh)}">
    <link rel="alternate" hreflang="zh-CN" href="{url(zh)}">
    <link rel="alternate" hreflang="en" href="{url(en)}">
    <link rel="alternate" hreflang="x-default" href="{url(zh)}">
    <link rel="stylesheet" href="{css}">
{SEO_B}'''
    s = s.replace("</head>", block + "\n</head>", 1)
    m = re.search(r"<body(?:\s[^>]*)?>", s)
    if not m:
        raise RuntimeError(path)
    self_href = Path(path).name
    s = s[:m.end()] + "\n" + switch(self_href, en_href, "zh") + s[m.end():]
    if key:
        s = re.sub(r'<main class="project-page" id="main-content"(?: data-project-key="[^"]+")?>',
                   f'<main class="project-page" id="main-content" data-project-key="{key}">', s, count=1)
    p.write_text(s.rstrip() + "\n", encoding="utf-8")


def site_header(home: str) -> str:
    return f'''    <header class="site-header"><nav class="navbar container" aria-label="Primary navigation">
        <a class="brand" href="{home}#home"><span class="brand-name">David Liu</span><span class="brand-subtitle">AI Application Portfolio</span></a>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-navigation"><span></span><span></span><span></span></button>
        <ul class="nav-links" id="primary-navigation"><li><a href="{home}#home">Home</a></li><li><a href="{home}#about">About</a></li><li><a href="{home}#skills">Skills</a></li><li><a href="{home}#projects">Projects</a></li><li><a href="{home}#experience">Experience</a></li><li><a href="{home}#contact">Contact</a></li></ul>
    </nav></header>'''


def footer() -> str:
    return '''    <footer class="site-footer"><div class="container"><p>© <span id="current-year">2026</span> David Liu. Personal AI project portfolio.</p></div></footer>
    <button class="back-to-top" type="button" aria-label="Back to top"><span aria-hidden="true">↑</span></button>'''


def home() -> str:
    cards = []
    for slug in SLUGS:
        title, label, summary, tech, status, _ = PROJECTS[slug]
        cards.append(f'''                <article class="project-card"><div class="project-visual" aria-hidden="true"><span class="project-visual-mark">{escape(label.split(" · ")[0])}</span></div><div class="project-content">
                    <p class="project-category">{escape(label)}</p><h3>{escape(title)}</h3><p class="project-description">{escape(summary)}</p>
                    <ul class="tag-list"><li>{escape(tech.split(" · ")[0])}</li><li>{escape(tech.split(" · ")[1])}</li></ul>
                    <div class="project-meta"><span class="project-status">{escape(status)}</span><a class="project-action project-action--active" href="projects/{slug}.html">View details</a></div>
                </div></article>''')
    return f'''<!DOCTYPE html>
<html lang="en"><head>
{head("David Liu | AI Application and Product Portfolio", "Bilingual portfolio covering AI applications, web development, research digitalization, automation, market-analysis software and smart-hardware prototypes.", "/", "/en/", ("../style.css", "../bilingual.css"))}
</head><body>
{switch("../", "index.html", "en")}
    <a class="skip-link" href="#main-content">Skip to main content</a>
{site_header("index.html")}
    <main id="main-content">
        <section class="hero" id="home"><div class="container hero-layout"><div class="hero-content"><p class="eyebrow">AI APPLICATION · PRODUCT · RESEARCH</p><h1>David Liu<br><span>Building useful systems across AI, research and engineering.</span></h1><p class="hero-description">Rehabilitation-therapy undergraduate and independent project builder with hands-on work in AI applications, web platforms, automation, research workflows, market-analysis software and structural prototypes.</p><div class="hero-actions"><a class="button button-primary" href="#projects">Explore projects</a><a class="button button-secondary" href="resume.html">Public resume</a></div></div><aside class="hero-panel"><p>Current focus</p><strong>AI applications and product delivery</strong><span>Requirements · Prototypes · Testing · Documentation · Deployment</span></aside></div></section>
        <section class="section" id="about"><div class="container about-layout"><div class="section-heading"><p>About</p><h2>Cross-domain execution with clear evidence boundaries</h2></div><div class="about-copy"><p>I work from problem definition to a testable deliverable across healthcare education, research management, web engineering, data analysis and CAD automation.</p><p>AI tools support implementation and investigation; I retain responsibility for scope, privacy, risk controls and final acceptance.</p></div></div></section>
        <section class="section section-tinted" id="skills"><div class="container"><div class="section-heading"><p>Capabilities</p><h2>What I can contribute</h2></div><div class="skills-grid"><article class="skill-card"><h3>AI applications</h3><p>Prompt design, model API integration, RAG foundations and local prototypes.</p></article><article class="skill-card"><h3>Web engineering</h3><p>HTML, CSS, JavaScript, React, Next.js and responsive static delivery.</p></article><article class="skill-card"><h3>Python and automation</h3><p>CLI tools, Flask, data processing, tests and engineering scripts.</p></article><article class="skill-card"><h3>Product delivery</h3><p>Requirements, information architecture, prototypes, acceptance and documentation.</p></article></div></div></section>
        <section class="section" id="projects"><div class="container"><div class="section-heading"><p>Selected Work</p><h2>Projects with explicit verification and limitations</h2></div><div class="projects-grid">{''.join(cards)}</div></div></section>
        <section class="section section-tinted" id="experience"><div class="container"><div class="section-heading"><p>Experience</p><h2>Project and research practice</h2></div><div class="timeline"><article class="timeline-item"><span class="timeline-marker"></span><div><h3>AI application and web projects</h3><p>Requirements, AI-assisted implementation, integration, testing and deployment across local systems and websites.</p></div></article><article class="timeline-item"><span class="timeline-marker"></span><div><h3>Research coordination</h3><p>Herbal extraction, antibacterial experiments, bioinformatics and medical research workflow organization.</p></div></article></div></div></section>
        <section class="section contact-section" id="contact"><div class="contact-panel container"><div><div class="section-heading"><p>Contact</p><h2>Opportunities and collaboration</h2></div><p class="contact-copy">Open to AI application, product, web-development and cross-domain innovation opportunities.</p></div><div class="contact-actions"><a class="contact-link" href="https://github.com/LocK-DEL" target="_blank" rel="noopener noreferrer"><span>GitHub</span><strong>github.com/LocK-DEL</strong></a><a class="contact-link" href="mailto:{EMAIL}"><span>Email</span><strong>{EMAIL}</strong></a><a class="button button-primary" href="resume.html">Public resume</a></div></div></section>
    </main>
{footer()}
    <script src="../script.js"></script>
</body></html>'''


def resume() -> str:
    return f'''<!DOCTYPE html>
<html lang="en"><head>
{head("David Liu | Public Resume", "Public resume focused on AI application development, AI product work, web development, research digitalization and automation.", "/resume.html", "/en/resume.html", ("../style.css", "../resume.css", "../resume-print.css", "../bilingual.css"))}
</head><body class="resume-page">
{switch("../resume.html", "resume.html", "en")}
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header"><nav class="navbar container"><a class="brand" href="index.html"><span class="brand-name">David Liu</span><span class="brand-subtitle">Public Resume</span></a><div class="resume-page-actions"><a class="button button-secondary" href="index.html">Portfolio</a><button class="button button-primary" type="button" data-print-resume>Print / Save PDF</button></div></nav></header>
    <main id="main-content"><section class="resume-page-hero"><div class="container"><p class="eyebrow">PUBLIC RESUME · 2026</p><h1>David Liu<br><span>AI application and product practice</span></h1><p class="resume-page-hero__summary">Rehabilitation-therapy undergraduate with practical experience in AI applications, web development, research digitalization and automation. Able to move from requirement decomposition to prototype development, integration, testing, documentation and deployment.</p><div class="resume-page-actions"><button class="button button-primary" type="button" data-print-resume>Print / Save PDF</button><a class="button button-secondary" href="https://github.com/LocK-DEL">GitHub</a><a class="button button-secondary" href="mailto:{EMAIL}">Email</a></div></div></section>
    <section class="resume-document"><div class="container resume-document__layout"><aside class="resume-document__rail"><p class="eyebrow">PROFILE</p><h2>Job focus</h2><ul><li>AI application development / AI product assistant / frontend development</li><li>Shenzhen preferred; open to Xi'an or remote work</li><li>BSc candidate in Rehabilitation Therapy, Ankang University</li><li>College English Test Band 4</li></ul></aside><div>
    <section class="resume-block"><p class="resume-block__eyebrow">Capabilities</p><h2>Core capabilities</h2><div class="resume-list"><article><h3>AI applications</h3><p>GPT, Claude, DeepSeek, Codex and Cursor; prompt design, RAG foundations and model integration.</p></article><article><h3>Development</h3><p>Python, HTML, CSS, JavaScript, React, Next.js, FastAPI foundations, SQLite, Git and GitHub.</p></article><article><h3>Product delivery</h3><p>Requirement analysis, feature planning, prototypes, tests, deployment documentation and privacy boundaries.</p></article></div></section>
    <section class="resume-block"><p class="resume-block__eyebrow">Selected Projects</p><h2>Project work</h2><div class="resume-list"><article><h3>Classroom Knowledge Reconstruction</h3><p>Local Flask prototype with 49 tests passed.</p></article><article><h3>Market Analysis and Risk Reporting</h3><p>Python CLI with 36 tests passed and no order execution.</p></article><article><h3>Digital Research Laboratory Platform</h3><p>Next.js and TypeScript research portal.</p></article><article><h3>CareRing</h3><p>Structural and patent-prototype work without validated health-hardware claims.</p></article></div></section>
    <section class="resume-block"><p class="resume-block__eyebrow">Leadership</p><h2>Research and project leadership</h2><div class="resume-list"><article><h3>Research experiment group deputy lead</h3><p>Coordinated tasks, experimental progress, data organization and team communication.</p></article><article><h3>Competition project department lead</h3><p>Organized project positioning, product concepts, presentation material and delivery.</p></article><article><h3>Medical observation</h3><p>Built awareness of clinical contexts, user safety and professional boundaries.</p></article></div></section>
    </div></div></section></main>
{footer()}
    <script src="../resume-print.js"></script><script src="../script.js"></script>
</body></html>'''


def project(slug: str) -> str:
    title, label, summary, tech, status, boundary = PROJECTS[slug]
    i = SLUGS.index(slug)
    prev_slug, next_slug = SLUGS[i - 1], SLUGS[(i + 1) % len(SLUGS)]
    features = (
        "Problem and scope definition", "Modular workflow design", "AI-assisted implementation",
        "Testing and evidence review", "Privacy and risk boundaries", "Iterative documentation",
    )
    cards = ''.join(f'<article class="project-feature-card"><span class="feature-index">0{n}</span><h3>{x}</h3><p>This capability is implemented or documented according to the verified project status above.</p></article>' for n, x in enumerate(features, 1))
    steps = ''.join(f'<div class="project-flow-step">{x}</div>' + ('<span class="project-flow-arrow">→</span>' if n < 6 else '') for n, x in enumerate(("Define", "Design", "Build", "Test", "Review", "Document"), 1))
    tags = ''.join(f'<li>{escape(x)}</li>' for x in tech.split(' · '))
    return f'''<!DOCTYPE html>
<html lang="en"><head>
{head(f"{title} | David Liu Portfolio", summary, f"/projects/{slug}.html", f"/en/projects/{slug}.html", ("../../style.css", "../../project.css", "../../bilingual.css"))}
</head><body>
{switch(f"../../projects/{slug}.html", f"{slug}.html", "en")}
    <a class="skip-link" href="#main-content">Skip to main content</a>
{site_header("../index.html")}
    <main class="project-page" id="main-content" data-project-key="{slug}"><section class="project-hero"><div class="container"><nav class="project-breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="../index.html#projects">Projects</a><span>/</span><span>{escape(title)}</span></nav><p class="project-label">{escape(label)}</p><h1 class="project-title">{escape(title)}</h1><p class="project-summary">{escape(summary)}</p><div class="project-overview-grid"><div class="project-fact-card"><span>Status</span><strong class="status-badge">{escape(status)}</strong></div><div class="project-fact-card"><span>Role</span><strong>Independent project owner</strong></div><div class="project-fact-card"><span>Delivery</span><strong>Prototype, concept or workflow evidence</strong></div><div class="project-fact-card"><span>Boundary</span><strong>Claims limited to reviewed evidence</strong></div></div></div></section>
    <section class="project-section" id="project-details"><div class="container"><div class="project-section-heading"><p>Background</p><h2>Positioning and problem</h2></div><p>{escape(summary)} The work separates requirements, implementation, testing and public evidence so the project can be evaluated without overstating its maturity.</p></div></section>
    <section class="project-section"><div class="container"><div class="project-section-heading"><p>Core Scope</p><h2>Features and engineering scope</h2></div><div class="project-feature-grid">{cards}</div></div></section>
    <section class="project-section"><div class="container"><div class="project-section-heading"><p>My Role</p><h2>Responsibilities</h2></div><div class="project-content-grid"><ul class="responsibility-list"><li>Defined requirements and acceptance criteria.</li><li>Designed the workflow and information structure.</li><li>Used AI tools for implementation, debugging or investigation.</li><li>Reviewed outputs and documented limitations.</li></ul><p class="responsibility-note">AI assistance does not replace responsibility for requirements, safety boundaries, testing or final acceptance.</p></div></div></section>
    <section class="project-section"><div class="container"><div class="project-section-heading"><p>Workflow</p><h2>Project workflow</h2></div><div class="project-flow">{steps}</div></div></section>
    <section class="project-section"><div class="container"><div class="project-section-heading"><p>Tech Stack</p><h2>Technology and methods</h2></div><ul class="tech-stack-list">{tags}</ul></div></section>
    <section class="project-section" data-verification-section><div class="container"><div class="project-section-heading"><p>Verification</p><h2>Current verification status</h2></div><div class="verification-panel"><p>{escape(status)}</p><ul class="verification-status-list"><li><span>Evidence statement</span><strong>Reviewed</strong></li><li><span>Public source</span><strong>Limited or pending</strong></li><li><span>Online demo</span><strong>Not claimed unless explicitly shown</strong></li></ul></div></div></section>
    <section class="project-section"><div class="container"><aside class="privacy-note"><h3>Limitations and safety boundary</h3><p>{escape(boundary)}</p></aside></div></section>
    <nav class="project-navigation container"><div class="project-return-links"><a class="project-back-link" href="../index.html">Return home</a><a class="project-back-link" href="../index.html#projects">All projects</a></div><div class="project-sequence-links"><a class="project-back-link" href="{prev_slug}.html">← Previous: {escape(PROJECTS[prev_slug][0])}</a><a class="project-back-link project-back-link--next" href="{next_slug}.html">Next: {escape(PROJECTS[next_slug][0])} →</a></div></nav></main>
{footer()}
    <script src="../../script.js"></script>
</body></html>'''


CSS = '''
.language-switcher{display:inline-flex;align-items:center;gap:.48rem;padding:.42rem .68rem;border:1px solid var(--border);border-radius:999px;background:rgba(7,17,31,.92);color:var(--muted);font-size:.78rem;font-weight:700;letter-spacing:.05em}.language-switcher--standalone{position:fixed;top:16px;right:18px;z-index:1400;box-shadow:0 12px 30px rgba(0,0,0,.22)}.language-switcher__link{color:inherit;text-decoration:none}.language-switcher__link:hover,.language-switcher__link:focus-visible,.language-switcher__link[aria-current="page"]{color:var(--text)}.language-switcher__link:not([aria-current="page"]){opacity:.72}.language-switcher__separator{color:var(--border)}.project-visual-mark{max-width:85%;color:var(--accent);font-family:Consolas,monospace;font-size:.72rem;font-weight:750;letter-spacing:.08em;text-align:center}@media(max-width:768px){.language-switcher--standalone{top:auto;right:14px;bottom:14px}}@media print{.language-switcher{display:none!important}}
'''


def main() -> None:
    patch("index.html", "/", "/en/", "en/", "bilingual.css")
    patch("resume.html", "/resume.html", "/en/resume.html", "en/resume.html", "bilingual.css")
    for slug in SLUGS:
        patch(f"projects/{slug}.html", f"/projects/{slug}.html", f"/en/projects/{slug}.html", f"../en/projects/{slug}.html", "../bilingual.css", slug)
    save("bilingual.css", CSS)
    save("en/index.html", home())
    save("en/resume.html", resume())
    for slug in SLUGS:
        save(f"en/projects/{slug}.html", project(slug))


if __name__ == "__main__":
    main()
