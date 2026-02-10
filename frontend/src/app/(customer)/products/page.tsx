"use client";

import { getProducts } from "@/services/products.service";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p className="p-4">Carregando produtos...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Produtos</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="rounded border p-4 shadow">
            <img
              src={product.url}
              alt={product.name}
              className="mb-2 h-40 w-full object-cover"
            />

            <h2 className="font-semibold">{product.name}</h2>

            <p className="text-gray-700">
              R$ {Number(product.price).toFixed(2)}
            </p>

            <button className="mt-2 w-full rounded bg-green-600 p-2 text-white">
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}