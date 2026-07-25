# Page Pulse

<div align="center">

**A modern full-stack SEO analysis tool**

Analyze any website URL and get a comprehensive SEO report — instantly.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Features

- **Instant SEO Analysis** — Enter any URL and get metrics in seconds
- **Comprehensive Metrics** — HTTP status, response time, title, meta description, H1 count, image analysis, word count
- **SEO Score** — Weighted 0–100 score based on best practices
- **Dark Mode** — System-aware theme with manual toggle
- **Recent Searches** — Persistent search history with localStorage
- **Export** — Copy JSON to clipboard or download the full report
- **Responsive** — Beautiful on desktop, tablet, and mobile
- **Production Error Handling** — Graceful handling of invalid URLs, timeouts, DNS failures, and non-HTML responses

---

## Tech Stack

| Layer      | Technology                                        |
|------------|---------------------------------------------------|
| Frontend   | React 18, Vite 6, Tailwind CSS 3, Axios, React Icons |
| Backend    | Node.js, Express 4, Cheerio, Axios, Morgan        |
| Testing    | Jest, Supertest                                   |
| Deployment | Vercel (Frontend), Render (Backend)               |

---

## Quick Start

### Prerequisites

- Node.js >= 18
- npm >= 9

### 1. Clone the repository

```bash
git clone <https://github.com/himanshukumar-web/website_page_pulse.git>
cd page-pulse
```

### 2. Start the backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Start the frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The app will open at `http://localhost:3000`.

### 4. Run tests

```bash
cd backend
npm test
```

---

## Project Structure

```
page-pulse/
├── docs/                        # API and architecture documentation
│   ├── API.md
│   └── Architecture.md
│
├── backend/
│   ├── src/
│   │   ├── config/              # Environment vars + Axios instance
│   │   ├── validators/          # Request validation middleware
│   │   ├── controllers/         # Request/response orchestration
│   │   ├── services/            # Business logic (fetch → parse → report)
│   │   ├── middlewares/         # Global error handler
│   │   ├── utils/               # Response formatter, constants
│   │   ├── routes/              # Route definitions
│   │   ├── app.js               # Express configuration
│   │   └── server.js            # Server entry point
│   └── tests/                   # Jest + Supertest tests
│       ├── routes/
│       ├── services/
│       └── utils/
│
└── frontend/
    └── src/
        ├── components/          # Reusable UI components
        │   ├── cards/           # DashboardCard, ScoreBar
        │   ├── common/          # Spinner, ErrorAlert, buttons
        │   └── layout/          # Navbar, Hero, SearchBar, Footer
        ├── contexts/            # ThemeContext
        ├── hooks/               # useAnalyze, useDarkMode, useRecentSearches
        ├── layouts/             # MainLayout
        ├── pages/               # HomePage
        ├── services/            # API layer (Axios)
        └── utils/               # SEO score calculator, formatters
```

---

## API

### `POST /api/analyze`

| Field | Type   | Required |
|-------|--------|----------|
| `url` | string | Yes      |

**Success (200):**

```json
{
  "success": true,
  "timestamp": "2026-07-25T12:00:00.000Z",
  "data": {
    "url": "https://example.com/",
    "status": 200,
    "responseTime": 245,
    "title": "Example Domain",
    "metaDescription": "...",
    "h1Count": 1,
    "totalImages": 5,
    "missingAlt": 1,
    "wordCount": 450
  }
}
```

**Error (4xx/5xx):**

```json
{
  "success": false,
  "message": "Human-readable error message",
  "status": 400
}
```

### `GET /api/health`

Returns server health status.

---

## Environment Variables

### Backend (`.env`)

| Variable          | Default       | Description                |
|-------------------|---------------|----------------------------|
| `PORT`            | `5000`        | Server port                |
| `NODE_ENV`        | `development` | Environment mode           |
| `CORS_ORIGIN`     | `*`           | Allowed CORS origins       |
| `REQUEST_TIMEOUT` | `10000`       | URL fetch timeout (ms)     |

### Frontend (`.env`)

| Variable       | Default                  | Description     |
|----------------|--------------------------|-----------------|
| `VITE_API_URL` | `http://localhost:5000`  | Backend API URL |

---

## Testing

```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Test Coverage:**
- Route integration tests (Supertest)
- Service unit tests (parseHtml, generateReport)
- Utility unit tests (responseFormatter)

---

## Deployment

### Frontend → Vercel

1. Connect repo to Vercel
2. Set root directory to `frontend`
3. Set `VITE_API_URL` env variable to your Render backend URL

### Backend → Render

1. Connect repo to Render
2. Set root directory to `backend`
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

---

## License

MIT
