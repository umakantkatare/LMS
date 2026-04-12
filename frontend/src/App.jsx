import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Signup from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import CourseList from "./pages/course/CourseList";
import ContactPage from "./pages/ContactPage";
import { Toaster } from "sonner";
import DeniedPage from "./pages/DeniedPage";
import CourseDescription from "./pages/course/CourseDescription";
import RequireAuth from "./components/auth/RequireAuth";
import CreateCourse from "./pages/course/CreateCourse";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import { useDispatch } from "react-redux";
import { getProfile } from "./store/slices/auth/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <>
      <Toaster position="top-center" richColors />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/course" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course-create" element={<CreateCourse />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/not-access" element={<DeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
