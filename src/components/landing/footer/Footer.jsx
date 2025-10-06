import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';


export function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-section">
                <div className="footer-logo">
                    <img src="/image/McLogo.JPEG" alt="Mente Conecta" />
                    <p>
                        Plataforma integral de salud mental que conecta pacientes con profesionales de la salud, ofrece herramientas de evaluación personalizadas.
                    </p>
                </div>
                <div className="footer-social">
                    <h4>Redes sociales</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={30} color="white" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} color="white" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} color="white" />
                        </a>
                    </div>
                </div>
                <div className="footer-contact">
                    <h4>Contacto</h4>
                    <p>institución@dominio.com</p>
                    <p>+52 5589673478</p>
                    <p>Ciudad de México, Méx.</p>
                </div>
                <div className="footer-links">
                    <button onClick={() => navigate('/terminos-condiciones')}>Términos y condiciones</button>
                    <button onClick={() => navigate('/terminos-servicio')}>Términos de Servicio</button>
                    <button onClick={() => navigate('/cookies')}>Cookies</button>
                </div>
            </div>
        </footer>
    );
}