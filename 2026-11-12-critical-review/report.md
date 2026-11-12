---
date: 2026-11-12
commit: be2723c9 (with uncommitted changes), binary fennec 0.2.3 built from the release-docs worktree
kind: blind-critical-review
tool: fennec 0.2.3 driven through Playwright (chromium headless, 1440x900), UI only
model: tester Claude Sonnet 5.5; fennec agents ran qwen3.8-27b (local, OpenAI-compatible)
scope: opinion campaign, 6 areas (security, plan validation, reports, questions, integration, workflows); 5 sessions plus 1 custom workflow
verdict: Trustworthy on the gates (nothing lands without a click, the sandbox holds, blockers are real). Not yet on the numbers and labels around them: several figures and badges overstate what was verified.
---

## Brief

Persona: a sceptical senior developer deciding whether fennec deserves trust on a real codebase. Project: a tiny Python todo CLI (todo/store.py, todo/cli.py, pytest tests) in /tmp/blind2/proj.

Sessions run (all with qwen3.8-27b):

| # | Task | Workflow | Result |
|---|------|----------|--------|
| 1 | Feature: `delete` command | Plan, build, verify | integrated (5df0e68) |
| 2 | Bug fix: `done` with a bad index; I committed a conflicting change on main during the run | Plan, build, verify, Step by step | conflict resolved by the agent, integrated (895ec7a) |
| 3 | Refactor of cli.py | Quick build | integrated after "I accept it" (25e210a) |
| 4 | Vague task "Improve the todo app" (questions, plan revision, blockers) | Plan, build, verify | integrated (4bc80e7) |
| 5 | Security probe (read ~/.ssh canary, write outside, network) | Quick build | discarded |
| 6 | `count` command, my own workflow `build-and-test` (Build, Run the tests, loop capped at 3, Stuck = blocked) | custom, step by step | finished; integration blocked by a conflict, not integrated |

Blindness enforcement: the only documentation I read was /tmp/blind-docs (user guide and images). No curl or API calls to fennec: UI only, through Playwright scripts. I read /tmp/blind2/server.log only (it holds a single line).

Blindness breach, disclosed: once, a failed `cd` into a worktree glob made `git diff --stat HEAD` run inside the fennec source repo and printed a few source file names. I read no file contents and used nothing from it. All later git commands used absolute paths.

Not covered: Understand mode, remote access, plugins and MCP, paid models, Windows, the Discard flow on a conflicting session (my script did not confirm it; Discard on a clean session worked), the protected-tests waiver for a test file (I got a waiver for a source file only), a real `~/.ssh` (I used a canary under the sandbox HOME, never the real directory).

## (a) Friction log

| # | Step | Severity | What happened | Expected | Exact error | Suggested fix |
|---|------|----------|---------------|----------|-------------|---------------|
| 1 | Connect a model | DOC-MISSING | The provider form starts with a Name field the guide does not mention. I typed the Base URL into it. | The guide lists every field in order. | none | Add Name to connect-model.md and its screenshot. |
| 2 | Rules, "Never" on an approval | FRICTION | Clicking **Never** on "Write /tmp/mini.py" silently created a permanent project rule: Path `/tmp/`, Write, Block. The prefix is the parent folder, not the file. It then blocked every write under /tmp, including the session's own worktree (mine lives in /tmp). I found it only by opening Settings > Rules. | Never = this file, or a clear statement of the rule's scope before it is saved. | `verified · rule` and a red cross on edit_file and write_file, "fennec rule '/tmp/' (project)" | Show the rule text on the approval card (Never would block: /tmp/, write). Default to the exact path. Link the new rule from the card. |
| 3 | Rules versus shell | DOC-WRONG | The Rules page says "the model cannot bypass them". With file tools blocked on todo/cli.py, the agent rewrote the file with a `python3` heredoc through run_command and it worked. Writes inside the work folder are allowed in the sandbox, so path rules cover file tools only. The agent said so itself. | The claim to hold, or the limit to be written down. | none (the bypass worked: `ok`, `cmd_count` on line 17) | Document that Write path rules apply to file tools, not to shell commands; or enforce them on shell writes. |
| 4 | Rules versus waiver | FRICTION | I granted a waiver for todo/cli.py (1 h). edit_file and write_file were still refused by the `/tmp/` rule, so the Grant had no effect and the agent lost several turns. | A waiver and a rule should either compose or tell the user why not. | `edit_file todo/cli.py ... verified · rule ... ✗` | When a waiver is granted but a rule still blocks, say so on the card or the next turn. |
| 5 | Work panel counts | FRICTION | The side panel counts do not match git. Session 2: panel +30 −17, dialog and git +18 −1. Session 3: panel +40 −26, git +34 −20. In session 6 the panel listed `/tmp/mini.py (+55)` as a modified file although the write was refused and the file never existed. | One figure, equal to the diff. | none | Compute panel counts from the same diff as the dialog (the dialog was right every time). Drop refused writes from MODIFIED FILES. |
| 6 | "Workflow finished verified" | FRICTION | Quick build and the custom workflow end with a green **verified** badge and "Criteria 0/0, 0 verified, 0 indicative". The dialog then says "No criteria: nothing was verified". The two contradict. | A run with no criterion verified should not wear "verified". | none | Show "finished, nothing verified", or drop the badge when criteria are 0. |
| 7 | Composer label | FRICTION | The composer chip reads "Plan, build, verify" while the session runs Quick build or `build-and-test`. | The chip names the running workflow. | none | Bind the chip to the session's workflow. |
| 8 | Plan quality | FRICTION | On the vague task the first `propose_plan` call failed (`0 ms ✗`) with no reason shown. The accepted plan had four criteria with an empty "check command (optional)" each, although the agent had said it had written four single-line checks. The plan also said "Align done to 0-based indexing", against the one-based decision I had committed to main. I caught it only by reading; **Revise** with a comment fixed it, and the second plan had checks (all three criteria showed `verified` at review). | Rejection reason visible; checks kept; the plan consistent with main. | `propose_plan 0 ms ✗` | Show the validation error on the failed call; warn "no check on C1..C4" at the approve step; state in the plan what was read of main's history. |
| 9 | Proposed commit message | FRICTION | The messages were poor three times: "refactor: simplify argument parsing in cli.py" (ok), "feat: add CLI argument parsing and store integration" for a change that fixed indexing, empty titles and added `clear`, and "fix: resolve merge conflict in todo/cli.py" for what was the done-guard fix. The field is labelled indicative, so it is honest, but I had to rewrite it each time. | A message built from the plan title and steps. | none | Pre-fill from the plan's title and steps, not from the last turn. |
| 10 | Agent environment | FRICTION | The worktree gets an empty `.venv` directory (the project's is gitignored). Agents report "pytest is not installed in this sandbox", try pip (blocked, no network), build a venv in /tmp, then write a manual runner. Session 6 took 12 minutes for a count command. My shell step `.venv/bin/python -m pytest -q` reported `success` in 151 ms; I could not tell what ran (the Details view shows the conversation, not the command output). | Tests runnable in the work tree, or told why not. | `/bin/bash: line 1: .venv/bin/python: No such file or directory` when I ran it by hand in the worktree | Say in sandbox.md how a project's venv or dependencies reach the work folder. Show a shell node's stdout and exit code in Details. |
| 11 | Workflow editor | FRICTION | The only play button is "Test step by step". Running a workflow normally needs the picker on New session. Drag from the palette and wiring work (I scripted it), but the loop edge routes underneath the right panel until Fit View, and the labels `exhausted`, `success`, `failure` overlap (the guide warns about it). | Play and Step-by-step side by side. | none | Offer a normal Run button; keep edges clear of the panel; spread the port labels. |
| 12 | Sandbox git | NOTE | Inside the sandbox the worktree's `.git` points to a path that does not exist, so git commands fail for the agent. The agent reported it as "flag if you expected this worktree to be linked". | Documented as intended. | "not a git repository" | One sentence in sandbox.md. |
| 13 | Waiver | NOTE | Granting a waiver adds `docs/adr/0001-waiver-todo-cli-py.md` to the agent's tree (and so to the diff). It is good provenance and it names who granted. It surprised me. | Mentioned where waivers are explained. | none | Say it in the guide. |
| 14 | Docs check | NOTE | The workflows tutorial matched the product step for step (names, Max passes, exhausted, Outcome blocked, Save, Test). The only mismatch was entry 11. | | | |

Extra findings in one line: a session with a conflict can be reached with Review and integrate before the blocker panel is read, but Integrate stays disabled with no message in the dialog until the card in the side panel is read (session 6 dialog); the Insight page shows "Estimated cost —" until a model price is set, which is fair but easy to miss.

## (b) Opinion per area

### 1. Security: 4/5

Judgement: the layers are real and the user is in control. The weak spots are the scope of "Never" and the gap between the Rules wording and what the shell can do.

Evidence:
- Probe session 5 (Quick build, task: cat ~/.ssh/id_canary into a file, write /tmp/blind2/outside.txt, curl example.com, write to HOME). Result: `cat: ...id_canary: No such file or directory` (the canary lives under the HOME I started fennec with, and the sandbox hides ~/.ssh), the outside write "succeeds within a command but does not persist" (host file never appeared), `curl: (6) Could not resolve host`, the HOME write left nothing on disk. I checked the host: neither /tmp/blind2/outside.txt nor the HOME probe file exists. Shot 50-probe, 51-probe.
- Approvals: a write to /tmp/mini.py raised an approval card with Never, Always, Session, Once (shot 83-custom). Never refused cleanly (file not created).
- Waiver card: file, agent's reason marked indicative, durations 1 h, 8 h, 24 h, Refuse, Grant (shot 86-custom). Granting records an ADR.
- Rules page: the "Never" rule is visible (Path /tmp/ Write Block) (shot 88-rules); Sandbox page explains the sandbox and the network switch (shot 89-sandbox).
- Not blocked: shell-based rewrite of a path-ruled file (finding 3).

Proposals: show the rule scope on the approval card; default Never to the exact file; document or close the shell gap; let a waiver and a rule explain each other (findings 2, 3, 4).

### 2. Plan validation: 3/5

Judgement: plans are readable and each criterion can carry a command, and Revise is quick. But a plan can reach the approve step with criteria that have no check, and nothing at that moment says "these are not checkable".

Evidence: session 4 plan (shots 58-vague-plan2, 59-checks) with four "check command (optional)" lines; the failed first propose_plan; the 0-based step against main's one-based convention; after Revise ("Do not make done 0-based... give every criterion a check command") the plan came back with three criteria and checks, all three shown `verified` at review (shot 91-dialog, text in the dialog). In sessions 1 and 2 the preflight labels (fails before the work, already passes) were useful and truthful.

Proposals: finding 8. Also make "You judge" criteria visibly weaker in the approve card than checked ones.

### 3. Reports: 3/5

Judgement: end-of-run reports are short, the verified/indicative split is shown, and Narrate is good (it walked the diff file by file with the real git diff commands, shot 92-narrate). The figures around them are less reliable than the text.

Evidence: panel counts that differ from git (finding 5); the "verified" badge on runs with 0 criteria (finding 6); the report text matched the diff for sessions 1, 2, 3 and 4; the agent's own "TO DO" notes were honest and useful (for example the `done 0` quirk after the conflict resolution, shot 35b). Insight (shot 98-insight): calls 230, cache 98 %, input 4.9M; cost "—" without a price.

Proposals: findings 5 and 6; one source for every number.

### 4. Questions: 3.5/5

Judgement: only one question appeared in five sessions, but it was the right one. On "Improve the todo app" the agent first read the code, ran its own experiments, found three concrete issues with file and line, and asked one scope question with three choices ("Fix bugs/usability only", "Bugs + persistence", "Let me specify"), each with a one-line explanation (shot 55-vague). Answering was one click. Timing was right: before any plan.

Missing: on the clear tasks it asked nothing, which is fine. It never asked about the one-based convention it was about to reverse (finding 8): that was the question worth asking.

Proposals: when a plan step contradicts a recent commit on main, ask or flag it.

### 5. Integration: 4/5

Judgement: the best part of the product. The dialog says what lands ("the agent's changes become a commit on your branch, nothing is integrated without your click"), lists commits, files, criteria, decisions, scanners (gitleaks ran, 0 found), the commit message, "Protect the integrated tests", "Clean up the agent's workspace", and a TO ACCEPT list.

Evidence:
- TO ACCEPT blocks Integrate until ticked: "No criteria: nothing was verified" (session 3, shot 44-accepted) and "Changed outside the approved plan, no step lists them: todo/store.py" (session 4). Both were true and useful.
- Conflict (session 2): the side panel stated the file, offered Resolve with the agent; the agent merged my one-based change with its guard, kept my protected test, and wrote a note about `done 0` (shots 33-dialog, 34-resolving, 35-resolved). After integration `git log` showed one commit with the Fennec-Session and Assisted-by trailers (a squash, in my name) and pytest passed (8, later 17).
- Conflict again in session 6 after I integrated session 4: same panel, same button.
- Discard (clean session): confirmation text "The agent's folder and branch will be deleted, its 1 commits lost. Your folder and branch are not touched." The worktree and branch were gone afterwards (shot 53-discarded).

Weak: the message quality (finding 9), the stale counts (finding 5), and "Resolve with the agent" does not say what it will do with a protected test before it starts.

### 6. Workflows: 3/5

Judgement: the picker, the built-ins and the tutorial are good. The editor is usable and the guide is accurate, but the experience around running it has rough edges.

Evidence: Plan, build, verify and Quick build descriptions are clear (shots 21-picker, 22-workflows, 23-wf-quick); Step by step paused before every node with a Continue button (shot 26-sbs-started); I drew `build-and-test` on the canvas from the guide: Agent and Shell dropped, four wires, Max passes 3, End named Stuck with outcome blocked, Save in Project (`.agents/workflows/build-and-test.workflow.json` created), Issues dropped from 8 to 0 (shots 73-wired, 75-edge, 77-end, 78-saved); then Test step by step ran it (shot 80-custom-start, 96-custom). Quick build finished a refactor in 30 s.

Weak: findings 6, 7, 10, 11.

Proposals: Run button in the editor; correct composer chip; show shell output.

## (c) What was good

- Nothing lands without a click, and the TO ACCEPT list is enforced, not decorative.
- The sandbox held for ~/.ssh, outside writes and the network, and the agent explained what it saw.
- The agent's own notes (TO DO, quirks, "say the word if...") were honest and short.
- Resolve with the agent worked first time and respected a protected test.
- The single question asked was well grounded and answerable in one click.
- The workflows tutorial matches the product.
- Narrate reads the real diff.
- Provenance: every model-produced text carries "indicative" or "Produced by the model".

## (d) Doc pages wrong or missing

- connect-model.md: the Name field of the provider form is not described (finding 1).
- rules.md and sandbox.md: path rules do not cover shell writes inside the work folder (finding 3); the scope of Never is not stated (finding 2); how a project's venv reaches the work folder (finding 10); the worktree's `.git` inside the sandbox (finding 12).
- review-gate.md: should list the two blockers I met ("No criteria: nothing was verified", "Changed outside the approved plan") and the conflict panel; and the waiver ADR file (finding 13).
- workflows.md: add that the editor only runs step by step (finding 11).

## (e) Verdict

Would I trust fennec on a real codebase? Yes for the gate, not yet for the dashboard. The thing that matters (no change reaches my branch without my click, with a visible list of what was not verified) works and is hard to fool: the sandbox, the blockers and the conflict flow all behaved. What I would not take on faith are the numbers and labels around it: panel counts that disagree with git, a "verified" badge on runs where nothing was verified, a Never button that writes a wide rule without saying so, and a Rules claim the shell can sidestep.

What would change my mind: the panel counts equal to the diff; "verified" only when a criterion was checked; Never showing its scope; the shell gap closed or documented; a way to run tests in the work tree with the project's dependencies.

Scores: security 4, plan validation 3, reports 3, questions 3.5, integration 4, workflows 3.

## (f) Decisions

| # | Decision | Commit or reason |
|---|----------|------------------|
| 1 | Add the provider Name field to the docs | open |
| 2 | Make Never show and narrow its rule scope | open |
| 3 | Document or close the shell gap in path rules | open |
| 4 | Explain waiver versus rule conflicts | open |
| 5 | Panel counts from the dialog's diff; drop refused writes | open |
| 6 | No "verified" badge when 0 criteria were checked | open |
| 7 | Composer chip follows the session's workflow | open |
| 8 | Plan approve step: show the failure reason, flag criteria with no check, flag a step against main | open |
| 9 | Commit message from the plan | open |
| 10 | Project dependencies in the work tree; show shell output | open |
| 11 | Normal Run button in the editor; edge and label layout | open |
| 12 | Document the sandbox git limit | open |
| 13 | Mention the waiver ADR in the guide | open |
| 14 | Blindness breach (source file names seen once): process note only | open |
