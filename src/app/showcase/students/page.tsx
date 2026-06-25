"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllStudents } from "@/services/studentService";

import { Student } from "@/types/student";

const BACKEND_URL = "http://localhost:27017";

export default function ShowcaseStudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const getProfileImageUrl = (image: string) => {
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

  const filteredStudents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return students;

    return students.filter((student) => {
      const skills = getSkills(student.skills).join(" ");

      const searchableText = [
        student.name,
        student.email,
        student.bio,
        student.batch,
        skills,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [students, searchQuery]);

  const fetchStudents = useCallback(async () => {
    try {
      const data = await getAllStudents();

      console.log("SHOWCASE STUDENTS:", data);

      setStudents(data);
    } catch (error) {
      console.error("STUDENTS SHOWCASE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center text-lg font-semibold">
          Loading Students...
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
            🎓 Student Showcase
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Meet Our Talented Students
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore student profiles, skills, portfolios, GitHub links, and
            their amazing project work.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              {filteredStudents.length} / {students.length} Students
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
            onClick={() => router.push("/showcase/projects")}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            View Projects →
          </button>
        </div>

        <div className="mb-10 rounded-2xl bg-white p-4 shadow">
          <input
            type="text"
            placeholder="Search students by name, skill, batch, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {filteredStudents.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-gray-500">
              {searchQuery
                ? "No students matched your search."
                : "No students found."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => {
              const skills = getSkills(student.skills);

              return (
                <div
                  key={student._id}
                  className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    {student.profilePhoto ? (
                      <Image
                        src={getProfileImageUrl(student.profilePhoto)}
                        alt={student.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/200x200?text=Student";
                        }}
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                        {student.name?.charAt(0)?.toUpperCase() || "S"}
                      </div>
                    )}

                    <div>
                      <h2 className="text-xl font-bold">{student.name}</h2>

                      <p className="text-sm text-gray-500">
                        {student.email}
                      </p>

                      {student.batch && (
                        <span className="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600">
                          {student.batch}
                        </span>
                      )}
                    </div>
                  </div>

                  {student.bio && (
                    <p className="mt-5 line-clamp-3 text-sm text-gray-600">
                      {student.bio}
                    </p>
                  )}

                  {skills.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {skills.slice(0, 5).map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        router.push(`/showcase/students/${student._id}`)
                      }
                      className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
                    >
                      View Profile
                    </button>

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
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}