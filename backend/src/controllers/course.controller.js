import {
  createCourseService,
  deleteCourseService,
  getAllCourseService,
  getCourseByIdService,
  updateCourseService,
} from "../services/course.service.js";

const createCourse = async (req, res, next) => {
  try {
    const { course, file } = await createCourseService({
      ...req.body,
      file: req.file,
    });

    res.status(201).json({
      success: true,
      message: "create course successfully",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};
const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const updateData = req.body;
    const file = req.file;

    const updatedCourse = await updateCourseService({
      courseId,
      updateData,
      file,
      userId: req.user?.id,
    });

    res.status(200).json({
      success: true,
      message: "course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    next(error);
  }
};
const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const result = await deleteCourseService({
      courseId,
      userId: req.user?.id,
    });

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourse = async (req, res, next) => {
  try {
    const { page, limit, search, category } = req.query;
    const result = await getAllCourseService({
      page,
      limit,
      search,
      category,
    });
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await getCourseByIdService(courseId);
    res.status(200).json({
      success: true,
      message: "course fetched successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCourse,
  getCourseByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
};
