import "dotenv/config";
import express from "express";
import cors from "cors";
import enquiriesRouter from "./routes/enquiries";
import authRouter from "./routes/auth";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/enquiries", enquiriesRouter);
app.use("/api/auth", authRouter);

// Fallback error handler so unexpected errors don't crash the process
// or leak stack traces to the client.
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Corporate Stays backend running on port ${PORT}`);
});
