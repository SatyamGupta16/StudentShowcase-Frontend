"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAllProducts,
  deleteProduct,
} from "@/services/productService";

const BACKEND_URL = "http://localhost:27017";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      console.log("PRODUCTS API RESPONSE:", data);

      setProducts(data);
    } catch (error) {
      console.error("PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      alert("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);

      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all uploaded products
          </p>
        </div>

        <button
          onClick={() => router.push("/products/create")}
          className="rounded-lg bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700"
        >
          Add Product
        </button>
      </div>

      <div className="mb-6">
        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
          {products.length} Products
        </span>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <p className="text-gray-500">
            No products found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {product.image ? (
                <img
                  src={getProductImageUrl(product.image)}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-slate-100 text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-6">
                {product.isFeatured && (
                  <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    ⭐ Featured
                  </span>
                )}

                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                {product.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {product.description}
                  </p>
                )}

                <div className="mt-4 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Price:</span>{" "}
                    ₹{product.price || 0}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Category:</span>{" "}
                    {product.category || "Not added"}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      router.push(`/products/${product._id}`)
                    }
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
  );
}