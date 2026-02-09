import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ProductsController } from "./products.controller";

const router = Router();

router.get("/", authMiddleware, ProductsController.findAll);

export default router;