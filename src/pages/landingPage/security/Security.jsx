import React from 'react';
import './Security.css';
import { IoEyeOutline } from "react-icons/io5";
import { LuLock } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";

const securityFeatures = [
    {
        icon: <LuLock />,
        title: 'Encriptación End-to-End',
        description: 'Todos los datos se encriptan antes de ser almacenados y durante la transmisión.',
        iconBg: 'rgba(204, 252, 211, 0.80)',
        iconColor: '#66C870'
    },
    {
        icon: <HiOutlineUsers />,
        title: 'Control Total del Usuario',
        description: 'Solo los usuarios pueden acceder y modificar su información personal.',
        iconBg: 'rgba(136, 165, 229, 0.74)',
        iconColor: '#2C5FCC'
    },
    {
        icon: <IoEyeOutline />,
        title: 'Cumplimiento HIPAA',
        description: 'Cumplimos con todas las regulaciones de privacidad en salud.',
        iconBg: 'rgba(222, 137, 227, 0.45)',
        iconColor: '#75257D'
    }
];

const Security = () => {
    return (
        <div className="security-body">
            <div className="security-container">
                <div className="security-header">
                    <h1>Seguridad y Privacidad</h1>
                    <p>Tu información y la de tus pacientes está protegida con los más altos estándares de seguridad y privacidad en el manejo de datos médicos.</p>
                </div>
                <div className="security-content">
                    <div className="security-features-list">
                        {securityFeatures.map((feature, index) => (
                            <div className="feature-item" key={index}>
                                <div className="feature-icon" style={{ backgroundColor: feature.iconBg }}>
                                    {React.cloneElement(feature.icon, { style: { color: feature.iconColor } })}
                                </div>
                                <div className="feature-text">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="security-guarantee-card">
                        <div className="guarantee-icon">
                            <img src="/seguridad.svg" alt="Icono de escudo de seguridad" style={{ height: '11.16rem' }} />
                        </div>
                        <h3>Protección Garantizada</h3>
                        <p>Utilizamos tecnología de punta para garantizar que la información de salud mental de tus pacientes esté completamente protegida.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;