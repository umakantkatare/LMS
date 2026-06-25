import { useDispatch, useSelector } from "react-redux";
import CoursesCard from "./CoursesCard";
import { getPublishedCoursesThunk } from "@/features/course/courseThunk";
import { useEffect } from "react";

export default function CoursesGrid() {
  const dispatch = useDispatch();
  const { publishedCourses } = useSelector((state) => state.course);
  console.log("courses:", publishedCourses);
  useEffect(() => {
    if (!publishedCourses || publishedCourses.length === 0) {
      dispatch(getPublishedCoursesThunk());
    }
  }, [dispatch, publishedCourses]);
  return (
    <section className="bg-black text-white pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedCourses &&
          publishedCourses.map((course) => (
            <CoursesCard key={course._id} course={course} />
          ))}
      </div>
    </section>
  );
}
