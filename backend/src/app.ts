import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { prisma } from "./database/prisma";
import { authMiddleware } from "./middlewares/auth.middleware";
import productsRoutes from "./modules/products/products.routes";
import salesRoutes from "./modules/sales/sales.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/sales", salesRoutes);

app.get("/health", async (_req, res) => {
  const usersCount = await prisma.user.count();
  res.json({ ok: true, users: usersCount });
});

app.get("/me", authMiddleware, (req, res) => {
  return res.json({ user: req.user });
});