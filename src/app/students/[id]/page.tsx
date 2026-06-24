"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getStudentById,
  updateStudent,
} from "@/services/studentService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const BACKEND_URL = "http://localhost:27017";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();

  const studentId = params.id as string;

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

  useEffect(() => {
    fetchStudent();
  }, []);

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

  const fetchStudent = async () => {
    try {
      const student = await getStudentById(studentId);

      console.log("EDIT STUDENT DATA:", student);

      setFormData({
        name: student.name || "",
        email: student.email || "",
        bio: student.bio || "",
        github: student.github || "",
        linkedin: student.linkedin || "",
        batch: student.batch || "",
        skills: student.skills?.join(", ") || "",
      });

      setPreviewPhoto(student.profilePhoto || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load student");
    } finally {
      setLoading(false);
    }
  };

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

      const response = await updateStudent(
        studentId,
        payload
      );

      console.log("UPDATE RESPONSE:", response);

      alert("Student updated successfully");

      router.push("/students");
    } catch (error: any) {
      console.log("UPDATE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update student"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading Student...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <h1 className="mb-6 text-3xl font-bold">
            Edit Student
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {previewPhoto ? (
              <div className="flex justify-center">
                <img
                  src={
                    previewPhoto.startsWith("blob:")
                      ? previewPhoto
                      : getProfilePhotoUrl(previewPhoto)
                  }
                  alt="Profile Preview"
                  className="h-28 w-28 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/200x200?text=Student";
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
              {updating
                ? "Updating..."
                : "Update Student"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}