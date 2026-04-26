// TestimonialsSection.jsx
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Rahul",
      text: "Best platform to learn development with real projects.",
    },
    {
      name: "Anjali",
      text: "Got confidence for interviews after joining this cohort.",
    },
    {
      name: "Vikas",
      text: "Clear roadmap, supportive mentors, strong community.",
    },
  ];

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
            Testimonials
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold">
            Students Love The Experience
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className="fill-orange-500 text-orange-500"
                  />
                ))}
              </div>

              <p className="mt-5 text-zinc-300 leading-7">{item.text}</p>

              <h4 className="mt-5 font-semibold">{item.name}</h4>
              <span className="text-sm text-zinc-500">Student</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}