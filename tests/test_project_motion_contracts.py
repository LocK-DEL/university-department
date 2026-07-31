from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = sorted((ROOT / "projects").glob("*.html"))


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def test_all_six_project_pages_use_the_versioned_shared_base_script():
    assert len(PROJECTS) == 6
    pattern = re.compile(r'<script src="\.\./script\.js\?v=[^"]+"></script>')
    for path in PROJECTS:
        html = read(path)
        assert pattern.search(html), path


def test_all_project_pages_keep_truth_status_and_circular_navigation():
    for path in PROJECTS:
        html = read(path)
        assert "验证状态" in html, path
        assert "返回首页" in html, path
        assert "返回全部项目" in html, path
        assert "上一个项目" in html, path
        assert "下一个项目" in html, path
        assert "project-navigation" in html, path


def test_shared_runtime_enhances_project_pages_without_rewriting_facts():
    runtime = (ROOT / "motion.js").read_text(encoding="utf-8")
    assert 'document.querySelector(".project-page")' in runtime
    assert 'body.dataset.motionRoot = "project"' in runtime
    assert "enhanceProjectPage" in runtime
    assert ".project-title" in runtime
    assert ".verification-panel" in runtime
    assert ".privacy-note" in runtime


def test_no_false_completion_or_profit_claims_added_to_motion_layer():
    text = "\n".join(
        (ROOT / path).read_text(encoding="utf-8")
        for path in ("motion.js", "motion.css", "script.js")
    )
    for forbidden in (
        "稳定盈利",
        "保证盈利",
        "已经量产",
        "硬件已完成",
        "应用已上线",
        "源码已公开",
        "在线Demo已发布",
    ):
        assert forbidden not in text
