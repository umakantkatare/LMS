import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();

  const { user, isAuthenticated, loading } = useAuth();

  // 1. auth checking time
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // 2. not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. role check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. allowed
  return <Outlet />;
}
