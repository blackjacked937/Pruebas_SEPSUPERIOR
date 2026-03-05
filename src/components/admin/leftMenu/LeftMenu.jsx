import React from "react";
import { Nav } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { GiBrain, GiBrainStem } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";
import { SiJupyter } from "react-icons/si";

import logoMCA from '../../../assets/img/logoMCA.png'
import image from '../../../assets/img/logoColor.png'
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";

import './LeftMenu.css';

export function LeftMenu(props) {
    const { children } = props;
    const { pathname } = useLocation();
    const { auth } = useAuth();
    const typeLogin = auth?.typeLogin;
    const organizacion = auth?.me?.organizacion;
    const puedeGestionarUsuarios = organizacion === 1;

    

    return (
        <div className="side-menu-admin">
        <MenuLeft
            pathname={pathname}
            typeLogin={auth?.typeLogin}
            isSuperUser={auth?.is_superuser}
            isStaff={auth?.is_staff}
            puedeGestionarUsuarios={puedeGestionarUsuarios}
        />
        <div className="content">{children}</div>
        </div>
    );
}

function MenuLeft({ pathname, typeLogin, isSuperUser, isStaff, puedeGestionarUsuarios }) {
  const menusByTypeLogin = {
    1: <MenuAdmin pathname={pathname} />,
    2: <MenuAdminFase1 pathname={pathname} />,
    3: (
      <MenuAdminConasama
        pathname={pathname}
        isSuperUser={isSuperUser}
        isStaff={isStaff}
        puedeGestionarUsuarios={puedeGestionarUsuarios}
      />
    ),
  };

  return menusByTypeLogin[typeLogin] ?? null;
}

function MenuAdmin(props) {

    const { pathname } = props;
    return (
        <Nav
            activeKey="/admin"
            className="nav-conteiner"
        >
            <Nav.Item className="menu-sub" >
                <div>
                    <center>
                        <GiBrain className="logo" />
                    </center>
                </div>
            </Nav.Item>

            <Nav.Item className="menu-sub">
                <Nav.Link
                    className="text-nav"
                    as={Link}
                    to={"/admin"}
                    active={pathname === "/admin"}
                >
                    <FaHome className="icon" /> Inicio
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className="menu-sub">
                <Nav.Link
                    className="text-nav"
                    as={Link}
                    to={"/admin/estadisticas"}
                    active={pathname === "/admin/estadisticas"}
                >
                    <FcStatistics className="icon" /> Estadisticas
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className="menu-sub">
                <Nav.Link
                    className="text-nav"
                    href="https://menteconecta.net/jupyterhub"
                >
                    <SiJupyter className="icon" /> Jupyter Notebook
                </Nav.Link>
            </Nav.Item>

        </Nav>
    );
}

function MenuAdminFase1(props) {

    const { pathname } = props;
    return (
        <Nav
            activeKey="/admin"
            className="nav-conteiner"
        >
            <Nav.Item className="menu-sub">

                <Nav.Link
                    className="text-nav"
                    as={Link}
                    to={"/admin/f1"}
                    active={pathname === "/admin"}
                >
                    <div>
                        <img src={image} alt="Logo" style={{
                            width: "100%",
                            marginBottom: "1rem",
                            marginTop: "2rem",
                            }}
                        />
                    </div>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className="menu-sub">
                <Nav.Link
                    className="text-nav"
                    as={Link}
                    to={"/admin/f1"}
                    active={pathname === "/admin"}
                >
                    <FaHome className="icon" /> Inicio
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className="menu-sub">
                <Nav.Link
                    className="text-nav"
                    as={Link}
                    to={"/admin/f1/estadisticas"}
                    active={pathname === "/admin/f1/estadisticas"}
                >
                    <FcStatistics className="icon" /> Dashboard
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className="menu-sub">
                <Nav.Link
                    className="text-nav"
                    as={Link}
                    to={"/admin/f1/columbia"}
                    active={pathname === "/admin/f1/columbia"}
                >
                    <FcStatistics className="icon" /> Columbia
                </Nav.Link>
            </Nav.Item>

        </Nav>
    );
}

function MenuAdminConasama({ pathname, isSuperUser, isStaff, puedeGestionarUsuarios  }) {
  const { auth } = useAuth();
  const organizacion = auth?.me?.organizacion;

  const logos = {
    1: logoMCA,
    2: image
  };

  const logoOrganizacion = logos[organizacion] || logoMCA;

  return (
    <Nav activeKey="/admin" className="nav-conteiner">

      {/* ============================= */}
      {/* ======== MENU GESTOR ======== */}
      {/* ============================= */}
      {isStaff && !isSuperUser && (
        <>
          <Nav.Item className="menu-sub">
            <Nav.Link as={Link} to="/admin/gestor/conasama" className="text-nav">
              <div>
                <img
                  src={logoMCA}
                  alt="LogoMCA"
                  style={{
                    width: "100%",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                />
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="menu-sub">
            <Nav.Link
              className="text-nav"
              as={Link}
              to="/admin/gestor/conasama"
              active={pathname === "/admin/gestor/conasama"}
            >
              <FaHome className="icon" /> Inicio
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="menu-sub">
            <Nav.Link
              className="text-nav"
              as={Link}
              to="/admin/gestor/conasama/estadisticas"
              active={pathname === "/admin/gestor/conasama/estadisticas"}
            >
              <VscGraph className="icon" /> Graficas
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="menu-sub">
            <Nav.Link
              className="text-nav"
              as={Link}
              to="/admin/gestor/conasama/columbia"
              active={pathname === "/admin/gestor/conasama/columbia"}
            >
              <FcStatistics className="icon" /> Grupo de Riesgos
            </Nav.Link>
          </Nav.Item>
        </>
      )}

      {/* ============================= */}
      {/* ===== MENU SUPER GESTOR ===== */}
      {/* ============================= */}
      {isSuperUser && (
        <>
          <Nav.Item className="menu-sub">
            <Nav.Link as={Link} to="/admin/super-gestor/conasama" className="text-nav">
              <div>
                <img
                  src={logoOrganizacion}
                  alt="Logo"
                  style={{
                    width: "100%",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                />
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="menu-sub">
            <Nav.Link
              className="text-nav"
              as={Link}
              to="/admin/super-gestor/conasama"
              active={pathname === "/admin/super-gestor/conasama"}
            >
              <FaHome className="icon" /> Inicio
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="menu-sub">
            <Nav.Link
              className="text-nav"
              as={Link}
              to="/admin/super-gestor/conasama/graficas"
              active={pathname === "/admin/super-gestor/conasama/graficas"}
            >
              <VscGraph className="icon" /> Graficas
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="menu-sub">
            <Nav.Link
              className="text-nav"
              as={Link}
              to="/admin/super-gestor/conasama/pacientes-riesgo"
              active={pathname === "/admin/super-gestor/conasama/pacientes-riesgo"}
            >
              <FcStatistics className="icon" /> Grupo de Riesgos
            </Nav.Link>
          </Nav.Item>

          {puedeGestionarUsuarios && (
            <Nav.Item className="menu-sub">
              <Nav.Link
                className="text-nav"
                as={Link}
                to="/admin/super-gestor/conasama/gestores"
                active={pathname === "/admin/super-gestor/conasama/gestores"}
              >
                <FcStatistics className="icon" /> Gestores
              </Nav.Link>
            </Nav.Item>
          )}

          <Nav.Item className="menu-sub">
            <Nav.Link
              className="text-nav"
              as={Link}
              to="/admin/super-gestor/conasama/noticias"
              active={pathname === "/admin/super-gestor/conasama/noticias"}
            >
              <FcStatistics className="icon" /> Noticias
            </Nav.Link>
          </Nav.Item>
        </>
      )}

    </Nav>
  );
}