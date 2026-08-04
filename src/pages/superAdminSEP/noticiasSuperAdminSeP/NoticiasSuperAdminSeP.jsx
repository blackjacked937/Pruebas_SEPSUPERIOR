import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button, Card, Alert, Form } from 'react-bootstrap';
import { ModalBasic } from '../../../components/ui/modalBasic';
import { useAuth } from '../../../hooks';
import { getNoticiasSeP, deleteNoticiaSeP } from '../../../api/sep/noticiasSEP';
import { DetalleNoticia } from '../../../components/adminsep/noticias/DetalleNoticia';
import { RegisterNoticiaForm } from '../../../components/adminsep/noticias/RegisterNoticiaForm';
import './NoticiasSuperAdminSeP.css';
import { SepHeader } from "../../../components/sep/sepHeader";
import { SepFooter } from "../../../components/sep/sepFooter";
import { FaPlus } from 'react-icons/fa';
import AOS from 'aos';
import { BASE_API_SEP_V1 } from '../../../utils/constants';

export function NoticiasSuperAdminSeP() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);
    const [noticias, setNoticias] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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
                const response = await getNoticiasSeP(auth.token);
                setNoticias(response);
            } catch (error) {
                console.error("Error al cargar:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [auth, reload]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
    }, [loading]);

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

    const addNoticia = () => {
        openModal("Registrar Nueva Noticia", <RegisterNoticiaForm onClose={closeModal} onReload={onReload} />);
    };

    const viewNoticia = (noticia) => {
        openModal("Información de la Noticia", <DetalleNoticia noticia={noticia} />);
    };

    const confirmDelete = async (idNoticia) => {
        try {
            setErrorMsg("");
            await deleteNoticiaSeP(auth.token, idNoticia);
            onReload();
            closeModal();
        } catch (error) {
            setErrorMsg("Error al eliminar la noticia. Inténtalo más tarde.");
            closeModal();
        }
    };

    const onDeleteClick = (noticia) => {
        openModal(
            "Confirmar Eliminación",
            <div>
                <p>¿Estás seguro de que deseas eliminar la noticia <strong>"{noticia.titulo}"</strong>?</p>
                <p className="text-danger">Esta acción no se puede deshacer.</p>
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button variant="secondary" onClick={closeModal} style={{ borderRadius: '50px' }}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(noticia.id)} style={{ borderRadius: '50px' }}>
                        Sí, eliminar
                    </Button>
                </div>
            </div>
        );
    };

    const onUpdateClick = (noticia) => {
        openModal(
            "Modificar Noticia",
            <EditNoticiaForm
                noticia={noticia}
                onClose={closeModal}
                onReload={onReload}
                token={auth.token}
            />
        );
    };

    return (
        <Container fluid className="container-graficas-sep overflow-hidden d-flex flex-column" style={{ minHeight: '100vh', padding: '24px' }}>

            <div style={{ margin: "-24px -24px -30px -24px" }}>
                <SepHeader title="Gestión de Noticias" />
            </div>

            <div className="d-flex justify-content-end px-3 mb-4" style={{ position: 'relative', zIndex: 10 }}>
                <Button
                    className="d-flex align-items-center gap-2 px-4 py-2 btn-registrar-noticia"
                    onClick={addNoticia}
                >
                    <FaPlus /> Registrar Nueva Noticia
                </Button>
            </div>

            <div className="flex-grow-1 px-3">
                {errorMsg && <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible className="rounded-4">{errorMsg}</Alert>}

                {loading ? (
                    <div className="text-center mt-5">
                        <Spinner animation="border" style={{ color: "#7DB747" }} />
                        <p className="mt-2 text-muted fw-bold">Cargando noticias...</p>
                    </div>
                ) : (
                    <Row>
                        {noticias?.map((noticia, index) => (
                            <Col key={noticia.id || index} lg={4} md={12} className="mb-4" data-aos="fade-up" data-aos-delay={index * 100}>

                                <Card className="h-100 border-0 noticia-card-ola">

                                    <div className="noticia-img-container">
                                        {noticia.imagen ? (
                                            <img
                                                src={formatBase64(noticia.imagen)}
                                                alt={noticia.titulo}
                                            />
                                        ) : (
                                            <span style={{ color: '#999', fontSize: '0.9rem' }}>Sin imagen</span>
                                        )}
                                    </div>

                                    <div className="noticia-content-container">
                                        <div>
                                            <h5 className="noticia-titulo">
                                                {noticia.titulo}
                                            </h5>
                                            <p className="noticia-descripcion">
                                                {noticia.descripcion_previa}
                                            </p>
                                        </div>

                                        <div className="d-flex flex-wrap justify-content-start gap-2 mt-3">
                                            <Button
                                                className="btn-noticia-ver"
                                                onClick={() => viewNoticia(noticia)}
                                            >
                                                Ver completa
                                            </Button>

                                            <Button
                                                className="btn-noticia-actualizar"
                                                onClick={() => onUpdateClick(noticia)}
                                            >
                                                Modificar
                                            </Button>

                                            <Button
                                                className="btn-noticia-eliminar"
                                                onClick={() => onDeleteClick(noticia)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
            <ModalBasic
                show={showModal}
                onClose={closeModal}
                title={titleModal}
                children={contentModal}
                size="md"
            />
        </Container>
    );
}

async function updateNoticiaSeP(token, idNoticia, data) {
    const url = `${BASE_API_SEP_V1}/catalogo/noticias/${idNoticia}/`;
    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    try {
        const response = await fetch(url, params);
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (parseError) {
                errorData = { message: "Error interno del servidor" };
            }
            throw {
                response: {
                    status: response.status,
                    data: errorData,
                },
            };
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

function EditNoticiaForm({ noticia, onClose, onReload, token }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        titulo: noticia.titulo || "",
        descripcion_previa: noticia.descripcion_previa || "",
        descripcion: noticia.descripcion || "",
        estatus: noticia.estatus ?? 1,
        imagen: noticia.imagen || ""
    });

    const isDescripcionExcedida = formData.descripcion_previa.length > 100;

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (err) => reject(err);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setFormData({ ...formData, imagen: base64 });
        }
    };

    const formatBase64 = (base64String) => {
        if (!base64String) return "";
        if (base64String.startsWith('data:image')) return base64String;
        return `data:image/png;base64,${base64String}`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const translateText = async (text) => {
        if (!text) return "";
        try {
            const response = await fetch(`https:/api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en`);
            const data = await response.json();
            return data.responseData?.translatedText || text;
        } catch (err) {
            console.error("Error en la traducción:", err);
            return text;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const translatedTitle = await translateText(formData.titulo);
            const translatedPrevDesc = await translateText(formData.descripcion_previa);
            const translatedDesc = await translateText(formData.descripcion);

            const dataToSend = {
                titulo: formData.titulo,
                title: translatedTitle,
                descripcion_previa: formData.descripcion_previa,
                previous_description: translatedPrevDesc,
                descripcion: formData.descripcion,
                description: translatedDesc,
                estatus: formData.estatus,
                imagen: formData.imagen
            };

            await updateNoticiaSeP(token, noticia.id, dataToSend);
            onReload();
            onClose();
        } catch (err) {
            console.error("Error del servicio:", err);
            const data = err.response?.data || err.data;
            let errorMessage = "Ocurrió un error al actualizar la noticia.";

            if (data) {
                if (data.descripcion_previa || data.previous_description) {
                    errorMessage = "La Descripción Previa supera el límite de 100 caracteres permitido.";
                } else if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.message) {
                    errorMessage = data.message;
                } else if (typeof data === 'string') {
                    errorMessage = data;
                }
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Título de la Noticia</Form.Label>
                <Form.Control type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción Previa (Resumen)</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    name="descripcion_previa"
                    value={formData.descripcion_previa}
                    onChange={handleChange}
                    required
                    isInvalid={isDescripcionExcedida}
                />
                {isDescripcionExcedida && (
                    <div className="text-danger mt-1" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        Asegúrese de que este campo no tenga más de 100 caracteres.
                    </div>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción Completa</Form.Label>
                <Form.Control as="textarea" rows={5} name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Imagen de Portada</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {formData.imagen && (
                    <div className="mt-3 text-center">
                        <p className="text-muted small mb-1">Vista previa:</p>
                        <img
                            src={formatBase64(formData.imagen)}
                            alt="Preview"
                            style={{
                                height: '150px',
                                width: '100%',
                                objectFit: 'contain',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                )}
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button 
                    variant="primary"
                    type="submit" 
                    disabled={loading || isDescripcionExcedida}
                    style={{ background: "#4DB6AC", borderColor: "#4DB6AC" }}
                >
                    {loading && <Spinner as="span" animation="border" size="sm" className="me-2" />}
                    Guardar Cambios
                </Button>
            </div>
        </Form>
    );
}

export default NoticiasSuperAdminSeP;