import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, admin = false }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="commerce-status">Cargando…</div>;
  if (!user) return <Navigate to="/mi-cuenta" state={{ from: location.pathname }} replace />;
  if (admin && profile?.role !== "admin") return <Navigate to="/mi-cuenta" replace />;
  return children;
}
