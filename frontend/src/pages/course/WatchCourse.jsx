import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CourseTabs from "@/components/course/watch/CourseTabs";
import LectureSidebar from "@/components/course/watch/LectureSidebar";
import VideoPlayer from "@/components/course/watch/VideoPlayer";
import { getCourseById } from "@/api/courseApi";

export default function WatchCourse() {
  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const res = await getCourseById(id);
        console.log("watch lecture response:", res);

        const fetchedCourse = res?.data?.data;
        console.log("fetchCourse", fetchedCourse);

        setCourse(fetchedCourse);

        if (
          fetchedCourse?.sections?.length > 0 &&
          fetchedCourse.sections[0].lectures?.length > 0
        ) {
          setCurrentLecture(fetchedCourse.sections[0].lectures[0]);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Course not found
      </div>
    );
  }
  console.log("current lecture:", currentLecture);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h1 className="text-lg md:text-xl font-semibold">{course.title}</h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-zinc-800">
          <LectureSidebar
            sections={course.sections}
            currentLecture={currentLecture}
            setCurrentLecture={setCurrentLecture}
          />
        </div>

        <div className="flex-1 p-4 space-y-4">
          {currentLecture &&
            currentLecture.video &&
            currentLecture.video.url && (
              <VideoPlayer
                lecture={currentLecture}
                videoUrl={currentLecture?.video?.url}
              />
            )}

          <CourseTabs description={course.description} />
        </div>
      </div>
    </div>
  );
}
