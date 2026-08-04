import { Container, Alert, Spinner } from 'react-bootstrap';
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useAuth } from "../../../hooks";
import { TableNivelRiesgoBySede } from "../../../components/adminsepsuperior/dashboard/tableNivelRiesgoBySede/TableNivelRiesgoBySede";
import {
  getSubsistemasSuperior,
  getUniversidadesSuperior,
  getNivelRiesgoByUniversidad
} from "../../../api/SepSuperior";
import logoSesyn from '../../../assets/img/logoSesyn.png';
import "../../../pages/SuperiorSEP/homeSuperior/HomeSuperAdminSeP.css"
import './GrupoSuperior.css';
import mascotaIzq from '../../../assets/img/Castor.png';
import mascotaDer from '../../../assets/img/Conejo.png'


export function GrupoSuperior() {
  const { auth } = useAuth();

  const [subsistemas, setSubsistemas] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [errorVisible, setErrorVisible] = useState(null);

  const [subsistemaSeleccionado, setSubsistemaSeleccionado] = useState('');
  const [universidadSeleccionada, setUniversidadSeleccionada] = useState(null);

  const [todosEnRiesgo, setTodosEnRiesgo] = useState(null);
  const [loadingRiesgo, setLoadingRiesgo] = useState(false);
  const riesgoCargado = useRef(false);

  useEffect(() => {
    if (!auth?.token) {
      setErrorVisible("⚠️ No hay token de autenticación. Inicia sesión de nuevo.");
      setLoadingCatalogos(false);
      return;
    }

    const fetchCatalogos = async () => {
      try {
        setLoadingCatalogos(true);
        setErrorVisible(null);

        const [dataSub, dataUniv] = await Promise.all([
          getSubsistemasSuperior(auth.token),
          getUniversidadesSuperior(auth.token)
        ]);

        const arraySubsistemas = dataSub?.results ? dataSub.results : (Array.isArray(dataSub) ? dataSub : []);
        const arrayUniversidades = dataUniv?.results ? dataUniv.results : (Array.isArray(dataUniv) ? dataUniv : []);

        setSubsistemas(arraySubsistemas);
        setUniversidades(arrayUniversidades);

        if (arraySubsistemas.length > 0) {
          setSubsistemaSeleccionado(arraySubsistemas[0].id);
        }
      } catch (error) {
        console.error(error);
        setErrorVisible(`❌ Error de conexión: ${error.message}`);
      } finally {
        setLoadingCatalogos(false);
      }
    };

    fetchCatalogos();
  }, [auth?.token]);

  useEffect(() => {
    if (!auth?.token || riesgoCargado.current) return;
    riesgoCargado.current = true;
    setLoadingRiesgo(true);

    getNivelRiesgoByUniversidad('', auth.token)
      .then(data => {
        const lista = Array.isArray(data) ? data : (data?.results ?? []);
        setTodosEnRiesgo(lista);
      })
      .catch(err => {
        console.error('Error cargando pacientes en riesgo:', err);
        setTodosEnRiesgo([]);
      })
      .finally(() => setLoadingRiesgo(false));
  }, [auth?.token]);

  const universidadesFiltradas = useMemo(() => {
    if (!subsistemaSeleccionado) return [];
    return universidades.filter(u => String(u.ciudad) === String(subsistemaSeleccionado));
  }, [universidades, subsistemaSeleccionado]);

  const nombresSedesMap = useMemo(() => {
    const mapa = {};
    universidadesFiltradas.forEach(u => { mapa[u.id] = u.nombre; });
    return mapa;
  }, [universidadesFiltradas]);

  const idsSedes = useMemo(() => Object.keys(nombresSedesMap), [nombresSedesMap]);

  useEffect(() => {
    if (idsSedes.length > 0) {
      setUniversidadSeleccionada(Number(idsSedes[0]));
    } else {
      setUniversidadSeleccionada(null);
    }
  }, [idsSedes]);

  const dataBySede = useMemo(() => {
    if (!todosEnRiesgo) return {};
    const mapa = {};
    universidadesFiltradas.forEach(univ => {
      mapa[univ.id] = todosEnRiesgo.filter(p => {
        const sedeId = p.usuario?.sede_id ?? p.sede_id;
        return Number(sedeId) === Number(univ.id);
      });
    });
    return mapa;
  }, [todosEnRiesgo, universidadesFiltradas]);

  return (
    <Container fluid className="pacientes-riesgo-container mc-home-superior-sesyn">

      {/* BANNER */}
      <div className="mc-banner-wave-sesyn">
        <div className="mc-banner-wave-sesyn__content">
          <div className="mc-banner-wave-sesyn__text">
            <h1>Estudiantes en Grupo de Riesgo</h1>
            <p className="lead">Identificación y seguimiento de casos en riesgo</p>
          </div>
          <div className="mc-banner-wave-sesyn__logo">
            <img src={logoSesyn} alt="Secretaría de Educación Pública" className="mc-banner-sesyn-logo" />
          </div>
        </div>
      </div>

      {/* ONDA DE TRANSICION */}
      <div className="mc-banner-transition-sesyn" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* WRAPPER DEL CONTENIDO CENTRAL */}
      <div className="mc-content-wrapper-sesyn riesgo-content-wrapper">
        {errorVisible && (
          <Alert variant="danger" className="mb-4 shadow-sm border-danger">
            <h5>Reporte de Error:</h5>
            <p>{errorVisible}</p>
          </Alert>
        )}

        {loadingCatalogos ? (
          <div className="text-center p-5">
            <Spinner animation="border" variant="primary" />
            <h5 className="mt-3">Conectando con el backend...</h5>
          </div>
        ) : (
          <>
            {/* Filtros en cascada */}
            <div className="mc-filtros-container-sesyn mb-5">
              <div className="mc-filtro-card-sesyn">
                <label className="mc-filtro-label-sesyn">
                  <span className="mc-filtro-icon-sesyn" role="img" aria-label="subsistema">🚩</span>
                  SELECCIONAR SUBSISTEMA:
                </label>
                <div className="mc-filtro-select-wrapper-sesyn">
                  <select
                    value={subsistemaSeleccionado}
                    onChange={(e) => setSubsistemaSeleccionado(e.target.value)}
                    className="mc-filtro-select-sesyn"
                  >
                    {subsistemas.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.descripcion}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mc-filtro-card-sesyn">
                <label className="mc-filtro-label-sesyn">
                  <span className="mc-filtro-icon-sesyn" role="img" aria-label="escuela">🏫</span>
                   SELECCIONAR UNIVERSIDAD:
                </label>
                <div className="mc-filtro-select-wrapper-sesyn">
                  <select
                    value={universidadSeleccionada || ''}
                    onChange={(e) => setUniversidadSeleccionada(Number(e.target.value))}
                    className="mc-filtro-select-sesyn"
                    disabled={universidadesFiltradas.length === 0}
                  >
                    {universidadesFiltradas.length > 0 ? (
                      universidadesFiltradas.map((univ) => (
                        <option key={univ.id} value={univ.id}>{univ.nombre}</option>
                      ))
                    ) : (
                      <option value="">Ninguna universidad vinculada</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {loadingRiesgo ? (
              <div className="text-center p-4">
                <Spinner animation="border" variant="primary" />
                <h5 className="mt-3">Cargando estudiantes en riesgo...</h5>
              </div>
            ) : universidadSeleccionada && todosEnRiesgo !== null ? (
              <div className="tabla-riesgo-wrapper">
                <TableNivelRiesgoBySede
                  dataBySede={dataBySede}
                  sedesIds={idsSedes}
                  nombresSedes={nombresSedesMap}
                  activeSede={universidadSeleccionada}
                  onChangeSede={(id) => setUniversidadSeleccionada(Number(id))}
                  hideSedeTabs={true}
                />
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* ONDA FOOTER (MODIFICADO CON AMBAS MASCOTAS) */}
      <div className="mc-footer-wave-home" aria-hidden="true">
        <svg className="mc-footer-wave-home__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <rect className="mc-footer-wave-home__base" width="1440" height="120" />
          <path className="mc-footer-wave-home__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
        </svg>
      </div>
      <div className="footer-personajes-wrapper">
        {/* Mascota Izquierda */}
        <img src={mascotaIzq} alt="Mascota Izquierda" className="personaje-izq" />

        {/* Mascota Derecha */}
        <img src={mascotaDer} alt="Mascota Derecha" className="personaje-der" />
      </div>
    </Container>
  );
}

export default GrupoSuperior;