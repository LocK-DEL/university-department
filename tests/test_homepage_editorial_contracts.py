from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HOME_PAGES = (Path("index.html"), Path("en/index.html"))
PROJECT_ROUTES = (
    "knowledge-reconstruction.html",
    "trading-system.html",
    "lab-platform.html",
    "ai-health-concept.html",
    "carering.html",
    "ai-workflow.html",
)
PUBLIC_EMAIL = "liuwenlong0706@outlook.com"
HOME_RELEASE = "20260801-home1"


class HeadingParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.h1_count = 0
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {name: value or "" for name, value in attrs}
        if tag == "h1":
            self.h1_count += 1
        if values.get("id"):
            self.ids.add(values["id"])


def read(relative_path: Path | str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def parse(source: str) -> HeadingParser:
    parser = HeadingParser()
    parser.feed(source)
    return parser


def test_bilingual_home_pages_use_the_editorial_surface() -> None:
    for path in HOME_PAGES:
        source = read(path)
        document = parse(source)

        assert 'class="home-editorial"' in source
        assert f'homepage-editorial.css?v={HOME_RELEASE}' in source
        assert f'homepage-editorial.js?v={HOME_RELEASE}' in source
        assert source.count("data-home-project-trigger") == 6
        assert source.count("data-home-stage-panel") == 6
        assert document.h1_count == 1
        assert {"home", "work", "method", "profile", "contact"}.issubset(document.ids)
        assert source.index("skip-link") < source.index("site-header")


def test_home_pages_keep_all_routes_actions_and_public_contact() -> None:
    chinese = read("index.html")
    english = read("en/index.html")

    for slug in PROJECT_ROUTES:
        assert f'href="projects/{slug}"' in chinese
        assert f'href="projects/{slug}"' in english

    assert 'href="resume.html"' in chinese
    assert 'href="resume.html"' in english
    assert 'href="https://github.com/LocK-DEL"' in chinese
    assert 'href="https://github.com/LocK-DEL"' in english
    assert PUBLIC_EMAIL in chinese
    assert PUBLIC_EMAIL in english
    assert 'href="en/"' in chinese
    assert 'href="../"' in english


def test_language_control_is_integrated_and_prevents_runtime_duplication() -> None:
    for path in HOME_PAGES:
        source = read(path)
        assert 'class="language-switcher language-switch"' in source
        assert "language-switcher--standalone" not in source
        assert source.count('class="language-switcher language-switch"') == 1


def test_template_like_homepage_patterns_are_removed() -> None:
    combined = "\n".join(read(path) for path in HOME_PAGES)
    for forbidden in (
        "capability-panel",
        "hero-panel",
        "button-disabled",
        "简历整理中",
        "Resume coming soon",
        "<AI />",
    ):
        assert forbidden not in combined


def test_homepage_status_copy_preserves_truth_boundaries() -> None:
    chinese = read("index.html")
    english = read("en/index.html")

    for required in (
        "49项测试通过",
        "36项测试通过",
        "公开构建证据准备中",
        "产品概念",
        "结构原型",
        "工作流案例合集",
        "不构成投资建议",
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
        "Not investment advice",
        "does not validate health functions",
    ):
        assert required in english


def test_homepage_runtime_is_bounded_accessible_and_reduced_motion_aware() -> None:
    runtime = read("homepage-editorial.js")

    for required in (
        "prefers-reduced-motion: reduce",
        "IntersectionObserver",
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
        "aria-selected",
        "classroom-demo-home-hd.b64.txt",
        "trading-dashboard-final.part-01.b64.txt",
        "carering-prototype-collage.b64.txt",
        "pagehide",
    ):
        assert required in runtime

    assert 'addEventListener("wheel"' not in runtime
    assert "scroll-snap-type" not in runtime
    assert "cursor" not in runtime.lower() or "cursor-follow" not in runtime.lower()


def test_homepage_styles_define_editorial_tokens_and_mobile_evidence() -> None:
    styles = read("homepage-editorial.css")

    for required in (
        "--home-ink: #07100f",
        "--home-paper: #edf1ec",
        "--home-signal: #9fe870",
        "--home-mineral: #69bfd6",
        "--home-project-transition: 360ms",
        "@media (max-width: 767px)",
        "@media (prefers-reduced-motion: reduce)",
        ".home-project-mobile-evidence",
        ".home-project-stage",
        ":focus-visible",
    ):
        assert required in styles

    assert "purple" not in styles.lower()
    assert "violet" not in styles.lower()
    assert "scroll-snap-type" not in styles


def test_legacy_motion_is_disabled_only_for_editorial_home_pages() -> None:
    script = read("script.js")

    assert 'const isEditorialHome = document.body?.classList.contains("home-editorial")' in script
    assert "if (!isEditorialHome)" in script
    assert 'new URL("motion.js", loaderScript.src)' in script
    assert 'new URL("motion.css", loaderScript.src)' in script


def test_homepage_enhancement_is_loaded_only_on_home_pages() -> None:
    for path in HOME_PAGES:
        assert "homepage-editorial.js" in read(path)

    non_home_pages = (
        Path("resume.html"),
        Path("en/resume.html"),
        *(Path("projects") / route for route in PROJECT_ROUTES),
        *(Path("en/projects") / route for route in PROJECT_ROUTES),
    )
    for path in non_home_pages:
        assert "homepage-editorial.js" not in read(path), path


def test_homepage_contracts_keep_canonical_domain_and_no_external_runtime_assets() -> None:
    assert read("CNAME").strip() == "www.universitydepartment.store"
    combined = "\n".join(read(path) for path in HOME_PAGES)
    forbidden = (
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "cdnjs",
        "jsdelivr",
        "unpkg",
        "google-analytics",
        "googletagmanager",
    )
    assert not any(value in combined.lower() for value in forbidden)


def test_homepage_source_has_descriptive_evidence_alt_text_and_fallbacks() -> None:
    combined = "\n".join(read(path) for path in HOME_PAGES)
    assert combined.count("data-home-image") >= 6
    assert combined.count("home-evidence-fallback") >= 6
    assert not re.search(r'<img(?:(?!alt=)[^>])*>', combined, re.I)
