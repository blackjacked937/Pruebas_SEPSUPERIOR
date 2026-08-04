import React from 'react';

export function SepFooter() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '160px', marginTop: 'auto', lineHeight: 0 }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
        {/* Color arena aplicado en el fill */}
        <path d="M0,60 C320,0 420,120 740,60 C1060,0 1160,120 1440,60 L1440,120 L0,120 Z" fill="#F1E3CB" />
      </svg>
    </div>
  );
}