import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap'; 
import { useState, useEffect } from 'react'; 
import { useAuth } from '../../../hooks';
import { CardInfoNavigation } from '../../../components/common';
import { getConteoNivelRiesgoApi } from '../../../api/conasama/gestores';

import './HomeSuperAdminConasama.css'; 

const idsSedes = [1, 2, 3, 4];

export function HomeSuperAdminConasama() {
    const { auth } = useAuth();
    const [sedesData, setSedesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('1');

    const nombresSedes = {
        1: "Ciudad de México",
        2: "Morelos",
        3: "Tlaxcala",
        4: "Hidalgo"
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const resultadosTemporales = {};

                await Promise.all(
                    idsSedes.map(async (id) => {
                        try {
                            const data = await getConteoNivelRiesgoApi(id, auth.token);
                            resultadosTemporales[id] = data;
                        } catch (err) {
                            resultadosTemporales[id] = [];
                        }
                    })
                );
                setSedesData(resultadosTemporales);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [auth.token]);

    return (
        <Container className="mt-4 container-home-admin-fase-1" style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div className="header-dashboard mb-4">
                <h1 className="fw-bold text-primary">Panel Super Admin</h1>
                <p className="text-muted">Indicadores específicos por estado.</p>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Cargando datos regionales...</p>
                </div>
            ) : (
                <Tabs
                    id="tabs-sedes-admin"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-4 custom-tabs"
                    fill 
                >
                    {idsSedes.map((id) => (
                        <Tab 
                            eventKey={id.toString()} 
                            title={nombresSedes[id]} 
                            key={id}
                        >
                            <div className="p-4 bg-light rounded shadow-sm border">
                                
                                <h3 className="mb-4 text-secondary">
                                    Sede: {nombresSedes[id]}
                                </h3>
                                <Row>
                                    {sedesData[id] && sedesData[id].length > 0 ? (
                                        sedesData[id].map((item) => (
                                            <Col key={`${id}-${item.id_cuestionario}`} xs={12} sm={6} lg={4} className="mb-4">
                                                <CardInfoNavigation
                                                    riskLevel={item.score}
                                                    account={item.score}
                                                    title={item.Cuestionario}
                                                    textLink="Ver análisis"
                                                    link={`/admin/super-gestor/conasama/pacientes-riesgo`}
                                                />
                                            </Col>
                                        ))
                                    ) : (
                                        <Col xs={12} className="text-center py-5">
                                            <p className="text-muted italic">No se encontraron datos para {nombresSedes[id]}.</p>
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        </Tab>
                    ))}
                </Tabs>
            )}
        </Container>
    );
}