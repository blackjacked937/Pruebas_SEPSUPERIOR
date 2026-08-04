import React from 'react';
import './TerminosDeServicio.css';

export function TerminosDeServicio() {
    return (
        <div className="terminos-servicio-container">
            <h1 className="terminos-servicio-title">Política de privacidad</h1>

            <div className="terminos-servicio-content">
                <section className="terminos-servicio-section">
                    <h2 className="terminos-servicio-subtitle">1. Introducción</h2>
                    <p className="terminos-servicio-text">Esta política de privacidad describe cómo recopilamos, utilizamos y protegemos la información personal de los usuarios de nuestra aplicación móvil de atención médica.</p>
                    <p className="terminos-servicio-text">Al utilizar nuestra aplicación, aceptas los términos de esta política de privacidad.</p>
                </section>

                <section className="terminos-servicio-section">
                    <h2 className="terminos-servicio-subtitle">2. Información que Recopilamos</h2>
                    <p className="terminos-servicio-text"><strong>Datos Generales:</strong> Recopilamos información como nombre, dirección de correo electrónico, fecha de nacimiento y género para crear y gestionar cuentas de usuario.</p>
                    <p className="terminos-servicio-text"><strong>Datos Clínicos:</strong> Para proporcionar servicios médicos, recopilamos información sobre síntomas, diagnósticos, tratamientos y medicamentos.</p>
                </section>

                <section className="terminos-servicio-section">
                    <h2 className="terminos-servicio-subtitle">3. Uso de la Información</h2>
                    <p className="terminos-servicio-text">Utilizamos la información recopilada para:</p>
                    <ul className="terminos-servicio-list">
                        <li>Proporcionar servicios médicos y gestionar cuentas de usuario.</li>
                        <li>Personalizar la experiencia del usuario.</li>
                        <li>Realizar análisis estadísticos y mejorar nuestros servicios.</li>
                    </ul>
                </section>

                <section className="terminos-servicio-section">
                    <h2 className="terminos-servicio-subtitle">4. Compartir Información</h2>
                    <p className="terminos-servicio-text">No compartimos información personal con terceros sin el consentimiento del usuario, excepto cuando sea necesario para brindar servicios médicos o cumplir con la ley.</p>
                </section>

                <section className="terminos-servicio-section">
                    <h2 className="terminos-servicio-subtitle">5. Seguridad de Datos</h2>
                    <p className="terminos-servicio-text">Implementamos medidas de seguridad para proteger la información personal.</p>
                    <p className="terminos-servicio-text">Los datos clínicos se almacenan de forma segura y solo son accesibles por profesionales médicos autorizados.</p>
                </section>

                <section className="terminos-servicio-section">
                    <h2 className="terminos-servicio-subtitle">6. Derechos del Usuario</h2>
                    <p className="terminos-servicio-text">Los usuarios tienen derecho a acceder, corregir o eliminar su información personal.</p>
                    <p className="terminos-servicio-text">Pueden retirar su consentimiento en cualquier momento.</p>
                </section>

                <section className="terminos-servicio-section">
                    <h2 className="terminos-servicio-subtitle">7. Contacto</h2>
                    <p className="terminos-servicio-text">Si tienes preguntas o preocupaciones sobre nuestra política de privacidad, contáctanos a través de la dirección de correo electrónico.</p>
                </section>
            </div>

            <div className="bottom-wave-container-terminos">
                <svg viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,40 C360,120 1080,20 1440,100 L1440,0 L0,0 Z" fill="#f0f2f5" />
                </svg>
            </div>
        </div>
    );
}
