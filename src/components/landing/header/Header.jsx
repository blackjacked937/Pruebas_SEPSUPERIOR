import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Row } from 'react-bootstrap';
export function Header() {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className="header container-fluid">
            <div className="row w-100">
                <div className="col-md-10 col-lg-2 col-xl-4 col-xxl-5 header-left">
                    <button
                        type="button"
                        className="logo-btn"
                        onClick={() => handleNavigation('/')}
                        aria-label="Ir a inicio"
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <img
                            src="/image/mcLogo.jpeg"
                            alt="MC Logo"
                            className="logo"
                        />
                    </button>
                </div>


                <div className="col-md-10 col-lg-10 col-xl-8 col-xxl-7 header-right">
                    <div className="col header-buttons">
                        <button className="header-btn" onClick={() => handleNavigation('/')}>
                            INICIO
                        </button>
                        <button className="header-btn" onClick={() => handleNavigation('/services')}>
                            SERVICIOS
                        </button>
                        <button className="header-btn" onClick={() => handleNavigation('/characteristics')}>
                            CARACTERÍSTICAS
                        </button>
                        <button className="header-btn" onClick={() => handleNavigation('/security')}>
                            SEGURIDAD
                        </button>
                        <div className="d-flex justify-content-center fixed-btn">
                            <button className="header-btn primary px-3" onClick={() => handleNavigation('/admin')}>
                                ACCEDER AL PANEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
