from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def compact_css(text: str) -> str:
    return re.sub(r"\s+", "", text.lower())


def test_shared_motion_assets_exist_and_are_loaded_by_base_script():
    assert (ROOT / "motion.css").is_file()
    assert (ROOT / "motion.js").is_file()
    script = read("script.js")
    assert 'new URL("motion.css", loaderScript.src)' in script
    assert 'new URL("motion.js", loaderScript.src)' in script
    assert 'data-motion-asset="style"' in script


def test_approved_monochrome_cold_blue_palette_is_present():
    css = compact_css(read("motion.css"))
    for token in (
        "--bg-primary:#050505",
        "--bg-secondary:#0b0c0e",
        "--surface:#111216",
        "--surface-raised:#17181c",
        "--text-primary:#f4f4f0",
        "--accent:#8da9ff",
        "--accent-bright:#b6c7ff",
        "--light-section:#efeee9",
    ):
        assert token in css


def test_runtime_uses_accessible_native_scroll_architecture():
    runtime = read("motion.js")
    assert "IntersectionObserver" in runtime
    assert runtime.count("requestAnimationFrame(") == 1
    assert 'addEventListener("scroll", scheduleFrame, { passive: true })' in runtime
    assert 'addEventListener("pointermove"' in runtime
    assert "wheel" not in runtime
    assert "preventDefault" not in runtime


def test_homepage_enhancement_preserves_semantic_content_and_adds_scenes():
    runtime = read("motion.js")
    for scene in ("hero", "about", "skills", "projects", "experience", "contact"):
        assert f'dataset.scene = "{scene}"' in runtime
    assert "把复杂问题" in runtime
    assert "转化为可以运行的" in runtime
    assert "AI产品" in runtime
    assert "06" in runtime and "PROJECTS" in runtime
    assert "LET’S BUILD" in runtime and "SOMETHING REAL." in runtime


def test_all_six_projects_keep_real_links_order_status_and_accents():
    html = read("index.html")
    expected = [
        ("课堂知识智能重构系统", "projects/knowledge-reconstruction.html", "本地Demo已启动验证"),
        ("BTC多周期行情分析与风控报告系统", "projects/trading-system.html", "本地CLI · 36项测试通过"),
        ("科研实验室数字化平台", "projects/lab-platform.html", "前端项目待脱敏验证"),
        ("AI健康管理产品方案", "projects/ai-health-concept.html", "产品概念与竞赛方案"),
        ("CareRing智能健康手环", "projects/carering.html", "结构设计与专利原型"),
        ("AI辅助科研与智能建模工作流", "projects/ai-workflow.html", "AI协作案例合集"),
    ]
    positions = []
    for title, url, status in expected:
        assert title in html
        assert f'href="{url}"' in html
        assert status in html
        positions.append(html.index(title))
    assert positions == sorted(positions)

    runtime = read("motion.js").lower()
    for accent in ("#8da9ff", "#72d8d1", "#a99af4", "#c59ba3", "#8eb6c7", "#c8ad7f"):
        assert accent in runtime


def test_mobile_and_reduced_motion_fallbacks_disable_sticky_storytelling():
    css = compact_css(read("motion.css"))
    assert "@media(max-width:900px)" in css
    assert "@media(prefers-reduced-motion:reduce)" in css
    assert "position:static!important" in css
    assert "transform:none!important" in css
    assert ".project-scroll-steps" in css


def test_timeline_counter_stays_out_of_grid_flow_and_content_keeps_full_width():
    css = compact_css(read("motion.css"))
    assert ".timeline-story.timeline-item::before{position:absolute" in css
    assert ".timeline-story.timeline-item>div{grid-column:2;min-width:0}" in css


def test_no_external_runtime_dependencies_or_scroll_hijacking():
    text = "\n".join(read(path) for path in ("script.js", "motion.js", "motion.css"))
    for forbidden in (
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "cdnjs",
        "jsdelivr",
        "unpkg",
        "gsap",
        "lenis",
        "three.js",
        "swiper",
        "scroll-snap-type: y mandatory",
    ):
        assert forbidden not in text.lower()
    assert not re.search(r"addEventListener\s*\(\s*[\"']wheel", text)


def test_cname_is_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
