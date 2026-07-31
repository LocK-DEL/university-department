(() => {
    "use strict";

    const TRADING_TITLES = new Set([
        "BTC多周期行情分析与风控报告系统",
        "多周期行情分析与风控报告金融交易系统",
        "Multi-Timeframe Market Analysis and Risk Reporting System",
    ]);
    const loaderScript = document.currentScript;
    const rootUrl = loaderScript ? new URL(".", loaderScript.src) : new URL("../", document.baseURI);
    const isEnglish = document.documentElement.lang.startsWith("en");
    const DASHBOARD_FIRST = new URL("assets/project-evidence/trading-dashboard-final.part-01.b64.txt", rootUrl).href;
    const CLI_FIRST = new URL("assets/project-evidence/trading-cli-final.part-01.b64.txt", rootUrl).href;

    const MEDIA = {
        dashboard: [
            DASHBOARD_FIRST,
            "assets/project-evidence/trading-dashboard-final.part-02.b64.txt",
            "assets/project-evidence/trading-dashboard-final.part-03.b64.txt",
            "assets/project-evidence/trading-dashboard-final.part-04.b64.txt",
            "assets/project-evidence/trading-dashboard-final.part-05.b64.txt",
        ],
        cli: [
            CLI_FIRST,
            "assets/project-evidence/trading-cli-final.part-02.b64.txt",
            "assets/project-evidence/trading-cli-final.part-03.b64.txt",
            "assets/project-evidence/trading-cli-final.part-04.b64.txt",
        ],
    };

    const COPY = isEnglish ? {
        heading: "Verified local interfaces",
        intro: "These screenshots show the system running locally, including public-market monitoring, execution safeguards, AI Radar, position review and command-line plan input. They demonstrate interface and workflow existence only and do not constitute investment advice or a performance claim.",
        dashboardAlt: "Local multi-timeframe market-analysis and risk-reporting dashboard",
        dashboardTitle: "Market monitoring and risk overview",
        dashboardCaption: "Shows multi-asset market data, 24-hour changes, volume, funding rates, Execution Guard, AI Radar and Position Review. The interface documents monitoring and risk-control functions; it does not represent a financial result.",
        cliAlt: "Sanitized command-line interface for market analysis and risk-plan input",
        cliTitle: "Command-line workflow and plan input",
        cliCaption: "Shows public Binance Futures data access, Telegram alert status, plan input and Execution Guard startup. Local absolute paths, Telegram token prefixes and chat identifiers are masked; API keys and secrets are not published.",
        factsLabel: "Trading-system evidence and safety boundaries",
        facts: ["Verified local screenshots", "36 tests passed", "Execution Guard", "Telegram alerts", "Sensitive data sanitized"],
    } : {
        heading: "真实运行界面",
        intro: "以下为系统真实本地运行截图，用于展示实时行情监控、执行保护、AI Radar、持仓复盘和命令行交易计划输入流程。截图只证明界面与本地流程存在，不构成投资建议或收益承诺。",
        dashboardAlt: "多周期行情分析与风控报告金融交易系统实时监控与风控总览本地运行截图",
        dashboardTitle: "实时监控与风控总览",
        dashboardCaption: "展示多标的行情、24小时涨跌、成交量、资金费率、Execution Guard、AI Radar与Position Review。画面用于说明系统监控与风控界面，不代表任何盈利结果。",
        cliAlt: "金融交易系统命令行运行与交易计划输入脱敏截图",
        cliTitle: "命令行运行与交易计划输入",
        cliCaption: "展示Binance Futures行情连接、Telegram告警状态、交易计划输入和Execution Guard启动流程。本地绝对路径、Telegram token前缀和chat_id已遮挡，API Key与API Secret未公开。",
        factsLabel: "交易系统运行证据与边界",
        facts: ["真实本地运行截图", "36项测试通过", "Execution Guard", "Telegram告警", "敏感信息已脱敏"],
    };

    function decodeBase64(encoded) {
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        return bytes;
    }

    function isValidWebP(bytes) {
        if (bytes.length < 12) return false;
        const signature = String.fromCharCode(...bytes.slice(0, 4));
        const format = String.fromCharCode(...bytes.slice(8, 12));
        const declaredSize = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(4, true) + 8;
        return signature === "RIFF" && format === "WEBP" && declaredSize === bytes.length;
    }

    async function reconstructMedia(paths) {
        const chunks = await Promise.all(paths.map(async (path, index) => {
            const response = await fetch(new URL(path, rootUrl), { credentials: "same-origin" });
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);
            const chunk = (await response.text()).replace(/\s+/g, "");
            if (!chunk || chunk.length % 4 !== 0) throw new Error(`Invalid media chunk length: ${path}`);
            if (index < paths.length - 1 && chunk.includes("=")) throw new Error(`Unexpected media padding: ${path}`);
            return chunk;
        }));
        const bytes = decodeBase64(chunks.join(""));
        if (!isValidWebP(bytes)) throw new Error("Invalid reconstructed WebP payload");
        return URL.createObjectURL(new Blob([bytes], { type: "image/webp" }));
    }

    async function hydrateImage(key) {
        const image = document.querySelector(`[data-trading-evidence-image="${key}"]`);
        if (!image) return;
        try {
            const objectUrl = await reconstructMedia(MEDIA[key]);
            image.addEventListener("load", () => image.closest(".project-evidence-media")?.classList.add("is-ready"), { once: true });
            image.src = objectUrl;
            window.addEventListener("pagehide", () => URL.revokeObjectURL(objectUrl), { once: true });
        } catch (error) {
            image.closest("figure")?.classList.add("is-unavailable");
            console.warn(`Trading evidence image could not be loaded: ${key}`, error);
        }
    }

    function findVerificationSection() {
        return document.querySelector("[data-verification-section]")
            || document.querySelector(".verification-panel")?.closest(".project-section")
            || null;
    }

    function installStyles() {
        if (document.querySelector('[data-trading-evidence-style="final"]')) return;
        const style = document.createElement("style");
        style.dataset.tradingEvidenceStyle = "final";
        style.textContent = `
            .project-evidence-intro { max-width: 920px; margin: 0 0 28px; color: var(--muted); line-height: 1.8; }
            .trading-evidence-gallery { gap: 26px; }
            .project-evidence-media--trading-dashboard { aspect-ratio: 800 / 506; }
            .project-evidence-media--trading-cli { aspect-ratio: 800 / 463; }
            .project-evidence-media--trading-dashboard img,
            .project-evidence-media--trading-cli img { object-fit: contain; object-position: center; }
            @media (max-width: 768px) { .project-evidence-intro { margin-bottom: 20px; font-size: 0.94rem; } }
        `;
        document.head.appendChild(style);
    }

    function projectMatches() {
        const key = document.querySelector(".project-page")?.dataset.projectKey;
        if (key === "trading-system") return true;
        const title = document.querySelector(".project-title")?.textContent.trim();
        return TRADING_TITLES.has(title);
    }

    function factsMarkup() {
        return COPY.facts.map((item) => `<span>${item}</span>`).join("");
    }

    function addTradingEvidence() {
        if (!projectMatches() || document.getElementById("trading-system-evidence")) return;
        const verificationSection = findVerificationSection();
        if (!verificationSection) return;
        installStyles();

        const section = document.createElement("section");
        section.className = "project-section project-evidence-section trading-evidence-section";
        section.id = "trading-system-evidence";
        section.innerHTML = `<div class="container">
            <div class="project-section-heading"><p>Interface Evidence</p><h2>${COPY.heading}</h2></div>
            <p class="project-evidence-intro">${COPY.intro}</p>
            <div class="project-evidence-gallery project-evidence-gallery--single trading-evidence-gallery">
                <figure class="project-evidence-figure">
                    <div class="project-evidence-media project-evidence-media--trading-dashboard"><img data-trading-evidence-image="dashboard" alt="${COPY.dashboardAlt}" loading="lazy" decoding="async"></div>
                    <figcaption><strong>${COPY.dashboardTitle}</strong><span>${COPY.dashboardCaption}</span></figcaption>
                </figure>
                <figure class="project-evidence-figure">
                    <div class="project-evidence-media project-evidence-media--trading-cli"><img data-trading-evidence-image="cli" alt="${COPY.cliAlt}" loading="lazy" decoding="async"></div>
                    <figcaption><strong>${COPY.cliTitle}</strong><span>${COPY.cliCaption}</span></figcaption>
                </figure>
            </div>
            <div class="project-evidence-facts" aria-label="${COPY.factsLabel}">${factsMarkup()}</div>
        </div>`;

        verificationSection.insertAdjacentElement("beforebegin", section);
        hydrateImage("dashboard");
        hydrateImage("cli");
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addTradingEvidence, { once: true });
    else addTradingEvidence();
})();