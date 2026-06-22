"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  image: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const API_URL = "http://localhost:27017";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const saveProduct = async () => {
    if (!name || !image) {
      alert("Please enter product name and select image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post(`${API_URL}/api/products`, formData);

      alert("Product saved successfully");

      setName("");
      setImage(null);

      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Product Image Upload
        </h1>

        <div className="mb-8 rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Add Product
          </h2>

          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded border px-4 py-2 text-black outline-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mb-4 w-full rounded border px-4 py-2 text-black"
          />

          <button
            onClick={saveProduct}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Save Product
          </button>
        </div>

        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Product List
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <img
                  src={`${API_URL}/uploads/${product.image}`}
                  alt={product.name}
                  className="mb-3 h-40 w-full rounded object-cover"
                />

                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}