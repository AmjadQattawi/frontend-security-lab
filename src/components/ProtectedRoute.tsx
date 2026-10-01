import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {

    const auth = useContext(AuthContext);

if (!auth) {
  throw new Error("AuthContext must not be undefined");
}

const { accessToken, isAuthLoading } = auth;

if (isAuthLoading) {
  return <div>Loading...</div>;
}
if (!accessToken) {
  return <Navigate to="/login" replace />;
}

return children;


}