from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_requested_identity_runtime_is_loaded_before_motion_runtime():
    script = read("script.js")
    assert 'new URL("identity-overrides.js", loaderScript.src)' in script
    assert 'data-identity-asset="runtime"' in script
    assert script.index("identityRuntimeUrl") < script.index("runtimeUrl")


def test_requested_email_and_project_name_are_mapped_across_public_pages():
    runtime = read("identity-overrides.js")
    assert '["3501391833@qq.com", "liuwenlong0706@outlook.com"]' in runtime
    assert '["BTC多周期行情分析与风控报告系统", "多周期行情分析与风控报告金融交易系统"]' in runtime
    assert '["BTC分析系统", "金融交易系统"]' in runtime
    assert "document.title = replaceValue(document.title)" in runtime
    assert 'root.querySelectorAll("[href], [aria-label], [title], meta[content]")' in runtime


def test_cname_remains_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
