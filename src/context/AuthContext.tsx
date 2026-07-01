"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getToken,
  removeToken,
  saveToken,
} from "@/utils/storage";

import { User } from "@/types/user";

// =======================
// Auth Context Type
// =======================
type AuthContextType = {
  token: string | null;
  role: "admin" | "student" | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
};

// =======================
// Create Context
// =======================
const AuthContext =
  createContext<AuthContextType | null>(null);

// =======================
// Auth Provider
// =======================
export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] =
    useState<string | null>(null);

  const [role, setRole] = useState<
    "admin" | "student" | null
  >(null);

  const [user, setUser] =
    useState<User | null>(null);

  // Restore authentication on page refresh
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);

      setUser(parsedUser);
      setRole(parsedUser.role);
    }
  }, []);

  // Login
  const login = (
    token: string,
    user: User
  ) => {
    saveToken(token);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);
    setUser(user);
    setRole(user.role);
  };

  // Logout
  const logout = () => {
    removeToken();

    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =======================
// Custom Hook
// =======================
export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}