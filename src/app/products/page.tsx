"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import {
  getAllProducts,
  deleteProduct,
} from "@/services/productService";

import { Product } from "@/types/product";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getProductImageUrl = (image: string) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/uploads")) {
      return `${BACKEND_URL}${image}`;
    }

    return `${BACKEND_URL}/uploads/${image}`;
  };

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getAllProducts();

      console.log("CREATIONS API RESPONSE:", data);

      setProducts(data);
    } catch (error) {
      console.error("CREATIONS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this creation?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      alert("Creation deleted successfully");

      fetchProducts();
    } catch (error) {
      console.error("DELETE CREATION ERROR:", error);

      alert("Failed to delete creation");
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex h-screen items-center justify-center text-lg font-semibold">
          Loading Creations...
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Creations</h1>

            <p className="mt-2 text-gray-500">
              Manage all uploaded student creations, prototypes, tools, and
              portfolio items.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              {products.length} Creations
            </span>

            <button
              onClick={() => router.push("/products/create")}
              className="rounded-lg bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700"
            >
              Add Creation
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <p className="text-gray-500">No creations found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {product.image ? (
                  <Image
                    src={getProductImageUrl(product.image)}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="h-48 w-full bg-slate-100 object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Creation";
                    }}
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-slate-100 text-gray-400">
                    No Creation Thumbnail
                  </div>
                )}

                <div className="p-6">
                  {product.isFeatured && (
                    <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      ⭐ Featured
                    </span>
                  )}

                  <h2 className="text-xl font-bold">{product.name}</h2>

                  {product.description && (
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Type:</span>{" "}
                      {product.category || "Not added"}
                    </p>

                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Showcase Value:</span>{" "}
                      {product.price ? `₹${product.price}` : "Portfolio item"}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => router.push(`/products/${product._id}`)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}