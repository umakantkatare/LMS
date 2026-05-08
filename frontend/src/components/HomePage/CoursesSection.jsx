// CoursesSection.jsx
import { ArrowRight, Clock3, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CoursesSection() {
  const navigate = useNavigate();
  const courses = [
    {
      title: "Full Stack Web Development",
      level: "Beginner to Advanced",
      duration: "6 Months",
      rating: "4.9",
    },
    {
      title: "MERN Stack Bootcamp",
      level: "Intermediate",
      duration: "4 Months",
      rating: "4.8",
    },
    {
      title: "DSA + Interview Prep",
      level: "All Levels",
      duration: "3 Months",
      rating: "4.9",
    },
  ];

  function goToCourse() {
    navigate("/courses");
  }

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
            Popular Programs
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-zinc-400">
            Industry-ready programs focused on skills, projects and placement.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div
              key={i}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-orange-500/40 transition"
            >
              <span className="text-xs text-orange-400">{course.level}</span>

              <h3 className="mt-3 text-xl font-semibold">{course.title}</h3>

              <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {course.duration}
                </span>

                <span className="flex items-center gap-1">
                  <Star size={16} className="fill-orange-500 text-orange-500" />
                  {course.rating}
                </span>
              </div>

              <button className="mt-6 w-full rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-sm font-medium transition">
                Enroll Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => goToCourse()}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 hover:border-zinc-500 transition"
          >
            View All Courses
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
