import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useGestoresSepSuperior } from "../../../hooks/SepSuperior/useGestoresSepSuperior";

export function RegisterGestorSuperiorForm(props) {
    const { onClose, onReload, gestor, viewMode } = props;
    const [catalogs, setCatalogs] = useState([]);
    const [countries, setCountries] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [estados, setEstados] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const { getCatalogosGestores, getHospitales, nuevoGestor, getPaises, getEstadosByPais, getCiudadesByEstado } = useGestoresSepSuperior();

    useEffect(() => {
        (async () => {
            try {
                const result = await getCatalogosGestores();
                const host = await getHospitales();
                const pais = await getPaises();

                setCountries(pais);
                setCatalogs(result);
                setHospitals(host);
            } catch (error) {
                console.error("Error cargando catálogos:", error);
                toast.error("No se pudieron cargar los catálogos");
            }
        })();
    }, []);

    const getOptions = (name) => {
        const catalog = catalogs.find((c) => c.nombre === name);
        const opciones = catalog
            ? catalog.data.filter(
                (d) => d.opcion !== "Tecnico" && d.opcion !== "Estudiante" 
                && d.opcion !== "Pasante" && d.opcion !== "A fin"
                && d.opcion !== "Rama Medica" && d.opcion !== "Otro"
            )
            : [];
        return opciones;
    };

    const formik = useFormik({
        initialValues: initialValues(gestor),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await nuevoGestor(formValue);
                toast.success('Gestor registrado correctamente');
                onReload();
                onClose();
            } catch (error) {
                if (
                    error?.status === 409 ||
                    (error?.message && error.message.toLowerCase().includes('correo'))
                ) {
                    toast.error('El correo ya está registrado. Por favor usa otro correo.');
                } else {
                    toast.error(error?.message || 'Ocurrió un error al registrar el gestor');
                }
            }
        },
    });

    useEffect(() => {
        const loadEstados = async () => {
            if (formik.values.id_pais) {
                try {
                    const res = await getEstadosByPais(formik.values.id_pais);
                    setEstados(res);
                } catch (error) {
                    console.error("Error cargando estados", error);
                    setEstados([]);
                }
            } else {
                setEstados([]);
            }
        };
        loadEstados();
    }, [formik.values.id_pais]);

    useEffect(() => {
        const loadCiudades = async () => {
            if (formik.values.id_estado) {
                try {
                    const res = await getCiudadesByEstado(formik.values.id_estado);
                    setCiudades(res);
                } catch (error) {
                    console.error("Error cargando ciudades", error);
                    setCiudades([]);
                }
            } else {
                setCiudades([]);
            }
        };
        loadCiudades();
    }, [formik.values.id_estado]);

    const cardStyle = {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '28px',
        padding: '30px 40px',
        marginBottom: '25px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.02)'
    };

    const wrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #e2e8f0',
        borderRadius: '35px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        height: '46px',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.05)'
    };

    const iconStyle = {
        backgroundColor: '#f8fafc',
        color: '#64748b',
        height: '100%',
        minWidth: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid #e2e8f0',
        fontSize: '1.05rem'
    };

    const inputStyle = {
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        padding: '0 20px',
        fontSize: '0.95rem',
        color: '#1e293b',
        backgroundColor: 'transparent'
    };

    const selectStyle = {
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        padding: '0 20px',
        fontSize: '0.95rem',
        color: '#1e293b',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 20px center',
        backgroundSize: '14px'
    };

    return (
        <Form onSubmit={formik.handleSubmit} style={{ padding: '30px 40px', backgroundColor: '#ffffff', borderRadius: '32px', position: 'relative' }}>
            
            <button 
                type="button" 
                onClick={onClose} 
                style={{
                    position: 'absolute',
                    top: '38px',
                    right: '40px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.25rem',
                    color: '#64748b',
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                }}
            >
                <i className="bi bi-x-lg"></i>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '35px', paddingLeft: '10px', paddingRight: '40px' }}>
                <div style={{ 
                    color: '#1e293b', 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    border: '1.8px solid #1e293b', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '1.4rem', 
                    flexShrink: 0 
                }}>
                    <i className="bi bi-person" style={{ lineHeight: 0, display: 'inline-block' }}></i>
                </div>
                <div>
                    <h3 style={{ margin: 0, fontWeight: '700', color: '#000000', fontSize: '1.5rem', letterSpacing: '-0.3px', lineHeight: '1.2' }}>
                        Registrar Director, Profesor u Orientador
                    </h3>
                    <p style={{ margin: '4px 0 0 0', color: '#747d8c', fontSize: '0.9rem' }}>
                        Completa la información para registrar un nuevo gestor
                    </p>
                </div>
            </div>

            <div style={cardStyle}>
                <div style={{ marginBottom: '24px' }}>
                    <h5 style={{ color: '#3b82f6', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                        <i className="bi bi-person" style={{ fontSize: '1.2rem' }}></i> Información Personal
                    </h5>
                </div>
                
                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-person"></i></span>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre (s)"
                                style={inputStyle}
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                                maxLength={20}
                            />
                        </div>
                        {formik.touched.nombre && formik.errors.nombre && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.nombre}</div>}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-person"></i></span>
                            <input
                                type="text"
                                name="apellido_paterno"
                                placeholder="Apellido Paterno"
                                style={inputStyle}
                                value={formik.values.apellido_paterno}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                                maxLength={20}
                            />
                        </div>
                        {formik.touched.apellido_paterno && formik.errors.apellido_paterno && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.apellido_paterno}</div>}
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-person"></i></span>
                            <input
                                type="text"
                                name="apellido_materno"
                                placeholder="Apellido Materno"
                                style={inputStyle}
                                value={formik.values.apellido_materno}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                                maxLength={20}
                            />
                        </div>
                        {formik.touched.apellido_materno && formik.errors.apellido_materno && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.apellido_materno}</div>}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-envelope"></i></span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                style={inputStyle}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                                maxLength={20}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.email}</div>}
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} className="mb-3">
                            <div style={wrapperStyle}>
                                <span style={iconStyle}><i className="bi bi-lock"></i></span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    style={inputStyle}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    disabled={viewMode}
                                />
                            </div>
                        
                        {formik.touched.password && formik.errors.password && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.password}</div>}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-phone"></i></span>
                            <input
                                type="text"
                                name="celular_paciente"
                                placeholder="Celular"
                                style={inputStyle}
                                value={formik.values.celular_paciente}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                    if (onlyNums.length <= 13) {
                                        formik.setFieldValue('celular_paciente', onlyNums);
                                    }
                                }}
                                disabled={viewMode}
                            />
                        </div>
                        {formik.touched.celular_paciente && formik.errors.celular_paciente && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.celular_paciente}</div>}
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-file-earmark-text"></i></span>
                            <input
                                type="text"
                                name="matricula_laboral"
                                placeholder="Matricula Laboral"
                                style={inputStyle}
                                value={formik.values.matricula_laboral}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                                maxLength={20}
                            />
                        </div>
                        {formik.touched.matricula_laboral && formik.errors.matricula_laboral && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.matricula_laboral}</div>}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-building"></i></span>
                            <select
                                name="sede_id"
                                style={selectStyle}
                                value={formik.values.sede_id}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                            >
                                <option value="" disabled>Sede</option>
                                {hospitals.filter(h => h.organizacion === 1).map(h => (
                                    <option key={h.id} value={h.id}>{h.nombre}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.sede_id && formik.errors.sede_id && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.sede_id}</div>}
                    </Col>
                </Row>
            </div>

            <div style={cardStyle}>
                <div style={{ marginBottom: '24px' }}>
                    <h5 style={{ color: '#3b82f6', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                        <i className="bi bi-briefcase" style={{ fontSize: '1.2rem' }}></i> Información Profesional
                    </h5>
                </div>

                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-briefcase"></i></span>
                            <select
                                name="id_grado"
                                style={selectStyle}
                                value={formik.values.id_grado}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                            >
                                <option value="" disabled>Grado</option>
                                {getOptions("Grado").map(o => (
                                    <option key={o.id} value={o.id}>{o.opcion}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.id_grado && formik.errors.id_grado && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.id_grado}</div>}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-file-person"></i></span>
                            <select
                                name="id_contratacion"
                                style={selectStyle}
                                value={formik.values.id_contratacion}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                            >
                                <option value="" disabled>Tipo de Contratación</option>
                                {getOptions("Tipo de contrato").map(o => (
                                    <option key={o.id} value={o.id}>{o.opcion}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.id_contratacion && formik.errors.id_contratacion && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.id_contratacion}</div>}
                    </Col>
                </Row>
                
                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-person-badge"></i></span>
                            <select
                                name="id_cargo"
                                style={selectStyle}
                                value={formik.values.id_cargo}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                            >
                                <option value="" disabled>Cargo</option>
                                {getOptions("Sep").map(o => (
                                    <option key={o.id} value={o.id}>{o.opcion}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.id_cargo && formik.errors.id_cargo && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.id_cargo}</div>}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-globe"></i></span>
                            <select
                                name="id_pais"
                                style={selectStyle}
                                value={formik.values.id_pais}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                            >
                                <option value="" disabled>Pais</option>
                                {countries.map(p => (
                                    <option key={p.id} value={p.id}>{p.descripcion}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.id_pais && formik.errors.id_pais && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.id_pais}</div>}
                    </Col>
                </Row>
                
                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-map"></i></span>
                            <select
                                name="id_estado"
                                style={selectStyle}
                                value={formik.values.id_estado}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                            >
                                <option value="" disabled>Estado</option>
                                {estados.map(e => (
                                    <option key={e.id} value={e.id}>{e.descripcion}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.id_estado && formik.errors.id_estado && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.id_estado}</div>}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <div style={wrapperStyle}>
                            <span style={iconStyle}><i className="bi bi-geo-alt"></i></span>
                            <select
                                name="id_ciudad"
                                style={selectStyle}
                                value={formik.values.id_ciudad}
                                onChange={formik.handleChange}
                                disabled={viewMode}
                            >
                                <option value="" disabled>Ciudad</option>
                                {ciudades.map(c => (
                                    <option key={c.id} value={c.id}>{c.descripcion}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.id_ciudad && formik.errors.id_ciudad && <div style={{ color: '#dc3545', fontSize: '0.82rem', paddingLeft: '18px', marginTop: '4px' }}>{formik.errors.id_ciudad}</div>}
                    </Col>
                </Row>
            </div>

            {!viewMode && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                    <Button 
                        type="submit" 
                        style={{ 
                            backgroundColor: '#e0e7ff', 
                            color: '#0f4c75', 
                            borderColor: 'transparent',
                            padding: '12px 50px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            borderRadius: '25px',
                            boxShadow: '0 4px 12px rgba(15, 76, 117, 0.12)'
                        }}
                    >
                        Registrar Gestor
                    </Button>
                </div>
            )}
        </Form>
    );
}

function initialValues(gestor) {
    return {
        nombre: gestor?.nombre || '',
        apellido_paterno: gestor?.apellido_paterno || '',
        apellido_materno: gestor?.apellido_materno || '',
        email: gestor?.email || '',
        password: gestor ? '********' : '',
        celular_paciente: gestor?.celular_paciente || '',
        matricula_laboral: gestor?.matricula_laboral || '',
        sede_id: gestor?.sede_id || '',
        is_active: gestor ? gestor.is_active : true,
        estatus: gestor?.estatus || 1,
        id_grado: gestor?.id_grado || '',
        id_contratacion: gestor?.id_contratacion || '',
        id_pais:gestor?.id_pais || '',
        id_estado:gestor?.id_estado || '',
        id_ciudad:gestor?.id_ciudad || '',
        id_cargo: gestor?.id_cargo || '',
    };
}

function newSchema() {
    return {
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido_paterno: Yup.string().required('El apellido paternal es obligatorio'),
        apellido_materno: Yup.string().required('El apellido materno es obligatorio'),
        email: Yup.string().email('Email no válido').required('El email es obligatorio'),
        password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es obligatoria'),
        celular_paciente: Yup.string().min(10, 'El celular debe tener al menos 10 caracteres').max(10, 'El celular debe tener al menos 10 caracteres').required('El celular es obligatorio'),
        matricula_laboral: Yup.string().min(10, 'La matrícula debe tener al menos 10 caracteres').max(10, 'La matrícula debe tener al menos 10 caracteres').required('La matrícula es obligatoria'),
        sede_id: Yup.number().required('El ID de sede es obligatorio'),
        id_grado: Yup.number().required('El grado es obligatorio'),
        id_contratacion: Yup.number().required('El tipo de contratación es obligatorio'),
        id_cargo: Yup.number().required('El cargo es obligatorio'),
        id_pais: Yup.number().required('El pais es obligatorio'),
        id_estado: Yup.number().required('El estado es obligatorio'),
        id_ciudad:Yup.number().required('La ciudad es obligatorio'),
    };
}