import React, { Suspense, lazy } from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HomePage/HeroSection";

const StatsSection = lazy(() => import("@/components/HomePage/StatsSection"));
const BrandsSection = lazy(() => import("@/components/HomePage/BrandsSection"));
const WhyChooseSection = lazy(
  () => import("@/components/HomePage/WhyChooseSection"),
);
const CoursesSection = lazy(
  () => import("@/components/HomePage/CoursesSection"),
);
const TestimonialsSection = lazy(
  () => import("@/components/HomePage/TestimonialsSection"),
);
const FAQSection = lazy(() => import("@/components/HomePage/FAQSection"));
const CTASection = lazy(() => import("@/components/HomePage/CTASection"));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const Homepage = () => {
  return (
    <MainLayout>
      <HeroSection />

      <Suspense fallback={<SectionLoader />}>
        <StatsSection />
        <BrandsSection />
        <WhyChooseSection />
        <CoursesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </Suspense>
    </MainLayout>
  );
};

export default Homepage;
