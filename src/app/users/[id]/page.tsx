"use client";

import Image from "next/image";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import {
  getUserById,
  updateUser,
} from "@/services/userService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const userId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    github: "",
    linkedin: "",
    batch: "",
    skills: "",
  });

  const getProfilePhotoUrl = (image: string) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/uploads")) {
      return `${BACKEND_URL}${image}`;
    }

    return `${BACKEND_URL}/uploads/${image}`;
  };

  const formatSkills = (skills?: string[] | string) => {
    if (!skills) return "";

    if (Array.isArray(skills)) {
      return skills.join(", ");
    }

    return skills;
  };

const fetchUser = useCallback(async () => {
  try {
    const user = await getUserById(userId);

    console.log("EDIT USER DATA:", user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "",
      github: user.github || "",
      linkedin: user.linkedin || "",
      batch: user.batch || "",
      skills: formatSkills(user.skills),
    });

    setPreviewPhoto(user.profilePhoto || "");
  } catch (error) {
    console.error("FETCH USER ERROR:", error);
    alert("Failed to load user");
  } finally {
    setLoading(false);
  }
}, [userId]);

useEffect(() => {
  fetchUser();
}, [fetchUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setProfilePhoto(e.target.files[0]);
      setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("bio", formData.bio);
      payload.append("github", formData.github);
      payload.append("linkedin", formData.linkedin);
      payload.append("batch", formData.batch);

      payload.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        )
      );

      if (profilePhoto) {
        payload.append("profilePhoto", profilePhoto);
      }

      console.log("UPDATE FORM DATA READY");

      const response = await updateUser(userId, payload);

      console.log("UPDATE RESPONSE:", response);

      alert("User updated successfully");

      router.push("/users");
    } catch (error: unknown) {
      console.log("UPDATE ERROR:", error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Failed to update user"
        );
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to update user");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="p-10">
          Loading User...
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                Edit User
              </h1>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/users")}
              >
                Back
              </Button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {previewPhoto ? (
                <div className="flex justify-center">
                  <Image
                    src={
                      previewPhoto.startsWith("blob:")
                        ? previewPhoto
                        : getProfilePhotoUrl(previewPhoto)
                    }
                    alt="Profile Preview"
                    width={112}
                    height={112}
                    unoptimized={previewPhoto.startsWith("blob:")}
                    className="h-28 w-28 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/200x200?text=User";
                    }}
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-purple-100 text-4xl font-bold text-purple-600">
                    {formData.name?.charAt(0)?.toUpperCase() || "S"}
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Change Profile Photo
                </label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

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
                placeholder="Batch"
                value={formData.batch}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                className="w-full"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update User"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  );
}