"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      console.log(data);

      alert("Registration successful");

      router.push("/login");
    } catch (error: any) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-purple-600"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-purple-600"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-purple-600"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-purple-600 p-3 text-white transition hover:bg-purple-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}