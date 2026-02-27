import React, { useEffect, useState } from "react";

import { useNivelRiesgoBySede } from "../../../hooks/conasama";
import { DividerIcon } from "../../../components/common";
import { TableNivelRiesgoBySede } from "../../../components/adminconasama/dashboard/tableNivelRiesgoBySede";

export function PacientesSuperAdminConasama() {
  const { dataBySede, loadingBySede, getAllSedesData, SEDES_IDS } =
    useNivelRiesgoBySede();

  const [refetch, setRefetch] = useState(false);
  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    getAllSedesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return (
    <div>
      <center>
        <h1 style={{ color: "#4DB6AC" }}>
          Pacientes por grupo de riesgo en cada sede
        </h1>
      </center>

      {loadingBySede ? (
        <h3>Cargando datos de las sedes...</h3>
      ) : (
        <TableNivelRiesgoBySede
          dataBySede={dataBySede}
          sedesIds={SEDES_IDS}
          onRefetch={onRefetch}
        />
      )}
    </div>
  );
}
