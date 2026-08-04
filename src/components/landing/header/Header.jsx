import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoColor from '../../../assets/img/logomccolor.png';
import './Header.css';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const getActiveClass = (path) => {
        const currentPath = location.pathname;
        if (path === '/') {
            return (currentPath === '/' || currentPath === '/home') ? 'active' : '';
        }
        return currentPath === path ? 'active' : '';
    };

    return (
        <>
            <style>{`
                /* Header con fondo azul */
                .header-mente-conecta {
                    height: 80px !important;
                    background-color: #536bb2 !important;
                    border-bottom: none !important;
                    display: flex !important;
                    align-items: center !important;
                    z-index: 1030;
                }

                /* LOGO: Ajustado para mayor tamaño */
                .logo-figma {
                    height: 80px !important; 
                    width: auto !important;
                    object-fit: contain !important;
                    filter: none !important;
                    display: block !important;
                }

                /* LETRAS BLANCAS PARA ESCRITORIO */
                .header-nav-link {
                    color: #ffffff !important;
                    font-size: 18px !important;
                    font-weight: 500 !important;
                    text-decoration: none !important;
                    padding: 10px !important;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .header-nav-link:hover {
                    color: #e0e0e0 !important;
                }

                /* ESTILO PARA LA RUTA ACTIVA (La rayita indicadora) */
                .header-nav-link.active {
                    border-bottom: 2px solid #ffffff;
                    font-weight: 700 !important;
                }

                /* Icono de usuario blanco */
                .user-icon {
                    font-size: 28px !important;
                    color: #ffffff !important; 
                    cursor: pointer;
                }

                /* Botón de hamburguesa en blanco para resaltar en el fondo azul */
                .hamburger-btn-blue {
                    color: #ffffff !important;
                    background: none;
                    border: none;
                    font-size: 28px;
                    padding: 0;
                }
            `}</style>

            <div className="header header-mente-conecta container-fluid">
                <div className="row align-items-center w-100 m-0 px-2 px-lg-5">

                    {/* LOGO (Izquierda) */}
                    <div className="col-6 col-lg-3 p-0">
                        <button
                            className="logo-btn d-flex align-items-center"
                            onClick={() => handleNavigation('/')}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        >
                            <img
                                src={logoColor}
                                alt="MC Logo"
                                className="logo-figma"
                            />
                        </button>
                    </div>

                    {/* BOTÓN HAMBURGUESA (Móvil) */}
                    <div className="col-6 d-lg-none text-end p-0">
                        <button
                            className="hamburger-btn-blue"
                            onClick={() => setIsOpen(true)}
                        >
                            ☰
                        </button>
                    </div>

                    {/* BOTONES CENTRADOS (Escritorio) */}
                    <div className="col-lg-6 d-none d-lg-flex justify-content-center p-0">
                        <div className="d-flex align-items-center m-0 gap-5">
                            <button 
                                onClick={() => handleNavigation('/')} 
                                className={`header-nav-link ${getActiveClass('/')}`}
                            >
                                Inicio
                            </button>
                            
                            <button 
                                onClick={() => handleNavigation('/services')} 
                                className={`header-nav-link ${getActiveClass('/services')}`}
                            >
                                Servicios
                            </button>
                            
                            <button 
                                onClick={() => handleNavigation('/security')} 
                                className={`header-nav-link ${getActiveClass('/security')}`}
                            >
                                Seguridad
                            </button>
                        </div>
                    </div>

                    {/* ACCESO Y USUARIO (Derecha - Escritorio) */}
                    <div className="col-lg-3 d-none d-lg-flex justify-content-end align-items-center gap-4 p-0">
                        <button 
                            onClick={() => handleNavigation('/admin')}
                            style={{ 
                                backgroundColor: '#ffffff', 
                                color: '#536bb2', 
                                padding: '10px 25px',
                                borderRadius: '25px',
                                fontSize: '15px',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Acceder al Panel
                        </button>
                    </div>

                </div>
            </div>

            {/* OVERLAY PARA MENÚ MÓVIL */}
            {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

            {/* DRAWER (Menú Desplegable Móvil) */}
            <div className={`side-drawer ${isOpen ? "open" : ""}`}>
                <div className="drawer-header">
                    <button className="close-btn" onClick={() => setIsOpen(false)}>
                        ✕
                    </button>
                </div>

                <div className="drawer-menu">
                    <button className={getActiveClass('/')} onClick={() => handleNavigation('/')}>
                        INICIO
                    </button>

                    <button className={getActiveClass('/services')} onClick={() => handleNavigation('/services')}>
                        SERVICIOS
                    </button>

                    <button className={getActiveClass('/security')} onClick={() => handleNavigation('/security')}>
                        SEGURIDAD
                    </button>

                    {/* Botón panel adaptado al tema azul */}
                    <button 
                        className="primary mt-3" 
                        onClick={() => handleNavigation('/admin')}
                        style={{ backgroundColor: '#536bb2', color: 'white' }}
                    >
                        ACCEDER AL PANEL
                    </button>
                </div>
            </div>
        </>
    );
}

export default Header;