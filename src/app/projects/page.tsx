"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    getAllProjects,
    deleteProject,
} from "@/services/projectService";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getAllProjects();

            console.log(
                "PROJECTS API RESPONSE:",
                data
            );

            console.log(
                "FIRST PROJECT STUDENT:",
                data?.[0]?.student
            );

            console.log(
                "ALL PROJECT STUDENTS:",
                data.map((project: any) => ({
                    title: project.title,
                    student: project.student,
                }))
            );

            setProjects(data);
        } catch (error) {
            console.error(
                "PROJECTS ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (
        id: string
    ) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this project?"
            );

        if (!confirmDelete) return;

        try {
            await deleteProject(id);

            alert(
                "Project deleted successfully"
            );

            fetchProjects();
        } catch (error) {
            console.error(error);

            alert(
                "Failed to delete project"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-lg font-semibold">
                Loading Projects...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-8">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-4xl font-bold">
                    Projects
                </h1>

                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                    {projects.length} Projects
                </span>
            </div>

            {projects.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center">
                    <p className="text-gray-500">
                        No projects found.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Screenshot */}
                            {project.screenshot ? (
                                <img
                                    src={project.screenshot}
                                    alt={project.title}
                                    className="h-48 w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://placehold.co/600x400?text=No+Image";
                                    }}
                                />
                            ) : (
                                <div className="flex h-48 items-center justify-center bg-slate-100 text-gray-400">
                                    No Screenshot
                                </div>
                            )}

                            <div className="p-6">
                                {/* Featured Badge */}
                                {project.isFeatured && (
                                    <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                        ⭐ Featured
                                    </span>
                                )}

                                {/* Title */}
                                <h2 className="text-xl font-bold">
                                    {project.title}
                                </h2>

                                {/* Description */}
                                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                    {project.description}
                                </p>

                                {/* Student Info */}
                                <div className="mt-4 border-t pt-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                                        Created By
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {project.student?.name ||
                                            "Unknown Student"}
                                    </p>

                                    {project.student?.email && (
                                        <p className="text-sm text-gray-500">
                                            {project.student.email}
                                        </p>
                                    )}
                                </div>

                                {/* Tech Stack */}
                                {project.techStack?.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.techStack.map(
                                            (
                                                tech: string,
                                                index: number
                                            ) => (
                                                <span
                                                    key={index}
                                                    className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}

                                {/* Links */}
                                {/* Actions */}

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/projects/${project._id}`
                                            )
                                        }
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(project._id)
                                        }
                                        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
                                    >
                                        GitHub
                                    </a>

                                    <a
                                        href={project.liveDemoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                                    >
                                        Live Demo
                                    </a>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}