# Data Model - Advert

## Purpose
This document defines the core planning model for Advert before backend implementation. The goal is to make the product workflow clear enough to drive screens, API contracts, database schema and watcher automation.

## Core entities

### BrandProfile
Represents a company, person, service, product or social profile that will be promoted.
Fields: id, name, type, status, goal, audience, offer, channels, tone, approvalMode, constraints, createdAt, updatedAt.
Relationships: has many Campaigns, ContentDrafts, PublishingTasks and Reports.

### Campaign
Represents a structured promotion effort for a BrandProfile.
Fields: id, brandProfileId, name, objective, audience, offer, startDate, endDate, channels, cadence, status, owner, createdAt, updatedAt.
Relationships: belongs to BrandProfile, has many ContentDrafts, CalendarItems, Approvals, PublishingTasks and Metrics.

### CalendarItem
Represents a planned content slot.
Fields: id, campaignId, channel, plannedDate, contentType, topic, status, draftId, approvalId, publishingTaskId.
Relationships: belongs to Campaign, may link to ContentDraft, Approval and PublishingTask.

### ContentDraft
Represents a piece of content before publication.
Fields: id, brandProfileId, campaignId, title, channel, format, language, body, callToAction, assetBrief, status, createdBy, reviewedBy, createdAt, updatedAt.
Relationships: belongs to BrandProfile and Campaign, has one or more Approvals, may create a PublishingTask.

### Approval
Represents human or manager authorization.
Fields: id, draftId, requestedBy, reviewedBy, status, notes, requestedAt, reviewedAt.
Relationships: belongs to ContentDraft.

### PublishingTask
Represents the operational task to publish or prepare publication.
Fields: id, brandProfileId, campaignId, draftId, channel, mode, scheduledAt, publishedAt, status, resultUrl, error, auditLog.
Relationships: belongs to BrandProfile, Campaign and ContentDraft.

### PublishingLog
Represents the immutable record of what happened.
Fields: id, publishingTaskId, eventType, message, metadata, createdAt.
Relationships: belongs to PublishingTask.

### MetricSnapshot
Represents observed results after publication.
Fields: id, brandProfileId, campaignId, publishingTaskId, channel, collectedAt, impressions, clicks, leads, comments, shares, saves, notes.
Relationships: belongs to BrandProfile, Campaign and PublishingTask.

### Report
Represents a campaign or weekly summary.
Fields: id, brandProfileId, campaignId, periodStart, periodEnd, summary, wins, issues, nextActions, createdAt.
Relationships: belongs to BrandProfile and optionally Campaign.

### WatcherHandoff
Represents work prepared for or by watcher.
Fields: id, stage, taskType, sourceEntityType, sourceEntityId, commandId, status, inputSummary, outputSummary, createdAt, completedAt.
Relationships: can reference BrandProfile, Campaign, ContentDraft, PublishingTask or Report.

## Workflow states

### BrandProfile status
seed, active, paused, archived.

### Campaign status
draft, planned, active, paused, completed, archived.

### ContentDraft status
idea, drafted, in_review, changes_requested, approved, scheduled, published, rejected, archived.

### Approval status
requested, approved, rejected, changes_requested, cancelled.

### PublishingTask status
queued, ready, blocked, scheduled, published, failed, cancelled.

### Report status
draft, generated, reviewed, archived.

## Safety gates
1. No PublishingTask can move to ready without an approved ContentDraft.
2. No automated publishing is allowed without explicit channel policy.
3. Every publish attempt must create a PublishingLog entry.
4. Mass DMs, fake engagement, scraping abuse and impersonation are not valid task modes.
5. Watcher may generate and prepare, but publication starts approval-gated.

## Stage 2 next docs
- WORKFLOW_STATES.md
- SAFETY_GATES.md
- CAMPAIGN_MODEL.md
- CONTENT_MODEL.md
