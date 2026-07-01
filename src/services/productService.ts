import api from "@/lib/api";
import { getToken } from "@/utils/storage";
import { Product } from "@/types/product";

// GET ALL PRODUCTS
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

// GET PRODUCT BY ID
export const getProductById = async (
  id: string
): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// CREATE PRODUCT
export const createProduct = async (
  productData: FormData
) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.post(
    "/products",
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// UPDATE PRODUCT
export const updateProduct = async (
  id: string,
  productData: FormData
) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.put(
    `/products/${id}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// DELETE PRODUCT
export const deleteProduct = async (
  id: string
) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};