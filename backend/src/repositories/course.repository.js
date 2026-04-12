import courseModel from "../models/nosql/course.model.js";

// Create course
export const createCourse = async (data) => {
  return await courseModel.create(data);
};

// GEt All Courses
export const getAllCourses = async ({ query, skip, limit }) => {
  const courses = await courseModel
    .find(query)
    .select("-lectures")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await courseModel.countDocuments(query);

  return { courses, total };
};

// Update Course
export const updateCourseById = async (courseId, updateData) => {
  return await courseModel
    .findByIdAndUpdate(
      courseId,
      { $set: updateData },
      {
        new: true, // return updated doc
        runValidators: true,
      },
    )
    .populate("createdBy", "name")
    .lean();
};

// Get course by ID
export const getCourseById = async (courseId) => {
  return await courseModel.findById(courseId);
};

// Get course (lean for read-only)
export const getCourseByIdLean = async (courseId) => {
  return await courseModel.findById(courseId).lean();
};

// Save course (after modifications)
export const saveCourse = async (courseDoc) => {
  return await courseDoc.save();
};

// Delete (soft delete)
export const deleteCourseById = async (courseId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    { new: true },
  );
};

/* -------------------- SECTION -------------------- */

// Add section
export const addSection = async (courseId, sectionData) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    {
      $push: { sections: sectionData },
    },
    { new: true },
  );
};

// Get section
export const getSection = async (courseId, sectionId) => {
  const course = await courseModel.findById(courseId);
  return course?.sections.id(sectionId);
};

/* -------------------- LECTURE -------------------- */

// Add lecture
export const addLecture = async (courseId, sectionId, lectureData) => {
  return await courseModel.findOneAndUpdate(
    { _id: courseId, "sections._id": sectionId },
    {
      $push: { "sections.$.lectures": lectureData },
    },
    { new: true },
  );
};

// Get lecture
export const getLecture = async (courseId, sectionId, lectureId) => {
  const course = await courseModel.findById(courseId);

  const section = course?.sections.id(sectionId);
  return section?.lectures.id(lectureId);
};

// Update lecture
export const updateLecture = async (
  courseId,
  sectionId,
  lectureId,
  updateData,
) => {
  return await courseModel.findOneAndUpdate(
    {
      _id: courseId,
      "sections._id": sectionId,
      "sections.lectures._id": lectureId,
    },
    {
      $set: {
        "sections.$[section].lectures.$[lecture]": updateData,
      },
    },
    {
      arrayFilters: [
        { "section._id": sectionId },
        { "lecture._id": lectureId },
      ],
      new: true,
    },
  );
};

// Delete lecture
export const deleteLecture = async (courseId, sectionId, lectureId) => {
  return await courseModel.findOneAndUpdate(
    { _id: courseId, "sections._id": sectionId },
    {
      $pull: {
        "sections.$.lectures": { _id: lectureId },
      },
    },
    { new: true },
  );
};
