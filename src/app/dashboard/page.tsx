"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";

import { removeToken } from "@/utils/storage";
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
  }, []);

  const stats = useMemo(() => {
    const featuredStudents = students.filter((student) => student.isFeatured);
    const featuredProjects = projects.filter((project) => project.isFeatured);
    const featuredProducts = products.filter((product) => product.isFeatured);

    return {
      totalStudents: students.length,
      totalProjects: projects.length,
      totalProducts: products.length,
      featuredStudents: featuredStudents.length,
      featuredProjects: featuredProjects.length,
      featuredProducts: featuredProducts.length,
    };
  }, [students, projects, products]);

  const recentStudents = useMemo(() => {
    return [...students].slice(-5).reverse();
  }, [students]);

  const recentProjects = useMemo(() => {
    return [...projects].slice(-5).reverse();
  }, [projects]);

  const recentProducts = useMemo(() => {
    return [...products].slice(-5).reverse();
  }, [products]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
          Loading Dashboard...
        </div>
      </AdminGuard>
    );
  }

  if (error) {
    return (
      <AdminGuard>
        <div className="flex min-h-screen items-center justify-center text-red-500">
          {error}
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl p-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-purple-600">
                Admin Panel
              </p>

              <h1 className="text-4xl font-bold">
                Dashboard
              </h1>

              <p className="mt-2 text-muted-foreground">
                Manage students, projects, creations and featured showcase
                content.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
              >
                View Website
              </Button>

              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  {stats.totalStudents}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {stats.featuredStudents} featured students
                </p>
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
                  {stats.totalProjects}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {stats.featuredProjects} featured projects
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => router.push("/products")}
              className="cursor-pointer transition hover:scale-[1.02] hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle className="text-gray-500">
                  Total Creations
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-5xl font-bold text-green-600">
                  {stats.totalProducts}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {stats.featuredProducts} featured creations
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow">
            <div className="mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create and manage records faster
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => router.push("/students/create")}
              >
                Add Student
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/students")}
              >
                View Students
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/projects/create")}
              >
                Add Project
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/projects")}
              >
                View Projects
              </Button>

              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/products/create")}
              >
                Add Creation
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/products")}
              >
                View Creations
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {recentStudents.length === 0 ? (
                  <p className="text-gray-500">No students found</p>
                ) : (
                  recentStudents.map((student) => (
                    <button
                      key={student._id}
                      onClick={() => router.push(`/students/${student._id}`)}
                      className="w-full rounded-xl border p-4 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">
                            {student.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {student.email}
                          </p>
                        </div>

                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
                          {student.batch || student.year || "N/A"}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {recentProjects.length === 0 ? (
                  <p className="text-gray-500">No projects found</p>
                ) : (
                  recentProjects.map((project) => (
                    <button
                      key={project._id}
                      onClick={() => router.push(`/projects/${project._id}`)}
                      className="w-full rounded-xl border p-4 text-left transition hover:bg-slate-50"
                    >
                      <h3 className="font-semibold">
                        {project.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {project.description}
                      </p>

                      {project.isFeatured && (
                        <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          ⭐ Featured
                        </span>
                      )}
                    </button>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Creations</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {recentProducts.length === 0 ? (
                  <p className="text-gray-500">No creations found</p>
                ) : (
                  recentProducts.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => router.push(`/products/${product._id}`)}
                      className="w-full rounded-xl border p-4 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {product.category || "No type added"}
                          </p>
                        </div>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                          {product.price ? `₹${product.price}` : "Portfolio"}
                        </span>
                      </div>

                      {product.isFeatured && (
                        <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          ⭐ Featured
                        </span>
                      )}
                    </button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}