import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { ModalBasic } from '../../../components/ui/modalBasic';
import { useAuth } from '../../../hooks';
import { getNoticiasSePSuperior, deleteNoticiaSePSuperior } from '../../../api/SepSuperior/noticiasSEPSuperior';
import { DetalleNoticia } from '../../../components/adminsepsuperior/noticias/DetalleNoticia';
import { RegisterNoticiaForm } from '../../../components/adminsepsuperior/noticias/RegisterNoticiaForm';
import { EditNoticiaForm } from '../../../components/adminsepsuperior/noticias/EditNoticiaForm';
import logoSesyn from '../../../assets/img/logoSesyn.png';
import { toast } from 'react-toastify';

import '../homeSuperior/HomeSuperAdminSeP.css';
import './NoticiasSuperior.css';

export function NoticiasSuperior() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);
    const [noticias, setNoticias] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const { auth } = useAuth();

    const onReload = () => setReload((prevState) => !prevState);

    const formatBase64 = (base64String) => {
        if (!base64String) return "";
        if (base64String.startsWith('data:image')) return base64String;
        return `data:image/png;base64,${base64String}`;
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getNoticiasSePSuperior(auth.token);
                setNoticias(response);
            } catch (error) {
                console.error("Error al cargar:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [auth, reload]);

    useEffect(() => {
        if(successMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg("");
            }, 3000);
            return() => clearTimeout(timer);
        }
    }, [successMsg]);

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

    // 1. Modal para registrar noticia
    const addNoticia = () => {
        openModal("Registrar Nueva Noticia", <RegisterNoticiaForm onClose={closeModal} onReload={onReload} />);
    };

    // 2. Modal para ver detalle
    const viewNoticia = (noticia) => {
        openModal("Información de la Noticia", <DetalleNoticia noticia={noticia} />);
    };

      // 3. Modal para editar noticia
    const editNoticia = (noticia) => {
        openModal("Editar Noticia", <EditNoticiaForm noticia={noticia} onClose={closeModal} onReload={onReload} />);
    };

    // 3. Función real que ejecuta la eliminación en la API
    const confirmDelete = async (idNoticia) => {
        try {
            await deleteNoticiaSePSuperior(auth.token, idNoticia);
            toast.success("Noticia eliminada correctamente.");
            onReload();
            closeModal();
        } catch (error) {
            toast.error("Error al eliminar la noticia. Inténtalo más tarde.");
            closeModal();
        }
    };

    // 4. Modal para preguntar si está seguro
    const onDeleteClick = (noticia) => {
        openModal(
            "Confirmar Eliminación",
            <div>
                <p>¿Estás seguro de que deseas eliminar la noticia <strong>"{noticia.titulo}"</strong>?</p>
                <p className="text-danger">Esta acción no se puede deshacer.</p>
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(noticia.id)}>
                        Sí, eliminar
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Container fluid className="container-super-admin-sesyn mc-home-superior-sesyn p-0">

            {/* BANNER */}
            <div className="mc-banner-wave-sesyn">
                <div className="mc-banner-wave__content">
                    <div className="mc-banner-wave__text">
                        <h1>Gestión de Noticias</h1>
                        <p className="lead">Administración de noticias y comunicados</p>
                    </div>
                    <div className="mc-banner-wave__logo">
                        <img src={logoSesyn} alt="Secretaría de Educación Pública" className="mc-banner-sep-logo" />
                    </div>
                </div>
            </div>

            {/* ONDA DE TRANSICION */}
            <div className="mc-banner-transition" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            <div className="mc-content-wrapper">

                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="mc-noticias-subtitle">Noticias publicadas</h2>
                    </Col>
                    <Col className="text-end">
                        <Button className="mc-btn-agregar" onClick={addNoticia}>
                            Registrar Nueva Noticia
                        </Button>
                    </Col>
                </Row>

                {successMsg && (<Alert variant="success" onClose={() => setSuccessMsg("")} dismissible>
                    {successMsg}
                </Alert>)}

                {errorMsg && <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>{errorMsg}</Alert>}

                {loading ? (
                    <div className="loading-container-super">
                        <div className="loading-spinner-super" role="status"></div>
                        <p className="loading-text-super">Cargando noticias...</p>
                    </div>
                ) : (
                    <Row>
                        {noticias?.map((noticia, index) => (
                            <Col key={noticia.id || index} lg={6} xl={4} className="mb-4 d-flex justify-content-center">
                                <Card className="news-card-horizontal news-card-green">
                                    <div className="news-horizontal-row">
                                        <div className="news-img-side-wrap">
                                            {noticia.imagen ? (
                                                <img
                                                    src={formatBase64(noticia.imagen)}
                                                    alt={noticia.titulo}
                                                    className="news-img-side"
                                                />
                                            ) : (
                                                <div className="news-img-side-placeholder">Sin imagen</div>
                                            )}
                                        </div>
                                        <div className="news-content-side">
                                            <h5 className="news-card-title">{noticia.titulo}</h5>
                                            <p className="news-card-desc">{noticia.descripcion_previa}</p>
                                        </div>
                                    </div>
                                    <div className="news-card-actions">
                                        <Button className="btn-noticia-ver" onClick={() => viewNoticia(noticia)}>
                                            Ver completa
                                        </Button>
                                        <Button className="btn-noticia-actualizar" onClick={() => editNoticia(noticia)}>
                                            Editar
                                        </Button>
                                        <Button className="btn-noticia-eliminar" onClick={() => onDeleteClick(noticia)}>
                                            Eliminar
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                <ModalBasic
                    show={showModal}
                    onClose={closeModal}
                    title={titleModal}
                    children={contentModal}
                    size="md"
                />
            </div>

            {/* ONDA FOOTER */}
            <div className="mc-footer-wave-sesyn" aria-hidden="true">
                <svg className="mc-footer-wave-sesyn__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <rect className="mc-footer-wave-sesyn__base" width="1440" height="120" />
                    <path className="mc-footer-wave-sesyn__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
                </svg>
            </div>
        </Container>
    );
}

export default NoticiasSuperior;