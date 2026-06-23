import api from "@/lib/api";

export const getStudents = async () => {
  const res = await api.get("/students");
  return res.data;
};