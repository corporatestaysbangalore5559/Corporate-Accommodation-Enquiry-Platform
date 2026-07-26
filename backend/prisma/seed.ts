import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  const name = process.env.ADMIN_SEED_NAME || "Admin";

  if (!email || !password) {
    throw new Error(
      "Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in your .env before running the seed."
    );
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user ${email} already exists — skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.create({
    data: { email, name, passwordHash },
  });

  console.log(`✅ Admin user created: ${email}`);
  console.log("You can now log in at /admin/login with this email and the password you set.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
