import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Home,
  BookOpen,
  Phone,
  LogIn,
  UserPlus,
  TextAlignJustify,
  LogOut,
} from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutAccount } from "@/store/slices/auth/authSlice";
const HomeLayout = ({ children }) => {
  const [drawer, setDrawer] = useState(false);
  const menuItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "All Courses", icon: BookOpen, path: "/course" },
    { label: "Contact", icon: Phone, path: "/contact" },
    { label: "Aboutus", icon: Phone, path: "/about" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const role = useSelector((state) => state?.auth?.role);

  const handleLogout = async () => {
    const result = await dispatch(logoutAccount());
    console.log("login data:", result);
    console.log("login data2:", result?.payload);
    if (result?.payload?.success) {
      setDrawer(false)
      navigate("/");
    }
  };

  return (
    <>
      <div className="min-h-[90vh] bg-gray-600 w-full">
        <Drawer open={drawer} onOpenChange={setDrawer} direction="left">
          <DrawerTrigger asChild>
            <Button
               className="bg-transparent border-none h-auto w-auto my-2 "
            >
              <TextAlignJustify size={64} className="w-16 h-16" />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="w-75">
            <DrawerHeader>
              <DrawerTitle>Sidebar</DrawerTitle>
              <DrawerDescription>
                This is your left sidebar content.
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm cursor-pointer transition px-4 ${
                        isActive
                          ? "text-blue-600 font-medium"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

             {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/course-create"> Create new course</Link>
                            </li>
                        )}

            <div className="px-4 py-4 overflow-y-auto h-full flex flex-col justify-between">
              {/* Navigation */}
              {/* <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600">
                  <Home size={16} /> Home
                </p>

                <p className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600">
                  <BookOpen size={16} /> All Courses
                </p>

                <p className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600">
                  <Phone size={16} /> Contact
                </p>
              </div> */}

              {/* Auth Buttons */}
              <div className="space-y-2 mt-6">
                {isLoggedIn ? (
                  <button
                    onClick={() => handleLogout()}
                    className="w-full flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full flex items-center gap-2"
                    >
                      <LogIn size={16} /> Login
                    </Link>

                    <Link
                      to="/signup"
                      className="w-full flex items-center gap-2"
                    >
                      <UserPlus size={16} /> Signup
                    </Link>
                  </>
                )}
              </div>
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
