(() => {
    "use strict";

    function printResume() {
        window.print();
    }

    function initPrintActions() {
        document.querySelectorAll("[data-print-resume]").forEach((button) => {
            button.addEventListener("click", printResume);
        });

        if (window.location.hash === "#print") {
            window.setTimeout(printResume, 350);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPrintActions, { once: true });
    } else {
        initPrintActions();
    }
})();
