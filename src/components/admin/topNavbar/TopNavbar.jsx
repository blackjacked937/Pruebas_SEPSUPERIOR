import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import mcLogoSF2 from '../../../../src/assets/img/mcLogoSF2.png';
import { useAuth } from '../../../hooks/useAuth';

import './TopNavbar.css';
import Swal from 'sweetalert2';

export function TopNavbar({
    menuItems = [],
    profileUrl = "/admin/super-gestor/sep/perfil",
    showProfile = true
}) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const { auth } = useAuth();

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "Estás a punto de salir de tu cuenta.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4f70bd',
            cancelButtonColor: '#666666',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-4'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (logout) {
                    logout();
                }
                navigate('/home', { replace: true });
            }
        });
    };

    return (
        <Navbar expand="lg" className="custom-top-navbar" variant="dark">
            <Container fluid className="px-4">
                <Navbar.Brand className="logo-static">
                    <img src={mcLogoSF2} alt="Mente Conecta" height="60" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto custom-nav-links">
                        {menuItems.map((item, index) => {
                            const isActive = item.exact
                                ? pathname === item.path
                                : pathname.includes(item.pathMatch || item.path);

                            return (
                                <Nav.Link
                                    key={index}
                                    as={Link}
                                    to={item.path}
                                    className={isActive ? 'active-nav-link' : ''}
                                >
                                    {item.label}
                                </Nav.Link>
                            );
                        })}
                    </Nav>

                    <Nav className="align-items-center">
                        {showProfile && (
                            <Nav.Link
                                as={Link}
                                to={profileUrl}
                                className={`d-flex align-items-center text-dark me-4 profile-link ${pathname.includes(profileUrl) ? 'active-nav-link' : ''}`}
                            >
                                <span className="me-2">Mi Perfil</span>
                                <FaUserCircle size={26} />
                            </Nav.Link>
                        )}
                        <Button className="btn-acceder-panel d-flex align-items-center gap-2" onClick={handleLogout}>
                            Cerrar Sesión
                            <FaSignOutAlt />
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}