import React, { useState, useEffect, useMemo } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../../hooks';
import { CardInfoNavigation } from '../../../components/common';
import { 
    getConteoPorNivelRiesgoCategoriaBySedeSePS 
} from '../../../api/SepSuperior/graficasEstadisticasSepSuperior';
import { 
    getSubsistemasSuperior, 
    getUniversidadesSuperior 
} from '../../../api/SepSuperior/catalogoSepSuperior';
import logoSesyn from '../../../assets/img/logoSesyn.png';
import mascotaIzq from '../../../assets/img/Castor.png'; 
import mascotaDer from '../../../assets/img/Conejo.png'; 
import '../../../pages/SuperiorSEP/homeSuperior/HomeSuperAdminSeP.css';

export function HomeSuperior() {
    const { auth } = useAuth();

    const [subsistemas, setSubsistemas] = useState([]);
    const [universidades, setUniversidades] = useState([]);
    const [subsistemaSeleccionado, setSubsistemaSeleccionado] = useState('');
    const [sedeSeleccionada, setSedeSeleccionada] = useState(''); 
    
    const [sedesData, setSedesData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingCatalogos, setLoadingCatalogos] = useState(true);
    const [error, setError] = useState(null);

    // 1. Cargar Catálogos
    useEffect(() => {
        const fetchCatalogos = async () => {
            if (!auth?.token) return;
            try {
                setLoadingCatalogos(true);
                const [dataSub, dataUniv] = await Promise.all([
                    getSubsistemasSuperior(auth.token),
                    getUniversidadesSuperior(auth.token)
                ]);

                const arraySub = Array.isArray(dataSub) ? dataSub : (dataSub?.results || []);
                const arrayUniv = Array.isArray(dataUniv) ? dataUniv : (dataUniv?.results || []);

                setSubsistemas(arraySub);
                setUniversidades(arrayUniv);

                if (arraySub.length > 0) {
                    setSubsistemaSeleccionado(String(arraySub[0].id));
                }
            } catch (err) {
                console.error("Error catálogos:", err);
                setError("Error al cargar catálogos de instituciones.");
            } finally {
                setLoadingCatalogos(false);
            }
        };
        fetchCatalogos();
    }, [auth?.token]);

    // 2. Filtrar universidades por subsistema
    const universidadesFiltradas = useMemo(() => {
        if (!subsistemaSeleccionado) return [];
        return universidades.filter(u => String(u.ciudad) === String(subsistemaSeleccionado));
    }, [universidades, subsistemaSeleccionado]);

    // 3. Seleccionar automáticamente la primera universidad del subsistema
    useEffect(() => {
        if (universidadesFiltradas.length > 0) {
            setSedeSeleccionada(String(universidadesFiltradas[0].id));
        } else {
            setSedeSeleccionada('');
        }
    }, [universidadesFiltradas]);

    // 4. Cargar conteos de la sede seleccionada
    useEffect(() => {
        const cargarDatos = async () => {
            if (!auth?.token || !sedeSeleccionada) return;

            try {
                setLoading(true);
                const data = await getConteoPorNivelRiesgoCategoriaBySedeSePS(
                    Number(sedeSeleccionada),
                    auth.token
                );

                const items = data.map(group => ({
                    id_cuestionario: group.data[0]?.id_cuestionario,
                    Cuestionario: group.title,
                    score: group.data[0]?.score || 0
                }));

                setSedesData({
                    [sedeSeleccionada]: items
                });
            } catch (error) {
                console.error("Error cargando datos:", error);
                setSedesData({ [sedeSeleccionada]: [] });
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [sedeSeleccionada, auth?.token]);

    const nombreSedeActual = useMemo(() => {
        return universidades.find(u => String(u.id) === String(sedeSeleccionada))?.nombre || "";
    }, [universidades, sedeSeleccionada]);

    const nombreSubsistemaActual = useMemo(() => {
        return subsistemas.find(s => String(s.id) === String(subsistemaSeleccionado))?.descripcion || "";
    }, [subsistemas, subsistemaSeleccionado]);

    return (
        <Container fluid className="container-super-admin-sesyn mc-home-superior-sesyn p-0">

            {/* BANNER */}
            <div className="mc-banner-wave-sesyn">
                <div className="mc-banner-wave-sesyn__content">
                    <div className="mc-banner-wave-sesyn__text">
                        <h1>Panel de Supervisión - SESyN</h1>
                        <p className="lead">Sistema de Evaluación y Prevención de Riesgos</p>
                    </div>
                    <div className="mc-banner-wave-sesyn__logo">
                        <img src={logoSesyn} alt="Secretaría de Educación Pública" className="mc-banner-sesyn-logo" />
                    </div>
                </div>
            </div>

            {/* ONDA DE TRANSICION */}
            <div className="mc-banner-transition-sesyn" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            {/* CAMBIO: position + zIndex inline, garantiza que el contenido pinte por encima del footer sin importar el CSS externo */}
            <div className="mc-content-wrapper-sesyn" style={{ position: 'relative', zIndex: 10 }}>

                {error && <Alert variant="danger">{error}</Alert>}

                {loadingCatalogos ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3">Cargando instituciones...</p>
                    </div>
                ) : (
                    <div className="mc-filtros-container-sesyn mb-2">
                        <div className="mc-filtro-card-sesyn">
                            <label className="mc-filtro-label-sesyn">
                                <span className="mc-filtro-icon-sesyn" role="img" aria-label="subsistema">🚩</span>
                                Seleccionar Subsistema:
                            </label>
                            <div className="mc-filtro-select-wrapper-sesyn">
                                <select
                                    className="mc-filtro-select-sesyn"
                                    value={subsistemaSeleccionado}
                                    onChange={(e) => setSubsistemaSeleccionado(e.target.value)}
                                >
                                    {subsistemas.map((sub) => (
                                        <option key={sub.id} value={sub.id}>
                                            {sub.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mc-filtro-card-sesyn">
                            <label className="mc-filtro-label-sesyn">
                                <span className="mc-filtro-icon-sesyn" role="img" aria-label="escuela">🏫</span>
                                Seleccionar Escuela:
                            </label>
                            <div className="mc-filtro-select-wrapper-sesyn">
                                <select
                                    className="mc-filtro-select-sesyn"
                                    value={sedeSeleccionada}
                                    onChange={(e) => setSedeSeleccionada(e.target.value)}
                                    disabled={universidadesFiltradas.length === 0}
                                >
                                    {universidadesFiltradas.length > 0 ? (
                                        universidadesFiltradas.map((univ) => (
                                            <option key={univ.id} value={univ.id}>
                                                {univ.nombre}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Sin escuelas disponibles</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

            
                {loading ? (
                    <div className="loading-container-super">
                        <div className="loading-spinner-super" role="status"></div>
                        <p className="loading-text-super">Sincronizando datos...</p>
                    </div>
                ) : sedeSeleccionada && sedesData[sedeSeleccionada] ? (
                    <div className="mc-indicadores-grid-sesyn">
                        {sedesData[sedeSeleccionada].length > 0 ? (
                            sedesData[sedeSeleccionada].map((item) => (
                                <div key={item.id_cuestionario} style={{ position: 'relative', zIndex: 5 }}>
                                    <CardInfoNavigation
                                        riskLevel={item.score}
                                        account={item.score}
                                        title={item.Cuestionario}
                                        subTitle={nombreSedeActual}
                                        textLink="Ver Reporte"
                                        link="/admin/superior-gestor/sep-superior/grupo"
                                        state={{ sedeId: sedeSeleccionada }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="sede-sin-datos">
                                <p>Sin datos de evaluación</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="loading-container-super">
                        <p className="loading-text-super">
                            Selecciona una escuela para ver los datos
                        </p>
                    </div>
                )}

            </div>

            {/* ONDA CON PERSONAJES */}
            <div className="mc-footer-wave-sesyn" aria-hidden="true">
                <svg className="mc-footer-wave-sesyn__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <rect className="mc-footer-wave-sesyn__base" width="1440" height="120" />
                    <path className="mc-footer-wave-sesyn__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
                </svg>
            </div>
            <div className="footer-personajes-wrapper-sesyn">
                {/* Mascota Izquierda */}
                <img src={mascotaIzq} alt="Mascota Izquierda" className="personaje-izq" />

                {/* Mascota Derecha */}
                <img src={mascotaDer} alt="Mascota Derecha" className="personaje-der"/>
            </div>
        </Container>
    );
}

export default HomeSuperior;