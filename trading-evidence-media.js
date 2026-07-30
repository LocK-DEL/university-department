(() => {
    "use strict";

    const MEDIA = {
        dashboard: [
            ["assets/project-evidence/trading-dashboard.part-01.b64.txt", 8000],
            ["assets/project-evidence/trading-dashboard.part-02.b64.txt", 16000],
            ["assets/project-evidence/trading-dashboard.part-02b1.b64.txt", null],
            ["assets/project-evidence/trading-dashboard.part-02b2.b64.txt", null],
            ["assets/project-evidence/trading-dashboard.part-03.b64.txt", 15000],
            ["assets/project-evidence/trading-dashboard.part-04.b64.txt", 14432],
        ],
        cli: [
            ["assets/project-evidence/trading-cli.part-01.b64.txt", 15000],
            ["assets/project-evidence/trading-cli.part-02.b64.txt", 14264],
        ],
    };

    const loaderScript = document.currentScript;
    const baseUrl = loaderScript ? new URL(".", loaderScript.src) : new URL(".", document.baseURI);

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
        const declaredSize = new DataView(bytes.buffer).getUint32(4, true) + 8;
        return signature === "RIFF" && format === "WEBP" && declaredSize === bytes.length;
    }

    async function loadMediaParts(definition) {
        const chunks = await Promise.all(definition.map(async ([path, expectedLength]) => {
            const response = await fetch(new URL(path, baseUrl), { credentials: "same-origin" });
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);

            const chunk = (await response.text()).replace(/\s+/g, "");
            if (!chunk) throw new Error(`Empty media chunk: ${path}`);

            if (expectedLength !== null) {
                if (chunk.length < expectedLength) {
                    throw new Error(`Incomplete media chunk: ${path}`);
                }
                return chunk.slice(0, expectedLength);
            }

            return chunk;
        }));

        const encoded = chunks.join("");
        const bytes = decodeBase64(encoded);
        if (!isValidWebP(bytes)) throw new Error("Invalid reconstructed WebP payload");
        return URL.createObjectURL(new Blob([bytes], { type: "image/webp" }));
    }

    async function hydrateImage(key) {
        const image = document.querySelector(`[data-trading-image="${key}"]`);
        if (!image) return;

        try {
            const objectUrl = await loadMediaParts(MEDIA[key]);
            image.addEventListener("load", () => {
                image.closest("figure")?.classList.remove("is-unavailable");
                image.closest(".project-evidence-media")?.classList.add("is-ready");
            }, { once: true });
            image.src = objectUrl;
            window.addEventListener("pagehide", () => URL.revokeObjectURL(objectUrl), { once: true });
        } catch (error) {
            image.closest("figure")?.classList.add("is-unavailable");
            console.warn(`Trading ${key} evidence could not be reconstructed.`, error);
        }
    }

    function init() {
        if (!document.getElementById("trading-system-evidence")) return;
        hydrateImage("dashboard");
        hydrateImage("cli");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => window.setTimeout(init, 0), { once: true });
    } else {
        window.setTimeout(init, 0);
    }
})();
