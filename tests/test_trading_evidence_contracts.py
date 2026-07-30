from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def decode_parts(paths: tuple[str, ...]) -> bytes:
    chunks = []
    for index, path in enumerate(paths):
        chunk = read(path).strip()
        assert len(chunk) % 4 == 0, (path, len(chunk), chunk[-20:])
        if index < len(paths) - 1:
            assert "=" not in chunk, (path, len(chunk), chunk[-20:])
        chunks.append(chunk)
    encoded = "".join(chunks)
    return base64.b64decode(encoded, validate=True)


def assert_valid_webp(payload: bytes, minimum_size: int) -> None:
    assert payload[:4] == b"RIFF"
    assert payload[8:12] == b"WEBP"
    declared_size = int.from_bytes(payload[4:8], "little") + 8
    assert declared_size == len(payload), (declared_size, len(payload))
    assert len(payload) > minimum_size


def test_trading_dashboard_reconstructs_as_valid_webp():
    dashboard = decode_parts((
        "assets/project-evidence/trading-dashboard.part-01.b64.txt",
        "assets/project-evidence/trading-dashboard.part-02.b64.txt",
        "assets/project-evidence/trading-dashboard.part-02b.b64.txt",
        "assets/project-evidence/trading-dashboard.part-03.b64.txt",
        "assets/project-evidence/trading-dashboard.part-04.b64.txt",
    ))
    assert_valid_webp(dashboard, 40_000)


def test_trading_cli_reconstructs_as_valid_webp():
    cli = decode_parts((
        "assets/project-evidence/trading-cli.part-01.b64.txt",
        "assets/project-evidence/trading-cli.part-02.b64.txt",
    ))
    assert_valid_webp(cli, 18_000)


def test_trading_evidence_section_is_wired_with_accessible_copy():
    runtime = read("project-evidence.js")
    for required in (
        "trading-system-evidence",
        "真实运行界面",
        "实时监控与风控总览",
        "命令行运行与交易计划输入",
        "trading-dashboard.part-01.b64.txt",
        "trading-dashboard.part-04.b64.txt",
        "trading-cli.part-01.b64.txt",
        "trading-cli.part-02.b64.txt",
        "loadChunkedImage",
        "Telegram chat_id、token前缀和本地绝对路径已遮挡",
        "不构成投资建议",
    ):
        assert required in runtime


def test_trading_evidence_styles_are_responsive():
    css = read("project-evidence.css")
    assert ".project-evidence-media--trading-dashboard" in css
    assert ".project-evidence-media--trading-cli" in css
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
