import { LayoutDashboard, BookOpen, User, } from "lucide-react";

export const studentMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/student/dashboard",
    active: true
  },
  {
    name: "My Courses",
    icon: BookOpen,
    path: "/student/my-courses",
  },
  {
    name: "Profile",
    icon: User,
    path: "/student/profile",
  },
];

// const studentMenu = [
//   { name: "Basic Info", icon: User, active: true },
//   { name: "Batches", icon: Users },
//   { name: "Projects", icon: FolderKanban },
// ];