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
                <div className="col-xs-12 col-sm-2 col-md-3 col-lg-4 col-xl-5 col-xxl-6 header-left bg-dark">
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


                <div className="col-xs-12 col-sm-10 col-md-9 col-lg-8 col-xl-7 col-xxl-6 header-right">
                    <div className="row w-100 text-center">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 col-xxl-2">
                            <button className="header-btn">
                                INICIO
                            </button>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 col-xxl-2">
                            <button className="header-btn">
                                SERVICIOS
                            </button>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 col-xxl-2">
                            <button className="header-btn" onClick={() => handleNavigation('/characteristics')}>
                                CARACTERÍSTICAS
                            </button>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 col-xxl-2">
                            <button className="header-btn" onClick={() => handleNavigation('/security')}>
                                SEGURIDAD
                            </button>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-center">
                            <button className="header-btn primary" onClick={() => handleNavigation('/admin')}>
                                ACCEDER AL PANEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
