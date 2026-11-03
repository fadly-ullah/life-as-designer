#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v chromium >/dev/null || ! command -v ffmpeg >/dev/null; then
  if [ "$(id -u)" -eq 0 ]; then
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends chromium ffmpeg fonts-dejavu-core
  else
    sudo apt-get update
    sudo env DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends chromium ffmpeg fonts-dejavu-core
  fi
fi
npm ci --no-audit --no-fund
npm run check:environment
npm run audio:inspect
npm run typecheck
# Studio is a process and should be started for each Codespaces session:
# npm run dev -- --no-open; then Ports -> 3001 -> Open in Browser.
