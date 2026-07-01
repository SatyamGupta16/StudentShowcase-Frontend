// =======================
// Authentication Types
// =======================

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// =======================
// User Type
// =======================

export interface User {
  // MongoDB user id
  _id: string;

  // Optional fallback if any login response sends id instead of _id
  id?: string;

  name: string;
  email: string;
  role: "admin" | "student";

  bio?: string;
  profilePhoto?: string;
  skills?: string[];

  github?: string;
  linkedin?: string;

  batch?: string;
  isFeatured?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

// =======================
// Authentication Response
// =======================

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}