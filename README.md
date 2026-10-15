# SIGNAL — Production-Grade Embeddable Feedback Web Component

Signal is a framework-independent, customizable Custom Element (`<signal-feedback>`) paired with a secure PostgreSQL backend. It allows any website or web application to embed a feedback interface with zero host dependencies, strict Shadow DOM isolation, WCAG 2.2 AA accessibility, and curated photographic backgrounds contained strictly inside the widget panel.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Installation & Embedding](#component-installation--embedding)
3. [Configuration Reference](#configuration-reference)
   - [HTML Attributes](#html-attributes)
   - [JavaScript API & Methods](#javascript-api--methods)
   - [Custom Events](#custom-events)
   - [CSS Custom Properties](#css-custom-properties)
4. [Photographic Backgrounds & Layered Readability](#photographic-backgrounds--layered-readability)
5. [Public Keys vs. Private Secrets](#public-keys-vs-private-secrets)
6. [Backend API Specification](#backend-api-specification)
   - [Public Endpoints](#public-endpoints)
   - [Administrative Endpoints](#administrative-endpoints)
   - [Health Check](#health-check)
7. [Database Architecture & Migrations](#database-architecture--migrations)
8. [Abuse Prevention, Rate Limiting & Security](#abuse-prevention-rate-limiting--security)
9. [Local Development & Testing](#local-development--testing)
10. [Production Build & Deployment](#production-build--deployment)
11. [Asset Licensing & Attribution](#asset-licensing--attribution)

---

## 1. Architecture Overview

Signal is engineered as two strictly decoupled components:

1. **Frontend Web Component (`<signal-feedback>`)**:
   - Zero runtime dependencies (`~12 kB` gzipped).
   - Built on native browser standards: **Custom Elements v1** and **Shadow DOM v1**.
   - No React, Vue, Next.js, or Tailwind required by the host application.
   - Self-contained styles that cannot bleed out into or be distorted by host CSS.
   - Layered readability architecture ensuring WCAG 2.2 AA compliant contrast over any photographic background.

2. **Backend API Service**:
   - Built with TypeScript and Node.js (Express engine).
   - Production persistence with PostgreSQL connection pooling (`pg.Pool`) and SQL schema migrations.
   - Built-in embedded PostgreSQL engine (`@electric-sql/pglite`) for instant local testing and zero-config development.
   - Hardened with Helmet, per-project dynamic CORS origin validation, body size caps, sliding-window rate limiting, and request ID correlation.
   - Distinct role separation: public submissions vs. authenticated administrative triage.

```
┌────────────────────────────────────────────────────────┐
│ Host Webpage (React, Vue, HTML, WordPress, etc.)       │
│                                                        │
│   <signal-feedback>                                    │
│   ┌──────────────────────────────────────────────────┐ │
│   │ Shadow DOM (Strict Style Isolation)             │ │
│   │  [Layer 1: Photographic Background]              │ │
│   │  [Layer 2: Adaptive Scrim Overlay]               │ │
│   │  [Layer 3: Form Card & Readable Controls]        │ │
│   └───────────────────┬──────────────────────────────┘ │
└───────────────────────┼────────────────────────────────┘
                        │ POST /v1/feedback
                        │ (Public Project Key, Client IP Hash, Payload)
                        ▼
┌────────────────────────────────────────────────────────┐
│ Signal Backend API                                     │
│  ├── Helmet, Request ID, Timeout & 10kb Body Limit     │
│  ├── Project Allowed Origins & CORS Validation         │
│  ├── Privacy-Preserving Rate Limiter (SHA-256 IP Hash) │
│  ├── Zod Schema Validation & Idempotency Check         │
│  └── PostgreSQL Relational Persistence                 │
└────────────────────────────────────────────────────────┘
```

---

## 2. Component Installation & Embedding

### Direct HTML Script Tag (CDN / Static Hosting)

Add the standalone bundle to your HTML page:

```html
<!-- Load Signal Feedback Web Component (ES Module) -->
<script type="module" src="/dist/signal-feedback.js"></script>

<!-- Embed the Widget -->
<signal-feedback
  api-base-url="https://api.yourdomain.com"
  project-key="prj_live_signal_demo_default"
  position="bottom-right"
  theme="dark"
  background="lavender-clouds"
></signal-feedback>
```

### Modern Bundlers (Vite, Webpack, Next.js, Remix, Astro)

Install the package:

```bash
npm install signal-feedback
```

Import in your application entry point:

```typescript
import 'signal-feedback';
// Or import the class directly:
// import { SignalFeedback } from 'signal-feedback';
```

And place the custom tag in your template:

```html
<signal-feedback
  api-base-url="https://api.yourdomain.com"
  project-key="prj_live_signal_demo_default"
  background="cinematic-ocean"
  theme="auto"
></signal-feedback>
```

---

## 3. Configuration Reference

### HTML Attributes

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `api-base-url` | `string` | `""` | **Required.** Base URL of your Signal API backend. |
| `project-key` | `string` | `""` | **Required.** Public project identifier. |
| `background` | `string` | `"lavender-clouds"` | Preset ID (see below) or approved custom image URL. |
| `background-position`| `string` | `"center center"` | CSS `background-position` value. |
| `overlay-intensity` | `number` | `65` | Scrim darkness percentage (20 to 95). |
| `theme` | `auto\|light\|dark` | `"auto"` | Content theme treatment. |
| `contrast-mode` | `normal\|high` | `"normal"` | High-contrast WCAG AAA compliance mode. |
| `position` | `bottom-right\|bottom-left\|top-right\|top-left` | `"bottom-right"` | Fixed floating position. |
| `mode` | `floating\|embedded`| `"floating"` | Floating launcher trigger or always-open embedded panel. |
| `launcher-label` | `string` | `"Feedback"` | Text label on launcher button. |
| `panel-title` | `string` | `"Send Feedback"` | Headline in feedback dialog. |
| `panel-description` | `string` | `"..."` | Explanatory description under headline. |
| `enable-rating` | `boolean` | `"true"` | Displays 1–5 satisfaction rating stars. |
| `enable-email` | `boolean` | `"true"` | Displays optional follow-up email input. |
| `enable-context` | `boolean` | `"true"` | Discloses and submits diagnostic client context (URL, OS, browser). |
| `max-length` | `number` | `2000` | Maximum character limit for feedback message. |
| `open` | `boolean` | `false` | Presence indicates panel is open. |

### JavaScript API & Methods

```typescript
const widget = document.querySelector('signal-feedback');

// Programmatic control
widget.show();       // Opens the feedback panel
widget.hide();       // Closes the feedback panel
widget.toggle();     // Toggles open/closed state
widget.reset();      // Resets input fields and submission state

// Properties
widget.open = true;
widget.background = 'emerald-forest';
widget.theme = 'dark';
widget.maxLength = 1000;
```

### Custom Events

| Event Name | Detail Payload | Description |
| :--- | :--- | :--- |
| `signal:open` | `void` | Dispatched when the feedback panel opens. |
| `signal:close` | `void` | Dispatched when the feedback panel closes. |
| `signal:state-change` | `{ state: SubmissionStatus, error?: string }` | Dispatched on any lifecycle or validation state transition. |
| `signal:submit-success` | `{ id: string, category: string, rating?: number }` | Dispatched when submission is confirmed persisted by server. |
| `signal:submit-error` | `{ code: string, message: string, details?: unknown }` | Dispatched upon network or server submission failure. |

### CSS Custom Properties

Override visual characteristics via standard CSS custom properties on `<signal-feedback>`:

```css
signal-feedback {
  --signal-accent: #6366f1;          /* Brand primary color */
  --signal-accent-hover: #4f46e5;    /* Button hover state */
  --signal-radius: 20px;             /* Panel corner radius */
  --signal-control-radius: 8px;      /* Input & button radius */
  --signal-z-index: 99999;           /* Viewport stacking order */
}
```

---

## 4. Photographic Backgrounds & Layered Readability

### The Background Belongs INSIDE the Widget

The photograph is strictly bounded inside the widget's Shadow DOM clipping boundary (`.signal-panel-bg-layer`). It **never** leaks into the host page, body, or surrounding layout.

### Layered Readability System

To guarantee text readability over diverse photographic imagery:

1. **Layer 1: Background Photograph** (`background-size: cover; background-position: center`).
2. **Layer 2: Adaptive Scrim Overlay** with `backdrop-filter: blur(8px)` and calibrated opacity (`rgba(15, 23, 42, 0.65)`).
3. **Layer 3: Card Surface with Scrim** (`rgba(15, 23, 42, 0.88)` in dark mode, `rgba(255, 255, 255, 0.92)` in light mode).
4. **Solid Inputs and High-Contrast Typography** meeting WCAG 2.2 AA contrast ratios (minimum 4.5:1 for normal text).
5. **Fallback Gradients**: If an image fails to load or the network is offline, a calibrated multi-stop CSS gradient is immediately active.

### Curated Photographic Presets

| Preset ID | Name | Category | License |
| :--- | :--- | :--- | :--- |
| `lavender-clouds` | Dreamy Blue & Lavender Clouds | Sky & Atmosphere | Unsplash License |
| `cinematic-ocean` | Dark Cinematic Ocean | Water & Nature | Unsplash License |
| `desert-dunes` | Warm Desert Dunes | Landscape | Unsplash License |
| `emerald-forest` | Misty Emerald Forest | Fog & Forest | Unsplash License |
| `mountain-landscape` | Cinematic Mountain Landscape | Alpine Nature | Unsplash License |
| `sunset-sky` | Soft Sunset Sky | Sky & Atmosphere | Unsplash License |
| `architectural-shadows` | Minimal Architectural Shadows | Architecture | Unsplash License |
| `natural-texture` | Subtle Abstract Mineral Texture | Fluid Geologic | Unsplash License |

Full licensing details and photographer links are documented in [ATTRIBUTION.md](file:///c:/Users/namel/OneDrive/Documents/meeu/ATTRIBUTION.md).

---

## 5. Public Keys vs. Private Secrets

Signal maintains strict architectural security regarding credentials:

- **Public Project Key (`project-key`)**:
  - Example: `prj_live_signal_demo_default`
  - Safe for public embedding in frontend HTML.
  - Grants **zero** read or administrative permissions.
  - Can only submit records to the designated project.
  - Validated against the database for active status and allowed origins.

- **Admin Secret Key (`ADMIN_SECRET_KEY`)**:
  - Stored strictly in backend environment variables.
  - Never embedded or exposed in client bundles.
  - Required via `Authorization: Bearer <ADMIN_SECRET_KEY>` for reading feedback, filtering submissions, and updating triage states.

---

## 6. Backend API Specification

### Public Endpoints

#### `POST /v1/feedback`

Submit feedback from public client.

- **Headers**:
  - `Content-Type: application/json`
  - `X-Project-Key: <project_key>` (or in body)
  - `X-Idempotency-Key: <uuid>` (optional duplicate protection)
- **Request Body**:
  ```json
  {
    "project_key": "prj_live_signal_demo_default",
    "category": "bug",
    "message": "Payment form button unresponsive on mobile Safari.",
    "rating": 2,
    "email": "user@example.com",
    "context": {
      "url": "https://example.com/checkout",
      "viewport": { "width": 390, "height": 844 },
      "userAgent": "Mozilla/5.0..."
    }
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "data": {
      "id": "47568d49-0f21-43c8-8660-0640449dc6ed",
      "status": "received"
    },
    "requestId": "6889c006-b060-4c53-b021-5a38d49ff83e",
    "timestamp": "2026-10-15T16:04:59.537Z"
  }
  ```

---

### Administrative Endpoints (Authorized)

All admin endpoints require `Authorization: Bearer <ADMIN_SECRET_KEY>`:

#### `GET /v1/feedback/:id`
Retrieve an individual feedback record. Public clients cannot access this endpoint.

#### `GET /v1/admin/feedback`
List and filter feedback records:
- Query parameters: `project_key`, `category`, `status`, `rating`, `limit`, `offset`.

#### `PATCH /v1/admin/feedback/:id/triage`
Update feedback triage status:
```json
{
  "triage_status": "in_review",
  "triage_notes": "Assigned to Mobile UX squad."
}
```

---

### Health Check

#### `GET /v1/health` (or `GET /health`)
```json
{
  "success": true,
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-10-15T16:04:52.767Z",
  "uptime": 240.5,
  "database": {
    "status": "connected",
    "dialect": "postgresql",
    "driver": "pg"
  },
  "requestId": "fbf677ec-bc94-40aa-bec0-39a0b8157e4c"
}
```

---

## 7. Database Architecture & Migrations

Signal uses PostgreSQL with standard SQL schema migrations located in `src/server/db/migrations/`:

- `001_initial_schema.sql`:
  - `projects` table (project key, allowed origins, active flag).
  - `feedback` table (server-generated UUIDs, category, message, rating, email, context JSONB, triage status, hashed client IP, user agent, idempotency key, timestamps).
  - Multi-column indexes on `(project_id, created_at DESC)`, `(project_id, category)`, `(project_id, triage_status)`.

### Persistence Drivers

1. **PostgreSQL (`pg.Pool`)**: Active when `DATABASE_URL` is set in `.env`. Supports managed services (AWS RDS, Supabase, Neon, Railway).
2. **Embedded PostgreSQL (`@electric-sql/pglite`)**: When `DATABASE_URL` is omitted, the backend runs an in-process PostgreSQL WebAssembly engine with the exact same SQL dialect and migration runner. Zero setup required for local development and test runners.

---

## 8. Abuse Prevention, Rate Limiting & Security

- **Privacy-Preserving IP Hashing**: Client IPs are hashed using salted SHA-256 before rate limiting or persistence. Raw IP addresses are never logged or stored.
- **Sliding-Window Rate Limiting**:
  - Default: 5 submissions per 60 seconds per client IP hash.
  - Default: 60 submissions per 60 seconds per project.
  - Returns `429 Too Many Requests` with standard `Retry-After` header.
- **Strict Payload Limits**: Request bodies are capped at 10 KB to prevent memory exhaustion.
- **Strict Text Rendering**: All user submissions are stored and rendered strictly as plaintext, preventing stored cross-site scripting (XSS).
- **SQL Injection Prevention**: 100% of queries use parameterized SQL arguments (`$1, $2, ...`).
- **Dynamic CORS Allowlist**: Origins are validated against project allowlists; wildcards with credentials are strictly prohibited.

---

## 9. Local Development & Testing

### Installation

```bash
npm install
```

### Run Automated Tests

Signal includes 38 automated integration and unit tests covering validation, edge cases, accessibility, database persistence, and rate limiting:

```bash
npm test
```

### Start Backend Server

```bash
npm run start:server
```

### Start Frontend Demo & Playground

```bash
npm run dev
```

Visit `http://localhost:5173` to test the component on the minimal verification canvas.

---

## 10. Production Build & Deployment

Build standalone Web Component distribution assets:

```bash
npm run build
```

Output in `/dist`:
- `dist/signal-feedback.js`: ES module bundle (`~12 kB` gzipped).
- `dist/signal-feedback.umd.js`: UMD bundle for legacy script tags.
- `dist/signal-feedback.iife.js`: Standalone self-executing bundle.

### Production Environment Variables

Configure `.env`:
```env
PORT=3001
DATABASE_URL=postgresql://user:pass@your-postgres-host:5432/signal_db
DB_SSL=true
DB_POOL_MAX=20
ADMIN_SECRET_KEY=generate_a_long_random_secret_for_production
ALLOWED_ORIGINS=https://yourcompany.com
RATE_LIMIT_SALT=generate_a_unique_salt
```

---

## 11. Asset Licensing & Attribution

All 8 photographic backgrounds are authentic photos licensed under the **Unsplash License** (free for commercial and non-commercial use). See [ATTRIBUTION.md](file:///c:/Users/namel/OneDrive/Documents/meeu/ATTRIBUTION.md) for individual photographer credits, photo URLs, and license terms.
