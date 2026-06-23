"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/utils/storage";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-8">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage students, projects and products efficiently.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          <Card className="transition hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-500">
                Total Students
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-5xl font-bold text-purple-600">
                6
              </h2>
            </CardContent>
          </Card>

          <Card className="transition hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-500">
                Total Projects
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-5xl font-bold text-blue-600">
                0
              </h2>
            </CardContent>
          </Card>

          <Card className="transition hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-500">
                Total Products
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-5xl font-bold text-green-600">
                0
              </h2>
            </CardContent>
          </Card>

        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <Button
              className="bg-purple-600 hover:bg-purple-700"
            >
              Add Student
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Project
            </Button>

            <Button
              className="bg-green-600 hover:bg-green-700"
            >
              Add Product
            </Button>

          </div>
        </div>

        {/* Recent Students */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>
              Recent Students
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <h3 className="font-semibold">
                  Test User
                </h3>

                <p className="text-sm text-gray-500">
                  test61@test.com
                </p>
              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
                2026
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <h3 className="font-semibold">
                  Test User
                </h3>

                <p className="text-sm text-gray-500">
                  test37@test.com
                </p>
              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
                2026
              </span>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}