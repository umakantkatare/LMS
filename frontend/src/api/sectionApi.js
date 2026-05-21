import api from "./axios";

export const addSection = async (courseId, payload) => {
  const res = await api.post(`/section/course/${courseId}`, payload);
  return res.data;
};
