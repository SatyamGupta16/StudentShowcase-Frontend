import { User } from "./user";

export interface Project {
  _id: string;
  title: string;
  description: string;
  screenshot?: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl: string;
  user: User | string;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  screenshot?: File | string | null;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl: string;
  user?: string;
  isFeatured: boolean;
}