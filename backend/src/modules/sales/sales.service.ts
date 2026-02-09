import { prisma } from "../../database/prisma";
import { Prisma } from "@prisma/client";

interface ProductInput {
  productId: number;
  quantity: number;
}

interface CreateSaleInput {
  userId: number;
  sellerId: number;
  products: ProductInput[];
  deliveryAddr: string;
  deliveryNum: string;
}

export class SalesService {
  static async create(data: CreateSaleInput) {
    const productsFromDb = await prisma.product.findMany({
      where: {
        id: { in: data.products.map(p => p.productId) },
      },
    });

    const totalPrice = productsFromDb.reduce((sum, product) => {
      const item = data.products.find(p => p.productId === product.id)!;
      return sum + Number(product.price) * item.quantity;
    }, 0);

    return prisma.sale.create({
      data: {
        userId: data.userId,
        sellerId: data.sellerId,
        totalPrice: new Prisma.Decimal(totalPrice),
        deliveryAddr: data.deliveryAddr,
        deliveryNum: data.deliveryNum,
        products: {
          create: data.products.map(p => ({
            productId: p.productId,
            quantity: p.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });
  }

  static async findByUser(userId: number) {
    return prisma.sale.findMany({
      where: { userId },
      include: { products: true },
      orderBy: { id: "desc" },
    });
  }

  static async findBySeller(sellerId: number) {
    return prisma.sale.findMany({
      where: { sellerId },
      include: { products: true },
      orderBy: { id: "desc" },
    });
  }
}
