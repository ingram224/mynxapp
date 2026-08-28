#!/usr/bin/env bash
# Держит localtunnel на субдомене fair-lights-go, перезапуская при обрывах.
LOG=/tmp/lt-fair.log
LT=./node_modules/.bin/lt
while :; do
  "$LT" --port 3000 --subdomain fair-lights-go >"$LOG" 2>&1 &
  pid=$!
  url=""
  for _ in $(seq 1 15); do
    sleep 2
    url=$(grep -o 'https://[^ ]*loca.lt' "$LOG" 2>/dev/null | head -1)
    [ -n "$url" ] && break
    kill -0 $pid 2>/dev/null || break
  done
  if [ "$url" = "https://fair-lights-go.loca.lt" ]; then
    echo "claimed: $url"
    wait $pid
    echo "client exited, retrying..."
  else
    echo "wrong subdomain: ${url:-<no url>} — retry"
    kill $pid 2>/dev/null
  fi
  sleep 5
done
