import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap'; 
import { useState, useEffect } from 'react'; 
import { useAuth } from '../../../hooks';
import { CardInfoNavigation } from '../../../components/common';
import { getConteoNivelRiesgoSePBySedeApi } from '../../../api/sep/gestoresSEP';

import './HomeSuperAdminSeP.css'; 

const sedesPorOrganizacion = {
  0: {
    29: "Centro de Estudios Tecnológicos Ecatepec",
    30: "Preparatoria Oficial No. 128",
    31: "Secundaria Técnica 55",
    32: "Universidad Tecnológica de Nezahualcóyotl",
    33: "CBT No. 2 Nezahualcóyotl",
    34: "UAEM - Unidad Académica Toluca",
    35: "Instituto Tecnológico de Toluca",
    36: "Escuela Secundaria Oficial No. 1",
    37: "UAM Iztapalapa - Plantel Central",
    38: "CETIS No. 53 Iztapalapa",
    39: "Secundaria Diurna No. 115",
    40: "IPN - Escuela Superior de Ingeniería (ESIME)",
    41: "Preparatoria Nacional Plantel 9 UNAM",
    42: "Facultad de Filosofía y Letras UNAM",
    43: "CBTIS No. 2 Coyoacán",
    44: "Secundaria Técnica No. 17",
  },
  1: {
    29: "Centro de Estudios Tecnológicos Ecatepec",
    30: "Preparatoria Oficial No. 128",
    31: "Secundaria Técnica 55",
    32: "Universidad Tecnológica de Nezahualcóyotl",
    33: "CBT No. 2 Nezahualcóyotl",
    34: "UAEM - Unidad Académica Toluca",
    35: "Instituto Tecnológico de Toluca",
    36: "Escuela Secundaria Oficial No. 1",
    37: "UAM Iztapalapa - Plantel Central",
    38: "CETIS No. 53 Iztapalapa",
    39: "Secundaria Diurna No. 115",
    40: "IPN - Escuela Superior de Ingeniería (ESIME)",
    41: "Preparatoria Nacional Plantel 9 UNAM",
    42: "Facultad de Filosofía y Letras UNAM",
    43: "CBTIS No. 2 Coyoacán",
    44: "Secundaria Técnica No. 17",
  },
};

export function HomeSuperAdminSeP() {
    const { auth } = useAuth();

    const organizacion = auth?.me?.organizacion;

    const sedesDisponibles = sedesPorOrganizacion[organizacion] || {};
    const idsSedes = Object.keys(sedesDisponibles);

    const [key, setKey] = useState(null);
    const [sedesData, setSedesData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (idsSedes.length > 0) {
            setKey(idsSedes[0]);
        }
    }, [organizacion]);

    useEffect(() => {
        if (!key || !auth?.token) return;

        const fetchData = async () => {
            try {
            setLoading(true);

            const data = await getConteoNivelRiesgoSePBySedeApi(Number(key), auth.token);

            setSedesData((prev) => ({
                ...prev,
                [key]: data || []
            }));

            } catch (error) {
            console.error(error);
            } finally {
            setLoading(false);
            }
        };

        fetchData();
    }, [key, auth?.token]);

    return (
        <Container className="mt-4 container-home-admin-fase-1" style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div className="header-dashboard mb-4">
                <h1 className="fw-bold text-primary">Panel Super Admin - SEP</h1>
                <p className="text-muted">Indicadores específicos por estado.</p>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Cargando datos regionales...</p>
                </div>
            ) : (
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-4 custom-tabs"
                    fill
                >
                {idsSedes.map((id) => (
                    <Tab
                        eventKey={id}
                        title={sedesDisponibles[id]}
                        key={id}
                    >
                    <div className="p-4 bg-light rounded shadow-sm border">
                        <h3 className="mb-4 text-secondary">
                        Sede: {sedesDisponibles[id]}
                        </h3>

                        <Row>
                        {sedesData[id]?.length > 0 ? (
                            sedesData[id].map((item) => (
                            <Col
                                key={`${id}-${item.id_cuestionario}`}
                                xs={12}
                                sm={6}
                                lg={4}
                                className="mb-4"
                            >
                                <CardInfoNavigation
                                riskLevel={item.score}
                                account={item.score}
                                title={item.Cuestionario}
                                textLink="Ver análisis"
                                link={`/admin/super-gestor/sep/pacientes-riesgo`}
                                />
                            </Col>
                            ))
                        ) : (
                            <Col xs={12} className="text-center py-5">
                            <p className="text-muted italic">
                                No se encontraron datos para {sedesDisponibles[id]}.
                            </p>
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

export default HomeSuperAdminSeP;
