import {
  createCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../repositories/course.repository.js";
import {uploadToImageKit, deleteFromImageKit } from "../utils/avatar.util.js";
import ApiError from "../utils/error.util.js";
import logger from "../utils/logger.util.js";

const createCourseService = async ({
  title,
  description,
  category,
  createdBy,
  file,
}) => {
  try {
    logger.info("CreateCourseService called");

    if (!title || !description || !category || !createdBy) {
      throw new ApiError("All fields are required", 400);
    }

    let thumbnailData = {};

    if (file) {
      logger.info("Uploading thumbnail to ImageKit");

      const uploaded = await uploadToImageKit(file, "/lms/course");

      if (!uploaded) {
        throw new ApiError("Thumbnail upload failed", 500);
      }

      thumbnailData = {
        public_id: uploaded.public_id,
        secure_url: uploaded.secure_url,
      };
    }

    const course = await createCourse({
      title,
      description,
      category,
      createdBy,
      thumbnail: thumbnailData,
    });
    if (!course) {
      throw new ApiError(
        "course could not created, please try again later",
        500,
      );
    }

    logger.info("Course created successfully", { courseId: course._id });

    return { course };
  } catch (error) {
    logger.error("Error in createCourseService", {
      message: error.message,
    });
    throw error;
  }
};

const getAllCourseService = async ({
  page = 1,
  limit = 10,
  search,
  category,
}) => {
  try {
    logger.info("getAllCourseService called", {
      page,
      limit,
      search,
      category,
    });

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    logger.info("Query constructed for fetching courses", { query });

    const skip = (page - 1) * limit;

    logger.info("Pagination calculated", {
      skip,
      limit,
    });

    const { courses, total } = await getAllCourses({
      query,
      skip,
      limit,
    });

    logger.info("Courses fetched from DB", {
      total,
      fetchedCount: courses.length,
    });

    const totalPages = Math.ceil(total / limit);

    logger.info("Pagination metadata prepared", {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages,
    });

    return {
      courses,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    };
  } catch (error) {
    logger.error("Error in getAllCourseService", {
      message: error.message,
      stack: error.stack,
      page,
      limit,
      search,
      category,
    });

    throw error;
  }
};

const getCourseByIdService = async (courseId) => {
  try {
    logger.info("getCourseByIdService called", { courseId });

    const course = await getCourseById(courseId);

    if (!course) {
      logger.warn("Course not found", { courseId });
      throw new ApiError("course not found", 404);
    }

    logger.info("Course fetched successfully", {
      courseId: course._id,
    });

    return course;
  } catch (error) {
    logger.error("Error in getCourseByIdService", {
      message: error.message,
      stack: error.stack,
      courseId,
    });

    throw error;
  }
};


const updateCourseService = async ({ courseId, updateData, file, userId }) => {
  try {
    logger.info("updateCourseService called", {
      courseId,
      userId,
      hasFile: !!file,
      updateFields: Object.keys(updateData || {}),
    });

    const existingCourse = await getCourseById(courseId);

    if (!existingCourse) {
      logger.warn("Course not found", { courseId });
      throw new ApiError("Course not found", 404);
    }

    if (userId && existingCourse.createdBy.toString() !== userId) {
      logger.warn("Unauthorized update attempt", {
        courseId,
        userId,
        ownerId: existingCourse.createdBy.toString(),
      });
      throw new ApiError("Unauthorized", 403);
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      logger.warn("Empty update payload", { courseId });
      throw new ApiError("No data provided for update", 400);
    }

    logger.info("Updating course fields", {
      courseId,
      updateData,
    });

    let updatedCourse = await updateCourseById(courseId, updateData);

    if (file) {
      try {
        logger.info("Uploading thumbnail (optional)", { courseId });

        const uploaded = await uploadToImageKit(file, "/lms/course");

        if (uploaded) {
          updatedCourse.thumbnail = {
            public_id: uploaded.public_id,
            secure_url: uploaded.secure_url,
          };

          await updatedCourse.save();

          logger.info("Thumbnail updated successfully", {
            courseId,
            public_id: uploaded.public_id,
          });
        } else {
          logger.warn("Thumbnail upload returned no data", { courseId });
        }
      } catch (uploadError) {
        logger.error("Thumbnail upload failed (non-blocking)", {
          message: uploadError.message,
          courseId,
        });
      }
    }

    logger.info("Course update completed", { courseId });

    return updatedCourse;
  } catch (error) {
    logger.error("Error in updateCourseService", {
      message: error.message,
      stack: error.stack,
      courseId,
      userId,
    });

    throw error;
  }
};


const deleteCourseService = async ({ courseId, userId }) => {
  try {
    logger.info("deleteCourseService called", {
      courseId,
      userId,
    });

    const existingCourse = await getCourseById(courseId);

    if (!existingCourse) {
      logger.warn("Course not found", { courseId });
      throw new ApiError("Course not found", 404);
    }

    // ✅ Authorization check
    if (userId && existingCourse.createdBy.toString() !== userId) {
      logger.warn("Unauthorized delete attempt", {
        courseId,
        userId,
        ownerId: existingCourse.createdBy.toString(),
      });
      throw new ApiError("Unauthorized", 403);
    }

    //  delete thumbnail from ImageKit (non-blocking)
    if (existingCourse.thumbnail?.public_id) {
      try {
        logger.info("Deleting thumbnail from ImageKit", {
          courseId,
          public_id: existingCourse.thumbnail.public_id,
        });

        await deleteFromImageKit(existingCourse.thumbnail.public_id);

        logger.info("Thumbnail deleted from ImageKit", { courseId });
      } catch (imgError) {
        // ⚠️ Do NOT block course deletion
        logger.error("Failed to delete thumbnail (non-blocking)", {
          message: imgError.message,
          courseId,
        });
      }
    }

    // ✅ Delete course from DB
    logger.info("Deleting course from DB", { courseId });

    const deletedCourse = await deleteCourseById(courseId);

    logger.info("Course deleted successfully", { courseId });

    return deletedCourse;
  } catch (error) {
    logger.error("Error in deleteCourseService", {
      message: error.message,
      stack: error.stack,
      courseId,
      userId,
    });

    throw error;
  }
};

export {
  createCourseService,
  getAllCourseService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
};
