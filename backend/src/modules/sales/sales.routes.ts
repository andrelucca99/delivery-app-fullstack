import { Router } from "express";
import { SalesController } from "./sales.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, SalesController.create);
router.get("/me", authMiddleware, SalesController.findMySales);
router.get("/seller", authMiddleware, SalesController.findSalesAsSeller);

export default router;
