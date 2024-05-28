@echo off

:: Build and launch PostgreSQL Docker container
docker compose up -d --wait --build
