import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useGraficasSeP } from "../../../hooks/sep";
import {
  getPaises,
  getMunicipio,
  getEscuela,
} from "../../../api/sep";
import GraficasGrid from "../../../components/adminsep/dashboard/GraficasGrid";
import "./GraficasSuperAdminSeP.css";
import { SepHeader } from "../../../components/sep/sepHeader";
import { SepFooter } from "../../../components/sep/sepFooter";
import avatarHombre from "../../../assets/img/avatar-hombre.png";

export function GraficasSuperAdminSeP() {
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [escuelas, setEscuelas] = useState([]);

  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");

  const [tipoGrafica, setTipoGrafica] = useState("cuestionarios");
  const [graficas, setGraficas] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    getConteoPorNivelRiesgoCategoriaBySedeSeP,
    getGraficasPreguntasBySedeSeP,
    getRangoDePreguntasBySedeSeP,
  } = useGraficasSeP();

  const getMunicipiosByEstado = async (idEstado) => {
    return await getMunicipio(idEstado);
  };

  const getEscuelasByMunicipio = async (idMunicipio) => {
    return await getEscuela(idMunicipio);
  };

  // ===============================
  // CARGAR ESTADOS
  // ===============================
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

  // ===============================
  // CARGAR MUNICIPIOS
  // ===============================
  useEffect(() => {
    if (!estadoSeleccionado) return;

    const cargarMunicipios = async () => {
      try {
        const data = await getMunicipiosByEstado(
          estadoSeleccionado
        );

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

  // ===============================
  // CARGAR ESCUELAS
  // ===============================
  useEffect(() => {
    if (!municipioSeleccionado) return;

    const cargarEscuelas = async () => {
      try {
        const data = await getEscuelasByMunicipio(
          municipioSeleccionado
        );

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

  // ===============================
  // CARGAR GRAFICAS
  // ===============================
  useEffect(() => {
    const cargarGraficas = async () => {
      if (!sedeSeleccionada) return;

      try {
        setLoading(true);

        let data = [];

        if (tipoGrafica === "cuestionarios") {
          data =
            await getConteoPorNivelRiesgoCategoriaBySedeSeP(
              sedeSeleccionada
            );
        } else if (tipoGrafica === "preguntas") {
          data =
            await getGraficasPreguntasBySedeSeP(
              sedeSeleccionada
            );
        } else if (tipoGrafica === "rangos") {
          data =
            await getRangoDePreguntasBySedeSeP(
              sedeSeleccionada
            );
        }

        setGraficas(data || []);
      } catch (error) {
        console.error(
          "Error al cargar gráficas:",
          error
        );
        setGraficas([]);
      } finally {
        setLoading(false);
      }
    };

    cargarGraficas();
  }, [
    sedeSeleccionada,
    tipoGrafica,
    getConteoPorNivelRiesgoCategoriaBySedeSeP,
    getGraficasPreguntasBySedeSeP,
    getRangoDePreguntasBySedeSeP,
  ]);

  return (
    <div
      className="d-flex flex-column w-100 min-vh-100"
      style={{ backgroundColor: "#F4F6F9" }}
    >
      <SepHeader
        title="Gráficas Estadísticas - SEP"
        subtitle="Análisis visual de cuestionarios y evaluaciones"
      />
      <Container fluid className="container-graficas-sep flex-grow-1">
        {/* FILTROS */}
        <div className="filtros-container-graficas mb-5">

          {/* ESTADO */}
          <div className="filtro-wrapper">
            <label className="filtro-label">🚩 ESTADO</label>
            <select className="filtro-select" value={estadoSeleccionado} onChange={(e) => setEstadoSeleccionado(Number(e.target.value))}>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>{estado.descripcion}</option>
              ))}
            </select>
          </div>

          {/* MUNICIPIO */}
          <div className="filtro-wrapper">
            <label className="filtro-label">🏢 MUNICIPIO</label>
            <select className="filtro-select" value={municipioSeleccionado} onChange={(e) => setMunicipioSeleccionado(Number(e.target.value))}>
              {municipios.map((municipio) => (
                <option key={municipio.id} value={municipio.id}>{municipio.descripcion}</option>
              ))}
            </select>
          </div>

          {/* ESCUELA */}
          <div className="filtro-wrapper">
            <label className="filtro-label">🏫 ESCUELA</label>
            <select className="filtro-select" value={sedeSeleccionada} onChange={(e) => setSedeSeleccionada(Number(e.target.value))}>
              {escuelas.map((escuela) => (
                <option key={escuela.id} value={escuela.id}>{escuela.nombre}</option>
              ))}
            </select>
          </div>

          {/* TIPO GRAFICA */}
          <div className="filtro-wrapper">
            <label className="filtro-label">📈 TIPO DE GRÁFICA</label>
            <select className="filtro-select" value={tipoGrafica} onChange={(e) => setTipoGrafica(e.target.value)}>
              <option value="cuestionarios">Cuestionarios</option>
              <option value="preguntas">Preguntas</option>
              <option value="rangos">Rangos</option>
            </select>
          </div>

        </div>


        {/* GRAFICAS */}

        {loading ? (
          <div className="loading-container-graficas">
            <Spinner
              animation="border"
              role="status"
              className="loading-spinner-graficas"
            />

            <p className="loading-text-graficas">
              Cargando gráficas...
            </p>
          </div>
        ) : (
          <div className="graficas-container">
            <GraficasGrid
              graficas={graficas}
              loading={loading}
            />
          </div>
        )}
      </Container>
      <div className="footer-personajes-wrapper">
        <img
          src={avatarHombre}
          alt="Avatar decorativo"
          className="personaje-der-graficas"
        />
      </div>
    </div>
  );
}

export default GraficasSuperAdminSeP;