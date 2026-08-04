import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { InputForm, SelectForm } from '../../ui';
import { useGestoresSEP } from "../../../hooks/sep/useGestoresSEP";
import './RegisterGestorForm.css';

export function RegisterGestorForm(props) {
    const { onClose, onReload, gestor, viewMode } = props;
    const [catalogs, setCatalogs] = useState([]);
    const [countries, setCountries] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [estados, setEstados] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const { getCatalogosGestores, getHospitales, nuevoGestor, getPaises, getEstadosByPais, getCiudadesByEstado } = useGestoresSEP();

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
        validateOnChange: true,
        onSubmit: async (formValue) => {
            try {
                await nuevoGestor(formValue);
                toast.success('Gestor registrado correctamente');
                onReload();
                onClose();
            } catch (error) {
                toast.error(error.message);
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
        const loadEstados = async () => {
            if (formik.values.id_estado) {
                try {
                    const res = await getCiudadesByEstado(formik.values.id_estado);
                    setCiudades(res);
                } catch (error) {
                    console.error("Error cargando estados", error);
                    setCiudades([]);
                }
            } else {
                setCiudades([]);
            }
        };

        loadEstados();
    }, [formik.values.id_estado]);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="section-container">
                <h5 className="section-title">
                    <i className="bi bi-person-vcard"></i> Información Personal
                </h5>
                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <InputForm
                            nameInput="nombre"
                            placeHolderInput="Nombre (s)"
                            icon={<i className="bi bi-person"></i>}
                            valueInput={formik.values.nombre}
                            onChangeInput={formik.handleChange}
                            error={formik.errors.nombre}
                            touched={formik.touched.nombre}
                            disabled={viewMode}
                            maxLength={20}
                        />
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <InputForm
                            nameInput="apellido_paterno"
                            placeHolderInput="Apellido Paterno"
                            icon={<i className="bi bi-person"></i>}
                            valueInput={formik.values.apellido_paterno}
                            onChangeInput={formik.handleChange}
                            error={formik.errors.apellido_paterno}
                            touched={formik.touched.apellido_paterno}
                            disabled={viewMode}
                            maxLength={20}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <InputForm
                            nameInput="apellido_materno"
                            placeHolderInput="Apellido Materno"
                            icon={<i className="bi bi-person"></i>}
                            valueInput={formik.values.apellido_materno}
                            onChangeInput={formik.handleChange}
                            error={formik.errors.apellido_materno}
                            touched={formik.touched.apellido_materno}
                            disabled={viewMode}
                            maxLength={20}
                        />
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <InputForm
                            placeHolderInput="Email"
                            nameInput="email"
                            type="email"
                            icon={<i className="bi bi-envelope"></i>}
                            valueInput={formik.values.email}
                            onChangeInput={formik.handleChange}
                            error={formik.errors.email}
                            touched={formik.touched.email}
                            disabled={viewMode}
                            maxLength={100}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        {!viewMode && <InputForm
                            nameInput="password"
                            type="password"
                            placeHolderInput="Contraseña"
                            icon={<i className="bi bi-lock"></i>}
                            valueInput={formik.values.password}
                            onChangeInput={formik.handleChange}
                            error={formik.errors.password}
                            touched={formik.touched.password}
                            disabled={viewMode}
                        />}
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <InputForm
                            nameInput="celular_paciente"
                            placeHolderInput="Celular"
                            icon={<i className="bi bi-telephone"></i>}
                            valueInput={formik.values.celular_paciente}
                            onChangeInput={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                if (onlyNums.length <= 13) {
                                    formik.setFieldValue('celular_paciente', onlyNums);
                                }
                            }}
                            error={formik.errors.celular_paciente}
                            touched={formik.touched.celular_paciente}
                            disabled={viewMode}
                            maxLength={13}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <InputForm
                            nameInput="matricula_laboral"
                            placeHolderInput="Matrícula Laboral"
                            icon={<i className="bi bi-person-badge"></i>}
                            valueInput={formik.values.matricula_laboral}
                            onChangeInput={formik.handleChange}
                            error={formik.errors.matricula_laboral}
                            touched={formik.touched.matricula_laboral}
                            disabled={viewMode}
                            maxLength={20}
                        />
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <SelectForm
                            placeholder="Sede"
                            name="sede_id"
                            icon={<i className="bi bi-hospital"></i>}
                            options={hospitals.filter(h => h.organizacion === 1).map(h => ({ id: h.id, opcion: h.nombre }))}
                            value={formik.values.sede_id}
                            onChange={formik.handleChange}
                            error={formik.errors.sede_id}
                            touched={formik.touched.sede_id}
                            disabled={viewMode}
                        />
                    </Col>
                </Row>
            </div>
            <div className="section-container">
                <h5 className="section-title">
                    <i className="bi bi-briefcase"></i> Información Profesional
                </h5>
                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <SelectForm
                            placeholder="Grado"
                            name="id_grado"
                            icon={<i className="bi bi-mortarboard"></i>}
                            options={getOptions("Grado")}
                            value={formik.values.id_grado}
                            onChange={formik.handleChange}
                            error={formik.errors.id_grado}
                            touched={formik.touched.id_grado}
                            disabled={viewMode}
                        />
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <SelectForm
                            placeholder="Tipo de Contratación"
                            name="id_contratacion"
                            icon={<i className="bi bi-file-earmark-text"></i>}
                            options={getOptions("Tipo de contrato")}
                            value={formik.values.id_contratacion}
                            onChange={formik.handleChange}
                            error={formik.errors.id_contratacion}
                            touched={formik.touched.id_contratacion}
                            disabled={viewMode}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <SelectForm
                            placeholder="Cargo"
                            name="id_cargo"
                            icon={<i className="bi bi-briefcase"></i>}
                            options={getOptions("Sep")}
                            value={formik.values.id_cargo}
                            onChange={formik.handleChange}
                            error={formik.errors.id_cargo}
                            touched={formik.touched.id_cargo}
                            disabled={viewMode}
                        />
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <SelectForm
                            placeholder="País"
                            name="id_pais"
                            icon={<i className="bi bi-globe-americas"></i>}
                            options={countries.map(p => ({ id: p.id, opcion: p.descripcion }))}
                            value={formik.values.id_pais}
                            onChange={formik.handleChange}
                            error={formik.errors.id_pais}
                            touched={formik.touched.id_pais}
                            disabled={viewMode}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} className="mb-3">
                        <SelectForm
                            placeholder="Estado"
                            name="id_estado"
                            icon={<i className="bi bi-map"></i>}
                            options={estados.map(e => ({
                                id: e.id,
                                opcion: e.descripcion
                            }))}
                            value={formik.values.id_estado}
                            onChange={formik.handleChange}
                            error={formik.errors.id_estado}
                            touched={formik.touched.id_estado}
                            disabled={viewMode}
                        />
                    </Col>
                    <Col xs={12} md={6} className="mb-3">
                        <SelectForm
                            placeholder="Ciudad"
                            name="id_ciudad"
                            icon={<i className="bi bi-pin-map"></i>}
                            options={ciudades.map(c => ({ id: c.id, opcion: c.descripcion }))}
                            value={formik.values.id_ciudad}
                            onChange={formik.handleChange}
                            error={formik.errors.id_ciudad}
                            touched={formik.touched.id_ciudad}
                            disabled={viewMode}
                        />
                    </Col>
                </Row>
            </div>
            {!viewMode && (
                <div className="d-flex justify-content-center mt-4">
                    <Button 
                    type="submit" 
                    variant="success" 
                    className="btn-submit-gestor">
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
        id_pais: gestor?.id_pais || '',
        id_estado: gestor?.id_estado || '',
        id_ciudad: gestor?.id_ciudad || '',
        id_cargo: gestor?.id_cargo || '',
    };
}

function newSchema() {
    return {
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido_paterno: Yup.string().required('El apellido paterno es obligatorio'),
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
        id_ciudad: Yup.number().required('La ciudad es obligatorio'),

    };
}
