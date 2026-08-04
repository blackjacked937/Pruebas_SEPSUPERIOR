import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

import { useAuth } from "../../../hooks";
import logoColor from '../../../assets/img/logoColor.png';
import './HeaderAdmin.css';


export function HeaderAdmin() {
  const { auth, logout } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();

  const renderName = () => {
    if (auth.me?.nombre && auth.me?.apellido_paterno) {
      return `${auth.me.nombre.toUpperCase()} ${auth.me.apellido_paterno.toUpperCase()}`;
    }
    return auth.me?.email;
  };

  const regresar = () => {
    logout();
    nav("/");
  };

  const isSuperSepSuperiorRoute = pathname.startsWith("/admin/superior-gestor/sep-superior");
  const isGestorSepSuperiorRoute = pathname.startsWith("/admin/gestor/sep-superior");
  const useCenteredMenu = isSuperSepSuperiorRoute || isGestorSepSuperiorRoute;

  if (useCenteredMenu) {
    const basePath = isSuperSepSuperiorRoute
      ? "/admin/superior-gestor/sep-superior"
      : "/admin/gestor/sep-superior";

    return (
      <Navbar bg="light" variant="light" expand="lg" className="top-menu-admin top-menu-admin--mc">
        <Container fluid className="mc-header-container">

          {/* LOGO */}
          <Navbar.Brand className="mc-logo-wrapper p-0">
            <img src={logoColor} alt="Logo" className="mc-logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="mc-admin-nav" />

          <Navbar.Collapse id="mc-admin-nav">

            {/* MENU CENTRADO */}
            <Nav className="mc-nav-center mx-auto">
              <NavLink
                to={basePath}
                end
                className={({ isActive }) => `mc-nav-link ${isActive ? 'active' : ''}`}
              >
                Inicio
              </NavLink>

              {/* CAMBIO AQUÍ: Si es Super Gestor va a /graficas, si es Gestor normal va a /estadisticas */}
              <NavLink
                to={isSuperSepSuperiorRoute ? `${basePath}/graficas` : `${basePath}/estadisticas`}
                className={({ isActive }) => `mc-nav-link ${isActive ? 'active' : ''}`}
              >
                Graficas
              </NavLink>

              <NavLink
                to={`${basePath}/grupo`}
                className={({ isActive }) => `mc-nav-link ${isActive ? 'active' : ''}`}
              >
                Grupo de Riesgo
              </NavLink>

              {/* Estos dos solo aplican a Super Gestor */}
              {isSuperSepSuperiorRoute && (
                <>
                  <NavLink
                    to={`${basePath}/gestores`}
                    className={({ isActive }) => `mc-nav-link ${isActive ? 'active' : ''}`}
                  >
                    Gestores
                  </NavLink>
                  <NavLink
                    to={`${basePath}/noticias`}
                    className={({ isActive }) => `mc-nav-link ${isActive ? 'active' : ''}`}
                  >
                    Noticias
                  </NavLink>
                </>
              )}
            </Nav>

            {/* USUARIO / CERRAR SESION */}
            <Nav className="mc-nav-right align-items-center">
              <NavLink
                to={`${basePath}/perfil`}
                className={({ isActive }) => `d-flex align-items-center gap-2 text-decoration-none mc-profile-link mc-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="mc-user-name">Mi perfil</span>
                <FaRegUserCircle className="mc-user-icon" />
              </NavLink>
              <Nav.Item>
                <button className="mc-logout-btn" onClick={regresar}>
                  Cerrar Sesión
                </button>
              </Nav.Item>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  // Header clasico (resto de paneles: F1, CONASAMA, SEP basico)
  return (
    <Navbar bg="light" variant="light" className="top-menu-admin">
      <Nav className="justify-content-end w-50 ">
      </Nav>
      <Navbar.Toggle />
      <Container>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Item className="cerrar-sesion">
            {renderName()}
          </Nav.Item>
          <Nav.Item>
            <FaRegUserCircle className="logo" />
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={regresar} className="cerrar-sesion">
              Cerrar Sesión
            </Nav.Link>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}