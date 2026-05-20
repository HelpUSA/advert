# Advert API

Railway API skeleton for Advert HelpUS BR.

## Local commands

Set-Location D:/dev/advert/services/api
npm run check
npm start

## Endpoints

- GET /health: service health, version, stage and time.
- GET /version: service name and version.
- GET /entities: planned core entities from the Stage 2 data model.

## Railway direction

Railway should run npm start from services/api. The API reads PORT from the environment and falls back to 3001 locally.

## Current limitation

This API is intentionally in-memory and read-only. Persistence, validation and watcher task endpoints come in later stages.
