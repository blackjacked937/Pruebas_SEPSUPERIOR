import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';
import './landingHome.css';
import { FaArrowRight } from "react-icons/fa6";

export function LandingHome() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const nextIcon = (
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="70" height="70" rx="35" fill="#4DB6AC" fillOpacity="0.34" />
            <path d="M36.1538 20L50 35L36.1538 50M48.0769 35H20" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const prevIcon = (
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="70" height="70" rx="35" transform="matrix(-1 0 0 1 70 0)" fill="#4DB6AC" fillOpacity="0.34" />
            <path d="M33.8462 20L20 35L33.8462 50M21.9231 35H50" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="landing-home-container">
            <Carousel
                interval={null}
                fade={true}
                controls={true}
                indicators={false}
                className="landing-carousel"
                activeIndex={activeIndex}
                onSelect={handleSelect}
                nextIcon={activeIndex === 0 ? nextIcon : null}
                prevIcon={activeIndex === 1 ? prevIcon : null}
            >
                <Carousel.Item>
                    <div className="carousel-slide slide-1">
                        <div className="slide-content">
                            <div className="text-content">
                                <div className="title-conectando">
                                    Conectando
                                </div>
                                <div className="title-mentes">
                                    Mentes y Corazones
                                </div>
                                <div className="description">
                                    Plataforma integral de salud mental que conecta pacientes con profesionales de la salud, ofrece herramientas de evaluación personalizadas.
                                </div>
                                <button className="button-next primary">
                                    Comenzar Ahora
                                    <div className="button-icon">
                                        <FaArrowRight size={20} color="white" />
                                    </div>
                                </button>
                            </div>
                            <div className="images-content">
                                <svg className="background-svg" width="697" height="594" viewBox="0 0 697 594" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M481.181 558.349C640.221 500.594 735.579 209.152 681.073 59.059C626.567 -91.034 446.41 86.2264 287.371 143.981C128.331 201.737 -43.8337 312.808 10.6724 462.9C65.1785 612.993 322.142 616.104 481.181 558.349Z" fill="#4DB6AC" fillOpacity="0.34" />
                                </svg>
                                <img src="/image/Doctor2.png" alt="doctor-one" className="doctor-image" />
                                <img src="/image/Doctora1.png" alt="doctora-second" className="doctora-image" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-banner">
                        <div className="stat-item">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Pacientes</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Profesionales</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Soporte Disponible</div>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="carousel-slide slide-2">
                        <div className="slide-content-centered">
                            <div className="title-mentes especiales">
                                Servicios Especiales
                            </div>
                            <div className="description special">
                                Descubre las herramientas que hacen de Mente Conecta la plataforma más completa para el cuidado de la salud mental
                            </div>
                            <div className="cards-container">
                                <div className="service-card">
                                    <div className="card-header" style={{ width: '100%', height: '60%', mixBlendMode: 'hard-light', background: '#D9D9D9', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="card-title-landign">Cuestionarios Personalizados</div>
                                    </div>
                                    <div className="card-description">Herramientas de evaluación configurables que permiten a las clínicas crear cuestionarios específicos para sus pacientes y obtener información detallada.</div>
                                </div>
                                <div className="service-card">
                                    <div className="card-header" style={{ width: '100%', height: '60%', mixBlendMode: 'hard-light', background: '#D9D9D9', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="card-title-landign">Citas en línea</div>
                                    </div>
                                    <div className="card-description">Sistema integrado de agendamiento que facilita la programación de citas con profesionales de salud mental de forma rápida y segura.</div>
                                </div>
                                <div className="service-card">
                                    <div className="card-header" style={{ width: '100%', height: '60%', mixBlendMode: 'hard-light', background: '#D9D9D9', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="card-title-landign">ChatBot Personalizado</div>
                                    </div>
                                    <div className="card-description">Asistente de IA experto en salud mental disponible 24/7 para brindar apoyo inmediato y orientación personalizada a los pacientes.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}