import React from "react";
import { Nav } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { GiBrain, GiBrainStem } from "react-icons/gi";
import { SiJupyter } from "react-icons/si";

import image from '../../../assets/img/logoColor.png'
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";

import './LeftMenu.css';

export function LeftMenu(props) {
    const { children } = props;
    const { pathname } = useLocation();
    const { auth } = useAuth();
    const typeLogin = auth?.typeLogin;

    return (
        <div className="side-menu-admin">
            <MenuLeft pathname={pathname} typeLogin={typeLogin} />
            <div className="content">{children}</div>
        </div>
    )
}

function MenuLeft(props) {
    const { pathname, typeLogin } = props;
    const role = typeLogin === 1 ? 0 : 1;

    const menus = [
        <MenuAdmin pathname={pathname} />,
        <MenuAdminFase1 pathname={pathname} />
    ]

    return menus[role];
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