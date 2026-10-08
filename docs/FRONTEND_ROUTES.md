# Frontend Routes — HelpUS Advert

- The Next.js 16 (App Router) production application contains 13 active routes:

### 1. Public Commercial Experience
- **`/`**: Public landing page (Commercial Showcase, ROI & Budget Simulator, Formats Showcase, How It Works, Cases, Comparisons, and interactive FAQ).

### 2. Gated SuperAdmin Operations Hub (Protected by `AdminGate`)
- **`/brands`**: Interactive brand directory with real-time search, channels display, and new brand registration modal.
- **`/campaigns`**: Multichannel campaign pipeline with cadence, objectives, search, and new campaign creation modal.
- **`/calendar`**: Interactive monthly grid calendar (October 2026), channel filters, and scheduling modal.
- **`/drafts`**: Interactive AI creative generator, draft management, and visual card preview canvas.
- **`/approvals`**: Executive safety gate with 1-click approvals, rejection handling, and live social API dispatch simulation.
- **`/workflow`**: Interactive Kanban board with stage progression and methodology safety gates toggle.
- **`/reports`**: Executive business indicators with period filters (7d, 30d, 90d, 2026) and 1-click CSV export.
- **`/integrations`**: API credentials management (Meta Graph API, LinkedIn Ads, Google Ads), webhook handshake testing, and cloud server sync.

### 3. Backend API Route Handlers
- **`/api/data`**: Cloud state sync endpoint with JSON disk fallback (`.data/advert_storage.json`).
- **`/api/webhooks/social`**: Social network webhook ingestion with verification handshake (`hub.challenge`).
- **`/api/ai/generate-image`**: Creative canvas generation endpoint in Square, Story, and Banner ratios.

### 4. System Routes
- **`/_not-found`**: Standard Next.js 404 handler.
