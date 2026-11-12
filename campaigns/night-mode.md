---
id: night-mode
port: 7803
---

# Night mode

The Tasks board end to end, unattended: ideas to sheets to the night queue, then the morning report, the agent's own decisions, and review of each task. Includes an ambiguous and a risky task on purpose.

## Runs

- [2026-11-12](../2026-11-12-night-mode/report.md), be2723c9.

## Prompt

Rendered by `just prompt night-mode <fennec-checkout>`; everything below the marker is the brief given to the tester agent.

<!-- prompt -->
Blind usability test of fennec, a local web app where a human frames work and AI agents run it, with nothing integrated without the human's decision. This campaign tests the Tasks board and NIGHT MODE end to end, and asks for your critical, argued opinion on it.

## Product and how to run it
- Binary: {{FENNEC_BIN}} (run it, never read anything next to it).
- Start your own instance: `mkdir -p {{WORK}}/{home,store,proj,scripts,shots}; cd {{WORK}} && HOME={{WORK}}/home FENNEC_DB={{WORK}}/store/fennec.db {{FENNEC_BIN}} --port {{PORT}} > {{WORK}}/server.log 2>&1 & echo $! > {{WORK}}/pid` then open http://127.0.0.1:{{PORT}}.
- Before starting, set a git identity: `HOME={{WORK}}/home git config --global user.name "Blind Tester"` and `user.email blind@example.com`.
- Model: an OpenAI-compatible server at {{MODEL_URL}} (model {{MODEL}}, no API key). Connect it by following the docs.
- Drive the UI with Playwright only: .mjs scripts in {{WORK}}/scripts, importing playwright by absolute path from {{PLAYWRIGHT}} (do not read that folder). Chromium headless, viewport 1440x900. Screenshot each step to {{WORK}}/shots.

## Blindness rules (strict)
- The ONLY documentation you may read is {{DOCS}}/ (user guide; start with SUMMARY.md and tasks.md; images included).
- NEVER read or run commands anywhere else: not in {{SOURCE}} (source, tests, developer docs, scripts), not in other campaigns' folders. You may write only in {{WORK}} and {{REPORT_DIR}}. Always use absolute paths in shell commands so a failed `cd` cannot land you in the source tree.
- No curl or direct API calls to fennec: UI only. Reading {{WORK}}/server.log is allowed.
- Do not touch any other fennec instance. No remote-access password.

## Persona and project
A developer who wants fennec to work while they sleep and to find reviewable work in the morning. Create a small git project in {{WORK}}/proj (e.g. a Python CLI with a few modules and pytest tests, 2–3 commits) and open it in fennec.

## What to do
1. Add 4 ideas to the Tasks board of different sizes and clarity: one clear small feature, one bug fix, one deliberately ambiguous idea (so the agent would normally need to ask a question), and one that should be refused or stopped (e.g. touching something risky, or too big for the caps).
2. Turn them into tasks with sheets and acceptance criteria as tasks.md describes; mark them ready.
3. Set the night mode caps in Settings > Autonomy as documented (keep them small so the run ends in reasonable time).
4. Tick **Night mode** and **Start the queue**. Then do NOT interact while it runs, as if asleep: only poll the page periodically (every 1–2 minutes) with screenshots. Cap your wait at about 90 minutes total; if it is still running, stop the queue as documented and report it.
5. "In the morning": read the night report, every decision the agent recorded on its own with its reason, the criteria results, each task's state; then review and integrate or discard each one through the review gate.

## Judge (score /5, evidence = screenshot names and quotes, proposals)
1. Setting it up: ideas → sheets → ready → caps → start: clear or not.
2. Autonomy: the self-answered questions and recorded decisions: were they sensible, traceable, would you agree with them; did it respect "may never change the acceptance criteria"; did the caps hold.
3. The night report: does it let you understand in a few minutes what happened and what needs you; anything missing, wrong or noise.
4. Morning review and integration: how fast and safe it is to process several finished tasks.
5. Failure handling: the ambiguous and the risky task: what happened, was it surfaced well.
6. Trust: would you leave it running on a real repository overnight, and what would change your mind.
Note doc errors as findings.

## Report
Write it to {{REPORT_DIR}}/report.md in English, with front matter (date, commit {{COMMIT}}, kind: blind-night-mode, tool/model, scope, verdict) and sections: Brief (persona, task, how blindness was enforced, not covered, any breach disclosed); (a) Friction log table (#, step, severity BLOCKER/DOC-WRONG/DOC-MISSING/FRICTION/NOTE, what happened, expected, exact error, suggested fix); (b) Opinion per area (six areas above with score /5); (c) What was good; (d) Doc pages wrong or missing; (e) Verdict; (f) Decisions table with every finding `open`.
Then `cp -r {{WORK}}/scripts {{WORK}}/shots {{WORK}}/server.log {{REPORT_DIR}}/`. Do not commit.
When finished, stop your fennec instance with `kill $(cat {{WORK}}/pid)` and check port {{PORT}} is free. Reply with a short summary: scores per area and top 5 findings.