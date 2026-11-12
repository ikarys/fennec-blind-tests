# Replay a campaign: `just prepare <checkout>`, then `just prompt <campaign> <checkout>` and give
# the output to the tester agent (vibecoding-blind-test).

docs := "/tmp/blind-docs"
model_url := env("BLIND_MODEL_URL", "http://127.0.0.1:8000/v1")
model := env("BLIND_MODEL", "qwen3.8-27b")

# List the fixed campaigns.
default:
    @grep -h '^# ' campaigns/*.md | sed 's/^# /- /'
    @ls campaigns | sed 's/\.md$//; s/^/  just prompt /; s/$/ <fennec-checkout>/'

# Build fennec from a checkout and copy its user guide, the only docs the tester may read.
prepare checkout:
    cd {{checkout}} && just build
    rm -rf {{docs}} && cp -r {{checkout}}/docs/users/src {{docs}}

# Print the brief of a campaign with this run's paths, port, commit and model filled in;
# empties its work folder so the run starts clean.
prompt campaign checkout:
    #!/usr/bin/env bash
    set -euo pipefail
    spec=campaigns/{{campaign}}.md
    src=$(realpath {{checkout}})
    port=$(sed -n 's/^port: //p' "$spec")
    commit=$(git -C "$src" rev-parse --short HEAD)
    [ -z "$(git -C "$src" status --porcelain)" ] || commit="$commit with uncommitted changes"
    work=/tmp/blind-{{campaign}}
    if ss -ltn | grep -q ":$port "; then echo "port $port is in use" >&2; exit 1; fi
    rm -rf "$work"
    sed -n '/^<!-- prompt -->$/,$p' "$spec" | tail -n +2 | sed \
      -e "s#{{{{FENNEC_BIN}}#$src/target/release/fennec#g" \
      -e "s#{{{{PLAYWRIGHT}}#$src/web/node_modules/playwright/index.mjs#g" \
      -e "s#{{{{SOURCE}}#$src#g" \
      -e "s#{{{{DOCS}}#{{docs}}#g" \
      -e "s#{{{{WORK}}#$work#g" \
      -e "s#{{{{PORT}}#$port#g" \
      -e "s#{{{{REPORT_DIR}}#$PWD/$(date +%F)-{{campaign}}#g" \
      -e "s#{{{{COMMIT}}#$commit#g" \
      -e "s#{{{{MODEL_URL}}#{{model_url}}#g" \
      -e "s#{{{{MODEL}}#{{model}}#g"
