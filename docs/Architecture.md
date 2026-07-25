# Page Pulse — Architecture

## System Overview

Page Pulse is a full-stack SEO analysis tool built with a **client-server architecture**. The React frontend and Express backend communicate over a REST API.

```
┌─────────────────────────────────────────────┐
│                   Client                     │
│  React + Vite + Tailwind CSS                │
│  ┌─────────┐  ┌──────┐  ┌────────────┐     │
│  │  Pages   │→│ Hooks │→│  Services   │─────┤──→ HTTP POST /api/analyze
│  └─────────┘  └──────┘  └────────────┘     │
│       ↑                                      │
│  ┌─────────────────────────┐                │
│  │     Components          │                │
│  │  cards / common / layout│                │
│  └─────────────────────────┘                │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│                   Server                     │
│  Node.js + Express                          │
│                                              │
│  Request → Route → Validator → Controller   │
│                                    │         │
│                              ┌─────┴─────┐  │
│                              │  Services  │  │
│                              │            │  │
│                              │ fetchHtml  │  │
│                              │     ↓      │  │
│                              │ parseHtml  │  │
│                              │     ↓      │  │
│                              │ genReport  │  │
│                              └─────┬─────┘  │
│                                    │         │
│                              Response        │
│                          (via formatter)     │
└─────────────────────────────────────────────┘
```

---

## Backend Architecture

### MVC + Service Layer

The backend follows a modified MVC pattern with a dedicated service layer:

| Layer        | Directory      | Responsibility                                    |
|--------------|----------------|---------------------------------------------------|
| Config       | `config/`      | Environment variables, Axios instance              |
| Routes       | `routes/`      | URL → controller mapping (zero logic)              |
| Validators   | `validators/`  | Request body validation middleware                 |
| Controllers  | `controllers/` | Orchestrate req/res cycle, delegate to services    |
| Services     | `services/`    | Pure business logic, framework-agnostic            |
| Middlewares  | `middlewares/` | Cross-cutting concerns (error handling)            |
| Utils        | `utils/`       | Shared helpers (response formatter, constants)     |

### Analysis Pipeline

The core analysis flows through three services in sequence:

```
fetchHtml(url)
    │
    ├── Validates URL format
    ├── Makes HTTP GET with browser headers
    ├── Measures response time
    ├── Checks content-type is HTML
    └── Returns { statusCode, responseTime, html, finalUrl, contentType }
          │
          ▼
parseHtml(html)
    │
    ├── Loads HTML with Cheerio
    ├── Extracts title, meta description (with OG fallback)
    ├── Counts H1 tags, images, missing alt attributes
    ├── Calculates word count (excluding scripts/styles)
    └── Returns { title, metaDescription, h1Count, totalImages, missingAlt, wordCount }
          │
          ▼
generateReport(fetchResult, parseResult)
    │
    └── Merges both results into the client-facing report shape
```

### Error Handling Strategy

```
Service throws Error with statusCode
         │
         ▼
Controller catches → next(err)
         │
         ▼
errorHandler middleware
         │
         ├── Known error (has statusCode) → Return error envelope with original message
         └── Unknown error (no statusCode) → Return generic 500 message in production
```

### Response Envelope

All responses use a consistent format enforced by `utils/responseFormatter.js`:

**Success:** `{ success: true, timestamp, data }`

**Error:** `{ success: false, message, status }`

---

## Frontend Architecture

### Component Hierarchy

```
App
 └── ThemeProvider (Context)
      └── MainLayout
           ├── Navbar
           ├── HomePage
           │    ├── HeroSection
           │    │    ├── SearchBar
           │    │    └── RecentSearches
           │    ├── Spinner (conditional)
           │    ├── ErrorAlert (conditional)
           │    ├── ScoreBar (conditional)
           │    ├── DashboardCards (conditional)
           │    └── ActionButtons (conditional)
           └── Footer
```

### Component Categories

| Category   | Directory             | Examples                            | Scope               |
|------------|-----------------------|-------------------------------------|----------------------|
| Common     | `components/common/`  | Spinner, ErrorAlert, buttons        | Generic, reusable    |
| Cards      | `components/cards/`   | DashboardCard, ScoreBar             | Domain-specific      |
| Layout     | `components/layout/`  | Navbar, Hero, SearchBar, Footer     | Structural           |

### State Management

| State           | Mechanism      | Location                 |
|-----------------|----------------|--------------------------|
| Theme           | React Context  | `contexts/ThemeContext`   |
| Analysis data   | Custom hook    | `hooks/useAnalyze`       |
| Recent searches | Custom hook    | `hooks/useRecentSearches` |

### Data Flow

```
User enters URL
  → SearchBar calls onSubmit(url)
  → HomePage calls analyze(url) from useAnalyze hook
  → useAnalyze calls analyzeService.analyzeUrl(url)
  → analyzeService sends POST via Axios
  → Backend returns JSON envelope
  → useAnalyze sets data/error state
  → HomePage conditionally renders results
  → calculateSeoScore derives 0-100 score
  → DashboardCards + ScoreBar render metrics
```

---

## SEO Score Algorithm

| Criterion           | Points | Condition                  |
|---------------------|--------|----------------------------|
| Title exists        | 15     | Non-empty `<title>`        |
| Meta description    | 15     | Has meta description       |
| Single H1           | 20     | Exactly 1 `<h1>` tag      |
| Image alt coverage  | 20     | All images have alt text   |
| Word count ≥ 300    | 15     | Sufficient content         |
| Response time < 1s  | 15     | Fast page load             |
| **Total**           | **100**|                            |

---

## Deployment Architecture

```
GitHub Repository
     │
     ├── /frontend → Vercel (auto-deploy on push)
     │     └── VITE_API_URL → Render backend URL
     │
     └── /backend  → Render (auto-deploy on push)
           └── PORT, NODE_ENV, CORS_ORIGIN
```

---

## Testing Strategy

| Type        | Tool      | Coverage                                          |
|-------------|-----------|---------------------------------------------------|
| Integration | Supertest | Route-level tests (POST /api/analyze, GET /health) |
| Unit        | Jest      | parseHtml, generateReport, responseFormatter       |
