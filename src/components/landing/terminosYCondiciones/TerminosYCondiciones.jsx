import React from 'react';
import './TerminosYCondiciones.css';

export function TerminosYCondiciones() {
    return (
        <div className="terminos-container">
            <div className="terminos-title-container">
                <h1 className="terminos-title-pill">Consentimiento Informado</h1>
            </div>
            
            <div className="terminos-content">
                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Confidencialidad</h2>
                    <p className="terminos-text"><strong>Título del estudio:</strong> Salud Mental SEP Basica y Superior</p>
                    <p className="terminos-text">
                        Tus datos personales serán tratados conforme a la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
                    </p>
                    <p className="terminos-text">
                        La información será almacenada en una plataforma electrónica segura, con acceso restringido únicamente al equipo de investigación autorizado.
                    </p>
                    <p className="terminos-text">
                        Tus resultados solo se utilizarán para los fines de este estudio y no se difundirán de forma que permitan identificarte.
                    </p>
                    <p className="terminos-text">
                        En caso de detectarse riesgo alto o inminente, tu información podrá compartirse exclusivamente con el área de enseñanza y los servicios de salud mental de tu estado, únicamente para activar protocolos de apoyo clínico.
                    </p>
                    <p className="terminos-text">
                        Podrás acercarte al equipo de salud mental que te aplica los cuestionarios, quienes fungirán como primer enlace de apoyo y seguimiento en tu entidad federativa.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Introducción</h2>
                    <p className="terminos-text">
                        Se te invita a participar en nuestro proyecto SEP, cuyo propósito es evaluar y dar seguimiento a la salud mental de los estudiantes en México. Tu participación ayudará a identificar factores de riesgo y a ofrecerte intervenciones de apoyo según tu nivel de necesidad.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Objetivo</h2>
                    <p className="terminos-text">
                        Detectar de manera oportuna síntomas de depresión, ansiedad, consumo de sustancias, trastornos alimentarios y riesgo suicida, a través de cuestionarios electrónicos validados y un sistema automatizado de clasificación de riesgo.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Procedimientos</h2>
                    <h3 className="terminos-item-title">Participación voluntaria</h3>
                    <ul className="terminos-list">
                        <li>Accederás a un enlace electrónico donde se te presentará este consentimiento informado.</li>
                        <li>Si aceptas, completarás un cuestionario sociodemográfico y posteriormente responderás las escalas clínicas: PHQ-9, GAD-7, C-SSRS, ASSIST v3, S-EDE y Screener questionnaire.</li>
                    </ul>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Participación voluntaria</h2>
                    <p className="terminos-text">
                        Tu participación es libre y voluntaria. Puedes decidir no participar o retirarte en cualquier momento.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Nota sobre muestras biológicas</h2>
                    <p className="terminos-text">
                        Este consentimiento corresponde únicamente a la parte clínica (cuestionarios y seguimiento).
                    </p>
                    <p className="terminos-text">
                        En caso de que aceptes donar muestra de sangre o raspado bucal, se te entregará un consentimiento independiente elaborado por el Instituto Nacional de Medicina Genómica (INMEGEN), responsable de la parte genética.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Duración</h2>
                    <p className="terminos-text">
                        Responder los cuestionarios toma aproximadamente 30 a 40 minutos.
                    </p>
                    <p className="terminos-text">
                        Se repetirá el mismo procedimiento a los 6 meses para dar seguimiento a tu evolución.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Beneficios</h2>
                    <ul className="terminos-list">
                        <li><strong>Grupos A ,B, C y D:</strong> recibirás una retroalimentación personalizada sobre tu salud mental y se te ofrecerán intervenciones gratuitas, diferenciadas según tu nivel de riesgo (talleres grupales, psicoterapia breve, derivación a servicios especializados o protocolos de emergencia).</li>
                    </ul>
                    <p className="terminos-text">
                        Tu participación contribuirá a generar evidencia para mejorar los programas de salud mental.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Contacto</h2>
                    <p className="terminos-text">Dudas o aclaraciones: <strong>vinculacion@loopconexion.com.mx</strong></p>
                    <p className="terminos-text">Atención urgente: <strong>Línea de la Vida 800 911 2000</strong> (24 horas).</p>
                </section>

                <section className="terminos-section autorizo-section">
                    <h2 className="terminos-subtitle autorizo-title">AUTORIZO</h2>
                    <p className="terminos-text autorizo-text">
                        Que, en caso de riesgo alto o inminente, se notifique tanto al área de enseñanza como a los servicios de salud mental de mi estado, con el fin de activar protocolos de apoyo.
                    </p>
                </section>

                <section className="terminos-section">
                    <h2 className="terminos-subtitle">Riesgos</h2>
                    <p className="terminos-text">
                        Algunas preguntas pueden generar incomodidad emocional; puedes omitir cualquier pregunta que no desees responder.
                    </p>
                    <p className="terminos-text">
                        En caso de riesgo alto o inminente, se notificará de inmediato al área de enseñanza y/o a los servicios de salud mental, únicamente de acuerdo con la autorización que hayas otorgado en este consentimiento, con el propósito exclusivo de activar medidas de apoyo y protección a tu salud y bienestar.
                    </p>
                </section>
            </div>
        </div>
    );
}
