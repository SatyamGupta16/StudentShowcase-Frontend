"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";
import { createProduct } from "@/services/productService";

export default function CreateProductPage() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isFeatured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: e.target.checked,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("isFeatured", String(formData.isFeatured));

      if (image) {
        productData.append("image", image);
      }

      await createProduct(productData);

      alert("Product created successfully");

      router.push("/products");
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="mx-auto max-w-3xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Create Product
          </h1>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="rounded-lg border px-4 py-2 transition hover:bg-white"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-8 shadow"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            rows={4}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <div>
            <label className="mb-2 block font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={handleCheckbox}
            />
            Featured Product
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-3 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </AdminGuard>
  );
}