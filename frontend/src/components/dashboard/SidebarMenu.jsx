import { User, Briefcase, Users, FolderKanban, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { studentMenu } from "@/constants/studentMenu ";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/features/auth/authThunk";

// const studentMenu = [
//   { name: "Basic Info", icon: User, active: true },
//   { name: "Batches", icon: Users },
//   { name: "Projects", icon: FolderKanban },
// ];

export default function SidebarMenu() {
  const dispatch = useDispatch();
  async function onLogout() {
    await dispatch(logoutThunk());
  }
  return (
    <>
      <nav className="space-y-2 flex-1">
        {studentMenu.map((item, i) => {
          const Icon = item.icon;

          return (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                item.active
                  ? "bg-orange-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <Button
        onClick={onLogout}
        variant="ghost"
        className="justify-start text-zinc-400 hover:text-red-400 mt-4"
      >
        <LogOut className="mr-2 w-4 h-4" />
        Logout
      </Button>
    </>
  );
}
