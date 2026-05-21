import { Lock, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { changePasswordThunk } from "@/features/auth/authThunk";

export default function PageHeader() {
  const dispatch = useDispatch();
  async function changePassword() {
    await dispatch(changePasswordThunk());
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
        <Button className="bg-orange-600 hover:bg-orange-700 cursor-pointer">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

        <Button
          onClick={() => changePassword()}
          // variant="ghost"
          className="bg-orange-600 hover:bg-orange-700 cursor-pointer"
        >
          <Lock />
          Change Password
        </Button>
      </div>
    </div>
  );
}
