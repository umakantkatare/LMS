import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import Course from "@/pages/course/Course";
import CourseDetails from "@/pages/course/CourseDetails";
import Homepage from "@/pages/Homepage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import StudentDashboard from "@/pages/student/StudentDashboard";
import WatchCourse from "@/pages/course/WatchCourse";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profileThunk } from "@/features/auth/authThunk";
import CreateCoursePage from "@/pages/course/CreateCourse";
import CreateSectionPage from "@/pages/course/CreateSectionPage";
import AddLecturePage from "@/pages/course/AddLecturePage";
import CourseCurriculum from "@/pages/course/CourseCurriculam";

function AppRoutes() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(profileThunk());
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/course/:slug" element={<CourseDetails />} />
      <Route element={<ProtectedRoute allowedRoles={["student", "admin"]} />}>
        <Route path="/profile" element={<StudentDashboard />} />
      </Route>
      <Route
        element={<ProtectedRoute allowedRoles={["admin", "instructor"]} />}
      >
        <Route path="/create-course/basics" element={<CreateCoursePage />} />
      </Route>
      <Route path="/learn" element={<WatchCourse />} />
      <Route path="/create-course/sections/:courseId" element={<CreateSectionPage />} />
      <Route path="/create-course/lectures/:courseId" element={<AddLecturePage />} />
      <Route path="/course/curriculam" element={<CourseCurriculum />} />
    </Routes>
  );
}

export default AppRoutes;
