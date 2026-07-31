(() => {
    const RELEASE = "20260731-en1";
    const loaderScript = document.currentScript || [...document.scripts].find((script) => /(?:^|\/)script\.js(?:\?|$)/.test(script.src));

    if (loaderScript) {
        const identityRuntimeUrl = new URL("identity-overrides.js", loaderScript.src);
        const styleUrl = new URL("motion.css", loaderScript.src);
        const timelineFixUrl = new URL("timeline-fix.css", loaderScript.src);
        const projectLinksFixUrl = new URL("desktop-project-links.css", loaderScript.src);
        const resumeStyleUrl = new URL("resume.css", loaderScript.src);
        const resumeEntryUrl = new URL("resume-entry.js", loaderScript.src);
        const evidenceStyleUrl = new URL("project-evidence.css", loaderScript.src);
        const bilingualRuntimeUrl = new URL("bilingual-runtime.js", loaderScript.src);
        const evidenceRuntimeUrl = new URL("project-evidence.js", loaderScript.src);
        const tradingEvidenceRuntimeUrl = new URL("trading-evidence-final.js", loaderScript.src);
        const runtimeUrl = new URL("motion.js", loaderScript.src);

        [
            identityRuntimeUrl,
            styleUrl,
            timelineFixUrl,
            projectLinksFixUrl,
            resumeStyleUrl,
            resumeEntryUrl,
            evidenceStyleUrl,
            bilingualRuntimeUrl,
            evidenceRuntimeUrl,
            tradingEvidenceRuntimeUrl,
            runtimeUrl,
        ].forEach((url) => url.searchParams.set("v", RELEASE));

        const addScript = (selector, source, dataKey, dataValue) => {
            if (document.querySelector(selector)) return;
            const script = document.createElement("script");
            script.src = source.href;
            script.async = false;
            script.dataset[dataKey] = dataValue;
            document.head.appendChild(script);
        };

        const addStyle = (selector, source, dataKey, dataValue) => {
            if (document.querySelector(selector)) return;
            const stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.href = source.href;
            stylesheet.dataset[dataKey] = dataValue;
            document.head.appendChild(stylesheet);
        };

        addScript('[data-identity-asset="runtime"]', identityRuntimeUrl, "identityAsset", "runtime");
        addStyle('[data-motion-asset="style"]', styleUrl, "motionAsset", "style");
        addStyle('[data-motion-asset="timeline-fix"]', timelineFixUrl, "motionAsset", "timeline-fix");
        addStyle('[data-motion-asset="project-links-fix"]', projectLinksFixUrl, "motionAsset", "project-links-fix");
        addStyle('[data-resume-asset="style"]', resumeStyleUrl, "resumeAsset", "style");
        addScript('[data-resume-asset="entry"]', resumeEntryUrl, "resumeAsset", "entry");
        addStyle('[data-project-evidence-asset="style"]', evidenceStyleUrl, "projectEvidenceAsset", "style");
        addScript('[data-bilingual-asset="runtime"]', bilingualRuntimeUrl, "bilingualAsset", "runtime");
        addScript('[data-project-evidence-asset="runtime"]', evidenceRuntimeUrl, "projectEvidenceAsset", "runtime");
        addScript('[data-project-evidence-asset="trading-runtime"]', tradingEvidenceRuntimeUrl, "projectEvidenceAsset", "trading-runtime");
        addScript('[data-motion-asset="runtime"]', runtimeUrl, "motionAsset", "runtime");
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
    const menuLabels = isEnglish
        ? { open: "Open navigation menu", close: "Close navigation menu" }
        : { open: "打开导航菜单", close: "关闭导航菜单" };
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.getElementById("primary-navigation");
    const mobileViewport = window.matchMedia("(max-width: 768px)");

    const closeMenu = () => {
        if (!menuToggle || !navigation) return;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", menuLabels.open);
        navigation.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    if (menuToggle && navigation) {
        menuToggle.setAttribute("aria-label", menuLabels.open);
        menuToggle.addEventListener("click", () => {
            if (!mobileViewport.matches) {
                closeMenu();
                return;
            }
            const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
            menuToggle.setAttribute("aria-expanded", String(willOpen));
            menuToggle.setAttribute("aria-label", willOpen ? menuLabels.close : menuLabels.open);
            navigation.classList.toggle("is-open", willOpen);
            document.body.classList.toggle("menu-open", willOpen);
        });
        navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
                closeMenu();
                menuToggle.focus();
            }
        });
        mobileViewport.addEventListener("change", closeMenu);
    }

    const backToTop = document.querySelector(".back-to-top");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (backToTop) {
        const updateBackToTop = () => backToTop.classList.toggle("is-visible", window.scrollY > 480);
        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();
        backToTop.addEventListener("click", () => window.scrollTo({
            top: 0,
            behavior: reducedMotion.matches ? "auto" : "smooth",
        }));
    }

    const currentYear = document.getElementById("current-year");
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});
