import { Router } from "express";
import { SalesController } from "./sales.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { sellerOnly } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authMiddleware, SalesController.create);
router.get("/me", authMiddleware, SalesController.findMySales);
router.get("/seller", authMiddleware, SalesController.findSalesAsSeller);

router.patch("/:id/status", authMiddleware, sellerOnly, SalesController.updateStatus);

export default router;
