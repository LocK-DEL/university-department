from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
HOST = "https://www.universitydepartment.store"
EMAIL = "liuwenlong0706@outlook.com"
RELEASE = "20260731-en1"

PAIRS = {
    "index.html": "en/index.html",
    "resume.html": "en/resume.html",
    "projects/knowledge-reconstruction.html": "en/projects/knowledge-reconstruction.html",
    "projects/trading-system.html": "en/projects/trading-system.html",
    "projects/lab-platform.html": "en/projects/lab-platform.html",
    "projects/ai-health-concept.html": "en/projects/ai-health-concept.html",
    "projects/carering.html": "en/projects/carering.html",
    "projects/ai-workflow.html": "en/projects/ai-workflow.html",
}

CJK = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff]")


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.html_lang = ""
        self.links: list[str] = []
        self.canonicals: list[str] = []
        self.alternates: dict[str, str] = {}
        self.meta: dict[str, str] = {}
        self.title = ""
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        if tag == "html":
            self.html_lang = values.get("lang", "")
        elif tag == "a":
            self.links.append(values.get("href", ""))
        elif tag == "link":
            rel = values.get("rel", "")
            if rel == "canonical":
                self.canonicals.append(values.get("href", ""))
            if rel == "alternate":
                self.alternates[values.get("hreflang", "")] = values.get("href", "")
        elif tag == "meta":
            key = values.get("name") or values.get("property")
            if key:
                self.meta[key] = values.get("content", "")
        elif tag == "title":
            self._in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data


def parse(path: Path) -> DocumentParser:
    parser = DocumentParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def resolve_internal(source: Path, href: str) -> Path | None:
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:")):
        return None
    split = urlsplit(href)
    if split.scheme or split.netloc:
        return None
    target = (source.parent / split.path).resolve()
    if split.path.endswith("/"):
        target /= "index.html"
    return target


def test_all_english_pages_exist_and_use_english_language() -> None:
    for english in PAIRS.values():
        path = ROOT / english
        assert path.is_file(), english
        document = parse(path)
        assert document.html_lang == "en", english
        assert document.title.strip(), english
        assert document.meta.get("description", "").strip(), english
        assert document.meta.get("og:title", "").strip(), english
        assert document.meta.get("og:description", "").strip(), english


def test_english_pages_contain_only_intentional_chinese_language_label() -> None:
    for english in PAIRS.values():
        source = (ROOT / english).read_text(encoding="utf-8")
        cleaned = source.replace("中文", "")
        match = CJK.search(cleaned)
        assert match is None, f"Unexpected Chinese character {match.group()!r} in {english}"


def test_english_pages_have_canonical_and_hreflang_pairs() -> None:
    for chinese, english in PAIRS.items():
        document = parse(ROOT / english)
        public_english = "/en/" if english == "en/index.html" else f"/{english}"
        public_chinese = "/" if chinese == "index.html" else f"/{chinese}"
        assert document.canonicals == [f"{HOST}{public_english}"], english
        assert document.alternates == {
            "zh-CN": f"{HOST}{public_chinese}",
            "en": f"{HOST}{public_english}",
            "x-default": f"{HOST}{public_chinese}",
        }, english


def test_each_english_page_links_to_its_chinese_counterpart() -> None:
    for chinese, english in PAIRS.items():
        source = ROOT / english
        document = parse(source)
        resolved_links = {resolve_internal(source, href) for href in document.links}
        assert (ROOT / chinese).resolve() in resolved_links, english


def test_all_english_internal_links_resolve() -> None:
    for english in PAIRS.values():
        source = ROOT / english
        for href in parse(source).links:
            target = resolve_internal(source, href)
            if target is not None:
                assert target.exists(), f"{english}: broken link {href} -> {target.relative_to(ROOT)}"


def test_public_email_is_consistent() -> None:
    home = (ROOT / "en/index.html").read_text(encoding="utf-8")
    resume = (ROOT / "en/resume.html").read_text(encoding="utf-8")
    assert EMAIL in home
    assert EMAIL in resume
    assert "3501391833@qq.com" not in home + resume


def test_resume_print_and_shared_runtime_are_loaded_with_release_token() -> None:
    resume = (ROOT / "en/resume.html").read_text(encoding="utf-8")
    assert f"../resume-print.js?v={RELEASE}" in resume
    assert f"../script.js?v={RELEASE}" in resume
    for english in PAIRS.values():
        source = (ROOT / english).read_text(encoding="utf-8")
        assert RELEASE in source, english


def test_project_pages_use_stable_project_keys() -> None:
    expected = {
        "knowledge-reconstruction.html": "knowledge-reconstruction",
        "trading-system.html": "trading-system",
        "lab-platform.html": "lab-platform",
        "ai-health-concept.html": "ai-health-concept",
        "carering.html": "carering",
        "ai-workflow.html": "ai-workflow",
    }
    for filename, key in expected.items():
        source = (ROOT / "en/projects" / filename).read_text(encoding="utf-8")
        assert f'data-project-key="{key}"' in source
        assert "Current validation status" in source


def test_shared_evidence_runtime_supports_english_pages() -> None:
    script = (ROOT / "script.js").read_text(encoding="utf-8")
    project_evidence = (ROOT / "project-evidence.js").read_text(encoding="utf-8")
    trading_evidence = (ROOT / "trading-evidence-bilingual.js").read_text(encoding="utf-8")
    runtime = (ROOT / "bilingual-runtime.js").read_text(encoding="utf-8")
    assert 'assetUrl("bilingual-runtime.js")' in script
    assert 'assetUrl("project-evidence.js")' in script
    assert 'assetUrl("trading-evidence-bilingual.js")' in script
    assert "Verified interface evidence" in project_evidence
    assert "Verified runtime interfaces" in trading_evidence
    assert "Current validation status" in runtime


def test_language_route_mapping_covers_all_page_pairs() -> None:
    runtime = (ROOT / "identity-overrides.js").read_text(encoding="utf-8")
    for chinese, english in PAIRS.items():
        chinese_route = "/" if chinese == "index.html" else f"/{chinese}"
        english_route = "/en/" if english == "en/index.html" else f"/{english}"
        assert f'["{chinese_route}", "{english_route}"]' in runtime
        assert f'["{english_route}", "{chinese_route}"]' in runtime


def test_domain_remains_unchanged() -> None:
    assert (ROOT / "CNAME").read_text(encoding="utf-8").strip() == "www.universitydepartment.store"
