// WhyChooseSection.jsx
import { Rocket, Laptop, Briefcase, Users, ArrowRight } from "lucide-react";

export default function WhyChooseSection() {
  const features = [
    {
      icon: Rocket,
      title: "Fast Track Learning",
      desc: "Structured roadmap that removes confusion and speeds up progress.",
    },
    {
      icon: Laptop,
      title: "Project Based Training",
      desc: "Build real-world apps that strengthen your portfolio and resume.",
    },
    {
      icon: Briefcase,
      title: "Interview Preparation",
      desc: "DSA basics, resume guidance, mock interviews, hiring strategy.",
    },
    {
      icon: Users,
      title: "Community Support",
      desc: "Learn with motivated peers, mentors, and doubt support network.",
    },
  ];

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-20">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Better Than Random YouTube Learning
          </h2>

          <p className="mt-4 text-zinc-400 text-sm md:text-base leading-7">
            Stop jumping between tutorials. Follow a clear path with projects,
            mentorship, and career-focused outcomes.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-orange-500/40 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                  <Icon size={22} className="text-orange-500" />
                </div>

                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm text-zinc-400 leading-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">
              Start Your Tech Career With Confidence
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Learn smarter, build faster, and get job-ready skills.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-sm font-medium transition">
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
