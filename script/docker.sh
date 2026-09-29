#!/usr/bin/env bash
# Runs a command inside node:24. The host's native esbuild binary SIGSEGVs on the
# owner's machine (see CLAUDE.md), and Astro's toolchain still depends on esbuild.
# Files the container writes are chowned back to the invoking user so the host
# never ends up with root-owned build output.
#
# Usage: script/docker.sh "npm ci && npm run build"
#        PORT=4321 script/docker.sh "npm run dev -- --host 0.0.0.0 --port 4321"
set -euo pipefail
cmd="${1:?usage: script/docker.sh \"<command>\"}"
port_args=()
if [[ -n "${PORT:-}" ]]; then port_args=(-p "${PORT}:${PORT}"); fi
docker run --rm \
  -v "$(pwd)":/app \
  -v portfolio-node-modules:/app/node_modules \
  -w /app \
  ${port_args[@]+"${port_args[@]}"} \
  node:24 \
  bash -c "${cmd}; status=\$?; chown -R $(id -u):$(id -g) dist .astro package.json package-lock.json 2>/dev/null; exit \$status"
