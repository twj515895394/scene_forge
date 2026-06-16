#!/usr/bin/env bash

# Resolve directory of this script to project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Call stop script
"$SCRIPT_DIR/stop.sh"

echo ""

# Call start script
"$SCRIPT_DIR/start.sh"
