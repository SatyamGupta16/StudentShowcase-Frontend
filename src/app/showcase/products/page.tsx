"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllProducts } from "@/services/productService";

import { Product } from "@/types/product";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function ShowcaseProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return products;

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.price?.toString(),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [products, searchQuery]);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getAllProducts();

      console.log("SHOWCASE CREATIONS:", data);

      setProducts(data);
    } catch (error) {
      console.error("SHOWCASE CREATIONS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Loading Creations...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
            💡 Student Creations
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Explore Student Creations
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover creative builds, prototypes, tools, apps, and portfolio
            work uploaded by students as part of their learning journey.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {filteredProducts.length} / {products.length} Creations
            </span>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-200"
              >
                Clear Search
              </button>
            )}
          </div>

          <button
            onClick={() => router.push("/showcase/projects")}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            View Projects →
          </button>
        </div>

        <div className="mb-10 rounded-2xl bg-white p-4 shadow">
          <input
            type="text"
            placeholder="Search creations by name, category, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-gray-500">
              {searchQuery
                ? "No creations matched your search."
                : "No creations found."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
              >
                {product.image ? (
                  <Image
                    src={getProductImageUrl(product.image)}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="h-56 w-full bg-slate-100 object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Creation";
                    }}
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-green-100 text-gray-400">
                    No Creation Thumbnail
                  </div>
                )}

                <div className="p-6">
                  {product.isFeatured && (
                    <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      ⭐ Featured
                    </span>
                  )}

                  <h2 className="text-2xl font-bold">{product.name}</h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {product.description || "No description added."}
                  </p>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Type:</span>{" "}
                      {product.category || "Not added"}
                    </p>

                    {product.price ? (
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Estimated Value:</span>{" "}
                        ₹{product.price}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Value:</span> Showcase
                        item
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/showcase/products/${product._id}`)
                    }
                    className="mt-5 rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
                  >
                    View Creation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}