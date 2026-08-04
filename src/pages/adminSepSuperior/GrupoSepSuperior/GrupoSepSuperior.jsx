import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { usePacientesSensiblesSepSuperior } from "../../../hooks/SepSuperior";
import { TableGrupoSepSuperior } from "../../../components/adminsepsuperior/grupoSepSuperior/TableGrupoSepSuperior";
import logoSesyn from "../../../assets/img/logoSesyn.png";
import "../../../pages/superAdminSEP/homeSuperAdminSeP/HomeSuperAdminSeP.css"; // Ensure banner styles are loaded
import mascotaIzq from '../../../assets/img/Castor.png'; 
import mascotaDer from '../../../assets/img/Conejo.png';
import "../../../pages/adminSepSuperior/HomeSepSuperior/HomeSepSuperior.css";
import "./GrupoSepSuperior.css";

export function GrupoSepSuperior() {
  const { pacientes, loading, getPacientesSensibles } =
    usePacientesSensiblesSepSuperior();

  const [refetch, setRefetch] = useState(false);
  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    getPacientesSensibles();
    
  }, [refetch]);

  const totalPacientes = Array.isArray(pacientes) ? pacientes.length : 0;
  const textoPacientes = totalPacientes === 1 ? "1 persona" : `${totalPacientes} personas`;

  return (
    <div className="columbia-admin-grupo">
      {/* BANNER */}
      <div className="mc-banner-wave">
        <div className="mc-banner-wave__content">
          <div className="mc-banner-wave__text">
            <h1>Pacientes por Grupo de Riesgo</h1>
            <p className="lead">Identificación y seguimiento de casos en riesgo - SEP Superior</p>
          </div>
          <div className="mc-banner-wave__logo">
            <img src={logoSesyn} alt="Secretaría de Educación Pública" className="mc-banner-sep-logo" />
          </div>
        </div>
      </div>

      {/* ONDA DE TRANSICION */}
      <div className="mc-banner-transition" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z"
            fill="#F4F6F9"
          />
        </svg>
      </div>

      {/* BODY */}
      <div className="columbia-body-grupo" style={{ marginTop: '20px' }}>
        {/* STATS BAR */}
        <div className="columbia-stats-bar-grupo">
          <div className="columbia-stat-badge-grupo">
            <span className="stat-icon-grupo">👥</span>
            Total Registros
            <span className="stat-count-grupo">{totalPacientes}</span>
          </div>
          <div className="columbia-stat-badge-grupo">
            <span className="stat-icon-grupo">📋</span>
            {textoPacientes} identificadas
          </div>
        </div>

        {/* CONTENIDO */}
        {loading ? (
          <div className="loading-container-columbia-grupo">
            <Spinner
              animation="border"
              role="status"
              className="loading-spinner-columbia-grupo"
            />
            <p className="loading-text-columbia-grupo">
              Cargando datos de pacientes...
            </p>
          </div>
        ) : totalPacientes === 0 ? (
          <div className="empty-state-columbia-grupo">
            <div className="empty-state-columbia-icon-grupo">✅</div>
            <h3>Sin pacientes en grupo de riesgo</h3>
            <p>Actualmente no hay pacientes identificados en grupo de riesgo.</p>
          </div>
        ) : (
          <div className="columbia-table-wrapper-grupo">
            <div className="columbia-tabla-container-grupo">
              <div className="columbia-tabla-header-grupo">
                <h3>
                  <span className="header-icon-grupo">📊</span>
                  Listado de Pacientes en Riesgo
                </h3>
                <span className="columbia-badge-total-grupo">
                  {textoPacientes}
                </span>
              </div>
              <TableGrupoSepSuperior
                data={pacientes}
                onRefetch={onRefetch}
              />
            </div>
          </div>
        )}
      </div>

      {/* ONDA FOOTER (MODIFICADO CON AMBAS MASCOTAS) */}
      <div className="mc-footer-wave-home" aria-hidden="true">
        <svg className="mc-footer-wave-home__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <rect className="mc-footer-wave-home__base" width="1440" height="120" />
            <path className="mc-footer-wave-home__path" d="M0,20 C250,160 450,-40 900,50 C1200,120 1350,30 1440,50 L1440,120 L0,120 Z" />
        </svg>
      </div>
      <div className="footer-personajes-wrapper-home">
          {/* Mascota Izquierda */}
          <img src={mascotaIzq} alt="Mascota Izquierda" className="personaje-izq-home" />
          
          {/* Mascota Derecha */}
          <img src={mascotaDer} alt="Mascota Derecha" className="personaje-der-home" />
      </div>
    </div>
  
  );
}

export default GrupoSepSuperior;