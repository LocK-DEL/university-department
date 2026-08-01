(() => {
    "use strict";

    const loaderScript = document.currentScript;
    const rootUrl = loaderScript ? new URL(".", loaderScript.src) : new URL("/", document.baseURI);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktopLayout = window.matchMedia("(min-width: 901px)");

    const SINGLE_ASSETS = {
        classroom: "assets/project-evidence/classroom-demo-home-hd.b64.txt",
        carering: "assets/project-evidence/carering-prototype-collage.b64.txt",
    };

    const CHUNKED_ASSETS = {
        "trading-dashboard": [
            "assets/project-evidence/trading-dashboard-final.part-01.b64.txt",
            "assets/project-evidence/trading-dashboard-final.part-02.b64.txt",
            "assets/project-evidence/trading-dashboard-final.part-03.b64.txt",
            "assets/project-evidence/trading-dashboard-final.part-04.b64.txt",
            "assets/project-evidence/trading-dashboard-final.part-05.b64.txt",
        ],
    };

    const sourceCache = new Map();
    const objectUrls = new Set();

    function decodeBase64(encoded) {
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) {
            bytes[index] = binary.charCodeAt(index);
        }
        return bytes;
    }

    function isValidWebP(bytes) {
        if (bytes.length < 12) return false;
        const signature = String.fromCharCode(...bytes.slice(0, 4));
        const format = String.fromCharCode(...bytes.slice(8, 12));
        const declaredSize = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(4, true) + 8;
        return signature === "RIFF" && format === "WEBP" && declaredSize === bytes.length;
    }

    async function fetchEncoded(path) {
        const response = await fetch(new URL(path, rootUrl), { credentials: "same-origin" });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);
        const encoded = (await response.text()).replace(/\s+/g, "");
        if (!encoded || encoded.length % 4 !== 0) throw new Error(`Invalid base64 payload: ${path}`);
        return encoded;
    }

    async function buildSingleSource(path) {
        const encoded = await fetchEncoded(path);
        const bytes = decodeBase64(encoded);
        if (!isValidWebP(bytes)) throw new Error(`Invalid WebP payload: ${path}`);
        return `data:image/webp;base64,${encoded}`;
    }

    async function buildChunkedSource(paths) {
        const chunks = await Promise.all(paths.map(async (path, index) => {
            const chunk = await fetchEncoded(path);
            if (index < paths.length - 1 && chunk.includes("=")) {
                throw new Error(`Unexpected padding before final media chunk: ${path}`);
            }
            return chunk;
        }));
        const bytes = decodeBase64(chunks.join(""));
        if (!isValidWebP(bytes)) throw new Error("Invalid reconstructed WebP payload");
        const objectUrl = URL.createObjectURL(new Blob([bytes], { type: "image/webp" }));
        objectUrls.add(objectUrl);
        return objectUrl;
    }

    function sourceFor(key) {
        if (sourceCache.has(key)) return sourceCache.get(key);
        let promise;
        if (SINGLE_ASSETS[key]) promise = buildSingleSource(SINGLE_ASSETS[key]);
        else if (CHUNKED_ASSETS[key]) promise = buildChunkedSource(CHUNKED_ASSETS[key]);
        else promise = Promise.reject(new Error(`Unknown homepage evidence asset: ${key}`));
        sourceCache.set(key, promise);
        return promise;
    }

    async function hydrateImage(image) {
        if (!image || image.dataset.homeHydrated === "true" || image.dataset.homeLoading === "true") return;
        const key = image.dataset.homeImage;
        const media = image.closest(".home-evidence-media");
        const figure = image.closest(".home-evidence-figure");
        image.dataset.homeLoading = "true";

        try {
            const source = await sourceFor(key);
            image.addEventListener("load", () => {
                image.dataset.homeHydrated = "true";
                delete image.dataset.homeLoading;
                media?.classList.add("is-ready");
                figure?.classList.remove("is-unavailable");
            }, { once: true });
            image.addEventListener("error", () => {
                delete image.dataset.homeLoading;
                media?.classList.remove("is-ready");
                figure?.classList.add("is-unavailable");
            }, { once: true });
            image.src = source;
        } catch (error) {
            delete image.dataset.homeLoading;
            media?.classList.remove("is-ready");
            figure?.classList.add("is-unavailable");
            console.warn(`Homepage evidence could not be loaded: ${key}`, error);
        }
    }

    function hydrateWithin(root) {
        root?.querySelectorAll?.("[data-home-image]").forEach(hydrateImage);
    }

    function installLazyEvidence() {
        const images = [...document.querySelectorAll("[data-home-image]")];
        if (!("IntersectionObserver" in window)) {
            images.forEach(hydrateImage);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                hydrateImage(entry.target);
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "320px 0px", threshold: 0.01 });

        images.forEach((image) => observer.observe(image));
    }

    function installProjectStage() {
        const triggers = [...document.querySelectorAll("[data-home-project-trigger]")];
        const panels = [...document.querySelectorAll("[data-home-stage-panel]")];
        const rows = [...document.querySelectorAll("[data-home-project-row]")];
        if (triggers.length !== 6 || panels.length !== 6) return;

        let activeIndex = 0;

        function activateProject(index, options = {}) {
            const nextIndex = Math.max(0, Math.min(index, triggers.length - 1));
            if (nextIndex === activeIndex && options.force !== true) {
                hydrateWithin(panels[nextIndex]);
                return;
            }
            activeIndex = nextIndex;

            triggers.forEach((trigger, triggerIndex) => {
                const active = triggerIndex === nextIndex;
                trigger.setAttribute("aria-selected", active ? "true" : "false");
                trigger.setAttribute("tabindex", active ? "0" : "-1");
            });

            rows.forEach((row, rowIndex) => {
                row.classList.toggle("is-active", rowIndex === nextIndex);
            });

            panels.forEach((panel, panelIndex) => {
                const active = panelIndex === nextIndex;
                panel.hidden = !active;
                panel.setAttribute("aria-hidden", active ? "false" : "true");
            });

            hydrateWithin(panels[nextIndex]);
        }

        triggers.forEach((trigger, index) => {
            trigger.addEventListener("click", () => activateProject(index));
            trigger.addEventListener("focus", () => activateProject(index));
            if (finePointer.matches) {
                trigger.addEventListener("mouseenter", () => activateProject(index));
            }
            trigger.addEventListener("keydown", (event) => {
                if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                let nextIndex = index;
                if (event.key === "ArrowDown") nextIndex = (index + 1) % triggers.length;
                if (event.key === "ArrowUp") nextIndex = (index - 1 + triggers.length) % triggers.length;
                if (event.key === "Home") nextIndex = 0;
                if (event.key === "End") nextIndex = triggers.length - 1;
                activateProject(nextIndex);
                triggers[nextIndex].focus();
            });
        });

        if ("IntersectionObserver" in window && !reducedMotion.matches) {
            const rowObserver = new IntersectionObserver((entries) => {
                if (!desktopLayout.matches) return;
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
                if (!visible) return;
                const index = Number(visible.target.dataset.homeProjectRow);
                if (Number.isInteger(index)) activateProject(index);
            }, { rootMargin: "-24% 0px -46%", threshold: [0.35, 0.55, 0.75] });
            rows.forEach((row) => rowObserver.observe(row));
        }

        activateProject(0, { force: true });
    }

    function installSectionNavigation() {
        const links = [...document.querySelectorAll("[data-home-nav]")];
        if (!("IntersectionObserver" in window) || !links.length) return;
        const sections = links
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);

        const observer = new IntersectionObserver((entries) => {
            const current = entries
                .filter((entry) => entry.isIntersecting)
                .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
            if (!current) return;
            links.forEach((link) => {
                const active = link.getAttribute("href") === `#${current.target.id}`;
                if (active) link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
            });
        }, { rootMargin: "-28% 0px -62%", threshold: [0.05, 0.2, 0.45] });

        sections.forEach((section) => observer.observe(section));
    }

    function init() {
        if (!document.body.classList.contains("home-editorial")) return;
        document.body.classList.add("homepage-enhanced");
        installProjectStage();
        installSectionNavigation();
        installLazyEvidence();
    }

    window.addEventListener("pagehide", () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
        objectUrls.clear();
    }, { once: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
