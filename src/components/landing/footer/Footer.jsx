import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export function Footer({ compact = true }) {
  const waveHeight = compact ? '35px' : '60px';
  const wavePath = compact 
    ? "M0,0 C150,50 350,-20 500,35 C650,80 900,-10 1200,20 L1200,120 L0,120 Z"
    : "M0,30 C300,90 600,0 900,40 C1050,60 1150,20 1200,30 L1200,120 L0,120 Z";

  return (
    <footer style={{ backgroundColor: '#6b8ee2', margin: 0, padding: 0, border: 'none', outline: 'none' }}>
      
      <div style={{ overflow: 'hidden', lineHeight: 0, backgroundColor: '#f2f3f7', margin: 0, padding: 0 }}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={{ position: 'relative', display: 'block', width: '100%', height: waveHeight, marginBottom: '-1px' }}
        >
          <path 
            d={wavePath} 
            fill="#6b8ee2"
            stroke="none"
          ></path>
        </svg>
      </div>

    
      <div style={{ backgroundColor: '#6b8ee2', color: '#1f2d5a', padding: compact ? '4px 40px 10px 40px' : '15px 40px 20px 40px' }}>
        <div className="container-fluid" style={{ maxWidth: '1180px' }}>
          <div className="row align-items-center" style={{ fontSize: '0.68rem' }}>
            
            
            <div className="col-4 text-start">
              <span className="d-block mb-1" style={{ fontSize: '0.7rem', fontWeight: '600', opacity: 0.9 }}>Redes sociales</span>
              <div className="d-flex gap-3 align-items-center" style={{ fontSize: '0.9rem' }}>
                <i className="bi bi-facebook" style={{ cursor: 'pointer' }}></i>
                <i className="bi bi-linkedin" style={{ cursor: 'pointer' }}></i>
                <i className="bi bi-twitter-x" style={{ cursor: 'pointer' }}></i>
              </div>
            </div>

            
            <div className="col-4 text-center">
              <span className="d-block mb-1" style={{ fontSize: '0.7rem', fontWeight: '600', opacity: 0.9 }}>Contacto</span>
              <p className="mb-0 font-monospace" style={{ fontSize: '0.65rem', lineHeight: '1.1' }}>
                institución@dominio.com<br />
                +52 5589673478<br />
                Ciudad de México, Méx.
              </p>
            </div>

            
            <div className="col-4 text-end">
              <a href="#terminos" className="d-block text-decoration-none text-reset mb-1" style={{ opacity: 0.9 }}>Términos y condiciones</a>
              <a href="#preferencias" className="d-block text-decoration-none text-reset" style={{ opacity: 0.9 }}>Preferencias de cookies</a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;