import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../prisma";
import { signToken } from "../utils/jwt";
import { requireAuth } from "../middleware/auth";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Please enter a valid email and password." });
  }

  const { email, password } = parsed.data;

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = signToken({ sub: admin.id, email: admin.email });

  res.json({
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
});

router.get("/me", requireAuth, async (req, res) => {
  const admin = await prisma.adminUser.findUnique({ where: { id: req.admin!.sub } });
  if (!admin) return res.status(404).json({ error: "Not found" });
  res.json({ id: admin.id, email: admin.email, name: admin.name });
});

export default router;
