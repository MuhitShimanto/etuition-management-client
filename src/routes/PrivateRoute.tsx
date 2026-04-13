import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  redirectPath?: string;
  children: ReactNode
}

const PrivateRoute = ({ children, redirectPath = "/login" }: PrivateRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While Firebase is checking auth state
  if (loading) {
    return <div>Loading...</div>; // replace with spinner if you want
  }

  // If not authenticated → redirect
  if (!user) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  // If authenticated → render child routes
  return children;
};

export default PrivateRoute;
