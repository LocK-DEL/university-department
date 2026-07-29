(() => {
    "use strict";

    const CLASSROOM_TITLE = "课堂知识智能重构系统";
    const CLASSROOM_IMAGE = "../assets/project-evidence/classroom-home.b64.txt";

    async function loadEncodedImage(image) {
        const source = image.dataset.base64Image;
        if (!source) return;

        try {
            const response = await fetch(source, { credentials: "same-origin" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const encoded = (await response.text()).replace(/\s+/g, "");
            if (!encoded.startsWith("UklG")) throw new Error("Invalid WebP payload");
            image.src = `data:image/webp;base64,${encoded}`;
            image.removeAttribute("data-base64-image");
        } catch (error) {
            image.closest("figure")?.classList.add("is-unavailable");
            console.warn("Project evidence image could not be loaded.", error);
        }
    }

    function updateClassroomVerification() {
        document.querySelectorAll(".verification-status-list li").forEach((item) => {
            const label = item.querySelector("span")?.textContent.trim();
            if (label === "自动化测试") {
                const value = item.querySelector("strong");
                if (value) value.textContent = "49项测试通过";
            }
        });
    }

    function addClassroomEvidence() {
        const title = document.querySelector(".project-title")?.textContent.trim();
        if (title !== CLASSROOM_TITLE || document.getElementById("classroom-evidence")) return;

        const verificationHeading = [...document.querySelectorAll(".project-section-heading h2")]
            .find((heading) => heading.textContent.trim() === "当前验证状态");
        const verificationSection = verificationHeading?.closest(".project-section");
        if (!verificationSection) return;

        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "classroom-evidence";
        section.innerHTML = `
            <div class="container">
                <div class="project-section-heading">
                    <p>Interface Evidence</p>
                    <h2>真实界面证据</h2>
                </div>
                <div class="project-evidence-gallery project-evidence-gallery--single">
                    <figure class="project-evidence-figure">
                        <div class="project-evidence-media">
                            <img
                                alt="课堂知识智能重构系统首页运行截图"
                                loading="lazy"
                                decoding="async"
                                data-base64-image="${CLASSROOM_IMAGE}"
                            >
                        </div>
                        <figcaption>
                            <strong>课堂知识智能重构系统首页运行截图</strong>
                            <span>可见文件上传、Whisper语音转写、NLP知识提取、知识图谱和AI题目生成等核心入口。截图来自此前保存的真实项目材料，不包含API密钥、课堂原始数据或学生身份信息。</span>
                        </figcaption>
                    </figure>
                </div>
                <div class="project-evidence-facts" aria-label="项目验证证据">
                    <span>49项测试通过</span>
                    <span>前后端本地启动已验证</span>
                    <span>离线安全模式</span>
                    <span>个人独立项目</span>
                </div>
            </div>`;

        verificationSection.insertAdjacentElement("beforebegin", section);
        section.querySelectorAll("[data-base64-image]").forEach(loadEncodedImage);
        updateClassroomVerification();
    }

    function initProjectEvidence() {
        if (!document.querySelector(".project-page")) return;
        addClassroomEvidence();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProjectEvidence, { once: true });
    } else {
        initProjectEvidence();
    }
})();
