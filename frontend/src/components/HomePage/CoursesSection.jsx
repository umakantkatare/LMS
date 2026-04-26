// // CoursesSection.jsx
// import { ArrowRight, Clock3, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function CoursesSection() {
//   const navigate = useNavigate();
//   const courses = [
//     {
//       title: "Full Stack Web Development",
//       level: "Beginner to Advanced",
//       duration: "6 Months",
//       rating: "4.9",
//     },
//     {
//       title: "MERN Stack Bootcamp",
//       level: "Intermediate",
//       duration: "4 Months",
//       rating: "4.8",
//     },
//     {
//       title: "DSA + Interview Prep",
//       level: "All Levels",
//       duration: "3 Months",
//       rating: "4.9",
//     },
//   ];

//   function goToCourse() {
//     navigate("/courses");
//   }

//   return (
//     <section className="bg-black text-white">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
//             Popular Programs
//           </p>
//           <h2 className="mt-3 text-3xl md:text-5xl font-bold">
//             Choose Your Learning Path
//           </h2>
//           <p className="mt-4 text-zinc-400">
//             Industry-ready programs focused on skills, projects and placement.
//           </p>
//         </div>

//         <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {courses.map((course, i) => (
//             <div
//               key={i}
//               className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-orange-500/40 transition"
//             >
//               <span className="text-xs text-orange-400">{course.level}</span>

//               <h3 className="mt-3 text-xl font-semibold">{course.title}</h3>

//               <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
//                 <span className="flex items-center gap-2">
//                   <Clock3 size={16} />
//                   {course.duration}
//                 </span>

//                 <span className="flex items-center gap-1">
//                   <Star size={16} className="fill-orange-500 text-orange-500" />
//                   {course.rating}
//                 </span>
//               </div>

//               <button className="mt-6 w-full rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-sm font-medium transition">
//                 Enroll Now
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="mt-10 text-center">
//           <button
//             onClick={() => goToCourse()}
//             className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 hover:border-zinc-500 transition"
//           >
//             View All Courses
//             <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Flame, PlayCircle } from "lucide-react";

const courses = [
  {
    title: "AI Powered Job Ready Cohort",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
    price: "₹5,999",
    oldPrice: "₹9,999",
    tags: ["AI", "Placement", "Live"],
    popular: true,
  },
  {
    title: "Data Science & Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900",
    price: "₹6,999",
    oldPrice: "₹12,999",
    tags: ["Python", "ML", "Live"],
    popular: false,
  },
  {
    title: "MERN Stack Domination",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900",
    price: "₹4,999",
    oldPrice: "₹8,999",
    tags: ["React", "Node", "MongoDB"],
    popular: true,
  },
  {
    title: "DSA Complete Bootcamp",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",
    price: "₹3,499",
    oldPrice: "₹7,999",
    tags: ["DSA", "Java", "Interview"],
    popular: false,
  },
  {
    title: "Frontend Mastery",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
    price: "₹2,999",
    oldPrice: "₹6,999",
    tags: ["React", "UI", "Projects"],
    popular: false,
  },
  {
    title: "Java + Spring Boot",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900",
    price: "₹5,499",
    oldPrice: "₹10,999",
    tags: ["Java", "Backend", "Live"],
    popular: true,
  },
];

export default function CoursesSection() {
  return (
    <section className="w-full bg-black text-white py-14 md:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <div className="text-center space-y-4 mb-10 md:mb-14">
          <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-4 py-1">
            COURSES
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Level Up Your Coding Skills
            <br />
            With Expert-Led Courses
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Practical courses built for beginners to advanced developers. Learn
            by building real-world projects.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="group bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all duration-300"
            >
              {/* image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 sm:h-56 w-full object-cover group-hover:scale-105 transition duration-500"
                />

                {course.popular && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-500 text-white gap-1">
                      <Flame size={14} /> Popular
                    </Badge>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <Badge className="bg-red-500 text-white">LIVE</Badge>
                </div>
              </div>

              <CardContent className="p-5 space-y-4">
                {/* tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-zinc-700 text-zinc-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* title */}
                <h3 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2">
                  {course.title}
                </h3>

                {/* rating */}
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Star size={15} className="fill-orange-400 text-orange-400" />
                  4.8 Rating
                </div>

                {/* pricing */}
                <div className="flex items-center gap-3">
                  <span className="text-orange-400 text-xl font-bold">
                    {course.price}
                  </span>
                  <span className="line-through text-zinc-500 text-sm">
                    {course.oldPrice}
                  </span>
                </div>

                {/* button */}
                <Button className="w-full rounded-xl bg-white text-black hover:bg-orange-500 hover:text-white transition-all">
                  Check Course
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* bottom button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="border-zinc-700 text-white hover:bg-white hover:text-black rounded-xl px-7"
          >
            <PlayCircle className="mr-2" size={18} />
            Explore All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
