"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllStudents } from "@/services/studentService";
import { getAllProjects } from "@/services/projectService";
import { getAllProducts } from "@/services/productService";

export default function HomePage() {
  const router = useRouter();

  const [students, setStudents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [studentsData, projectsData, productsData] = await Promise.all([
        getAllStudents(),
        getAllProjects(),
        getAllProducts(),
      ]);

      setStudents(studentsData);
      setProjects(projectsData);
      setProducts(productsData);
    } catch (error) {
      console.error("HOME PAGE DATA ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProjects = projects
    .filter((project) => project.isFeatured)
    .slice(0, 4);

  const visibleProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-10 lg:flex-row lg:px-12">
        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600">
            🚀 Showcase Your Talent
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
            Turn Your
            <br />
            <span className="text-purple-600">Student Projects</span>
            <br />
            Into A Portfolio
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Empowering students with practical coding skills, real-world projects, and
            portfolio-ready experience to prepare them for internships, hackathons, and
            future tech careers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <button
              onClick={() => router.push("/projects")}
              className="rounded-xl bg-purple-600 px-8 py-4 font-medium text-white transition hover:bg-purple-700"
            >
              Explore Projects
            </button>

            <button
              onClick={() => router.push("/projects/create")}
              className="rounded-xl border border-gray-300 px-8 py-4 font-medium transition hover:bg-gray-100"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div className="relative h-[450px] w-[350px] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600 shadow-2xl">
            {/* Floating circles */}
            <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white/20"></div>
            <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-white/20"></div>

            {/* Main Avatar */}
            <div className="absolute left-1/2 top-16 flex -translate-x-1/2 flex-col items-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-purple-600 shadow-xl">
                👨‍💻
              </div>

              <div className="mt-4 rounded-2xl bg-white/90 px-5 py-3 text-center shadow-lg">
                <h4 className="font-bold text-gray-900">
                  Future Coders
                </h4>
                <p className="text-sm text-gray-600">
                  Computer Classes
                </p>
              </div>
            </div>

            {/* Skills cards */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/90 p-2 text-center shadow">
                <p className="text-xl">💻</p>
                <p className="text-xs font-semibold">Web Dev</p>
              </div>

              <div className="rounded-2xl bg-white/90 p-3 text-center shadow">
                <p className="text-xl">🤖</p>
                <p className="text-xs font-semibold">AI Basics</p>
              </div>

              <div className="rounded-2xl bg-white/90 p-3 text-center shadow">
                <p className="text-xl">📚</p>
                <p className="text-xs font-semibold">DSA</p>
              </div>

              <div className="rounded-2xl bg-white/90 p-3 text-center shadow">
                <p className="text-xl">🚀</p>
                <p className="text-xs font-semibold">Projects</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-10 top-10 rounded-2xl bg-white p-4 shadow-xl">
            <h4 className="font-semibold">Students</h4>
            <p className="text-sm text-gray-500">
              {students.length}+ Registered
            </p>
          </div>

          <div className="absolute -right-8 bottom-16 rounded-2xl bg-white p-4 shadow-xl">
            <h4 className="font-semibold">{projects.length} Projects</h4>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 text-center shadow">
            <h2 className="text-4xl font-bold text-purple-600">
              {projects.length}
            </h2>
            <p className="mt-2 text-gray-600">Projects</p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow">
            <h2 className="text-4xl font-bold text-purple-600">
              {students.length}
            </h2>
            <p className="mt-2 text-gray-600">Students</p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow">
            <h2 className="text-4xl font-bold text-purple-600">
              {products.length}
            </h2>
            <p className="mt-2 text-gray-600">Products</p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow">
            <h2 className="text-4xl font-bold text-purple-600">
              10+
            </h2>
            <p className="mt-2 text-gray-600">Technologies</p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-bold">Featured Projects</h2>

          <button
            onClick={() => router.push("/projects")}
            className="font-medium text-purple-600 hover:underline"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            Loading featured projects...
          </div>
        ) : visibleProjects.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">No projects found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {visibleProjects.map((project) => (
              <div
                key={project._id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                {project.screenshot ? (
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-purple-100 text-gray-400">
                    No Screenshot
                  </div>
                )}

                <div className="p-5">
                  {project.isFeatured && (
                    <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      ⭐ Featured
                    </span>
                  )}

                  <h3 className="line-clamp-1 font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {project.description}
                  </p>

                  {project.techStack?.length > 0 && (
                    <p className="mt-3 line-clamp-1 text-sm text-purple-600">
                      {project.techStack.join(" • ")}
                    </p>
                  )}

                  <button
                    onClick={() => router.push("/projects")}
                    className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-bold">Featured Products</h2>

          <button
            onClick={() => router.push("/products")}
            className="font-medium text-purple-600 hover:underline"
          >
            View All →
          </button>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                {product.image ? (
                  <img
                    src={
                      product.image.startsWith("http")
                        ? product.image
                        : product.image.startsWith("/uploads")
                          ? `http://localhost:27017${product.image}`
                          : `http://localhost:27017/uploads/${product.image}`
                    }
                    alt={product.name}
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-green-100 text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  {product.isFeatured && (
                    <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      ⭐ Featured
                    </span>
                  )}

                  <h3 className="line-clamp-1 font-bold">{product.name}</h3>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {product.description || "No description added"}
                  </p>

                  <p className="mt-3 font-semibold text-green-600">
                    ₹{product.price || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}