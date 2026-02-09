import { Request, Response } from "express";
import { ProductsService } from "./products.service";

export class ProductsController {
  static async findAll(_req: Request, res: Response) {
    const products = await ProductsService.findAll();
    return res.json(products);
  }
}