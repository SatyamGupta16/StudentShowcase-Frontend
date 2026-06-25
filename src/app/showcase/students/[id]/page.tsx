"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getStudentById } from "@/services/studentService";
import { getAllProjects } from "@/services/projectService";

import { Student } from "@/types/student";
import { Project } from "@/types/project";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();

  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
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

  const getSkills = (skills?: string[] | string) => {
    if (!skills) return [];

    if (Array.isArray(skills)) {
      return skills;
    }

    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
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

  const fetchStudentProfile = useCallback(async () => {
    try {
      const studentData = await getStudentById(studentId);
      const projectsData = await getAllProjects();

      const studentProjects = projectsData.filter((project) => {
        const projectStudentId =
          typeof project.student === "string"
            ? project.student
            : project.student?._id;

        return projectStudentId === studentId;
      });

      setStudent(studentData);
      setProjects(studentProjects);
    } catch (error) {
      console.error("STUDENT PROFILE ERROR:", error);
      alert("Failed to load student profile");
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchStudentProfile();
  }, [fetchStudentProfile]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Loading Student Profile...
        </div>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Student not found
        </div>
      </main>
    );
  }

  const skills = getSkills(student.skills);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <button
          onClick={() => router.push("/showcase/students")}
          className="mb-8 rounded-lg border px-4 py-2 text-sm transition hover:bg-white"
        >
          ← Back to Students
        </button>

        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          <div className="rounded-3xl bg-white p-8 shadow">
            <div className="flex flex-col items-center text-center">
              {student.profilePhoto ? (
                <Image
                  src={getImageUrl(student.profilePhoto)}
                  alt={student.name}
                  width={128}
                  height={128}
                  className="h-32 w-32 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/200x200?text=Student";
                  }}
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-purple-100 text-5xl font-bold text-purple-600">
                  {student.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
              )}

              <h1 className="mt-6 text-3xl font-bold">{student.name}</h1>

              <p className="mt-2 text-gray-500">{student.email}</p>

              {student.batch && (
                <span className="mt-4 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600">
                  {student.batch}
                </span>
              )}

              {student.bio && (
                <p className="mt-6 text-sm leading-6 text-gray-600">
                  {student.bio}
                </p>
              )}

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {student.github && (
                  <a
                    href={student.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                  >
                    GitHub
                  </a>
                )}

                {student.linkedin && (
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold">Skills</h2>

              {skills.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-500">No skills added yet.</p>
              )}
            </div>

            <div className="rounded-3xl bg-white p-8 shadow">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Projects by {student.name}
                </h2>

                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                  {projects.length} Projects
                </span>
              </div>

              {projects.length === 0 ? (
                <p className="text-gray-500">
                  No projects found for this student.
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {projects.map((project) => {
                    const techStack = getTechStack(project.techStack);

                    return (
                      <div
                        key={project._id}
                        className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        {project.screenshot ? (
                          <Image
                            src={getImageUrl(project.screenshot)}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="h-44 w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/600x400?text=No+Image";
                            }}
                          />
                        ) : (
                          <div className="flex h-44 items-center justify-center bg-purple-100 text-gray-400">
                            No Screenshot
                          </div>
                        )}

                        <div className="p-5">
                          {project.isFeatured && (
                            <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                              ⭐ Featured
                            </span>
                          )}

                          <h3 className="text-xl font-bold">
                            {project.title}
                          </h3>

                          <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                            {project.description}
                          </p>

                          {techStack.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {techStack.map((tech, index) => (
                                <span
                                  key={`${tech}-${index}`}
                                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-5 flex flex-wrap gap-3">
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
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}