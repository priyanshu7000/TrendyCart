// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}
// This component checks if the user is authenticated before rendering the children components.
// If the user is not authenticated, it redirects them to the sign-in page.