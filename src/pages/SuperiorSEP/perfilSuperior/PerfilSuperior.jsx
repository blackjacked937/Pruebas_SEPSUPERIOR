import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logoSesyn from '../../../assets/img/logoSesyn.png';
import mascotaIzq from '../../../assets/img/Castor.png';
import mascotaDer from '../../../assets/img/Conejo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

import './PerfilSuperior.css';

export function PerfilSuperior() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        contrasenaActual: "",
        contrasenaNueva: "",
        matriculaLaboral: ""
    });

    const [errores, setErrores] = useState({});
    const [mostrarActual, setMostrarActual] = useState(false);
    const [mostrarNueva, setMostrarNueva] = useState(false);

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 10,
        });
        setTimeout(() => {
            AOS.refresh();
            window.dispatchEvent(new Event('resize'));
        }, 150);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "nombre" || name === "apellidos") {
            newValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        }

        if (name === "matriculaLaboral") {
            newValue = value.replace(/[^a-zA-Z0-9]/g, "");
        }

        setFormData({
            ...formData,
            [name]: newValue
        });

        if (errores[name]) {
            setErrores({ ...errores, [name]: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevosErrores = {};

        if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!formData.apellidos.trim()) nuevosErrores.apellidos = "Los apellidos son obligatorios.";
        if (!formData.matriculaLaboral.trim()) nuevosErrores.matriculaLaboral = "La matrícula es obligatoria.";
        if (!formData.contrasenaActual.trim()) nuevosErrores.contrasenaActual = "Ingresa tu contraseña actual.";
        if (!formData.contrasenaNueva.trim()) nuevosErrores.contrasenaNueva = "Ingresa una nueva contraseña.";

        if (!formData.correo.trim()) {
            nuevosErrores.correo = "El correo es obligatorio.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.correo)) {
                nuevosErrores.correo = "Ingresa un correo electrónico válido.";
            }
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setErrores({});
        console.log("Datos listos para enviar:", formData);

        localStorage.removeItem('requiere_cambio_password');

        Swal.fire({
            title: '¡Perfil Actualizado!',
            text: 'Tu información y contraseña han sido guardadas con éxito.',
            icon: 'success',
            confirmButtonColor: '#28A745'
        }).then(() => {
            navigate('/admin/superior-gestor/sep-superior');
        });
    };

    return (
        <Container fluid className="perfil-superior-container p-0">
            <div className="mc-banner-wave-perfil">
                <div className="mc-banner-wave-perfil__content">
                    <div className="mc-banner-wave-perfil__text">
                        <h1>MI PERFIL</h1>
                    </div>
                </div>
            </div>

            <div className="mc-banner-transition-perfil" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            <div className="mc-content-wrapper-perfil">
                <Row className="align-items-center justify-content-center">

                    {/* COLUMNA IZQUIERDA: FORMULARIO */}
                    <Col
                        xs={12}
                        lg={6}
                        className="mb-5 mb-lg-0"
                        data-aos="fade-up"
                        data-aos-duration="800">
                        <div className="perfil-superior-card">
                            <Form onSubmit={handleSubmit} noValidate>
                                <Row>
                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="perfil-superior-label">Nombre (s)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                className="perfil-superior-input"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                maxLength={20}
                                                isInvalid={!!errores.nombre}
                                            />
                                            <Form.Control.Feedback type="invalid" className="ps-3">
                                                {errores.nombre}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="perfil-superior-label">Apellidos</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="apellidos"
                                                className="perfil-superior-input"
                                                value={formData.apellidos}
                                                onChange={handleChange}
                                                maxLength={20}
                                                isInvalid={!!errores.apellidos}
                                            />
                                            <Form.Control.Feedback type="invalid" className="ps-3">
                                                {errores.apellidos}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="perfil-superior-label">Correo</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="correo"
                                                className="perfil-superior-input"
                                                value={formData.correo}
                                                onChange={handleChange}
                                                maxLength={50}
                                                isInvalid={!!errores.correo}
                                                autoComplete="username"
                                            />
                                            <Form.Control.Feedback type="invalid" className="ps-3">
                                                {errores.correo}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="perfil-superior-label">Matrícula Laboral</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="matriculaLaboral"
                                                className="perfil-superior-input"
                                                value={formData.matriculaLaboral}
                                                onChange={handleChange}
                                                maxLength={20}
                                                isInvalid={!!errores.matriculaLaboral}
                                                autoComplete="off"
                                            />
                                            <Form.Control.Feedback type="invalid" className="ps-3">
                                                {errores.matriculaLaboral}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="perfil-superior-label">Contraseña Actual</Form.Label>
                                            <div className="password-superior-wrapper">
                                                <Form.Control
                                                    type={mostrarActual ? "text" : "password"}
                                                    name="contrasenaActual"
                                                    className="perfil-superior-input"
                                                    value={formData.contrasenaActual}
                                                    onChange={handleChange}
                                                    maxLength={50}
                                                    isInvalid={!!errores.contrasenaActual}
                                                    autoComplete="current-password"
                                                />
                                                <span
                                                    className="password-superior-icon"
                                                    onClick={() => setMostrarActual(!mostrarActual)}
                                                >
                                                    {mostrarActual ? <FaEye /> : <FaEyeSlash />}
                                                </span>
                                            </div>
                                            <Form.Control.Feedback type="invalid" className={errores.contrasenaActual ? "d-block ps-3" : ""}>
                                                {errores.contrasenaActual}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="perfil-superior-label">Contraseña Nueva</Form.Label>
                                            <div className="password-superior-wrapper">
                                                <Form.Control
                                                    type={mostrarNueva ? "text" : "password"}
                                                    name="contrasenaNueva"
                                                    className="perfil-superior-input"
                                                    value={formData.contrasenaNueva}
                                                    onChange={handleChange}
                                                    maxLength={50}
                                                    isInvalid={!!errores.contrasenaNueva}
                                                    autoComplete="new-password"
                                                />
                                                <span
                                                    className="password-superior-icon"
                                                    onClick={() => setMostrarNueva(!mostrarNueva)}
                                                >
                                                    {mostrarNueva ? <FaEye /> : <FaEyeSlash />}
                                                </span>
                                            </div>
                                            <Form.Control.Feedback type="invalid" className={errores.contrasenaNueva ? "d-block ps-3" : ""}>
                                                {errores.contrasenaNueva}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <div className="text-center mt-3">
                                    <Button type="submit" className="perfil-superior-btn-guardar">
                                        Guardar Información
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>

                    {/* COLUMNA DERECHA: LOGO Y MASCOTAS (Se oculta en tablets/móviles para no estorbar) */}
                    <Col
                        xs={12}
                        lg={6}
                        className="d-none d-lg-flex perfil-superior-images-col"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        <img
                            src={logoSesyn}
                            alt="Secretaría de Educación Pública"
                            className="perfil-superior-logo-img"
                        />
                        <div className="perfil-superior-mascotas-row">
                            <img
                                src={mascotaIzq}
                                alt="Castor"
                                className="perfil-superior-mascota"
                            />
                            <img
                                src={mascotaDer}
                                alt="Conejo"
                                className="perfil-superior-mascota"
                            />
                        </div>
                    </Col>

                </Row>
            </div>

            <div className="mc-footer-wave-sesyn" aria-hidden="true">
                <svg className="mc-footer-wave-sesyn__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <rect className="mc-footer-wave-sesyn__base" width="1440" height="120" />
                    <path className="mc-footer-wave-sesyn__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
                </svg>
            </div>

        </Container>
    );
}