from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]
DEMO_FRAMES = (
    ROOT / "assets/project-evidence/classroom-demo-home-hd.b64.txt",
    ROOT / "assets/project-evidence/classroom-demo-graph-hd.b64.txt",
)
OLD_VIDEO_PARTS = tuple(
    ROOT / f"assets/project-evidence/classroom-demo-mini-{index:02d}.b64.txt"
    for index in range(4)
)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_clear_demo_frames_decode_to_webp():
    for frame in DEMO_FRAMES:
        assert frame.is_file(), frame
        data = base64.b64decode(frame.read_text(encoding="utf-8").strip(), validate=True)
        assert data[:4] == b"RIFF"
        assert b"WEBP" in data[:16]
        assert 3_000 < len(data) < 40_000


def test_classroom_runtime_uses_clear_manual_demo_sequence():
    runtime = read("project-evidence.js")
    for required in (
        "classroom-demo-home-hd.b64.txt",
        "classroom-demo-graph-hd.b64.txt",
        "高清脱敏功能画面",
        "系统首页",
        "知识图谱",
        "data-demo-control",
        "aria-selected",
        "ArrowLeft",
        "ArrowRight",
    ):
        assert required in runtime

    assert "classroom-demo-questions-hd.b64.txt" not in runtime
    assert "CLASSROOM_VIDEO_PARTS" not in runtime
    assert "loadEncodedVideo" not in runtime
    assert "<video" not in runtime
    assert "autoplay" not in runtime


def test_public_demo_copy_documents_sanitization_boundaries():
    runtime = read("project-evidence.js")
    for required in (
        "旧的低清视频已移除",
        "姓名",
        "身份材料文件名",
        "API配置",
        "外部IP提示",
        "本地目录",
    ):
        assert required in runtime


def test_clear_demo_css_uses_contain_without_stretching():
    css = read("project-evidence.css")
    assert ".project-evidence-demo__stage" in css
    assert "aspect-ratio: 16 / 9" in css
    assert "object-fit: contain" in css
    assert ".project-evidence-demo__controls" in css


def test_old_blurry_video_parts_are_not_referenced():
    runtime = read("project-evidence.js")
    for part in OLD_VIDEO_PARTS:
        assert part.name not in runtime


def test_demo_integration_keeps_cname_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
