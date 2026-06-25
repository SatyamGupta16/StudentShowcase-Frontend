"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import {
  getAllStudents,
  deleteStudent,
} from "@/services/studentService";

import { Student } from "@/types/student";

export default function StudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      const data = await getAllStudents();

      console.log("Students API Response:", data);

      setStudents(data);
    } catch (error) {
      console.error("Students Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      alert("Student deleted successfully");

      fetchStudents();
    } catch (error) {
      console.error("Delete Error:", error);

      alert("Failed to delete student");
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex h-screen items-center justify-center">
          Loading Students...
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Students
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all registered students
            </p>
          </div>

          <button
            onClick={() => router.push("/students/create")}
            className="rounded-lg bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700"
          >
            Add Student
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Batch</th>
                <th className="p-4 text-left">Featured</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-gray-500"
                  >
                    No students found.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="p-4">{student.name}</td>

                    <td className="p-4">{student.email}</td>

                    <td className="p-4">
                      {student.batch || student.year || "N/A"}
                    </td>

                    <td className="p-4">
                      {student.isFeatured ? "Yes" : "No"}
                    </td>

                    <td className="flex gap-2 p-4">
                      <button
                        onClick={() =>
                          router.push(`/students/${student._id}`)
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}