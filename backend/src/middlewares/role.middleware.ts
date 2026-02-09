import { NextFunction, Request, Response } from "express";

export function sellerOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "SELLER") {
    return res.status(403).json({ message: "Seller only" });
  }

  next();
}