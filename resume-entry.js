(() => {
    "use strict";

    const PDF_PATH = "assets/liu-wenlong-resume-public.pdf";
    const RESUME_PAGE = "resume.html";

    function addNavLink() {
        const nav = document.getElementById("primary-navigation");
        if (!nav || nav.querySelector('a[href="#resume"]')) return;
        const contactItem = nav.querySelector('a[href="#contact"]')?.closest("li");
        const item = document.createElement("li");
        item.innerHTML = '<a href="#resume">简历</a>';
        if (contactItem) nav.insertBefore(item, contactItem);
        else nav.appendChild(item);
    }

    function addHeroAction() {
        const actions = document.querySelector("#home .hero-actions");
        if (!actions || actions.querySelector('[data-resume-action="hero"]')) return;
        const link = document.createElement("a");
        link.className = "button button-secondary";
        link.href = RESUME_PAGE;
        link.dataset.resumeAction = "hero";
        link.textContent = "查看简历";
        actions.appendChild(link);
    }

    function createResumeSection() {
        const experience = document.getElementById("experience");
        if (!experience || document.getElementById("resume")) return;

        const section = document.createElement("section");
        section.className = "section resume-highlight";
        section.id = "resume";
        section.innerHTML = `
            <div class="container resume-highlight__layout">
                <div data-reveal>
                    <p class="eyebrow">Resume · Public Version</p>
                    <h2 class="resume-highlight__title">一份更聚焦的<br><span>AI求职简历</span></h2>
                    <p class="resume-highlight__intro">
                        公开版简历已删除手机号和年龄，重点呈现AI应用、Web开发、科研数字化、自动化工作流及项目验证证据。
                    </p>
                    <div class="resume-highlight__actions">
                        <a class="button button-primary" href="${RESUME_PAGE}">在线查看</a>
                        <a class="button button-secondary" href="${PDF_PATH}" download>下载PDF</a>
                    </div>
                </div>
                <aside class="resume-snapshot" aria-label="简历摘要" data-reveal>
                    <div class="resume-snapshot__header">
                        <span>DAVID LIU / RESUME</span>
                        <span>PUBLIC · 2026</span>
                    </div>
                    <div class="resume-snapshot__grid">
                        <div class="resume-snapshot__item">
                            <span>01</span>
                            <strong>AI应用开发</strong>
                            <p>需求拆解、API集成、RAG基础、测试与部署</p>
                        </div>
                        <div class="resume-snapshot__item">
                            <span>02</span>
                            <strong>Web与自动化</strong>
                            <p>Python、React、Next.js、FastAPI与Git工作流</p>
                        </div>
                        <div class="resume-snapshot__item">
                            <span>03</span>
                            <strong>真实项目证据</strong>
                            <p>49项与36项测试、本地运行和公开状态说明</p>
                        </div>
                        <div class="resume-snapshot__item">
                            <span>04</span>
                            <strong>跨领域实践</strong>
                            <p>医学科研、数字产品、CAD与专利工作流</p>
                        </div>
                    </div>
                </aside>
            </div>`;
        experience.insertAdjacentElement("afterend", section);
    }

    function replaceContactPlaceholder() {
        const placeholder = [...document.querySelectorAll("#contact .button-disabled")]
            .find((node) => node.textContent.includes("简历"));
        if (!placeholder) return;
        const group = document.createElement("div");
        group.className = "resume-highlight__actions";
        group.innerHTML = `
            <a class="button button-primary" href="${RESUME_PAGE}">在线简历</a>
            <a class="button button-secondary" href="${PDF_PATH}" download>下载PDF</a>`;
        placeholder.replaceWith(group);
    }

    function initResumeEntry() {
        if (!document.getElementById("home")) return;
        addNavLink();
        addHeroAction();
        createResumeSection();
        replaceContactPlaceholder();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initResumeEntry, { once: true });
    } else {
        initResumeEntry();
    }
})();
