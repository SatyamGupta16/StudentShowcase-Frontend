import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow-md">
            <Link href="/">
                <h1 className="text-2xl font-bold text-purple-600">
                    Student Project Showcase
                </h1>
            </Link>

            <div className="flex items-center gap-6">
                <Link
                    href="/"
                    className="transition hover:text-purple-600"
                >
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

                <Link
                    href="/dashboard"
                    className="transition hover:text-purple-600"
                >
                    Dashboard
                </Link>

                <Link
                    href="/login"
                    className="transition hover:text-purple-600"
                >
                    Login
                </Link>

                <Link
                    href="/register"
                    className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                >
                    Register
                </Link>
            </div>
        </nav>
    );
}