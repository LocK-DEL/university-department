from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
RELEASE_TOKEN = "v=20260731-1"
FINAL_EMAIL = "liuwenlong0706@outlook.com"
FINAL_TRADING_TITLE = "多周期行情分析与风控报告金融交易系统"
STALE_PUBLIC_VALUES = (
    "3501391833@qq.com",
    "BTC多周期行情分析与风控报告系统",
    "BTC分析系统",
)
PUBLIC_PAGES = (
    "index.html",
    "resume.html",
    "projects/knowledge-reconstruction.html",
    "projects/trading-system.html",
    "projects/lab-platform.html",
    "projects/ai-health-concept.html",
    "projects/carering.html",
    "projects/ai-workflow.html",
)
LOCAL_ASSET_RE = re.compile(
    r'(?:href|src)=["\']((?!https?://|//)[^"\']+\.(?:css|js)(?:\?[^"\']*)?)["\']'
)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_first_html_paint_contains_final_public_values_without_runtime_replacement():
    pages = "\n".join(read(path) for path in PUBLIC_PAGES)
    script = read("script.js")

    assert FINAL_EMAIL in pages
    assert FINAL_TRADING_TITLE in read("index.html")
    assert FINAL_TRADING_TITLE in read("projects/trading-system.html")

    for stale in STALE_PUBLIC_VALUES:
        assert stale not in pages
        assert stale not in script

    assert "identity-overrides.js" not in script
    assert not (ROOT / "identity-overrides.js").exists()


def test_every_local_css_and_javascript_reference_is_release_versioned():
    failures = []
    for page in PUBLIC_PAGES:
        for asset in LOCAL_ASSET_RE.findall(read(page)):
            if RELEASE_TOKEN not in asset:
                failures.append((page, asset))

    assert not failures, failures


def test_dynamic_assets_share_the_same_release_version():
    script = read("script.js")
    assert 'const RELEASE_VERSION = "20260731-1";' in script
    assert 'url.searchParams.set("v", RELEASE_VERSION);' in script
    assert 'versionedUrl("motion.css")' in script
    assert 'versionedUrl("project-evidence.js")' in script
    assert 'versionedUrl("trading-evidence-final.js")' in script


def test_domain_and_public_routes_remain_stable():
    assert read("CNAME").strip() == "www.universitydepartment.store"
    for page in PUBLIC_PAGES:
        assert (ROOT / page).is_file(), page
