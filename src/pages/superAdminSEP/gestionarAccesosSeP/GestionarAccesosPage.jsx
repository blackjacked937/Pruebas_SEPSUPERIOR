import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { SepHeader } from "../../../components/sep/sepHeader";
import { SepFooter } from "../../../components/sep/sepFooter";
import { FaEnvelope, FaUserShield, FaCheckCircle, FaClock, FaPlus, FaLock, FaUnlock, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './GestionarAccesos.css';

export function GestionarAccesosPage() {
  // estos son ejemplos suponiendo que se hace la consulta de la base de datos
  const [administradores, setAdministradores] = useState([
    { id: 1, nombre: 'Carlos', apellidos: 'López', correo: 'carlos.lopez@sep.gob.mx', rol: 'Administrador Estatal', estadoAcceso: 'Activo' },
    { id: 2, nombre: 'María', apellidos: 'García', correo: 'maria.garcia@sep.gob.mx', rol: 'Supervisor de Zona', estadoAcceso: 'Pendiente' },
    { id: 3, nombre: 'Juan', apellidos: 'Pérez', correo: 'juan.perez@sep.gob.mx', rol: 'Supervisor de Zona', estadoAcceso: 'Sin Acceso' },
    { id: 4, nombre: 'Ana', apellidos: 'Martínez', correo: 'ana.martinez@sep.gob.mx', rol: 'Administrador de Sistema', estadoAcceso: 'Suspendido' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [nuevoAdministrador, setNuevoAdministrador] = useState({
    nombre: '', apellidos: '', correo: '', rol: 'Supervisor de Zona'
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setNuevoAdministrador({ nombre: '', apellidos: '', correo: '', rol: 'Supervisor de Zona' });
  };
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAdministrador({ ...nuevoAdministrador, [name]: value });
  };

  const handleAddAdministrador = (e) => {
    e.preventDefault();
    const newId = administradores.length > 0 ? Math.max(...administradores.map(a => a.id)) + 1 : 1;
    const adminToAdd = { id: newId, ...nuevoAdministrador, estadoAcceso: 'Sin Acceso' };
    
    setAdministradores([...administradores, adminToAdd]);
    
    Swal.fire({
      title: '¡Administrador Agregado!',
      text: 'El usuario ha sido registrado en el sistema correctamente.',
      icon: 'success',
      confirmButtonColor: '#7DB747'
    });
    handleCloseModal();
  };

  // esta parte es para enviar el correo cabe mencionar que solo esta en prueba
  // aun nesesita del back para funcionar
  const handleEnviarAcceso = (admin) => {
    Swal.fire({
      title: '¿Generar acceso temporal?',
      html: `Se generará una contraseña temporal de 24 horas y se enviará al correo:<br/><br/><strong>${admin.correo}</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7DB747',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, enviar acceso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Enviando...',
          text: 'Generando credenciales y enviando correo electrónico',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        setTimeout(() => {
          const nuevosAdministradores = administradores.map(a => 
            a.id === admin.id ? { ...a, estadoAcceso: 'Pendiente' } : a
          );
          setAdministradores(nuevosAdministradores);
          Swal.fire('¡Enviado!', 'El correo con la contraseña temporal ha sido enviado exitosamente.', 'success');
        }, 2000);
      }
    });
  };

  // aqui se gestionan los accesos
  const handleRevocarAcceso = (admin) => {
    const isSuspendido = admin.estadoAcceso === 'Suspendido';
    const actionText = isSuspendido ? 'reactivar' : 'revocar';
    const newStatus = isSuspendido ? 'Sin Acceso' : 'Suspendido'; 

    Swal.fire({
      title: `¿${isSuspendido ? 'Reactivar' : 'Revocar'} acceso?`,
      html: isSuspendido
        ? `Se habilitará nuevamente el perfil de <br/><strong>${admin.correo}</strong><br/>Podrás enviarle una nueva contraseña temporal.`
        : `El administrador <br/><strong>${admin.correo}</strong><br/> perderá el acceso a la plataforma inmediatamente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isSuspendido ? '#7DB747' : '#e41e32',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Actualizando...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        setTimeout(() => {
          const nuevosAdministradores = administradores.map(a => 
            a.id === admin.id ? { ...a, estadoAcceso: newStatus } : a
          );
          setAdministradores(nuevosAdministradores);
          Swal.fire('¡Actualizado!', `El acceso ha sido ${isSuspendido ? 'reactivado' : 'revocado'} con éxito.`, 'success');
        }, 1500);
      }
    });
  };

  const renderBadge = (estado) => {
    switch(estado) {
      case 'Activo': 
        return <Badge bg="success" className="badge-acceso"><FaCheckCircle className="me-1"/> Activo</Badge>;
      case 'Pendiente': 
        return <Badge bg="warning" text="dark" className="badge-acceso"><FaClock className="me-1"/> Pendiente</Badge>;
      case 'Suspendido': 
        return <Badge bg="danger" className="badge-acceso"><FaTimesCircle className="me-1"/> Suspendido</Badge>;
      default: 
        return <Badge bg="secondary" className="badge-acceso">Sin Acceso</Badge>;
    }
  };

  return (
    <div className="gestionar-accesos-wrapper">
      <SepHeader title="Gestión de Accesos" />

      <Container className="accesos-main-container mt-4">
        <Row>
          <Col xs={12} data-aos="fade-up">
            <div className="accesos-card">
              <div className="accesos-header">
                <div>
                  <h4 className="accesos-title">
                    <FaUserShield className="me-2 text-primary-sep"/> Control de Administradores
                  </h4>
                  <p className="text-muted mb-0">Envía, restablece o bloquea contraseñas para los administradores de la plataforma.</p>
                </div>
                <div>
                  <Button 
                    onClick={handleShowModal} 
                    style={{ backgroundColor: '#7DB747', borderColor: '#7DB747', borderRadius: '50px', padding: '8px 20px', fontWeight: '600' }}
                  >
                    <FaPlus className="me-2" /> Agregar Administrador
                  </Button>
                </div>
              </div>

              <div className="table-responsive mt-4">
                <Table hover className="accesos-table align-middle">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Correo Electrónico</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {administradores.map((admin) => (
                      <tr key={admin.id}>
                        <td><strong>{admin.nombre} {admin.apellidos}</strong></td>
                        <td>{admin.correo}</td>
                        <td>{admin.rol}</td>
                        <td>{renderBadge(admin.estadoAcceso)}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="btn-enviar-acceso"
                              disabled={admin.estadoAcceso === 'Suspendido'}
                              onClick={() => handleEnviarAcceso(admin)}
                            >
                              <FaEnvelope className="me-2" />
                              {admin.estadoAcceso === 'Suspendido' ? 'Bloqueado' : 'Enviar Acceso'}
                            </Button>
                            
                            <Button 
                              variant={admin.estadoAcceso === 'Suspendido' ? "outline-success" : "outline-danger"}
                              size="sm" 
                              style={{ borderRadius: '50px', padding: '6px 16px', fontWeight: '600', fontSize: '0.85rem' }}
                              onClick={() => handleRevocarAcceso(admin)}
                            >
                              {admin.estadoAcceso === 'Suspendido' ? <FaUnlock className="me-2"/> : <FaLock className="me-2"/>}
                              {admin.estadoAcceso === 'Suspendido' ? 'Reactivar' : 'Revocar'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* en este se agrga el adminitrador para enviar el correo */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: '700', color: '#1a1a1a' }}>Agregar Nuevo Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddAdministrador}>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#4a5568' }}>Nombre(s)</Form.Label>
              <Form.Control type="text" name="nombre" placeholder="Ej. Juan" value={nuevoAdministrador.nombre} onChange={handleInputChange} style={{ borderRadius: '10px' }} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#4a5568' }}>Apellidos</Form.Label>
              <Form.Control type="text" name="apellidos" placeholder="Ej. Pérez" value={nuevoAdministrador.apellidos} onChange={handleInputChange} style={{ borderRadius: '10px' }} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#4a5568' }}>Correo Electrónico</Form.Label>
              <Form.Control type="email" name="correo" placeholder="ejemplo@sep.gob.mx" value={nuevoAdministrador.correo} onChange={handleInputChange} style={{ borderRadius: '10px' }} required />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '600', color: '#4a5568' }}>Rol del Administrador</Form.Label>
              <Form.Select name="rol" value={nuevoAdministrador.rol} onChange={handleInputChange} style={{ borderRadius: '10px' }}>
                <option value="Administrador Estatal">Administrador Estatal</option>
                <option value="Supervisor de Zona">Supervisor de Zona</option>
                <option value="Administrador de Sistema">Administrador de Sistema</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="light" onClick={handleCloseModal} style={{ borderRadius: '50px', fontWeight: '600' }}>Cancelar</Button>
              <Button type="submit" style={{ backgroundColor: '#7DB747', borderColor: '#7DB747', borderRadius: '50px', fontWeight: '600' }}>Guardar Administrador</Button>
            </div>
            
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
}