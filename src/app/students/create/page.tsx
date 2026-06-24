"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudent } from "@/services/studentService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function CreateStudentPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    github: "",
    linkedin: "",
    batch: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const studentPayload = new FormData();

      studentPayload.append("name", formData.name);
      studentPayload.append("email", formData.email);
      studentPayload.append("bio", formData.bio);
      studentPayload.append("github", formData.github);
      studentPayload.append("linkedin", formData.linkedin);
      studentPayload.append("batch", formData.batch);
      studentPayload.append("isFeatured", "false");

      studentPayload.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        )
      );

      if (profilePhoto) {
        studentPayload.append("profilePhoto", profilePhoto);
      }

      console.log(
        "TOKEN BEFORE CREATE:",
        localStorage.getItem("token")
      );

      const response = await createStudent(
        studentPayload
      );

      console.log(
        "CREATE STUDENT RESPONSE:",
        response
      );

      alert("Student created successfully");

      router.push("/students");
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      console.log(
        "RESPONSE:",
        error.response?.data
      );
      console.log(
        "STATUS:",
        error.response?.status
      );

      alert(
        error.response?.data?.message ||
          "Failed to create student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <h1 className="mb-6 text-3xl font-bold">
            Create Student
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              name="name"
              placeholder="Student Name"
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
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
            />

            <Input
              name="skills"
              placeholder="Skills comma separated e.g. React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
            />

            <Input
              name="github"
              placeholder="Github URL"
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
                : "Create Student"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}