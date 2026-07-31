(() => {
    const loaderScript = document.currentScript || [...document.scripts].find((script) => /(?:^|\/)script\.js(?:\?|$)/.test(script.src));

    if (loaderScript) {
        const identityRuntimeUrl = new URL("identity-overrides.js", loaderScript.src).href;
        const styleUrl = new URL("motion.css", loaderScript.src).href;
        const timelineFixUrl = new URL("timeline-fix.css", loaderScript.src).href;
        const projectLinksFixUrl = new URL("desktop-project-links.css", loaderScript.src).href;
        const resumeStyleUrl = new URL("resume.css", loaderScript.src).href;
        const resumeEntryUrl = new URL("resume-entry.js", loaderScript.src).href;
        const evidenceStyleUrl = new URL("project-evidence.css", loaderScript.src).href;
        const evidenceRuntimeUrl = new URL("project-evidence.js", loaderScript.src).href;
        const tradingEvidenceRuntimeUrl = new URL("trading-evidence-final.js", loaderScript.src).href;
        const runtimeUrl = new URL("motion.js", loaderScript.src).href;

        if (!document.querySelector('[data-identity-asset="runtime"]')) {
            const identityRuntime = document.createElement("script");
            identityRuntime.src = identityRuntimeUrl;
            identityRuntime.async = false;
            identityRuntime.dataset.identityAsset = "runtime";
            document.head.appendChild(identityRuntime);
        }

        if (!document.querySelector('[data-motion-asset="style"]')) {
            const stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.href = styleUrl;
            stylesheet.dataset.motionAsset = "style";
            document.head.appendChild(stylesheet);
        }

        if (!document.querySelector('[data-motion-asset="timeline-fix"]')) {
            const timelineFix = document.createElement("link");
            timelineFix.rel = "stylesheet";
            timelineFix.href = timelineFixUrl;
            timelineFix.dataset.motionAsset = "timeline-fix";
            document.head.appendChild(timelineFix);
        }

        if (!document.querySelector('[data-motion-asset="project-links-fix"]')) {
            const projectLinksFix = document.createElement("link");
            projectLinksFix.rel = "stylesheet";
            projectLinksFix.href = projectLinksFixUrl;
            projectLinksFix.dataset.motionAsset = "project-links-fix";
            document.head.appendChild(projectLinksFix);
        }

        if (!document.querySelector('[data-resume-asset="style"]')) {
            const resumeStyle = document.createElement("link");
            resumeStyle.rel = "stylesheet";
            resumeStyle.href = resumeStyleUrl;
            resumeStyle.dataset.resumeAsset = "style";
            document.head.appendChild(resumeStyle);
        }

        if (!document.querySelector('[data-resume-asset="entry"]')) {
            const resumeEntry = document.createElement("script");
            resumeEntry.src = resumeEntryUrl;
            resumeEntry.async = false;
            resumeEntry.dataset.resumeAsset = "entry";
            document.head.appendChild(resumeEntry);
        }

        if (!document.querySelector('[data-project-evidence-asset="style"]')) {
            const evidenceStyle = document.createElement("link");
            evidenceStyle.rel = "stylesheet";
            evidenceStyle.href = evidenceStyleUrl;
            evidenceStyle.dataset.projectEvidenceAsset = "style";
            document.head.appendChild(evidenceStyle);
        }

        if (!document.querySelector('[data-project-evidence-asset="runtime"]')) {
            const evidenceRuntime = document.createElement("script");
            evidenceRuntime.src = evidenceRuntimeUrl;
            evidenceRuntime.async = false;
            evidenceRuntime.dataset.projectEvidenceAsset = "runtime";
            document.head.appendChild(evidenceRuntime);
        }

        if (!document.querySelector('[data-project-evidence-asset="trading-runtime"]')) {
            const tradingEvidenceRuntime = document.createElement("script");
            tradingEvidenceRuntime.src = tradingEvidenceRuntimeUrl;
            tradingEvidenceRuntime.async = false;
            tradingEvidenceRuntime.dataset.projectEvidenceAsset = "trading-runtime";
            document.head.appendChild(tradingEvidenceRuntime);
        }

        if (!document.querySelector('[data-motion-asset="runtime"]')) {
            const runtime = document.createElement("script");
            runtime.src = runtimeUrl;
            runtime.async = false;
            runtime.dataset.motionAsset = "runtime";
            document.head.appendChild(runtime);
        }
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const isEnglish = document.documentElement.lang.startsWith("en");
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
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
        });
    }

    const currentYear = document.getElementById("current-year");
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});