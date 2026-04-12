import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import { ModalBasic } from '../../../components/ui/modalBasic'
import { RegisterGestorForm } from '../../../components/adminsep/gestores/RegisterGestorForm'
import { TableGestores } from '../../../components/adminsep/gestores/TableGestores';
import { useGestoresSEP } from "../../../hooks/sep/useGestoresSEP";

export function GestoresSuperAdminSeP() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);
    const { loading, getGestores, gestores, getHospitales, hospitales } = useGestoresSEP();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getGestores();
        getHospitales();
    }, [reload]);

    const onReload = () => setReload((prev) => !prev);

    const openModal = (title, content) => {
        setTitleModal(title);
        setContentModal(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTitleModal("");
        setContentModal(null);
    };

    const addGestor = () => {
        openModal("Registrar Nuevo Gestor", <RegisterGestorForm onClose={closeModal} onReload={onReload} />);
    };

    const viewGestor = (gestor) => {
        openModal("Información del Gestor", <RegisterGestorForm gestor={gestor} viewMode={true} onClose={closeModal} />);
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h1 style={{ color: "#4DB6AC" }}> Gestión de Gestores SuperAdmin </h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={addGestor} style={{ background: "#4DB6AC", borderColor: "#4DB6AC" }}>
                        Registrar Nuevo Gestor
                    </Button>
                </Col>
            </Row>

            <hr />

            {loading && !gestores ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p>Cargando gestores...</p>
                </div>
            ) : (
                <TableGestores gestores={gestores} hospitales={hospitales} onViewGestor={viewGestor} />
            )}

            <ModalBasic
                show={showModal}
                onClose={closeModal}
                title={titleModal}
                children={contentModal}
                size="lg"
            />
        </Container>
    )
}

export default GestoresSuperAdminSeP;
