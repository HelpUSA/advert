# Safety Gates - Advert

## Purpose
Define the operational safety rules for Advert before the product supports real publishing or watcher-driven automation. These gates protect accounts, brands, users and platform compliance.

## Core principle
Advert is an owned advertising operations platform. It can plan, draft, prepare, review, schedule and report. Real publication must start approval-gated and must only use allowed channels and permitted methods.

## Allowed automation

### Planning automation
Allowed: researching campaign ideas, generating objectives, suggesting audiences, creating content calendars and preparing campaign packages.

### Draft automation
Allowed: creating post drafts, scripts, article outlines, asset briefs, calls to action, variants by channel and translation drafts.

### Review automation
Allowed: checking tone, spelling, policy risks, missing approval data, broken links and incomplete fields.

### Reporting automation
Allowed: compiling manual metrics, summarizing campaign performance, generating weekly reports and recommending next actions.

### Publishing preparation
Allowed: preparing final copy, channel checklist, scheduled time recommendation and manual publication instructions.

## Restricted automation

### Direct publishing
Direct publishing is blocked until a channel has an explicit connector policy, credentials strategy, audit logging and approval flow.

### Engagement automation
The system must not automate fake likes, fake comments, fake shares, fake followers, fake reviews, mass follows or engagement pods.

### Direct messages
The system must not support mass DMs, cold message blasting or unsolicited automated outreach.

### Scraping
The system must not support abusive scraping, credential-based scraping, bypassing access controls or collecting personal data without a lawful and approved purpose.

### Impersonation
The system must not create fake accounts, impersonate people, misrepresent identity or simulate human activity.

## Required gates

### Gate 1 - Brand gate
A campaign requires an active BrandProfile.

### Gate 2 - Campaign gate
A campaign must define objective, audience, offer, channels and cadence before becoming planned.

### Gate 3 - Draft gate
A draft must have content body or asset brief before review.

### Gate 4 - Approval gate
A draft must be approved before a PublishingTask can become ready.

### Gate 5 - Channel policy gate
A PublishingTask must match an approved channel policy before execution.

### Gate 6 - Audit gate
Every publish attempt or preparation action must write a PublishingLog.

### Gate 7 - Human override gate
Any blocked, failed, rejected or policy-risk item must require human review.

## Initial channel policy

### Owned site
Status: allowed for future automation after backend and deployment are ready.

### LinkedIn
Status: manual checklist first. Official connector only later if approved.

### Instagram and Facebook
Status: manual checklist first. Official connector only later if approved.

### Google Business Profile
Status: manual checklist first. Official connector only later if approved.

### Email
Status: not active in MVP. Requires opt-in list and compliance rules before use.

## Watcher rules
Watcher can generate, validate, summarize, prepare files and produce reports. Watcher cannot bypass approval, publish without policy, hide errors, use credentials outside approved storage or run mass engagement actions.

## MVP rule
Until explicit connector policies exist, Advert is a planning, drafting, approval and reporting platform, not an unattended publishing bot.
