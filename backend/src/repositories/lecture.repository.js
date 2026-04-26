import lectureModel from "../models/nosql/lecture.model.js";

/**
 * Create Lecture
 */
export const createLectureRepo = async (payload) => {
  return await lectureModel.create(payload);
};

/**
 * Get Lecture By Id
 */
export const getLectureByIdRepo = async (lectureId) => {
  return await lectureModel
    .findById(lectureId)
    .populate("course", "title instructor")
    .populate("section", "title course");
};

/**
 * Get Lectures By Section
 */
export const getLecturesBySectionRepo = async (sectionId) => {
  return await lectureModel.find({ section: sectionId }).sort({
    order: 1,
    createdAt: 1,
  });
};

/**
 * Update Lecture
 */
export const updateLectureRepo = async (lectureId, payload) => {
  return await lectureModel.findByIdAndUpdate(lectureId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete Lecture
 */
export const deleteLectureRepo = async (lectureId) => {
  return await lectureModel.findByIdAndDelete(lectureId);
};

/**
 * Reorder Lectures
 */
export const reorderLecturesRepo = async (items = []) => {
  const operations = items.map((item) => ({
    updateOne: {
      filter: { _id: item.lectureId },
      update: { $set: { order: item.order } },
    },
  }));

  return await lectureModel.bulkWrite(operations);
};

/**
 * Publish Lecture
 */
export const publishLectureRepo = async (lectureId) => {
  return await lectureModel.findByIdAndUpdate(
    lectureId,
    { isPublished: true },
    { new: true },
  );
};

/**
 * Unpublish Lecture
 */
export const unpublishLectureRepo = async (lectureId) => {
  return await lectureModel.findByIdAndUpdate(
    lectureId,
    { isPublished: false },
    { new: true },
  );
};
