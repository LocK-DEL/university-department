from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

import pytest

ROOT = Path(__file__).resolve().parents[1]
HOST = "https://www.universitydepartment.store"
PUBLIC_EMAIL = "liuwenlong0706@outlook.com"
RELEASE = "20260731-en1"

PAGE_PAIRS = (
    {
        "zh": Path("index.html"),
        "en": Path("en/index.html"),
        "zh_route": "/",
        "en_route": "/en/",
        "zh_to_en": "en/",
        "en_to_zh": "../",
    },
    {
        "zh": Path("resume.html"),
        "en": Path("en/resume.html"),
        "zh_route": "/resume.html",
        "en_route": "/en/resume.html",
        "zh_to_en": "en/resume.html",
        "en_to_zh": "../resume.html",
    },
    *(
        {
            "zh": Path(f"projects/{name}.html"),
            "en": Path(f"en/projects/{name}.html"),
            "zh_route": f"/projects/{name}.html",
            "en_route": f"/en/projects/{name}.html",
            "zh_to_en": f"../en/projects/{name}.html",
            "en_to_zh": f"../../projects/{name}.html",
        }
        for name in (
            "knowledge-reconstruction",
            "trading-system",
            "lab-platform",
            "ai-health-concept",
            "carering",
            "ai-workflow",
        )
    ),
)

ENGLISH_PAGES = tuple(pair["en"] for pair in PAGE_PAIRS)
CHINESE_PAGES = tuple(pair["zh"] for pair in PAGE_PAIRS)
PROJECT_KEYS = {
    "knowledge-reconstruction": "knowledge-reconstruction",
    "trading-system": "trading-system",
    "lab-platform": "lab-platform",
    "ai-health-concept": "ai-health-concept",
    "carering": "carering",
    "ai-workflow": "ai-workflow",
}
CJK_RE = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff]")


class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.hrefs: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        for name, value in attrs:
            if name == "href" and value is not None:
                self.hrefs.append(value)


def read(relative_path: Path | str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def hrefs_from(source: str) -> list[str]:
    parser = LinkCollector()
    parser.feed(source)
    return parser.hrefs


def resolve_internal_target(page: Path, href: str) -> Path | None:
    parsed = urlsplit(href)
    if parsed.scheme or parsed.netloc:
        return None
    if href.startswith(("mailto:", "tel:", "javascript:")):
        return None
    path_text = unquote(parsed.path)
    if not path_text:
        return None

    target = (ROOT / page.parent / path_text).resolve()
    root = ROOT.resolve()
    assert target == root or root in target.parents, f"link escapes repository: {page} -> {href}"
    if path_text.endswith("/") or target.is_dir():
        target = target / "index.html"
    return target


@pytest.mark.parametrize("relative_path", ENGLISH_PAGES)
def test_english_page_exists_and_declares_english(relative_path: Path) -> None:
    path = ROOT / relative_path
    assert path.exists(), relative_path
    source = path.read_text(encoding="utf-8")
    assert '<html lang="en">' in source


@pytest.mark.parametrize("relative_path", CHINESE_PAGES)
def test_existing_chinese_page_remains_intact(relative_path: Path) -> None:
    path = ROOT / relative_path
    assert path.exists(), relative_path
    source = path.read_text(encoding="utf-8")
    assert '<html lang="zh-CN">' in source


@pytest.mark.parametrize("pair", PAGE_PAIRS)
def test_each_language_pair_links_directly_to_its_counterpart(pair: dict[str, object]) -> None:
    zh_source = read(pair["zh"])
    en_source = read(pair["en"])
    assert f'href="{pair["zh_to_en"]}"' in zh_source
    assert f'href="{pair["en_to_zh"]}"' in en_source
    assert "中文" in zh_source and ">EN<" in zh_source
    assert "中文" in en_source and ">EN<" in en_source


@pytest.mark.parametrize("pair", PAGE_PAIRS)
def test_each_pair_has_canonical_and_alternate_metadata(pair: dict[str, object]) -> None:
    zh_source = read(pair["zh"])
    en_source = read(pair["en"])
    zh_url = f"{HOST}{pair['zh_route']}"
    en_url = f"{HOST}{pair['en_route']}"

    assert f'rel="canonical" href="{zh_url}"' in zh_source
    assert f'rel="canonical" href="{en_url}"' in en_source

    for source in (zh_source, en_source):
        assert f'rel="alternate" hreflang="zh-CN" href="{zh_url}"' in source
        assert f'rel="alternate" hreflang="en" href="{en_url}"' in source
        assert f'rel="alternate" hreflang="x-default" href="{zh_url}"' in source


@pytest.mark.parametrize("relative_path", ENGLISH_PAGES)
def test_english_pages_have_language_specific_metadata(relative_path: Path) -> None:
    source = read(relative_path)
    assert '<meta name="description" content="' in source
    assert "<title>" in source and "</title>" in source
    assert '<meta property="og:title" content="' in source
    assert '<meta property="og:description" content="' in source
    assert '<meta property="og:locale" content="en_US">' in source


@pytest.mark.parametrize("relative_path", ENGLISH_PAGES)
def test_english_html_source_contains_no_unintended_chinese(relative_path: Path) -> None:
    source = read(relative_path).replace("中文", "")
    assert not CJK_RE.search(source), relative_path


@pytest.mark.parametrize("relative_path", ENGLISH_PAGES)
def test_all_english_internal_links_resolve(relative_path: Path) -> None:
    source = read(relative_path)
    for href in hrefs_from(source):
        target = resolve_internal_target(relative_path, href)
        if target is not None:
            assert target.exists(), f"broken link: {relative_path} -> {href}"


def test_public_email_is_consistent_in_english_home_and_resume() -> None:
    assert PUBLIC_EMAIL in read("en/index.html")
    assert PUBLIC_EMAIL in read("en/resume.html")
    assert "3501391833@qq.com" not in read("en/index.html")
    assert "3501391833@qq.com" not in read("en/resume.html")


def test_english_resume_preserves_print_behavior() -> None:
    source = read("en/resume.html")
    assert source.count("data-print-resume") >= 2
    assert f'src="../resume-print.js?v={RELEASE}"' in source
    assert 'href="../resume.html"' in source


@pytest.mark.parametrize("slug,project_key", PROJECT_KEYS.items())
def test_project_pages_use_stable_identifiers(slug: str, project_key: str) -> None:
    zh_source = read(f"projects/{slug}.html")
    en_source = read(f"en/projects/{slug}.html")
    marker = f'data-project-key="{project_key}"'
    assert marker in zh_source
    assert marker in en_source


def test_shared_project_evidence_supports_both_locales() -> None:
    loader = read("script.js")
    evidence = read("project-evidence.js")
    trading = read("trading-evidence-final.js")

    assert 'new URL("project-evidence.js", loaderScript.src)' in loader
    assert 'new URL("trading-evidence-final.js", loaderScript.src)' in loader
    assert "dataset.projectKey" in evidence
    assert "dataset.projectKey" in trading
    assert "document.documentElement.lang" in evidence
    assert "document.documentElement.lang" in trading
    assert 'new URL("assets/project-evidence/' in evidence
    assert 'new URL("assets/project-evidence/' in trading


def test_language_control_is_explicit_and_not_runtime_translation() -> None:
    for relative_path in ENGLISH_PAGES + CHINESE_PAGES:
        source = read(relative_path)
        assert 'class="language-switcher' in source
        assert "translate.google" not in source.lower()
        assert "translation api" not in source.lower()


def test_forbidden_external_localization_dependencies_are_absent() -> None:
    combined = "\n".join(read(path) for path in ENGLISH_PAGES)
    forbidden = (
        "translate.googleapis.com",
        "google-translate",
        "i18next",
        "lingui",
        "lokalise",
        "weglot",
    )
    assert not any(item in combined.lower() for item in forbidden)


def test_cname_remains_exact() -> None:
    assert read("CNAME").strip() == "www.universitydepartment.store"
