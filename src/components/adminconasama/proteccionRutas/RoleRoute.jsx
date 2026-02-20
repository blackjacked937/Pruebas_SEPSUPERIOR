import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function RoleRoute({ children, allowSuper, allowStaff }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  const isSuper = auth?.is_superuser;
  const isStaff = auth?.is_staff;

  const tienePermiso =
    (allowSuper && isSuper) ||
    (allowStaff && isStaff && !isSuper);

  useEffect(() => {
    if (!auth) {
      navigate("/login", { replace: true });
      return;
    }

    if (!tienePermiso) {
      setRedirecting(true);

      const mensaje = isSuper
        ? "La sección que intentaste entrar es exclusiva para gestores."
        : "La sección que intentaste entrar es exclusiva para super gestores.";

      toast.info(mensaje, {
        icon: "🚫",
        toastId: "no-permission"
      });

      // TIEMPO DE ALERTA
      setTimeout(() => {
        if (isSuper) {
          navigate("/admin/super-gestor/conasama", { replace: true });
        } else if (isStaff) {
          navigate("/admin/gestor/conasama", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }, 700);
    }
  }, [auth, tienePermiso, isSuper, isStaff, navigate]);

  // SIN SESIÓN
  if (!auth) return null;

  // LOADER
  if (redirecting) {
    return (
      <div
        style={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <div style={{ marginTop: "10px" }}>
            Redirigiendo...
          </div>
        </div>
      </div>
    );
  }

  if (!tienePermiso) return null;

  return children;
}