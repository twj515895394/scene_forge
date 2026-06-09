#!/bin/bash
# SceneForge Web Console — 一键重启前后端

set -e

cd "$(dirname "$0")"

echo "=== 🔍 检查旧服务 ==="

kill_port() {
  local port=$1
  local pids=$(lsof -ti :$port 2>/dev/null)
  if [ -n "$pids" ]; then
    echo "  → 端口 $port 占用进程: $pids，正在终止..."
    kill -9 $pids 2>/dev/null
    sleep 1
    echo "  → 端口 $port 已释放"
  else
    echo "  → 端口 $port 空闲"
  fi
}

kill_port 4399
kill_port 4398

echo ""
echo "=== 🚀 启动服务 ==="

npx concurrently \
  --names "API,UI" \
  --prefix-colors "cyan,magenta" \
  "npm run dev:server" \
  "npm run dev:client"
