#!/bin/bash
for i in $(seq 1 60); do
  n=$(printf %02d $i)
  node /tmp/blind3/scripts/poll.mjs $n >> /tmp/blind3/poll.log 2>&1
  if tail -1 /tmp/blind3/poll.log | grep -q "queue stopped\|queue idle"; then c=$((c+1)); [ ${c:-0} -ge 2 ] && break; fi
  sleep 90
done
echo LOOPDONE >> /tmp/blind3/poll.log
