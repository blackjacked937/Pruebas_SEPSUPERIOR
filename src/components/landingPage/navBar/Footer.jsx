import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#8da0d2', 
      position: 'relative', 
      marginTop: 'auto', 
      paddingTop: '60px' 
    }}>
      {/* AJUSTE DE LA OLA: 
        1. fill="#ffffff" para que se fusione con el fondo blanco de tu página.
        2. top="-80px" para solaparse con el contenido superior.
      */}
      <svg viewBox="0 0 1440 100" style={{ 
        display: 'block', 
        width: '100%', 
        position: 'absolute', 
        top: '-80px', 
        left: 0 
      }}>
        <path fill="#ffffff" d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,53.3C1120,43,1280,21,1360,10.7L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
      
      {/* Contenido del Footer */}
      <div className="container py-4 text-white">
        <div className="row text-center align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <p className="mb-2">Redes sociales</p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
              <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
              <i className="bi bi-twitter-x" style={{ fontSize: '1.5rem' }}></i>
            </div>
          </div>
          <div className="col-md-4 my-3 my-md-0">
            <p className="mb-1 fw-bold">Contacto</p>
            <p className="mb-0 small">institucion@dominio.com<br/>+52 5589673478<br/>Ciudad de México, Méx.</p>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-1">Términos y condiciones</p>
            <p className="mb-0">Preferencias de Cookies</p>
          </div>
        </div>
        <p className="text-center mt-4" style={{ fontSize: '0.8rem', opacity: '0.9' }}>© 2026 Mente Conecta.</p>
      </div>
    </footer>
  );
}