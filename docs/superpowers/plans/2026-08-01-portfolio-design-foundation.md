# Portfolio Design Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give all future design and coding agents one accurate, enforceable source of truth for improving the bilingual David Liu portfolio with Impeccable and Taste Skill.

**Architecture:** Keep the existing static site unchanged in this phase. Add root product, design, and agent guidance; replace the inaccurate project skill with a portfolio-specific orchestrator; add a small pytest contract that verifies critical facts and precedence rules. These files become the preflight layer for later visual redesign work.

**Tech Stack:** Markdown agent instructions, Agent Skills `SKILL.md`, Python 3.12, pytest, existing GitHub Actions.

## Global Constraints

- The product is a bilingual personal portfolio, not a university site or education platform.
- The canonical host remains `https://www.universitydepartment.store`.
- The public email remains `liuwenlong0706@outlook.com`.
- Existing static HTML, CSS, JavaScript, Python tests, routes, SEO metadata, evidence runtimes, and privacy boundaries remain unchanged.
- Do not vendor or copy the complete Taste Skill or Impeccable repositories into this project.
- The project skill orchestrates those tools and resolves conflicts through project truth.
- No runtime dependency is added by this plan.

---

### Task 1: Add durable product context

**Files:**
- Create: `PRODUCT.md`

**Interfaces:**
- Consumes: existing Chinese and English routes, project content, public contact details, and repository constraints.
- Produces: the factual source of truth read by `DESIGN.md`, `AGENTS.md`, Impeccable, Taste Skill, and implementation agents.

- [ ] **Step 1: Create `PRODUCT.md` with exact identity and audience**

Include the product statement, primary audiences, visitor outcomes, page inventory, six project categories, public contact, privacy boundaries, and non-goals.

- [ ] **Step 2: Record content-status vocabulary**

Define the allowed status classes: deployed public site, verified local software, tested CLI, concept, structural prototype, research participation, and private evidence.

- [ ] **Step 3: Record platform invariants**

Include the canonical domain, bilingual route behavior, static architecture, no-runtime-CDN rule, and CNAME requirement.

- [ ] **Step 4: Review for unsupported claims**

Check that the document does not invent employment, university affiliation, customer metrics, production usage, medical validation, or trading performance.

- [ ] **Step 5: Commit**

```bash
git add PRODUCT.md
git commit -m "docs: add portfolio product context"
```

### Task 2: Add the design system source of truth

**Files:**
- Create: `DESIGN.md`

**Interfaces:**
- Consumes: `PRODUCT.md` and `docs/superpowers/specs/2026-08-01-portfolio-design-foundation.md`.
- Produces: design tokens, page modes, layout rules, typography rules, evidence treatment, motion rules, and anti-patterns for every future UI edit.

- [ ] **Step 1: Define the chosen visual world**

Document “Editorial systems portfolio” and explain how it differs from a university site, a dashboard, and a generic AI landing page.

- [ ] **Step 2: Define tokens and constraints**

Provide named color, spacing, radius, typography, content-width, motion, and layer tokens compatible with the existing CSS architecture.

- [ ] **Step 3: Define page-specific composition**

Specify home, project-detail, resume, navigation, language switcher, contact, and mobile behavior.

- [ ] **Step 4: Define evidence and accessibility rules**

Require real artifacts, accurate captions, alt text, WCAG contrast, focus visibility, reduced motion, and truthful status labels.

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md
git commit -m "docs: add portfolio design system"
```

### Task 3: Add repository-wide agent instructions

**Files:**
- Create: `AGENTS.md`

**Interfaces:**
- Consumes: `PRODUCT.md`, `DESIGN.md`, the current static architecture, test suite, and project skill.
- Produces: a deterministic workflow and conflict order for Codex and other coding agents.

- [ ] **Step 1: Define mandatory preflight**

Require agents to read `PRODUCT.md`, `DESIGN.md`, and the project skill; inspect the target page, representative CSS, and relevant tests; identify whether the request is refinement or redesign.

- [ ] **Step 2: Define implementation boundaries**

Protect routes, CNAME, bilingual SEO, evidence keys, privacy, copy truth, print behavior, and existing dependencies.

- [ ] **Step 3: Define skill orchestration**

Give Impeccable responsibility for UX and technical quality, Taste Skill responsibility for visual exploration, and the project skill responsibility for final project-specific decisions.

- [ ] **Step 4: Define verification commands**

Require:

```bash
python -m pytest -q tests
python -m compileall -q tests
node --check script.js
node --check identity-overrides.js
node --check bilingual-runtime.js
node --check motion.js
node --check resume-entry.js
node --check resume-print.js
node --check project-evidence.js
node --check trading-evidence-final.js
```

Also require desktop and mobile visual checks when a browser is available.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs: add repository agent workflow"
```

### Task 4: Replace the inaccurate project design skill

**Files:**
- Modify: `.agents/skills/university-department-design/SKILL.md`

**Interfaces:**
- Consumes: `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, Impeccable when installed, and Taste Skill when installed.
- Produces: `$university-department-design`, the project-specific design director and workflow router.

- [ ] **Step 1: Correct the mission**

Replace all education-platform framing with bilingual personal-portfolio framing.

- [ ] **Step 2: Add repository-aware modes**

Define home as `Persuade + Experience`, project pages as `Read + Experience`, and resume as `Read`.

- [ ] **Step 3: Add design dials**

Set the default profile to:

```text
DESIGN_VARIANCE: 7
MOTION_INTENSITY: 4
VISUAL_DENSITY: 5
```

Allow conversational overrides while preserving `DESIGN.md`.

- [ ] **Step 4: Add execution workflow**

Require preflight, one-line design read, targeted plan, incremental implementation, bounded visual QA, automated verification, and a factual-change report.

- [ ] **Step 5: Add conflict order and anti-patterns**

Protect product truth and accessibility from overly aggressive Taste or Impeccable commands.

- [ ] **Step 6: Commit**

```bash
git add .agents/skills/university-department-design/SKILL.md
git commit -m "fix: align project design skill with portfolio"
```

### Task 5: Add foundation contract tests

**Files:**
- Create: `tests/test_design_foundation_contracts.py`

**Interfaces:**
- Consumes: the four foundation documents and project skill.
- Produces: pytest failures when required files, factual identity, contact details, canonical host, skill roles, or conflict precedence drift.

- [ ] **Step 1: Write file-existence checks**

```python
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = (
    ROOT / "PRODUCT.md",
    ROOT / "DESIGN.md",
    ROOT / "AGENTS.md",
    ROOT / ".agents/skills/university-department-design/SKILL.md",
)


def test_design_foundation_files_exist() -> None:
    assert all(path.is_file() for path in REQUIRED)
```

- [ ] **Step 2: Add identity and invariant checks**

Assert that `PRODUCT.md` contains “bilingual personal portfolio”, `www.universitydepartment.store`, and `liuwenlong0706@outlook.com`; assert that the project skill does not contain the obsolete mission sentence “Transform university-department into a premium, modern, trustworthy educational platform.”

- [ ] **Step 3: Add orchestration checks**

Assert that the skill names Impeccable and Taste Skill, includes all three design dials, and states that product truth wins.

- [ ] **Step 4: Run the focused test**

Run:

```bash
python -m pytest -q tests/test_design_foundation_contracts.py
```

Expected: PASS.

- [ ] **Step 5: Run the full suite**

Run:

```bash
python -m pytest -q tests
python -m compileall -q tests
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tests/test_design_foundation_contracts.py
git commit -m "test: protect portfolio design foundation"
```

### Task 6: Final review and pull request

**Files:**
- Review: `PRODUCT.md`
- Review: `DESIGN.md`
- Review: `AGENTS.md`
- Review: `.agents/skills/university-department-design/SKILL.md`
- Review: `tests/test_design_foundation_contracts.py`

**Interfaces:**
- Consumes: all completed foundation files.
- Produces: a reviewable pull request from `design/foundation-v1` to `main`.

- [ ] **Step 1: Scan for placeholders and contradictions**

Search for `TBD`, `TODO`, obsolete education-platform framing, conflicting emails, conflicting canonical hosts, and unsupported claims.

- [ ] **Step 2: Confirm no production UI file changed**

Verify that this phase modifies only documentation, the project skill, and its contract test.

- [ ] **Step 3: Run final verification**

Run the full pytest, Python compile, and JavaScript syntax commands from Task 3.

- [ ] **Step 4: Open a draft pull request**

Title:

```text
Define portfolio design and agent foundation
```

The body must summarize product correction, design-system rules, skill orchestration, tests, and the fact that no production UI was changed.
