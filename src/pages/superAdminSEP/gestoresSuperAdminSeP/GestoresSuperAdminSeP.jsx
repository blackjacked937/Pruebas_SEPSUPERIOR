import React, { useEffect, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { ModalBasic } from "../../../components/ui/modalBasic";
import { RegisterGestorForm } from "../../../components/adminsep/gestores/RegisterGestorForm";
import { TableGestores } from "../../../components/adminsep/gestores/TableGestores";
import { useGestoresSEP } from "../../../hooks/sep/useGestoresSEP";
import { SepHeader } from "../../../components/sep/sepHeader";
import { SepFooter } from "../../../components/sep/sepFooter";
import avatarGestores from "../../../assets/img/AvatarGestores.png";

import {
    getPaises,
    getMunicipio,
    getEscuela,
} from "../../../api/sep";

import "./GestoresSuperAdminSeP.css";

export function GestoresSuperAdminSeP() {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [subtitleModal, setSubtitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    const {
        loading,
        getGestores,
        gestores,
        getHospitales,
        hospitales,
    } = useGestoresSEP();

    const [reload, setReload] = useState(false);

    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [escuelas, setEscuelas] = useState([]);

    const [estadoSeleccionado, setEstadoSeleccionado] =
        useState("");

    const [
        municipioSeleccionado,
        setMunicipioSeleccionado,
    ] = useState("");

    const [sedeSeleccionada, setSedeSeleccionada] =
        useState("");

    const [
        gestoresFiltrados,
        setGestoresFiltrados,
    ] = useState([]);

    // =====================================
    // HELPERS
    // =====================================

    const getMunicipiosByEstado = async (
        idEstado
    ) => {
        return await getMunicipio(idEstado);
    };

    const getEscuelasByMunicipio = async (
        idMunicipio
    ) => {
        return await getEscuela(idMunicipio);
    };

    // =====================================
    // CARGAR GESTORES
    // =====================================

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                await getGestores();
                await getHospitales();
            } catch (error) {
                console.error("Error de conexión al cargar los gestores:", error);
            }
        };

        cargarDatos();
    }, [
        reload,
        getGestores,
        getHospitales,
    ]);

    // =====================================
    // CARGAR ESTADOS
    // =====================================

    useEffect(() => {
        const cargarEstados = async () => {
            try {
                const data = await getPaises();

                const estadosPermitidos = (data || []).filter((estado) => {
                    const nombre = estado.descripcion
                        ?.trim()
                        .toLowerCase();

                    return (
                        nombre === "estado de méxico" ||
                        nombre === "ciudad de méxico"
                    );
                });

                setEstados(estadosPermitidos);

                if (estadosPermitidos.length > 0) {
                    setEstadoSeleccionado(
                        estadosPermitidos[0].id
                    );
                }
            } catch (error) {
                console.error(
                    "Error cargando estados",
                    error
                );
            }
        };

        cargarEstados();
    }, []);

    // =====================================
    // CARGAR MUNICIPIOS
    // =====================================

    useEffect(() => {
        if (!estadoSeleccionado) return;

        const cargarMunicipios = async () => {
            try {
                const data =
                    await getMunicipiosByEstado(
                        estadoSeleccionado
                    );

                setMunicipios(data || []);

                if (data?.length > 0) {
                    setMunicipioSeleccionado(
                        data[0].id
                    );
                } else {
                    setMunicipioSeleccionado("");
                    setEscuelas([]);
                    setSedeSeleccionada("");
                }
            } catch (error) {
                console.error(
                    "Error cargando municipios",
                    error
                );
            }
        };

        cargarMunicipios();
    }, [estadoSeleccionado]);

    // =====================================
    // CARGAR ESCUELAS
    // =====================================

    useEffect(() => {
        if (!municipioSeleccionado) return;

        const cargarEscuelas = async () => {
            try {
                const data =
                    await getEscuelasByMunicipio(
                        municipioSeleccionado
                    );

                setEscuelas(data || []);

                if (data?.length > 0) {
                    setSedeSeleccionada(
                        data[0].id
                    );
                } else {
                    setSedeSeleccionada("");
                }
            } catch (error) {
                console.error(
                    "Error cargando escuelas",
                    error
                );
            }
        };

        cargarEscuelas();
    }, [municipioSeleccionado]);

    // =====================================
    // FILTRAR GESTORES
    // =====================================

    useEffect(() => {
        if (
            !sedeSeleccionada ||
            !gestores?.length
        ) {
            setGestoresFiltrados([]);
            return;
        }

        const filtered = gestores.filter(
            (g) =>
                Number(g.sede_id) ===
                Number(sedeSeleccionada)
        );

        setGestoresFiltrados(filtered);

    }, [sedeSeleccionada, gestores]);

    // =====================================
    // MODAL
    // =====================================

    const onReload = () =>
        setReload((prev) => !prev);

    const openModal = (
        title,
        content
    ) => {
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
        setTitleModal("Registrar Director, Profesor u Orientador");
        setSubtitleModal("Completa la información para registrar un nuevo gestor");
        setContentModal(
            <RegisterGestorForm
                onClose={closeModal}
                onReload={() => setReload(!reload)}
                viewMode={false}
            />
        );
        setShowModal(true);
    };

    const viewGestor = (gestor) => {
        openModal(
            "Información del Director, Profesor u Orientador",
            <RegisterGestorForm
                gestor={gestor}
                viewMode={true}
                onClose={closeModal}
            />
        );
    };

    const estadoActual = estados.find(
        (e) =>
            e.id === Number(estadoSeleccionado)
    );

    const municipioActual =
        municipios.find(
            (m) =>
                m.id ===
                Number(municipioSeleccionado)
        );

    const escuelaActual = escuelas.find(
        (e) =>
            e.id === Number(sedeSeleccionada)
    );

    return (
        <div
            className="d-flex flex-column w-100 min-vh-100"
            style={{ background: "linear-gradient(135deg, #f8fafb 0%, #eef2f5 100%)" }}
        >
            <SepHeader
                title="Gestión de Gestores"
                subtitle="Administración de directores, profesores y orientadores"
            />
            <Container
                className="gestores-container flex-grow-1"
            >
                {/* FILTROS */}

                <div className="filtros-container mb-5">

                    <div className="filtro-wrapper">
                        <label className="filtro-label">
                            🚩 ESTADO
                        </label>

                        <select
                            className="filtro-select"
                            value={
                                estadoSeleccionado
                            }
                            onChange={(e) =>
                                setEstadoSeleccionado(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        >
                            {estados.map(
                                (estado) => (
                                    <option
                                        key={
                                            estado.id
                                        }
                                        value={
                                            estado.id
                                        }
                                    >
                                        {
                                            estado.descripcion
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="filtro-wrapper">
                        <label className="filtro-label">
                            🏢 MUNICIPIO
                        </label>

                        <select
                            className="filtro-select"
                            value={
                                municipioSeleccionado
                            }
                            onChange={(e) =>
                                setMunicipioSeleccionado(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        >
                            {municipios.map(
                                (municipio) => (
                                    <option
                                        key={
                                            municipio.id
                                        }
                                        value={
                                            municipio.id
                                        }
                                    >
                                        {
                                            municipio.descripcion
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="filtro-wrapper">
                        <label className="filtro-label">
                            🏫 ESCUELA
                        </label>

                        <select
                            className="filtro-select"
                            value={
                                sedeSeleccionada
                            }
                            onChange={(e) =>
                                setSedeSeleccionada(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        >
                            {escuelas.map(
                                (escuela) => (
                                    <option
                                        key={
                                            escuela.id
                                        }
                                        value={
                                            escuela.id
                                        }
                                    >
                                        {
                                            escuela.nombre
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>
                <div className="btn-container mb-4">
                    <Button
                        variant="success"
                        className="btn-agregar"
                        onClick={addGestor}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Registrar Director, Profesor u Orientador
                    </Button>
                </div>

                {loading ? (
                    <div className="alert alert-info mt-4">
                        Cargando gestores...
                    </div>
                ) : gestoresFiltrados.length ===
                    0 ? (
                    <div className="alert alert-info mt-4">
                        No hay gestores registrados
                        para la escuela seleccionada.
                    </div>
                ) : (
                    <TableGestores
                        gestores={
                            gestoresFiltrados
                        }
                        hospitales={hospitales}
                        onViewGestor={
                            viewGestor
                        }
                        onDeleteGestor={(gestor) => {
                            import('sweetalert2').then((Swal) => {
                                Swal.default.fire({
                                    title: '¿Estás seguro?',
                                    text: `¿Deseas eliminar al gestor ${gestor.nombre} ${gestor.apellido_paterno}?`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#dc3545',
                                    cancelButtonColor: '#6c757d',
                                    confirmButtonText: 'Sí, eliminar',
                                    cancelButtonText: 'Cancelar'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.default.fire(
                                            '¡Eliminado!',
                                            'El gestor ha sido eliminado.',
                                            'success'
                                        );
                                    }
                                });
                            });
                        }}
                    />
                )}

                <ModalBasic
                    show={showModal}
                    onClose={closeModal}
                    title={titleModal}
                    subtitle={subtitleModal}
                    align="left"
                    icon={<i className="bi bi-person"></i>}
                    children={contentModal}
                    size="lg"
                />
            </Container>
            <div className="footer-personajes-wrapper">
                {!showModal && !loading && gestoresFiltrados.length === 0 && (
                    <div
                        className="personaje-sin-datos"
                        style={{ backgroundImage: `url(${avatarGestores})` }}
                    ></div>
                )}

            </div>
        </div>
    );
}

export default GestoresSuperAdminSeP;