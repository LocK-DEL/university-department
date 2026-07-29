from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_project_evidence_images_exist_and_are_webp():
    for path in (
        "assets/project-evidence/classroom-home.webp",
        "assets/project-evidence/carering-card-fit.webp",
        "assets/project-evidence/carering-side-insert.webp",
        "assets/project-evidence/carering-underbody.webp",
    ):
        asset = ROOT / path
        assert asset.is_file(), path
        data = asset.read_bytes()
        assert data[:4] == b"RIFF"
        assert data[8:12] == b"WEBP"
        assert len(data) < 250_000


def test_classroom_page_uses_verified_interface_screenshot():
    text = read("projects/knowledge-reconstruction.html")
    assert "真实界面证据" in text
    assert "../assets/project-evidence/classroom-home.webp" in text
    assert 'loading="lazy"' in text
    assert "课堂知识智能重构系统首页运行截图" in text
    assert "49项测试通过" in text
    assert "前后端本地启动已验证" in text


def test_carering_page_labels_photos_as_structure_prototype_only():
    text = read("projects/carering.html")
    for path in (
        "../assets/project-evidence/carering-card-fit.webp",
        "../assets/project-evidence/carering-side-insert.webp",
        "../assets/project-evidence/carering-underbody.webp",
    ):
        assert path in text
    assert "结构适配原型实拍" in text
    assert "用于说明卡片侧插、扩展仓位置与外观适配" in text
    assert "不代表雾化、电路、健康功能或整机硬件已经完成验证" in text


def test_evidence_gallery_has_accessible_and_responsive_contracts():
    css = read("project.css")
    assert ".project-evidence-gallery" in css
    assert ".project-evidence-figure" in css
    assert "object-fit: cover" in css
    assert "aspect-ratio" in css
    assert "@media (max-width: 768px)" in css


def test_public_evidence_does_not_expose_local_paths_or_unsafe_claims():
    text = "\n".join(
        read(path)
        for path in (
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
