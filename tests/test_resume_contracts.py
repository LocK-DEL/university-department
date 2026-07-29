from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_public_resume_assets_exist_and_are_wired():
    assert (ROOT / "resume.html").is_file()
    assert (ROOT / "resume.css").is_file()
    assert (ROOT / "resume-entry.js").is_file()
    pdf = ROOT / "assets/liu-wenlong-resume-public.pdf"
    assert pdf.is_file()
    assert pdf.read_bytes().startswith(b"%PDF")

    script = read("script.js")
    assert 'new URL("resume.css", loaderScript.src)' in script
    assert 'new URL("resume-entry.js", loaderScript.src)' in script


def test_public_resume_removes_sensitive_and_stale_fields():
    text = "\n".join(read(path) for path in ("resume.html", "resume-entry.js"))
    assert "15596827232" not in text
    assert not re.search(r"年龄[：:]?\s*(19|20|21)", text)
    assert "详细个人地址" in text
    assert "公开求职版" in text


def test_resume_uses_verified_project_evidence():
    text = read("resume.html")
    for required in (
        "课堂知识智能重构系统",
        "49项测试通过",
        "BTC多周期行情分析与风控报告系统",
        "36项测试通过",
        "科研实验室数字化平台",
        "AI辅助科研与智能建模工作流",
        "国家级大学生创新训练项目",
    ):
        assert required in text


def test_resume_entry_adds_navigation_section_and_downloads():
    text = read("resume-entry.js")
    assert 'href="#resume"' in text
    assert 'section.id = "resume"' in text
    assert 'assets/liu-wenlong-resume-public.pdf' in text
    assert 'resume.html' in text
    assert "简历整理中" in text


def test_resume_links_are_https_or_local():
    text = "\n".join(read(path) for path in ("resume.html", "resume-entry.js"))
    assert "http://" not in text
    assert "https://github.com/LocK-DEL" in text


def test_cname_remains_unchanged():
    assert read("CNAME").strip() == "www.universitydepartment.store"
