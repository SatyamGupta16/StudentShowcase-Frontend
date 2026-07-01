import api from "@/lib/api";
import { getToken } from "@/utils/storage";
import { User } from "@/types/user";

// =======================
// GET ALL USERS
// =======================
export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");

  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data?.users)) {
    return res.data.users;
  }

  return [];
};

// =======================
// GET USER BY ID
// =======================
export const getUserById = async (
  id: string
): Promise<User> => {
  const res = await api.get(`/users/${id}`);

  // Backend direct user object return kar raha hai
  if (res.data?._id) {
    return res.data;
  }

  // Agar future me backend { user: {...} } return kare
  if (res.data?.user) {
    return res.data.user;
  }

  throw new Error("User not found");
};

// =======================
// CREATE USER
// =======================
export const createUser = async (
  userData: FormData
) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.post("/users", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data?.user || res.data;
};

// =======================
// UPDATE USER
// =======================
export const updateUser = async (
  id: string,
  userData: FormData
) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.put(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data?.user || res.data;
};

// =======================
// DELETE USER
// =======================
export const deleteUser = async (id: string) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};