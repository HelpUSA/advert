# Advert Master Plan

## Mission
Build an owned advertising operations platform that lets watcher workflows plan, create, approve, publish and report promotion for companies, people, services, products and social profiles.

## Operating rule
Work by large stages. Each stage must have clear objectives, activities, deliverables, validation and commit before moving to the next stage.

## Stage 1 - Product foundation
Objective: define the product, repository, frontend shell, routing, safety boundaries and first documentation set.
Activities: initialize repository, create Next.js frontend, create product routes, create dashboard navigation, create brand registry seed view, document architecture and MVP.
Deliverables: web shell, routes, docs, first commits, successful build.
Done when: git status is clean and npm build passes.
Status: in progress, mostly complete.

## Stage 2 - Core planning model
Objective: define entities and workflows for brand profiles, campaigns, calendars, drafts, approvals, publishing tasks and reports.
Activities: create docs for data model, screens, workflow states, safety gates and watcher handoff.
Deliverables: data model docs, workflow docs, updated static screens with realistic seed content.
Done when: each core module has documented fields and a usable static screen.

## Stage 3 - Frontend MVP
Objective: make the web interface useful before backend integration.
Activities: improve all module pages, add shared layout/navigation, add seed datasets, add mock dashboards and approval states.
Deliverables: navigable frontend MVP with realistic workflow.
Done when: a user can understand the whole advertising process from the UI.

## Stage 4 - Railway API
Objective: create backend service for future persistence and watcher integration.
Activities: create services/api, health endpoint, core DTOs, validation, Railway config and docs.
Deliverables: API skeleton, local validation, deployment notes.
Done when: API starts locally and has documented deployment path.

## Stage 5 - Database and persistence
Objective: store brands, campaigns, drafts, approvals, publication logs and metrics.
Activities: choose database model, create schema, migrations and seed data.
Deliverables: database schema, seed scripts, API integration.
Done when: frontend can read/write core data through API.

## Stage 6 - Watcher automation
Objective: let watcher execute safe advertising operations.
Activities: create task templates, command handoffs, draft generation scripts, reporting scripts and approval gates.
Deliverables: watcher playbooks and scripts under scripts/.
Done when: watcher can generate a campaign package from a brand profile with logs.

## Stage 7 - Controlled publishing
Objective: support publishing without spam or unsafe automation.
Activities: start with manual checklist, then official connectors only where allowed, audit logs and approvals.
Deliverables: publishing queue, checklist, logs and safe connector roadmap.
Done when: every publication has approval, channel, content, timestamp and result.

## Stage 8 - Deployment
Objective: deploy frontend to Vercel and backend to Railway.
Activities: configure Git remote, Vercel project, Railway service, environment variables and custom domain advert.helpusbr.com.
Deliverables: production URL, deployment docs, rollback notes.
Done when: production site is online and build pipeline is reproducible.

## Stage 9 - Reporting and iteration
Objective: measure results and improve campaigns.
Activities: create weekly reports, campaign performance summaries and next-action recommendations.
Deliverables: reports module, report templates, watcher summary workflow.
Done when: weekly report can be generated for each campaign.

## Safety boundaries
No spam, fake engagement, fake comments, fake followers, mass DMs, account manipulation, abusive scraping, impersonation or credential sharing.

## Current next action
Finish Stage 1 completely, then move to Stage 2 core planning model.
