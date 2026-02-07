import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { prisma } from "./database/prisma";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/health", async (_req, res) => {
  const usersCount = await prisma.user.count();
  res.json({ ok: true, users: usersCount });
});
