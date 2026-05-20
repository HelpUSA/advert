# Workflow States - Advert

## Purpose
Define the allowed lifecycle states for the core Advert entities. These states will drive frontend labels, API validation, database constraints and watcher automation.

## BrandProfile lifecycle
seed -> active -> paused -> archived

### BrandProfile states
- seed: initial profile used for planning or templates.
- active: profile can receive campaigns and drafts.
- paused: profile remains visible but should not receive new publishing tasks.
- archived: profile is historical only.

## Campaign lifecycle
draft -> planned -> active -> paused -> completed -> archived

### Campaign states
- draft: initial campaign idea.
- planned: campaign has objective, audience, offer, channels and cadence.
- active: campaign can generate drafts and publishing tasks.
- paused: campaign is temporarily stopped.
- completed: campaign reached its planned end or objective.
- archived: campaign is historical only.

## ContentDraft lifecycle
idea -> drafted -> in_review -> changes_requested -> approved -> scheduled -> published

Alternative exits: rejected, archived.

### ContentDraft states
- idea: content topic or brief exists, but no final copy.
- drafted: content text or script exists.
- in_review: draft is waiting for approval.
- changes_requested: reviewer requested edits.
- approved: content is allowed to become a PublishingTask.
- scheduled: content has an associated PublishingTask.
- published: content has a completed PublishingTask.
- rejected: content should not be used.
- archived: content is retained for history.

## Approval lifecycle
requested -> approved
requested -> changes_requested
requested -> rejected
requested -> cancelled

### Approval states
- requested: approval was requested.
- approved: reviewer authorized the content.
- changes_requested: reviewer wants edits before approval.
- rejected: reviewer blocked the draft.
- cancelled: request was cancelled before review.

## PublishingTask lifecycle
queued -> ready -> scheduled -> published

Alternative exits: blocked, failed, cancelled.

### PublishingTask states
- queued: task exists but is not ready.
- ready: content is approved and operationally ready.
- scheduled: task has a planned time/channel.
- published: task was executed and logged.
- blocked: missing approval, policy or required data.
- failed: execution failed and needs review.
- cancelled: task was cancelled.

## Report lifecycle
draft -> generated -> reviewed -> archived

### Report states
- draft: report shell exists.
- generated: watcher or app generated a summary.
- reviewed: manager reviewed the report.
- archived: historical report.

## Required transition rules
1. Campaign cannot become active without brandProfileId, objective, audience, offer and at least one channel.
2. ContentDraft cannot become in_review without body or assetBrief.
3. ContentDraft cannot become approved without an Approval approved record.
4. PublishingTask cannot become ready without approved ContentDraft.
5. PublishingTask cannot become published without PublishingLog entry.
6. Report cannot become reviewed without summary and nextActions.

## Watcher handling
Watcher can propose transitions and generate artifacts, but approval-sensitive transitions must remain explicit: approved, ready, scheduled and published.
