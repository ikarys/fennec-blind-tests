---
id: user-guide
port: 7801
---

# User guide

Does the user guide, followed literally by a newcomer, get through every feature? One pass over every page in the order of SUMMARY.md, scored on friction, not opinion.

## Runs

- [2026-11-12](../2026-11-12-user-guide/report.md), be2723c9. That run used an earlier form of this brief (docs read in the checkout, report written in the fennec repository); the task, persona and rules were the same.

## Prompt

Rendered by `just prompt user-guide <fennec-checkout>`; everything below the marker is the brief given to the tester agent.

<!-- prompt -->
Blind usability test of fennec, a local web app where a human frames work and AI agents run it, with nothing integrated without the human's decision. This campaign checks that the user guide, followed literally, gets a newcomer through every feature.

## Product and how to run it
- Binary: {{FENNEC_BIN}} (run it, never read anything next to it). Installing is out of scope: the binary is given.
- Start your own instance: `mkdir -p {{WORK}}/{home,store,proj,scripts,shots}; cd {{WORK}} && HOME={{WORK}}/home FENNEC_DB={{WORK}}/store/fennec.db {{FENNEC_BIN}} --port {{PORT}} > {{WORK}}/server.log 2>&1 & echo $! > {{WORK}}/pid` then open http://127.0.0.1:{{PORT}} wherever the docs say 7777.
- Do NOT set a git identity beforehand: the guide must tell you to.
- Model: an OpenAI-compatible server at {{MODEL_URL}} (model {{MODEL}}, no API key). It is slow (a turn can take minutes): wait with generous timeouts, keep model-heavy tasks small. Connect it by following the docs.
- Drive the UI with Playwright only: .mjs scripts in {{WORK}}/scripts, importing playwright by absolute path from {{PLAYWRIGHT}} (do not read that folder). Chromium headless, viewport 1440x900. Screenshot each step to {{WORK}}/shots and look at them.

## Blindness rules (strict)
- The ONLY documentation you may read is {{DOCS}}/ (the user guide; start with SUMMARY.md; images included).
- NEVER read or run commands anywhere else: not in {{SOURCE}} (source, tests, developer docs, scripts), not in other campaigns' folders. You may write only in {{WORK}} and {{REPORT_DIR}}. Always use absolute paths in shell commands so a failed `cd` cannot land you in the source tree.
- No curl or direct API calls to fennec: UI only. Reading {{WORK}}/server.log is allowed.
- Do not touch any other fennec instance. Remote access page: read only, do not expose anything to the network, no password.

## Persona and project
A developer new to fennec who reads the guide and follows it literally, step by step. Create your own small git project in {{WORK}}/proj (e.g. a tiny Python CLI with a pytest test, 2 commits) and open it in fennec.

## What to do
Try everything the user guide describes, in the order of SUMMARY.md: connect a model, open a project, first session, the three ways to work (a chat, an agent session, a workflow), plans and criteria, the review gate (integrate one change, discard another), the files editor (edit + commit), understanding the project (module map, risks), tasks (idea → sheet → ready → start the queue), plugins (write the example plugin from the docs and enable it), usage/insight, settings, the remote access page. For each step note: did the docs get you there, which screenshot or label did not match the UI, what was missing or wrong.
Not covered here (other campaigns): drawing a workflow, Canvas, night mode.
Stop conditions: about 3 hours of work; skip a step after 3 failed attempts and record it.

## Report
Write it to {{REPORT_DIR}}/report.md in English, with front matter (date, commit {{COMMIT}}, kind: blind-user-guide, tool/model, scope, verdict) and sections: Brief (persona, task, how blindness was enforced, not covered, any breach disclosed); (a) Friction log table (#, step, severity BLOCKER/DOC-WRONG/DOC-MISSING/FRICTION/NOTE, doc page, what happened, expected, exact error, suggested fix); (b) Effort per step; (c) What was simple; (d) Doc pages wrong or missing; (e) Verdict; (f) Decisions table with every finding `open`.
Then `cp -r {{WORK}}/scripts {{WORK}}/shots {{WORK}}/server.log {{REPORT_DIR}}/`. Do not commit.
When finished, stop your fennec instance with `kill $(cat {{WORK}}/pid)` and check port {{PORT}} is free. Reply with a short summary: top findings and what worked.
