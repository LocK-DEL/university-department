(() => {
    "use strict";

    const RELEASE = "20260731-en1";
    const replacements = [
        ["3501391833@qq.com", "liuwenlong0706@outlook.com"],
        ["BTC多周期行情分析与风控报告系统", "多周期行情分析与风控报告金融交易系统"],
        ["BTC分析系统", "金融交易系统"]
    ];

    const routes = new Map([
        ["/", "/en/"],
        ["/index.html", "/en/"],
        ["/resume.html", "/en/resume.html"],
        ["/projects/knowledge-reconstruction.html", "/en/projects/knowledge-reconstruction.html"],
        ["/projects/trading-system.html", "/en/projects/trading-system.html"],
        ["/projects/lab-platform.html", "/en/projects/lab-platform.html"],
        ["/projects/ai-health-concept.html", "/en/projects/ai-health-concept.html"],
        ["/projects/carering.html", "/en/projects/carering.html"],
        ["/projects/ai-workflow.html", "/en/projects/ai-workflow.html"],
        ["/en/", "/"],
        ["/en/index.html", "/"],
        ["/en/resume.html", "/resume.html"],
        ["/en/projects/knowledge-reconstruction.html", "/projects/knowledge-reconstruction.html"],
        ["/en/projects/trading-system.html", "/projects/trading-system.html"],
        ["/en/projects/lab-platform.html", "/projects/lab-platform.html"],
        ["/en/projects/ai-health-concept.html", "/projects/ai-health-concept.html"],
        ["/en/projects/carering.html", "/projects/carering.html"],
        ["/en/projects/ai-workflow.html", "/projects/ai-workflow.html"],
    ]);

    function replaceValue(value) {
        if (!value) return value;
        return replacements.reduce((result, [from, to]) => result.split(from).join(to), value);
    }

    function updateTextNodes(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach((node) => {
            const parentName = node.parentElement?.tagName;
            if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parentName)) return;
            const nextValue = replaceValue(node.nodeValue);
            if (nextValue !== node.nodeValue) node.nodeValue = nextValue;
        });
    }

    function updateAttributes(root) {
        root.querySelectorAll("[href], [aria-label], [title], meta[content]").forEach((element) => {
            for (const attribute of ["href", "aria-label", "title", "content"]) {
                if (!element.hasAttribute(attribute)) continue;
                const current = element.getAttribute(attribute);
                const next = replaceValue(current);
                if (next !== current) element.setAttribute(attribute, next);
            }
        });
    }

    function normalizedPath() {
        const path = window.location.pathname.replace(/\/{2,}/g, "/");
        return path.endsWith("/") ? path : path || "/";
    }

    function counterpartPath() {
        const path = normalizedPath();
        if (routes.has(path)) return routes.get(path);
        if (path.endsWith("/index.html") && routes.has(path.slice(0, -10))) return routes.get(path.slice(0, -10));
        return document.documentElement.lang.toLowerCase().startsWith("en") ? "/" : "/en/";
    }

    function installBilingualStyle() {
        if (document.querySelector('[data-bilingual-asset="style"]')) return;
        const script = document.currentScript;
        const href = script ? new URL("bilingual.css", script.src) : new URL("/bilingual.css", document.baseURI);
        href.searchParams.set("v", RELEASE);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href.href;
        link.dataset.bilingualAsset = "style";
        document.head.appendChild(link);
    }

    function languageMarkup() {
        const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
        const other = counterpartPath();
        return `<span class="language-switch" aria-label="${isEnglish ? "Language selection" : "语言选择"}">
            <a href="${isEnglish ? other : window.location.pathname}" lang="zh-CN" ${isEnglish ? "" : 'aria-current="page"'}>中文</a>
            <span class="language-switch__separator" aria-hidden="true">|</span>
            <a href="${isEnglish ? window.location.pathname : other}" lang="en" ${isEnglish ? 'aria-current="page"' : ""}>EN</a>
        </span>`;
    }

    function installLanguageSwitch() {
        if (document.querySelector(".language-switch")) return;
        installBilingualStyle();
        const resumeActions = document.querySelector(".resume-page-actions");
        if (resumeActions) {
            resumeActions.insertAdjacentHTML("afterbegin", languageMarkup());
            return;
        }
        const navigation = document.getElementById("primary-navigation");
        if (navigation) navigation.insertAdjacentHTML("beforeend", `<li class="language-switch-item">${languageMarkup()}</li>`);
    }

    function installAlternateLinks() {
        const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
        const current = window.location.pathname || "/";
        const other = counterpartPath();
        const chinese = isEnglish ? other : current;
        const english = isEnglish ? current : other;
        const host = "https://www.universitydepartment.store";
        const entries = [["zh-CN", chinese], ["en", english], ["x-default", chinese]];
        entries.forEach(([language, path]) => {
            if (document.querySelector(`link[rel="alternate"][hreflang="${language}"]`)) return;
            const link = document.createElement("link");
            link.rel = "alternate";
            link.hreflang = language;
            link.href = `${host}${path}`;
            document.head.appendChild(link);
        });
    }

    document.title = replaceValue(document.title);
    updateTextNodes(document.documentElement);
    updateAttributes(document.documentElement);
    installLanguageSwitch();
    installAlternateLinks();
})();
