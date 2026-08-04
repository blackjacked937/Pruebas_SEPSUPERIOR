import React, { useEffect } from 'react';
import { useAuth } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Componente de Protección de Rutas para SEP Superior
 */
export function RoleRouteSEPSuperior({
  allowSuper = false,
  allowStaff = false,
  allowOrganizaciones = null,
  children,
}) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Validaciones
  const isSEPSuperior = Number(auth?.typeLogin) === 5;
  const isSuper = Boolean(auth?.is_superuser);
  const isStaff = Boolean(auth?.is_staff);
  const organizacion = auth?.me?.organizacion;

  // ================== LÓGICA DE PERMISOS ==================

  const tieneRolSuper = allowSuper && isSuper;
  const tieneRolStaff = allowStaff && isStaff && !isSuper;
  const rolPermitido = isSEPSuperior && (tieneRolSuper || tieneRolStaff);

  const organizacionPermitida =
    !allowOrganizaciones || allowOrganizaciones.includes(organizacion);

  const tienePermiso = rolPermitido && organizacionPermitida;

  // ================== SIDE EFFECTS (REDIRECCIÓN Y TOAST) ==================

  useEffect(() => {
    if (!tienePermiso && isSEPSuperior) {
      let mensaje = '';
      
      if (allowStaff && !isStaff) {
          mensaje = 'A esta ruta solo puede acceder alguien con el rol de gestor';
      } else if (allowSuper && !isSuper) {
          mensaje = 'A esta ruta solo puede acceder alguien con el rol de supergestor';
      } else if (allowStaff && isSuper) {
          mensaje = 'A esta ruta solo puede acceder alguien con el rol de gestor';
      } else {
          mensaje = 'No tienes permisos para acceder a esta sección';
      }
      
      // toastId evita que se disparen múltiples alertas iguales si el componente se re-renderiza (común en React Strict Mode)
      toast.error(mensaje, {
          toastId: 'permiso-denegado-sep',
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
      });

      const targetPath = isSuper 
          ? '/admin/superior-gestor/sep-superior' 
          : isStaff 
              ? '/admin/gestor/sep-superior' 
              : '/login';

      navigate(targetPath);
    }
  }, [tienePermiso, isSEPSuperior, isSuper, isStaff, allowStaff, allowSuper, navigate]);

  // ================== RENDERIZAR ==================

  if (!tienePermiso && isSEPSuperior) {
    return null;
  }

  return children;
}

export default RoleRouteSEPSuperior;