import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1">
        <Topbar />
        {children}
      </div>
    </div>
  );
}