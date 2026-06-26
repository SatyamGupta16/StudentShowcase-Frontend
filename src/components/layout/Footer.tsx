import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-purple-600">
            Prompt Computer Classes
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
            Prompt Computer Classes Student Project Showcase is a platform
            where students can showcase their projects, portfolios, skills, and
            creative work in one place.
          </p>

          <p className="mt-4 text-sm font-medium text-gray-700">
            Built by{" "}
            <span className="font-semibold text-purple-600">
              Satyam Gupta
            </span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Quick Links
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
            <Link href="/" className="transition hover:text-purple-600">
              Home
            </Link>

            <Link
              href="/about"
              className="transition hover:text-purple-600"
            >
              About
            </Link>

            <Link
              href="/showcase/projects"
              className="transition hover:text-purple-600"
            >
              Projects
            </Link>

            <Link
              href="/showcase/students"
              className="transition hover:text-purple-600"
            >
              Students
            </Link>

            <Link
              href="/showcase/products"
              className="transition hover:text-purple-600"
            >
              Creations
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Tech Stack
          </h3>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
              Next.js
            </span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
              Node.js
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
              TypeScript
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              MongoDB
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        © 2026 Prompt Computer Classes Student Project Showcase. All rights
        reserved. Built by{" "}
        <span className="font-semibold text-purple-600">
          Satyam Gupta
        </span>
        .
      </div>
    </footer>
  );
}