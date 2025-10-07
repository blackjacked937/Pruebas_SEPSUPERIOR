import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css';
export function Header() {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <header className="header">
            <div className="header-left">
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
            <div className="header-right">
                <button className="header-btn" onClick={() => handleNavigation('/characteristics')}>
                    Características
                </button>
                <button className="header-btn" onClick={() => handleNavigation('/security')}>
                    Seguridad
                </button>
                <button className="header-btn primary" onClick={() => handleNavigation('/admin')}>
                    Acceder
                </button>
            </div>
        </header>
    )
}
