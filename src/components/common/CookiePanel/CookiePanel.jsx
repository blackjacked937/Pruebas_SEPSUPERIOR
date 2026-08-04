import React from 'react';
import './CookiePanel.css';

export function CookiePanel({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="cookie-overlay" onClick={onClose}>
            <div className="cookie-panel" onClick={(e) => e.stopPropagation()}>
                <div className="cookie-header">
                    <h2>Preferencias de almacenamiento</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="cookie-content">
                    <p className="cookie-intro">
                        Cuando visita sitios web, pueden almacenar o recuperar datos sobre usted utilizando cookies y tecnologías similares ("cookies"). Las cookies pueden ser necesarias para la funcionalidad básica del sitio web, así como para otros fines. Tiene la opción de deshabilitar ciertos tipos de cookies, aunque hacerlo puede afectar su experiencia en el sitio web.
                    </p>

                    <div className="cookie-section">
                        <div className="section-header">
                            <h3>Esenciales</h3>
                        </div>
                        <p>Necesario para habilitar la funcionalidad básica del sitio web. No puede deshabilitar las cookies esenciales.</p>
                    </div>

                    <div className="cookie-section">
                        <div className="section-header">
                            <h3>Publicidad Dirigida</h3>
                        </div>
                        <p>Se utiliza para ofrecer publicidad que sea más relevante para usted y sus intereses. También se puede usar para limitar la cantidad de veces que ve un anuncio y medir la efectividad de las campañas publicitarias. Las redes publicitarias suelen colocarlos con el permiso del operador del sitio web.</p>
                    </div>

                    <div className="cookie-section">
                        <div className="section-header">
                            <h3>Personalización</h3>
                        </div>
                        <p>Permite que el sitio web recuerde las selecciones que realiza (como su nombre de usuario, idioma o la región en la que se encuentra) y proporcione características mejoradas y más personales. Por ejemplo, un sitio web puede proporcionarle informes meteorológicos locales o noticias de tráfico al almacenar datos sobre su ubicación general.</p>
                    </div>

                    <div className="cookie-section">
                        <div className="section-header">
                            <h3>Analítica</h3>
                        </div>
                        <p>Ayude al operador del sitio web a comprender cómo funciona su sitio web, cómo interactúan los visitantes con el sitio y si puede haber problemas técnicos.</p>
                    </div>
                </div>

                <div className="cookie-footer">
                </div>
            </div>
        </div>
    );
}
