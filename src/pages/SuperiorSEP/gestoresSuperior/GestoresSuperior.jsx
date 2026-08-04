import React, { useEffect, useState, useMemo } from 'react';
import { Container, Button } from 'react-bootstrap';
import { RegisterGestorSuperiorForm } from '../../../components/adminsepsuperior/gestores/RegisterGestorSuperiorForm';
import { TableGestores } from '../../../components/adminsep/gestores/TableGestores';
import { getGestoresSepSuperior } from '../../../api/SepSuperior/gestoresSepSuperior';
import { useAuth } from '../../../hooks';
import { useGestoresSepSuperior } from "../../../hooks/SepSuperior/useGestoresSepSuperior";
import logoSesyn from '../../../assets/img/logoSesyn.png';
import "../../../pages/SuperiorSEP/homeSuperior/HomeSuperAdminSeP.css"
import './GestoresSuperior.css';

// CAMBIO: Asegúrate de importar aquí tus imágenes de las mascotas con tus rutas correctas
import mascotaIzq from '../../../assets/img/Castor.png';
import mascotaDer from '../../../assets/img/Conejo.png'

const sedesPorSubsistemaConstant = {
    'SUBSISTEMA DE UNIVERSIDADES DEL ESTADO DE MEXICO': {
        1: 'U DIGITAL DEL ESTADO DE MEXICO',
        2: 'U MEXIQUENSE DEL BICENTENARIO',
        3: 'U INTERCULTURAL DEL ESTADO DE MEXICO'
    },
    'SUBSISTEMA TECNOLOGICOS': {
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
        15: 'TES VILLA GUERRERO'
    },
    'SUBSISTEMA DE UNIVERSIDADES POLITECNICAS': {
        16: 'UP VALLE DE TOLUCA',
        17: 'UP VALLE DE MEXICO',
        18: 'UP TEXCOCO',
        19: 'UP ATLAUTLA',
        20: 'UP TECAMAC',
        21: 'UP ATLACOMULCO',
        22: 'UP OTZOLOTEPEC',
        23: 'UP CUATITLAN IZCALLI',
        24: 'UP CHIMALHUACAN'
    },
    'SUBSISTEMA DE UNIVERSIDADES TECNOLOGICAS': {
        25: 'UT NEZAHUALCOYOTL',
        26: 'UT DEL VALLE DE TOLUCA',
        27: 'UT FIDEL VELAZQUEZ',
        28: 'UT TECAMAC',
        29: 'UT ZINACANTEPEC',
        30: 'UT DEL SUR DEL ESTADO DE MEXICO'
    }
};

export function GestoresSuperior() {
    const { auth } = useAuth();
    const { getHospitales } = useGestoresSepSuperior();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    const [loading, setLoading] = useState(false);
    const [gestores, setGestores] = useState([]);
    const [reload, setReload] = useState(false);

    const [subsistemaSeleccionado, setSubsistemaSeleccionado] = useState('SUBSISTEMA DE UNIVERSIDADES DEL ESTADO DE MEXICO');
    const [sedeSeleccionada, setSedeSeleccionada] = useState(null);
    const [gestoresFiltrados, setGestoresFiltrados] = useState([]);

    const sedesPorSubsistema = useMemo(() => sedesPorSubsistemaConstant, []);
    const sedesDelSubsistema = useMemo(() => sedesPorSubsistema[subsistemaSeleccionado] || {}, [subsistemaSeleccionado, sedesPorSubsistema]);

    const listaEscuelasParaTabla = useMemo(() => {
        const lista = [];
        Object.values(sedesPorSubsistemaConstant).forEach(subsistema => {
            Object.entries(subsistema).forEach(([id, nombre]) => {
                lista.push({ id: Number(id), nombre: nombre });
            });
        });
        return lista;
    }, []);

    useEffect(() => {
        const cargarDatos = async () => {
            if (!auth?.token) return;

            try {
                setLoading(true);
                const dataGestores = await getGestoresSepSuperior(auth.token);
                setGestores(dataGestores || []);
                await getHospitales();
            } catch (error) {
                console.error("Error al obtener gestores de Superior:", error);
                setGestores([]);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [reload, auth?.token]);

    useEffect(() => {
        const primeraSede = Object.keys(sedesDelSubsistema)[0];
        setSedeSeleccionada(primeraSede ? Number(primeraSede) : null);
    }, [subsistemaSeleccionado, sedesDelSubsistema]);

    useEffect(() => {
        if (sedeSeleccionada && gestores.length > 0) {
            const filtered = gestores.filter(g => g.sede_id === sedeSeleccionada);
            setGestoresFiltrados(filtered);
        } else {
            setGestoresFiltrados([]);
        }
    }, [sedeSeleccionada, gestores]);

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
        openModal("Registrar Director, Profesor u Orientador", <RegisterGestorSuperiorForm onClose={closeModal} onReload={onReload} />);
    };

    const viewGestor = (gestor) => {
        openModal("Información del Director, Profesor u Orientador", <RegisterGestorSuperiorForm gestor={gestor} viewMode={true} onClose={closeModal} />);
    };

    return (
        <Container fluid className="gestores-superior-container mc-home-superior-sesyn p-0">

            {/* BANNER */}
            <div className="mc-banner-wave-sesyn">
                <div className="mc-banner-wave-sesyn__content">
                    <div className="mc-banner-wave-sesyn__text">
                        <h1>Gestión de Gestores</h1>
                        <p className="lead">Administración de directores, profesores y orientadores</p>
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

            {/* WRAPPER DEL CONTENIDO CENTRAL */}
            <div className="mc-content-wrapper-sesyn gestores-content-wrapper">
                <div className="mc-filtros-container-sesyn mb-5">
                    <div className="mc-filtro-card-sesyn">
                        <label className="mc-filtro-label-sesyn">
                            <span className="mc-filtro-icon-sesyn" role="img" aria-label="subsistema">🚩</span>
                            SELECCIONAR SUBSISTEMA:
                        </label>
                        <div className="mc-filtro-select-wrapper-sesyn">
                            <select
                                value={subsistemaSeleccionado}
                                onChange={(e) => setSubsistemaSeleccionado(e.target.value)}
                                className="mc-filtro-select-sesyn"
                            >
                                {Object.keys(sedesPorSubsistema).map((subsistema) => (
                                    <option key={subsistema} value={subsistema}>
                                        {subsistema} ({Object.keys(sedesPorSubsistema[subsistema]).length} escuelas)
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mc-filtro-card-sesyn">
                        <label className="mc-filtro-label-sesyn">
                            <span className="mc-filtro-icon-sesyn" role="img" aria-label="escuela">🏫</span>
                            SELECCIONAR UNIVERSIDAD:
                        </label>
                        <div className="mc-filtro-select-wrapper-sesyn">
                            <select
                                value={sedeSeleccionada || ''}
                                onChange={(e) => setSedeSeleccionada(Number(e.target.value))}
                                className="mc-filtro-select-sesyn"
                            >
                                {Object.entries(sedesDelSubsistema).map(([sedeId, sedeName]) => (
                                    <option key={sedeId} value={sedeId}>
                                        {sedeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Botón para agregar gestor */}
                <div className="btn-container mb-4">
                    <Button className="btn-agregar" onClick={addGestor}>
                        <span className="btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </span>
                        Registrar Director, Profesor u Orientador
                    </Button>
                </div>

                {loading ? (
                    <div className="alert alert-info mt-4">
                        <h5>Cargando gestores...</h5>
                    </div>
                ) : (
                    <>
                        {gestoresFiltrados.length === 0 ? (
                            <div className="alert alert-info mt-4">
                                No hay gestores registrados para la escuela seleccionada.
                            </div>
                        ) : (
                            <div className="tabla-gestores-wrapper">
                                <TableGestores
                                    gestores={gestoresFiltrados}
                                    hospitales={listaEscuelasParaTabla}
                                    onViewGestor={viewGestor}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ONDA FOOTER (MODIFICADO CON AMBAS MASCOTAS) */}
            <div className="mc-footer-wave-sesyn" aria-hidden="true">
                <svg className="mc-footer-wave-sesyn__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <rect className="mc-footer-wave-sesyn__base" width="1440" height="120" />
                    <path className="mc-footer-wave-sesyn__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
                </svg>
            </div>

            {/* ONDA FOOTER (MODIFICADO CON AMBAS MASCOTAS) */}
            <div className="footer-personajes-wrapper">
                {/* Mascota Izquierda */}
                <img src={mascotaIzq} alt="Mascota Izquierda" className="personaje-izq" />

                {/* Mascota Derecha */}
                <img src={mascotaDer} alt="Mascota Derecha" className="personaje-der" />
            </div>

            {/* MODAL (vista de Registrar) */}
            {showModal && (
                <div className="modal-custom-overlay" onClick={closeModal}>
                    <div className="modal-custom-wrapper" onClick={(e) => e.stopPropagation()}>
                        {contentModal}
                    </div>
                </div>
            )}
        </Container>
    );
}

export default GestoresSuperior;