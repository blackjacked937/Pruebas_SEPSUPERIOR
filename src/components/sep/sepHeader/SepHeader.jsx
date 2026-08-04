import React from 'react';
import logoSep from '../../../assets/img/logoSep.png';

export function SepHeader({ title, subtitle, hideLogo = false, isCentered = false }) {
  return (
    <div
      className="sep-header-container"
      style={{
        backgroundColor: '#7DB747',
        paddingTop: '15px',
        paddingBottom: '90px',
        minHeight: 'auto'
      }}
    >
      <div
        className={`d-flex align-items-center position-relative px-4 ${isCentered ? 'justify-content-center text-center' : 'justify-content-between'}`}
        style={{ zIndex: 2 }}
      >
        <div>
          <h1 className="fw-bold text-white mb-1" style={{ fontSize: '2.4rem' }}>
            {title}
          </h1>
          <p className="text-white mb-0" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {subtitle}
          </p>
        </div>
        {!hideLogo && (
          <div
            className={`d-none d-md-block ${isCentered ? 'position-absolute' : 'ms-4'}`}
            style={isCentered ? { right: '1.5rem' } : {}}
          >
            <img
              src={logoSep}
              alt="Educación SEP"
              className="sep-header-logo"
              style={{ height: '80px', width: 'auto' }}
            />
          </div>
        )}
      </div>
      <div className="sep-header-wave-container" style={{ height: '85px', marginTop: '10px' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
          <path d="M0,40 C320,120 420,0 740,40 C1060,120 1160,0 1440,40 L1440,120 L0,120 Z" fill="#F4F6F9" />
        </svg>
      </div>
    </div>
  );
}