# Trading System Evidence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two privacy-safe real runtime screenshots to the trading-system detail page.

**Architecture:** Store optimized WebP files under `assets/project-evidence/` and add one semantic evidence section directly to `projects/trading-system.html`. Reuse the existing `project-evidence.css` visual language and add only the small rules needed for a two-image trading gallery.

**Tech Stack:** HTML, CSS, WebP, Python/Pillow validation, Pytest, GitHub Pages.

## Global Constraints

- Keep `projects/trading-system.html` URL unchanged.
- Do not expose Telegram token prefixes, chat IDs, API credentials, account information, or local absolute paths.
- Do not change project test counts, execution claims, risk statements, or CNAME.
- Do not add external runtime resources.

---

### Task 1: Prepare privacy-safe media

**Files:**
- Create: `assets/project-evidence/trading-dashboard.webp`
- Create: `assets/project-evidence/trading-cli-redacted.webp`

- [ ] Inspect both supplied screenshots for private or secret values.
- [ ] Blur the Telegram debug line and local absolute path in the CLI screenshot.
- [ ] Resize only when necessary and encode both as WebP with readable UI text.
- [ ] Verify both files decode and retain at least 1280px width.

### Task 2: Define evidence contracts

**Files:**
- Create: `tests/test_trading_evidence_contracts.py`

- [ ] Write tests requiring both media files, valid WebP headers, the new section title, image alt text, captions, no old secret literals, and unchanged CNAME.
- [ ] Run `python -m pytest -q tests/test_trading_evidence_contracts.py` and confirm it fails before the page implementation.

### Task 3: Add semantic gallery and styles

**Files:**
- Modify: `projects/trading-system.html`
- Modify: `project-evidence.css`

- [ ] Add a `Interface Evidence / 真实运行界面` section before verification.
- [ ] Add linked figures for the dashboard and redacted CLI screenshot.
- [ ] Add concise captions and a statement that the screenshots demonstrate local runtime only and are not investment advice.
- [ ] Add responsive gallery styles using existing project evidence tokens.
- [ ] Run the targeted test and confirm it passes.

### Task 4: Full verification and release

**Files:**
- Test: `tests/`

- [ ] Run `python -m pytest -q tests`.
- [ ] Run `python -m compileall -q tests`.
- [ ] Run JavaScript syntax checks from the existing workflow.
- [ ] Confirm no external dependency, CNAME, or project URL change.
- [ ] Open a pull request to `main`; merge only after GitHub Actions succeeds.
