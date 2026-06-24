"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAllStudents,
  deleteStudent,
} from "@/services/studentService";

export default function StudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();

      console.log(
        "Students API Response:",
        data
      );

      setStudents(data);
    } catch (error) {
      console.error(
        "Students Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      alert(
        "Student deleted successfully"
      );

      fetchStudents();
    } catch (error) {
      console.error(
        "Delete Error:",
        error
      );

      alert(
        "Failed to delete student"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Students...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Students
      </h1>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>
              <th className="p-4 text-left">
                Email
              </th>
              <th className="p-4 text-left">
                Batch
              </th>
              <th className="p-4 text-left">
                Featured
              </th>
              <th className="p-4 text-left">
                Actions
              </th>
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
                <tr
                  key={student._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {student.name}
                  </td>

                  <td className="p-4">
                    {student.email}
                  </td>

                  <td className="p-4">
                    {student.batch}
                  </td>

                  <td className="p-4">
                    {student.isFeatured
                      ? "Yes"
                      : "No"}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/students/${student._id}`
                        )
                      }
                      className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(student._id)
                      }
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
  );
}