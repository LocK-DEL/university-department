from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_desktop_project_link_hotfix_is_loaded_after_motion_styles():
    script = read("script.js")
    assert 'new URL("desktop-project-links.css", loaderScript.src)' in script
    assert 'data-motion-asset="project-links-fix"' in script


def test_desktop_project_detail_link_is_pinned_and_clickable():
    css = read("desktop-project-links.css")
    assert ".motion-desktop:not(.reduced-motion) .project-panel .project-action--active" in css
    for required in (
        "position: absolute",
        "right:",
        "bottom:",
        "z-index:",
        "pointer-events: auto",
        "cursor: pointer",
    ):
        assert required in css


def test_desktop_project_content_reserves_space_for_detail_link():
    css = read("desktop-project-links.css")
    assert ".motion-desktop:not(.reduced-motion) .project-panel .project-content" in css
    assert "padding-bottom:" in css


def test_mobile_project_cards_are_not_changed_by_hotfix():
    css = read("desktop-project-links.css")
    assert "@media (min-width: 901px)" in css
    assert "@media (max-width: 900px)" not in css


def test_cname_stays_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
