import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
          404 Error
        </p>

        <h1 className="mt-4 text-5xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            Go Home
          </Link>

          <Link
            href="/showcase/projects"
            className="rounded-lg border bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Explore Projects
          </Link>
        </div>
      </div>
    </div>
  );
}