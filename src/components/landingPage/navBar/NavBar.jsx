import React from 'react';
import { Link } from 'react-router-dom';
import logoCerebro from '../../../assets/img/logomc_cerebro.png';

export function NavBar() {
  return (
    <header id="header" className="header d-flex align-items-center fixed-top header-mente-conecta" style={{ backgroundColor: '#536bb2', border: 'none', boxShadow: 'none' }}>
      
      <style>{`
        /* Se aumentó a 100px para dar espacio debajo del header fijo */
        body {
          padding-top: 100px !important;
        }

        .header-mente-conecta {
          height: 80px !important;
          min-height: 80px !important;
          padding: 0 40px !important;
        }

        #header .logo, .header .logo, a.logo {
          height: 100% !important;
          display: flex !important;
          align-items: center !important;
          overflow: visible !important;
        }

        #header .logo img, .header .logo img, .logo-figma {
          height: 160px !important;
          max-height: 160px !important;
          min-height: 160px !important;
          width: auto !important;
          object-fit: contain !important;
          margin-top: -5px !important;
          padding: 0 !important;
          transform: scale(1.1) !important;
        }

        #navmenu ul li a {
          font-size: 16px !important;
          font-weight: 400 !important;
          text-decoration: none !important;
          transition: 0.3s !important;
          letter-spacing: 0.3px !important;
          color: #cbd5e1 !important;
        }
        
        #navmenu ul li a.active {
          color: #ffffff !important;
          font-weight: 600 !important;
          border-bottom: 2px solid #ffffff !important;
          padding-bottom: 6px !important;
        }

        .header .container-fluid {
          max-width: 100% !important;
          padding: 0 !important;
          height: 100% !important;
        }

        @media (max-width: 1199px) {
          body {
            padding-top: 70px !important;
          }
          .header-mente-conecta {
            height: 70px !important;
            min-height: 70px !important;
            padding: 0 20px !important;
          }
          #header .logo img {
            height: 110px !important;
          }
          #navmenu ul {
            display: none !important; 
          }
          .mobile-nav-active #navmenu ul {
            display: flex !important;
            flex-direction: column !important;
            position: absolute !important;
            top: 70px !important;
            right: 20px !important;
            left: 20px !important;
            padding: 20px !important;
            background: rgba(83, 107, 178, 0.98) !important;
            border-radius: 10px !important;
            box-shadow: 0px 5px 15px rgba(0,0,0,0.2) !important;
            gap: 15px !important;
          }
        }
      `}</style>

      <div className="container-fluid d-flex align-items-center justify-content-between w-100">
        <a href="/" className="logo d-flex align-items-center text-decoration-none">
          <img src={logoCerebro} alt="Mente Conecta" className="logo-figma" />
        </a>

        <nav id="navmenu" className="navmenu">
          <ul className="d-flex align-items-center list-unstyled m-0 gap-5" style={{ padding: 0 }}>
            <li><a href="#hero" className="active">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#features">Seguridad</a></li>
          </ul>
        </nav>

        <div className="d-flex align-items-center gap-3">
          <Link to="/admin" className="btn btn-acceder text-decoration-none border-0" 
            style={{ backgroundColor: '#eef2fa', color: '#3a53a4', padding: '10px 28px', borderRadius: '25px', fontSize: '15px' }}>
            Acceder al Panel
          </Link>
          <a href="#perfil" className="text-white d-inline-flex align-items-center" style={{ fontSize: '1.8rem' }}>
          </a>
        </div>
      </div>
    </header>
  );
}
