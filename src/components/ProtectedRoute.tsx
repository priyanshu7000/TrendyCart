// components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Store the current path so we can redirect after login
    return <Navigate to={`/login?redirectTo=${location.pathname}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
