-- Reference only — Prisma (backend/prisma/schema.prisma) manages the real
-- schema and migrations. This mirrors what Prisma will create.

CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'CLOSED');

CREATE TABLE "enquiries" (
  "id"                    TEXT PRIMARY KEY,
  "companyName"           TEXT NOT NULL,
  "officeLocation"        TEXT NOT NULL,
  "numEmployees"          TEXT NOT NULL,
  "duration"              TEXT NOT NULL,
  "budget"                TEXT NOT NULL,
  "checkinDate"           TEXT NOT NULL,
  "specialRequirements"   TEXT,
  "contactPersonName"     TEXT NOT NULL,
  "companyEmail"          TEXT NOT NULL,
  "mobileNumber"          TEXT NOT NULL,
  "status"                "EnquiryStatus" NOT NULL DEFAULT 'NEW',
  "createdAt"             TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt"             TIMESTAMP(3) NOT NULL
);

CREATE INDEX "enquiries_status_idx" ON "enquiries" ("status");
CREATE INDEX "enquiries_createdAt_idx" ON "enquiries" ("createdAt");

CREATE TABLE "admin_users" (
  "id"           TEXT PRIMARY KEY,
  "name"         TEXT,
  "email"        TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT now()
);
