import api from "./axios";

export const createLecture = async (courseId, payload) => {
  const res = await api.post(`/lecture/course/${courseId}`, payload);
  return res.data;
};