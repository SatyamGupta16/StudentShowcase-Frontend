"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getToken, removeToken } from "@/utils/storage";
import { getAllStudents } from "@/services/studentService";
import { getAllProjects } from "@/services/projectService";
import { getAllProducts } from "@/services/productService";

import { Student } from "@/types/student";
import { Project } from "@/types/project";
import { Product } from "@/types/product";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = getToken();

        if (!token) {
          router.push("/login");
          return;
        }

        const [studentsData, projectsData, productsData] = await Promise.all([
          getAllStudents(),
          getAllProjects(),
          getAllProducts(),
        ]);

        setStudents(studentsData);
        setProjects(projectsData);
        setProducts(productsData);
      } catch (err) {
        console.error("DASHBOARD DATA ERROR:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>

            <p className="mt-2 text-muted-foreground">
              Manage students, projects and products efficiently.
            </p>
          </div>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card
            onClick={() => router.push("/students")}
            className="cursor-pointer transition hover:scale-[1.02] hover:shadow-xl"
          >
            <CardHeader>
              <CardTitle className="text-gray-500">
                Total Students
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-5xl font-bold text-purple-600">
                {students.length}
              </h2>
            </CardContent>
          </Card>

          <Card
            onClick={() => router.push("/projects")}
            className="cursor-pointer transition hover:scale-[1.02] hover:shadow-xl"
          >
            <CardHeader>
              <CardTitle className="text-gray-500">
                Total Projects
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-5xl font-bold text-blue-600">
                {projects.length}
              </h2>
            </CardContent>
          </Card>

          <Card
            onClick={() => router.push("/products")}
            className="cursor-pointer transition hover:scale-[1.02] hover:shadow-xl"
          >
            <CardHeader>
              <CardTitle className="text-gray-500">
                Total Products
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-5xl font-bold text-green-600">
                {products.length}
              </h2>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push("/students/create")}
            >
              Add Student
            </Button>

            <Button variant="outline" onClick={() => router.push("/students")}>
              View Students
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/projects/create")}
            >
              Add Project
            </Button>

            <Button variant="outline" onClick={() => router.push("/projects")}>
              View Projects
            </Button>

            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/products/create")}
            >
              Add Product
            </Button>

            <Button variant="outline" onClick={() => router.push("/products")}>
              View Products
            </Button>
          </div>
        </div>

        {/* Recent Students */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {students.length === 0 ? (
              <p className="text-gray-500">No students found</p>
            ) : (
              students
                .slice(-5)
                .reverse()
                .map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center justify-between rounded-xl border p-4"
                  >
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>

                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
                      {student.batch || student.year || "N/A"}
                    </span>
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}