(() => {
    "use strict";

    const loaderScript = document.currentScript;
    const rootUrl = loaderScript ? new URL(".", loaderScript.src) : new URL("../", document.baseURI);
    const assetUrl = (name) => new URL(`assets/project-evidence/${name}`, rootUrl).href;
    const LEGACY_ASSET_CONTRACT = Object.freeze({
        classroom: "../assets/project-evidence/classroom-home.b64.txt",
        carering: "../assets/project-evidence/carering-prototype-collage.b64.txt",
    });
    // Keep the former relative routes documented while loading from the shared script root on both locales.
    void LEGACY_ASSET_CONTRACT;
    const CLASSROOM_IMAGE = new URL("assets/project-evidence/classroom-home.b64.txt", rootUrl).href;
    const CARERING_IMAGE = new URL("assets/project-evidence/carering-prototype-collage.b64.txt", rootUrl).href;
    const CLASSROOM_DEMO_FRAMES = [
        { key: "home", source: assetUrl("classroom-demo-home-hd.b64.txt") },
        { key: "graph", source: assetUrl("classroom-demo-graph-hd.b64.txt") },
    ];
    const isEnglish = document.documentElement.lang.startsWith("en");
    const COPY = isEnglish ? {
        frames: {
            home: { label: "System home", alt: "Sanitized high-resolution system home interface" },
            graph: { label: "Knowledge graph", alt: "Sanitized high-resolution knowledge graph interface" },
        },
        demoStage: "High-resolution classroom knowledge system screens",
        demoTabs: "Switch classroom knowledge system screens",
        classroomHeading: "Verified interface evidence",
        classroomImageAlt: "Local classroom knowledge reconstruction system home interface",
        classroomImageTitle: "Local system home interface",
        classroomImageCaption: "Shows the upload, Whisper transcription, NLP extraction, knowledge-graph and AI question-generation entries. API credentials, source classroom data and student identities are excluded.",
        classroomDemoTitle: "Sanitized high-resolution feature screens",
        classroomDemoCaption: "The former low-resolution video was removed. These clear screens show the system home and knowledge graph; names, identity-document filenames, API configuration, external-IP notices and local paths are not published.",
        classroomFactsLabel: "Project verification evidence",
        classroomFacts: ["49 tests passed", "Local frontend and backend verified", "Offline-safe mode", "Sanitized high-resolution screens", "Independent project"],
        careringHeading: "Structural-fit prototype evidence",
        careringAlt: "CareRing side-insert card and expansion-cartridge structural prototype collage",
        careringTitle: "Side-insert card and expansion-cartridge position evidence",
        careringCaption: "The photos explain the side-insert card, expansion-cartridge position and appearance fit. They document structural and assembly concepts, not validated atomization, electronics, health functions or complete hardware.",
        careringFactsLabel: "CareRing prototype evidence boundary",
        careringFacts: ["Side-insert concept", "Expansion-cartridge position", "Appearance-fit material", "Functional validation incomplete"],
        testValue: "49 tests passed",
    } : {
        frames: {
            home: { label: "系统首页", alt: "课堂知识智能重构系统首页高清脱敏画面" },
            graph: { label: "知识图谱", alt: "课堂知识智能重构系统知识图谱高清脱敏画面" },
        },
        demoStage: "课堂知识系统高清功能画面",
        demoTabs: "切换课堂知识系统功能画面",
        classroomHeading: "真实界面证据",
        classroomImageAlt: "课堂知识智能重构系统首页运行截图",
        classroomImageTitle: "课堂知识智能重构系统首页运行截图",
        classroomImageCaption: "可见文件上传、Whisper语音转写、NLP知识提取、知识图谱和AI题目生成等核心入口。截图不包含API密钥、课堂原始数据或学生身份信息。",
        classroomDemoTitle: "高清脱敏功能画面",
        classroomDemoCaption: "旧的低清视频已移除。当前提供系统首页与知识图谱两张清晰画面，可手动或使用键盘方向键切换；姓名、身份材料文件名、API配置、外部IP提示和本地目录均未公开。",
        classroomFactsLabel: "项目验证证据",
        classroomFacts: ["49项测试通过", "前后端本地启动已验证", "离线安全模式", "高清脱敏功能画面", "个人独立项目"],
        careringHeading: "结构适配原型实拍",
        careringAlt: "CareRing卡片侧插与扩展仓外观适配原型实拍拼图",
        careringTitle: "卡片侧插与扩展仓位置验证素材",
        careringCaption: "实拍素材用于说明卡片侧插、扩展仓位置与外观适配。它反映的是结构构想和装配表达，不代表雾化、电路、健康功能或整机硬件已经完成验证。",
        careringFactsLabel: "CareRing原型证据边界",
        careringFacts: ["卡片侧插表达", "扩展仓位置展示", "外观适配素材", "功能验证未完成"],
        testValue: "49项测试通过",
    };

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
            image.closest(".project-evidence-media")?.classList.add("is-ready");
        } catch (error) {
            image.closest("figure")?.classList.add("is-unavailable");
            console.warn("Project evidence image could not be loaded.", error);
        }
    }

    function activateDemoFrame(demo, index) {
        const frames = [...demo.querySelectorAll("[data-demo-frame]")];
        const controls = [...demo.querySelectorAll("[data-demo-control]")];
        const safeIndex = Math.max(0, Math.min(index, frames.length - 1));
        frames.forEach((frame, frameIndex) => {
            const active = frameIndex === safeIndex;
            frame.hidden = !active;
            frame.setAttribute("aria-hidden", active ? "false" : "true");
        });
        controls.forEach((control, controlIndex) => {
            const active = controlIndex === safeIndex;
            control.classList.toggle("is-active", active);
            control.setAttribute("aria-selected", active ? "true" : "false");
            control.setAttribute("tabindex", active ? "0" : "-1");
        });
    }

    function initDemoSequence(demo) {
        const controls = [...demo.querySelectorAll("[data-demo-control]")];
        controls.forEach((control, index) => {
            control.addEventListener("click", () => activateDemoFrame(demo, index));
            control.addEventListener("keydown", (event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                let next = index;
                if (event.key === "ArrowLeft") next = (index - 1 + controls.length) % controls.length;
                if (event.key === "ArrowRight") next = (index + 1) % controls.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = controls.length - 1;
                activateDemoFrame(demo, next);
                controls[next].focus();
            });
        });
        activateDemoFrame(demo, 0);
    }

    function projectKey() {
        const page = document.querySelector(".project-page");
        const key = page?.dataset.projectKey;
        if (key) return key;
        const title = document.querySelector(".project-title")?.textContent.trim();
        if (["课堂知识智能重构系统", "Intelligent Classroom Knowledge Reconstruction System"].includes(title)) return "knowledge-reconstruction";
        if (["CareRing智能健康手环", "CareRing Smart Health Wristband"].includes(title)) return "carering";
        return "";
    }

    function findVerificationSection() {
        return document.querySelector("[data-verification-section]")
            || document.querySelector(".verification-panel")?.closest(".project-section")
            || null;
    }

    function updateClassroomVerification() {
        document.querySelectorAll(".verification-status-list li").forEach((item) => {
            const label = item.querySelector("span")?.textContent.trim();
            if (["自动化测试", "Automated tests"].includes(label)) {
                const value = item.querySelector("strong");
                if (value) value.textContent = COPY.testValue;
            }
        });
    }

    function demoFramesMarkup() {
        const images = CLASSROOM_DEMO_FRAMES.map((frame, index) => {
            const text = COPY.frames[frame.key];
            return `<img ${index ? "hidden" : ""} data-demo-frame="${index}" data-base64-image="${frame.source}" alt="${text.alt}" loading="lazy" decoding="async" aria-hidden="${index ? "true" : "false"}">`;
        }).join("");
        const controls = CLASSROOM_DEMO_FRAMES.map((frame, index) => `<button type="button" role="tab" data-demo-control="${index}" aria-selected="${index ? "false" : "true"}" tabindex="${index ? "-1" : "0"}">${String(index + 1).padStart(2, "0")} · ${COPY.frames[frame.key].label}</button>`).join("");
        return `<div class="project-evidence-demo" data-demo-sequence><div class="project-evidence-media project-evidence-demo__stage" role="tabpanel" aria-label="${COPY.demoStage}">${images}</div><div class="project-evidence-demo__controls" role="tablist" aria-label="${COPY.demoTabs}">${controls}</div></div>`;
    }

    function factMarkup(items) {
        return items.map((item) => `<span>${item}</span>`).join("");
    }

    function addClassroomEvidence() {
        if (projectKey() !== "knowledge-reconstruction" || document.getElementById("classroom-evidence")) return;
        const verificationSection = findVerificationSection();
        if (!verificationSection) return;
        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "classroom-evidence";
        section.innerHTML = `<div class="container"><div class="project-section-heading"><p>Interface Evidence</p><h2>${COPY.classroomHeading}</h2></div><div class="project-evidence-gallery project-evidence-gallery--single"><figure class="project-evidence-figure"><div class="project-evidence-media"><img alt="${COPY.classroomImageAlt}" loading="lazy" decoding="async" data-base64-image="${CLASSROOM_IMAGE}"></div><figcaption><strong>${COPY.classroomImageTitle}</strong><span>${COPY.classroomImageCaption}</span></figcaption></figure><figure class="project-evidence-figure project-evidence-demo-figure">${demoFramesMarkup()}<figcaption><strong>${COPY.classroomDemoTitle}</strong><span>${COPY.classroomDemoCaption}</span></figcaption></figure></div><div class="project-evidence-facts" aria-label="${COPY.classroomFactsLabel}">${factMarkup(COPY.classroomFacts)}</div></div>`;
        verificationSection.insertAdjacentElement("beforebegin", section);
        section.querySelectorAll("[data-base64-image]").forEach(loadEncodedImage);
        section.querySelectorAll("[data-demo-sequence]").forEach(initDemoSequence);
        updateClassroomVerification();
    }

    function addCareRingEvidence() {
        if (projectKey() !== "carering" || document.getElementById("carering-evidence")) return;
        const verificationSection = findVerificationSection();
        if (!verificationSection) return;
        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "carering-evidence";
        section.innerHTML = `<div class="container"><div class="project-section-heading"><p>Prototype Evidence</p><h2>${COPY.careringHeading}</h2></div><div class="project-evidence-gallery project-evidence-gallery--single"><figure class="project-evidence-figure"><div class="project-evidence-media project-evidence-media--prototype"><img alt="${COPY.careringAlt}" loading="lazy" decoding="async" data-base64-image="${CARERING_IMAGE}"></div><figcaption><strong>${COPY.careringTitle}</strong><span>${COPY.careringCaption}</span></figcaption></figure></div><div class="project-evidence-facts" aria-label="${COPY.careringFactsLabel}">${factMarkup(COPY.careringFacts)}</div></div>`;
        verificationSection.insertAdjacentElement("beforebegin", section);
        section.querySelectorAll("[data-base64-image]").forEach(loadEncodedImage);
    }

    function initProjectEvidence() {
        const key = document.querySelector(".project-page")?.dataset.projectKey || projectKey();
        if (!key) return;
        addClassroomEvidence();
        addCareRingEvidence();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initProjectEvidence, { once: true });
    else initProjectEvidence();
})();