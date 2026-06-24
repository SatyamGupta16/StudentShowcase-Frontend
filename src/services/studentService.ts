import api from "@/lib/api";
import { getToken } from "@/utils/storage";

// GET ALL STUDENTS
export const getAllStudents = async () => {
  const res = await api.get("/students");

  console.log("STUDENTS API RESPONSE:", res.data);

  return res.data;
};

// GET SINGLE STUDENT
export const getStudentById = async (id: string) => {
  const res = await api.get(`/students/${id}`);

  console.log("SINGLE STUDENT RESPONSE:", res.data);

  return res.data;
};

// CREATE STUDENT
export const createStudent = async (studentData: any) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const isFormData = studentData instanceof FormData;

  const res = await api.post("/students", studentData, {
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

// UPDATE STUDENT
export const updateStudent = async (id: string, studentData: any) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const isFormData = studentData instanceof FormData;

  const res = await api.put(`/students/${id}`, studentData, {
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

// DELETE STUDENT
export const deleteStudent = async (id: string) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.delete(`/students/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};