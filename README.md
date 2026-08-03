# CorporateStaysBangalore — Corporate Accommodation Request Portal

Premium enterprise portal for capturing corporate accommodation requirements.
This is **not** a chatbot, hotel booking site, OTA, or travel agency.

> We don't book rooms. We solve corporate accommodation.

```
corporate-accommodation-enquiry-platform/
├── frontend/     Next.js 15 + React + TypeScript + Tailwind + Framer Motion
├── backend/      Node.js + Express + TypeScript + Prisma + Nodemailer
├── database/     Prisma schema docs + reference SQL
└── README.md
```

## Product experience

- **Landing page** — brand-led hero, social proof, why-us, FAQ
- **AI-guided request flow** (`/request`) — one conversational question at a time with consultant responses, progress, and ETA
- **Accommodation Strategy** — elegant summary with inline editing (never called "Review")
- **Post-submission** — unique Reference ID (`CSB-YYYYMMDD-######`), process timeline, relationship manager commitments, and promise

The portal never shows hotel listings, prices, or property recommendations. It collects a high-quality corporate brief and routes it to the sales team for a customised proposal.

## Architecture

```
Visitor                Admin
   │                      │
   ▼                      ▼
Portal (Next.js)   Dashboard (Next.js, JWT-protected)
   │                      │
   └────────┬─────────────┘
            ▼
     Express API (JWT auth, Zod validation)
            │
   ┌────────┴─────────┐
   ▼                   ▼
PostgreSQL (Prisma)   SMTP (Nodemailer)
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL=postgres://user:password@host:5432/dbname?sslmode=require
CORS_ORIGIN=http://localhost:3000
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
NOTIFY_EMAIL=jashwanth@corporatestaysbangalore.com
JWT_SECRET=<generate a long random string>
ADMIN_SEED_EMAIL=jashwanth@corporatestaysbangalore.com
ADMIN_SEED_PASSWORD=<a strong password>
```

```bash
npx prisma migrate dev --name init
npm run seed
npm run dev
```

API: `http://localhost:4000` — `GET /health` returns `{ ok: true }`.

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
npm run dev
```

- Portal landing: `http://localhost:3000`
- Guided request: `http://localhost:3000/request`
- Admin: `http://localhost:3000/admin`

## 3. Deploying

**Database — Neon** · **Backend — Render** (root `backend`) · **Frontend — Vercel** (root `frontend`)

Set `NEXT_PUBLIC_API_URL` to the Render URL and `CORS_ORIGIN` to the Vercel URL.

## 4. Request payload mapping

The guided flow collects richer strategy fields than the original 10-question chatbot.
Extra context (requirement type, designation, preference, frequency, timeline, notes, reference ID)
is packaged into `specialRequirements` so the existing Express/Prisma API remains compatible
without a breaking schema change.
