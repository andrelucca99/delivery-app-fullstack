import { Request, Response } from "express";
import { SalesService } from "./sales.service";
import { SaleStatus } from "@prisma/client";

export class SalesController {
  static async create(req: Request, res: Response) {
    const sale = await SalesService.create({
      userId: req.user!.id,
      sellerId: req.body.sellerId,
      products: req.body.products,
      deliveryAddr: req.body.deliveryAddr,
      deliveryNum: req.body.deliveryNum,
    });

    return res.status(201).json(sale);
  }

  static async findMySales(req: Request, res: Response) {
    const sales = await SalesService.findByUser(req.user!.id);
    return res.json(sales);
  }

  static async findSalesAsSeller(req: Request, res: Response) {
    const sales = await SalesService.findBySeller(req.user!.id);
    return res.json(sales);
  }

  static async updateStatus(req: Request, res: Response) {
    const saleId = Number(req.params.id);
    const { status } = req.body as { status: SaleStatus };
  
    const updatedSale = await SalesService.updateStatus(
      saleId,
      req.user!.id,
      status
    );

    return res.json(updatedSale);
  }
}
