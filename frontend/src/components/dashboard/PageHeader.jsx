import { LogOut, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/features/auth/authThunk";

export default function PageHeader() {
  const dispatch = useDispatch();
  async function onLogout() {
    await dispatch(logoutThunk());
  }
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Personal Information</h1>

        <p className="text-zinc-400 text-sm">
          Update your personal details and manage account visibility
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => onLogout()} variant="ghost">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        <Button className="bg-orange-600 hover:bg-orange-700">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
