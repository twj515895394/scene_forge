#!/usr/bin/env bash

# Exit on error
set -e

# Resolve directory of this script to project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
cd "$PROJECT_ROOT"

LOG_DIR="runtime/logs"
PID_FILE="runtime/web-console.pid"
PORT_API=4399
PORT_UI=4398

# Create directories if they don't exist
mkdir -p "$LOG_DIR"

echo "=== 🔍 Checking for existing services ==="

# Check ports
API_PID=$(lsof -t -i :$PORT_API 2>/dev/null || true)
UI_PID=$(lsof -t -i :$PORT_UI 2>/dev/null || true)

if [ -n "$API_PID" ] || [ -n "$UI_PID" ] || [ -f "$PID_FILE" ]; then
  echo "⚠️ Web Console services seem to be running:"
  [ -n "$API_PID" ] && echo "  → API Server (Port $PORT_API) PID: $API_PID"
  [ -n "$UI_PID" ] && echo "  → UI Client (Port $PORT_UI) PID: $UI_PID"
  [ -f "$PID_FILE" ] && echo "  → PID File exists: $(cat $PID_FILE 2>/dev/null)"
  echo "Please stop them first using: ./scripts/stop.sh or restart using ./scripts/restart.sh"
  exit 1
fi

echo "🚀 Starting SceneForge Web Console in background..."

# 1. Start Web Console Backend Server in background
echo "  → Starting API server (port $PORT_API)..."
pnpm --filter @scene-forge/web-console dev:server > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!

# Wait briefly for backend port to initialize
sleep 1.5

# 2. Start Web Console Client Server in background
echo "  → Starting UI client (port $PORT_UI)..."
pnpm --filter @scene-forge/web-console dev:client > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!

# Store PIDs
echo "$BACKEND_PID $FRONTEND_PID" > "$PID_FILE"

# Wait a moment to check if they survived
sleep 2

# Verify ports are open
API_STATUS=$(lsof -i :$PORT_API -t || true)
UI_STATUS=$(lsof -i :$PORT_UI -t || true)

if [ -n "$API_STATUS" ] && [ -n "$UI_STATUS" ]; then
  echo "✅ Web Console started successfully!"
  echo "  → API Server is running on PID $API_STATUS (Port $PORT_API)"
  echo "  → UI Client is running on PID $UI_STATUS (Port $PORT_UI)"
  echo "  → API Logs: $LOG_DIR/backend.log"
  echo "  → UI Logs: $LOG_DIR/frontend.log"
  echo "  → Open in browser: http://localhost:$PORT_UI"
else
  echo "❌ Failed to start one or both services."
  [ -z "$API_STATUS" ] && echo "  → API Server failed to bind to port $PORT_API. Check $LOG_DIR/backend.log"
  [ -z "$UI_STATUS" ] && echo "  → UI Client failed to bind to port $PORT_UI. Check $LOG_DIR/frontend.log"
  # Clean up partial runs
  "$SCRIPT_DIR/stop.sh" >/dev/null 2>&1 || true
  exit 1
fi
