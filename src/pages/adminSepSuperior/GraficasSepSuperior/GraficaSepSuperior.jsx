import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import GraficasGrid from "../../../components/adminsepsuperior/dashboard/GraficasGrid";
import { useGraficasSuperiorSeP } from "../../../hooks/SepSuperior";
import "./GraficaSepSuperior.css";
import logoSesyn from "../../../assets/img/logoSesyn.png";
import "../../../pages/superAdminSEP/homeSuperAdminSeP/HomeSuperAdminSeP.css"; // Ensure banner styles are loaded
import "../../../pages/adminSepSuperior/HomeSepSuperior/HomeSepSuperior.css";
import "./GraficaSepSuperior.css";

export function GraficasSepSuperior() {
  const [tipo, setTipo] = useState("cuestionarios");
  const [graficas, setGraficas] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const {
    getConteoPorNivelRiesgoCategoriaSeP,
    getGraficasPreguntasSeP,
    getRangoDePreguntasSeP,
  } = useGraficasSuperiorSeP();

  useEffect(() => {
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  async function cargarDatos() {
    setLoadingData(true);
    try {
      let data = [];
      if (tipo === "cuestionarios") {
        data = await getConteoPorNivelRiesgoCategoriaSeP();
      }
      if (tipo === "preguntas") {
        data = await getGraficasPreguntasSeP();
      }
      if (tipo === "rangos") {
        data = await getRangoDePreguntasSeP();
      }
      setGraficas(data || []);
    } catch (error) {
      console.error("Error cargando gráficas SEP Superior:", error);
    } finally {
      setLoadingData(false);
    }
  }

  const tiposGrafica = [
    { key: "cuestionarios", label: "Cuestionarios", icon: "📊" },
    { key: "preguntas", label: "Sociodemográficos", icon: "📋" },
    { key: "rangos", label: "Rangos", icon: "📈" },
  ];

  return (
    <div className="estadisticas-admin-grafica">
      {/* BANNER */}
      <div className="mc-banner-wave">
        <div className="mc-banner-wave__content">
          <div className="mc-banner-wave__text">
            <h1>Gráficas Estadísticas - SEP</h1>
            <p className="lead">Análisis visual de cuestionarios y evaluaciones SEP Superior</p>
          </div>
          <div className="mc-banner-wave__logo">
            <img src={logoSesyn} alt="Secretaría de Educación Pública" className="mc-banner-sep-logo" />
          </div>
        </div>
      </div>

      <div className="mc-banner-transition" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
            fill="#F4F6F9"
          />
        </svg>
      </div>

      <div className="estadisticas-body-grafica" style={{ marginTop: '20px' }}>
        <div className="filtros-tipo-graficas">
          {tiposGrafica.map((t) => (
            <button
              key={t.key}
              className={`filtro-tipo-btn ${tipo === t.key ? "active" : ""}`}
              onClick={() => setTipo(t.key)}
            >
              <span className="filtro-tipo-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
        {loadingData ? (
          <div className="loading-container-estad-home">
            <Spinner
              animation="border"
              role="status"
              className="loading-spinner-estad-home"
            />
            <p className="loading-text-estad-home">
              Cargando gráficas...
            </p>
          </div>
        ) : (
          <div className="graficas-wrapper-home">
            <GraficasGrid graficas={graficas} loading={loadingData} />
          </div>
        )}
      </div>

      <div className="mc-footer-wave-home" aria-hidden="true">
        <svg className="mc-footer-wave-home__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <rect className="mc-footer-wave-home__base" width="1440" height="120" />
            <path className="mc-footer-wave-home__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}

export default GraficasSepSuperior;