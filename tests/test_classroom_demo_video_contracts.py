from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_sanitized_demo_payload_decodes_to_small_mp4():
    payload = ROOT / "assets/project-evidence/classroom-demo-highlight.b64.txt"
    assert payload.is_file()
    encoded = payload.read_text(encoding="utf-8").strip()
    data = base64.b64decode(encoded, validate=True)
    assert b"ftyp" in data[:32]
    assert 10_000 < len(data) < 300_000


def test_classroom_page_runtime_exposes_manual_video_controls():
    runtime = read("project-evidence.js")
    for required in (
        "classroom-demo-highlight.b64.txt",
        "真实界面与脱敏演示",
        "脱敏功能演示",
        "controls",
        "muted",
        "playsinline",
        'preload="metadata"',
        "视频不会自动播放",
        "URL.createObjectURL",
        'new Blob([bytes], { type: "video/mp4" })',
    ):
        assert required in runtime
    assert "autoplay" not in runtime


def test_public_video_copy_documents_sanitization_boundaries():
    runtime = read("project-evidence.js")
    for required in (
        "删除原音",
        "姓名",
        "身份材料文件名",
        "API配置",
        "外部IP提示",
        "本地目录",
    ):
        assert required in runtime


def test_video_integration_keeps_cname_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
