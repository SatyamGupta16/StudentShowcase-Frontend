import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 shadow-md">
            <h1 className="text-2xl font-bold text-purple-600">
                Student Project Showcase
            </h1>

            <div className="flex gap-6">
                <Link href="/" className="transition hover:text-purple-600">Home</Link>
                <Link href="/projects" className="transition hover:text-purple-600">Projects</Link>
                <Link href="/students" className="transition hover:text-purple-600">Students</Link>
                <Link href="/login" className="transition hover:text-purple-600">Login</Link>
                <Link href="/register" className="transition hover:text-purple-600">Register</Link>
            </div>
        </nav>
    );
}