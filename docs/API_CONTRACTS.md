# API Contracts - Advert

## Purpose
Define the initial backend contract direction before persistence.

## Base endpoints

### GET /health
Returns service health, version, stage and server time.

### GET /version
Returns service identity and semantic version.

### GET /entities
Returns the core entity names from the Stage 2 planning model.

## Future resource groups
- /brand-profiles
- /campaigns
- /calendar-items
- /drafts
- /approvals
- /publishing-tasks
- /publishing-logs
- /metrics
- /reports
- /watcher-handoffs

## Validation direction
Every write endpoint must validate required fields, allowed workflow states, safety gates and audit fields before persistence.

## Safety direction
The API must not expose direct publishing endpoints until channel policy, approval gates and audit logs are implemented.
