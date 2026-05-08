// CoursesHero.jsx
import { ArrowRight, Sparkles } from "lucide-react";

export default function CoursesHero() {
  return (
    <section className="relative overflow-hidden bg-black text-white pt-16 pb-14 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8">
      {/* glow bg */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium">
          <Sparkles size={16} />
          Premium Learning Paths
        </div>

        {/* heading */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight max-w-5xl mx-auto">
          Level Up Your Coding Skills With
          <span className="block text-orange-400">Expert-Led Courses</span>
        </h1>

        {/* subtitle */}
        <p className="mt-5 text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Learn by building real-world projects. Master MERN stack, Java, DSA,
          AI tools, placement prep and become industry ready.
        </p>

        {/* buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-6 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-medium flex items-center justify-center gap-2">
            Explore Courses
            <ArrowRight size={18} />
          </button>

          <button className="w-full sm:w-auto px-6 h-12 rounded-xl border border-zinc-700 hover:border-zinc-500 transition font-medium">
            View Roadmaps
          </button>
        </div>

        {/* stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            ["50K+", "Students"],
            ["25+", "Courses"],
            ["100+", "Projects"],
            ["4.9/5", "Rating"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-5"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                {value}
              </h3>
              <p className="text-sm text-zinc-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
