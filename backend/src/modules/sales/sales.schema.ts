import { z } from "zod";

export const createSaleSchema = z.object({
  body: z.object({
    sellerId: z.number().int().positive(),
    deliveryAddr: z.string().min(3),
    deliveryNum: z.string().min(1),
    products: z
      .array(
        z.object({
          productId: z.number().int().positive(),
          quantity: z.number().int().positive(),
        })
      )
      .min(1),
  }),
});

export const updateSaleStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Sale id must be a number"),
  }),
  body: z.object({
    status: z.enum(["PENDING", "PREPARING", "IN_TRANSIT", "DELIVERED"]),
  }),
});

export const getSaleByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Sale id must be a number"),
  }),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>["body"];
export type UpdateSaleStatusInput =
  z.infer<typeof updateSaleStatusSchema>["body"];
