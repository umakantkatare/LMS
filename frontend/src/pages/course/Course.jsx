import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import CoursesSection from "@/components/HomePage/CoursesSection";
import MainLayout from "@/layouts/MainLayout";
import { useDispatch } from "react-redux";

export default function CoursesPage() {
    // const dispatch = useDispatch()
    
  return (
    <MainLayout>

      <CoursesSection />

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-5xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-14 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Ready To Upgrade Your Skills?
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            Join thousands of students learning practical tech skills and become
            job ready.
          </p>

          <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl px-8 h-11">
            Explore Courses
          </Button>
        </div>
      </section>

    </MainLayout>
  );
}