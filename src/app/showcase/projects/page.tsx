"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllProjects } from "@/services/projectService";

import { Project } from "@/types/project";
import { Student } from "@/types/student";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function ShowcaseProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const getProjectImageUrl = (image?: string) => {
    if (!image) return "";

    if (image.startsWith("http://localhost:27017/uploads")) {
      return image.replace("http://localhost:27017", BACKEND_URL);
    }

    if (image.startsWith("https://studentshowcase-backend.onrender.com")) {
      return image;
    }

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/uploads")) {
      return `${BACKEND_URL}${image}`;
    }

    return `${BACKEND_URL}/uploads/${image}`;
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

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return projects;

    return projects.filter((project) => {
      const student = getStudent(project.student);
      const techStack = getTechStack(project.techStack).join(" ");

      const searchableText = [
        project.title,
        project.description,
        techStack,
        student?.name,
        student?.email,
        student?.batch,
        "Prompt Computer Classes",
        "student projects",
        "project showcase",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [projects, searchQuery]);

  const fetchProjects = useCallback(async () => {
    try {
      const data = await getAllProjects();

      console.log("SHOWCASE PROJECTS:", data);

      setProjects(Array.isArray(data) ? data : []);
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

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold text-gray-700">
          Loading Prompt Computer Classes student projects...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600">
            🚀 Prompt Computer Classes Project Showcase
          </span>

          <h1 className="mt-6 text-4xl font-bold text-gray-950 md:text-5xl">
            Prompt Computer Classes Student Projects
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
            Explore practical projects created by students of Prompt Computer
            Classes. This page showcases student work, portfolios, technical
            skills, GitHub repositories, live demos, and project-based learning
            for parents, visitors, and admissions.
          </p>
        </div>

        {/* SEO Intro Section */}
        <div className="mb-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-gray-950">
            Student Project Showcase for Practical Learning
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Prompt Computer Classes Student Project Showcase helps students
            present their learning through real projects. Visitors can explore
            web development projects, full-stack applications, creative ideas,
            technical skills, and student portfolios in one place.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              Web Development Projects
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Student Portfolios
            </span>
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Coding Practice
            </span>
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
              Live Project Demos
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              {filteredProjects.length} / {projects.length} Projects
            </span>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-200"
              >
                Clear Search
              </button>
            )}
          </div>

          <button
            onClick={() => router.push("/showcase/students")}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            View Student Profiles →
          </button>
        </div>

        {/* Search */}
        <div className="mb-10 rounded-2xl bg-white p-4 shadow">
          <input
            type="text"
            placeholder="Search Prompt Computer Classes projects by title, tech stack, student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Projects */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-gray-500">
              {searchQuery
                ? "No projects matched your search."
                : "No student projects found."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const student = getStudent(project.student);
              const techStack = getTechStack(project.techStack);

              return (
                <article
                  key={project._id}
                  className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
                >
                  {project.screenshot ? (
                    <Image
                      src={getProjectImageUrl(project.screenshot)}
                      alt={`${project.title} - Prompt Computer Classes student project`}
                      width={600}
                      height={400}
                      className="h-52 w-full bg-slate-100 object-contain"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x400?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-purple-100 text-gray-400">
                      No Project Screenshot
                    </div>
                  )}

                  <div className="p-6">
                    {project.isFeatured && (
                      <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        ⭐ Featured Project
                      </span>
                    )}

                    <h2 className="text-2xl font-bold text-gray-950">
                      {project.title}
                    </h2>

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
                            alt={`${student.name || "Student"} - Prompt Computer Classes student`}
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
                          <p className="font-semibold text-gray-950">
                            {student?.name || "Prompt Computer Classes Student"}
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
                      <button
                        onClick={() =>
                          router.push(`/showcase/projects/${project._id}`)
                        }
                        className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
                      >
                        View Project
                      </button>

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
                          className="rounded-lg border border-purple-600 px-4 py-2 text-sm text-purple-600 transition hover:bg-purple-50"
                        >
                          Student Profile
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}