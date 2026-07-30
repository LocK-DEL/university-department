# Bilingual Portfolio Design

Date: 2026-07-30
Status: Approved for implementation planning
Repository: `LocK-DEL/university-department`

## 1. Objective

Create a complete English edition of the existing portfolio for applications to foreign companies, international startups and overseas individual teams. The existing Chinese site remains the default site and must not lose any current content, project evidence, styling or behavior.

The English edition must be independently addressable, shareable and indexable. It must read like an international job-search portfolio rather than a literal machine translation.

## 2. Scope

The first release includes all public portfolio content:

- English home page: `/en/` implemented as `en/index.html`
- English resume: `/en/resume.html`
- English project detail pages:
  - `/en/projects/knowledge-reconstruction.html`
  - `/en/projects/trading-system.html`
  - `/en/projects/lab-platform.html`
  - `/en/projects/ai-health-concept.html`
  - `/en/projects/carering.html`
  - `/en/projects/ai-workflow.html`

The existing Chinese routes remain unchanged:

- `/`
- `/resume.html`
- `/projects/knowledge-reconstruction.html`
- `/projects/trading-system.html`
- `/projects/lab-platform.html`
- `/projects/ai-health-concept.html`
- `/projects/carering.html`
- `/projects/ai-workflow.html`

No automatic translation service, external localization framework or client-side text replacement system will be introduced.

## 3. Content Strategy

### 3.1 Home page and resume

The English home page and resume will be rewritten for overseas recruiters and small-team founders. The copy should emphasize:

- what David Liu builds;
- the problems he can help solve;
- ownership and individual contribution;
- technologies used;
- evidence of testing and local validation;
- practical delivery capability;
- current availability and contact path.

Target-role language should align with realistic junior-level opportunities:

- Junior AI Application Developer;
- Frontend / Web Developer;
- Python Automation Developer;
- AI Product Assistant;
- Technical Project Assistant;
- HealthTech / EdTech Developer.

### 3.2 Project detail pages

Each project page will use concise engineering-oriented English. The page structure should preserve the current visual hierarchy while presenting these concepts consistently:

- Overview;
- Background / Problem;
- My Role;
- Core Features;
- Workflow;
- Architecture;
- Tech Stack;
- Interface or Prototype Evidence;
- Validation Status;
- Limitations and Safety Boundaries.

Claims must remain evidence-based. Local prototypes must not be described as production deployments, concepts must not be described as validated products, and the trading project must retain its no-investment-advice and no-performance-claim boundaries.

### 3.3 Names and contact details

Public identity remains:

- Name: David Liu / Liu Wenlong;
- Email: `liuwenlong0706@outlook.com`;
- GitHub: `https://github.com/LocK-DEL`.

The English resume remains a public-safe version and must not add a phone number, exact residential address, ID information or other sensitive personal data.

## 4. URL and Navigation Design

Every Chinese page receives a direct English counterpart, and every English page receives a direct Chinese counterpart.

The language control appears in the navigation as `中文 | EN` and preserves page context. Examples:

- `/projects/trading-system.html` ↔ `/en/projects/trading-system.html`
- `/resume.html` ↔ `/en/resume.html`
- `/` ↔ `/en/`

Language switching must not redirect a project detail page back to the home page.

Relative links inside the English site must remain within `/en/` unless intentionally linking to a shared external resource such as GitHub or email.

## 5. Technical Architecture

### 5.1 Static page duplication

The English site will use dedicated static HTML files under `/en/`. Existing CSS, JavaScript and project-evidence assets will be shared through relative paths rather than duplicated.

Examples:

- English home page uses `../style.css` and `../script.js`;
- English project pages use `../../style.css`, `../../project.css` and shared runtime scripts;
- project screenshots and encoded evidence files remain in the existing shared asset directories.

This approach keeps the site compatible with GitHub Pages and avoids adding a build step.

### 5.2 Language-link mapping

A small shared language-link runtime may be added only if it reduces repeated markup without changing page content. If used, it must rely on explicit route mappings and must not infer routes from translated titles.

The preferred baseline is explicit anchor links in each page because they are visible without JavaScript and easy to test.

### 5.3 Existing dynamic project evidence

Current evidence runtimes must support both Chinese and English project pages. Any title-based page detection must be extended to recognize the corresponding English project title or use a stable page identifier such as a `data-project-key` attribute.

Stable identifiers are preferred over maintaining growing title lists.

## 6. SEO and Sharing

Each Chinese-English page pair must include:

- correct `<html lang>` value;
- language-specific `<title>`;
- language-specific meta description;
- canonical URL;
- alternate links for `zh-CN`, `en` and `x-default`;
- English Open Graph title and description on English pages.

The canonical host remains:

`https://www.universitydepartment.store`

Examples:

- Chinese home canonical: `https://www.universitydepartment.store/`
- English home canonical: `https://www.universitydepartment.store/en/`
- English trading project canonical: `https://www.universitydepartment.store/en/projects/trading-system.html`

`x-default` points to the Chinese default route unless a later product decision changes the default locale.

## 7. Visual Design

The English edition preserves the existing black, white and cold-blue visual system, scroll storytelling, typography scale, cards, animations and project evidence layouts.

Only language-related UI is added:

- compact `中文 | EN` control;
- active-language state;
- responsive behavior that does not crowd the mobile navigation.

No redesign, new font dependency or unrelated visual refactor is part of this release.

## 8. Accessibility

English pages must include:

- English skip-link text;
- English navigation labels and button labels;
- meaningful English image alt text;
- English ARIA labels for galleries, controls and workflow diagrams;
- correct `lang="en"` document language;
- keyboard-accessible language links.

The language control must remain usable when JavaScript is disabled.

## 9. Error Handling and Fallbacks

Because the site is static, broken localization is handled through build-time and CI checks rather than runtime translation fallbacks.

Required behavior:

- missing English counterpart: CI fails;
- broken internal English link: CI fails;
- invalid language mapping: CI fails;
- project evidence asset unavailable: existing evidence fallback behavior remains in place;
- JavaScript unavailable: pages and language links still remain navigable.

## 10. Testing and Acceptance Criteria

The pull request may merge only when all existing tests and new bilingual tests pass.

New checks must verify:

1. all eight English pages exist;
2. each English page uses `lang="en"`;
3. each Chinese-English page pair links to its counterpart;
4. all English internal links resolve to an existing file or valid section;
5. project pages preserve page context when switching language;
6. English titles, descriptions, headings, navigation, buttons, alt text and ARIA labels contain no unintended Chinese text;
7. the only Chinese characters permitted in English HTML source are the intentional visible language label `中文`; Chinese text embedded as pixels inside shared screenshots is outside the HTML-source check;
8. the public email remains `liuwenlong0706@outlook.com`;
9. the English resume print function still loads;
10. shared project evidence loads on English project pages;
11. JavaScript syntax checks pass;
12. forbidden external runtime dependencies remain absent;
13. `CNAME` remains exactly `www.universitydepartment.store`;
14. the existing Chinese pages and routes remain intact.

## 11. Delivery Workflow

Implementation occurs on branch `feat/bilingual-portfolio`.

Delivery sequence:

1. commit this approved design;
2. create a detailed implementation plan;
3. implement English page structure and shared language styles;
4. translate and rewrite home and resume content;
5. translate and rewrite all six project pages;
6. adapt shared evidence runtimes using stable project identifiers;
7. add bilingual SEO metadata and counterpart links;
8. add regression tests and CI checks;
9. open a pull request;
10. merge only after complete CI success.

## 12. Out of Scope

This release does not include:

- automatic browser-language redirect;
- third-party translation APIs;
- a content-management system;
- additional languages;
- a new visual identity;
- rewriting Chinese content unrelated to counterpart-link and SEO metadata needs;
- downloadable English DOCX generation;
- changes to the domain name or hosting platform.
