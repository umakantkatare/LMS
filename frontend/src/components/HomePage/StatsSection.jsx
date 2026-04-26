// StatsSection.jsx
import { Users, Eye, Star, PlayCircle } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "650K+",
      label: "Students Trained",
    },
    {
      icon: Eye,
      value: "10M+",
      label: "Views Across Platforms",
    },
    {
      icon: Star,
      value: "4.9★",
      label: "Average Rating",
    },
    {
      icon: PlayCircle,
      value: "200+",
      label: "Free Tutorials",
    },
  ];

  return (
    <section className="bg-black text-white border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 md:p-6 hover:border-orange-500/40 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Icon size={20} className="text-orange-500" />
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl font-bold">
                  {item.value}
                </h3>

                <p className="mt-1 text-sm text-zinc-400 leading-6">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
