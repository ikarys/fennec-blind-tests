---
date: 2026-11-12
commit: be2723c9f7fda920ee022bc8474fd77730b817a9 (with uncommitted docs changes)
kind: blind-user-guide
tool: fennec 0.3.0 per the task (the UI header shows 0.2.3), driven through Chromium/Playwright
model: Claude Sonnet 5.5 as tester; local qwen3.8-27b as fennec's model
scope: the whole user guide in SUMMARY order, from the docs only
verdict: PASS WITH FRICTION. Every step was done except drawing a workflow and Canvas. One documented promise (a task's sheet becomes the plan) did not hold.
---

## Brief

Persona: a developer new to fennec who follows the guide literally.
Task: do each guide page in SUMMARY order, on my own small git project (`/tmp/blind/proj/todo`, Python), with my own server on port 7801.

How blindness was enforced:
- I read only `docs/users/src/*.md` (and its images) in the release-docs worktree.
- I did not open any source, `docs/devs`, tests, scripts, or anything under `/home/tony/workspace/fennec`.
- I drove the UI only through Playwright scripts in `/tmp/blind/scripts` (screenshots in `/tmp/blind/shots`). I made no curl call to the API.
- I did not touch the instances on 7777, 7798 and 8799. Remote access was read only; I set no password.
- `HOME` was `/tmp/blind/home`, the store `/tmp/blind/store`. The server log was the only runtime artefact I read.

Not covered: drawing a workflow by drag and drop (skipped, fiddly), the Canvas page, night mode (not ticked, to keep model work small).

## (a) Friction log

| # | Step | Severity | What happened | Expected | Exact error | Suggested fix |
|---|------|----------|---------------|----------|-------------|---------------|
| F1 | Tasks, Start the queue (tasks.md step 3 and 5) | DOC-WRONG | The queued task's session said it never received the sheet: "the plan card's text wasn't in this session's context, so I derived the criteria from the project state". It invented persistence (`tests/test_persistence.py`, `load_todos`/`save_todos`, 8 tests) for a one-line `clear_todos()` objective. Criteria showed 0/1 and it stopped at "Validate these tests?". | The docs say "The task joins the queue with this sheet as its plan". The agent should build from the sheet. | none (agent text above) | Fix the behaviour, or stop promising it. Add to "If something goes wrong": what to do when the agent ignores the sheet. |
| F2 | First session, integrate (first-session.md) | DOC-MISSING | With no git identity (my `HOME` had no `.gitconfig`) the integration commit failed. The UI showed no "Review and integrate" result and no error. Only `server.log` said `fatal: empty ident name ... not allowed`. | An error in the UI, or a note in Troubleshooting: set `user.name` and `user.email`. | `fatal: empty ident name (for <tony@IKS-DESKTOP.localdomain>) not allowed` (server log only) | Show git's error on the integration card. Add the identity requirement to install.md and troubleshooting.md. |
| F3 | Insight, give a model its price (insight.md step 1) | DOC-WRONG | The page says "Settings > Models", "Cached input" and a **Save** button. The UI has **Providers** (group "Models"), a field labelled **Cache**, and a small icon button for Save. The model's parameters open from a chevron at the right of the model row. The Insight card itself says "Settings, Models". | Names that match the labels. | none | Write "Settings > Providers", "Cache", "the Save icon". Fix the Insight card hint. |
| F4 | Remote access page, steps 1 and 2 (read only) | DOC-WRONG | Step 2 says to turn on **Allow remote connections** and "Click **Save** ③". The Network card has a toggle and no Save button. settings.md says "Save password"; the field only has a check mark. | The labels in the docs exist on screen. | none | Remove the Save step or say the toggle applies at once. Say "check mark" in settings.md. |
| F5 | Plugins, enable (plugins.md step 3) | FRICTION | The list showed turnstats with **Disabled**. I found no Enable button. The first ones I tried (the "Enabled 0" filter tab) emptied the list. The Enable button only appears after clicking the plugin row. After that the plugin showed **Enabled** and the block showed **running**, as documented. | The step says "Find the plugin, click Enable". | none | Add "Click the plugin's row to open it" before Enable. |
| F6 | Second session, criteria (plans.md) | FRICTION | The session waited more than 20 minutes on a "criteria change" card. It went on only after I clicked Accept on that card. Nothing in the rail or the header said that a decision was waiting. | Run view shows "waiting for you: accept or reject the criteria change" and plans.md says where. | none | Show a badge on the Run rail and describe the card in plans.md. |
| F7 | Files editor (files.md steps 2 and 3) | FRICTION | Three small gaps. (1) **Changes** is a side panel, not a tab. (2) I never saw the word **Saved**; autosave did write the file (git showed ` M README.md`). (3) On a fresh page load the Commit button stays off until the file is ticked; the earlier screenshot showed the file already ticked and a message pre-filled (`docs: update README.md`). | Docs and UI agree. | none | Say "Changes panel"; describe the saved indicator; mention the pre-filled message. |
| F8 | Tasks, Drafts (tasks.md step 2) | FRICTION | The idea row had Edit, Turn into a task, Actions. After I opened the sheet once, the row showed only Open the task, Edit, and ... (no Turn into a task). | Same three buttons. | none | Say that after the first sheet the row opens the sheet. |
| F9 | Review gate, discard another (review-gate.md) | NOTE | Second session: the report called `tests/test_main.py` "a protected test file", yet the diff showed it modified (+11 -3). Criteria C2 was "existence only". I discarded it. | Protected files untouched. | none | Check with the rules page (rules.md). |
| F10 | Home, version | NOTE | Task named 0.3.0; the UI header, About and Insight show 0.2.3. | Same version. | none | Align the version before release. |

Extra findings in one line: the session list says "1 min ago" for a workflow that ran 21 min; the Ready button on the sheet turns on only after one criterion (documented, fine); Python projects show an empty Module map and "No Rust, TypeScript or JavaScript source file found", exactly as documented.

## (b) Effort per step

| Step | Lines of code written | Calls or queries made |
|------|-----------------------|-----------------------|
| Connect a model | ~15 (Playwright) | 3 scripts |
| Open a project | ~10 | 1 |
| First session, review, integrate (incl. identity fix) | ~40 | 6 |
| Chat, agent session, workflow | ~35 | 5 |
| Plans and criteria, second session, discard | ~45 | 6 |
| Files editor | ~20 | 4 |
| Understanding (map, risks, decisions, analyses) | ~8 | 1 |
| Tasks, queue | ~45 | 7 |
| Plugin (docs code verbatim + JSON) | ~45 (copied from docs) | 3 |
| Insight, price, Settings pages | ~25 | 4 |
| Remote access (read) | 0 | 1 |

## (c) What was simple

- Connecting the model: Base URL, the model list loaded at once, star it. Home then showed the checklist item as ready.
- Opening a project by path.
- First session: Plan, Go, Validate, review, integrate matched the screenshots (first-session-4.png and the live UI agree). The commit had the Fennec-Session and Assisted-by trailers as documented.
- Discard: "Agent's work discarded", and the worktree was gone.
- Files editor: read, edit, autosave and commit worked and gave one clean commit (`b0ef0c9`).
- Module map, Risks, Decisions and Analyses pages match the docs, including the empty-state messages.
- The plugin: docs code ran as written, the block showed "running", and the session's Plugins tab showed the "Tool calls" block with counts.
- Insight: after a price was set, Estimated cost showed $0.12.

## (d) Documentation pages wrong, missing or misleading

- tasks.md: the sheet-as-plan promise (F1); the Drafts buttons (F8).
- insight.md: names of the price page and fields (F3).
- remote-access.md and settings.md: Save steps (F4).
- plugins.md: missing "open the row" (F5).
- plans.md: where a criteria change waits (F6).
- files.md: panel, Saved, pre-filled message (F7).
- first-session.md, install.md, troubleshooting.md: git identity (F2).

## (e) Verdict

A new user can follow the guide to a first integrated change and to most pages. The one real break is the Tasks queue, which did not use the sheet. Rename fixes (F3, F4) are quick. F2 can cost a user an hour because nothing in the UI says why integration did nothing.

## (f) Decisions

| # | Decision | Commit or reason |
|---|----------|------------------|
| F1 | fixed | `start_from_plan` writes the task and its sheet into an empty session before the run, so session-context nodes read the plan; test `start_from_plan_records_the_plan_and_runs_the_criteria` asserts it. |
| F2 | fixed | Getting started card and `fennec doctor` flag git without an identity (`domain/setup.rs`, test `git_without_identity_is_todo`); install.md and troubleshooting.md give the two `git config` commands. |
| F3 | fixed | insight.md and every page now say Settings > Providers, **Cache**, and where Save appears; the Insight cost hint names Providers. |
| F4 | fixed | remote-access.md says Save appears at the top of the card once it changes; settings.md describes the check mark. |
| F5 | deferred | Backlog idea in fennec's project: show Enable on the plugin row. |
| F6 | deferred | Backlog idea in fennec's project: signal a pending criteria change in the Run rail and header. |
| F7 | fixed | files.md: Changes is a panel, **Saved** shows next to the file name. |
| F8 | fixed | tasks.md: once the idea has a sheet the button reads **Open the task**. |
| F9 | deferred | Backlog idea in fennec's project: investigate why a protected test was modified. |
| F10 | no change | Versions are never edited by hand; the release bump sets 0.3.0. |
