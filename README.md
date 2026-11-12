# fennec blind tests

Blind usability tests of [fennec](https://github.com/ikarys/fennec). An agent gets only the user
guide (`docs/users`) and the running UI, never the source code, follows the guide literally on a
project of its own, and writes a report. fennec's maintainer decides what happens to each finding.

Each campaign folder holds:

- `report.md`: the brief, how blindness was enforced, the friction log, the effort per step, what
  was simple, the wrong or missing doc pages, the verdict, and the maintainer's decisions.
- `scripts/`: the Playwright scripts the agent wrote to drive the UI, in the order it ran them.
- `shots/`: the screenshots it took along the way.
- `server.log`: the only runtime log it read.

| Date | fennec commit | Campaign | Tester | Verdict | Open findings |
|---|---|---|---|---|---|
| 2026-11-12 | be2723c9 | [user guide](2026-11-12-user-guide/report.md) | Claude Code / claude-sonnet-5-5, fennec on local:qwen3.8-27b | pass with friction | 0 |

Maintainer: Ikarys <bikarys@proton.me>
