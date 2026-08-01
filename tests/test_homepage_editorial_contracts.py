from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HOME_PAGES = (Path("index.html"), Path("en/index.html"))
HOME_RELEASE = "20260801-cinema1"
PUBLIC_EMAIL = "liuwenlong0706@outlook.com"
PROJECTS = (
    ("knowledge-reconstruction", "SYSTEM · TEST · EVIDENCE"),
    ("trading-system", "SYSTEM · TEST · EVIDENCE"),
    ("lab-platform", "STRUCTURE · SYSTEM"),
    ("ai-health-concept", "IDEA · STRUCTURE"),
    ("carering", "STRUCTURE · PROTOTYPE"),
    ("ai-workflow", "PROCESS · EVIDENCE"),
)


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.h1_count = 0
        self.ids: set[str] = set()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {name: value or "" for name, value in attrs}
        if tag == "h1":
            self.h1_count += 1
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "a" and values.get("href"):
            self.links.append(values["href"])


def read(relative_path: Path | str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def parse(source: str) -> DocumentParser:
    parser = DocumentParser()
    parser.feed(source)
    return parser


def test_bilingual_home_pages_use_the_evidence_cinema_surface() -> None:
    for path in HOME_PAGES:
        source = read(path)
        document = parse(source)

        assert 'class="home-editorial evidence-cinema"' in source
        assert f'homepage-editorial.css?v={HOME_RELEASE}' in source
        assert f'homepage-editorial.js?v={HOME_RELEASE}' in source
        assert source.count("data-cinema-hero-layer") >= 3
        assert source.count("data-cinema-project") == 6
        assert source.count("data-cinema-index-link") == 6
        assert source.count("data-cinema-stage") >= 24
        assert document.h1_count == 1
        assert {"home", "work", "method", "profile", "contact"}.issubset(document.ids)
        assert source.index("skip-link") < source.index("site-header")


def test_evidence_chain_and_project_order_are_shared_across_languages() -> None:
    for path in HOME_PAGES:
        source = read(path)
        assert "IDEA" in source
        assert "STRUCTURE" in source
        assert "SYSTEM" in source
        assert "TEST" in source
        assert "EVIDENCE" in source

        previous = -1
        for key, stages in PROJECTS:
            marker = f'data-project-key="{key}"'
            position = source.index(marker)
            assert position > previous
            previous = position
            assert stages in source
            assert f'projects/{key}.html' in source


def test_home_pages_keep_routes_actions_language_and_public_contact() -> None:
    chinese = read("index.html")
    english = read("en/index.html")

    for slug, _ in PROJECTS:
        assert f'href="projects/{slug}.html"' in chinese
        assert f'href="projects/{slug}.html"' in english

    for source in (chinese, english):
        assert 'href="resume.html"' in source
        assert 'href="https://github.com/LocK-DEL"' in source
        assert PUBLIC_EMAIL in source
        assert source.count('class="language-switcher language-switch"') == 1

    assert 'href="en/"' in chinese
    assert 'href="../"' in english


def test_hero_and_contact_copy_match_the_approved_narrative() -> None:
    chinese = read("index.html")
    english = read("en/index.html")

    assert "FROM UNFINISHED IDEAS TO EVIDENCE" in chinese
    assert "把尚未成形的构想，做成可以运行、测试与验证的现实" in chinese
    assert "让下一个想法，成为可以验证的现实" in chinese

    assert "FROM UNFINISHED IDEAS TO EVIDENCE" in english
    assert "I BUILD BETWEEN DISCIPLINES" in english
    assert "LET'S TURN THE NEXT IDEA INTO EVIDENCE" in english


def test_truth_boundaries_remain_explicit_in_both_languages() -> None:
    chinese = read("index.html")
    english = read("en/index.html")

    for required in (
        "49项测试通过",
        "36项测试通过",
        "公开构建证据准备中",
        "产品概念",
        "结构原型",
        "工作流案例合集",
        "未声称已被学校正式部署",
        "不构成投资建议或收益证明",
        "不是已验证的医疗产品",
        "不代表健康功能已验证",
    ):
        assert required in chinese

    for required in (
        "49 tests passed",
        "36 tests passed",
        "Public build evidence in preparation",
        "Product concept",
        "Structural prototype",
        "Workflow case collection",
        "No formal institutional deployment is claimed",
        "Not investment advice or evidence of returns",
        "not a validated medical product",
        "does not validate health functions",
    ):
        assert required in english


def test_complete_project_content_exists_without_javascript() -> None:
    for path in HOME_PAGES:
        source = read(path)
        assert source.count('<article class="cinema-project"') == 6
        assert source.count("cinema-project__value") == 6
        assert source.count("cinema-evidence-note") >= 12
        assert source.count("cinema-limit-note") >= 5
        assert "hidden" not in "\n".join(
            line for line in source.splitlines() if "cinema-project" in line
        )


def test_runtime_is_progressive_bounded_and_lifecycle_safe() -> None:
    runtime = read("homepage-editorial.js")

    for required in (
        "prefers-reduced-motion: reduce",
        "IntersectionObserver",
        "visibilitychange",
        "pagehide",
        "data-cinema-hero-layer",
        "data-cinema-index-link",
        "data-cinema-project",
        "requestAnimationFrame",
        "URL.revokeObjectURL",
        "classroom-demo-home-hd.b64.txt",
        "trading-dashboard-final.part-01.b64.txt",
        "carering-prototype-collage.b64.txt",
    ):
        assert required in runtime

    assert not re.search(r'addEventListener\s*\(\s*["\']wheel["\']', runtime)
    assert "scrollIntoView" not in runtime
    assert "WebGL" not in runtime
    assert "three.js" not in runtime.lower()
    assert "gsap" not in runtime.lower()


def test_styles_define_cinema_tokens_compositions_and_accessibility() -> None:
    styles = read("homepage-editorial.css")

    for required in (
        "--cinema-ink:",
        "--cinema-paper:",
        "--cinema-signal:",
        ".cinema-hero",
        ".cinema-index",
        ".cinema-project",
        ".cinema-chain",
        ".cinema-contact",
        ":focus-visible",
        "@media (max-width: 900px)",
        "@media (max-width: 767px)",
        "@media (prefers-reduced-motion: reduce)",
    ):
        assert required in styles

    lowered = styles.lower()
    assert "purple" not in lowered
    assert "violet" not in lowered
    assert "scroll-snap-type" not in lowered
    assert "@import" not in lowered


def test_metadata_domain_and_external_dependency_contracts() -> None:
    assert read("CNAME").strip() == "www.universitydepartment.store"
    chinese = read("index.html")
    english = read("en/index.html")

    assert 'rel="canonical" href="https://www.universitydepartment.store/"' in chinese
    assert 'rel="canonical" href="https://www.universitydepartment.store/en/"' in english
    assert 'hreflang="zh-CN"' in chinese and 'hreflang="en"' in chinese
    assert 'hreflang="zh-CN"' in english and 'hreflang="en"' in english

    combined = "\n".join((chinese, english, read("homepage-editorial.css"), read("homepage-editorial.js"))).lower()
    for forbidden in (
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "cdnjs",
        "jsdelivr",
        "unpkg",
        "googletagmanager",
        "google-analytics",
    ):
        assert forbidden not in combined


def test_images_have_alt_text_fallbacks_and_lazy_loading() -> None:
    combined = "\n".join(read(path) for path in HOME_PAGES)
    assert combined.count("data-home-image") >= 8
    assert combined.count("cinema-media-fallback") >= 8
    assert combined.count('loading="lazy"') >= 6
    assert not re.search(r'<img(?:(?!alt=)[^>])*>', combined, re.I)


def test_legacy_motion_remains_isolated_to_non_home_pages() -> None:
    script = read("script.js")
    assert 'const isEditorialHome = document.body?.classList.contains("home-editorial")' in script
    assert "if (!isEditorialHome)" in script
    assert 'new URL("motion.js", loaderScript.src)' in script
    assert 'new URL("motion.css", loaderScript.src)' in script
