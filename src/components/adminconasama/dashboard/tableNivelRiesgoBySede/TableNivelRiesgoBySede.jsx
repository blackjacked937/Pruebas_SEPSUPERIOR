import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { formatPhoneLada } from "../../../../utils/phone";
import "./TableNivelRiesgoBySede.css";

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

export function TableNivelRiesgoBySede(props) {
  const { dataBySede, sedesIds, nombresSedes, activeSede, onChangeSede } = props;

  const columns = [
    {
      name: "ID",
      selector: (row) => row.usuario?.id || row.id || row._id || '',
      sortable: true,
      width: '80px'
    },
    {
      name: "Paciente",
      selector: (row) => row.usuario?.nombre || row.paciente_nombre || row.nombre || '',
      sortable: true,
      wrap: true,
      minWidth: '200px'
    },
    {
      name: "Correo",
      selector: (row) => row.usuario?.email || row.paciente_correo || row.email || row.correo || '',
      sortable: true,
      wrap: true,
      minWidth: '200px'
    },
    {
      name: "Clasificación Médica",
      selector: (row) => {
        const highestEval = getHighestRiskEvaluation(row.evaluacion);
        const grupo = highestEval?.grupo || row.grupo || '';
        const status = row.status || row.estado || '';
        return `${grupo} ${status}`.trim();
      },
      sortable: true,
      minWidth: '220px',
      wrap: true
    },
    {
      name: "Celular De Emergencia",
      selector: (row) => {
        const celularUsuario = row.usuario?.celular_paciente || row.usuario?.celular || row.celular_paciente || row.celular;
        if (celularUsuario) return formatPhoneLada(celularUsuario);
        if (Array.isArray(row.usuario?.contactos_emergencia) && row.usuario.contactos_emergencia.length > 0) {
          return formatPhoneLada(row.usuario.contactos_emergencia[0].celular || '');
        }
        return '';
      },
      sortable: true,
      width: '150px'
    },
    {
      name: "Parentesco",
      selector: (row) => {
        if (Array.isArray(row.usuario?.contactos_emergencia) && row.usuario.contactos_emergencia.length > 0) {
          return row.usuario.contactos_emergencia[0].parentesco || '';
        }
        return '';
      },
      sortable: true,
      width: '120px'
    },
    {
      name: "Fecha de Evaluación",
      selector: (row) => {
        const highestEval = getHighestRiskEvaluation(row.evaluacion);
        return highestEval?.fecha_evaluacion || row.fecha_evaluacion || row.fecha || '';
      },
      sortable: true,
      minWidth: '180px',
      format: (row) => {
        const highestEval = getHighestRiskEvaluation(row.evaluacion);
        const fechaRaw = highestEval?.fecha_evaluacion || row.fecha_evaluacion || row.fecha;
        if (!fechaRaw) return '';
        const fecha = new Date(fechaRaw);
        return fecha.toLocaleString('es-MX', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#E8F0FE',
        borderBottomColor: '#cdd8e6',
        borderBottomWidth: '1px',
        borderRadius: '0',
      },
    },
    headCells: {
      style: {
        fontWeight: '800',
        color: '#1A1A1A',
        fontSize: '13px',
        textTransform: 'uppercase',
        borderRight: '1px solid #cdd8e6',
        '&:last-child': {
          borderRight: 'none',
        },
      },
    },
    cells: {
      style: {
        borderRight: '1px solid #e9ecef',
        borderBottom: 'none',
        '&:last-child': {
          borderRight: 'none',
        },
      },
    },
    rows: {
      style: {
        backgroundColor: '#F7F8FA',
        fontWeight: '600',
        color: '#333',
        minHeight: '52px',
        borderBottom: 'none',
      },
      stripedStyle: {
        backgroundColor: '#ffffff',
      },
    },
  };

  return (
    <div className="nivel-riesgo-tabs-container">
      <div className="tabs-sedes">
        {sedesIds.map((id) => (
          <button
            key={id}
            className={`tab-sede-btn${Number(id) === Number(activeSede) ? ' active' : ''}`}
            onClick={() => onChangeSede(Number(id))}
          >
            {nombresSedes[id]}
          </button>
        ))}
      </div>

      <div className="sede-header">
        <span className="sede-title">
          {nombresSedes[activeSede] || `Sede ${activeSede}`}
        </span>
        <span className="badge-sede">
          {Array.isArray(dataBySede[activeSede])
            ? dataBySede[activeSede].length
            : 0
          } pacientes
        </span>
      </div>
      <DataTable
        columns={columns}
        data={Array.isArray(dataBySede[activeSede])
          ? dataBySede[activeSede]
          : []
        }
        striped
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página:',
          rangeSeparatorText: 'de',
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Todos'
        }}
        customStyles={customStyles}
        noDataComponent={<span>No hay registros disponibles para esta sede</span>}
      />
    </div>

  );
}
