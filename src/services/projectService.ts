import api from "@/lib/api";
import { getToken } from "@/utils/storage";
import { Project, ProjectInput } from "@/types/project";

// GET ALL PROJECTS
export const getAllProjects = async (): Promise<Project[]> => {
  const res = await api.get("/projects");
  return res.data;
};

// GET PROJECT BY ID
export const getProjectById = async (
  id: string
): Promise<Project> => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

// CREATE PROJECT
export const createProject = async (
  projectData: FormData
): Promise<Project> => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.post("/projects", projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// UPDATE PROJECT
export const updateProject = async (
  id: string,
  projectData: ProjectInput | FormData
): Promise<Project> => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const isFormData = projectData instanceof FormData;

  const res = await api.put(`/projects/${id}`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData
        ? {
            "Content-Type": "multipart/form-data",
          }
        : {}),
    },
  });

  return res.data;
};

// DELETE PROJECT
export const deleteProject = async (
  id: string
): Promise<Project> => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};