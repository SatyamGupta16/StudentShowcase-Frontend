import { Student } from "./student";

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack?: string[] | string;
  githubLink?: string;
  liveLink?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  screenshot?: string;
  isFeatured?: boolean;
  student?: Student | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  techStack?: string[] | string;
  githubLink?: string;
  liveLink?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  screenshot?: File | string | null;
  isFeatured?: boolean;
  student?: string;
}