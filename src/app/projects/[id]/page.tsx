"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import {
  getProjectById,
  updateProject,
} from "@/services/projectService";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveDemoUrl: "",
    isFeatured: false,
  });

  const fetchProject = useCallback(async () => {
    try {
      const data = await getProjectById(projectId);

      console.log("PROJECT:", data);

      setFormData({
        title: data.title || "",
        description: data.description || "",
        techStack: Array.isArray(data.techStack)
          ? data.techStack.join(", ")
          : data.techStack || "",
        githubUrl: data.githubUrl || "",
        liveDemoUrl: data.liveDemoUrl || "",
        isFeatured: data.isFeatured || false,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load project");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: e.target.checked,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await updateProject(projectId, {
        title: formData.title,
        description: formData.description,
        githubUrl: formData.githubUrl,
        liveDemoUrl: formData.liveDemoUrl,
        isFeatured: formData.isFeatured,
        techStack: formData.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      });

      alert("Project updated successfully");

      router.push("/projects");
    } catch (error) {
      console.error(error);

      alert("Failed to update project");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex h-screen items-center justify-center">
          Loading Project...
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-3xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Edit Project
          </h1>

          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="rounded-lg border px-4 py-2 transition hover:bg-white"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-8 shadow"
        >
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="text"
            name="techStack"
            placeholder="React, Next.js, Node.js"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="url"
            name="githubUrl"
            placeholder="GitHub URL"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="url"
            name="liveDemoUrl"
            placeholder="Live Demo URL"
            value={formData.liveDemoUrl}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={handleCheckbox}
            />
            Featured Project
          </label>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={updating}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "Updating..." : "Update Project"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/projects")}
              className="rounded-lg bg-gray-600 px-6 py-3 text-white transition hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminGuard>
  );
}