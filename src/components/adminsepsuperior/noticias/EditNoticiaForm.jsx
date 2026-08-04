import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks';
import { updateNoticiaSePSuperior } from '../../../api/SepSuperior/noticiasSEPSuperior';

const TITULO_MAX_LENGTH = 50;
const DESCRIPCION_PREVIA_MAX_LENGTH = 100;

export function EditNoticiaForm({ noticia, onClose, onReload }) {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const [formData, setFormData] = useState({
        titulo: noticia.titulo || "",
        descripcion_previa: noticia.descripcion_previa || "",
        descripcion: noticia.descripcion || "",
        estatus: noticia.estatus ?? 1,
        imagen: noticia.imagen || "",
    });

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setFormData({ ...formData, imagen: base64 });

            if (errors.imagen) {
                setErrors({ ...errors, imagen: "" });
            }
        }
    };

    const formatBase64 = (base64String) => {
        if (!base64String) return "";
        if (base64String.startsWith('data:image')) return base64String;
        return `data:image/png;base64,${base64String}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "titulo" && value.length > TITULO_MAX_LENGTH) {
            return;
        }

        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const translateText = async (text) => {
        if (!text) return "";
        try {
            const response = await fetch(`https:/api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en`);
            const data = await response.json();
            return data.responseData?.translatedText || text;
        } catch (error) {
            console.error("Error en la traducción:", error);
            return text;
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.titulo.trim()) {
            newErrors.titulo = "El título es obligatorio.";
        }

        if (!formData.descripcion_previa.trim()) {
            newErrors.descripcion_previa = "La descripción previa es obligatoria.";
        } else if (formData.descripcion_previa.length > DESCRIPCION_PREVIA_MAX_LENGTH) {
            newErrors.descripcion_previa = `No debe superar los ${DESCRIPCION_PREVIA_MAX_LENGTH} caracteres.`;
        }

        if (!formData.descripcion.trim()) {
            newErrors.descripcion = "La descripción completa es obligatoria.";
        }

        if (!formData.imagen) {
            newErrors.imagen = "La imagen de portada es obligatoria.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError("");

        if (!validateForm()) {
            return;
        }

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
                imagen: formData.imagen,
            };

            await updateNoticiaSePSuperior(auth.token, noticia.id, dataToSend);

            onReload();

            toast.success("¡Noticia actualizada correctamente!");
            onClose();
        } catch (error) {
            console.error(error);
            if (error.descripcion_previa && error.descripcion_previa.length > 0) {
                setErrors({ ...errors, descripcion_previa: error.descripcion_previa[0] });
            } else if (error.previous_description && error.previous_description.length > 0) {
                setErrors({ ...errors, descripcion_previa: error.previous_description[0] });
            } else if (error.detail) {
                setGeneralError(error.detail);
            } else {
                setGeneralError("Error al actualizar la noticia. Inténtalo más tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            {generalError && <Alert variant="danger">{generalError}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label style={{ color: "#4DB6AC" }}>
                    Título de la Noticia <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    maxLength={TITULO_MAX_LENGTH}
                    isInvalid={!!errors.titulo}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.titulo}
                </Form.Control.Feedback>
                <div className="text-end">
                    <small className="text-muted">
                        {formData.titulo.length}/{TITULO_MAX_LENGTH}
                    </small>
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{ color: "#4DB6AC" }}>
                    Descripción Previa (Resumen) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    name="descripcion_previa"
                    value={formData.descripcion_previa}
                    onChange={handleChange}
                    maxLength={DESCRIPCION_PREVIA_MAX_LENGTH}
                    isInvalid={!!errors.descripcion_previa}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.descripcion_previa}
                </Form.Control.Feedback>
                <div className="text-end">
                    <small className="text-muted">
                        {formData.descripcion_previa.length}/{DESCRIPCION_PREVIA_MAX_LENGTH}
                    </small>
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{ color: "#4DB6AC" }}>
                    Descripción Completa <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    isInvalid={!!errors.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.descripcion}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label style={{ color: "#4DB6AC" }}>
                    Imagen de Portada <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    isInvalid={!!errors.imagen}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.imagen}
                </Form.Control.Feedback>

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
                <Button variant="primary" type="submit" disabled={loading} style={{ background: "#4DB6AC", borderColor: "#4DB6AC" }}>
                    {loading && <Spinner as="span" animation="border" size="sm" className="me-2" />}
                    Guardar Cambios
                </Button>
            </div>
        </Form>
    );
}