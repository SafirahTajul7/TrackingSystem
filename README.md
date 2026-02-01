# Smart Base — Military Intelligence Dashboard

A real-time Vue 3 + TypeScript admin dashboard for military base security, access control, and live monitoring. Built with Bootstrap 5, Leaflet, and Chart.js.

---

## Features

### 🏠 Dashboard
Central overview page that surfaces the most critical information at a glance — a live Leaflet map showing zone markers, a live alerts feed with colour-coded severity, a Chart.js line graph tracking contractor & visitor activity over time, a per-zone risk-level gauge, and a personnel status summary.

### 🔒 Security & Alerts
Tabbed section covering three sub-pages:

- **Live Alerts** — Real-time alert cards sorted by severity (Critical / High / Resolved). Each card surfaces the person, zone, camera ID, and timestamp, with quick actions to view CCTV footage or mark the alert resolved.
- **Behavioral** — Tracks anomalous behaviour such as loitering or tailgating detected by the surveillance system.
- **Incidents** — Full incident report cards showing severity, status, reporter, zone, description, and actions already taken. Supports export and CCTV review.

### 📡 Live Monitoring
Tabbed section for real-time surveillance operations:

- **GPS Tracking** — Live location tracking of personnel and contractors across the base.
- **CCTV Feeds** — Grid view of active camera feeds with quick-access fullscreen mode.
- **Zone Activity** — Per-zone stat cards displaying current personnel count, active alerts, occupancy percentage (with a colour-coded progress bar), and average duration.

### 🚪 Access Control
Tabbed section managing all entry and exit operations:

- **Access Logs** — Chronological log of every access event across the base.
- **Entry/Exit Records** — Table of individuals currently in compound or already checked out, with stat cards for totals and average duration. Supports export and manual entry.
- **QR Management** — Handles temporary QR-code-based access for delivery riders (Foodpanda, Grab, Shopee, Lalamove, etc.) and visitors. Codes auto-expire after a configurable window (30–60 min). Displays active / expired / completed status with countdown timers.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript |
| UI Components | Bootstrap 5 + Bootstrap Icons |
| Map | Leaflet.js |
| Charts | Chart.js (via `chart.js/auto`) |
| Layout | Custom `AdminLayout` wrapper component |

---

## Project Structure

```
src/
├── layouts/
│   └── AdminLayout.vue          # Shared admin shell (sidebar, header)
├── views/
│   ├── DashboardView.vue        # Main dashboard page
│   ├── security/
│   │   ├── SecurityTabs.vue     # Tab router — Security & Alerts
│   │   ├── LiveAlertsView.vue   # Live alerts list
│   │   ├── BehavioralView.vue   # Behavioral anomaly tracking
│   │   └── IncidentsView.vue    # Incident reports
│   ├── monitoring/
│   │   ├── MonitoringTabs.vue   # Tab router — Live Monitoring
│   │   ├── GpsTrackingPage.vue  # GPS personnel tracker
│   │   ├── CctvFeedsPage.vue    # CCTV feed grid
│   │   └── ZoneActivityPage.vue # Per-zone activity stats
│   └── access/
│       ├── AccessTabs.vue       # Tab router — Access Control
│       ├── AccessLogsView.vue   # Access event logs
│       ├── AccessRecordsView.vue# Entry/exit records table
│       └── QRManagementView.vue # Temporary QR code manager
```


## Tab Navigation Pattern

All major sections (`Security`, `Monitoring`, `Access`) use the same dynamic-component tab pattern:

1. A tabs config array defines the available tabs (name, label, icon).
2. A `ref` tracks the currently active tab.
3. A `computed` property maps the active tab name to the corresponding child component.
4. `<component :is="currentTabComponent" />` renders the active view without a full route change.

This keeps each section self-contained while avoiding unnecessary route complexity for sub-pages that share a common layout.
