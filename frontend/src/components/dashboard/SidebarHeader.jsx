import useAuth from "@/hooks/useAuth";
import { User } from "lucide-react";

export default function SidebarHeader() {
  const {user} = useAuth()
  const role = user?.role.toUpperCase()
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
        <User className="w-5 h-5" />
      </div>

      <div>
        <h2 className="font-bold text-lg">{role} Dashboard</h2>
        <p className="text-xs text-zinc-500 uppercase">
          High Performance Learning
        </p>
      </div>
    </div>
  );
}