import { Outlet } from "react-router-dom";
import StudentHeader from "@/components/student/StudentHeader";
import StudentSidebar from "@/components/student/StudentSidebar";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Header */}
      <StudentHeader />

      {/* Main Wrapper */}
      <section className="max-w-[1550px] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <StudentSidebar />
          </div>

          {/* Main Content */}
          <main
            className="
              rounded-3xl
              border border-zinc-800
              bg-zinc-950
              p-5 md:p-8
              min-h-[calc(100vh-120px)]
              shadow-2xl
            "
          >
            <Outlet />
          </main>
        </div>
      </section>
    </div>
  );
}
