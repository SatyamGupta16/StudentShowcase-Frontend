"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function StudentDashboard() {
  const router = useRouter();

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user && user.role !== "student") {
      router.replace("/dashboard/admin");
    }
  }, [isAuthenticated, user, router]);

  if (
    !isAuthenticated ||
    !user ||
    user.role !== "student"
  ) {
    return null;
  }

  const userId = user._id || user.id;

  const handleProfileClick = () => {
    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    router.push(`/showcase/users/${userId}`);
  };

  const dashboardCards = [
    {
      title: "My Public Profile",
      description:
        "View your public student profile with skills and linked projects.",
      buttonText: "View Profile",
      onClick: handleProfileClick,
    },
    {
      title: "Explore Projects",
      description:
        "Browse all projects created by students and users.",
      buttonText: "View Projects",
      onClick: () => router.push("/showcase/projects"),
    },
    {
      title: "Explore Creations",
      description:
        "Browse student creations, tools, prototypes, and portfolio items.",
      buttonText: "View Creations",
      onClick: () => router.push("/showcase/products"),
    },
    {
      title: "All Students",
      description:
        "Explore other student profiles and their project work.",
      buttonText: "View Students",
      onClick: () => router.push("/showcase/users"),
    },
  ];

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Student Dashboard
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

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Account Type
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Student
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Profile Status
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Active
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Showcase
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Public
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900">
                {card.title}
              </h2>

              <p className="mt-3 min-h-20 text-sm leading-6 text-gray-600">
                {card.description}
              </p>

              <button
                onClick={card.onClick}
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