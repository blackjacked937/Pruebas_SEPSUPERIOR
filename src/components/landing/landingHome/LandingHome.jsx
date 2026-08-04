import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingHome.css';
import { FaArrowRight } from "react-icons/fa6";

export function LandingHome() {
    const navigate = useNavigate();

    return (
        <div className="landing-home-wrapper">
            <div className="top-wave-container">
   <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
        {/* El fill debe ser el color del contenido central (blanco/crema), no el azul */}
        <path d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" fill="#FFFFFF" />
    </svg>
</div>

            {/* Main Content Area */}
            <div className="landing-main-content">
                <div className="container">
                    <div className="row align-items-center">
                        
                        {/* Left Column: Text & Buttons */}
                        <div className="col-12 col-lg-6 text-left-column">
                            <h1 className="main-title">
                                Conectando <br />
                                Mentes y <br />
                                Corazones
                            </h1>
                            
                            <p className="main-description">
                                Plataforma integral de salud mental que conecta pacientes con profesionales de la salud, ofrece herramientas de evaluación personalizadas y brinda soporte continuo.
                            </p>
                            
                            <div className="buttons-group">
                                <button className="btn-comenzar" onClick={() => navigate('/admin')}>
                                    Comenzar Ahora
                                    <FaArrowRight size={18} />
                                </button>

                            </div>
                        </div>
                        
                        {/* Right Column: Doctor Card with Glow */}
                        <div className="col-12 col-lg-6 d-flex justify-content-center position-relative card-column">
                            <div className="doctor-card-glow-bg"></div>
                            <div className="doctor-card">
                                <img
                                    src="/image/DoctoresN.jpeg"
                                    alt="Mente Conecta Doctores"
                                    className="doctor-card-img"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

