export interface Student {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  branch?: string;
  year?: string;
  batch?: string;
  skills?: string[] | string;
  bio?: string;
  profilePhoto?: string;
  github?: string;
  linkedin?: string;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentInput {
  name: string;
  email: string;
  phone?: string;
  branch?: string;
  year?: string;
  batch?: string;
  skills?: string[] | string;
  bio?: string;
  profilePhoto?: File | string | null;
  github?: string;
  linkedin?: string;
  isFeatured?: boolean;
}