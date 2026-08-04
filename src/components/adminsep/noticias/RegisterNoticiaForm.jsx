import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../../hooks';
import { createNoticiaSeP } from '../../../api/sep/noticiasSEP';

export function RegisterNoticiaForm({ onClose, onReload }) {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
   
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion_previa: "",
        descripcion: "",
        estatus: 1,
        imagen: ""
    });
    const isDescripcionExcedida = formData.descripcion_previa.length > 100;

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
        }
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
        } catch (error) {
            console.error("Error en la traducción:", error);
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

            await createNoticiaSeP(dataToSend, auth.token);
            onReload();
            onClose();
        } catch (error) {
           console.error("Error del servicio:", error);    
            const data = error.response?.data || error.data;
            let errorMessage = "Ocurrió un error al registrar la noticia.";

            if (data) {
                if (data.descripcion_previa || data.previous_description) {
                    errorMessage = "La Descripción Previa supera el límite de 100 caracteres permitido.";
                } 
                else if (data.detail) {
                    errorMessage = data.detail; 
                } else if (data.message) {
                    errorMessage = data.message; 
                } 
                else if (typeof data === 'string') {
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
                    rows={2} name="descripcion_previa"
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
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
                {formData.imagen && (
                    <div className="mt-3 text-center">
                        <p className="text-muted small mb-1">Vista previa:</p>
                        <img
                            src={formData.imagen}
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
    disabled={loading}
    style={{ background: "#4DB6AC", borderColor: "#4DB6AC" }}>
    {loading && <Spinner as="span" animation="border" size="sm" className="me-2" />}
    Guardar Noticia
</Button>
            </div>
        </Form>
    );
}