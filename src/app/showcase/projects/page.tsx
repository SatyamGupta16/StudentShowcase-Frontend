"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllProjects } from "@/services/projectService";

import { Project } from "@/types/project";
import { Student } from "@/types/student";

const BACKEND_URL = "http://localhost:27017";

export default function ShowcaseProjectsPage() {
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

  const getStudent = (student?: Student | string): Student | null => {
    if (student && typeof student === "object") {
      return student;
    }

    return null;
  };

  const getTechStack = (techStack?: string[] | string) => {
    if (!techStack) return [];

    if (Array.isArray(techStack)) {
      return techStack;
    }

    return techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
  };

  const fetchProjects = useCallback(async () => {
    try {
      const data = await getAllProjects();

      console.log("SHOWCASE PROJECTS:", data);

      setProjects(data);
    } catch (error) {
      console.error("SHOWCASE PROJECTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Loading Projects...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600">
            🚀 Project Showcase
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Explore Student Projects
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover innovative projects built by students using modern web
            technologies, backend systems, machine learning, and creative ideas.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            {projects.length} Projects
          </span>

          <button
            onClick={() => router.push("/showcase/students")}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            View Students →
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-gray-500">No projects found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const student = getStudent(project.student);
              const techStack = getTechStack(project.techStack);

              return (
                <div
                  key={project._id}
                  className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
                >
                  {project.screenshot ? (
                    <Image
                      src={getProjectImageUrl(project.screenshot)}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-52 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x400?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-purple-100 text-gray-400">
                      No Screenshot
                    </div>
                  )}

                  <div className="p-6">
                    {project.isFeatured && (
                      <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        ⭐ Featured
                      </span>
                    )}

                    <h2 className="text-2xl font-bold">{project.title}</h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {project.description}
                    </p>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-600">
                        Created By
                      </p>

                      <div className="flex items-center gap-3">
                        {student?.profilePhoto ? (
                          <Image
                            src={getProjectImageUrl(student.profilePhoto)}
                            alt={student.name || "Student"}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/200x200?text=Student";
                            }}
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-600">
                            {student?.name?.charAt(0)?.toUpperCase() || "S"}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold">
                            {student?.name || "Unknown Student"}
                          </p>

                          {student?.email && (
                            <p className="text-sm text-gray-500">
                              {student.email}
                            </p>
                          )}

                          {student?.batch && (
                            <p className="text-xs text-purple-600">
                              {student.batch}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {techStack.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                          <span
                            key={`${tech}-${index}`}
                            className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                        >
                          GitHub
                        </a>
                      )}

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
                        >
                          Live Demo
                        </a>
                      )}

                      {student?._id && (
                        <button
                          onClick={() =>
                            router.push(`/showcase/students/${student._id}`)
                          }
                          className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
                        >
                          Student Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}