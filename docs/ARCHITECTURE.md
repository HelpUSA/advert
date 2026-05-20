# Architecture

## Local root
D:/dev/advert

## Frontend
apps/web is a Next.js app intended for Vercel and advert.helpusbr.com.

## Backend
services/api will host the Railway API in a later phase.

## Core entities
- BrandProfile
- Campaign
- ContentDraft
- Approval
- PublishingTask
- PublishingLog
- MetricSnapshot
- WatcherHandoff

## Safety model
All publishing starts approval-gated. The product must not support spam, fake engagement, mass DMs, credential sharing, abusive scraping or impersonation.

## Watcher role
The watcher prepares drafts, validates files, runs builds, keeps logs and reports progress through small auditable commands.
