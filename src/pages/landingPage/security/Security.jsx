import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Security() {
  const derechos = [
    { icon: 'bi-search', title: 'Acceso', desc: 'Ver toda tu información.' },
    { icon: 'bi-pencil-square', title: 'Rectificación', desc: 'Corregir datos incorrectos.' },
    { icon: 'bi-trash3', title: 'Eliminación', desc: 'Borrar tu cuenta.' },
    { icon: 'bi-file-earmark-arrow-down', title: 'Portabilidad', desc: 'Descargar en formato estándar.' },
    { icon: 'bi-slash-circle', title: 'Oposición', desc: 'Rechazar ciertos usos.' }
  ];

  return (
    <div style={{ backgroundColor: '#f2f3f7', width: '100%', margin: 0, padding: 0 }}>
      
      
      <div className="container-fluid px-4" style={{ paddingTop: '24px' }}>
        <div className="row justify-content-center">
          <div className="col-12" style={{ maxWidth: '1100px' }}>
            <div className="py-4 px-4 text-center text-white rounded-4 shadow-sm" style={{ backgroundColor: '#2547b4' }}>
              <i className="bi bi-lock-fill d-block mb-2" style={{ fontSize: '2.5rem' }}></i>
              <h2 className="fw-bold my-1" style={{ fontSize: '1.9rem', letterSpacing: '-0.3px' }}>Privacidad y Seguridad</h2>
              <div className="mx-auto mt-2" style={{ fontSize: '1.05rem', lineHeight: '1.4', maxWidth: '650px', opacity: 0.95, fontWeight: '400' }}>
                Tu seguridad y privacidad son nuestra máxima prioridad. Conoce cómo protegemos tu información.
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="container-fluid" style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '35px', paddingBottom: '40px' }}>
        <div className="row g-4 align-items-stretch justify-content-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
        

          <div className="col-lg-6 d-flex flex-column justify-content-between">
            <div className="mb-3">
              <h3 className="fw-semibold mb-3" style={{ color: '#ce6b96', fontSize: '1.85rem' }}>Nuestro Compromiso</h3>
              
              <p className="mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.55', color: '#444444', fontWeight: '400' }}>
                "Tu información personal nunca será compartida, vendida o usada sin tu consentimiento explícito. Creemos que la privacidad es un derecho fundamental."
              </p>
            </div>

            <div className="mt-4">
              <h4 className="fw-bold mb-3" style={{ fontSize: '1.3rem', color: '#4b6edc' }}>Tus derechos</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {derechos.map((d) => (
                  <div key={d.title} className="text-center">
                    <i className={`bi ${d.icon} d-block mb-1`} style={{ fontSize: '1.4rem', color: '#4b6edc' }}></i>
                    <span className="d-block fw-bold" style={{ fontSize: '0.8rem', color: '#4b6edc' }}>{d.title}</span>
                    <p className="mt-1 mb-0" style={{ fontSize: '0.68rem', color: '#666', lineHeight: '1.2' }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="col-lg-6">
            <div className="d-flex flex-column gap-3 h-100 justify-content-between">
              <TarjetaFigma 
                icon="bi-shield-lock" 
                title="Cifrado de Extremo a Extremo" 
                text="Toda tu información está cifrada con AES-256, el mismo estándar usado por bancos y gobiernos internacionales." 
              />
              <TarjetaFigma 
                icon="bi-person-x" 
                title="Sin Venta de Datos" 
                text="Nunca vendemos, compartimos o monetizamos tu información personal. Tus datos son exclusivamente tuyos." 
              />
              <TarjetaFigma 
                icon="bi-shield-check" 
                title="Control de Acceso" 
                text="Solo tú decides qué información compartir y con quién. Mantén el control total de tus registros médicos." 
              />
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

function TarjetaFigma({ icon, title, text }) {
  return (
    <div className="bg-white border rounded-3 d-flex align-items-stretch overflow-hidden shadow-sm" style={{ borderColor: '#e1e5f0', minHeight: '88px' }}>
      <div className="d-flex align-items-center justify-content-center flex-shrink-0" 
           style={{ backgroundColor: '#9bb1f8', color: '#1a3075', width: '75px', fontSize: '1.65rem' }}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="p-3 px-3 d-flex flex-column justify-content-center">
        <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem', color: '#222222', lineHeight: '1.2' }}>{title}</h5>
        <p className="mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.35', color: '#666666' }}>{text}</p>
      </div>
    </div>
  );
}