import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "About Prompt Computer Classes Student Project Showcase",
  description:
    "Learn about Prompt Computer Classes Student Project Showcase, a platform built to showcase student projects, portfolios, skills, and creative work.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900">
          About Prompt Computer Classes Student Project Showcase
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Prompt Computer Classes Student Project Showcase is a platform created
          to display student projects, portfolios, skills, achievements, and
          creative work in one place.
        </p>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          The purpose of this platform is to help parents, visitors, and new
          students see the practical work done by students at Prompt Computer
          Classes.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            What Students Can Showcase
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
            <li>Web development projects</li>
            <li>Student portfolios</li>
            <li>Technical skills</li>
            <li>Creative work and creations</li>
            <li>GitHub and live project links</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Technology Used
          </h2>

          <p className="mt-4 text-gray-600">
            This platform is built using Next.js, TypeScript, Tailwind CSS,
            Node.js, Express.js, MongoDB, JWT authentication, and image upload
            support.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Built By
          </h2>

          <p className="mt-4 text-gray-600">
            This project is built by Satyam Gupta as a full-stack web
            development project for Prompt Computer Classes.
          </p>
        </section>
      </main>
    </>
  );
}