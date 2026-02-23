import React, { useEffect, useState } from 'react'
import { InitialDashboard } from '../../../components/adminconasama/dashboard'
import { useDashboardsF1 } from '../../../hooks'
import { Carousel, Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import { ModalBasic } from '../../../components/ui/modalBasic'
import { RegisterGestorForm } from '../../../components/adminconasama/gestores/RegisterGestorForm'

export function GestoresSuperAdminConasama() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

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
        openModal("Registrar Nuevo Gestor", <RegisterGestorForm onClose={closeModal} onReload={() => console.log("Reloading...")} />);
    };

    return (
        <>
            <Row className="mb-4">
                <Col>
                    <h1> Pagina para crear Gestores SuperGestor CONASAMAs </h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={addGestor} style={{ background: "#4DB6AC", borderColor: "#4DB6AC" }}>
                        Registrar Nuevo Gestor
                    </Button>
                </Col>
            </Row>

            <ModalBasic
                show={showModal}
                onClose={closeModal}
                title={titleModal}
                children={contentModal}
                size="lg"
            />
        </>
    )
}
