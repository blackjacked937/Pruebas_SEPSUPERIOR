import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useLocation, Navigate } from 'react-router-dom';
import { HeaderAdmin, LeftMenu } from '../../components/admin';
import { useAuth } from '../../hooks/useAuth';
import { LoginLayout } from '../../pages/login/LoginLayout';
import './AdminLayout.css';

export function AdminLayout(props) {
  const { children } = props;
  const { auth } = useAuth();
  const { pathname } = useLocation();

  // ESTATUS DE CREDENCIALES
  if (auth === undefined) return null;
  if (!auth || auth?.detail) return <LoginLayout />;

  // SIN SESIÓN
  if (!auth || auth?.detail) return <Navigate to="/login" replace />;

  const isAdminF1Route = pathname.startsWith('/admin/f1');
  const isGestorConasamaRoute = pathname.startsWith("/admin/gestor/conasama");
  const isSuperConasamaRoute = pathname.startsWith("/admin/super-gestor/conasama");
  const isGestorSePRoute = pathname.startsWith("/admin/gestor/sep");
  const isSuperSePRoute = pathname.startsWith("/admin/super-gestor/sep");
  const isGestorSepSuperiorRoute = pathname.startsWith("/admin/gestor/sep-superior");
  const isSuperSepSuperiorRoute = pathname.startsWith("/admin/superior-gestor/sep-superior");

  // const typeLogin = Number(auth?.typeLogin);

  if (auth.typeLogin === 1) {
    if (isAdminF1Route) return <Navigate to="/admin" replace />;
  }

  if (auth.typeLogin === 2) {
    if (!isAdminF1Route) return <Navigate to="/admin/f1/" replace />;
  }

  if (auth.typeLogin === 3) {
    if (auth.is_superuser) {
      if (!isSuperConasamaRoute) {
        return <Navigate to="/admin/super-gestor/conasama" replace />;
      }
    } else if (auth.is_staff) {
      if (!isGestorConasamaRoute) {
        return <Navigate to="/admin/gestor/conasama" replace />;
      }
    }
  }

  if (auth.typeLogin === 4) {
    if (auth.is_superuser) {
      if (!isSuperSePRoute) {
        return <Navigate to="/admin/super-gestor/sep" replace />;
      }
    } else if (auth.is_staff) {
      if (!isGestorSePRoute) {
        return <Navigate to="/admin/gestor/sep" replace />; //SEP
      }
    }
  }

  if (auth.typeLogin === 5) {
    if (auth.is_superuser) {
      if (!isSuperSepSuperiorRoute) {
        return <Navigate to="/admin/superior-gestor/sep-superior" replace />;
      }
    } else if (auth.is_staff) {
      if (!isGestorSepSuperiorRoute) {
        return <Navigate to="/admin/gestor/sep-superior" replace />;
      }
    }
  }

  // Theme nuevo (Monte Conecta): aplica a SEP basico-superuser, SEP Superior-superuser y SEP Superior-gestor
  const applyNewTheme = isSuperSePRoute || isSuperSepSuperiorRoute || isGestorSepSuperiorRoute;

  return (
    <Container fluid className={`admin-layout ${applyNewTheme ? 'theme-adminsep' : ''}`}>
      <Row>
        <HeaderAdmin />
      </Row>
      <Row className="row divi">
       {!applyNewTheme && (
          <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
            <LeftMenu />
          </div>
        )}
        <div className={applyNewTheme ? "col-12 p-0" : "col-sm-12 col-md-8 col-lg-9 col-xl-9"}>
          <Row>{children}</Row>
        </div>
      </Row>
    </Container>
  );
}