"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getProductById } from "@/services/productService";

import { Product } from "@/types/product";

const BACKEND_URL = "http://localhost:27017";

export default function PublicProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
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

  const fetchProduct = useCallback(async () => {
    try {
      const data = await getProductById(productId);

      console.log("PUBLIC PRODUCT DETAIL:", data);

      setProduct(data);
    } catch (error) {
      console.error("PUBLIC PRODUCT DETAIL ERROR:", error);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Loading Product...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Product not found
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <button
          onClick={() => router.push("/showcase/products")}
          className="mb-8 rounded-lg border px-4 py-2 text-sm transition hover:bg-white"
        >
          ← Back to Products
        </button>

        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-slate-100">
            {product.image ? (
              <Image
                src={getProductImageUrl(product.image)}
                alt={product.name}
                width={800}
                height={600}
                className="h-[420px] w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x600?text=No+Image";
                }}
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {product.isFeatured && (
              <span className="mb-4 w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                ⭐ Featured Product
              </span>
            )}

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {product.description || "No description added."}
            </p>

            <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-6">
              <p className="text-lg">
                <span className="font-semibold text-gray-900">
                  Price:
                </span>{" "}
                <span className="font-bold text-green-600">
                  {product.price ? `₹${product.price}` : "Price not added"}
                </span>
              </p>

              <p className="text-lg">
                <span className="font-semibold text-gray-900">
                  Category:
                </span>{" "}
                <span className="text-gray-600">
                  {product.category || "Not added"}
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/showcase/products")}
                className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
              >
                Explore More Products
              </button>

              <button
                onClick={() => router.push("/showcase/projects")}
                className="rounded-lg border border-purple-600 px-6 py-3 text-purple-600 transition hover:bg-purple-50"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}