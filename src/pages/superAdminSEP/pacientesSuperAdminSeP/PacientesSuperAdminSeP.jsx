import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { useNivelRiesgoBySedeSeP } from "../../../hooks/sep";
import { TableNivelRiesgoBySede } from "../../../components/adminsep/dashboard/tableNivelRiesgoBySede";

const sedesPorOrganizacion = {
  0: {
    8: "Ciudad de México",
    9: "Morelos",
    10: "Tlaxcala",
    11: "Hidalgo",
    12: "UPEM Ecatepec",
    13: "UPEM Tecamac",
    14: "Dra. Alma",
  },
  1: {
    8: "Ciudad de México",
    9: "Morelos",
    10: "Tlaxcala",
    11: "Hidalgo",
  },
  2: {
    12: "UPEM Ecatepec",
    13: "UPEM Tecamac",
    14: "Dra. Alma",
  },
};

/**
 * Página de Pacientes en Riesgo para SuperGestores de SEP
 * Muestra pacientes identificados en riesgo por sede
 * 
 * Acceso: is_superuser === true (SuperGestor)
 * Protección: RoleRoute allowSuper
 */
export function PacientesSuperAdminSeP() {
  const { auth } = useAuth();
  const { dataBySede, loadingBySede, getSedeData } =
    useNivelRiesgoBySedeSeP();

  const organizacion = auth?.me?.organizacion;
  const sedesDisponibles = sedesPorOrganizacion[organizacion] || {};
  const idsSedes = Object.keys(sedesDisponibles);

  const [activeSede, setActiveSede] = useState(null);

  // Inicio de Sede por Organizacion del Super Gestor
  useEffect(() => {
    if (idsSedes.length > 0) {
      setActiveSede(idsSedes[0]);
    }
  }, [organizacion]);

  // Mostrado de Sede Activa en TAB
  useEffect(() => {
    if (!activeSede || loadingBySede[activeSede]) return;

    if (!dataBySede[activeSede]) {
      getSedeData(Number(activeSede));
    }
  }, [activeSede]);

  return (
    <div>
      <center>
        <h1 style={{ color: "#4DB6AC" }}>
          Pacientes en Grupo de Riesgo por Sede
        </h1>
      </center>

      {loadingBySede[activeSede] ? (
        <h3>Cargando datos de la sede...</h3>
      ) : (
        <TableNivelRiesgoBySede
          dataBySede={dataBySede}
          sedesIds={idsSedes}
          nombresSedes={sedesDisponibles}
          activeSede={activeSede}
          onChangeSede={setActiveSede}
        />
      )}
    </div>
  );
}

export default PacientesSuperAdminSeP;
