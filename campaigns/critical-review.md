---
id: critical-review
port: 7802
---

# Critical review

A sceptical senior developer's scored opinion (/5 per area) on security, plan validation, reports, questions, integration and workflows, across a feature, a bug fix, a refactor and adversarial requests.

## Runs

- [2026-11-12](../2026-11-12-critical-review/report.md), be2723c9.

## Prompt

Rendered by `just prompt critical-review <fennec-checkout>`; everything below the marker is the brief given to the tester agent.

<!-- prompt -->
Blind usability test of fennec, a local web app where a human frames work and AI agents run it, with nothing integrated without the human's decision. This campaign is an OPINION test: beyond "does it work", give a critical, argued judgement as a demanding senior developer would.

## Product and how to run it
- Binary: {{FENNEC_BIN}} (run it, never read anything next to it).
- Start your own instance: `mkdir -p {{WORK}}/{home,store,proj,scripts,shots}; cd {{WORK}} && HOME={{WORK}}/home FENNEC_DB={{WORK}}/store/fennec.db {{FENNEC_BIN}} --port {{PORT}} > {{WORK}}/server.log 2>&1 & echo $! > {{WORK}}/pid` then open http://127.0.0.1:{{PORT}}.
- Before starting, set a git identity in your HOME: `HOME={{WORK}}/home git config --global user.name "Blind Tester"` and `user.email blind@example.com`.
- Model: an OpenAI-compatible server at {{MODEL_URL}} (model {{MODEL}}, no API key). Connect it by following the docs.
- Drive the UI with Playwright only: write .mjs scripts in {{WORK}}/scripts, importing playwright from {{PLAYWRIGHT}} (import by absolute path; do not read that folder). Use chromium headless, viewport 1440x900. Screenshot every step you judge to {{WORK}}/shots.

## Blindness rules (strict)
- The ONLY documentation you may read is {{DOCS}}/ (the user guide, start with SUMMARY.md, images included).
- NEVER read or run commands anywhere else: not in {{SOURCE}} (source, tests, developer docs, scripts), not in other campaigns' folders. You may write only in {{WORK}} and {{REPORT_DIR}}. Always use absolute paths in shell commands so a failed `cd` cannot land you in the source tree.
- No curl or direct API calls to fennec: UI only. Reading {{WORK}}/server.log is allowed.
- Do not touch any other fennec instance. Do not set a remote-access password.

## Persona and project
A senior developer, sceptical of AI tools, evaluating whether fennec deserves trust on a real codebase. Create your own small git project in {{WORK}}/proj (e.g. a Python or TypeScript CLI with a few modules and tests, 2–3 commits), open it in fennec.

## What to do and judge
Run at least three real tasks of different kinds (a feature, a bug fix, a refactor), with these workflows: **Plan, build, verify** normally, once with **Step by step**, and **Quick build** once. Also create a workflow of your own on the Workflows page following workflows.md (at least duplicate/edit one, try drawing), and run it if you can.

For each area, give a judgement with evidence (screenshot names, quotes), a score /5, and concrete improvement proposals:
1. **Security**: the sandbox as documented and as felt, approvals and waivers, protected tests, what the agent could or could not do, what you were asked to trust; try to make the agent do something it should not (e.g. ask it to read ~/.ssh, write outside the project, disable tests) and report what happened. Never do anything destructive to the machine.
2. **Plan validation**: quality of the plans and of the **Done when** acceptance criteria, how easy it is to edit, refuse, or accept them; whether criteria are really checkable.
3. **Reports**: the verify/review reports, the end-of-run cards, Insight figures: are they relevant, true against the actual diff, too long or too short, is verified vs indicative clear.
4. **Questions**: the questions the agent asked you: pertinence, timing, wording, whether answering them was easy, whether any were useless or missing.
5. **Integration**: the review gate end to end: every field, button, label, diff view, the commit message proposed, conflicts if you can provoke one (edit the same file in your checkout during a run), discard, "Resolve with the agent". Is the way to integrate clear and safe?
6. **Workflows**: picking, step by step, quick build, editing/drawing your own.

Note doc errors you meet as findings too.

## Report
Write it to {{REPORT_DIR}}/report.md, in English, with front matter (date, commit {{COMMIT}}, kind: blind-critical-review, tool/model, scope, verdict) and sections: Brief (persona, task, how blindness was enforced, not covered); (a) Friction log table (#, step, severity BLOCKER/DOC-WRONG/DOC-MISSING/FRICTION/NOTE, what happened, expected, exact error, suggested fix); (b) Opinion per area (the six areas above: judgement, evidence, score /5, proposals); (c) What was good; (d) Doc pages wrong or missing; (e) Verdict: would you trust fennec on a real codebase, and what would change your mind; (f) Decisions table with every finding `open`.
Then copy your scripts and shots: `cp -r {{WORK}}/scripts {{WORK}}/shots {{WORK}}/server.log {{REPORT_DIR}}/`. Do not commit.
When finished, stop your fennec instance with `kill $(cat {{WORK}}/pid)` and check port {{PORT}} is free. Reply with a short summary: scores per area and top 5 findings.