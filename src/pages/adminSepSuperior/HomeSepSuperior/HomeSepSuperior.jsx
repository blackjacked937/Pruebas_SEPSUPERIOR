import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useAuth } from '../../../hooks';
import { CardInfoNavigation } from '../../../components/common';
import { getConteoNivelRiesgoSepSuperiorAdminApi } from '../../../api/SepSuperior';
import logoSesyn from "../../../assets/img/logoSesyn.png";
import './HomeSepSuperior.css';
import "../../../pages/superAdminSEP/homeSuperAdminSeP/HomeSuperAdminSeP.css"; 
import mascotaIzq from '../../../assets/img/Castor.png'; 
import mascotaDer from '../../../assets/img/Conejo.png';

const nombresSedesSuperior = {
    1: 'U DIGITAL DEL ESTADO DE MEXICO',
    2: 'U MEXIQUENSE DEL BICENTENARIO',
    3: 'U INTERCULTURAL DEL ESTADO DE MEXICO',
    4: 'TES ECATEPEC',
    5: 'TES COACALCO',
    6: 'TES CHIMALHUACAN',
    7: 'TES CHALCO',
    8: 'TES CUAUTITLAN IZCALLI',
    9: 'TES HUIXQUILUCAN',
    10: 'TES IXTAPALUCA',
    11: 'TES JOCOTITLAN',
    12: 'TES SAN FELIPE DEL PROGRESO',
    13: 'TES TIANGUISTENGO',
    14: 'TES VALLE DE BRAVO',
    15: 'TES VILLA GUERRERO',
    16: 'UP VALLE DE TOLUCA',
    17: 'UP VALLE DE MEXICO',
    18: 'UP TEXCOCO',
    19: 'UP ATLAUTLA',
    20: 'UP TECAMAC',
    21: 'UP ATLACOMULCO',
    22: 'UP OTZOLOTEPEC',
    23: 'UP CUATITLAN IZCALLI',
    24: 'UP CHIMALHUACAN',
    25: 'UT NEZAHUALCOYOTL',
    26: 'UT DEL VALLE DE TOLUCA',
    27: 'UT FIDEL VELAZQUEZ',
    28: 'UT TECAMAC',
    29: 'UT ZINACANTEPEC',
    30: 'UT DEL SUR DEL ESTADO DE MEXICO'
};

export function HomeSepSuperior() {
    const { auth } = useAuth();

    const [datosAdmin, setDatosAdmin] = useState([]);
    const [loading, setLoading] = useState(true);

    const idSedeUsuario = auth?.me?.sede_id;
    const nombreSedeActual = nombresSedesSuperior[idSedeUsuario] || 'Sede General';

    useEffect(() => {
        const cargarDatos = async () => {
            if (!auth?.token) return;

            try {
                setLoading(true);
                const response = await getConteoNivelRiesgoSepSuperiorAdminApi(auth.token);
                setDatosAdmin(response || []);
            } catch (error) {
                console.error('Error cargando vista de Gestor Superior SEP:', error);
                setDatosAdmin([]);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [auth?.token]);

    return (
        <div className="home-superior-container">
            {/* ONDA SUPERIOR */}
            <div className="mc-banner-wave">
                <div className="mc-banner-wave__content">
                    <div className="mc-banner-wave__text">
                        <h1>Panel de Administración: {nombreSedeActual}</h1>
                        <p className="lead">Resumen de indicadores de riesgo para esta institución.</p>
                    </div>
                    <div className="mc-banner-wave__logo">
                        <img src={logoSesyn} alt="Secretaría de Educación Pública" className="mc-banner-sep-logo" />
                    </div>
                </div>
            </div>

            {/* TRANSICIÓN DE LA ONDA */}
            <div className="mc-banner-transition" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
                        fill="#F4F6F9"
                    />
                </svg>
            </div>

            <Container className="home-superior-body">
                <Row className="justify-content-center">
                    {loading ? (
                        <Col className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                            <p className="mt-2">Sincronizando datos...</p>
                        </Col>
                    ) : datosAdmin.length > 0 ? (
                        datosAdmin.map((item) => (
                            <Col key={item.id_cuestionario} xs={12} sm={6} md={4} className="mb-5 px-3">
                                <CardInfoNavigation
                                    riskLevel={item.score}
                                    account={item.score}
                                    title={item.Cuestionario}
                                    subTitle={`Sede: ${nombreSedeActual}`}
                                    textLink="Ver Reporte Completo"
                                    link="/admin/gestor/sep-superior/grupo"
                                />
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <p className="text-muted">Sin datos de evaluación.</p>
                        </Col>
                    )}
                </Row>

                {!loading && (
                    <div className="mt-5 p-3 bg-white rounded border text-center shadow-sm status-footer-info">
                        <small className="text-muted">
                            * Datos acumulados de la sede <strong>{nombreSedeActual}</strong>.
                        </small>
                    </div>
                )}
            </Container>
            {/* ONDA CON PERSONAJES */}
            <div className="mc-footer-wave-home" aria-hidden="true">
                <svg className="mc-footer-wave-home__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <rect className="mc-footer-wave-home__base" width="1440" height="120" />
                    <path className="mc-footer-wave-home__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
                </svg>
            </div>
            <div className="footer-personajes-wrapper-home">
                {/* Mascota Izquierda (Castor) */}
                <img src={mascotaIzq} alt="Mascota Izquierda" className="personaje-izq-home" />
                
                {/* Mascota Derecha (Conejo) */}
                <img src={mascotaDer} alt="Mascota Derecha" className="personaje-der-home" />
            </div>
        </div>
    );
}

export default HomeSepSuperior;