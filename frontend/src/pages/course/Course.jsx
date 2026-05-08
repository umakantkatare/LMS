import MainLayout from "@/layouts/MainLayout";
import CoursesHero from "@/components/course/CoursesHero";
import CoursesGrid from "@/components/course/CoursesGrid";

export default function CoursesPage() {
 

  return (
    <MainLayout>
    <CoursesHero/>
    {/* <CoursesCard/> */}
    <CoursesGrid/>
    </MainLayout>
  );
}
