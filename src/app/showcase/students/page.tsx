"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllStudents } from "@/services/studentService";

const BACKEND_URL = "http://localhost:27017";

export default function ShowcaseStudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();

      console.log("SHOWCASE STUDENTS:", data);

      setStudents(data);
    } catch (error) {
      console.error("STUDENTS SHOWCASE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

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

        <div className="mb-8">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            {students.length} Students
          </span>
        </div>

        {students.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-gray-500">No students found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <div
                key={student._id}
                className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  {student.profilePhoto ? (
                    <img
                      src={getProfileImageUrl(student.profilePhoto)}
                      alt={student.name}
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

                    <p className="text-sm text-gray-500">{student.email}</p>

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

                {student.skills?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {student.skills.slice(0, 5).map((skill: string, index: number) => (
                      <span
                        key={index}
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
            ))}
          </div>
        )}
      </section>
    </main>
  );
}