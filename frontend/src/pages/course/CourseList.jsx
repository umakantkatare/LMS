import CourseCard from "@/components/course/CourseCard";
import HomeLayout from "@/layout/HomeLayout";
import { getAllCourses } from "@/store/slices/course/courseSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state?.course);

  async function loadCourse() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourse();
  }, []);

  const mockCourses = [
  {
    _id: "1",
    title: "Complete MERN Stack Bootcamp",
    description: "Learn MongoDB, Express, React & Node.js from scratch.",
    category: "Web Development",
    thumbnail: {
      secure_url: "https://source.unsplash.com/400x300/?coding",
    },
    totalDuration: 320,
    totalLectures: 45,
  },
  {
    _id: "2",
    title: "Advanced React Patterns",
    description: "Master hooks, performance & scalable architecture.",
    category: "Frontend",
    thumbnail: {
      secure_url: "https://source.unsplash.com/400x300/?reactjs",
    },
    totalDuration: 210,
    totalLectures: 30,
  },
];

  return (
    <HomeLayout>
      <div className="min-h-[90vh]  text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-6">
            Explore the courses made by
            <span className="font-bold text-yellow-500 mx-2">Industry experts</span>
          </h1>

          {/* Grid */}
          <div
            className="grid gap-6 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4"
          >
            {courseData.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
