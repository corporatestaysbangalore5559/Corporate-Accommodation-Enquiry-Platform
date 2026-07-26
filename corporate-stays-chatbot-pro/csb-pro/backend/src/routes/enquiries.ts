import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";
import { sendEnquiryNotification } from "../utils/mailer";

const router = Router();

const createSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  officeLocation: z.string().trim().min(1, "Office location is required"),
  numEmployees: z.string().trim().min(1, "Number of employees is required"),
  duration: z.string().trim().min(1, "Duration is required"),
  budget: z.string().trim().min(1, "Budget is required"),
  checkinDate: z.string().trim().min(1, "Check-in date is required"),
  specialRequirements: z.string().trim().optional().default(""),
  contactPersonName: z.string().trim().min(1, "Contact person name is required"),
  companyEmail: z.string().trim().email("Enter a valid company email"),
  mobileNumber: z
    .string()
    .trim()
    .min(7, "Enter a valid mobile number")
    .max(20, "Enter a valid mobile number"),
});

const STATUS_VALUES = ["NEW", "CONTACTED", "QUOTED", "CLOSED"] as const;

// ── POST /api/enquiries — public, used by the chatbot ──────────────────────
router.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "Invalid enquiry data.";
    return res.status(400).json({ error: message });
  }

  try {
    const enquiry = await prisma.enquiry.create({ data: parsed.data });

    try {
      await sendEnquiryNotification(enquiry);
    } catch (mailErr) {
      console.error("Email notification failed:", (mailErr as Error).message);
    }

    res.status(201).json({ success: true, id: enquiry.id });
  } catch (err) {
    console.error("Failed to save enquiry:", (err as Error).message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// ── GET /api/enquiries — protected, list with search + status filter ───────
router.get("/", requireAuth, async (req, res) => {
  const search = String(req.query.search || "").trim();
  const status = String(req.query.status || "").trim().toUpperCase();

  const where: Prisma.EnquiryWhereInput = {};

  if (search) {
    where.OR = [
      { companyName: { contains: search, mode: "insensitive" } },
      { officeLocation: { contains: search, mode: "insensitive" } },
      { contactPersonName: { contains: search, mode: "insensitive" } },
      { companyEmail: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status && (STATUS_VALUES as readonly string[]).includes(status)) {
    where.status = status as (typeof STATUS_VALUES)[number];
  }

  const enquiries = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  res.json(enquiries);
});

// ── GET /api/enquiries/stats — protected, dashboard counts ─────────────────
router.get("/stats", requireAuth, async (req, res) => {
  const [total, newCount, contacted, quoted] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count({ where: { status: "CONTACTED" } }),
    prisma.enquiry.count({ where: { status: "QUOTED" } }),
  ]);

  res.json({ total, new: newCount, contacted, quoted });
});

// ── GET /api/enquiries/export — protected, CSV download ────────────────────
router.get("/export", requireAuth, async (req, res) => {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });

  const headers = [
    "Company Name",
    "Office Location",
    "Employees",
    "Duration",
    "Budget",
    "Check-in Date",
    "Special Requirements",
    "Contact Person",
    "Company Email",
    "Mobile Number",
    "Status",
    "Submitted On",
  ];

  const escape = (val: unknown) => `"${String(val ?? "").replace(/"/g, '""')}"`;

  const lines = [headers.join(",")];
  for (const e of enquiries) {
    lines.push(
      [
        e.companyName,
        e.officeLocation,
        e.numEmployees,
        e.duration,
        e.budget,
        e.checkinDate,
        e.specialRequirements,
        e.contactPersonName,
        e.companyEmail,
        e.mobileNumber,
        e.status,
        e.createdAt.toISOString(),
      ]
        .map(escape)
        .join(",")
    );
  }

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=enquiries.csv");
  res.send(lines.join("\n"));
});

// ── PATCH /api/enquiries/:id/status — protected, move an enquiry along ─────
router.patch("/:id/status", requireAuth, async (req, res) => {
  const { id } = req.params;
  const status = String(req.body?.status || "").toUpperCase();

  if (!(STATUS_VALUES as readonly string[]).includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  try {
    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status: status as (typeof STATUS_VALUES)[number] },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: "Enquiry not found." });
  }
});

export default router;
