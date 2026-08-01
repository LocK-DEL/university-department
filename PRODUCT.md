# PRODUCT.md

## Product identity

**Name:** University Department / David Liu Portfolio  
**Canonical host:** `https://www.universitydepartment.store`  
**Owner:** Liu Wenlong / David Liu  
**Product type:** Bilingual personal portfolio and public project evidence site  
**Default language:** Simplified Chinese  
**Secondary language:** English

This repository is not a university website, a university department, an education platform, or a general SaaS product. The domain is a brandable address for David Liu's personal work.

## Product statement

The site helps recruiters, potential clients, technical collaborators, and research partners understand how David turns ambiguous real-world problems into testable digital products, automation workflows, research tools, and physical-product concepts.

The portfolio must make three things clear:

1. what David personally contributed;
2. what evidence exists;
3. what remains conceptual, local, private, incomplete, or unvalidated.

## Primary audiences

### Recruiters and hiring managers

They are evaluating fit for roles involving AI applications, web development, digital products, technical operations, automation, research digitization, or cross-functional innovation.

They need fast answers to:

- What can this candidate build?
- What did he own personally?
- Is the work real, tested, and understandable?
- Can he communicate limitations honestly?
- Where can I see more evidence or contact him?

### Potential clients and collaborators

They are looking for someone who can translate needs into a prototype, workflow, website, automation, or technical demonstration.

They need to understand:

- available capabilities;
- project process;
- technical range;
- delivery and communication style;
- public contact routes.

### Research and innovation partners

They are interested in research websites, experimental workflows, health-technology concepts, intelligent hardware, or AI-assisted engineering.

They need accurate boundaries between:

- research participation;
- tested software;
- structural prototypes;
- patent-oriented concepts;
- unvalidated health functions.

## Primary visitor outcomes

A visitor should be able to:

1. understand David's positioning in the first viewport;
2. identify relevant capabilities without reading the entire page;
3. browse all six projects;
4. distinguish implementation evidence from concept work;
5. open a project detail page and understand problem, role, method, stack, evidence, and limitations;
6. switch between Chinese and English without losing page context;
7. open or print the public resume;
8. contact David through GitHub or email.

## Primary calls to action

In priority order:

1. View a relevant project case study.
2. Open or print the public resume.
3. Visit GitHub.
4. Email `liuwenlong0706@outlook.com`.

## Public page inventory

### Chinese

- `/` — portfolio home
- `/resume.html` — public resume
- `/projects/knowledge-reconstruction.html`
- `/projects/trading-system.html`
- `/projects/lab-platform.html`
- `/projects/ai-health-concept.html`
- `/projects/carering.html`
- `/projects/ai-workflow.html`

### English

- `/en/` — portfolio home
- `/en/resume.html` — public resume
- `/en/projects/knowledge-reconstruction.html`
- `/en/projects/trading-system.html`
- `/en/projects/lab-platform.html`
- `/en/projects/ai-health-concept.html`
- `/en/projects/carering.html`
- `/en/projects/ai-workflow.html`

Every Chinese page must link directly to its English counterpart, and every English page must link directly to its Chinese counterpart.

## Project portfolio

### 1. Classroom Knowledge Reconstruction System

Category: AI education application / independent software project

Truth boundary:

- local FastAPI and React system;
- classroom text processing, knowledge extraction, structured summaries, knowledge graph, and question generation;
- public evidence is privacy-reviewed;
- do not imply production adoption by schools or institutions unless verified later.

### 2. Multi-Timeframe Market Analysis and Risk Reporting System

Category: Python financial-market analysis and reporting tool

Truth boundary:

- public market-data analysis, scenario construction, risk calculations, tests, and Markdown reporting;
- not investment advice;
- no profitability, execution, customer, or live-trading claims;
- do not imply autonomous order execution.

### 3. Research Laboratory Digital Platform

Category: research digitization and web platform

Truth boundary:

- research-team portal and learning-platform work;
- present actual implementation status accurately;
- do not imply institutional endorsement beyond verified project context.

### 4. AI Health Management Product Concept

Category: health-technology product concept and competition work

Truth boundary:

- product planning, user flow, AI recommendation concept, moxibustion-health scenario, and multi-device concept;
- not a validated medical product;
- no diagnosis, treatment, outcome, or regulatory claims.

### 5. CareRing Intelligent Health Wearable

Category: intelligent hardware, structural design, 3D modeling, and patent-oriented prototype

Truth boundary:

- structural design and physical-form exploration;
- extension cartridge and atomization concept;
- structural evidence does not validate electronics, sensing, atomization, health effects, or complete-device performance.

### 6. AI-Assisted Research and Intelligent Modeling Workflow

Category: agent-assisted engineering and automation case collection

Truth boundary:

- a documented workflow and set of real collaboration cases;
- includes requirement decomposition, SolidWorks automation, and patent-drawing work;
- not a single packaged software product unless one is later built and verified.

## Evidence-status vocabulary

Use these meanings consistently in Chinese and English.

### Publicly deployed

A public route or system is currently accessible on the canonical domain or another explicitly linked public deployment.

### Verified local software

The software has been run locally and has direct evidence or tests, but is not necessarily publicly deployed.

### Tested CLI or workflow

The command-line tool or workflow has repeatable tests or verified outputs. This does not imply production operation.

### Concept

The work is product planning, architecture, interaction, research proposal, or competition concept. It must not be described as a completed product.

### Structural prototype

The physical form, enclosure, fit, or mechanism has been modeled or prototyped. This does not validate electronics, health effects, safety, manufacturing readiness, or whole-device performance.

### Research participation

David contributed to a research activity or project. The site must describe his role without claiming sole authorship, institutional authority, or results not supported by public evidence.

### Private evidence

Evidence exists but cannot be published because of privacy, licensing, institutional, account, or security constraints. Describe the limitation rather than inventing a public substitute.

## Content voice

The voice is:

- specific;
- calm;
- evidence-led;
- technically literate;
- direct about limitations;
- confident without exaggeration.

Prefer:

- “Built and verified locally with 36 tests passing.”
- “Structural prototype; health and electronics functions are not validated.”
- “I owned requirement decomposition, implementation, and test design.”

Avoid:

- “revolutionary”;
- “world-leading”;
- “game-changing”;
- “enterprise-grade” without evidence;
- “used by” without verified users;
- fake precision, fake percentages, or fake impact metrics;
- vague AI copy such as “empowering the future.”

## Privacy and safety boundaries

Never publish or infer:

- identity-document details;
- private phone numbers;
- exact home addresses;
- private family information;
- API keys, tokens, credentials, cookies, or account identifiers;
- local file-system paths;
- private IP addresses or infrastructure details;
- private names visible in project media;
- medical claims or individualized medical advice;
- trading advice or expected returns.

All public screenshots and media must be reviewed for privacy before use.

## Platform invariants

- `CNAME` remains exactly `www.universitydepartment.store`.
- Chinese remains the default locale.
- Bilingual canonical and hreflang links remain intact.
- Project pages retain stable `data-project-key` identifiers.
- Resume print behavior remains available in both languages.
- Shared evidence runtimes remain compatible with Chinese and English routes.
- No runtime CDN, external font, analytics, or third-party tracking dependency is added without explicit approval.
- The site remains usable without JavaScript for core navigation and language switching.

## Current technical architecture

- static HTML5 pages;
- shared CSS files;
- vanilla JavaScript enhancement and evidence runtimes;
- Python generation and contract scripts;
- pytest contracts;
- GitHub Actions verification;
- GitHub Pages/custom-domain deployment.

A framework migration requires a separate approved design and implementation spec. Visual improvement alone is not sufficient reason to migrate.

## Non-goals

The current portfolio is not intended to become:

- a university portal;
- a learning-management system;
- a social network;
- an e-commerce store;
- a trading service;
- a medical service;
- a CMS-heavy publishing platform;
- an animation showcase that obscures project evidence.

## Success criteria

The portfolio succeeds when a visitor can quickly answer:

- Who is David Liu?
- What types of problems can he solve?
- Which project is most relevant to me?
- What exactly did he build or design?
- What evidence supports the claim?
- What are the limits of the work?
- How do I contact him?

Do not invent numeric conversion, engagement, hiring, customer, or traffic targets unless measurement is deliberately introduced later.
