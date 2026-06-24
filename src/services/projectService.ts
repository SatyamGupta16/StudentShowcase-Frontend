import api from "@/lib/api";
import { getToken } from "@/utils/storage";

// GET ALL PROJECTS
export const getAllProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

// GET PROJECT BY ID
export const getProjectById = async (
  id: string
) => {
  const res = await api.get(
    `/projects/${id}`
  );

  return res.data;
};

// CREATE PROJECT
export const createProject = async (
  projectData: FormData
) => {
  const token = getToken();

  const res = await api.post(
    "/projects",
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

// UPDATE PROJECT
export const updateProject = async (
  id: string,
  projectData: any
) => {
  const token = getToken();

  const res = await api.put(
    `/projects/${id}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// DELETE PROJECT
export const deleteProject = async (
  id: string
) => {
  const token = getToken();

  const res = await api.delete(
    `/projects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};