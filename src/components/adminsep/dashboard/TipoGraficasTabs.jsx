import React from 'react';
import styles from './Tabs.module.css';

export default function TipoGraficasTabs({ value, onChange }) {
  const tabs = [
    { id: 'cuestionarios', label: 'Cuestionarios' },
    { id: 'preguntas', label: 'Sociodemográficos' },
    { id: 'rangos', label: 'Rangos' }
  ];

  return (
    <div className="d-flex justify-content-center w-100 mt-2 mb-4">
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = value === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`${styles.tabButton} ${isActive ? styles.activeTab : ''}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}