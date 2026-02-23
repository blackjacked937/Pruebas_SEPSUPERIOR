import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function RoleRoute({ children, allowSuper, allowStaff }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  // Validaciones
  const isConasama = Number(auth?.typeLogin) === 3;
  const isSuper = auth?.is_superuser;
  const isStaff = auth?.is_staff;

  const tienePermiso =
  // Si no es CONASAMA ignora validaciones
    !isConasama || 
    (allowSuper && isSuper) ||
    (allowStaff && isStaff && !isSuper);

  useEffect(() => {
    if (!auth) return;

    if (!tienePermiso && isConasama) {
      setRedirecting(true);

      const mensaje = isSuper
        ? "La sección que intentaste entrar es exclusiva para gestores."
        : "La sección que intentaste entrar es exclusiva para super gestores.";

      toast.info(mensaje, {
        icon: "🚫",
        toastId: "no-permission"
      });

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
  }, [auth, tienePermiso, isConasama, isSuper, isStaff, navigate]);

  // RENDERIZADO SEGUN ADMINLAYOUT
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