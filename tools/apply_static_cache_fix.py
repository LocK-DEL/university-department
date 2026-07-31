from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
VERSION = "20260731-1"
FINAL_EMAIL = "liuwenlong0706@outlook.com"
FINAL_TRADING_TITLE = "多周期行情分析与风控报告金融交易系统"
REPLACEMENTS = (
    ("3501391833@qq.com", FINAL_EMAIL),
    ("BTC多周期行情分析与风控报告系统", FINAL_TRADING_TITLE),
    ("BTC分析系统", "金融交易系统"),
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
    r'((?:href|src)=["\'])(?!https?://|//|mailto:|#)([^"\']+\.(?:css|js))(?:\?[^"\']*)?(["\'])'
)


def write_if_changed(path: Path, content: str) -> None:
    original = path.read_text(encoding="utf-8")
    if original != content:
        path.write_text(content, encoding="utf-8")


def update_public_html() -> None:
    for relative_path in PUBLIC_PAGES:
        path = ROOT / relative_path
        text = path.read_text(encoding="utf-8")
        for stale, final in REPLACEMENTS:
            text = text.replace(stale, final)
        text = LOCAL_ASSET_RE.sub(
            lambda match: f'{match.group(1)}{match.group(2)}?v={VERSION}{match.group(3)}',
            text,
        )
        write_if_changed(path, text)


def update_loader() -> None:
    path = ROOT / "script.js"
    original = path.read_text(encoding="utf-8")
    marker = '\n\ndocument.addEventListener("DOMContentLoaded", () => {'
    if marker not in original:
        raise RuntimeError("Could not locate the stable DOMContentLoaded boundary in script.js")
    remainder = original[original.index(marker):]
    loader = '''(() => {
    const loaderScript = document.currentScript || [...document.scripts].find((script) => /(?:^|\\/)script\\.js(?:\\?|$)/.test(script.src));

    if (loaderScript) {
        const RELEASE_VERSION = "20260731-1";
        const versionedUrl = (path) => {
            const url = new URL(path, loaderScript.src);
            url.searchParams.set("v", RELEASE_VERSION);
            return url.href;
        };
        const styleUrl = versionedUrl("motion.css");
        const timelineFixUrl = versionedUrl("timeline-fix.css");
        const projectLinksFixUrl = versionedUrl("desktop-project-links.css");
        const resumeStyleUrl = versionedUrl("resume.css");
        const resumeEntryUrl = versionedUrl("resume-entry.js");
        const evidenceStyleUrl = versionedUrl("project-evidence.css");
        const evidenceRuntimeUrl = versionedUrl("project-evidence.js");
        const tradingEvidenceRuntimeUrl = versionedUrl("trading-evidence-final.js");
        const runtimeUrl = versionedUrl("motion.js");

        if (!document.querySelector('[data-motion-asset="style"]')) {
            const stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.href = styleUrl;
            stylesheet.dataset.motionAsset = "style";
            document.head.appendChild(stylesheet);
        }

        if (!document.querySelector('[data-motion-asset="timeline-fix"]')) {
            const timelineFix = document.createElement("link");
            timelineFix.rel = "stylesheet";
            timelineFix.href = timelineFixUrl;
            timelineFix.dataset.motionAsset = "timeline-fix";
            document.head.appendChild(timelineFix);
        }

        if (!document.querySelector('[data-motion-asset="project-links-fix"]')) {
            const projectLinksFix = document.createElement("link");
            projectLinksFix.rel = "stylesheet";
            projectLinksFix.href = projectLinksFixUrl;
            projectLinksFix.dataset.motionAsset = "project-links-fix";
            document.head.appendChild(projectLinksFix);
        }

        if (!document.querySelector('[data-resume-asset="style"]')) {
            const resumeStyle = document.createElement("link");
            resumeStyle.rel = "stylesheet";
            resumeStyle.href = resumeStyleUrl;
            resumeStyle.dataset.resumeAsset = "style";
            document.head.appendChild(resumeStyle);
        }

        if (!document.querySelector('[data-resume-asset="entry"]')) {
            const resumeEntry = document.createElement("script");
            resumeEntry.src = resumeEntryUrl;
            resumeEntry.async = false;
            resumeEntry.dataset.resumeAsset = "entry";
            document.head.appendChild(resumeEntry);
        }

        if (!document.querySelector('[data-project-evidence-asset="style"]')) {
            const evidenceStyle = document.createElement("link");
            evidenceStyle.rel = "stylesheet";
            evidenceStyle.href = evidenceStyleUrl;
            evidenceStyle.dataset.projectEvidenceAsset = "style";
            document.head.appendChild(evidenceStyle);
        }

        if (!document.querySelector('[data-project-evidence-asset="runtime"]')) {
            const evidenceRuntime = document.createElement("script");
            evidenceRuntime.src = evidenceRuntimeUrl;
            evidenceRuntime.async = false;
            evidenceRuntime.dataset.projectEvidenceAsset = "runtime";
            document.head.appendChild(evidenceRuntime);
        }

        if (!document.querySelector('[data-project-evidence-asset="trading-runtime"]')) {
            const tradingEvidenceRuntime = document.createElement("script");
            tradingEvidenceRuntime.src = tradingEvidenceRuntimeUrl;
            tradingEvidenceRuntime.async = false;
            tradingEvidenceRuntime.dataset.projectEvidenceAsset = "trading-runtime";
            document.head.appendChild(tradingEvidenceRuntime);
        }

        if (!document.querySelector('[data-motion-asset="runtime"]')) {
            const runtime = document.createElement("script");
            runtime.src = runtimeUrl;
            runtime.async = false;
            runtime.dataset.motionAsset = "runtime";
            document.head.appendChild(runtime);
        }
    }
})();'''
    write_if_changed(path, loader + remainder)


def update_identity_contract() -> None:
    path = ROOT / "tests/test_identity_overrides.py"
    content = '''from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PAGES = (
    "index.html",
    "resume.html",
    "projects/trading-system.html",
)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_requested_identity_values_are_static_on_first_paint():
    pages = "\\n".join(read(path) for path in PUBLIC_PAGES)
    assert "liuwenlong0706@outlook.com" in pages
    assert "多周期行情分析与风控报告金融交易系统" in read("index.html")
    assert "多周期行情分析与风控报告金融交易系统" in read("projects/trading-system.html")
    assert "3501391833@qq.com" not in pages
    assert "BTC多周期行情分析与风控报告系统" not in pages


def test_post_paint_identity_override_runtime_is_removed():
    script = read("script.js")
    assert "identity-overrides.js" not in script
    assert 'data-identity-asset="runtime"' not in script
    assert not (ROOT / "identity-overrides.js").exists()


def test_cname_remains_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
'''
    path.write_text(content, encoding="utf-8")


def update_ci() -> None:
    path = ROOT / ".github/workflows/scroll-storytelling-checks.yml"
    text = path.read_text(encoding="utf-8")
    text = text.replace("          node --check identity-overrides.js\n", "")
    write_if_changed(path, text)


def remove_obsolete_files() -> None:
    for relative_path in (
        "identity-overrides.js",
        "tools/apply_static_cache_fix.py",
        ".github/workflows/apply-static-cache-fix.yml",
    ):
        path = ROOT / relative_path
        if path.exists():
            path.unlink()


def verify_migration_shape() -> None:
    public_text = "\n".join((ROOT / path).read_text(encoding="utf-8") for path in PUBLIC_PAGES)
    script = (ROOT / "script.js").read_text(encoding="utf-8")
    for stale, _ in REPLACEMENTS:
        if stale in public_text or stale in script:
            raise RuntimeError(f"Stale public value remains after migration: {stale}")
    if "identity-overrides.js" in script or (ROOT / "identity-overrides.js").exists():
        raise RuntimeError("Obsolete identity runtime remains after migration")
    if (ROOT / "CNAME").read_text(encoding="utf-8").strip() != "www.universitydepartment.store":
        raise RuntimeError("CNAME changed unexpectedly")


if __name__ == "__main__":
    update_public_html()
    update_loader()
    update_identity_contract()
    update_ci()
    verify_migration_shape()
    remove_obsolete_files()
'''
    path.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    update_public_html()
    update_loader()
    update_identity_contract()
    update_ci()
    verify_migration_shape()
    remove_obsolete_files()
