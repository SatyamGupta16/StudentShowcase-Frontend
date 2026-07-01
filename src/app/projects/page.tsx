"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import {
  getAllProjects,
  deleteProject,
} from "@/services/projectService";

import { Project } from "@/types/project";
import { User } from "@/types/user";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function ProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const getProjectImageUrl = (screenshot: string) => {
    if (!screenshot) return "";

    if (screenshot.startsWith("http")) {
      return screenshot;
    }

    if (screenshot.startsWith("/uploads")) {
      return `${BACKEND_URL}${screenshot}`;
    }

    return `${BACKEND_URL}/uploads/${screenshot}`;
  };

  const fetchProjects = useCallback(async () => {
    try {
      const data = await getAllProjects();

      console.log("PROJECTS API RESPONSE:", data);
      console.log("FIRST PROJECT user:", data?.[0]?.user);

      console.log(
        "ALL PROJECT USERS:",
        data.map((project: Project) => ({
          title: project.title,
          user: project.user,
        }))
      );

      setProjects(data);
    } catch (error) {
      console.error("PROJECTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      alert("Project deleted successfully");

      fetchProjects();
    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);
      alert("Failed to delete project");
    }
  };

  const getUserName = (project: Project) => {
    if (
      project.user &&
      typeof project.user === "object"
    ) {
      return (project.user as User).name;
    }

    return "Unknown User";
  };

  const getUserEmail = (project: Project) => {
    if (
      project.user &&
      typeof project.user === "object"
    ) {
      return (project.user as User).email;
    }

    return "";
  };

  const getTechStack = (
    techStack?: string[] | string
  ) => {
    if (!techStack) return [];

    if (Array.isArray(techStack)) {
      return techStack;
    }

    return techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex h-screen items-center justify-center text-lg font-semibold">
          Loading Projects...
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all user projects
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              {projects.length} Projects
            </span>

            <button
              onClick={() =>
                router.push("/projects/create")
              }
              className="rounded-lg bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700"
            >
              Add Project
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <p className="text-gray-500">
              No projects found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const techStack = getTechStack(
                project.techStack
              );

              const userEmail =
                getUserEmail(project);

              return (
                <div
                  key={project._id}
                  className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {project.screenshot ? (
                    <Image
                      src={getProjectImageUrl(
                        project.screenshot
                      )}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-48 w-full bg-slate-100 object-contain"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x400?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-slate-100 text-gray-400">
                      No Screenshot
                    </div>
                  )}

                  <div className="p-6">
                    {project.isFeatured && (
                      <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        ⭐ Featured
                      </span>
                    )}

                    <h2 className="text-xl font-bold">
                      {project.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {project.description}
                    </p>

                    <div className="mt-4 border-t pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                        Created By
                      </p>

                      <p className="mt-1 font-medium">
                        {getUserName(project)}
                      </p>

                      {userEmail && (
                        <p className="text-sm text-gray-500">
                          {userEmail}
                        </p>
                      )}
                    </div>

                    {techStack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {techStack.map(
                          (tech, index) => (
                            <span
                              key={`${tech}-${index}`}
                              className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          router.push(
                            `/projects/${project._id}`
                          )
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(project._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
                        >
                          GitHub
                        </a>
                      )}

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}