import { useEffect, useMemo, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useAuth } from "../../../hooks";
import GraficasGridSesyn from "../../../components/adminsepsuperior/dashboard/GraficasGridSesyn";
import {
  getConteoPorNivelRiesgoCategoriaBySedeSePS,
  getGraficasPreguntasBySedeSePS,
  getRangoDePreguntasBySedeSePS,
} from "../../../api/SepSuperior/graficasEstadisticasSepSuperior";
import {
  getSubsistemasSuperior,
  getUniversidadesSuperior,
} from "../../../api/SepSuperior/catalogoSepSuperior";
import logoSesyn from "../../../assets/img/logoSesyn.png";
import "../../../pages/SuperiorSEP/homeSuperior/HomeSuperAdminSeP.css";
import "./GraficasSesyn.css";


export function GraficasSesyn() {
  const { auth } = useAuth();

  const [subsistemas, setSubsistemas] = useState([]);
  const [universidades, setUniversidades] = useState([]);

  const [subsistemaSeleccionado, setSubsistemaSeleccionado] = useState(null);
  const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

  const [tipoGrafica, setTipoGrafica] = useState("cuestionarios");
  const [graficas, setGraficas] = useState([]);

  const [loadingCatalogos, setLoadingCatalogos] = useState(false);
  const [loadingGraficas, setLoadingGraficas] = useState(false);

  const universidadesFiltradas = useMemo(() => {
    if (!subsistemaSeleccionado) {
      return [];
    }

    return universidades.filter(
      (universidad) =>
        Number(universidad.subsistema) ===
          Number(subsistemaSeleccionado.id) ||
        Number(universidad.ciudad) ===
          Number(subsistemaSeleccionado.id)
    );
  }, [universidades, subsistemaSeleccionado]);

  useEffect(() => {
    const cargarCatalogos = async () => {
      if (!auth?.token) {
        return;
      }

      try {
        setLoadingCatalogos(true);

        const [dataSubsistemas, dataUniversidades] = await Promise.all([
          getSubsistemasSuperior(auth.token),
          getUniversidadesSuperior(auth.token),
        ]);

        const listaSubsistemas = Array.isArray(dataSubsistemas)
          ? dataSubsistemas
          : [];

        const listaUniversidades = Array.isArray(dataUniversidades)
          ? dataUniversidades
          : [];

        setSubsistemas(listaSubsistemas);
        setUniversidades(listaUniversidades);

        if (listaSubsistemas.length > 0) {
          setSubsistemaSeleccionado(listaSubsistemas[0]);
        } else {
          setSubsistemaSeleccionado(null);
          setSedeSeleccionada(null);
          setGraficas([]);
        }
      } catch (error) {
        console.error("Error al cargar catálogos de Superior SEP:", error);

        setSubsistemas([]);
        setUniversidades([]);
        setSubsistemaSeleccionado(null);
        setSedeSeleccionada(null);
        setGraficas([]);
      } finally {
        setLoadingCatalogos(false);
      }
    };

    cargarCatalogos();
  }, [auth?.token]);

  useEffect(() => {
    if (universidadesFiltradas.length > 0) {
      setSedeSeleccionada(universidadesFiltradas[0]);
    } else {
      setSedeSeleccionada(null);
      setGraficas([]);
    }
  }, [universidadesFiltradas]);

  useEffect(() => {
    const cargarGraficas = async () => {
      if (!auth?.token || !sedeSeleccionada?.id) {
        setGraficas([]);
        return;
      }

      try {
        setLoadingGraficas(true);

        let data = [];

        if (tipoGrafica === "cuestionarios") {
          data =
            await getConteoPorNivelRiesgoCategoriaBySedeSePS(
              sedeSeleccionada.id,
              auth.token
            );
        } else if (tipoGrafica === "preguntas") {
          data = await getGraficasPreguntasBySedeSePS(
            sedeSeleccionada.id,
            auth.token
          );
        } else if (tipoGrafica === "rangos") {
          data = await getRangoDePreguntasBySedeSePS(
            sedeSeleccionada.id,
            auth.token
          );
        }

        setGraficas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar las gráficas de Sesyn:", error);
        setGraficas([]);
      } finally {
        setLoadingGraficas(false);
      }
    };

    cargarGraficas();
  }, [auth?.token, sedeSeleccionada, tipoGrafica]);

  const handleSubsistemaChange = (event) => {
    const idSubsistema = Number(event.target.value);

    const nuevoSubsistema = subsistemas.find(
      (subsistema) => Number(subsistema.id) === idSubsistema
    );

    setSubsistemaSeleccionado(nuevoSubsistema || null);
  };

  const handleSedeChange = (event) => {
    const idSede = Number(event.target.value);

    const nuevaSede = universidadesFiltradas.find(
      (universidad) => Number(universidad.id) === idSede
    );

    setSedeSeleccionada(nuevaSede || null);
  };

  if (loadingCatalogos) {
    return (
      <div className="graficas-sesyn-loading-page">
        <Spinner
          animation="border"
          role="status"
          className="graficas-sesyn-spinner"
        />

        <p className="graficas-sesyn-loading-text">
          Cargando catálogos...
        </p>
      </div>
    );
  }

  return (
    <Container
      fluid
      className="container-super-admin-sesyn mc-home-superior-sesyn p-0"
    >
      <div className="mc-banner-wave-sesyn">
        <div className="mc-banner-wave-sesyn__content">
          <div className="mc-banner-wave-sesyn__text">
            <h1>Gráficas Estadísticas - SEP</h1>

            <p className="lead">
              Análisis visual de cuestionarios y evaluaciones
            </p>
          </div>

          <div className="mc-banner-wave-sesyn__logo">
            <img
              src={logoSesyn}
              alt="Secretaría de Educación Pública"
              className="mc-banner-sesyn-logo"
            />
          </div>
        </div>
      </div>

      <div className="mc-banner-transition-sesyn" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="mc-content-wrapper-sesyn">
        <section
          className="graficas-sesyn-filtros"
          aria-label="Filtros de gráficas"
        >
          <div className="graficas-sesyn-filtro">
            <label
              htmlFor="graficas-sesyn-subsistema"
              className="graficas-sesyn-filtro-label"
            >
              🚩 Tipo de Institucion
            </label>

            <select
              id="graficas-sesyn-subsistema"
              className="graficas-sesyn-filtro-select"
              value={subsistemaSeleccionado?.id || ""}
              onChange={handleSubsistemaChange}
              disabled={subsistemas.length === 0}
            >
              {subsistemas.length === 0 && (
                <option value="">
                  No hay subsistemas disponibles
                </option>
              )}

              {subsistemas.map((subsistema) => (
                <option
                  key={subsistema.id}
                  value={subsistema.id}
                >
                  {subsistema.nombre ||
                    subsistema.name ||
                    subsistema.ciudad ||
                    subsistema.descripcion ||
                    `Subsistema ${subsistema.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="graficas-sesyn-filtro">
            <label
              htmlFor="graficas-sesyn-sede"
              className="graficas-sesyn-filtro-label"
            >
              🏫 Selecciona tu Institucion
            </label>

            <select
              id="graficas-sesyn-sede"
              className="graficas-sesyn-filtro-select"
              value={sedeSeleccionada?.id || ""}
              onChange={handleSedeChange}
              disabled={universidadesFiltradas.length === 0}
            >
              {universidadesFiltradas.length === 0 && (
                <option value="">
                  No hay escuelas disponibles
                </option>
              )}

              {universidadesFiltradas.map((universidad) => (
                <option
                  key={universidad.id}
                  value={universidad.id}
                >
                  {universidad.nombre ||
                    universidad.name ||
                    universidad.hospital ||
                    universidad.descripcion ||
                    `Escuela ${universidad.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="graficas-sesyn-filtro">
            <label
              htmlFor="graficas-sesyn-tipo"
              className="graficas-sesyn-filtro-label"
            >
              📈 Tipo de gráfica
            </label>

            <select
              id="graficas-sesyn-tipo"
              className="graficas-sesyn-filtro-select"
              value={tipoGrafica}
              onChange={(event) =>
                setTipoGrafica(event.target.value)
              }
            >
              <option value="cuestionarios">
                CUESTIONARIOS
              </option>

              <option value="preguntas">
                PREGUNTAS
              </option>

              <option value="rangos">
                RANGOS
              </option>
            </select>
          </div>
        </section>

        {loadingGraficas ? (
          <div className="graficas-sesyn-loading">
            <Spinner
              animation="border"
              role="status"
              className="graficas-sesyn-spinner"
            />

            <p className="graficas-sesyn-loading-text">
              Cargando gráficas...
            </p>
          </div>
        ) : (
          <section className="graficas-sesyn-contenido">
            <GraficasGridSesyn
              graficas={graficas}
              loading={loadingGraficas}
            />
          </section>
        )}
      </div>

      <div className="mc-footer-wave-sesyn" aria-hidden="true">
          <svg className="mc-footer-wave-sesyn__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <rect className="mc-footer-wave-sesyn__base" width="1440" height="120" />
            <path className="mc-footer-wave-sesyn__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
          </svg>
      </div>
    </Container>
  );
}

export default GraficasSesyn;