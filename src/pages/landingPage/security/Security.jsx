import React from 'react';
import './Security.css';
import { FaLock, FaUserShield, FaEye, FaShieldAlt } from 'react-icons/fa';

const securityFeatures = [
    {
        icon: <FaLock />,
        title: 'Encriptación End-to-End',
        description: 'Todos los datos se encriptan antes de ser almacenados y durante la transmisión.',
        iconBg: '#A5D6A7' // Verde claro
    },
    {
        icon: <FaUserShield />,
        title: 'Control Total del Usuario',
        description: 'Solo los usuarios pueden acceder y modificar su información personal.',
        iconBg: '#90CAF9' // Azul claro
    },
    {
        icon: <FaEye />,
        title: 'Cumplimiento HIPAA',
        description: 'Cumplimos con todas las regulaciones de privacidad en salud.',
        iconBg: '#CE93D8' // Morado claro
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
                                    {feature.icon}
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
                            <FaShieldAlt />
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