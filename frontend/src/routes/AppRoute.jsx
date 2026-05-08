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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/course/:slug" element={<CourseDetails />} />
      <Route element={<ProtectedRoute allowedRoles={[, "admin"]} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>
      <Route
        element={
          <ProtectedRoute allowedRoles={["student", "admin", "instructor"]} />
        }
      >
      </Route>
        <Route path="/learn" element={<WatchCourse />} />
    </Routes>
  );
}

export default AppRoutes;
