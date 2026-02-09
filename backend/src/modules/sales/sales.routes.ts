import { Router } from "express";
import { SalesController } from "./sales.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { sellerOnly } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createSaleSchema,
  updateSaleStatusSchema,
  getSaleByIdSchema,
} from "./sales.schema";

const router = Router();

router.post("/", authMiddleware, validate(createSaleSchema), SalesController.create);
router.get("/me", authMiddleware, SalesController.findMySales);
router.get("/seller", authMiddleware, SalesController.findSalesAsSeller);
router.get("/:id", validate(getSaleByIdSchema), authMiddleware, SalesController.findById);

router.patch("/:id/status", validate(updateSaleStatusSchema), authMiddleware, sellerOnly, SalesController.updateStatus);

export default router;
