import DataTable from "react-data-table-component";
import "./TableNivelRiesgoBySede.css";
import { formatPhoneLada } from "../../../../utils/phone";

const GRUPO_COLORES = {
  "Grupo A": { bg: "#e8f5e9", color: "#2e7d32", label: "Grupo A - Sin riesgo" },
  "Grupo B": { bg: "#e3f2fd", color: "#1565c0", label: "Grupo B - Riesgo leve" },
  "Grupo C": { bg: "#fff8e1", color: "#f57f17", label: "Grupo C - Riesgo moderado" },
  "Grupo D": { bg: "#fce4ec", color: "#c62828", label: "Grupo D - Riesgo alto" },
};

function ClasificacionBadge({ valor }) {
  if (!valor) return <span className="clasificacion-vacia">—</span>;
  const grupoKey = Object.keys(GRUPO_COLORES).find((k) =>
    valor.toLowerCase().includes(k.toLowerCase())
  );
  const config = grupoKey ? GRUPO_COLORES[grupoKey] : null;
  if (!config) return <span>{valor}</span>;
  return (
    <span
      className="clasificacion-badge"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

function getHighestRiskEvaluation(evaluaciones) {
  if (!Array.isArray(evaluaciones) || evaluaciones.length === 0) return null;

  const getRiskWeight = (grupoStr) => {
    if (!grupoStr) return 0;
    const lower = grupoStr.toLowerCase();
    if (lower.includes("grupo d") || lower.includes("alto") || lower.includes("inminente")) return 4;
    if (lower.includes("grupo c") || lower.includes("moderado")) return 3;
    if (lower.includes("grupo b") || lower.includes("grupo h") || lower.includes("leve")) return 2;
    if (lower.includes("grupo a") || lower.includes("sin riesgo") || lower.includes("bajo")) return 1;
    return 1;
  };

  let highestEval = evaluaciones[0];
  let highestWeight = getRiskWeight(highestEval.grupo);

  for (let i = 1; i < evaluaciones.length; i++) {
    const currentWeight = getRiskWeight(evaluaciones[i].grupo);
    if (currentWeight > highestWeight) {
      highestWeight = currentWeight;
      highestEval = evaluaciones[i];
    } else if (currentWeight === highestWeight) {
      const dateA = new Date(highestEval.fecha_evaluacion || 0);
      const dateB = new Date(evaluaciones[i].fecha_evaluacion || 0);
      if (dateB > dateA) {
        highestEval = evaluaciones[i];
      }
    }
  }
  return highestEval;
}

export function TableNivelRiesgoBySede({
  dataBySede,
  sedesIds,
  nombresSedes,
  activeSede,
  onChangeSede,
  hideSedeTabs,
}) {
  const filas = Array.isArray(dataBySede[activeSede])
    ? dataBySede[activeSede]
    : [];
  const nombreSede = nombresSedes[activeSede] || `Sede ${activeSede}`;

  const columns = [
    {
      name: "ID",
      selector: (row) => row.usuario?.id || row.id || row._id || "",
      sortable: true,
      width: "70px",
      cell: (row) => (
        <span className="cell-id">
          {row.usuario?.id || row.id || row._id || ""}
        </span>
      ),
    },
    {
      name: "Paciente",
      selector: (row) =>
        row.usuario?.nombre || row.paciente_nombre || row.nombre || "",
      sortable: true,
      wrap: true,
      minWidth: "160px",
      cell: (row) => (
        <span className="cell-nombre">
          {row.usuario?.nombre || row.paciente_nombre || row.nombre || ""}
        </span>
      ),
    },
    {
      name: "Correo",
      selector: (row) =>
        row.usuario?.email || row.paciente_correo || row.email || row.correo || "",
      sortable: true,
      wrap: true,
      minWidth: "200px",
      cell: (row) => (
        <span className="cell-correo">
          {row.usuario?.email || row.paciente_correo || row.email || row.correo || ""}
        </span>
      ),
    },
    {
      name: "Clasificación Médica",
      selector: (row) => {
        const highestEval = getHighestRiskEvaluation(row.evaluacion);
        const grupo = highestEval?.grupo || row.grupo || "";
        const status = row.status || row.estado || "";
        return `${grupo} ${status}`.trim();
      },
      sortable: true,
      minWidth: "210px",
      wrap: true,
      cell: (row) => {
        const highestEval = getHighestRiskEvaluation(row.evaluacion);
        const grupo = highestEval?.grupo || row.grupo || "";
        const status = row.status || row.estado || "";
        const valor = `${grupo} ${status}`.trim();
        return <ClasificacionBadge valor={valor} />;
      },
    },
    {
      name: "Número de Emergencia",
      selector: (row) => {
        const c =
          row.usuario?.celular_paciente ||
          row.usuario?.celular ||
          row.celular_paciente ||
          row.celular;
        if (c) return formatPhoneLada(c);
        if (
          Array.isArray(row.usuario?.contactos_emergencia) &&
          row.usuario.contactos_emergencia.length > 0
        )
          return formatPhoneLada(row.usuario.contactos_emergencia[0].celular) || "";
        return "";
      },
      minWidth: "210px",
      wrap: true,
      cell: (row) => {
        const c =
          row.usuario?.celular_paciente ||
          row.usuario?.celular ||
          row.celular_paciente ||
          row.celular ||
          (Array.isArray(row.usuario?.contactos_emergencia) &&
            row.usuario.contactos_emergencia.length > 0
            ? row.usuario.contactos_emergencia[0].celular
            : "");
        return <span className="cell-celular">{c ? formatPhoneLada(c) : "—"}</span>;
      },
    },
    {
      name: "Parentesco",
      selector: (row) => {
        if (
          Array.isArray(row.usuario?.contactos_emergencia) &&
          row.usuario.contactos_emergencia.length > 0
        )
          return row.usuario.contactos_emergencia[0].parentesco || "";
        return "";
      },
      minWidth: "150px",
      wrap:true,
      cell: (row) => {
        const p =
          Array.isArray(row.usuario?.contactos_emergencia) &&
            row.usuario.contactos_emergencia.length > 0
            ? row.usuario.contactos_emergencia[0].parentesco
            : "";
        return p ? (
          <span className="cell-parentesco">{p}</span>
        ) : (
          <span className="cell-vacio">—</span>
        );
      },
    },
    {
      name: "Fecha de Evaluación",
      selector: (row) => {
        const highestEval = getHighestRiskEvaluation(row.evaluacion);
        return highestEval?.fecha_evaluacion || row.fecha_evaluacion || row.fecha || "";
      },
      minWidth: "200px",
      wrap: true,
      cell: (row) => {
        const highestEval = getHighestRiskEvaluation(row.evaluacion);
        const fechaRaw = highestEval?.fecha_evaluacion || row.fecha_evaluacion || row.fecha;
        if (!fechaRaw) return <span className="cell-vacio">—</span>;
        const fecha = new Date(fechaRaw);
        return (
          <span className="cell-fecha">
            {fecha.toLocaleString("es-MX", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
  ];

  return (
    <div className="nivel-riesgo-tabs-container">
      {!hideSedeTabs && (
        <div className="tabs-sedes">
          {sedesIds.map((id) => (
            <button
              key={id}
              className={`tab-sede-btn${Number(id) === Number(activeSede) ? " active" : ""
                }`}
              onClick={() => onChangeSede(Number(id))}
            >
              {nombresSedes[id]}
            </button>
          ))}
        </div>
      )}

      {/* ← Header FUERA del card, igual que la imagen de referencia */}
      <div className="sede-header-externo">
        <span className="sede-title-externo">{nombreSede}</span>
        <span className="badge-sede">
          {filas.length} {filas.length === 1 ? "Estudiante" : "Estudiantes"}
        </span>
      </div>

      {/* Card blanco de la tabla, sin header adentro */}
      <div className="sede-table-container">
        <DataTable
          columns={columns}
          data={filas}
          striped={false}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
          paginationComponentOptions={{
            rowsPerPageText: "Filas por página:",
            rangeSeparatorText: "de",
            selectAllRowsItem: true,
            selectAllRowsItemText: "Todos",
          }}
          noDataComponent={
            <div className="tabla-vacia">
              <span className="tabla-vacia-icon">📋</span>
              <p>No hay estudiantes registrados para esta universidad</p>
            </div>
          }
          customStyles={{
            table: { style: { backgroundColor: "transparent" } },
            headRow: {
              style: {
                backgroundColor: "#f0f4ff",
                borderBottom: "2px solid #d5e0f5",
                minHeight: "48px",
              },
            },
            headCells: {
              style: {
                fontSize: "0.78rem",
                fontWeight: "700",
                color: "#4f70bd",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                paddingLeft: "16px",
                paddingRight: "16px",

                whiteSpace:"normal",
                overflow:"visible",
                textOverflow:"clip",
                lineHeight:"1.25",
                minHeight:"58px",
                alignItems:"center",
                justifyContent: "center",
                textAlign:"center",
                borderRight: "1px solid #d5e0f5",
                "&:last-child": {
                  borderRight: "none",
                },
              },
            },
            rows: {
              style: {
                minHeight: "52px",
                borderBottom: "none",
                transition: "background-color 0.15s ease",
              },
            },
            cells: {
              style: {
                paddingLeft: "16px",
                paddingRight: "16px",
                fontSize: "0.88rem",
                color: "#333",
                justifyContent:"center",
                textAlign:"center",
                borderRight: "1px solid #eef2ff",
                borderBottom: "none",
                "&:last-child": {
                  borderRight: "none",
                },
              },
            },
            pagination: {
              style: {
                borderTop: "1px solid #eef2ff",
                fontSize: "0.85rem",
                color: "#4f70bd",
                fontWeight: "600",
              },
            },
          }}
        />
      </div>
    </div>
  );
}