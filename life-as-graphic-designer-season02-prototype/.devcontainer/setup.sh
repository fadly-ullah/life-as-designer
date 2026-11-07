#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v chromium >/dev/null; then
 if [ -x /usr/local/bin/cloud-agent-packages ]; then
  sudo -n /usr/local/bin/cloud-agent-packages update
  sudo -n /usr/local/bin/cloud-agent-packages install chromium python3-venv
 else
  sudo apt-get update
  sudo apt-get install -y chromium python3-venv
 fi
fi
npm ci
npm run typecheck
npm run check:identity
