export interface Product {
  _id: string;

  name: string;

  description?: string;

  price?: number;

  category?: string;

  image?: string;

  isFeatured?: boolean;

  createdAt?: string;

  updatedAt?: string;
}

export interface ProductInput {
  name: string;

  description?: string;

  price?: number;

  category?: string;

  image?: File | string | null;

  isFeatured?: boolean;
}