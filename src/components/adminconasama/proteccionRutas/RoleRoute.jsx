import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export function RoleRoute({ children, allowSuper, allowStaff }) {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/login" replace />;

  const isSuper = auth?.is_superuser;
  const isStaff = auth?.is_staff;

  // Permisos
  if (allowSuper && isSuper) return children;
  if (allowStaff && isStaff && !isSuper) return children;

  
  if (isSuper) return <Navigate to="/admin/super-gestor/conasama" replace />;
  if (isStaff) return <Navigate to="/admin/gestor/conasama" replace />;

  return <Navigate to="/login" replace />;
}