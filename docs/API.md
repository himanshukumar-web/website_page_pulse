# Page Pulse — API Documentation

## Base URL

```
Production : https://page-pulse-api.onrender.com
Development: http://localhost:5000
```

---

## Response Format

All API responses follow a consistent envelope format.

### Success Response

```json
{
  "success": true,
  "timestamp": "2026-07-25T12:00:00.000Z",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Human-readable error message",
  "status": 400
}
```

---

## Endpoints

### `POST /api/analyze`

Analyze a website URL and return an SEO report.

#### Request

| Header         | Value              |
|----------------|--------------------|
| Content-Type   | application/json   |

| Body Field | Type   | Required | Description         |
|------------|--------|----------|---------------------|
| `url`      | string | Yes      | Full URL to analyze |

#### Example Request

```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://openai.com"}'
```

#### Success Response (200)

```json
{
  "success": true,
  "timestamp": "2026-07-25T12:00:00.000Z",
  "data": {
    "url": "https://openai.com/",
    "status": 200,
    "responseTime": 245,
    "contentType": "text/html; charset=utf-8",
    "title": "OpenAI",
    "metaDescription": "Introducing the next generation of AI...",
    "h1Count": 2,
    "totalImages": 10,
    "missingAlt": 3,
    "wordCount": 1780
  }
}
```

#### Response Fields (inside `data`)

| Field             | Type   | Description                              |
|-------------------|--------|------------------------------------------|
| `url`             | string | Final URL after redirects                |
| `status`          | number | HTTP status code from target website     |
| `responseTime`    | number | Time to fetch the page (ms)              |
| `contentType`     | string | Content-Type header from target          |
| `title`           | string | Content of the `<title>` tag             |
| `metaDescription` | string | Content of `<meta name="description">`   |
| `h1Count`         | number | Number of `<h1>` elements                |
| `totalImages`     | number | Total `<img>` elements                   |
| `missingAlt`      | number | `<img>` elements without an `alt` attr   |
| `wordCount`       | number | Approximate word count of visible text   |

#### Error Responses

| Status | Message                                          | Trigger                        |
|--------|--------------------------------------------------|--------------------------------|
| 400    | URL is required in the request body              | Missing or empty `url` field   |
| 400    | Invalid URL format                               | Malformed or non-HTTP URL      |
| 408    | The website took too long to respond             | Target didn't respond in time  |
| 415    | The URL did not return an HTML page              | Non-HTML content type          |
| 502    | Could not resolve the website address            | DNS lookup failure             |
| 502    | The website refused the connection               | Target is down                 |
| 502    | The website has too many redirects               | Redirect loop detected         |
| 500    | An unexpected error occurred                     | Unhandled server error         |

---

### `GET /api/health`

Returns the health status of the API server.

#### Response (200)

```json
{
  "success": true,
  "timestamp": "2026-07-25T12:00:00.000Z",
  "data": {
    "status": "healthy",
    "uptime": "120s",
    "environment": "development"
  }
}
```

---

### 404 — Unknown Routes

Any request to an undefined route returns:

```json
{
  "success": false,
  "message": "Route GET /api/unknown not found",
  "status": 404
}
```

---

## Rate Limiting

No rate limiting is currently implemented. For production, consider adding `express-rate-limit`.

## Authentication

This API is currently open. No authentication is required.
