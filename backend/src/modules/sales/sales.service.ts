import { prisma } from "../../database/prisma";
import { Prisma, SaleStatus } from "@prisma/client";

const STATUS_FLOW: Record<SaleStatus, SaleStatus[]> = {
  PENDING: ["PENDING"],
  PREPARING: ["PREPARING"],
  IN_TRANSIT: ["IN_TRANSIT"],
  DELIVERED: [],
};

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

  static async updateStatus(
    saleId: number,
    sellerId: number,
    newStatus: SaleStatus
  ) {
    const sale = await prisma.sale.findUnique({
      where: { id: saleId },
    });

    if (!sale) {
      throw new Error("Sale not found");
    }

    if (sale.sellerId !== sellerId) {
      throw new Error("Not allowed");
    }

    const allowedStatuses = STATUS_FLOW[sale.status];

    if (!allowedStatuses.includes(newStatus)) {
      throw new Error(
        `Invalid status transition from ${sale.status} to ${newStatus}`
      );
    }

    return prisma.sale.update({
      where: { id: saleId },
      data: { status: newStatus },
    });
  }

  static async findById(
    saleId: number,
    userId: number,
    role: "CUSTOMER" | "SELLER"
  ) {
    const sale = await prisma.sale.findUnique({
      where: { id: saleId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
        seller: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!sale) {
      throw new Error("Sale not found");
    }

    // Autorização
    const roleCustomer = role === "CUSTOMER" && sale.userId !== userId;
    const roleSeller = role === "SELLER" && sale.sellerId !== userId;

    if (roleCustomer || roleSeller) {
      throw new Error("Not allowed");
    }

    return sale;
  }
}
