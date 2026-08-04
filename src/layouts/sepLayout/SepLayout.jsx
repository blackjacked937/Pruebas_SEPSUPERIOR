import React, { useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, Navigate } from 'react-router-dom';
import { SepFooter } from "../../components/sep";
import { TopNavbar } from '../../components/admin/topNavbar/TopNavbar';
import { useAuth } from '../../hooks/useAuth';
import routesSuperAdminSeP from '../../routes/router.superadminsep';
import routesAdminSeP from '../../routes/router.adminsep';

import AOS from 'aos';
import 'aos/dist/aos.css';

export function SepLayout(props) {
  const { children } = props;
  const { auth } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, [pathname]);

  const currentMenuItems = useMemo(() => {
    if (!auth) return [];

    const sourceRoutes = auth.is_superuser ? routesSuperAdminSeP : routesAdminSeP;
    const userOrganizacion = auth?.me?.organizacion;

    return sourceRoutes
      .filter(route => {
        if (!route.label) return false;

        if (
          route.access?.allowOrganizaciones &&
          !route.access.allowOrganizaciones.includes(userOrganizacion)
        ) {
          return false;
        }

        return true;
      })
      .map(route => ({
        label: route.label,
        path: route.path,
        exact: route.path === '/admin/super-gestor/sep' || route.path === '/admin/gestor/sep',
        pathMatch: route.pathMatch
      }));
  }, [auth]); 

  if (auth === undefined) return null;
  if (!auth || auth?.detail) {
    return <Navigate to="/home" replace />;
  }

  const isGestorSePRoute = pathname.startsWith("/admin/gestor/sep");
  const isSuperSePRoute = pathname.startsWith("/admin/super-gestor/sep");

  const rawTypeLogin = auth?.typeLogin || sessionStorage.getItem('typeLogin');

  if (Number(rawTypeLogin) === 4) {
    if (auth.is_superuser) {
      if (!isSuperSePRoute) return <Navigate to="/admin/super-gestor/sep" replace />;
    } else if (auth.is_staff) {
      if (!isGestorSePRoute) return <Navigate to="/admin/gestor/sep" replace />;
    }
  }

  const currentProfileUrl = auth.is_superuser ? "/admin/super-gestor/sep/perfil" : "/admin/gestor/sep/perfil";
  const showProfileOption = Boolean(auth.is_superuser);

  return (
    <div
      className="sep-layout"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f7fb',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TopNavbar
        menuItems={currentMenuItems}
        profileUrl={currentProfileUrl}
        showProfile={showProfileOption}
      />

      <Container fluid className="p-0" style={{ flex: 1 }}>
        {children}
      </Container>

      <SepFooter />
    </div>
  );
}