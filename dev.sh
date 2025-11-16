#!/bin/bash

# Stop on error
set -e

# Trap Ctrl+C (SIGINT) and kill all subprocesses
trap "echo 'Stopping all services...'; kill 0" SIGINT

echo "Starting Backend API..."
pnpm --filter almora-shop-backend dev &
BACKEND_PID=$!

echo "Starting Admin UI..."
pnpm --filter almora-shop-backend admin &
ADMIN_PID=$!

echo "Starting Storefront UI..."
pnpm --filter almora-shop-ui dev &
UI_PID=$!

echo "All services are running. Press Ctrl+C to stop."

wait
