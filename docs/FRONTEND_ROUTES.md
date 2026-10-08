# Frontend Routes — HelpUS Advert

The Next.js 16 (App Router) production application contains 11 active routes:

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

### 3. System Routes
- **`/_not-found`**: Standard Next.js 404 handler.
