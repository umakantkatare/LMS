import api from "@/api/axios";
import CourseDescription from "@/components/course/CourseDescription";
import CourseHero from "@/components/course/CourseHero";
import CurriculumList from "@/components/course/CurriculumList";
import LearnCard from "@/components/course/LearnCard";
import PurchaseCard from "@/components/course/PurchaseCard";
import { getCourseBySlugThunk } from "@/features/course/courseThunk";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// const CourseDetails = () => {
//   const { courses } = useSelector((state) => state.course);
//   return (
//     <MainLayout>
//       <CourseHero />
//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           <CourseDescription />
//           <CurriculumList />
//         </div>

//         <LearnCard />
//       </div>
//     </MainLayout>
//   );
// };

// export default CourseDetails;

export default function CourseDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { singleCourse, loading, error } = useSelector((state) => state.course);

  console.log("single course:", singleCourse);

  useEffect(() => {
    const loadCourse = async () => {
      if (slug) {
        await dispatch(getCourseBySlugThunk(slug));
      }
    };

    loadCourse();
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!singleCourse) {
    console.log("again:", singleCourse);
    return (
      <div className="min-h-screen flex items-center justify-center">
        No Course Found
      </div>
    );
  }

  return (
    <MainLayout className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <CourseHero course={singleCourse} />

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          <CourseDescription course={singleCourse} />
          <CurriculumList course={singleCourse} />
        </div>

        {/* Right */}
        <div className="space-y-8">
          <PurchaseCard course={singleCourse} />
          <LearnCard course={singleCourse} />
        </div>
      </section>
    </MainLayout>
  );
}
