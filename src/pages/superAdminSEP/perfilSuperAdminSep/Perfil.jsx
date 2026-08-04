import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { SepHeader } from "../../../components/sep/sepHeader"; 
import { SepFooter } from "../../../components/sep/sepFooter";
import logoSep from '../../../assets/img/logoSep.png'; 
import avatarGestores from '../../../assets/img/AvatarGestores.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

export function Perfil() {
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

    toast.success("¡Perfil actualizado con éxito!");
    navigate('/admin/super-gestor/sep');

  };

  return (
    <div className="perfil-wrapper">
      <SepHeader 
        title="Mi Perfil" 
        hideLogo={true}
        isCentered={true}
      />

      <Container className="perfil-main-container">
        <Row className="align-items-center justify-content-center">
          
          <Col xs={12} lg={6} className="mb-5 mb-lg-0" data-aos="fade-up" data-aos-duration="800">
            <div className="perfil-card">
              <Form onSubmit={handleSubmit} noValidate>
                <Row>
                  
                  <Col md={6} className="mb-4">
                    <Form.Group>
                      <Form.Label className="perfil-label">Nombre (s)</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="nombre"
                        className="perfil-input" 
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
                      <Form.Label className="perfil-label">Apellidos</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="apellidos"
                        className="perfil-input" 
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
                      <Form.Label className="perfil-label">Correo</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="correo"
                        className="perfil-input" 
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
                      <Form.Label className="perfil-label">Matrícula Laboral</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="matriculaLaboral"
                        className="perfil-input" 
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
                      <Form.Label className="perfil-label">Contraseña Actual</Form.Label>
                      <div className="password-wrapper">
                        <Form.Control 
                          type={mostrarActual ? "text" : "password"} 
                          name="contrasenaActual"
                          className="perfil-input" 
                          value={formData.contrasenaActual}
                          onChange={handleChange}
                          maxLength={50}
                          isInvalid={!!errores.contrasenaActual}
                          autoComplete="current-password"
                        />
                        <span 
                          className="password-icon" 
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
                      <Form.Label className="perfil-label">Contraseña Nueva</Form.Label>
                      <div className="password-wrapper">
                        <Form.Control 
                          type={mostrarNueva ? "text" : "password"} 
                          name="contrasenaNueva"
                          className="perfil-input" 
                          value={formData.contrasenaNueva}
                          onChange={handleChange}
                          maxLength={50}
                          isInvalid={!!errores.contrasenaNueva}
                          autoComplete="new-password"
                        />
                        <span 
                          className="password-icon" 
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
                  <Button type="submit" className="perfil-btn-guardar">
                    Guardar Información
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          <Col xs={12} lg={6} className="text-center d-none d-lg-block d-flex flex-column align-items-center justify-content-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <img 
              src={logoSep} 
              alt="Secretaría de Educación Pública" 
              className="perfil-logo-grande mb-4" 
            />
            <img 
              src={avatarGestores} 
              alt="Gestores" 
              className="perfil-avatar-gestores" 
            />
          </Col>

        </Row>
      </Container>
    </div>
  );
}