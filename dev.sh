#!/bin/bash

# Exit on sub-command failure
set -e

# Port release check (idempotency)
echo "🔍 Checking and freeing development ports (3000, 5173)..."
for PORT in 3000 5173; do
  PID=$(lsof -t -i :$PORT || true)
  if [ ! -z "$PID" ]; then
    echo "⚠️ Terminating existing process $PID occupying port $PORT..."
    kill -9 $PID 2>/dev/null || true
  fi
done

echo "🚀 Starting SceneForge v9 Web Console in Dual Dev Mode..."

# Function to clean up background processes on exit
cleanup() {
  echo "🧹 Shutting down background processes..."
  # Kill all background jobs spawned by this shell session
  jobs -p | xargs -r kill 2>/dev/null || true
  exit 0
}

# Trap exit signals to ensure background processes are killed
trap cleanup SIGINT SIGTERM EXIT

# 1. Start Web Console Backend Server in background
pnpm --filter @scene-forge/web-console dev:server &

# Wait briefly for backend port to initialize
sleep 1.5

# 2. Start Web Console Client Server in background
pnpm --filter @scene-forge/web-console dev:client &

# Keep script running to maintain job context
wait
