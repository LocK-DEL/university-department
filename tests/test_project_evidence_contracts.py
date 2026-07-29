from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_classroom_evidence_payload_decodes_to_small_webp():
    encoded_path = ROOT / "assets/project-evidence/classroom-home.b64.txt"
    assert encoded_path.is_file()
    data = base64.b64decode(encoded_path.read_text(encoding="utf-8"), validate=True)
    assert data[:4] == b"RIFF"
    assert data[8:12] == b"WEBP"
    assert len(data) < 25_000


def test_classroom_runtime_inserts_verified_interface_evidence():
    text = read("project-evidence.js")
    for required in (
        "真实界面证据",
        "../assets/project-evidence/classroom-home.b64.txt",
        'loading="lazy"',
        "课堂知识智能重构系统首页运行截图",
        "49项测试通过",
        "前后端本地启动已验证",
        "离线安全模式",
        "个人独立项目",
    ):
        assert required in text
    assert 'data:image/webp;base64,${encoded}' in text
    assert 'label === "自动化测试"' in text


def test_evidence_layer_is_loaded_by_shared_progressive_enhancement():
    script = read("script.js")
    assert 'new URL("project-evidence.css", loaderScript.src)' in script
    assert 'new URL("project-evidence.js", loaderScript.src)' in script
    assert 'data-project-evidence-asset="style"' in script
    assert 'data-project-evidence-asset="runtime"' in script


def test_evidence_gallery_has_accessible_and_responsive_contracts():
    css = read("project-evidence.css")
    assert ".project-evidence-gallery" in css
    assert ".project-evidence-figure" in css
    assert "object-fit: cover" in css
    assert "aspect-ratio" in css
    assert "@media (max-width: 768px)" in css


def test_public_evidence_does_not_expose_local_paths_or_unsafe_claims():
    text = "\n".join(
        read(path)
        for path in (
            "project-evidence.js",
            "projects/knowledge-reconstruction.html",
            "projects/carering.html",
        )
    )
    for forbidden in (
        "C:\\Users\\",
        "D:\\桌面",
        "硬件已完成",
        "已完成硬件验证",
        "健康数据已验证",
        "已经量产",
    ):
        assert forbidden not in text


def test_cname_remains_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
