"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getToken, removeToken } from "@/utils/storage";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(Boolean(token));
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={closeMenu}>
          <h1 className="text-xl font-bold text-purple-600 md:text-2xl">
            Student Project Showcase
          </h1>
        </Link>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg border px-3 py-2 text-sm md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <div className="hidden items-center gap-6 md:flex">
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
            Creations
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="transition hover:text-purple-600"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="border-t bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="transition hover:text-purple-600"
            >
              Home
            </Link>

            <Link
              href="/showcase/projects"
              onClick={closeMenu}
              className="transition hover:text-purple-600"
            >
              Projects
            </Link>

            <Link
              href="/showcase/students"
              onClick={closeMenu}
              className="transition hover:text-purple-600"
            >
              Students
            </Link>

            <Link
              href="/showcase/products"
              onClick={closeMenu}
              className="transition hover:text-purple-600"
            >
              Creations
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="transition hover:text-purple-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 px-4 py-2 text-left text-white transition hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="transition hover:text-purple-600"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}