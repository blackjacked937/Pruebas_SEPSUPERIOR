import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks";
import { CardInfoNavigation } from "../../../components/common";
import { getConteoNivelRiesgoSePBySedeApi } from "../../../api/sep/gestoresSEP";
import { getPaises, getMunicipio, getEscuela } from "../../../api/sep";
import "./HomeSuperAdminSeP.css";
import "./HomeSuperAdminSeP.css";
import { SepHeader } from "../../../components/sep";
import { SepFooter } from "../../../components/sep";
import avatarMujer from "../../../assets/img/avatar-mujer.png";

import {
  BsGeoAltFill,
  BsBuildingsFill,
  BsMortarboardFill,
} from "react-icons/bs";

// IMPLEMENTAR
const getMunicipiosByEstado = async (idEstado) => {
  return getMunicipio(idEstado);
};

// IMPLEMENTAR
const getEscuelasByMunicipio = async (idMunicipio) => {
  return getEscuela(idMunicipio);
};

export function HomeSuperAdminSeP() {
  const { auth } = useAuth();

  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [escuelas, setEscuelas] = useState([]);

  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");

  const [sedesData, setSedesData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarEstados = async () => {
      try {
        const data = await getPaises();

        setEstados(data || []);

        if (data?.length > 0) {
          setEstadoSeleccionado(data[0].id);
        }
      } catch (error) {
        console.error("Error cargando estados", error);
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
        console.error("Error cargando municipios", error);
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
        console.error("Error cargando escuelas", error);
      }
    };

    cargarEscuelas();
  }, [municipioSeleccionado]);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!auth?.token || !sedeSeleccionada) return;

      try {
        setLoading(true);

        const data = await getConteoNivelRiesgoSePBySedeApi(
          Number(sedeSeleccionada),
          auth.token,
        );

        setSedesData({
          [sedeSeleccionada]: data || [],
        });
      } catch (error) {
        console.error("Error cargando dashboard", error);

        setSedesData({
          [sedeSeleccionada]: [],
        });
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [sedeSeleccionada, auth?.token]);

  const escuelaActual = escuelas.find((x) => x.id === Number(sedeSeleccionada));

  const municipioActual = municipios.find(
    (x) => x.id === Number(municipioSeleccionado),
  );

  const estadoActual = estados.find((x) => x.id === Number(estadoSeleccionado));

  return (
    <div className="d-flex flex-column w-100 min-vh-100" style={{ backgroundColor: "#F4F6F9" }}>
      <SepHeader
        title="Panel de Supervisión - SEP"
        subtitle="Sistema de Evaluación y Prevención de Riesgos"
      />

      <Container className="container-super-admin-sep flex-grow-1">
        <div className="mc-filtros-container">
          {/* ESTADO */}
          <div className="mc-filtro-card">
            <label className="mc-filtro-label">
              🚩 ESTADO
            </label>
            <div className="mc-filtro-select-wrapper">
              <select
                className="mc-filtro-select"
                value={estadoSeleccionado}
                onChange={(e) => setEstadoSeleccionado(Number(e.target.value))}>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MUNICIPIO */}
          <div className="mc-filtro-card">
            <label className="mc-filtro-label">
              🏢 MUNICIPIO
            </label>
            <div className="mc-filtro-select-wrapper">
              <select
                className="mc-filtro-select"
                value={municipioSeleccionado}
                onChange={(e) =>
                  setMunicipioSeleccionado(Number(e.target.value))
                }>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ESCUELA */}
          <div className="mc-filtro-card">
            <label className="mc-filtro-label">
              🏫 ESCUELA
            </label>
            <div className="mc-filtro-select-wrapper">
              <select
                className="mc-filtro-select"
                value={sedeSeleccionada}
                onChange={(e) => setSedeSeleccionada(Number(e.target.value))}>
                {escuelas.map((escuela) => (
                  <option key={escuela.id} value={escuela.id}>
                    {escuela.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loading-container-super">
            <div className="loading-spinner-super" role="status"></div>
            <p className="loading-text-super">Sincronizando datos...</p>
          </div>
        ) : sedeSeleccionada && sedesData[sedeSeleccionada] ? (
          <div className="sedes-container">
            <div className="mc-indicadores-grid mb-5">
              {sedesData[sedeSeleccionada].length > 0 ? (
                sedesData[sedeSeleccionada].map((item) => (
                  <CardInfoNavigation
                    key={item.id_cuestionario}
                    riskLevel={item.score}
                    account={item.score}
                    title={item.Cuestionario}
                    subTitle={escuelaActual?.nombre}
                    textLink="Ver Reporte"
                    link="/admin/super-gestor/sep/pacientes-riesgo"
                  />
                ))
              ) : (
                <div className="sede-sin-datos">
                  <p>Sin datos de evaluación</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="loading-container-super">
            <p className="loading-text-super">Selecciona una escuela</p>
          </div>
        )}
      </Container>
      <div className="footer-personajes-wrapper">
        <img
          src={avatarMujer}
          alt="Avatar decorativo"
          className="personaje-der-home-superadmin"
        />
      </div>
    </div>
  );
}

export default HomeSuperAdminSeP;
