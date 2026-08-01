from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

PRODUCT = ROOT / "PRODUCT.md"
DESIGN = ROOT / "DESIGN.md"
AGENTS = ROOT / "AGENTS.md"
SKILL = ROOT / ".agents/skills/university-department-design/SKILL.md"
SPEC = ROOT / "docs/superpowers/specs/2026-08-01-portfolio-design-foundation.md"
PLAN = ROOT / "docs/superpowers/plans/2026-08-01-portfolio-design-foundation.md"

REQUIRED_FILES = (PRODUCT, DESIGN, AGENTS, SKILL, SPEC, PLAN)
FOUNDATION_CONTENT_FILES = (PRODUCT, DESIGN, AGENTS, SKILL, SPEC)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def test_design_foundation_files_exist() -> None:
    missing = [str(path.relative_to(ROOT)) for path in REQUIRED_FILES if not path.is_file()]
    assert not missing, f"Missing design foundation files: {missing}"


def test_product_context_identifies_the_real_product() -> None:
    text = read(PRODUCT).lower()

    assert "bilingual personal portfolio" in text
    assert "www.universitydepartment.store" in text
    assert "liuwenlong0706@outlook.com" in text
    assert "not a university website" in text
    assert "not a validated medical product" in text
    assert "not investment advice" in text


def test_design_system_defines_the_approved_visual_world_and_dials() -> None:
    text = read(DESIGN)
    lowered = text.lower()

    assert "editorial systems portfolio" in lowered
    assert "DESIGN_VARIANCE: 7" in text
    assert "MOTION_INTENSITY: 4" in text
    assert "VISUAL_DENSITY: 5" in text
    assert "purple-blue ai gradients" in lowered
    assert "WCAG AA" in text
    assert "prefers-reduced-motion" in text


def test_agent_rules_protect_routes_truth_and_verification() -> None:
    text = read(AGENTS)

    for required in (
        "PRODUCT.md",
        "DESIGN.md",
        "$university-department-design",
        "Impeccable",
        "Taste Skill",
        "product truth and privacy",
        "python -m pytest -q tests",
        "node --check script.js",
        "www.universitydepartment.store",
        "liuwenlong0706@outlook.com",
    ):
        assert required in text


def test_project_skill_is_a_portfolio_orchestrator_not_an_education_platform() -> None:
    text = read(SKILL)
    lowered = text.lower()

    obsolete_mission = (
        "transform university-department into a premium, modern, "
        "trustworthy educational platform"
    )

    assert obsolete_mission not in lowered
    assert "bilingual personal portfolio" in lowered
    assert "editorial systems portfolio" in lowered
    assert "impeccable" in lowered
    assert "taste skill" in lowered
    assert "product truth wins" in lowered
    assert "DESIGN_VARIANCE: 7" in text
    assert "MOTION_INTENSITY: 4" in text
    assert "VISUAL_DENSITY: 5" in text


def test_foundation_documents_agree_on_canonical_host_and_public_email() -> None:
    documents = (PRODUCT, AGENTS, SKILL, SPEC)

    for path in documents:
        text = read(path)
        assert "www.universitydepartment.store" in text, path.relative_to(ROOT)

    for path in (PRODUCT, AGENTS):
        text = read(path)
        assert "liuwenlong0706@outlook.com" in text, path.relative_to(ROOT)


def test_foundation_contains_no_unresolved_placeholders() -> None:
    forbidden = ("TBD:", "TODO:", "implement later", "fill in details")

    for path in FOUNDATION_CONTENT_FILES:
        text = read(path)
        matches = [value for value in forbidden if value in text]
        assert not matches, f"{path.relative_to(ROOT)} contains placeholders: {matches}"
