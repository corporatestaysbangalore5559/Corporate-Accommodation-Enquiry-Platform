# Database

This project uses **Prisma** as the single source of truth for the database
schema. The actual schema lives at `backend/prisma/schema.prisma`.

You do not need to write or run SQL by hand — Prisma generates and applies
migrations for you.

## Local development

```bash
cd backend
npx prisma migrate dev --name init
```

This creates the `enquiries` and `admin_users` tables in whatever database
`DATABASE_URL` points to (see `backend/.env.example`), and generates a
`prisma/migrations/` folder that should be committed to git.

## Production (Neon, Render, etc.)

```bash
cd backend
npx prisma migrate deploy
```

Run this once after pointing `DATABASE_URL` at your production database
(e.g. as part of your Render build/start command — see the root `README.md`).

## Seeding the first admin login

```bash
cd backend
npm run seed
```

Reads `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` / `ADMIN_SEED_NAME` from
`backend/.env` and creates that admin user (hashed with bcrypt) if it
doesn't already exist. Use this to create your first dashboard login, then
you're free to remove those variables.

## Reference: equivalent raw SQL

`schema.reference.sql` in this folder is a plain-SQL mirror of the Prisma
schema, included only for reference (e.g. if you want to inspect the
database directly in a SQL client). It is **not** used by the app — Prisma
manages the real schema and migrations.
