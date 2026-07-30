from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_trading_runtime_screenshots_are_valid_webp_files():
    for path in (
        "assets/project-evidence/trading-dashboard.webp",
        "assets/project-evidence/trading-cli-redacted.webp",
    ):
        payload = (ROOT / path).read_bytes()
        assert payload[:4] == b"RIFF", path
        assert payload[8:12] == b"WEBP", path
        assert len(payload) > 20_000, path


def test_trading_evidence_section_is_wired_with_accessible_copy():
    runtime = read("project-evidence.js")
    for required in (
        "trading-system-evidence",
        "真实运行界面",
        "实时监控与风控总览",
        "命令行运行与交易计划输入",
        "trading-dashboard.webp",
        "trading-cli-redacted.webp",
        "Telegram chat_id、token前缀和本地绝对路径已遮挡",
        "不构成投资建议",
    ):
        assert required in runtime


def test_trading_evidence_styles_are_responsive():
    css = read("project-evidence.css")
    assert ".project-evidence-media--trading-dashboard" in css
    assert ".project-evidence-media--trading-cli" in css
    assert ".project-evidence-link" in css
    assert "@media (max-width: 768px)" in css


def test_private_debug_values_are_not_committed_as_text():
    text = "\n".join(
        read(path)
        for path in (
            "project-evidence.js",
            "projects/trading-system.html",
            "docs/superpowers/specs/2026-07-30-trading-system-evidence-design.md",
        )
    )
    assert "8534590818" not in text
    assert "token_prefix=84712" not in text
    assert "D:\\claude code\\tradingview\\hl_trading_guard" not in text


def test_cname_and_trading_page_url_stay_stable():
    assert read("CNAME").strip() == "www.universitydepartment.store"
    assert (ROOT / "projects/trading-system.html").is_file()
