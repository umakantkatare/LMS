import BrandsSection from "@/components/HomePage/BrandsSection";
import CoursesSection from "@/components/HomePage/CoursesSection";
import CTASection from "@/components/HomePage/CTASection";
import FAQSection from "@/components/HomePage/FAQSection";
import HeroSection from "@/components/HomePage/HeroSection";
import StatsSection from "@/components/HomePage/StatsSection";
import TestimonialsSection from "@/components/HomePage/TestimonialsSection";
import WhyChooseSection from "@/components/HomePage/WhyChooseSection";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const Homepage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <BrandsSection />
      <WhyChooseSection />
      <CoursesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </MainLayout>
  );
};

export default Homepage;
