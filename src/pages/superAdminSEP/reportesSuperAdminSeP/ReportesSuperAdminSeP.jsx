import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { useReporteEvaluacionesBySedeSeP } from "../../../hooks/sep";
import { TableReportesEvaluacionesBySede } from "../../../components/adminsep/dashboard/tableReporteEvaluacionesBySede";

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
};

export function ReportesSuperAdminSeP() {
  const { auth } = useAuth();
  const { dataBySede, loadingBySede, getSedeData } =
    useReporteEvaluacionesBySedeSeP();

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
          Reportes de Evaluaciones por Sede
        </h1>
      </center>

      {loadingBySede[activeSede] ? (
        <h3>Cargando datos de la sede...</h3>
      ) : (
        <TableReportesEvaluacionesBySede
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

export default ReportesSuperAdminSeP;
