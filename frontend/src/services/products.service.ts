import { api } from "./api";
import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}