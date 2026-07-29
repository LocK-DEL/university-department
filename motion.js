(() => {
    "use strict";

    const root = document.documentElement;
    const body = document.body;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const state = {
        framePending: false,
        reduced: reducedMotionQuery.matches,
        desktop: desktopQuery.matches,
        finePointer: finePointerQuery.matches,
        activeProject: -1,
        activeSkill: -1,
        activeTimeline: -1,
        pointerTargetX: 0,
        pointerTargetY: 0,
        pointerX: 0,
        pointerY: 0,
        hero: null,
        skills: null,
        skillsTrack: null,
        skillsViewport: null,
        projects: null,
        projectCards: [],
        timeline: null,
        timelineItems: []
    };

    function addScrollProgress() {
        if (document.querySelector(".scroll-progress")) return;
        const progress = document.createElement("div");
        progress.className = "scroll-progress";
        progress.setAttribute("aria-hidden", "true");
        progress.innerHTML = '<span class="scroll-progress__bar"></span>';
        const skipLink = document.querySelector(".skip-link");
        if (skipLink) skipLink.insertAdjacentElement("afterend", progress);
        else body.prepend(progress);
    }

    function markReveal(element, index = 0) {
        if (!element || element.hasAttribute("data-reveal")) return;
        element.setAttribute("data-reveal", "");
        element.style.setProperty("--reveal-index", String(index));
    }

    function enhanceHero() {
        const hero = document.getElementById("home");
        if (!hero) return;
        state.hero = hero;
        hero.dataset.scene = "hero";
        hero.classList.add("story-hero");

        const copy = hero.querySelector(".hero-copy");
        const heading = hero.querySelector("h1");
        if (heading && !heading.querySelector(".hero-line")) {
            heading.setAttribute("aria-label", "把复杂问题，转化为可以运行的AI产品");
            heading.innerHTML = [
                '<span class="hero-line">把复杂问题</span>',
                '<span class="hero-line">转化为可以运行的</span>',
                '<span class="hero-line hero-line--accent">AI产品</span>'
            ].join("");
        }

        if (!hero.querySelector(".hero-atmosphere")) {
            const atmosphere = document.createElement("div");
            atmosphere.className = "hero-atmosphere";
            atmosphere.setAttribute("aria-hidden", "true");
            atmosphere.innerHTML = '<span class="hero-orbit hero-orbit--one"></span><span class="hero-orbit hero-orbit--two"></span><span class="hero-axis"></span>';
            hero.prepend(atmosphere);
        }

        [
            hero.querySelector(".eyebrow"),
            heading,
            hero.querySelector(".hero-identity"),
            hero.querySelector(".hero-description"),
            hero.querySelector(".hero-actions"),
            hero.querySelector(".capability-panel")
        ].forEach((element, index) => markReveal(element, index));
        if (copy) copy.dataset.heroCopy = "";
    }

    function enhanceAbout() {
        const about = document.getElementById("about");
        if (!about) return;
        about.dataset.scene = "about";
        about.classList.add("about-story");
        const container = about.querySelector(".container");
        if (container && !about.querySelector(".about-metric")) {
            const metric = document.createElement("div");
            metric.className = "about-metric";
            metric.setAttribute("aria-label", "六个代表项目");
            metric.innerHTML = '<strong>06</strong><span>PROJECTS</span>';
            const intro = about.querySelector(".about-intro");
            if (intro) intro.insertAdjacentElement("beforebegin", metric);
            else container.prepend(metric);
        }
        markReveal(about.querySelector(".section-heading"), 0);
        markReveal(about.querySelector(".about-metric"), 1);
        markReveal(about.querySelector(".about-intro"), 2);
        about.querySelectorAll(".feature-card").forEach((card, index) => markReveal(card, index + 3));
    }

    function enhanceSkills() {
        const skills = document.getElementById("skills");
        const grid = skills?.querySelector(".skills-grid");
        if (!skills || !grid) return;
        state.skills = skills;
        state.skillsTrack = grid;
        skills.dataset.scene = "skills";
        skills.classList.add("skills-scene");
        grid.classList.add("skills-track");

        if (!grid.parentElement.classList.contains("skills-viewport")) {
            const viewport = document.createElement("div");
            viewport.className = "skills-viewport";
            grid.parentNode.insertBefore(viewport, grid);
            viewport.appendChild(grid);
        }
        state.skillsViewport = grid.parentElement;
        skills.querySelector(".container")?.classList.add("skills-sticky");
        markReveal(skills.querySelector(".section-heading"), 0);

        grid.querySelectorAll(".skill-card").forEach((card, index) => {
            card.dataset.skillIndex = String(index);
            if (!card.querySelector(".skill-sequence")) {
                const number = document.createElement("span");
                number.className = "skill-sequence";
                number.setAttribute("aria-hidden", "true");
                number.textContent = String(index + 1).padStart(2, "0");
                card.prepend(number);
            }
        });
    }

    function enhanceProjects() {
        const projects = document.getElementById("projects");
        const grid = projects?.querySelector(".projects-grid");
        if (!projects || !grid) return;
        state.projects = projects;
        state.projectCards = [...grid.querySelectorAll(".project-card")];
        if (state.projectCards.length !== 6) return;

        projects.dataset.scene = "projects";
        projects.classList.add("projects-scene");
        projects.querySelector(".container")?.classList.add("projects-sticky");
        grid.classList.add("project-stage");

        const accents = ["#8da9ff", "#72d8d1", "#a99af4", "#c59ba3", "#8eb6c7", "#c8ad7f"];
        state.projectCards.forEach((card, index) => {
            card.classList.add("project-panel");
            card.dataset.projectIndex = String(index);
            card.dataset.projectAccent = accents[index];
            card.dataset.projectNumber = `${String(index + 1).padStart(2, "0")} / 06`;
            card.setAttribute("aria-hidden", index === 0 ? "false" : "true");
            card.classList.toggle("is-active", index === 0);
            markReveal(card.querySelector(".project-content"), 0);
        });

        if (!projects.querySelector(".project-stage-progress")) {
            const nav = document.createElement("div");
            nav.className = "project-stage-progress";
            nav.setAttribute("aria-hidden", "true");
            nav.innerHTML = accents.map((_, index) => `<span data-project-dot="${index}"></span>`).join("");
            grid.insertAdjacentElement("afterend", nav);
        }

        if (!projects.querySelector(".project-scroll-steps")) {
            const steps = document.createElement("div");
            steps.className = "project-scroll-steps";
            steps.setAttribute("aria-hidden", "true");
            steps.innerHTML = accents.map((accent, index) => `<span class="project-step" data-project-index="${index}" data-project-accent="${accent}"></span>`).join("");
            projects.appendChild(steps);
        }
        setActiveProject(0);
    }

    function enhanceExperience() {
        const experience = document.getElementById("experience");
        if (!experience) return;
        state.timeline = experience;
        state.timelineItems = [...experience.querySelectorAll(".timeline-item")];
        experience.dataset.scene = "experience";
        experience.classList.add("timeline-story");
        experience.querySelector(".timeline")?.setAttribute("data-active-timeline", "0");
        markReveal(experience.querySelector(".section-heading"), 0);
        state.timelineItems.forEach((item, index) => {
            item.dataset.timelineIndex = String(index);
            markReveal(item, index + 1);
        });
    }

    function enhanceContact() {
        const contact = document.getElementById("contact");
        if (!contact) return;
        contact.dataset.scene = "contact";
        contact.classList.add("contact-finale");
        const panel = contact.querySelector(".contact-panel");
        if (panel && !panel.querySelector(".contact-finale-title")) {
            const title = document.createElement("div");
            title.className = "contact-finale-title";
            title.innerHTML = '<p>LET’S BUILD</p><p>SOMETHING REAL.</p><span>让想法成为可验证的产品与系统。</span>';
            panel.prepend(title);
        }
        markReveal(contact.querySelector(".contact-finale-title"), 0);
        markReveal(contact.querySelector(".section-heading"), 1);
        markReveal(contact.querySelector(".contact-copy"), 2);
        markReveal(contact.querySelector(".contact-actions"), 3);
    }

    function enhanceProjectPage() {
        const page = document.querySelector(".project-page");
        if (!page) return;
        body.dataset.motionRoot = "project";
        page.classList.add("project-story");
        [
            ".project-breadcrumb",
            ".project-label",
            ".project-title",
            ".project-summary",
            ".project-overview-grid",
            ".project-resource-actions",
            ".project-section-heading",
            ".project-feature-card",
            ".project-content-grid",
            ".project-flow",
            ".architecture-panel",
            ".tech-stack-list",
            ".verification-panel",
            ".privacy-note",
            ".project-navigation"
        ].forEach((selector) => {
            page.querySelectorAll(selector).forEach((element, index) => markReveal(element, index % 5));
        });
    }

    function observeReveals() {
        const nodes = [...document.querySelectorAll("[data-reveal]")];
        if (state.reduced || !("IntersectionObserver" in window)) {
            nodes.forEach((node) => node.classList.add("is-visible"));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
        nodes.forEach((node) => observer.observe(node));
    }

    function setActiveProject(index) {
        if (index === state.activeProject || !state.projectCards.length) return;
        state.activeProject = index;
        const card = state.projectCards[index];
        const accent = card?.dataset.projectAccent || "#8da9ff";
        state.projects?.style.setProperty("--project-accent", accent);
        state.projects?.setAttribute("data-active-project", String(index));
        state.projectCards.forEach((panel, panelIndex) => {
            const active = panelIndex === index;
            panel.classList.toggle("is-active", active);
            panel.setAttribute("aria-hidden", active ? "false" : "true");
            panel.querySelectorAll("a, button").forEach((control) => {
                if (active || !state.desktop || state.reduced) control.removeAttribute("tabindex");
                else control.setAttribute("tabindex", "-1");
            });
        });
        state.projects?.querySelectorAll("[data-project-dot]").forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === index);
        });
    }

    function updatePageProgress() {
        const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        root.style.setProperty("--page-progress", String(clamp(window.scrollY / scrollable)));
    }

    function updateHero() {
        if (!state.hero) return;
        const rect = state.hero.getBoundingClientRect();
        const progress = clamp(-rect.top / Math.max(1, rect.height));
        state.hero.style.setProperty("--hero-progress", String(progress));
        if (!state.reduced && state.finePointer && !document.hidden) {
            state.pointerX += (state.pointerTargetX - state.pointerX) * 0.09;
            state.pointerY += (state.pointerTargetY - state.pointerY) * 0.09;
            state.hero.style.setProperty("--pointer-x", `${state.pointerX.toFixed(2)}px`);
            state.hero.style.setProperty("--pointer-y", `${state.pointerY.toFixed(2)}px`);
            if (Math.abs(state.pointerTargetX - state.pointerX) > 0.05 || Math.abs(state.pointerTargetY - state.pointerY) > 0.05) scheduleFrame();
        }
    }

    function updateSkills() {
        if (!state.skills || !state.skillsTrack || !state.skillsViewport) return;
        if (!state.desktop || state.reduced) {
            state.skills.style.removeProperty("--skills-offset");
            state.skillsTrack.querySelectorAll(".skill-card").forEach((card) => card.classList.remove("is-active"));
            return;
        }
        const rect = state.skills.getBoundingClientRect();
        const travel = Math.max(1, state.skills.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / travel);
        const maxShift = Math.max(0, state.skillsTrack.scrollWidth - state.skillsViewport.clientWidth);
        state.skills.style.setProperty("--skills-offset", `${(-progress * maxShift).toFixed(2)}px`);
        const cards = [...state.skillsTrack.querySelectorAll(".skill-card")];
        const active = Math.round(progress * Math.max(0, cards.length - 1));
        if (active !== state.activeSkill) {
            state.activeSkill = active;
            cards.forEach((card, index) => card.classList.toggle("is-active", index === active));
        }
    }

    function updateProjects() {
        if (!state.projects || !state.projectCards.length) return;
        if (!state.desktop || state.reduced) {
            state.projectCards.forEach((card) => {
                card.classList.add("is-active");
                card.setAttribute("aria-hidden", "false");
                card.querySelectorAll("a, button").forEach((control) => control.removeAttribute("tabindex"));
            });
            return;
        }
        const rect = state.projects.getBoundingClientRect();
        const travel = Math.max(1, state.projects.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / travel);
        const index = Math.round(progress * (state.projectCards.length - 1));
        setActiveProject(index);
    }

    function updateTimeline() {
        if (!state.timeline || !state.timelineItems.length) return;
        const center = window.innerHeight * 0.5;
        let active = 0;
        let distance = Infinity;
        state.timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const currentDistance = Math.abs(rect.top + rect.height / 2 - center);
            if (currentDistance < distance) {
                distance = currentDistance;
                active = index;
            }
        });
        if (active !== state.activeTimeline) {
            state.activeTimeline = active;
            state.timeline.querySelector(".timeline")?.setAttribute("data-active-timeline", String(active));
            state.timelineItems.forEach((item, index) => item.classList.toggle("is-current", index === active));
        }
    }

    function updateScenes() {
        updateHero();
        updateSkills();
        updateProjects();
        updateTimeline();
    }

    function scheduleFrame() {
        if (state.framePending) return;
        state.framePending = true;
        requestAnimationFrame(() => {
            state.framePending = false;
            updatePageProgress();
            updateScenes();
        });
    }

    function setReducedMotion(matches) {
        state.reduced = matches;
        root.classList.toggle("reduced-motion", matches);
        if (matches) document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-visible"));
        scheduleFrame();
    }

    function updateCapabilities() {
        state.desktop = desktopQuery.matches;
        state.finePointer = finePointerQuery.matches;
        root.classList.toggle("motion-desktop", state.desktop && !state.reduced);
        root.classList.toggle("fine-pointer", state.finePointer && !state.reduced);
        if (!state.desktop || state.reduced) state.activeProject = -1;
        scheduleFrame();
    }

    function bindEvents() {
        window.addEventListener("scroll", scheduleFrame, { passive: true });
        window.addEventListener("resize", scheduleFrame, { passive: true });
        reducedMotionQuery.addEventListener("change", (event) => setReducedMotion(event.matches));
        desktopQuery.addEventListener("change", updateCapabilities);
        finePointerQuery.addEventListener("change", updateCapabilities);
        document.addEventListener("visibilitychange", scheduleFrame);
        window.addEventListener("pointermove", (event) => {
            if (!state.finePointer || state.reduced || document.hidden) return;
            state.pointerTargetX = ((event.clientX / Math.max(1, window.innerWidth)) - 0.5) * 24;
            state.pointerTargetY = ((event.clientY / Math.max(1, window.innerHeight)) - 0.5) * 24;
            scheduleFrame();
        }, { passive: true });
    }

    function initMotion() {
        if (root.classList.contains("motion-ready")) return;
        body.dataset.motionRoot = document.querySelector(".project-page") ? "project" : "home";
        addScrollProgress();
        enhanceHero();
        enhanceAbout();
        enhanceSkills();
        enhanceProjects();
        enhanceExperience();
        enhanceContact();
        enhanceProjectPage();
        setReducedMotion(state.reduced);
        updateCapabilities();
        observeReveals();
        bindEvents();
        root.classList.add("motion-ready");
        scheduleFrame();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMotion, { once: true });
    } else {
        initMotion();
    }
})();
