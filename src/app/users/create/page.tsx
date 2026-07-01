"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createUser } from "@/services/userService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function CreateUserPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [profilePhoto, setProfilePhoto] =
    useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    github: "",
    linkedin: "",
    batch: "",
    skills: "",
  });

  // =======================
  // Handle Input Change
  // =======================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =======================
  // Handle Image Change
  // =======================
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  // =======================
  // Create User
  // =======================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userPayload = new FormData();

      userPayload.append("name", formData.name);
      userPayload.append("email", formData.email);
      userPayload.append(
        "password",
        formData.password
      );
      userPayload.append("bio", formData.bio);
      userPayload.append(
        "github",
        formData.github
      );
      userPayload.append(
        "linkedin",
        formData.linkedin
      );
      userPayload.append(
        "batch",
        formData.batch
      );

      userPayload.append(
        "isFeatured",
        "false"
      );

      userPayload.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        )
      );

      if (profilePhoto) {
        userPayload.append(
          "profilePhoto",
          profilePhoto
        );
      }

      console.log(
        "TOKEN:",
        localStorage.getItem("token")
      );

      const createdUser =
        await createUser(userPayload);

      console.log(
        "CREATE USER RESPONSE:",
        createdUser
      );

      alert("User created successfully.");

      router.push("/users");
    } catch (error: unknown) {
      console.error(
        "CREATE USER ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Failed to create user."
        );
      } else if (
        error instanceof Error
      ) {
        alert(error.message);
      } else {
        alert("Failed to create user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <h1 className="mb-6 text-3xl font-bold">
            Create User
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
            />

            <Input
              name="skills"
              placeholder="Skills (React, Node.js, MongoDB)"
              value={formData.skills}
              onChange={handleChange}
            />

            <Input
              name="github"
              placeholder="GitHub URL"
              value={formData.github}
              onChange={handleChange}
            />

            <Input
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formData.linkedin}
              onChange={handleChange}
            />

            <Input
              name="batch"
              placeholder="Batch (2026)"
              value={formData.batch}
              onChange={handleChange}
              required
            />

            <div>
              <label className="mb-2 block text-sm font-medium">
                Profile Photo
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}