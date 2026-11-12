#!/bin/bash
# usage: wait.sh id tag ; polls until the session needs a human or is done
for i in $(seq 1 40); do
  o=$(node /tmp/blind3/scripts/st.mjs $1 $2)
  echo "$o" | grep -q -E "Awaiting your|Review and integrate|Run finished|Needs you" && break
  sleep 15
done
echo "$o" | cut -c1-600
