"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import { getAllStudents } from "@/services/studentService";
import { createProject } from "@/services/projectService";

import { Student } from "@/types/student";

export default function CreateProjectPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveDemoUrl: "",
    student: "",
    isFeatured: false,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("FETCH STUDENTS ERROR:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const projectData = new FormData();

      projectData.append("title", formData.title);
      projectData.append("description", formData.description);
      projectData.append("githubUrl", formData.githubUrl);
      projectData.append("liveDemoUrl", formData.liveDemoUrl);
      projectData.append("student", formData.student);
      projectData.append("isFeatured", String(formData.isFeatured));

      projectData.append(
        "techStack",
        JSON.stringify(
          formData.techStack
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
        )
      );

      if (image) {
        projectData.append("screenshot", image);
      }

      await createProject(projectData);

      alert("Project Created Successfully");

      router.push("/projects");
    } catch (error) {
      console.error("CREATE PROJECT ERROR:", error);

      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="mx-auto max-w-3xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Create Project
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
            className="w-full rounded-lg border p-3"
            rows={4}
            required
          />

          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Screenshot
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <input
            type="text"
            name="techStack"
            placeholder="React, Next.js, Node.js, MongoDB"
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

          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>

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
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-3 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </AdminGuard>
  );
}