"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import {
  getAllUsers,
  deleteUser,
} from "@/services/userService";

import { User } from "@/types/user";

type UserWithMongoId = User & {
  _id: string;
  year?: string;
};

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<UserWithMongoId[]>([]);
  const [loading, setLoading] = useState(true);

  // =======================
  // Fetch Users
  // =======================
  const fetchUsers = useCallback(async () => {
  try {
    setLoading(true);

    const data = await getAllUsers();

    console.log("USERS API RESPONSE:", data);

    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      setUsers([]);
    }
  } catch (error) {
    console.error("USERS ERROR:", error);
    setUsers([]);
    alert("Failed to load users");
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =======================
  // Delete User
  // =======================
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      alert("User deleted successfully");

      fetchUsers();
    } catch (error) {
      console.error("DELETE USER ERROR:", error);

      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex h-screen items-center justify-center text-lg font-semibold">
          Loading Users...
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-7xl p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Users
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all registered users
            </p>
          </div>

          <button
            onClick={() => router.push("/users/create")}
            className="rounded-lg bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700"
          >
            Add User
          </button>
        </div>

        {/* Table */}
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
                  Role
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
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b"
                  >
                    <td className="p-4">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4 capitalize">
                      {user.role}
                    </td>

                    <td className="p-4">
                      {user.batch || user.year || "N/A"}
                    </td>

                    <td className="p-4">
                      {user.isFeatured ? "Yes" : "No"}
                    </td>

                    <td className="flex gap-2 p-4">
                      <button
                        onClick={() =>
                          router.push(`/users/${user._id}`)
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user._id)
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
    </AdminGuard>
  );
}