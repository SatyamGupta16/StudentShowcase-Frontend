"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllProducts } from "@/services/productService";

const BACKEND_URL = "http://localhost:27017";

export default function ShowcaseProductsPage() {
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

      console.log("SHOWCASE PRODUCTS:", data);

      setProducts(data);
    } catch (error) {
      console.error("SHOWCASE PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Loading Products...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            🛒 Product Showcase
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Explore Student Products
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover products, prototypes, and creative builds uploaded by
            students as part of their project showcase.
          </p>
        </div>

        {/* Count + Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {products.length} Products
          </span>

          <button
            onClick={() => router.push("/showcase/projects")}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            View Projects →
          </button>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Product Image */}
                {product.image ? (
                  <img
                    src={getProductImageUrl(product.image)}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-green-100 text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-6">
                  {/* Featured */}
                  {product.isFeatured && (
                    <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      ⭐ Featured
                    </span>
                  )}

                  <h2 className="text-2xl font-bold">
                    {product.name}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {product.description || "No description added."}
                  </p>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Price:</span>{" "}
                      ₹{product.price || 0}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Category:</span>{" "}
                      {product.category || "Not added"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}