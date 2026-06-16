#!/usr/bin/env bash

# Resolve directory of this script to project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
cd "$PROJECT_ROOT"

PID_FILE="runtime/web-console.pid"
PORT_API=4399
PORT_UI=4398

echo "=== 🛑 Stopping Web Console Services ==="

# 1. Kill by PID file if it exists
if [ -f "$PID_FILE" ]; then
  PIDS=$(cat "$PID_FILE")
  echo "  → Found PID file with PIDs: $PIDS"
  for PID in $PIDS; do
    if ps -p "$PID" > /dev/null 2>&1; then
      echo "    → Terminating process $PID..."
      kill "$PID" 2>/dev/null || true
      sleep 0.5
      kill -9 "$PID" 2>/dev/null || true
    fi
  done
  rm -f "$PID_FILE"
fi

# 2. Check ports and clean up lingering processes
echo "  → Checking for lingering processes on ports $PORT_API and $PORT_UI..."
PORT_PIDS=$(lsof -t -i :$PORT_API -i :$PORT_UI 2>/dev/null || true)
if [ -n "$PORT_PIDS" ]; then
  echo "    → Found port-bound PIDs: $PORT_PIDS"
  for PID in $PORT_PIDS; do
    echo "    → Killing PID $PID..."
    kill -9 "$PID" 2>/dev/null || true
  done
fi

# 3. Clean up any other processes containing "scene_forge/apps/web-console"
echo "  → Checking for other web-console processes..."
PATH_PIDS=$(ps aux | grep "scene_forge/apps/web-console" | grep -v grep | awk '{print $2}' || true)
if [ -n "$PATH_PIDS" ]; then
  echo "    → Found matching PIDs: $PATH_PIDS"
  for PID in $PATH_PIDS; do
    echo "    → Killing PID $PID..."
    kill -9 "$PID" 2>/dev/null || true
  done
fi

echo "✅ Web Console services stopped."
