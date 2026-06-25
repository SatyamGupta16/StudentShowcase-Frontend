"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/authService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      alert("Registration successful");

      router.push("/login");
    } catch (error: unknown) {
      console.log("REGISTER ERROR:", error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Registration failed"
        );
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Registration failed");
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
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Register to access the Student Project Showcase Dashboard
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border bg-white p-8 shadow-lg"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}