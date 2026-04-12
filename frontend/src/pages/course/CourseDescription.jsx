import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeLayout from "./../../layout/HomeLayout";

const CourseDescription = () => {
  const { state } = useLocation();
  const course = state.course;
  const { role, data } = useSelector((state) => state.auth);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] bg-gray-950 text-white px-4 md:px-10 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Thumbnail */}
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800">
              {course?.thumbnail?.secure_url ? (
                <img
                  src={course.thumbnail.secure_url}
                  alt="thumbnail"
                  className="w-full h-56 md:h-72 object-cover"
                />
              ) : (
                <div className="h-56 md:h-72 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="bg-gray-900 rounded-2xl p-5 space-y-4 shadow">
              <div className="flex justify-between text-sm md:text-base">
                <p>
                  <span className="text-gray-400">Lectures:</span>{" "}
                  <span className="font-semibold">
                    {course?.totalLectures || 0}
                  </span>
                </p>

                <p>
                  <span className="text-gray-400">Duration:</span>{" "}
                  <span className="font-semibold">
                    {course?.totalDuration || 0} mins
                  </span>
                </p>
              </div>

              <div className="flex justify-between text-sm md:text-base">
                <p>
                  <span className="text-gray-400">Category:</span>{" "}
                  <span className="font-semibold">
                    {course?.category || "N/A"}
                  </span>
                </p>

                <p>
                  <span className="text-gray-400">Instructor:</span>{" "}
                  <span className="font-semibold">
                    {course?.createdBy || "N/A"}
                  </span>
                </p>
              </div>

              {/* CTA */}
              {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition">
                  ▶ Watch Course
                </button>
              ) : (
                <button className="w-full bg-yellow-600 hover:bg-yellow-500 py-3 rounded-xl font-semibold transition">
                  🔒 Subscribe to Unlock
                </button>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold">{course?.title}</h1>

            {/* Description */}
            <div className="bg-gray-900 p-5 rounded-2xl shadow">
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                About this course
              </h2>
              <p className="text-gray-300">
                {course?.description || "No description available"}
              </p>
            </div>

            {/* Sections */}
            <div className="bg-gray-900 p-5 rounded-2xl shadow">
              <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                Course Content
              </h2>

              {course?.sections?.length > 0 ? (
                course.sections.map((section, index) => (
                  <div
                    key={index}
                    className="border border-gray-800 rounded-xl p-4 mb-2"
                  >
                    <p className="font-semibold">
                      {index + 1}. {section.title}
                    </p>

                    <p className="text-sm text-gray-400">
                      {section.lectures?.length || 0} lectures
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No content available yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
