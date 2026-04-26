import api from "./axios";

// Create Course
export const createCourse = async (data) => {
  return await api.post("/course/create", data);
};

// Get All Courses
export const getAllCourses = async () => {
  return await api.get("/course/all");
};

// Get Published Courses
export const getPublishedCourses = async () => {
  return await api.get("/course/published");
};

// Get Course By ID
export const getCourseById = async (id) => {
  return await api.get(`/course/id/${id}`);
};

// Get Course By Slug
export const getCourseBySlug = async (slug) => {
  return await api.get(`/course/${slug}`);
};

/**
 * Instructor / Admin Routes
 */

// Get Instructor Courses
export const getInstructorCourses = async () => {
  return await api.get("/course/instructor/my-courses");
};

// Update Course
export const updateCourse = async (id, data) => {
  return await api.put(`/course/${id}`, data);
};

// Publish Course
export const publishCourse = async (id) => {
  return await api.patch(`/course/${id}/publish`);
};

// Unpublish Course
export const unpublishCourse = async (id) => {
  return await api.patch(`/course/${id}/unpublish`);
};

// Delete Course
export const deleteCourse = async (id) => {
  return await api.delete(`/course/${id}`);
};
