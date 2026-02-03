import React, { useEffect, useState } from 'react'
import { InitialDashboard } from '../../../components/adminfase1/dashboard'
import { useDashboardsF1 } from '../../../hooks'
import { Carousel, Card, Container, Row, Col, Spinner } from 'react-bootstrap'

export function EstadisticaFase1() {
    const { getConteoPorNivelRiesgoCategoria, getOpcionesPreguntaUsuarios } = useDashboardsF1();

    const [slides, setSlides] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const dashboards = await getConteoPorNivelRiesgoCategoria();

            const ids = [1, 3, 4];
            const questions = [];
            for (const id of ids) {
                try {
                    const res = await getOpcionesPreguntaUsuarios(id);
                    if (res.length > 1) {
                        questions.push({
                            title: res.title,
                            data: res.data
                        });
                    }
                } catch (error) {
                    console.warn(`Pregunta ${id} no encontrada`, error);
                }
            }
            
            setSlides([...dashboards, ...questions]);
            setLoadingData(false);
        }

        fetchData();
        // Ejecutar solo al montar. Las funciones provienen del hook y no deben re-ejecutar este efecto.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="py-4">
            <h1 className="mb-4 text-center">Estadísticas Fase 1</h1>

            {loadingData ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 240 }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            ) : (
                <Row xs={1} md={1} lg={2} xl={3} className="g-4">
                    <br />
                    {slides.map((slide, index) => (
                        <Col key={index}>
                            <Card className="p-3 shadow-sm border-0 h-100" style={{ minHeight: '420px' }}>
                                <Card.Body>
                                    {/* <h5 className="text-center mb-3">{slide.title}</h5> */}
                                    <InitialDashboard data={slide.data} title={slide.title} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}
