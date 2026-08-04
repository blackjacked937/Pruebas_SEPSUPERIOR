import { useEffect, useRef } from 'react';
import { useAuth } from '../../../hooks';
import { useLocation, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Componente de Protección de Rutas para SEP
 *
 * Props:
 * - allowSuper: boolean - Solo para usuarios con is_superuser === true
 * - allowStaff: boolean - Solo para usuarios con is_staff === true Y is_superuser === false
 * - allowOrganizaciones: array - Valida auth.me.organizacion contra esta lista
 * - children: ReactNode - Componente a renderizar si tiene permisos
 *
 * Ejemplo:
 * <RoleRouteSEP allowStaff>
 *   <HomaAdminSeP />
 * </RoleRouteSEP>
 *
 * <RoleRouteSEP allowSuper allowOrganizaciones={[0]}>
 *   <ReportesSeP />
 * </RoleRouteSEP>
 */
export function RoleRouteSEP({
  allowSuper = false,
  allowStaff = false,
  allowOrganizaciones = null,
  children,
}) {
  const context = useAuth();
  const location = useLocation();
  const toastFired = useRef(false);

  if (!context || context.auth === undefined) return null;

  const auth = context.auth;

  if (!auth) {
    return <Navigate to="/admin" replace />;
  }

  const isSuper = Boolean(auth?.is_superuser);
  const requiereCambio = localStorage.getItem('requiere_cambio_password') === 'true';
  if (requiereCambio && isSuper && !location.pathname.includes('/perfil')) {
    return <Navigate to="/admin/super-gestor/sep/perfil" replace />;
  }

  const rawTypeLogin = auth?.typeLogin || context?.typeLogin || sessionStorage.getItem('typeLogin');
  const isSePSystem = Number(rawTypeLogin) === 4;

  if (!isSePSystem) {
    if (!toastFired.current) {
      toast.dismiss();
      toast.error('Acceso denegado: No perteneces al sistema SEP.');
      toastFired.current = true;
    }
    return <Navigate to="/admin" replace />;
  }

  // Validaciones
  const isStaff = Boolean(auth?.is_staff);
  const organizacion = auth?.me?.organizacion;

  // ================== LÓGICA DE PERMISOS ==================
  const rolPermitido = (allowSuper && isSuper) || (allowStaff && isStaff && !isSuper);
  const organizacionPermitida =
    !allowOrganizaciones || allowOrganizaciones.includes(organizacion);

  // ================== REDIRECCIÓN ==================

  if (!rolPermitido || !organizacionPermitida) {
    if (!toastFired.current) {
      toast.dismiss();
      if (!rolPermitido) {
        toast.error('Acceso denegado: No tienes el rol necesario para ver esta pantalla.');
      } else if (!organizacionPermitida) {
        toast.error('Acceso restringido: Tu organización actual no tiene permisos aquí.');
      }

      toastFired.current = true;
    }

    if (isSuper) return <Navigate to="/admin/super-gestor/sep" replace />;
    if (isStaff) return <Navigate to="/admin/gestor/sep" replace />;

    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default RoleRouteSEP;