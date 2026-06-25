"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProjectById,
  updateProject,
} from "@/services/projectService";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [loading, setLoading] = useState(true);

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
      await updateProject(projectId, {
        ...formData,
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
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Project...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Edit Project
      </h1>

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

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}