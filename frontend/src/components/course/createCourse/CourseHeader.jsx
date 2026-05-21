import { BookOpen } from "lucide-react";

export default function CourseHeader() {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
        <BookOpen className="w-4 h-4" />
        Create Professional Course
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mt-5 leading-tight">
        Build Your Next
        <span className="text-orange-500"> Learning Experience</span>
      </h1>

      <p className="text-zinc-400 mt-4 max-w-2xl">
        Add your course details, pricing, requirements, and learning outcomes to
        launch your premium course.
      </p>
    </div>
  );
}
