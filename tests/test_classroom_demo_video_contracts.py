from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]
VIDEO_PARTS = tuple(
    ROOT / f"assets/project-evidence/classroom-demo-mini-{index:02d}.b64.txt"
    for index in range(4)
)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_sanitized_demo_chunks_decode_to_small_mp4():
    for part in VIDEO_PARTS:
        assert part.is_file(), part

    encoded = "".join(part.read_text(encoding="utf-8").strip() for part in VIDEO_PARTS)
    data = base64.b64decode(encoded, validate=True)
    assert b"ftyp" in data[:32]
    assert 15_000 < len(data) < 20_000


def test_classroom_page_runtime_exposes_manual_video_controls():
    runtime = read("project-evidence.js")
    for required in (
        "classroom-demo-mini-00.b64.txt",
        "classroom-demo-mini-01.b64.txt",
        "classroom-demo-mini-02.b64.txt",
        "classroom-demo-mini-03.b64.txt",
        "真实界面证据",
        "15秒脱敏功能演示",
        "controls",
        "muted",
        "playsinline",
        'preload="metadata"',
        "视频不会自动播放",
        "Promise.all(CLASSROOM_VIDEO_PARTS.map(fetchEncodedPayload))",
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
