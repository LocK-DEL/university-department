(() => {
    "use strict";

    const CLASSROOM_TITLE = "课堂知识智能重构系统";
    const CLASSROOM_IMAGE = "../assets/project-evidence/classroom-home.b64.txt";
    const CLASSROOM_DEMO_FRAMES = [
        {
            label: "系统首页",
            source: "../assets/project-evidence/classroom-demo-home-hd.b64.txt",
            alt: "课堂知识智能重构系统首页高清脱敏画面",
        },
        {
            label: "知识图谱",
            source: "../assets/project-evidence/classroom-demo-graph-hd.b64.txt",
            alt: "课堂知识智能重构系统知识图谱高清脱敏画面",
        },
    ];
    const CARERING_TITLE = "CareRing智能健康手环";
    const CARERING_IMAGE = "../assets/project-evidence/carering-prototype-collage.b64.txt";
    const TRADING_TITLES = new Set([
        "BTC多周期行情分析与风控报告系统",
        "多周期行情分析与风控报告金融交易系统",
    ]);
    const TRADING_DASHBOARD_PARTS = [
        "../assets/project-evidence/trading-dashboard.part-01.b64.txt",
        "../assets/project-evidence/trading-dashboard.part-02.b64.txt",
        "../assets/project-evidence/trading-dashboard.part-02b.b64.txt",
        "../assets/project-evidence/trading-dashboard.part-03.b64.txt",
        "../assets/project-evidence/trading-dashboard.part-04.b64.txt",
    ];
    const TRADING_CLI_PARTS = [
        "../assets/project-evidence/trading-cli.part-01.b64.txt",
        "../assets/project-evidence/trading-cli.part-02.b64.txt",
    ];

    async function fetchEncodedPayload(source) {
        const sources = Array.isArray(source) ? source : [source];
        const parts = await Promise.all(sources.map(async (item) => {
            const response = await fetch(item, { credentials: "same-origin" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return (await response.text()).replace(/\s+/g, "");
        }));
        return parts.join("");
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

    async function loadChunkedImage(image, sources) {
        if (!image) return;

        try {
            const encoded = await fetchEncodedPayload(sources);
            if (!encoded.startsWith("UklG")) throw new Error("Invalid WebP payload");
            image.src = `data:image/webp;base64,${encoded}`;
            image.closest(".project-evidence-media")?.classList.add("is-ready");
        } catch (error) {
            image.closest("figure")?.classList.add("is-unavailable");
            console.warn("Trading evidence image could not be loaded.", error);
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

    function findVerificationSection() {
        const heading = [...document.querySelectorAll(".project-section-heading h2")]
            .find((node) => node.textContent.trim() === "当前验证状态");
        return heading?.closest(".project-section") || null;
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

    function demoFramesMarkup() {
        const images = CLASSROOM_DEMO_FRAMES.map((frame, index) => `
            <img ${index ? "hidden" : ""}
                 data-demo-frame="${index}"
                 data-base64-image="${frame.source}"
                 alt="${frame.alt}"
                 loading="lazy"
                 decoding="async"
                 aria-hidden="${index ? "true" : "false"}">`).join("");
        const controls = CLASSROOM_DEMO_FRAMES.map((frame, index) => `
            <button type="button" role="tab" data-demo-control="${index}"
                    aria-selected="${index ? "false" : "true"}"
                    tabindex="${index ? "-1" : "0"}">
                ${String(index + 1).padStart(2, "0")} · ${frame.label}
            </button>`).join("");
        return `<div class="project-evidence-demo" data-demo-sequence>
            <div class="project-evidence-media project-evidence-demo__stage" role="tabpanel" aria-label="课堂知识系统高清功能画面">${images}</div>
            <div class="project-evidence-demo__controls" role="tablist" aria-label="切换课堂知识系统功能画面">${controls}</div>
        </div>`;
    }

    function addClassroomEvidence() {
        if (document.querySelector(".project-title")?.textContent.trim() !== CLASSROOM_TITLE) return;
        if (document.getElementById("classroom-evidence")) return;
        const verificationSection = findVerificationSection();
        if (!verificationSection) return;

        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "classroom-evidence";
        section.innerHTML = `<div class="container">
            <div class="project-section-heading"><p>Interface Evidence</p><h2>真实界面证据</h2></div>
            <div class="project-evidence-gallery project-evidence-gallery--single">
                <figure class="project-evidence-figure">
                    <div class="project-evidence-media"><img alt="课堂知识智能重构系统首页运行截图" loading="lazy" decoding="async" data-base64-image="${CLASSROOM_IMAGE}"></div>
                    <figcaption><strong>课堂知识智能重构系统首页运行截图</strong><span>可见文件上传、Whisper语音转写、NLP知识提取、知识图谱和AI题目生成等核心入口。截图不包含API密钥、课堂原始数据或学生身份信息。</span></figcaption>
                </figure>
                <figure class="project-evidence-figure project-evidence-demo-figure">
                    ${demoFramesMarkup()}
                    <figcaption><strong>高清脱敏功能画面</strong><span>旧的低清视频已移除。当前提供系统首页与知识图谱两张清晰画面，可手动或使用键盘方向键切换；姓名、身份材料文件名、API配置、外部IP提示和本地目录均未公开。</span></figcaption>
                </figure>
            </div>
            <div class="project-evidence-facts" aria-label="项目验证证据"><span>49项测试通过</span><span>前后端本地启动已验证</span><span>离线安全模式</span><span>高清脱敏功能画面</span><span>个人独立项目</span></div>
        </div>`;
        verificationSection.insertAdjacentElement("beforebegin", section);
        section.querySelectorAll("[data-base64-image]").forEach(loadEncodedImage);
        section.querySelectorAll("[data-demo-sequence]").forEach(initDemoSequence);
        updateClassroomVerification();
    }

    function addCareRingEvidence() {
        if (document.querySelector(".project-title")?.textContent.trim() !== CARERING_TITLE) return;
        if (document.getElementById("carering-evidence")) return;
        const verificationSection = findVerificationSection();
        if (!verificationSection) return;

        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "carering-evidence";
        section.innerHTML = `<div class="container">
            <div class="project-section-heading"><p>Prototype Evidence</p><h2>结构适配原型实拍</h2></div>
            <div class="project-evidence-gallery project-evidence-gallery--single">
                <figure class="project-evidence-figure">
                    <div class="project-evidence-media project-evidence-media--prototype"><img alt="CareRing卡片侧插与扩展仓外观适配原型实拍拼图" loading="lazy" decoding="async" data-base64-image="${CARERING_IMAGE}"></div>
                    <figcaption><strong>卡片侧插与扩展仓位置验证素材</strong><span>实拍素材用于说明卡片侧插、扩展仓位置与外观适配。它反映的是结构构想和装配表达，不代表雾化、电路、健康功能或整机硬件已经完成验证。</span></figcaption>
                </figure>
            </div>
            <div class="project-evidence-facts" aria-label="CareRing原型证据边界"><span>卡片侧插表达</span><span>扩展仓位置展示</span><span>外观适配素材</span><span>功能验证未完成</span></div>
        </div>`;
        verificationSection.insertAdjacentElement("beforebegin", section);
        section.querySelectorAll("[data-base64-image]").forEach(loadEncodedImage);
    }

    function addTradingEvidence() {
        const currentTitle = document.querySelector(".project-title")?.textContent.trim();
        if (!TRADING_TITLES.has(currentTitle)) return;
        if (document.getElementById("trading-system-evidence")) return;
        const verificationSection = findVerificationSection();
        if (!verificationSection) return;

        const section = document.createElement("section");
        section.className = "project-section project-evidence-section";
        section.id = "trading-system-evidence";
        section.innerHTML = `<div class="container">
            <div class="project-section-heading"><p>Interface Evidence</p><h2>真实运行界面</h2></div>
            <p class="project-evidence-intro">以下为系统本地运行截图，用于展示实时行情监控、执行保护、AI Radar、持仓复盘与命令行交易计划输入流程；这些界面不构成投资建议，也不代表任何收益承诺。</p>
            <div class="project-evidence-gallery project-evidence-gallery--single">
                <figure class="project-evidence-figure">
                    <div class="project-evidence-media project-evidence-media--trading-dashboard">
                        <img data-trading-image="dashboard" alt="多周期行情分析与风控报告金融交易系统实时监控与风控总览本地运行截图" loading="lazy" decoding="async">
                    </div>
                    <figcaption><strong>实时监控与风控总览</strong><span>展示多标的实时行情、24小时涨跌、成交量、资金费率、Execution Guard、AI Radar 与 Position Review。该截图只证明本地界面与监控流程存在，不构成投资建议。</span></figcaption>
                </figure>
                <figure class="project-evidence-figure">
                    <div class="project-evidence-media project-evidence-media--trading-cli">
                        <img data-trading-image="cli" alt="金融交易系统命令行运行与交易计划输入脱敏截图" loading="lazy" decoding="async">
                    </div>
                    <figcaption><strong>命令行运行与交易计划输入</strong><span>展示 Binance Futures 行情连接、Telegram 告警状态、交易计划输入和 Execution Guard 启动流程。Telegram chat_id、token前缀和本地绝对路径已遮挡，API Key 与 API Secret 未公开。</span></figcaption>
                </figure>
            </div>
            <div class="project-evidence-facts" aria-label="交易系统运行证据与边界"><span>真实本地运行截图</span><span>36项测试通过</span><span>Execution Guard</span><span>Telegram告警</span><span>敏感信息已脱敏</span></div>
        </div>`;
        verificationSection.insertAdjacentElement("beforebegin", section);
        loadChunkedImage(section.querySelector('[data-trading-image="dashboard"]'), TRADING_DASHBOARD_PARTS);
        loadChunkedImage(section.querySelector('[data-trading-image="cli"]'), TRADING_CLI_PARTS);
    }

    function initProjectEvidence() {
        if (!document.querySelector(".project-page")) return;
        addClassroomEvidence();
        addCareRingEvidence();
        addTradingEvidence();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProjectEvidence, { once: true });
    } else {
        initProjectEvidence();
    }
})();
