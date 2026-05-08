import api from "./axios";

export const createLecture = async (courseId, payload) => {
  const res = await api.post(`/course/${courseId}/lecture`, payload);
  return res.data;
};