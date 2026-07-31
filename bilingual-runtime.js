(() => {
    "use strict";

    function normalizeProjectPage() {
        const page = document.querySelector(".project-page");
        const bodyKey = document.body?.dataset.projectKey;
        if (page && bodyKey && !page.dataset.projectKey) page.dataset.projectKey = bodyKey;

        const verificationHeadings = [
            "当前验证状态",
            "Current validation status",
            "Current verification status",
        ];
        const verificationHeading = [...document.querySelectorAll(".project-section-heading h2")]
            .find((heading) => verificationHeadings.includes(heading.textContent.trim()));
        const section = verificationHeading?.closest(".project-section");
        if (section) section.dataset.verificationSection = "true";
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", normalizeProjectPage, { once: true });
    } else {
        normalizeProjectPage();
    }
})();
