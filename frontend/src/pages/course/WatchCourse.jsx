import { useState } from "react";
import CourseTabs from "@/components/course/watch/CourseTabs";
import LectureSidebar from "@/components/course/watch/LectureSidebar";
import VideoPlayer from "@/components/course/watch/VideoPlayer";

export default function WatchCourse() {
  const [currentLecture, setCurrentLecture] = useState({
    _id: "1",
    title: "Introduction",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  });

  const course = {
    title: "React Mastery Course",
    description: "Complete guide to React with real-world projects.",
    sections: [
      {
        _id: "s1",
        title: "Getting Started",
        lectures: [
          { _id: "1", title: "Introduction" },
          { _id: "2", title: "Setup Environment" },
        ],
      },
      {
        _id: "s2",
        title: "Core Concepts",
        lectures: [
          { _id: "3", title: "Components" },
          { _id: "4", title: "State & Props" },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Top Title */}
      <div className="border-b border-zinc-800 px-4 py-3">
        <h1 className="text-lg md:text-xl font-semibold">
          {course.title}
        </h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        
        {/* LEFT SIDE */}
        <div className="flex-1 p-4 space-y-4">
          
          <VideoPlayer lecture={currentLecture} />

          <CourseTabs description={course.description} />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[350px] border-l border-zinc-800">
          <LectureSidebar
            sections={course.sections}
            currentLecture={currentLecture}
            setCurrentLecture={setCurrentLecture}
          />
        </div>
      </div>
    </div>
  );
}