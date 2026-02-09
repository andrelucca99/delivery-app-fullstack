import { prisma } from "../../database/prisma";

export class ProductsService {
  static async findAll() {
    return prisma.product.findMany({
      orderBy: { id: "asc" },
    });
  }
}