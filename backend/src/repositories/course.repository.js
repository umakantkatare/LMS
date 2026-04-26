import courseModel from "../models/nosql/course.model.js";
// repositories/course.repo.js


/**
 * Create Course
 */
export const createCourseRepo = async (payload) => {
  return await courseModel.create(payload);
};

/**
 * Get All Courses
 */
export const getAllCoursesRepo = async (filter = {}) => {
  return await courseModel.find(filter)
    .populate("instructor", "name email")
    .sort({ createdAt: -1 });
};

/**
 * Get Published Courses
 */
export const getPublishedCoursesRepo = async () => {
  return await courseModel.find({
    status: "published",
    isDeleted: false,
  })
    .populate("instructor", "name")
    .sort({ createdAt: -1 });
};

/**
 * Get Single Course By ID
 */
export const getCourseByIdRepo = async (courseId) => {
  return await courseModel.findOne({
    _id: courseId,
    isDeleted: false,
  })
    .populate("instructor", "name email")
    .populate({
      path: "sections",
      populate: {
        path: "lectures",
      },
    });
};

/**
 * Get Course By Slug
 */
export const getCourseBySlugRepo = async (slug) => {
  return await courseModel.findOne({
    slug,
    isDeleted: false,
  })
    .populate("instructor", "name email")
    .populate({
      path: "sections",
      populate: {
        path: "lectures",
      },
    });
};

/**
 * Get Instructor Courses
 */
export const getInstructorCoursesRepo = async (userId) => {
  return await courseModel.find({
    instructor: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });
};

/**
 * Update Course
 */
export const updateCourseRepo = async (courseId, payload) => {
  return await courseModel.findByIdAndUpdate(courseId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Publish Course
 */
export const publishCourseRepo = async (courseId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { status: "published" },
    { new: true }
  );
};

/**
 * Unpublish Course
 */
export const unpublishCourseRepo = async (courseId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { status: "unpublished" },
    { new: true }
  );
};

/**
 * Soft Delete Course
 */
export const deleteCourseRepo = async (courseId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    { new: true }
  );
};

/**
 * Add Section In Course
 */
export const addSectionToCourseRepo = async (courseId, sectionId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { $push: { sections: sectionId } },
    { new: true }
  );
};

/**
 * Remove Section From Course
 */
export const removeSectionFromCourseRepo = async (courseId, sectionId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { $pull: { sections: sectionId } },
    { new: true }
  );
};

// export const createCourse = async (payload) => {
//   return await courseModel.create(payload);
// };

// export const updateCourseThumbnail = async (courseId, thumbnail) => {
//   return await courseModel.findOneAndUpdate(
//     { _id: courseId, isDeleted: false },
//     { thumbnail },
//     { new: true },
//   );
// };

// export const findCourseById = async (courseId) => {
//   return await courseModel.findOne({
//     _id: courseId,
//     isDeleted: false,
//   });
// };

// export const getAllCourses = async ({
//   page = 1,
//   limit = 10,
//   category,
//   search,
// }) => {
//   const skip = (page - 1) * limit;

//   const query = {
//     isDeleted: false,
//   };
//   if (category) {
//     query.category = category;
//   }
//   if (search) {
//     query.title = { $regex: search, $options: "i" };
//   }
//   const courses = await courseModel
//     .find(query)
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit);

//   const total = await courseModel.countDocuments(query);
//   return {
//     courses,
//     total,
//     page,
//     totalPages: Math.ceil(total / limit),
//   };
// };

// export const updateCourseById = async (courseId, payload) => {
//   return await courseModel.findOneAndUpdate(
//     {
//       _id: courseId,
//       isDeleted: false,
//     },
//     payload,
//     {
//       new: true,
//       runValidators: true,
//     },
//   );
// };

// export const softDeleteCourse = async (courseId) => {
//   return await courseModel.findByIdAndUpdate(
//     {
//       _id: courseId,
//     },
//     {
//       isDeleted: true,
//     },
//     { new: true },
//   );
// };

// export const PubliceCourse = async (courseId) => {
//   return await courseModel.findByIdAndUpdate(
//     courseId,
//     { isPublished: true },
//     { new: true },
//   );
// };

// // Instructor
// export const getCourseByInstructure = async (InstructorId) => {
//   return await courseModel
//     .find({
//       createdAt: InstructorId,
//       isDeleted: false,
//     })
//     .sort({ createdAt: -1 });
// };

// // section
// export const addSection = async (courseId, title) => {
//   const course = await findCourseById(courseId);
//   if (!course) return null;
//   course.sections.push({ title });
//   await course.save();

//   return course;
// };

// export const updateSection = async (courseId, sectionId, payload) => {
//   const course = await findCourseById(courseId);
//   if (!course) return null;

//   const section = course.sections.id(sectionId);

//   if (!section) return null;

//   Object.assign(section, payload);
//   await course.save();
//   return course;
// };

// export const deleteSection = async (courseId, sectionId) => {
//   const course = findCourseById(courseId);

//   if (!course) return null;
//   course.sections.pull(sectionId);
//   await course.save();
//   return course;
// };

// // lecture

// export const addLecture = async (courseId, sectionId, lectureData) => {
//   const course = await findCourseById(courseId);

//   if (!course) return null;

//   const section = course.sections.id(sectionId);

//   if (!section) return null;

//   section.lectures.push(lectureData);

//   await course.save();
//   return course;
// };

// export const updateLectureVideo = async (
//   courseId,
//   sectionId,
//   lectureId,
//   video,
// ) => {
//   const course = await findCourseById(courseId);
//   if (!course) return null;
//   const section = await course.sections.id(sectionId);
//   if (!section) return null;
//   const lecture = section.lectures.id(lectureId);
//   if (!lecture) return null;
//   lecture.video = video;
//   await course.save();
//   return course;
// };
// export const updateLecture = async (
//   courseId,
//   sectionId,
//   lectureId,
//   payload,
// ) => {
//   const course = await findCourseById(courseId);
//   if (!course) return null;

//   const section = course.sections.id(sectionId);
//   if (!section) return null;

//   const lecture = section.lectures.id(lectureId);
//   if (!lecture) return null;

//   Object.assign(lecture, payload);

//   await course.save();
//   return course;
// };

// export const deleteLecture = async (courseId, sectionId, lectureId) => {
//   const course = await findCourseById(courseId);
//   if (!course) return null;

//   const section = course.sections.id(sectionId);
//   if (!section) return null;

//   section.lectures.pull(lectureId);

//   await course.save();
//   return course;
// };

// // reorder
// export const reorderSections = async (courseId, sectionOrders) => {
//   const course = await findCourseById(courseId);
//   if (!course) return null;

//   sectionOrders.forEach(({ sectionId, order }) => {
//     const section = course.sections.id(sectionId);
//     if (section) {
//       section.order = order;
//     }
//   });
//   await course.save();
//   return course;
// };

// export const reorderLectures = async (courseId, sectionId, lectureOrders) => {
//   const course = await findCourseById(courseId);

//   if (!course) return null;

//   const section = course.sections.id(sectionId);

//   if (!section) return null;

//   lectureOrders.forEach(({ lectureId, order }) => {
//     const lecture = section.lectures.id(lectureId);
//     if (lecture) {
//       lecture.order = order;
//     }
//   });

//   await course.save();
//   return course;
// };

// // // Create course
// // export const createCourse = async (data) => {
// //   return await courseModel.create(data);
// // };

// // // GEt All Courses
// // export const getAllCourses = async ({ query, skip, limit }) => {
// //   const courses = await courseModel
// //     .find(query)
// //     .select("-lectures")
// //     .skip(skip)
// //     .limit(limit)
// //     .sort({ createdAt: -1 });

// //   const total = await courseModel.countDocuments(query);

// //   return { courses, total };
// // };

// // // Update Course
// // export const updateCourseById = async (courseId, updateData) => {
// //   return await courseModel
// //     .findByIdAndUpdate(
// //       courseId,
// //       { $set: updateData },
// //       {
// //         new: true, // return updated doc
// //         runValidators: true,
// //       },
// //     )
// //     .populate("createdBy", "name")
// //     .lean();
// // };

// // // Get course by ID
// // export const getCourseById = async (courseId) => {
// //   return await courseModel.findById(courseId);
// // };

// // // Get course (lean for read-only)
// // export const getCourseByIdLean = async (courseId) => {
// //   return await courseModel.findById(courseId).lean();
// // };

// // // Save course (after modifications)
// // export const saveCourse = async (courseDoc) => {
// //   return await courseDoc.save();
// // };

// // // Delete (soft delete)
// // export const deleteCourseById = async (courseId) => {
// //   return await courseModel.findByIdAndUpdate(
// //     courseId,
// //     { isDeleted: true },
// //     { new: true },
// //   );
// // };

// // /* -------------------- SECTION -------------------- */

// // // Add section
// // export const addSection = async (courseId, sectionData) => {
// //   return await courseModel.findByIdAndUpdate(
// //     courseId,
// //     {
// //       $push: { sections: sectionData },
// //     },
// //     { new: true },
// //   );
// // };

// // // Get section
// // export const getSection = async (courseId, sectionId) => {
// //   const course = await courseModel.findById(courseId);
// //   return course?.sections.id(sectionId);
// // };

// // /* -------------------- LECTURE -------------------- */

// // // Add lecture
// // export const addLecture = async (courseId, sectionId, lectureData) => {
// //   return await courseModel.findOneAndUpdate(
// //     { _id: courseId, "sections._id": sectionId },
// //     {
// //       $push: { "sections.$.lectures": lectureData },
// //     },
// //     { new: true },
// //   );
// // };

// // // Get lecture
// // export const getLecture = async (courseId, sectionId, lectureId) => {
// //   const course = await courseModel.findById(courseId);

// //   const section = course?.sections.id(sectionId);
// //   return section?.lectures.id(lectureId);
// // };

// // // Update lecture
// // export const updateLecture = async (
// //   courseId,
// //   sectionId,
// //   lectureId,
// //   updateData,
// // ) => {
// //   return await courseModel.findOneAndUpdate(
// //     {
// //       _id: courseId,
// //       "sections._id": sectionId,
// //       "sections.lectures._id": lectureId,
// //     },
// //     {
// //       $set: {
// //         "sections.$[section].lectures.$[lecture]": updateData,
// //       },
// //     },
// //     {
// //       arrayFilters: [
// //         { "section._id": sectionId },
// //         { "lecture._id": lectureId },
// //       ],
// //       new: true,
// //     },
// //   );
// // };

// // // Delete lecture
// // export const deleteLecture = async (courseId, sectionId, lectureId) => {
// //   return await courseModel.findOneAndUpdate(
// //     { _id: courseId, "sections._id": sectionId },
// //     {
// //       $pull: {
// //         "sections.$.lectures": { _id: lectureId },
// //       },
// //     },
// //     { new: true },
// //   );
// // };
