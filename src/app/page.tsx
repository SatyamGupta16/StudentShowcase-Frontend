"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { getAllStudents } from "@/services/studentService";
import { getAllProjects } from "@/services/projectService";
import { getAllProducts } from "@/services/productService";

import { Student } from "@/types/student";
import { Project } from "@/types/project";
import { Product } from "@/types/product";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:27017";

export default function HomePage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [studentsData, projectsData, productsData] = await Promise.all([
          getAllStudents(),
          getAllProjects(),
          getAllProducts(),
        ]);

        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error("HOME PAGE DATA ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const featuredProjects = projects
    .filter((project) => project.isFeatured)
    .slice(0, 4);

  const visibleProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  const featuredCreations = products
    .filter((product) => product.isFeatured)
    .slice(0, 4);

  const visibleCreations =
    featuredCreations.length > 0 ? featuredCreations : products.slice(0, 4);

  const getUploadImageUrl = (image?: string) => {
    if (!image) return "";

    if (image.startsWith("http://localhost:27017/uploads")) {
      return image.replace("http://localhost:27017", BACKEND_URL);
    }

    if (image.startsWith("https://studentshowcase-backend.onrender.com")) {
      return image;
    }

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/uploads")) {
      return `${BACKEND_URL}${image}`;
    }

    return `${BACKEND_URL}/uploads/${image}`;
  };

  const getProjectTechStack = (techStack?: string[] | string) => {
    if (!techStack) return "";

    if (Array.isArray(techStack)) {
      return techStack.join(" • ");
    }

    return techStack;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-10 lg:flex-row lg:px-12">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600">
            🚀 Prompt Computer Classes Student Project Showcase
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
            Turn Your
            <br />
            <span className="text-purple-600">Student Projects</span>
            <br />
            Into A Portfolio
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            A student project showcase platform for Prompt Computer Classes
            where students can display their projects, portfolios, skills,
            creative work, and achievements for parents, visitors, and
            admissions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <button
              onClick={() => router.push("/showcase/projects")}
              className="rounded-xl bg-purple-600 px-8 py-4 font-medium text-white transition hover:bg-purple-700"
            >
              Explore Projects
            </button>

            <button
              onClick={() => router.push("/showcase/students")}
              className="rounded-xl border border-gray-300 px-8 py-4 font-medium transition hover:bg-gray-100"
            >
              View Students
            </button>
          </div>
        </div>

        <div className="relative hidden items-center justify-center lg:flex">
          <div className="relative h-[450px] w-[350px] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600 shadow-2xl">
            <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white/20" />
            <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-white/20" />

            <div className="absolute left-1/2 top-16 flex -translate-x-1/2 flex-col items-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-purple-600 shadow-xl">
                👨‍💻
              </div>

              <div className="mt-4 rounded-2xl bg-white/90 px-5 py-3 text-center shadow-lg">
                <h4 className="font-bold text-gray-900">Prompt Coders</h4>
                <p className="text-sm text-gray-600">Computer Classes</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/90 p-3 text-center shadow">
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
            <p className="mt-2 text-gray-600">Creations</p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow">
            <h2 className="text-4xl font-bold text-purple-600">10+</h2>
            <p className="mt-2 text-gray-600">Technologies</p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-950 md:text-4xl">
          About Prompt Computer Classes Student Project Showcase
        </h2>

        <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">
          Prompt Computer Classes Student Project Showcase is a full-stack web
          platform where students can showcase their projects, portfolios,
          technical skills, and creative work. It helps parents, visitors, and
          new students explore the practical work done by students at Prompt
          Computer Classes.
        </p>

        <p className="mt-4 text-base leading-8 text-gray-600 md:text-lg">
          This platform includes student profiles, project details, creations,
          achievements, and technology-based work built using modern web
          development tools like Next.js, TypeScript, Node.js, Express.js, and
          MongoDB.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            Student Projects
          </span>
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Student Portfolios
          </span>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Coding Skills
          </span>
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
            Creative Work
          </span>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-950">
              Featured Student Projects
            </h2>
            <p className="mt-2 text-gray-600">
              Explore practical projects created by Prompt Computer Classes
              students.
            </p>
          </div>

          <button
            onClick={() => router.push("/showcase/projects")}
            className="shrink-0 font-medium text-purple-600 hover:underline"
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
                  <Image
                    src={getUploadImageUrl(project.screenshot)}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-40 w-full object-cover"
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

                  <h3 className="line-clamp-1 font-bold text-gray-950">
                    {project.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {project.description}
                  </p>

                  {project.techStack && (
                    <p className="mt-3 line-clamp-1 text-sm text-purple-600">
                      {getProjectTechStack(project.techStack)}
                    </p>
                  )}

                  <button
                    onClick={() =>
                      router.push(`/showcase/projects/${project._id}`)
                    }
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

      {/* Featured Creations */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-950">
              Featured Student Creations
            </h2>
            <p className="mt-2 text-gray-600">
              Explore creative and technical work by Prompt Computer Classes
              students.
            </p>
          </div>

          <button
            onClick={() => router.push("/showcase/products")}
            className="shrink-0 font-medium text-purple-600 hover:underline"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            Loading featured creations...
          </div>
        ) : visibleCreations.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">No creations found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {visibleCreations.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                {product.image ? (
                  <Image
                    src={getUploadImageUrl(product.image)}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-green-100 text-gray-400">
                    No Creation Thumbnail
                  </div>
                )}

                <div className="p-5">
                  {product.isFeatured && (
                    <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      ⭐ Featured
                    </span>
                  )}

                  <h3 className="line-clamp-1 font-bold text-gray-950">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {product.description || "No description added"}
                  </p>

                  {product.category && (
                    <p className="mt-3 text-sm font-semibold text-green-600">
                      {product.category}
                    </p>
                  )}

                  <button
                    onClick={() =>
                      router.push(`/showcase/products/${product._id}`)
                    }
                    className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
                  >
                    View Creation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why This Platform */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-950 md:text-4xl">
              Why Prompt Computer Classes Uses This Showcase
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
              This platform helps parents, visitors, and new students see real
              practical work instead of only reading about courses. Students can
              build confidence by presenting their projects and portfolios
              publicly.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-950">
                For Students
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Students can showcase their projects, skills, GitHub links,
                live demos, and creative work in one professional place.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-950">
                For Parents
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Parents can easily see what students are learning and building
                at Prompt Computer Classes through real project examples.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-950">
                For Visitors
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                New visitors can understand the practical learning environment,
                student progress, and project-based training approach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}