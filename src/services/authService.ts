import api from "@/lib/api";
import { LoginData, RegisterData, AuthResponse } from "@/types/user";

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};