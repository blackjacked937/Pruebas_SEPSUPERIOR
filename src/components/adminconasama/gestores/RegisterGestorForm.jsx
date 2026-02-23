import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { InputForm, SelectForm } from '../../ui';
import { registerGestorApi } from '../../../api/conasama/gestores';
import { useGestores } from "../../../hooks/conasama/useGestores";

export function RegisterGestorForm(props) {
    const { onClose, onReload } = props;
    const [catalogs, setCatalogs] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const { getCatalogosGestores, getHospitales, nuevoGestor } = useGestores();

    useEffect(() => {
        (async () => {
            try {

                const result = await getCatalogosGestores();
                const host = await getHospitales();
                setCatalogs(result);
                setHospitals(host);
            } catch (error) {
                toast.error("No se pudieron cargar los catálogos");
            }
        })();
    }, []);

    const getOptions = (name) => {
        const catalog = catalogs.find((c) => c.nombre === name);
        return catalog ? catalog.data : [];
    };

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
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

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col md={6}>
                    <InputForm
                        label="Nombre"
                        nameInput="nombre"
                        placeHolderInput="Nombre"
                        valueInput={formik.values.nombre}
                        onChangeInput={formik.handleChange}
                        error={formik.errors.nombre}
                        touched={formik.touched.nombre}
                    />
                </Col>
                <Col md={6}>
                    <InputForm
                        label="Apellido Paterno"
                        nameInput="apellido_paterno"
                        placeHolderInput="Apellido Paterno"
                        valueInput={formik.values.apellido_paterno}
                        onChangeInput={formik.handleChange}
                        error={formik.errors.apellido_paterno}
                        touched={formik.touched.apellido_paterno}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <InputForm
                        label="Apellido Materno"
                        nameInput="apellido_materno"
                        placeHolderInput="Apellido Materno"
                        valueInput={formik.values.apellido_materno}
                        onChangeInput={formik.handleChange}
                        error={formik.errors.apellido_materno}
                        touched={formik.touched.apellido_materno}
                    />
                </Col>
                <Col md={6}>
                    <InputForm
                        label="Email"
                        nameInput="email"
                        placeHolderInput="example@mail.com"
                        valueInput={formik.values.email}
                        onChangeInput={formik.handleChange}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <InputForm
                        label="Contraseña"
                        nameInput="password"
                        type="password"
                        placeHolderInput="********"
                        valueInput={formik.values.password}
                        onChangeInput={formik.handleChange}
                        error={formik.errors.password}
                        touched={formik.touched.password}
                    />
                </Col>
                <Col md={6}>
                    <InputForm
                        label="Celular"
                        nameInput="celular_paciente"
                        placeHolderInput="5550438408"
                        valueInput={formik.values.celular_paciente}
                        onChangeInput={formik.handleChange}
                        error={formik.errors.celular_paciente}
                        touched={formik.touched.celular_paciente}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <InputForm
                        label="Matrícula Laboral"
                        nameInput="matricula_laboral"
                        placeHolderInput="3432434343"
                        valueInput={formik.values.matricula_laboral}
                        onChangeInput={formik.handleChange}
                        error={formik.errors.matricula_laboral}
                        touched={formik.touched.matricula_laboral}
                    />
                </Col>
                <Col md={6}>
                    <SelectForm
                        label="Sede"
                        name="sede_id"
                        options={hospitals.map(h => ({ id: h.id, opcion: h.nombre }))}
                        value={formik.values.sede_id}
                        onChange={formik.handleChange}
                        error={formik.errors.sede_id}
                        touched={formik.touched.sede_id}
                    />
                </Col>
            </Row>

            <hr />
            <h5 className="text-center mb-3">Información Profesional</h5>

            <Row>
                <Col md={6}>
                    <SelectForm
                        label="Grado"
                        name="id_grado"
                        options={getOptions("Grado")}
                        value={formik.values.id_grado}
                        onChange={formik.handleChange}
                        error={formik.errors.id_grado}
                        touched={formik.touched.id_grado}
                    />
                </Col>
                <Col md={6}>
                    <SelectForm
                        label="Tipo de Contratación"
                        name="id_contratacion"
                        options={getOptions("Tipo de contratación")}
                        value={formik.values.id_contratacion}
                        onChange={formik.handleChange}
                        error={formik.errors.id_contratacion}
                        touched={formik.touched.id_contratacion}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <SelectForm
                        label="Perfil"
                        name="id_perfil"
                        options={getOptions("Perfil")}
                        value={formik.values.id_perfil}
                        onChange={formik.handleChange}
                        error={formik.errors.id_perfil}
                        touched={formik.touched.id_perfil}
                    />
                </Col>
                <Col md={6}>
                    <SelectForm
                        label="Nivel"
                        name="id_nivel"
                        options={getOptions("Nivel")}
                        value={formik.values.id_nivel}
                        onChange={formik.handleChange}
                        error={formik.errors.id_nivel}
                        touched={formik.touched.id_nivel}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <SelectForm
                        label="Cargo"
                        name="id_cargo"
                        options={getOptions("Cargo")}
                        value={formik.values.id_cargo}
                        onChange={formik.handleChange}
                        error={formik.errors.id_cargo}
                        touched={formik.touched.id_cargo}
                    />
                </Col>
                <Col md={6}>
                    <SelectForm
                        label="Profesión"
                        name="id_profesion"
                        options={getOptions("Profesión")}
                        value={formik.values.id_profesion}
                        onChange={formik.handleChange}
                        error={formik.errors.id_profesion}
                        touched={formik.touched.id_profesion}
                    />
                </Col>
            </Row>

            <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="primary" style={{ background: "#4DB6AC", borderColor: "#4DB6AC" }}>
                    Registrar Gestor
                </Button>
            </div>
        </Form>
    );
}

function initialValues() {
    return {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        password: '',
        celular_paciente: '',
        matricula_laboral: '',
        sede_id: '',
        is_active: true,
        estatus: 1,
        id_grado: '',
        id_contratacion: '',
        id_clues: 0,
        id_perfil: '',
        id_nivel: '',
        id_cargo: '',
        id_profesion: '',
    };
}

function newSchema() {
    return {
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido_paterno: Yup.string().required('El apellido paterno es obligatorio'),
        apellido_materno: Yup.string(),
        email: Yup.string().email('Email no válido').required('El email es obligatorio'),
        password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es obligatoria'),
        celular_paciente: Yup.string().min(10, 'El celular debe tener al menos 10 caracteres').max(10, 'El celular debe tener al menos 10 caracteres').required('El celular es obligatorio'),
        matricula_laboral: Yup.string().required('La matrícula es obligatoria'),
        sede_id: Yup.number().required('El ID de sede es obligatorio'),
        id_grado: Yup.number().required('El grado es obligatorio'),
        id_contratacion: Yup.number().required('El tipo de contratación es obligatorio'),
        id_perfil: Yup.number().required('El perfil es obligatorio'),
        id_nivel: Yup.number().required('El nivel es obligatorio'),
        id_cargo: Yup.number().required('El cargo es obligatorio'),
        id_profesion: Yup.number().required('La profesión es obligatoria'),
    };
}
