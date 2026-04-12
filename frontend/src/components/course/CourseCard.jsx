import { BookOpen, Clock } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  //   return (
  //     <div
  //       onClick={() => navigate("/course/description/")}
  //       className="text-white w-88 h-108 shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
  //     >
  //       <div className="overflow-hidden">
  //         <img
  //           className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out diration-300"
  //           src={data?.thumbnail?.secure_url}
  //           alt="course thumbnail"
  //         />
  //         <div className="p-3 space-y-1 text-white">
  //           <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
  //             {data?.title}
  //           </h2>
  //           <p className="line-clamp-2">{data?.description}</p>
  //           <p className="font-semibold">
  //             <span className="text-yellow-500 font-bold">Category : </span>
  //             {data?.category}
  //           </p>
  //           <p className="font-semibold">
  //             <span className="text-yellow-500 font-bold">Total lectures : </span>
  //             {data?.numberoflectures}
  //           </p>
  //           <p className="font-semibold">
  //             <span className="text-yellow-500 font-bold">Instructor : </span>
  //             {data?.createdBy}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <div
      onClick={() => navigate("/course/description/", { state: { course } })}
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={course.thumbnail.secure_url}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <span className="text-xs text-blue-400 uppercase">
          {course.category}
        </span>

        {/* Title */}
        <h2 className="font-semibold text-lg line-clamp-2">{course.title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex justify-between text-sm text-gray-400 pt-2">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {course.totalDuration} mins
          </div>

          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            {course.totalLectures} lectures
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
