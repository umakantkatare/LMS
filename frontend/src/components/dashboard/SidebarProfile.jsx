import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";

export default function SidebarProfile() {
  const { user } = useAuth();
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 text-center mb-6">
      <Avatar className="w-20 h-20 mx-auto mb-3 border-2 border-orange-500">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>UK</AvatarFallback>
      </Avatar>

      <h3 className="font-semibold text-lg">{user?.fullName}</h3>

      <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
        {user?.role}
      </span>
    </div>
  );
}
