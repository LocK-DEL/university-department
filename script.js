(() => {
    const RELEASE = "20260731-en1";
    const loaderScript = document.currentScript || [...document.scripts].find((script) => /(?:^|\/)script\.js(?:\?|$)/.test(script.src));

    if (loaderScript) {
        const assetUrl = (name) => {
            const url = new URL(name, loaderScript.src);
            url.searchParams.set("v", RELEASE);
            return url.href;
        };
        const addScript = (selector, source, dataKey, dataValue) => {
            if (document.querySelector(selector)) return;
            const script = document.createElement("script");
            script.src = source;
            script.async = false;
            script.dataset[dataKey] = dataValue;
            document.head.appendChild(script);
        };
        const addStyle = (selector, source, dataKey, dataValue) => {
            if (document.querySelector(selector)) return;
            const stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.href = source;
            stylesheet.dataset[dataKey] = dataValue;
            document.head.appendChild(stylesheet);
        };

        addScript('[data-identity-asset="runtime"]', assetUrl("identity-overrides.js"), "identityAsset", "runtime");
        addStyle('[data-motion-asset="style"]', assetUrl("motion.css"), "motionAsset", "style");
        addStyle('[data-motion-asset="timeline-fix"]', assetUrl("timeline-fix.css"), "motionAsset", "timeline-fix");
        addStyle('[data-motion-asset="project-links-fix"]', assetUrl("desktop-project-links.css"), "motionAsset", "project-links-fix");
        addStyle('[data-resume-asset="style"]', assetUrl("resume.css"), "resumeAsset", "style");
        addScript('[data-resume-asset="entry"]', assetUrl("resume-entry.js"), "resumeAsset", "entry");
        addStyle('[data-project-evidence-asset="style"]', assetUrl("project-evidence.css"), "projectEvidenceAsset", "style");
        addScript('[data-bilingual-asset="runtime"]', assetUrl("bilingual-runtime.js"), "bilingualAsset", "runtime");
        addScript('[data-project-evidence-asset="runtime"]', assetUrl("project-evidence.js"), "projectEvidenceAsset", "runtime");
        addScript('[data-project-evidence-asset="trading-runtime"]', assetUrl("trading-evidence-bilingual.js"), "projectEvidenceAsset", "trading-runtime");
        addScript('[data-motion-asset="runtime"]', assetUrl("motion.js"), "motionAsset", "runtime");
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
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" }));
    }

    const currentYear = document.getElementById("current-year");
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});
