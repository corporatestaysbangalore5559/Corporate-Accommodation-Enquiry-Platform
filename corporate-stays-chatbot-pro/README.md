# Corporate Stays Bangalore — Enquiry Chatbot & Admin Dashboard

A production-ready lead-collection chatbot: a ChatGPT-style widget that asks
10 questions one at a time, saves the enquiry to PostgreSQL, emails your
team, and shows a confirmation — plus a secure admin dashboard for managing
enquiries. No AI conversation, no property recommendations — this tool has
exactly one job: capture and route enquiries.

```
corporate-stays-chatbot/
├── frontend/     Next.js 15 + React + TypeScript + Tailwind
├── backend/      Node.js + Express + TypeScript + Prisma + Nodemailer
├── database/     Prisma schema docs + reference SQL
└── README.md
```

## Architecture

```
Visitor                Admin
   │                      │
   ▼                      ▼
Chatbot (Next.js)   Dashboard (Next.js, JWT-protected)
   │                      │
   └────────┬─────────────┘
            ▼
     Express API (JWT auth, Zod validation)
            │
   ┌────────┴─────────┐
   ▼                   ▼
PostgreSQL (Prisma)   SMTP (Nodemailer)
```

- **Chatbot** — `frontend/components/ChatBot.tsx`. Collects Company Name,
  Office Location, Number of Employees, Duration, Budget, Check-in Date,
  Special Requirements, Contact Person Name, Company Email, Mobile Number.
  Validates email format and mobile number client-side and again on the
  server. Shows a review screen (Edit / Submit), then the confirmation
  message. Never shows property listings.
- **Backend API** — `backend/src`. `POST /api/enquiries` is public (used by
  the chatbot); everything else under `/api/enquiries` and `/api/auth/me`
  requires a valid JWT, issued by `POST /api/auth/login`.
- **Database** — PostgreSQL via Prisma. See `backend/prisma/schema.prisma`
  and `database/README.md`.
- **Email** — Nodemailer over SMTP sends a formatted enquiry (HTML + plain
  text) to `jashwanth@corporatestaysbangalore.com` (configurable) on every
  submission.
- **Admin dashboard** — `frontend/app/admin`. JWT-based login, stat cards
  (Total / New / Contacted / Quoted), search, status filter, per-enquiry
  detail view with status changes, and CSV export.

---

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

Create the database tables:

```bash
npx prisma migrate dev --name init
```

Create your first admin login:

```bash
npm run seed
```

Run the API:

```bash
npm run dev      # local development, auto-restart
# or
npm run build && npm start   # production
```

The API runs at `http://localhost:4000`. `GET /health` returns `{ ok: true }`
once it's up.

> **SMTP options**: Resend's free tier (`smtp.resend.com`) works out of the
> box with no domain setup. Gmail works too — enable 2-Step Verification and
> create an "App Password" at myaccount.google.com/apppasswords. SendGrid's
> SMTP relay also works with this same Nodemailer config — just swap the
> `SMTP_*` values, no code changes needed.

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

- Chatbot: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin` (redirects to `/admin/login`,
  then `/admin/dashboard` once signed in)

## 3. Deploying

**Database — Neon**
1. Create a project at neon.tech, copy the connection string into
   `DATABASE_URL` (both locally and on Render).
2. Run `npx prisma migrate deploy` once against it (from your machine, or
   as a Render one-off job / build step).

**Backend — Render**
1. New Web Service → connect this repo → Root Directory `backend`.
2. Build command: `npm install && npm run build && npx prisma migrate deploy`
3. Start command: `npm start`
4. Add all the env vars from `backend/.env.example` (with production
   values). Set `CORS_ORIGIN` to your Vercel URL once you have it.
5. After the first deploy, run `npm run seed` once (Render's Shell tab, or
   a one-off job) to create your admin login — or run it locally against
   the production `DATABASE_URL`.

**Frontend — Vercel**
1. New Project → connect this repo → Root Directory `frontend`.
2. Env var: `NEXT_PUBLIC_API_URL` = your Render backend URL.
3. Deploy.

Update the backend's `CORS_ORIGIN` to the final Vercel URL and redeploy.

## 4. Security notes for production

- Admin sessions are JWTs stored in `localStorage` and sent as
  `Authorization: Bearer <token>`, verified on every protected route. For
  stricter production hardening, consider moving to httpOnly cookies with
  CSRF protection — a small change confined to `lib/auth.ts`,
  `lib/api.ts`, and `backend/src/middleware/auth.ts`.
- Rotate `JWT_SECRET` and `ADMIN_SEED_PASSWORD` before going live; never
  commit real `.env` files.
- All enquiry input is validated with Zod on the server (email format,
  mobile number length, required fields) regardless of what the client
  sends.
- Passwords are hashed with bcrypt (10 rounds); nothing is ever stored or
  logged in plain text.

## 5. What's intentionally left simple

Per the brief, this is a single-purpose lead-capture tool:
- No AI-generated responses — the question flow is fixed and deterministic.
- No property recommendations, pricing engine, or booking flow.
- No multi-role admin permissions — one admin user type, extendable later
  if you need multiple team members with different access levels.
