from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RELEASE = "20260731-en1"

PAGES = [
    ROOT / "index.html",
    ROOT / "resume.html",
    *(ROOT / "projects").glob("*.html"),
    ROOT / "en" / "index.html",
    ROOT / "en" / "resume.html",
    *(ROOT / "en" / "projects").glob("*.html"),
]

LOCAL_ASSET = re.compile(r'(?P<prefix>\b(?:href|src)=")(?P<url>(?!https?:|//|mailto:|#)[^"?]+\.(?:css|js))(?P<suffix>")')


def version_assets(source: str) -> str:
    def replace(match: re.Match[str]) -> str:
        return f'{match.group("prefix")}{match.group("url")}?v={RELEASE}{match.group("suffix")}'

    return LOCAL_ASSET.sub(replace, source)


def finalize_page(path: Path) -> None:
    source = path.read_text(encoding="utf-8")
    source = version_assets(source)

    if path == ROOT / "en" / "projects" / "knowledge-reconstruction.html":
        source = source.replace(
            "A local Flask prototype connecting transcription, NLP extraction, knowledge graphs and AI-assisted question generation.",
            "A local FastAPI and React prototype connecting transcription, NLP extraction, knowledge graphs and AI-assisted question generation.",
        )
        source = source.replace("<li>Flask</li>", "<li>FastAPI</li><li>React</li>")

    if path == ROOT / "en" / "resume.html":
        source = source.replace(
            "Local Flask prototype with 49 tests passed.",
            "Local FastAPI and React prototype with 49 tests passed.",
        )

    path.write_text(source, encoding="utf-8")


def main() -> None:
    missing = [str(path.relative_to(ROOT)) for path in PAGES if not path.is_file()]
    if missing:
        raise SystemExit(f"Missing bilingual pages: {missing}")

    for page in PAGES:
        finalize_page(page)

    for cache_file in (ROOT / "tools").glob("__pycache__/*.pyc"):
        cache_file.unlink()
    cache_dir = ROOT / "tools" / "__pycache__"
    if cache_dir.exists() and not any(cache_dir.iterdir()):
        cache_dir.rmdir()

    for page in PAGES:
        source = page.read_text(encoding="utf-8")
        local_assets = LOCAL_ASSET.findall(source)
        if local_assets:
            raise SystemExit(f"Unversioned local assets remain in {page.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
