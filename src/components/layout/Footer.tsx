import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-purple-600">
              Student Project Showcase
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              A platform where students can showcase their projects, products,
              skills, and portfolio work in one place.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
              <Link href="/" className="transition hover:text-purple-600">
                Home
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
                Products
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Tech Stack
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Built with Next.js, TypeScript, Tailwind CSS, Express.js,
              MongoDB, and JWT authentication.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                Next.js
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                MongoDB
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                TypeScript
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026 Student Project Showcase. All rights reserved.
          </p>

          <p className="font-medium text-purple-600">
            Made by Satyam Gupta
          </p>
        </div>
      </div>
    </footer>
  );
}