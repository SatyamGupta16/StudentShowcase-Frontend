"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getProjectById } from "@/services/projectService";

import { Project } from "@/types/project";
import { Student } from "@/types/student";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function PublicProjectDetailPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (image: string) => {
    if (!image) return "";

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

  const fetchProject = useCallback(async () => {
    try {
      const data = await getProjectById(projectId);

      console.log("PUBLIC PROJECT DETAIL:", data);

      setProject(data);
    } catch (error) {
      console.error("PUBLIC PROJECT DETAIL ERROR:", error);
      alert("Failed to load project");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Loading Project...
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Project not found
        </div>
      </main>
    );
  }

  const student = getStudent(project.student);
  const techStack = getTechStack(project.techStack);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <button
          onClick={() => router.push("/showcase/projects")}
          className="mb-8 rounded-lg border px-4 py-2 text-sm transition hover:bg-white"
        >
          ← Back to Projects
        </button>

        <div className="overflow-hidden rounded-3xl bg-white shadow">
          {project.screenshot ? (
            <Image
              src={getImageUrl(project.screenshot)}
              alt={project.title}
              width={1200}
              height={600}
              className="h-[420px] w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/1200x600?text=No+Image";
              }}
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-purple-100 text-gray-400">
              No Screenshot
            </div>
          )}

          <div className="p-8">
            {project.isFeatured && (
              <span className="mb-4 inline-block rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                ⭐ Featured Project
              </span>
            )}

            <h1 className="text-4xl font-bold">
              {project.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {project.description}
            </p>

            {techStack.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold">
                  Tech Stack
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {techStack.map((tech, index) => (
                    <span
                      key={`${tech}-${index}`}
                      className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 rounded-2xl bg-slate-50 p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-600">
                Created By
              </p>

              {student ? (
                <div className="flex items-center gap-4">
                  {student.profilePhoto ? (
                    <Image
                      src={getImageUrl(student.profilePhoto)}
                      alt={student.name || "Student"}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/200x200?text=Student";
                      }}
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                      {student.name?.charAt(0)?.toUpperCase() || "S"}
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold">
                      {student.name}
                    </h3>

                    {student.email && (
                      <p className="text-sm text-gray-500">
                        {student.email}
                      </p>
                    )}

                    {student.batch && (
                      <p className="mt-1 text-sm text-purple-600">
                        {student.batch}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Student details not available.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                >
                  View GitHub
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
                >
                  Live Demo
                </a>
              )}

              {student?._id && (
                <button
                  onClick={() =>
                    router.push(`/showcase/students/${student._id}`)
                  }
                  className="rounded-lg bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700"
                >
                  Student Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}