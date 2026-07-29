(() => {
    "use strict";

    const CLASSROOM_TITLE = "课堂知识智能重构系统";
    const CLASSROOM_IMAGE = "../assets/project-evidence/classroom-home.b64.txt";
    const CLASSROOM_VIDEO = "../assets/project-evidence/classroom-demo-highlight.b64.txt";
    const CARERING_TITLE = "CareRing智能健康手环";
    const CARERING_IMAGE = "../assets/project-evidence/carering-prototype-collage.b64.txt";

    async function fetchEncodedPayload(source) {
        const response = await fetch(source, { credentials: "same-origin" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.text()).replace(/\s+/g, "");
    }

    async function loadEncodedImage(image) {
        const source = image.dataset.base64Image;
        if (!source) return;

        try {
            const encoded = await fetchEncodedPayload(source);
            if (!encoded.startsWith("UklG")) throw new Error("Invalid WebP payload");
            image.src = `data:image/webp;base64,${encoded}`;
            image.removeAttribute("data-base64-image");
        } catch (error) {
            image.closest("figure")?.classList.add("is-unavailable");
            console.warn("Project evidence image could not be loaded.", error);
        }
    }

    async function loadEncodedVideo(video) {
        const source = video.dataset.base64Video;
        if (!source) return;

        try {
            const encoded = await fetchEncodedPayload(source);
            const binary = atob(encoded);
            const bytes = new Uint8Array(binary.length);
            for (let index = 0; index < binary.length; index += 1) {
                bytes[index] = binary.charCodeAt(index);
            }
            const header = String.fromCharCode(...bytes.slice(4, 12));
            if (!header.includes("ftyp")) throw new Error("Invalid MP4 payload");

            const objectUrl = URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));
            video.src = objectUrl;
            video.removeAttribute("data-base64-video");
            video.closest("figure")?.classList.add("is-ready");
            window.addEventListener("pagehide", () => URL.revokeObjectURL(objectUrl), { once: true });
        } catch (error) {
            video.closest("figure")?.classList.add("is-unavailable");
            console.warn("Project evidence video could not be loaded.", error);
        }
    }

    function findVerificationSection() {
        const verificationHeading = [...document.querySelectorAll(".project-section-heading h2")]
            .find((heading) => heading.textContent.trim() === "当前验证状态");
        return verificationHeading?.closest(".project-section") || null;
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

        const verificationSection = findVerificationSection();
        if (!verificationSection) return;

        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "classroom-evidence";
        section.innerHTML = `
            <div class="container">
                <div class="project-section-heading">
                    <p>Interface Evidence</p>
                    <h2>真实界面与脱敏演示</h2>
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
                    <figure class="project-evidence-figure project-evidence-video">
                        <div class="project-evidence-media">
                            <video
                                aria-label="课堂知识智能重构系统脱敏功能演示"
                                controls
                                muted
                                playsinline
                                preload="metadata"
                                data-base64-video="${CLASSROOM_VIDEO}"
                                style="position:relative;z-index:1;display:block;width:100%;height:100%;object-fit:contain;background:#08090b"
                            ></video>
                        </div>
                        <figcaption>
                            <strong>脱敏功能演示</strong>
                            <span>演示覆盖系统首页、知识图谱、AI题目生成与课堂总结。公开版本已删除原音，并裁去姓名、身份材料文件名、API配置、外部IP提示和本地目录等敏感区域；视频不会自动播放。</span>
                        </figcaption>
                    </figure>
                </div>
                <div class="project-evidence-facts" aria-label="项目验证证据">
                    <span>49项测试通过</span>
                    <span>前后端本地启动已验证</span>
                    <span>离线安全模式</span>
                    <span>脱敏演示视频</span>
                    <span>个人独立项目</span>
                </div>
            </div>`;

        verificationSection.insertAdjacentElement("beforebegin", section);
        section.querySelectorAll("[data-base64-image]").forEach(loadEncodedImage);
        section.querySelectorAll("[data-base64-video]").forEach(loadEncodedVideo);
        updateClassroomVerification();
    }

    function addCareRingEvidence() {
        const title = document.querySelector(".project-title")?.textContent.trim();
        if (title !== CARERING_TITLE || document.getElementById("carering-evidence")) return;

        const verificationSection = findVerificationSection();
        if (!verificationSection) return;

        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "carering-evidence";
        section.innerHTML = `
            <div class="container">
                <div class="project-section-heading">
                    <p>Prototype Evidence</p>
                    <h2>结构适配原型实拍</h2>
                </div>
                <div class="project-evidence-gallery project-evidence-gallery--single">
                    <figure class="project-evidence-figure">
                        <div class="project-evidence-media project-evidence-media--prototype">
                            <img
                                alt="CareRing卡片侧插与扩展仓外观适配原型实拍拼图"
                                loading="lazy"
                                decoding="async"
                                data-base64-image="${CARERING_IMAGE}"
                            >
                        </div>
                        <figcaption>
                            <strong>卡片侧插与扩展仓位置验证素材</strong>
                            <span>实拍素材用于说明卡片侧插、扩展仓位置与外观适配。它反映的是结构构想和装配表达，不代表雾化、电路、健康功能或整机硬件已经完成验证。</span>
                        </figcaption>
                    </figure>
                </div>
                <div class="project-evidence-facts" aria-label="CareRing原型证据边界">
                    <span>卡片侧插表达</span>
                    <span>扩展仓位置展示</span>
                    <span>外观适配素材</span>
                    <span>功能验证未完成</span>
                </div>
            </div>`;

        verificationSection.insertAdjacentElement("beforebegin", section);
        section.querySelectorAll("[data-base64-image]").forEach(loadEncodedImage);
    }

    function initProjectEvidence() {
        if (!document.querySelector(".project-page")) return;
        addClassroomEvidence();
        addCareRingEvidence();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProjectEvidence, { once: true });
    } else {
        initProjectEvidence();
    }
})();
