import React, { useEffect, useState } from 'react'
import { InitialDashboard } from '../../../components/adminfase1/dashboard'
import { useDashboardsF1 } from '../../../hooks'
import { Carousel, Card, Container, Row, Col, Spinner } from 'react-bootstrap'

export function EstadisticaFase1() {
    const { 
        getDashBoardHasAlzheimerRisk, 
        getDashBoardHasAlcoholEvaluation,
        getDashBoardHasColumbiaQuestionnaire, 
        getDashBoardHasDrugsQuestionnaire, 
        getDashBoardHasEatingBehavior,
        getDashBoardHasGAD7,
        getDashBoardHasPSL5Questionnaire, 
        getDashBoardHasPhysicalActivity,
        getDashBoardHasPlutchickQuestionnaire, 
        getDashBoardHasPsychiatricSymptoms, 
        getDashBoardHasSleepQuality,
        getDashBoardHasTraumaticEvents,
        getOpcionesPreguntaUsuarios,

        getHasPHQ9s,
        getHasResilienceScale,
        getHasTobaccoEvaluation
    } = useDashboardsF1();

    const [slides, setSlides] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const results = await Promise.all([
                // getDashBoardHasAlzheimerRisk(),
                // getDashBoardHasAlcoholEvaluation(),
                getHasPHQ9s(),
                getHasResilienceScale(),
                getHasTobaccoEvaluation(),
                getDashBoardHasColumbiaQuestionnaire(),
                // getDashBoardHasDrugsQuestionnaire(),
                // getDashBoardHasEatingBehavior(),
                // getDashBoardHasGAD7(),

                getDashBoardHasPSL5Questionnaire(),
                // getDashBoardHasPhysicalActivity(),
                // getDashBoardHasPlutchickQuestionnaire(),

                getDashBoardHasPsychiatricSymptoms(),
                // getDashBoardHasSleepQuality(),
                // getDashBoardHasTraumaticEvents(),
            ]);

            // PHQ-9
            // Evaluación de Tabaco
            // Escala de Resilencia
            // Cuestionario Columbia
            // Sintomatología Psiquiátrica
            // Cuestionario PSL5
            // Title: Severo | Moderado | Bajo | Minimo

            const dashboards = [
                {
                    title: 'PHQ-9',
                    data: [{"name": "Severo", "score": 9},{"name": "Moderado", "score": 15},{"name": "Bajo", "score": 2},{"name": "Minimo", "score": 7}]
                },
                {
                    title: 'Tabaco',
                    data: [{"name": "Severo", "score": 2},{"name": "Moderado", "score": 1},{"name": "Bajo", "score": 4},{"name": "Minimo", "score": 10}]
                },
                {
                    title: 'Resilencia',
                    data: [{"name": "Severo", "score": 5},{"name": "Moderado", "score": 3},{"name": "Bajo", "score": 9},{"name": "Minimo", "score": 9}]
                },
                {
                    title: 'Columbia',
                    data: [{"name": "Severo", "score": 11},{"name": "Moderado", "score": 9},{"name": "Bajo", "score": 12},{"name": "Minimo", "score": 7}]
                },
                {
                    title: 'Psiquiátrica',
                    data: [{"name": "Severo", "score": 0},{"name": "Moderado", "score": 7},{"name": "Bajo", "score": 4},{"name": "Minimo", "score": 2}]
                },
                {
                    title: 'PSL5',
                    data: [{"name": "Severo", "score": 1},{"name": "Moderado", "score": 12},{"name": "Bajo", "score": 1},{"name": "Minimo", "score": 3}]
                },
            ];

            const ids = [1, 3, 4, 19];
            const questions = [];
            for (const id of ids) {
                try {
                    const res = await getOpcionesPreguntaUsuarios(id);
                    if (res?.opciones?.length) {
                        questions.push({
                            title: res.titulo,
                            data: res.opciones
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
