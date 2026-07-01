"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const router = useRouter();

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  useEffect(() => {
    // Not logged in
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Logged in but not admin
    if (user && user.role !== "admin") {
      router.replace("/dashboard/student");
    }
  }, [isAuthenticated, user, router]);

  // Prevent UI flash while redirecting
  if (
    !isAuthenticated ||
    !user ||
    user.role !== "admin"
  ) {
    return null;
  }

  const dashboardCards = [
    {
      title: "Manage Users",
      description:
        "View, create, edit, and delete registered users.",
      buttonText: "Open Users",
      path: "/users",
    },
    {
      title: "Manage Projects",
      description:
        "Create and manage all student project showcase entries.",
      buttonText: "Open Projects",
      path: "/projects",
    },
    {
      title: "Manage Creations",
      description:
        "Manage uploaded creations, products, tools, and prototypes.",
      buttonText: "Open Creations",
      path: "/products",
    },
    {
      title: "Public Users Showcase",
      description:
        "View the public student/user showcase page.",
      buttonText: "View Users",
      path: "/showcase/users",
    },
    {
      title: "Public Projects Showcase",
      description:
        "View all public projects displayed on the showcase.",
      buttonText: "View Projects",
      path: "/showcase/projects",
    },
    {
      title: "Public Creations Showcase",
      description:
        "View all public creations displayed on the showcase.",
      buttonText: "View Creations",
      path: "/showcase/products",
    },
  ];

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-lg text-gray-600">
              Welcome,{" "}
              <span className="font-semibold text-purple-700">
                {user.name}
              </span>{" "}
              👋
            </p>

            <div className="mt-3 space-y-1 text-gray-600">
              <p>
                <span className="font-semibold">
                  Role:
                </span>{" "}
                {user.role}
              </p>

              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Admin Access
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Enabled
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Dashboard Type
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Admin
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Project
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Student Showcase
            </h2>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((card) => (
            <div
              key={card.path}
              className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900">
                {card.title}
              </h2>

              <p className="mt-3 min-h-16 text-sm leading-6 text-gray-600">
                {card.description}
              </p>

              <button
                onClick={() => router.push(card.path)}
                className="mt-6 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700"
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}