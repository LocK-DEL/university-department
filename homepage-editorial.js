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
    const cleanupCallbacks = new Set();

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

    function markMediaReady(image, ready) {
        const media = image.closest(".cinema-media");
        const figure = image.closest("figure");
        media?.classList.toggle("is-ready", ready);
        media?.classList.toggle("is-unavailable", !ready);
        figure?.classList.toggle("is-unavailable", !ready);
        if (ready) image.dataset.homeHydrated = "true";
        delete image.dataset.homeLoading;
    }

    async function hydrateImage(image) {
        if (!image || image.dataset.homeHydrated === "true" || image.dataset.homeLoading === "true") return;
        const key = image.dataset.homeImage;
        image.dataset.homeLoading = "true";

        try {
            const source = await sourceFor(key);
            const onLoad = () => markMediaReady(image, true);
            const onError = () => markMediaReady(image, false);
            image.addEventListener("load", onLoad, { once: true });
            image.addEventListener("error", onError, { once: true });
            image.src = source;
            if (image.complete && image.naturalWidth > 0) onLoad();
        } catch (error) {
            markMediaReady(image, false);
            console.warn(`Homepage evidence could not be loaded: ${key}`, error);
        }
    }

    function installEvidenceHydration() {
        const images = [...document.querySelectorAll("[data-home-image]")];
        const heroImages = images.filter((image) => image.closest("[data-cinema-hero-layer]"));
        heroImages.forEach(hydrateImage);

        const deferred = images.filter((image) => !heroImages.includes(image));
        if (!("IntersectionObserver" in window)) {
            deferred.forEach(hydrateImage);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                hydrateImage(entry.target);
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "420px 0px", threshold: 0.01 });

        deferred.forEach((image) => observer.observe(image));
        cleanupCallbacks.add(() => observer.disconnect());
    }

    function installHeroCinema() {
        const layers = [...document.querySelectorAll("[data-cinema-hero-layer]")];
        if (layers.length < 2) return;

        let activeIndex = Math.max(0, layers.findIndex((layer) => layer.classList.contains("is-active")));
        let intervalId = null;
        let pointerFrame = 0;
        let pointerX = 0;
        let pointerY = 0;

        function activate(index) {
            activeIndex = (index + layers.length) % layers.length;
            layers.forEach((layer, layerIndex) => {
                const active = layerIndex === activeIndex;
                layer.classList.toggle("is-active", active);
                layer.setAttribute("aria-hidden", active ? "false" : "true");
                if (active) layer.querySelectorAll("[data-home-image]").forEach(hydrateImage);
            });
        }

        function stopCycle() {
            if (intervalId !== null) window.clearInterval(intervalId);
            intervalId = null;
        }

        function startCycle() {
            stopCycle();
            if (reducedMotion.matches || document.hidden) return;
            intervalId = window.setInterval(() => activate(activeIndex + 1), 9000);
        }

        function renderPointerDepth() {
            pointerFrame = 0;
            const activeLayer = layers[activeIndex];
            if (!activeLayer || reducedMotion.matches || !finePointer.matches || !desktopLayout.matches) return;
            activeLayer.style.transform = `translate3d(${pointerX * 7}px, ${pointerY * 5}px, 0) scale(1.01)`;
        }

        function onPointerMove(event) {
            pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
            pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
            if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointerDepth);
        }

        function onVisibilityChange() {
            if (document.hidden) stopCycle();
            else startCycle();
        }

        activate(activeIndex);
        startCycle();
        document.addEventListener("visibilitychange", onVisibilityChange);
        if (finePointer.matches) window.addEventListener("pointermove", onPointerMove, { passive: true });

        const onMotionChange = () => {
            layers.forEach((layer) => { layer.style.transform = ""; });
            startCycle();
        };
        reducedMotion.addEventListener?.("change", onMotionChange);

        cleanupCallbacks.add(() => {
            stopCycle();
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("pointermove", onPointerMove);
            reducedMotion.removeEventListener?.("change", onMotionChange);
            if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        });
    }

    function installIndexPreview() {
        const links = [...document.querySelectorAll("[data-cinema-index-link]")];
        const preview = document.querySelector("[data-cinema-index-preview]");
        if (!links.length || !preview || !finePointer.matches) return;

        function previewLink(link) {
            links.forEach((item) => item.classList.toggle("is-previewing", item === link));
            preview.dataset.preview = link.dataset.previewKey || "";
            const number = link.querySelector(".cinema-index__number")?.textContent?.trim() || "";
            const title = link.querySelector(".cinema-index__title")?.textContent?.trim() || "";
            preview.querySelector("span").textContent = title;
            preview.querySelector("strong").textContent = number;
        }

        function clearPreview() {
            links.forEach((item) => item.classList.remove("is-previewing"));
            preview.dataset.preview = "";
            preview.querySelector("span").textContent = "FOCUS A CHAPTER";
            preview.querySelector("strong").textContent = "01 — 06";
        }

        links.forEach((link) => {
            link.addEventListener("mouseenter", () => previewLink(link));
            link.addEventListener("focus", () => previewLink(link));
            link.addEventListener("mouseleave", clearPreview);
            link.addEventListener("blur", clearPreview);
        });
    }

    function installChapterProgress() {
        const projects = [...document.querySelectorAll("[data-cinema-project]")];
        const chainStages = [...document.querySelectorAll(".cinema-chain__stages [data-cinema-stage]")];
        if (!projects.length) return;

        const coreOrder = ["idea", "structure", "system", "test", "evidence"];

        function maximumStage(project) {
            const stages = (project.dataset.projectStages || "").split(",").map((stage) => stage.trim());
            if (stages.includes("evidence")) return 4;
            if (stages.includes("test")) return 3;
            if (stages.includes("system")) return 2;
            if (stages.includes("structure") || stages.includes("prototype") || stages.includes("process")) return 1;
            return 0;
        }

        function activateProject(project) {
            projects.forEach((item) => item.classList.toggle("is-current", item === project));
            const maximum = maximumStage(project);
            chainStages.forEach((stage, index) => {
                stage.classList.toggle("is-past", index < maximum);
                stage.classList.toggle("is-active", index === maximum);
            });
        }

        if (!("IntersectionObserver" in window)) {
            projects[0].classList.add("is-current");
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
            if (!visible) return;
            activateProject(visible.target);
        }, { rootMargin: "-22% 0px -38%", threshold: [0.18, 0.32, 0.52, 0.72] });

        projects.forEach((project) => observer.observe(project));
        activateProject(projects[0]);
        cleanupCallbacks.add(() => observer.disconnect());
    }

    function installSectionNavigation() {
        const links = [...document.querySelectorAll("[data-home-nav]")];
        if (!("IntersectionObserver" in window) || !links.length) return;
        const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

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
        }, { rootMargin: "-22% 0px -66%", threshold: [0.05, 0.2, 0.45] });

        sections.forEach((section) => observer.observe(section));
        cleanupCallbacks.add(() => observer.disconnect());
    }

    function installScrollState() {
        let frame = 0;
        function render() {
            frame = 0;
            document.body.classList.toggle("homepage-scrolled", window.scrollY > 48);
        }
        function onScroll() {
            if (!frame) frame = window.requestAnimationFrame(render);
        }
        render();
        window.addEventListener("scroll", onScroll, { passive: true });
        cleanupCallbacks.add(() => {
            window.removeEventListener("scroll", onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        });
    }

    function init() {
        if (!document.body.classList.contains("evidence-cinema")) return;
        const enhancementRoot = document.querySelector("main") || document.body;
        document.body.classList.add("homepage-enhanced");
        enhancementRoot.classList.add("homepage-enhanced");

        installEvidenceHydration();
        installHeroCinema();
        installIndexPreview();
        installChapterProgress();
        installSectionNavigation();
        installScrollState();

        window.requestAnimationFrame(() => {
            enhancementRoot.classList.add("is-intro-ready");
            document.body.classList.add("is-intro-ready");
        });
    }

    function cleanup() {
        cleanupCallbacks.forEach((callback) => callback());
        cleanupCallbacks.clear();
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
        objectUrls.clear();
        sourceCache.clear();
    }

    window.addEventListener("pagehide", cleanup, { once: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
