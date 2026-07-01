"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  // =======================
  // Handle Login
  // =======================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      // Validate response
      if (!data.success) {
        throw new Error(data.message);
      }

      if (!data.token || !data.user) {
        throw new Error(
          "Invalid response from server"
        );
      }

      // Save token & user
      login(data.token, data.user);

      console.log(
        "TOKEN:",
        localStorage.getItem("token")
      );

      console.log(
        "user:",
        localStorage.getItem("user")
      );

      // Redirect based on user role
      if (data.user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push(
          "/dashboard/student"
        );
      }
    } catch (error: unknown) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ??
            "Login failed"
        );
      } else if (
        error instanceof Error
      ) {
        alert(error.message);
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to manage your Student
            Project Showcase
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border bg-white p-8 shadow-lg"
        >
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}