import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function RoleRoute({ children, allowSuper, allowStaff }) {
  const { auth } = useAuth();

  const isSuper = auth?.is_superuser;
  const isStaff = auth?.is_staff;

  const tienePermiso =
    (allowSuper && isSuper) ||
    (allowStaff && isStaff && !isSuper);

  useEffect(() => {
    if (auth && !tienePermiso) {
      const mensaje = isSuper
        ? "La sección que intentaste entrar es exclusiva para gestores."
        : "La sección que intentaste entrar es exclusiva para super gestores.";

      toast.info(mensaje, {
        icon: "🚫",
        toastId: "no-permission"
      });
    }
  }, [auth, tienePermiso, isSuper]);

  // VALIDACIÓN DE SESIÓN
  if (!auth) return <Navigate to="/login" replace />;

  // PERMISOS
  if (!tienePermiso) {
    if (isSuper) {
      return <Navigate to="/admin/super-gestor/conasama" replace />;
    }
    if (isStaff) {
      return <Navigate to="/admin/gestor/conasama" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}