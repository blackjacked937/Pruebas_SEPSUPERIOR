import React from 'react';
import './Services.css';
import { CiChat1 } from "react-icons/ci";
import { TbClipboardList } from "react-icons/tb";
import { PiVideoCamera } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { IoTrendingUpOutline } from "react-icons/io5";

const servicesCards = [
    {
        icon: <PiVideoCamera size={22} />,
        title: 'Consultas con Profesionales',
        description: 'Conecta con psicólogos, psiquiatras y terapeutas certificados a través de videollamadas.',
        options: ['Profesionales certificados','Consultas remotas','Planes de tratamiento']
    },
    {
        icon: <CiChat1 size={22} />,
        title: 'Chat de Apoyo 24/7',
        description: 'Habla cuando lo necesites con nuestro chatbot de IA entrenado en salud mental y con moderadores humanos disponibles.',
        options: ['Respuestas inmediatas','Completamente anónimo','Disponible cualquier día y hora']
    },
    {
        icon: <IoTrendingUpOutline size={22} />,
        title: 'Seguimiento y Estadísticas',
        description: 'Monitorea tu progreso emocional a lo largo del tiempo con gráficas y reportes detallados.',
        options: []
    },
    {
        icon: <TbClipboardList size={22} />,
        title: 'Evaluaciones Psicológicas',
        description: 'Tests validados científicamente para detectar riesgos de adicciones, depresión, ansiedad y otros trastornos.',
        options: []
    },
    {
        icon: <RiGroupLine size={22} />,
        title: 'Grupos de Apoyo',
        description: 'Únete a comunidades seguras de personas que comparten experiencias similares.',
        options: []
    }
];

const Services = () => {
    return (
        <div className="services-page-wrapper">

           
            <div className="services-top-wave">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,80 C250,160 450,40 900,90 C1200,130 1350,70 1440,90 L1440,120 L0,120 Z" fill="#f2f3f7" />
                </svg>
                <h1 className="services-wave-title">Nuestros Servicios</h1>
            </div>

      
            <div className="services-body">
                <div className="services-grid">
                    {servicesCards.map((service, index) => (
                        <article
                            className={`service-card 
                                ${index === 1 ? 'service-card--pink' : ''} 
                                ${index === 4 ? 'service-card--gray' : ''}
                                ${index === 0 || index === 1 || index === 4 ? 'service-card--wide' : ''}
                                ${index === 2 || index === 3 ? 'service-card--square' : ''}
                            `}
                            key={index}>
                            <div className="service-card-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>

                            {service.options.length > 0 && (
                                <div className="service-tags">
                                    {service.options.map((opt, i) => (
                                        <span key={i}>{opt}</span>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Services;