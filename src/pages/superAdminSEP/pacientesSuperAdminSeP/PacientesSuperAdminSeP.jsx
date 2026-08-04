import React, { useEffect, useState } from "react";
import { useNivelRiesgoBySedeSeP } from "../../../hooks/sep";
import { Container } from "react-bootstrap";
import { TableNivelRiesgoBySede } from "../../../components/adminsep/dashboard/tableNivelRiesgoBySede/TableNivelRiesgoBySede";
import {
  getPaises,
  getMunicipio,
  getEscuela,
} from "../../../api/sep";

import { SepHeader } from "../../../components/sep/sepHeader";
import { SepFooter } from "../../../components/sep/sepFooter"; 

import "./PacientesSuperAdminSeP.css";

export function PacientesSuperAdminSeP() {
  const {
    dataBySede,
    loadingBySede,
    getSedeData,
  } = useNivelRiesgoBySedeSeP();
  
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [escuelas, setEscuelas] = useState([]);
  
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");

  const getMunicipiosByEstado = async (idEstado) => {
    return await getMunicipio(idEstado);
  };

  const getEscuelasByMunicipio = async (idMunicipio) => {
    return await getEscuela(idMunicipio);
  };

  useEffect(() => {
    const cargarEstados = async () => {
      try {
        const data = await getPaises();
        setEstados(data || []);
        if (data?.length > 0) {
          setEstadoSeleccionado(data[0].id);
        }
      } catch (error) {
        console.error("Error cargando estados:", error);
      }
    };
    cargarEstados();
  }, []);

  useEffect(() => {
    if (!estadoSeleccionado) return;
    const cargarMunicipios = async () => {
      try {
        const data = await getMunicipiosByEstado(estadoSeleccionado);
        setMunicipios(data || []);
        if (data?.length > 0) {
          setMunicipioSeleccionado(data[0].id);
        } else {
          setMunicipioSeleccionado("");
          setEscuelas([]);
          setSedeSeleccionada("");
        }
      } catch (error) {
        console.error("Error cargando municipios:", error);
      }
    };
    cargarMunicipios();
  }, [estadoSeleccionado]);

  useEffect(() => {
    if (!municipioSeleccionado) return;
    const cargarEscuelas = async () => {
      try {
        const data = await getEscuelasByMunicipio(municipioSeleccionado);
        setEscuelas(data || []);
        if (data?.length > 0) {
          setSedeSeleccionada(data[0].id);
        } else {
          setSedeSeleccionada("");
        }
      } catch (error) {
        console.error("Error cargando escuelas:", error);
      }
    };
    cargarEscuelas();
  }, [municipioSeleccionado]);

  useEffect(() => {
    if (!sedeSeleccionada) return;
    if (loadingBySede[sedeSeleccionada]) return;
    if (dataBySede[sedeSeleccionada]) return;

    getSedeData(Number(sedeSeleccionada)).catch((err) => {
      console.error(`Error al cargar datos para sede ${sedeSeleccionada}:`, err);
    });
  }, [sedeSeleccionada, dataBySede, loadingBySede, getSedeData]);

  const estadoActual = estados.find((e) => e.id === Number(estadoSeleccionado));
  const municipioActual = municipios.find((m) => m.id === Number(municipioSeleccionado));
  const escuelaActual = escuelas.find((e) => e.id === Number(sedeSeleccionada));

  const numEstudiantes = Array.isArray(dataBySede[sedeSeleccionada]) 
    ? dataBySede[sedeSeleccionada].length 
    : 0;

  const textoPersonas = numEstudiantes === 1 ? "1 persona" : `${numEstudiantes} personas`;

  return (
    <div className="pacientes-sep-layout d-flex flex-column w-100 min-vh-100">
      
      <SepHeader 
        title="Estudiantes en Grupo de Riesgo" 
        subtitle="Identificación y seguimiento de casos en riesgo" 
      />
      <Container fluid className="pacientes-riesgo-content flex-grow-1 mt-4 pb-4">
        <div className="filtros-flotantes-container mb-4">
          <div className="filtro-card">
            <label className="filtro-card-label">
              <span className="icon">🚩</span> ESTADO
            </label>
            <select
              value={estadoSeleccionado}
              onChange={(e) => setEstadoSeleccionado(Number(e.target.value))}
              className="filtro-card-select"
            >
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-card">
            <label className="filtro-card-label">
              <span className="icon">🏢</span> MUNICIPIO
            </label>
            <select
              value={municipioSeleccionado}
              onChange={(e) => setMunicipioSeleccionado(Number(e.target.value))}
              className="filtro-card-select"
            >
              {municipios.map((municipio) => (
                <option key={municipio.id} value={municipio.id}>
                  {municipio.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-card">
            <label className="filtro-card-label">
              <span className="icon">🏫</span> ESCUELA
            </label>
            <select
              value={sedeSeleccionada}
              onChange={(e) => setSedeSeleccionada(Number(e.target.value))}
              className="filtro-card-select"
            >
              {escuelas.map((escuela) => (
                <option key={escuela.id} value={escuela.id}>
                  {escuela.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper-sep">
          {escuelaActual && (
            <div className="resumen-header d-flex align-items-center mb-4">
              <h3 className="mb-0 mr-3" style={{ fontWeight: '800' }}>
                {escuelaActual.nombre}
              </h3>
              <span className="badge-personas ms-3">{textoPersonas}</span>
            </div>
          )}

          {loadingBySede[sedeSeleccionada] ? (
            <div className="alert alert-info mt-4">
              <h5>Cargando datos de la escuela...</h5>
            </div>
          ) : (
            <div className="tabla-blanca-container">
              <TableNivelRiesgoBySede
                dataBySede={dataBySede}
                sedesIds={[sedeSeleccionada]}
                nombresSedes={{
                  [sedeSeleccionada]: escuelaActual?.nombre || "",
                }}
                activeSede={sedeSeleccionada}
                onChangeSede={setSedeSeleccionada}
                hideSedeTabs={true}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default PacientesSuperAdminSeP;