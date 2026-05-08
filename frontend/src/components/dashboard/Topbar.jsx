import {
  Bell,
  Settings,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost">
          <Bell className="w-5 h-5" />
        </Button>

        <Button size="icon" variant="ghost">
          <Settings className="w-5 h-5" />
        </Button>

        <Button variant="ghost">Help</Button>
      </div>
    </header>
  );
}