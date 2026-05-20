# Railway API Notes - Advert

## Service
services/api

## Runtime
Node.js 20 or newer.

## Start command
npm start

## Health check
GET /health

## Environment variables
- PORT: provided by Railway in production. Locally defaults to 3001.

## Deployment sequence
1. Keep frontend on Vercel.
2. Deploy services/api as the Railway API service.
3. Confirm /health responds.
4. Add API URL to frontend environment only after API is deployed.

## Current stage
Stage 4 creates the API skeleton only. Database and persistence come later.
