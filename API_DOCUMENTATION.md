# SquareServer — API Documentation

Auto-generated from the codebase at `src/app/api/**`. Framework: **Next.js 15 App Router Route Handlers**. Database: **MongoDB via Mongoose**. Base path for all endpoints: `/api`.

Every request/response body below is a **real, literal JSON example** built from the actual field names, types, and defaults in the code (values are realistic sample data, not placeholders like `<string>`). The one endpoint that isn't JSON (`POST /api/upload`) is shown as raw `multipart/form-data`.

> Note on branding: this repo is a rebrand of an earlier project; emails/UI text reference "SquareServer". Contact details (email `squareserver55@gmail.com`, phone `+91 92969 60172`, address `Patliputra Golambar, Patna, Bihar 800010`) are the real, current values, baked into the email templates in [contact/route.ts](src/app/api/contact/route.ts) and the OTP email templates.

---

## Table of Contents

1. [Conventions](#conventions)
2. [Authentication](#authentication)
3. [Auth APIs](#auth-apis) — `/api/auth/*`
4. [Public Content APIs](#public-content-apis) — projects, research, contact, rating, upload
5. [Chatbot APIs](#chatbot-apis) — `/api/chatbot/*`
6. [Admin APIs](#admin-apis) — `/api/admin/*`
7. [Diagnostics](#diagnostics) — `/api/test-email`
8. [Data Models & Enums Reference](#data-models--enums-reference)
9. [Known Issues / Inconsistencies](#known-issues--inconsistencies)

---

## Conventions

- All bodies are `application/json` unless noted (file upload uses `multipart/form-data`).
- `id` / `[id]` path params are MongoDB ObjectId strings (24 hex chars).
- Timestamps (`createdAt`, `updatedAt`) are auto-managed by Mongoose (`timestamps: true`) on every model.
- "Auth" line values:
  - **Public** — no auth required.
  - **Cookie `token`** — HTTP-only JWT cookie, validated via `verifyToken`.
  - **Header `Authorization: Bearer <token>`** — validated via `verifyAuth`.
  - **Cookie `auth_token`** — a *different*, currently unused cookie name (see [Known Issues](#known-issues--inconsistencies)).

---

## Authentication

Two independent auth helpers exist in [src/lib/auth.ts](src/lib/auth.ts), plus one ad-hoc implementation, giving **three different schemes** across the admin API:

| Mechanism | Where token comes from | Used by |
|---|---|---|
| `verifyToken(token)` | Cookie `token` (JWT, secret = `process.env.JWT_SECRET`, 7-day expiry) | `/api/auth/verify`, `/api/admin/management`, `/api/admin/management/[id]` |
| `verifyAuth(req)` | Header `Authorization: Bearer <token>` | `/api/admin/gallery`, `/api/admin/gallery/[id]`, `/api/admin/ratings/recent` |
| ad-hoc `jwt.verify` | Cookie `auth_token` (**never set anywhere in the app**) | `/api/admin/faq`, `/api/admin/chatbot/leads` — effectively broken, see [Known Issues](#known-issues--inconsistencies) |

**JWT payload** (issued at login/register):
```json
{
  "userId": "664f1c2e5b3c2a0012a34567",
  "email": "admin@squareserver.in",
  "name": "Jane Doe",
  "role": "admin"
}
```

**Middleware** ([src/middleware.ts](src/middleware.ts)) protects `/admin/:path*` (except `/admin/login`) and `/api/admin/:path*` by checking the `token` cookie against `/api/auth/verify`, but does not inject auth into downstream handlers — each one re-checks independently per the table above.

---

## Auth APIs

Base path: `/api/auth`

### POST `/api/auth/register`
**Auth**: Public.

**Request body**
```json
{
  "email": "admin@squareserver.in",
  "password": "SecurePass123",
  "name": "Jane Doe"
}
```

**Response 201** — new account created, OTP emailed:
```json
{
  "message": "Account created successfully! Please verify your email to continue. Your account will require admin approval before you can access the admin panel.",
  "requiresVerification": true,
  "email": "admin@squareserver.in"
}
```

**Response 200** — existing-but-unverified account updated, OTP resent:
```json
{
  "message": "Registration updated. Please check your email for the verification code. Your account will require admin approval before you can access the admin panel.",
  "requiresVerification": true,
  "email": "admin@squareserver.in"
}
```

**Response 400**
```json
{ "error": "All fields are required" }
```
```json
{ "error": "Password must be at least 6 characters long" }
```

**Response 409**
```json
{ "error": "User already exists and is verified" }
```

**Response 500**
```json
{ "error": "Account created but failed to send verification email. Please try again." }
```
```json
{ "error": "Internal server error" }
```

---

### POST `/api/auth/verify-otp`
**Auth**: Public.

**Request body**
```json
{
  "email": "admin@squareserver.in",
  "otp": "482913"
}
```

**Response 200**
```json
{
  "message": "Email verified successfully! Your admin account is now active.",
  "user": {
    "id": "664f1c2e5b3c2a0012a34567",
    "email": "admin@squareserver.in",
    "name": "Jane Doe",
    "role": "admin",
    "isVerified": true
  }
}
```

**Response 400**
```json
{ "error": "Email and OTP are required" }
```
```json
{ "error": "User is already verified" }
```
```json
{ "error": "No OTP found. Please request a new OTP." }
```
```json
{ "error": "OTP has expired. Please request a new OTP." }
```
```json
{ "error": "Invalid OTP. Please check and try again." }
```

**Response 404**
```json
{ "error": "User not found" }
```

---

### POST `/api/auth/send-otp`
**Auth**: Public.

**Request body**
```json
{ "email": "admin@squareserver.in" }
```

**Response 200**
```json
{
  "message": "OTP sent successfully to your email address",
  "email": "admin@squareserver.in"
}
```

**Response 400**
```json
{ "error": "Email is required" }
```
```json
{ "error": "User is already verified" }
```

**Response 404**
```json
{ "error": "User not found" }
```

**Response 500**
```json
{ "error": "Failed to send OTP email. Please try again." }
```

---

### POST `/api/auth/login`
**Auth**: Public. Sets `Set-Cookie: token=<jwt>` on success.

**Request body**
```json
{
  "email": "admin@squareserver.in",
  "password": "SecurePass123"
}
```

**Response 200**
```json
{
  "message": "Login successful",
  "user": {
    "id": "664f1c2e5b3c2a0012a34567",
    "email": "admin@squareserver.in",
    "name": "Jane Doe",
    "role": "admin"
  }
}
```

**Response 400**
```json
{ "error": "Email and password are required" }
```

**Response 401**
```json
{ "error": "Invalid credentials" }
```

**Response 403** — unverified email:
```json
{
  "error": "Please verify your email address before logging in",
  "requiresVerification": true,
  "email": "admin@squareserver.in"
}
```

**Response 403** — not yet approved:
```json
{
  "error": "Your account is pending admin approval. Please wait for an administrator to approve your account.",
  "approvalStatus": "pending"
}
```

**Response 403** — rejected:
```json
{
  "error": "Your account has been rejected by an administrator. Please contact support for more information.",
  "approvalStatus": "rejected"
}
```

---

### GET `/api/auth/verify`
**Auth**: Cookie `token`. `dynamic = 'force-dynamic'`.

**Request body**: none.

**Response 200**
```json
{
  "user": {
    "id": "664f1c2e5b3c2a0012a34567",
    "email": "admin@squareserver.in",
    "name": "Jane Doe",
    "role": "admin"
  }
}
```

**Response 401**
```json
{ "error": "No token found" }
```
```json
{ "error": "User not found" }
```
```json
{ "error": "Email not verified" }
```
```json
{ "error": "Account not approved" }
```
```json
{ "error": "Invalid token" }
```

---

### POST `/api/auth/logout`
**Auth**: Public. Clears the `token` cookie.

**Request body**: none.

**Response 200**
```json
{ "message": "Logout successful" }
```

---

### POST `/api/auth/forgot-password`
**Auth**: Public.

**Request body**
```json
{ "email": "admin@squareserver.in" }
```

**Response 200** — generic (also returned when the email doesn't exist, to avoid leaking account existence):
```json
{ "message": "If an account with this email exists, you will receive a password reset code shortly." }
```

**Response 200** — known + verified user (reset OTP actually emailed):
```json
{
  "message": "If an account with this email exists, you will receive a password reset code shortly.",
  "email": "admin@squareserver.in"
}
```

**Response 400**
```json
{ "error": "Email is required" }
```
```json
{ "error": "Please verify your email address first before resetting password." }
```

**Response 500**
```json
{ "error": "Failed to send reset email. Please try again later." }
```

---

### POST `/api/auth/reset-password`
**Auth**: Public.

**Request body**
```json
{
  "email": "admin@squareserver.in",
  "otp": "738104",
  "newPassword": "NewSecurePass456"
}
```

**Response 200**
```json
{ "message": "Password has been reset successfully! You can now log in with your new password." }
```

**Response 400**
```json
{ "error": "Email, OTP, and new password are required" }
```
```json
{ "error": "Password must be at least 6 characters long" }
```
```json
{ "error": "Invalid request. Please try the password reset process again." }
```
```json
{ "error": "No password reset request found. Please request a new password reset." }
```
```json
{ "error": "Reset code has expired. Please request a new password reset." }
```
```json
{ "error": "Invalid reset code. Please check and try again." }
```

---

## Public Content APIs

### GET `/api/projects`
**Auth**: Public (no check in handler).

**Query params**: `?page=1&limit=10&category=it-solutions&subcategory=web-development&status=published&search=ecommerce&featured=true`

| Param | Type | Default | Enum / notes |
|---|---|---|---|
| `page` | number | `1` | |
| `limit` | number | `10` | |
| `category` | string | — | see [Project conventions](#project-categorysubcategory-conventions) |
| `subcategory` | string | — | see [Project conventions](#project-categorysubcategory-conventions) |
| `status` | enum | — | `draft` \| `published` \| `archived` |
| `search` | string | — | case-insensitive match on title/description/technologies |
| `featured` | `"true"` | — | any other value ignored |

**Response 200**
```json
{
  "projects": [
    {
      "_id": "664f1c2e5b3c2a0012a34567",
      "title": "E-commerce Platform Revamp",
      "description": "Full-stack rebuild of a retail client's online store.",
      "category": "it-solutions",
      "subcategory": "web-development",
      "technologies": ["Next.js", "MongoDB", "Stripe"],
      "imageUrl": "/uploads/projects/9f8b1c2a3d4e5f60.jpg",
      "images": [],
      "status": "published",
      "featured": true,
      "clientName": "Acme Retail",
      "duration": "3 months",
      "teamSize": 4,
      "features": ["Cart & checkout", "Admin dashboard"],
      "challenges": ["Legacy data migration"],
      "solutions": ["Built a custom ETL pipeline"],
      "results": ["30% faster checkout completion"],
      "createdAt": "2026-06-01T10:00:00.000Z",
      "updatedAt": "2026-06-05T12:30:00.000Z"
    }
  ],
  "pagination": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```
On any DB error this still returns **200** with an empty list:
```json
{
  "projects": [],
  "pagination": { "total": 0, "page": 1, "limit": 10, "totalPages": 0 }
}
```

---

### POST `/api/projects`
**Auth**: Public — no check in the handler (see [Known Issues](#known-issues--inconsistencies)).

**Request body**
```json
{
  "title": "E-commerce Platform Revamp",
  "description": "Full-stack rebuild of a retail client's online store.",
  "detailedDescription": "Migrated a legacy PHP storefront to Next.js with a headless commerce backend.",
  "category": "it-solutions",
  "subcategory": "web-development",
  "technologies": ["Next.js", "MongoDB", "Stripe"],
  "imageUrl": "/uploads/projects/9f8b1c2a3d4e5f60.jpg",
  "images": ["/uploads/projects/9f8b1c2a3d4e5f60.jpg"],
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/example/repo",
  "status": "published",
  "featured": true,
  "clientName": "Acme Retail",
  "completionDate": "2026-05-30T00:00:00.000Z",
  "duration": "3 months",
  "teamSize": 4,
  "features": ["Cart & checkout", "Admin dashboard"],
  "challenges": ["Legacy data migration"],
  "solutions": ["Built a custom ETL pipeline"],
  "results": ["30% faster checkout completion"],
  "testimonial": {
    "text": "Great team to work with!",
    "author": "John Smith",
    "position": "CTO",
    "company": "Acme Retail"
  }
}
```
Required fields: `title`, `description`, `category`, `subcategory`. Everything else is optional.

**Response 201**
```json
{
  "message": "Project created successfully",
  "project": {
    "_id": "664f1c2e5b3c2a0012a34567",
    "title": "E-commerce Platform Revamp",
    "description": "Full-stack rebuild of a retail client's online store.",
    "category": "it-solutions",
    "subcategory": "web-development",
    "technologies": ["Next.js", "MongoDB", "Stripe"],
    "imageUrl": "/uploads/projects/9f8b1c2a3d4e5f60.jpg",
    "status": "published",
    "featured": true,
    "createdAt": "2026-08-29T09:00:00.000Z",
    "updatedAt": "2026-08-29T09:00:00.000Z"
  }
}
```

**Response 400**
```json
{ "error": "Missing required fields" }
```

**Response 503**
```json
{ "error": "Database not available. Please set up MongoDB to add projects." }
```

---

### GET `/api/projects/{id}`
**Auth**: Public.

**Response 200**
```json
{
  "project": {
    "_id": "664f1c2e5b3c2a0012a34567",
    "title": "E-commerce Platform Revamp",
    "description": "Full-stack rebuild of a retail client's online store.",
    "category": "it-solutions",
    "subcategory": "web-development",
    "status": "published",
    "featured": true,
    "createdAt": "2026-06-01T10:00:00.000Z",
    "updatedAt": "2026-06-05T12:30:00.000Z"
  }
}
```

**Response 400**
```json
{ "error": "Invalid project ID" }
```

**Response 404**
```json
{ "error": "Project not found" }
```

---

### PUT `/api/projects/{id}`
**Auth**: Public — no check in the handler.

**Request body** (partial update — any Project field):
```json
{
  "status": "archived",
  "featured": false
}
```

**Response 200**
```json
{
  "message": "Project updated successfully",
  "project": {
    "_id": "664f1c2e5b3c2a0012a34567",
    "title": "E-commerce Platform Revamp",
    "status": "archived",
    "featured": false,
    "updatedAt": "2026-08-29T09:10:00.000Z"
  }
}
```

**Response 400**
```json
{ "error": "Invalid project ID" }
```
```json
{ "error": "Validation error", "details": ["Title is required"] }
```

**Response 404**
```json
{ "error": "Project not found" }
```

---

### DELETE `/api/projects/{id}`
**Auth**: Public — no check in the handler.

**Response 200**
```json
{ "message": "Project deleted successfully" }
```

**Response 400**
```json
{ "error": "Invalid project ID" }
```

**Response 404**
```json
{ "error": "Project not found" }
```

---

### DELETE `/api/projects/clear`
**Auth**: Public — no check, no confirmation. ⚠️ Deletes **every** project.

**Response 200** (always 200, even on DB failure):
```json
{ "message": "Successfully deleted 12 projects", "deletedCount": 12 }
```
```json
{ "message": "Projects cleared (database not available)", "deletedCount": 0 }
```

---

### GET `/api/research`
**Auth**: Public. Returns unpublished content too — no `published` filter applied here.

**Query params**: `?page=1&limit=10&category=artificial-intelligence&featured=true`

> `featured` is accepted but is **not** a field on the schema — this filter is a no-op (see [Known Issues](#known-issues--inconsistencies)).

**Response 200**
```json
{
  "research": [
    {
      "_id": "664f1c2e5b3c2a0012a99999",
      "title": "The Rise of Edge AI",
      "summary": "A look at how edge inference is changing IoT deployments.",
      "category": "artificial-intelligence",
      "tags": ["AI", "Edge Computing"],
      "published": true,
      "author": "Research Team",
      "publishedDate": "2026-06-10T00:00:00.000Z",
      "createdAt": "2026-06-01T00:00:00.000Z",
      "updatedAt": "2026-06-10T00:00:00.000Z"
    }
  ],
  "pagination": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

---

### POST `/api/research`
**Auth**: Public — no check in the handler.

**Request body**
```json
{
  "title": "The Rise of Edge AI",
  "content": "Edge AI moves inference out of the cloud and onto the device itself...",
  "summary": "A look at how edge inference is changing IoT deployments.",
  "category": "artificial-intelligence",
  "tags": ["AI", "Edge Computing"],
  "published": false,
  "author": "Research Team"
}
```
Note: the handler does not pre-validate required fields — a missing required field throws a Mongoose `ValidationError` that is caught generically and returned as a bare 500, not a structured 400.

**Response 201**
```json
{
  "message": "Research content created successfully",
  "content": {
    "_id": "664f1c2e5b3c2a0012a99999",
    "title": "The Rise of Edge AI",
    "category": "artificial-intelligence",
    "published": false,
    "author": "Research Team",
    "createdAt": "2026-08-29T09:00:00.000Z",
    "updatedAt": "2026-08-29T09:00:00.000Z"
  }
}
```

**Response 500**
```json
{ "error": "Internal server error" }
```

---

### GET `/api/research/{id}`
**Auth**: Public. Query param `?admin=true` bypasses the `published: true` filter (not itself auth-gated).

**Response 200**
```json
{
  "research": {
    "_id": "664f1c2e5b3c2a0012a99999",
    "title": "The Rise of Edge AI",
    "content": "Edge AI moves inference out of the cloud and onto the device itself...",
    "summary": "A look at how edge inference is changing IoT deployments.",
    "category": "artificial-intelligence",
    "tags": ["AI", "Edge Computing"],
    "published": true,
    "author": "Research Team",
    "publishedDate": "2026-06-10T00:00:00.000Z"
  }
}
```

**Response 400**
```json
{ "error": "Invalid research ID" }
```

**Response 404**
```json
{ "error": "Research content not found" }
```

---

### PUT `/api/research/{id}`
**Auth**: Public — no check in the handler. Setting `published: true` for the first time auto-stamps `publishedDate`.

**Request body**
```json
{ "published": true }
```

**Response 200**
```json
{
  "message": "Research content updated successfully",
  "research": {
    "_id": "664f1c2e5b3c2a0012a99999",
    "title": "The Rise of Edge AI",
    "published": true,
    "publishedDate": "2026-08-29T09:00:00.000Z",
    "updatedAt": "2026-08-29T09:00:00.000Z"
  }
}
```

**Response 400**
```json
{ "error": "Invalid research ID" }
```
```json
{ "error": "Validation error", "details": ["Summary must be less than 300 characters"] }
```

**Response 404**
```json
{ "error": "Research content not found" }
```

---

### DELETE `/api/research/{id}`
**Auth**: Public — no check in the handler.

**Response 200**
```json
{ "message": "Research content deleted successfully" }
```

**Response 400**
```json
{ "error": "Invalid research ID" }
```

**Response 404**
```json
{ "error": "Research content not found" }
```

---

### POST `/api/contact`
**Auth**: Public. Sends two emails; does **not** persist to MongoDB (see [Known Issues](#known-issues--inconsistencies)).

**Request body**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "company": "Acme Retail",
  "phone": "+91 98765 43210",
  "subject": "Need a new e-commerce site",
  "message": "We'd like a quote for a custom online store with payment integration.",
  "projectType": "web-development",
  "budget": "10k-25k"
}
```
`projectType` enum (frontend-enforced only): `web-development`, `mobile-app`, `desktop-app`, `cloud-solutions`, `cybersecurity`, `iot-solutions`, `blockchain`, `ai-ml`, `consulting`, `other`.
`budget` enum (frontend-enforced only): `under-5k`, `5k-10k`, `10k-25k`, `25k-50k`, `50k-100k`, `over-100k`, `discuss`.

**Response 200**
```json
{
  "message": "Message sent successfully! We will get back to you within 24 hours.",
  "data": {
    "name": "John Smith",
    "email": "john@example.com",
    "company": "Acme Retail",
    "phone": "+91 98765 43210",
    "subject": "Need a new e-commerce site",
    "message": "We'd like a quote for a custom online store with payment integration.",
    "projectType": "web-development",
    "budget": "10k-25k",
    "createdAt": "2026-08-29T09:00:00.000Z",
    "id": "1756458000000"
  }
}
```

**Response 503**
```json
{ "error": "Email service temporarily unavailable. Please contact us directly at squareserver55@gmail.com or call +91 92969 60172." }
```

**Response 500**
```json
{
  "error": "Email authentication error. Please contact us directly.",
  "details": "Invalid login: 535 Authentication failed",
  "errorCode": "EAUTH"
}
```

---

### POST `/api/rating`
**Auth**: Public.

**Request body**
```json
{ "rating": 5 }
```

**Response 201**
```json
{ "success": true, "message": "Rating submitted successfully", "rating": 5 }
```

**Response 400**
```json
{ "error": "Invalid rating. Must be between 1 and 5." }
```

**Response 500**
```json
{ "error": "Internal server error", "details": "Connection timed out" }
```
(`details` only present when `NODE_ENV=development`.)

---

### GET `/api/rating`
**Auth**: Public.

**Response 200**
```json
{
  "totalRatings": 42,
  "averageRating": "4.71",
  "distribution": { "1": 0, "2": 1, "3": 2, "4": 10, "5": 29 }
}
```
When no ratings exist yet:
```json
{
  "totalRatings": 0,
  "averageRating": 0,
  "distribution": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
}
```

---

### POST `/api/upload`
**Auth**: Public — no check in the handler. Content-Type must be `multipart/form-data`; field name `file`.

**Request (multipart/form-data)**
```
POST /api/upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="project-cover.jpg"
Content-Type: image/jpeg

<binary image bytes>
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```
Constraints: MIME type ∈ `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`; size ≤ 5 MB.

**Response 200**
```json
{
  "message": "File uploaded successfully",
  "url": "/uploads/projects/9f8b1c2a3d4e5f60718293a4b5c6d7e8.jpg",
  "filename": "9f8b1c2a3d4e5f60718293a4b5c6d7e8.jpg"
}
```

**Response 400**
```json
{ "error": "No file uploaded" }
```
```json
{ "error": "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." }
```
```json
{ "error": "File too large. Maximum size is 5MB." }
```

---

### DELETE `/api/upload`
**Auth**: Public — no check, no path-traversal sanitization on `filename`.

**Query params**: `?filename=9f8b1c2a3d4e5f60718293a4b5c6d7e8.jpg`

**Response 200**
```json
{ "message": "File deleted successfully" }
```

**Response 400**
```json
{ "error": "Filename is required" }
```

**Response 404**
```json
{ "error": "File not found" }
```

---

## Chatbot APIs

### GET `/api/chatbot`
**Auth**: Public.

**Response 200**
```json
{
  "success": true,
  "questions": [
    { "question": "How much does a business website cost?", "category": "pricing" },
    { "question": "How long does website development take?", "category": "timeline" },
    { "question": "Do you offer SEO services?", "category": "seo" }
  ]
}
```

---

### POST `/api/chatbot`
**Auth**: Public. Persists the conversation to `ChatLead`, keyed by `sessionId`.

**Request body — first message in a session** (`sessionId` omitted, server generates one):
```json
{
  "message": "Hi, I need a website for my business",
  "source": "homepage"
}
```

**Response 200 — first message**
```json
{
  "success": true,
  "sessionId": "session_1756458000000_a1b2c3d4e",
  "response": "Good morning! 👋 Welcome to SquareServer!\n\nI'm your AI assistant here to help you with:\n• Website Development\n• Mobile App Development\n• E-commerce Solutions\n• SEO Services\n• Custom Software Development\n\nHow can I assist you today?",
  "suggestedQuestions": [
    "How much does a business website cost?",
    "How long does website development take?",
    "Do you provide eCommerce website development?",
    "Do you offer SEO services?"
  ]
}
```

**Request body — follow-up message** (`sessionId` from the first response):
```json
{
  "sessionId": "session_1756458000000_a1b2c3d4e",
  "message": "How much does a website cost?"
}
```

**Response 200 — follow-up, FAQ matched**
```json
{
  "success": true,
  "sessionId": "session_1756458000000_a1b2c3d4e",
  "response": "Our website packages start at ₹25,000 depending on scope and features.",
  "suggestedQuestions": [
    "How long does website development take?",
    "Do you offer maintenance plans?",
    "Can I see your portfolio?"
  ]
}
```

**Response 200 — follow-up, no FAQ matched (fallback)**
```json
{
  "success": true,
  "sessionId": "session_1756458000000_a1b2c3d4e",
  "response": "That's a great question! While I don't have a specific answer for that, our team would love to help you personally. Would you like to share your contact details so we can get back to you?",
  "suggestedQuestions": [
    "How much does a business website cost?",
    "How long does website development take?",
    "Do you provide eCommerce website development?",
    "Do you offer SEO services?"
  ]
}
```

**Response 400**
```json
{ "error": "Message is required" }
```

---

### POST `/api/chatbot/lead`
**Auth**: Public.

**Request body**
```json
{
  "sessionId": "session_1756458000000_a1b2c3d4e",
  "leadInfo": {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "projectRequirements": "Need an online store with payment integration"
  }
}
```
At least one of `leadInfo.name` / `leadInfo.email` / `leadInfo.phone` is required.

**Response 200**
```json
{
  "success": true,
  "message": "Lead information captured successfully",
  "response": "Thank you John Smith! 🎉\n\nWe've received your information:\n• Name: John Smith\n• Email: john@example.com\n• Phone: +91 98765 43210\n• Requirements: Need an online store with payment integration\n\nOur team will get back to you within 24 hours. Looking forward to working with you!"
}
```

**Response 400**
```json
{ "error": "Session ID is required" }
```
```json
{ "error": "At least one contact detail is required" }
```
```json
{ "error": "Invalid email format" }
```

**Response 404**
```json
{ "error": "Chat session not found" }
```

---

## Admin APIs

All under `/api/admin/*`; nominally gated by `middleware.ts`, but each route also does its own (inconsistent) check — see [Authentication](#authentication).

### GET `/api/admin/faq`
**Auth**: Cookie `auth_token` (currently broken — see [Known Issues](#known-issues--inconsistencies)).

**Query params**: `?category=pricing&isActive=true`

**Response 200**
```json
{
  "success": true,
  "faqs": [
    {
      "_id": "664f1c2e5b3c2a0012a11111",
      "question": "How much does a business website cost?",
      "answer": "Our website packages start at ₹25,000 depending on scope and features.",
      "category": "pricing",
      "keywords": ["cost", "price", "budget"],
      "priority": 9,
      "isActive": true,
      "createdAt": "2026-05-01T00:00:00.000Z",
      "updatedAt": "2026-05-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

**Response 401**
```json
{ "error": "Unauthorized" }
```

---

### POST `/api/admin/faq`
**Auth**: Cookie `auth_token` (broken).

**Request body**
```json
{
  "question": "How much does a business website cost?",
  "answer": "Our website packages start at ₹25,000 depending on scope and features.",
  "category": "pricing",
  "keywords": ["cost", "price", "budget"],
  "priority": 9,
  "isActive": true
}
```
`category` enum: `pricing`, `timeline`, `services`, `technology`, `support`, `general`, `ecommerce`, `seo`, `mobile`, `redesign`, `contact` (default `general`).

**Response 200**
```json
{
  "success": true,
  "message": "FAQ created successfully",
  "faq": {
    "_id": "664f1c2e5b3c2a0012a11111",
    "question": "How much does a business website cost?",
    "answer": "Our website packages start at ₹25,000 depending on scope and features.",
    "category": "pricing",
    "keywords": ["cost", "price", "budget"],
    "priority": 9,
    "isActive": true
  }
}
```

**Response 400**
```json
{ "error": "Question and answer are required" }
```

---

### PUT `/api/admin/faq`
**Auth**: Cookie `auth_token` (broken). `id` goes in the body, not the path.

**Request body**
```json
{
  "id": "664f1c2e5b3c2a0012a11111",
  "priority": 10,
  "isActive": false
}
```

**Response 200**
```json
{
  "success": true,
  "message": "FAQ updated successfully",
  "faq": {
    "_id": "664f1c2e5b3c2a0012a11111",
    "priority": 10,
    "isActive": false
  }
}
```

**Response 400**
```json
{ "error": "FAQ ID is required" }
```

**Response 404**
```json
{ "error": "FAQ not found" }
```

---

### DELETE `/api/admin/faq`
**Auth**: Cookie `auth_token` (broken).

**Query params**: `?id=664f1c2e5b3c2a0012a11111`

**Response 200**
```json
{ "success": true, "message": "FAQ deleted successfully" }
```

**Response 400**
```json
{ "error": "FAQ ID is required" }
```

**Response 404**
```json
{ "error": "FAQ not found" }
```

---

### GET `/api/admin/gallery`
**Auth**: Header `Authorization: Bearer <token>`.

**Query params**: `?category=team&isActive=true`

**Response 200**
```json
{
  "success": true,
  "images": [
    {
      "_id": "664f1c2e5b3c2a0012a22222",
      "title": "Team offsite 2026",
      "description": "Annual company retreat",
      "imageUrl": "/uploads/projects/team1.jpg",
      "category": "team",
      "isActive": true,
      "order": 1,
      "uploadedBy": "admin@squareserver.in",
      "createdAt": "2026-06-01T00:00:00.000Z",
      "updatedAt": "2026-06-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

**Response 401**
```json
{ "error": "No authentication token provided" }
```

---

### POST `/api/admin/gallery`
**Auth**: Header `Authorization: Bearer <token>`. `uploadedBy` is set server-side from the authenticated user's email.

**Request body**
```json
{
  "title": "Team offsite 2026",
  "description": "Annual company retreat",
  "imageUrl": "/uploads/projects/team1.jpg",
  "category": "team",
  "isActive": true,
  "order": 1
}
```

**Response 201**
```json
{
  "success": true,
  "message": "Image added successfully",
  "image": {
    "_id": "664f1c2e5b3c2a0012a22222",
    "title": "Team offsite 2026",
    "imageUrl": "/uploads/projects/team1.jpg",
    "category": "team",
    "isActive": true,
    "order": 1,
    "uploadedBy": "admin@squareserver.in"
  }
}
```

**Response 400**
```json
{ "error": "Title and image URL are required" }
```

---

### DELETE `/api/admin/gallery`
**Auth**: Header `Authorization: Bearer <token>`.

**Query params**: `?id=664f1c2e5b3c2a0012a22222`

**Response 200**
```json
{ "success": true, "message": "Image deleted successfully" }
```

**Response 400**
```json
{ "error": "Image ID is required" }
```

**Response 404**
```json
{ "error": "Image not found" }
```

---

### PUT `/api/admin/gallery/{id}`
**Auth**: Header `Authorization: Bearer <token>`.

**Request body**
```json
{
  "title": "Team offsite 2026 (updated)",
  "description": "Annual company retreat",
  "imageUrl": "/uploads/projects/team1.jpg",
  "category": "team",
  "isActive": true,
  "order": 2
}
```

**Response 200**
```json
{
  "success": true,
  "message": "Image updated successfully",
  "image": {
    "_id": "664f1c2e5b3c2a0012a22222",
    "title": "Team offsite 2026 (updated)",
    "order": 2
  }
}
```

**Response 404**
```json
{ "error": "Image not found" }
```

---

### GET `/api/admin/management`
**Auth**: Cookie `token`; current user must have `approvalStatus: "approved"`.

**Query params**: `?status=pending` (one of `pending`\|`approved`\|`rejected`; invalid values ignored)

**Response 200**
```json
{
  "admins": [
    {
      "id": "664f1c2e5b3c2a0012a33333",
      "name": "Jane Doe",
      "email": "jane@squareserver.in",
      "role": "admin",
      "isVerified": true,
      "approvalStatus": "pending",
      "approvedBy": null,
      "approvedAt": null,
      "rejectedBy": null,
      "rejectedAt": null,
      "createdAt": "2026-08-01T00:00:00.000Z",
      "updatedAt": "2026-08-01T00:00:00.000Z"
    }
  ]
}
```

**Response 401**
```json
{ "error": "Authentication required" }
```
```json
{ "error": "Invalid token" }
```

**Response 403**
```json
{ "error": "Access denied. Admin approval required." }
```

---

### POST `/api/admin/management/{id}`
**Auth**: Cookie `token`; current user must have `approvalStatus: "approved"`. Sends an approval/rejection email to the target user (failures here are swallowed).

**Request body**
```json
{ "action": "approve" }
```
`action` must be `"approve"` or `"reject"`.

**Response 200**
```json
{
  "message": "Admin account approved successfully",
  "admin": {
    "id": "664f1c2e5b3c2a0012a33333",
    "name": "Jane Doe",
    "email": "jane@squareserver.in",
    "approvalStatus": "approved"
  }
}
```

**Response 400**
```json
{ "error": "Invalid action. Must be \"approve\" or \"reject\"" }
```
```json
{ "error": "You cannot approve or reject your own account" }
```

**Response 401**
```json
{ "error": "Authentication required" }
```

**Response 403**
```json
{ "error": "Access denied. Admin approval required." }
```

**Response 404**
```json
{ "error": "Admin not found" }
```

---

### GET `/api/admin/chatbot/leads`
**Auth**: Cookie `auth_token` (broken — see [Known Issues](#known-issues--inconsistencies)).

**Query params**: `?status=converted&page=1&limit=50`

**Response 200**
```json
{
  "success": true,
  "leads": [
    {
      "_id": "664f1c2e5b3c2a0012a44444",
      "sessionId": "session_1756458000000_a1b2c3d4e",
      "conversation": [
        { "sender": "user", "message": "Hi, I need a website", "timestamp": "2026-08-29T09:00:00.000Z" },
        { "sender": "bot", "message": "Good morning! 👋 Welcome to SquareServer!", "timestamp": "2026-08-29T09:00:01.000Z" }
      ],
      "leadInfo": {
        "name": "John Smith",
        "email": "john@example.com",
        "phone": "+91 98765 43210",
        "projectRequirements": "Need an online store with payment integration"
      },
      "status": "converted",
      "source": "homepage",
      "ipAddress": "203.0.113.5",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "createdAt": "2026-08-29T09:00:00.000Z",
      "updatedAt": "2026-08-29T09:05:00.000Z",
      "lastMessageAt": "2026-08-29T09:05:00.000Z"
    }
  ],
  "pagination": { "total": 1, "page": 1, "limit": 50, "pages": 1 }
}
```

**Response 401**
```json
{ "error": "Unauthorized" }
```

---

### PUT `/api/admin/chatbot/leads`
**Auth**: Cookie `auth_token` (broken).

**Request body**
```json
{
  "id": "664f1c2e5b3c2a0012a44444",
  "status": "converted"
}
```
`status` should be one of `active`\|`converted`\|`abandoned` — not validated in the handler, so an invalid value surfaces as a 500 from Mongoose rather than a clean 400.

**Response 200**
```json
{
  "success": true,
  "message": "Lead status updated",
  "lead": {
    "_id": "664f1c2e5b3c2a0012a44444",
    "status": "converted"
  }
}
```

**Response 400**
```json
{ "error": "ID and status are required" }
```

**Response 404**
```json
{ "error": "Lead not found" }
```

---

### GET `/api/admin/ratings/recent`
**Auth**: Header `Authorization: Bearer <token>`.

**Query params**: `?limit=50`

**Response 200**
```json
{
  "success": true,
  "ratings": [
    {
      "_id": "664f1c2e5b3c2a0012a55555",
      "rating": 5,
      "ipAddress": "203.0.113.5",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "createdAt": "2026-08-29T09:00:00.000Z",
      "updatedAt": "2026-08-29T09:00:00.000Z"
    }
  ]
}
```

**Response 401**
```json
{ "error": "No authentication token provided" }
```

---

## Diagnostics

### POST `/api/test-email`
**Auth**: Public — no check (see [Known Issues](#known-issues--inconsistencies)). Sends a real email.

**Request body**: none.

**Response 200**
```json
{
  "success": true,
  "message": "Email configuration test successful!",
  "details": {
    "messageId": "<abc123@gmail.com>",
    "connection": "SMTP connection verified",
    "emailSent": "Test email sent successfully",
    "recipient": "squareserver55@gmail.com"
  }
}
```

**Response 400**
```json
{
  "success": false,
  "error": "Missing environment variables",
  "missingVars": ["EMAIL_PASS"],
  "message": "Please configure all required email environment variables in .env.local"
}
```

**Response 500**
```json
{
  "success": false,
  "error": "Email test failed",
  "message": "Invalid login: 535 Authentication failed",
  "details": {
    "errorType": "EAUTH",
    "errorMessage": "Invalid login: 535 Authentication failed"
  }
}
```

---

### GET `/api/test-email`
**Auth**: Public.

**Request body**: none.

**Response 200**
```json
{
  "configured": true,
  "environment": {
    "SMTP_HOST": "smtp.gmail.com",
    "SMTP_PORT": "587",
    "EMAIL_USER": "squareserver55@gmail.com",
    "EMAIL_PASS": "***SET***",
    "EMAIL_FROM": "squareserver55@gmail.com",
    "CONTACT_EMAIL_RECEIVER": "squareserver55@gmail.com"
  },
  "missingVars": [],
  "message": "All environment variables are configured"
}
```

---

## Data Models & Enums Reference

### Project
Source: [src/models/Project.ts](src/models/Project.ts)

| Field | Type | Required | Default | Enum |
|---|---|---|---|---|
| `title` | string | ✅ | | |
| `description` | string | ✅ | | |
| `detailedDescription` | string | | | |
| `category` | string | ✅ | | *(free-text; UI convention: `it-solutions`, `research-development`)* |
| `subcategory` | string | | | *(free-text; UI convention: `web-development`, `mobile-app`, `desktop-app`, `ai-ml`, `blockchain`, `iot`, `cybersecurity`, `cloud-solutions`, `system-integration`, `other`)* |
| `technologies` | string[] | | `[]` | |
| `imageUrl` | string | ✅ | | |
| `images` | string[] | | `[]` | |
| `demoUrl` | string | | | |
| `githubUrl` | string | | | |
| `status` | string | | `published` | `draft` \| `published` \| `archived` |
| `featured` | boolean | | `false` | |
| `clientName` | string | | | |
| `completionDate` | Date | | | |
| `duration` | string | | | |
| `teamSize` | number | | | |
| `features` / `challenges` / `solutions` / `results` | string[] | | `[]` | |
| `testimonial` | `{ text, author, position, company? }` | | | |
| `createdAt` / `updatedAt` | Date | auto | | |

#### Project category/subcategory conventions
`category`/`subcategory` are free-text strings in the schema, but the admin UI ([admin/projects/page.tsx](src/app/admin/projects/page.tsx)) filters/creates against:
- **category**: `it-solutions`, `research-development`
- **subcategory**: `web-development`, `mobile-app`, `desktop-app`, `ai-ml`, `blockchain`, `iot`, `cybersecurity`, `cloud-solutions`, `system-integration`, `other`

---

### ResearchContent
Source: [src/models/ResearchContent.ts](src/models/ResearchContent.ts)

| Field | Type | Required | Default | Enum |
|---|---|---|---|---|
| `title` | string | ✅ | | |
| `content` | string | ✅ | | |
| `summary` | string | ✅ (max 300 chars) | | |
| `category` | string | ✅ | | `artificial-intelligence` \| `machine-learning` \| `blockchain` \| `iot` \| `cybersecurity` \| `cloud-computing` \| `other` |
| `tags` | string[] | | `[]` | |
| `published` | boolean | | `false` | |
| `author` | string | ✅ | | |
| `publishedDate` | Date | | | |

---

### Gallery
Source: [src/models/Gallery.ts](src/models/Gallery.ts)

| Field | Type | Required | Default |
|---|---|---|---|
| `title` | string | ✅ | |
| `description` | string | | |
| `imageUrl` | string | ✅ | |
| `category` | string | | `other` *(free-text — no UI enum constants found)* |
| `isActive` | boolean | | `true` |
| `order` | number | | `0` |
| `uploadedBy` | string | | *(set from admin's email)* |

---

### FAQ
Source: [src/models/FAQ.ts](src/models/FAQ.ts)

| Field | Type | Required | Default | Enum |
|---|---|---|---|---|
| `question` | string | ✅ | | |
| `answer` | string | ✅ | | |
| `category` | string | ✅ | `general` | `pricing` \| `timeline` \| `services` \| `technology` \| `support` \| `general` \| `ecommerce` \| `seo` \| `mobile` \| `redesign` \| `contact` |
| `keywords` | string[] | | `[]` | |
| `priority` | number | | `5` | min `1`, max `10` |
| `isActive` | boolean | | `true` | |
| `createdBy` / `updatedBy` | string | | | |

---

### ChatLead
Source: [src/models/ChatLead.ts](src/models/ChatLead.ts)

| Field | Type | Required | Default | Enum |
|---|---|---|---|---|
| `sessionId` | string | ✅ (unique) | | |
| `conversation` | `{ sender, message, timestamp }[]` | | `[]` | `sender`: `user` \| `bot` |
| `leadInfo` | `{ name?, email?, phone?, projectRequirements? }` | | `{}` | |
| `status` | string | | `active` | `active` \| `converted` \| `abandoned` |
| `source` | string | | `homepage` | *(free-text; only `homepage` observed in use)* |
| `ipAddress` / `userAgent` | string | | | |
| `lastMessageAt` | Date | | `now` | |

---

### Rating
Source: [src/models/Rating.ts](src/models/Rating.ts)

| Field | Type | Required | Notes |
|---|---|---|---|
| `rating` | number | ✅ | min `1`, max `5` |
| `ipAddress` | string | | |
| `userAgent` | string | | |

---

### User (admin account)
Source: [src/models/User.ts](src/models/User.ts)

| Field | Type | Required | Default | Enum |
|---|---|---|---|---|
| `email` | string | ✅ (unique) | | |
| `password` | string | ✅ | | bcrypt hash, min 6 chars (raw, pre-hash) |
| `name` | string | ✅ | | |
| `role` | string | | `admin` | `admin` (only value defined) |
| `isVerified` | boolean | | `false` | |
| `approvalStatus` | string | | `pending` | `pending` \| `approved` \| `rejected` |
| `approvedBy` / `approvedAt` | string / Date | | | |
| `rejectedBy` / `rejectedAt` | string / Date | | | |
| `otp` / `otpExpiry` | string / Date | | | registration OTP |
| `resetOtp` / `resetOtpExpiry` | string / Date | | | password-reset OTP |

---

## Known Issues / Inconsistencies

Flagging these because a client integrating against this API would hit them in practice:

1. **`/api/admin/faq` and `/api/admin/chatbot/leads` are effectively unusable.** Their `verifyAdmin()` reads the cookie `auth_token`, but nothing in the codebase ever sets a cookie by that name — login/register only ever set `token`. Every call to these two routes will return `401 Unauthorized` regardless of a valid session.
2. **Three different auth mechanisms across `/api/admin/*`**: cookie `token` + full user/approval lookup (`management`), `Authorization: Bearer` header only, no approval check (`gallery`, `ratings/recent`), and the broken `auth_token` cookie (`faq`, `chatbot/leads`).
3. **`/api/projects` (list/create) and `/api/projects/{id}` (get/update/delete) have no auth checks in the handlers themselves.** They sit outside the `/api/admin/*` middleware matcher, so create/update/delete are callable by anyone, not just logged-in admins.
4. **`/api/projects/clear`** deletes every project in the database with a bare `DELETE` request — no auth, no confirmation, no soft-delete.
5. **`/api/research` and `/api/research/{id}` have no auth checks** for POST/PUT/DELETE either, and the list endpoint (`GET /api/research`) doesn't filter to `published: true` (unlike the single-item `GET /api/research/{id}`, which does unless `?admin=true` is passed — and that flag itself isn't auth-gated).
6. **`GET /api/research?featured=true` is a no-op** — `featured` isn't a field on the `ResearchContent` schema.
7. **`/api/upload` (POST/DELETE) has no auth check** and writes to the local filesystem (`public/uploads/projects/`) — won't persist on ephemeral/serverless hosts, and `DELETE` doesn't sanitize `filename` against path traversal beyond relying on `fs.existsSync`/`unlinkSync`.
8. **`/api/test-email` (GET & POST) has no auth check** and will send a live email through your SMTP account on every POST.
9. **`/api/contact` does not persist submissions to the database** — if both outbound emails fail, the submission is lost entirely (only logged to console).
10. **Enum values for `Project.category`/`Project.subcategory`, `Gallery.category`, and `ChatLead.source` are not enforced at the schema level** — they're plain `String` fields; the "enums" listed above for these are UI conventions only, not server-side validated.
