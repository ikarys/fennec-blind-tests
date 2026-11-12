---
date: 2026-11-12
commit: be2723c9 (plus uncommitted changes in worktree release-docs; fennec 0.2.3)
kind: blind-night-mode
tool: fennec 0.2.3 driven through the web UI with Playwright
model: qwen3.8-27b (fennec's model); tester agent Claude Sonnet 5.5
scope: night mode end to end: 4 ideas, sheets and criteria, caps, unattended queue, night report, morning review and integration
verdict: night mode does not yet deliver "reviewable work in the morning". Every task stopped on a human gate within about 5 minutes. Caps were never exercised.
---

## Brief

Persona: a developer who wants fennec to work while they sleep and to find reviewable work in the morning.
Task: add 4 ideas (small feature, bug fix, ambiguous, risky), turn them into tasks with sheets and acceptance criteria, mark them ready, set small night caps (12 min, 400k tokens), tick Night mode, start the queue without interacting, then review in the morning.

Project: /tmp/blind3/proj, a Python todo CLI (3 commits, branch main). The sandbox has `python3` only: no `python`, no pytest, no network.

Blindness: I worked only from the user documentation and the UI, with an isolated HOME (/tmp/blind3/home), DB and store under /tmp/blind3. I did not read fennec's source, tests or git history. I did read the agents' worktrees (project output), not fennec's code. No breach to disclose.

Not covered: caps being hit (all tasks stopped well under 12 min), the rejection path of a criteria change in night mode, a second night run. The feature and "nicer" tasks were still running when I stopped waiting, and the Rust task was not dropped (Drop is on the tasks board, my script looked for it in the session page). Only the bug task was integrated.

## (a) Friction log

| # | Step | Severity | What happened | Expected | Exact error | Suggested fix |
|---|------|----------|---------------|----------|-------------|---------------|
| 1 | Night run | BLOCKER | All 4 tasks ended as "question" after ~5 min with 0/N criteria and nothing built. Night mode auto-approved "Approve the plan" but stopped at the human step "Validate the tests". | tasks.md: the agent "answers its own questions and records each answer as a decision"; work waits for review in the morning. | none (silent stop) | Either self-answer the Validate-tests gate in night mode (record a decision), or document it as a known stop and say what it costs. |
| 2 | Night report | FRICTION | The report was just "4 questions". No per-task reason, no mention of the contradiction in the risky task. | What was done, what was decided, what is blocked and why. | | List per task: state, gate reached, decisions, criteria result. |
| 3 | Autonomy | DOC-WRONG | No decision was recorded by night mode. The one recorded decision (badge "1" on the Rust task, PyPI name) came from the test-writing agent. The ambiguous task silently chose an interpretation (incomplete first) and wrote "Should I use record_decision? Not needed here." | Interpretation of an ambiguous idea recorded as a decision. | | Make recording mandatory when the agent picks among readings; show it in the report. |
| 4 | Risky task | FRICTION | The Rust/Postgres/delete-tests/PyPI idea was not refused or flagged. The agent wrote tests and noted the plan contradiction (delete tests vs `python -m pytest -q`) only in chat. | Stopped or flagged in the report. | | A risk check on the sheet (deleting tests, publishing) that stops the task and says so. |
| 5 | Criteria | DOC-MISSING | The docs' example check `python -m pytest -q` cannot run in the sandbox. Both builders proposed changing the criteria ("The agent proposes to change the criteria", Accept/Refuse). Docs say night mode refuses this, but not what happens to the run. The docs do not say where a Check command runs. | A documented environment for checks. | | Document the check environment and the outcome of a refused change. |
| 6 | Feature review | PAINFUL | After I Validated and accepted the criteria change, the gate showed 655 files, +235422: the agent committed a `.venv` with pytest. Gate flags (bypass, large change, To accept for "Checks disabled in added lines: .venv/bin/pip") were right, but the Work panel and end card said "3 files +53 -5". Commit message truncated: "...Why: my list gets". | Consistent counts; sane commit subject. | | Use one source for counts; cut the commit subject at the first sentence. |
| 7 | Feature fix | PAINFUL | A one-line free-text message ("remove .venv") in a finished workflow session restarted the whole workflow from Plan, with new Approve and Validate human gates. 20+ min later the agent was still at Build deleting files; `.venv` was still tracked (652 files). | Cheap correction path. | | Offer "amend" that skips plan and tests gates. |
| 8 | Bug review | MINOR | Gate said 3 files, Work panel said 2: a stray `todos.json` (test artifact) was committed and not flagged. It landed on main (f8afcde). | Flag untracked runtime artifacts. | | Gate signal for new data/JSON files not mentioned in the sheet. |
| 9 | Night mode | MINOR | The Night mode checkbox unticked itself after the queue stopped. | Stays ticked, or says it reset. | | State it in the docs or the UI. |
| 10 | Report | MINOR | The "Reread" icon on each report row opens the task's session. In the docs "Reread" means re-show the report. | One name per action. | | Rename to "Open". |
| 11 | Question state | DOC-WRONG | A "question" task's Actions menu offers only "Mark as done" and "Drop". Docs list Restart. | Restart available. | | Add Restart or fix the docs. |
| 12 | Session header | MINOR | Header says "Running 4/9" while "Awaiting your decision". | Awaiting state shown as such. | | |
| 13 | Setup | MINOR | Provider card is not named `local` as the docs say (Name empty). Labels such as "Base URL" are not associated with inputs. | Card named as documented; accessible labels. | | Fix the doc or default; add label `for`. |
| 14 | Decisions page | NOTE | The project Decisions page shows "No ADR in docs/adr/". Recorded decisions appear only in the session gate's DECISIONS list. | One place for decisions. | | Link them. |
| 15 | Hint text | NOTE | "frame an idea from the backlog with [icon]" has no icon name in the text. | Readable without the icon. | | Add an aria-label. |

Extra: the ordering of drafts changes after opening one (last touched on top), which confused my script.

## (b) Opinion per area

| Area | Score | Evidence |
|------|-------|----------|
| 1. Setup clarity | 4/5 | tasks.md procedure worked as written; sheets, criteria, Ready and caps (shots 11-newidea, 13-drafts, 14-sheet, 17-ready1, 19-autonomy, 20-caps, 21-night-ticked). Caps shown inline: "night mode · max 12 min · 400.0k tokens per idea". Gaps: check environment (#5), provider name (#13). |
| 2. Autonomy | 1/5 | Stopped at Validate the tests for all 4 (#1). No self-recorded decision (#3). Criteria were left unchanged by night mode, but only because nothing ran. Caps untested (shots 22-started, 23-todecide). |
| 3. Night report | 2/5 | "4 questions" only (poll-05, 26-report-detail, 27-decisions); misleading "Reread" label (#10). |
| 4. Morning review and integration | 3/5 | The gate is strong: To accept, bypass and large-change signals caught the venv (40-gate-feature). Bug task integrated cleanly (42/43-integrated-bug), 3 commits, agent folder removed. But count mismatches (#6, #8) and restart cost (#7). |
| 5. Failure handling, ambiguous and risky | 2/5 | Ambiguous: silent pick, no decision. Risky: not refused or flagged (#3, #4). The criteria-change card was a good safety net. |
| 6. Trust | 3/5 | Isolation held: main stayed at cddc69c until I integrated. Provenance badges (verified / indicative) are useful. Trust is lowered by the stray todos.json that passed review and the unexplained stop. |

## (c) What was good

- The tasks.md procedure worked as written.
- Caps are visible inline on the queue bar.
- The plan agent and test writer produced sensible work.
- The review gate caught the committed `.venv` (bypass, large change, To accept).
- The Work panel marks criteria as "verified" or "indicative".
- Worktree isolation held; integration only on my click.

## (d) Doc pages wrong or missing

- tasks.md: the claim that the agent answers its own questions and records decisions does not match what happened (#1, #3). The human gate "Validate the tests" is not described as a night-mode stop.
- Missing: where the Check command runs, and what happens to a run when night mode refuses a criteria change (#5).
- Restart is documented but absent for a question task (#11).
- "Reread" is used for two actions (#10). The provider card name `local` (#13).

## (e) Verdict

Setup is clear and the review gate is trustworthy, but the core promise is not met: nothing was built overnight because every task stopped at a human gate that night mode does not answer. Fix the Validate-tests gate, the report content and decision recording first.

## (f) Decisions

| # | Decision | Commit or reason |
|---|----------|------------------|
| 1 | Night mode and the Validate-tests gate (#1) | open |
| 2 | Night report content (#2) | open |
| 3 | Decision recording for ambiguous choices (#3) | open |
| 4 | Risky idea refusal (#4) | open |
| 5 | Check environment and refused criteria change docs (#5) | open |
| 6 | Gate vs Work panel counts, commit subject (#6, #8) | open |
| 7 | Cheap correction path (#7) | open |
| 8 | Night checkbox reset (#9) | open |
| 9 | "Reread" naming (#10) | open |
| 10 | Restart for question tasks (#11) | open |
| 11 | Header state, provider name, hints, Decisions page (#12-#15) | open |
