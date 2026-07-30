from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]

DASHBOARD_PARTS = tuple(
    f"assets/project-evidence/trading-dashboard-final.part-{index:02d}.b64.txt"
    for index in range(1, 6)
)
CLI_PARTS = tuple(
    f"assets/project-evidence/trading-cli-final.part-{index:02d}.b64.txt"
    for index in range(1, 5)
)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def reconstruct(parts: tuple[str, ...]) -> bytes:
    chunks = []
    for index, path in enumerate(parts):
        chunk = "".join(read(path).split())
        assert chunk, path
        assert len(chunk) % 4 == 0, (path, len(chunk))
        if index < len(parts) - 1:
            assert "=" not in chunk, path
        chunks.append(chunk)
    return base64.b64decode("".join(chunks), validate=True)


def assert_valid_webp(payload: bytes, minimum_size: int) -> None:
    assert payload[:4] == b"RIFF"
    assert payload[8:12] == b"WEBP"
    declared_size = int.from_bytes(payload[4:8], "little") + 8
    assert declared_size == len(payload), (declared_size, len(payload))
    assert len(payload) > minimum_size


def test_final_trading_dashboard_reconstructs_as_webp():
    assert_valid_webp(reconstruct(DASHBOARD_PARTS), 19_000)


def test_final_trading_cli_reconstructs_as_webp():
    assert_valid_webp(reconstruct(CLI_PARTS), 15_000)


def test_trading_evidence_runtime_has_truthful_accessible_copy():
    runtime = read("trading-evidence-final.js")
    loader = read("script.js")

    for required in (
        "trading-system-evidence",
        "真实运行界面",
        "实时监控与风控总览",
        "命令行运行与交易计划输入",
        "不构成投资建议或收益承诺",
        "本地绝对路径、Telegram token前缀和chat_id已遮挡",
        'data-trading-evidence-image="dashboard"',
        'data-trading-evidence-image="cli"',
        "Invalid reconstructed WebP payload",
    ):
        assert required in runtime

    assert 'new URL("trading-evidence-final.js", loaderScript.src)' in loader
    assert 'data-project-evidence-asset="trading-runtime"' in loader


def test_private_debug_values_are_not_published_as_text():
    runtime = read("trading-evidence-final.js")
    assert "8534590818" not in runtime
    assert "token_prefix=84712" not in runtime
    assert "D:\\claude code\\tradingview\\hl_trading_guard" not in runtime


def test_existing_contracts_remain_stable():
    assert read("CNAME").strip() == "www.universitydepartment.store"
    assert (ROOT / "projects/trading-system.html").is_file()
    runtime = read("trading-evidence-final.js")
    assert "36项测试通过" in runtime
