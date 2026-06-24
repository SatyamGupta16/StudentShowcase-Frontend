"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProductById,
  updateProduct,
} from "@/services/productService";

const BACKEND_URL = "http://localhost:27017";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isFeatured: false,
  });

  useEffect(() => {
    fetchProduct();
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

  const fetchProduct = async () => {
    try {
      const data = await getProductById(params.id as string);

      setFormData({
        name: data.name || "",
        description: data.description || "",
        price: String(data.price || ""),
        category: data.category || "",
        isFeatured: data.isFeatured || false,
      });

      setPreviewImage(data.image || "");
    } catch (error) {
      console.error("FETCH PRODUCT ERROR:", error);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: e.target.checked,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("isFeatured", String(formData.isFeatured));

      if (image) {
        productData.append("image", image);
      }

      await updateProduct(params.id as string, productData);

      alert("Product updated successfully");
      router.push("/products");
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-8 shadow"
      >
        {previewImage && (
          <img
            src={
              previewImage.startsWith("blob:")
                ? previewImage
                : getProductImageUrl(previewImage)
            }
            alt="Product Preview"
            className="h-56 w-full rounded-xl object-cover"
          />
        )}

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
            Change Product Image
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="rounded-lg bg-gray-600 px-6 py-3 text-white transition hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}