document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.getElementById("primary-navigation");
    const mobileViewport = window.matchMedia("(max-width: 768px)");

    const closeMenu = () => {
        if (!menuToggle || !navigation) {
            return;
        }

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "打开导航菜单");
        navigation.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            if (!mobileViewport.matches) {
                closeMenu();
                return;
            }

            const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
            menuToggle.setAttribute("aria-expanded", String(willOpen));
            menuToggle.setAttribute("aria-label", willOpen ? "关闭导航菜单" : "打开导航菜单");
            navigation.classList.toggle("is-open", willOpen);
            document.body.classList.toggle("menu-open", willOpen);
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";

            if (event.key === "Escape" && menuIsOpen) {
                closeMenu();
                menuToggle.focus();
            }
        });

        mobileViewport.addEventListener("change", closeMenu);
    }

    const backToTop = document.querySelector(".back-to-top");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (backToTop) {
        const updateBackToTop = () => {
            backToTop.classList.toggle("is-visible", window.scrollY > 480);
        };

        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion.matches ? "auto" : "smooth"
            });
        });
    }

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }
});
