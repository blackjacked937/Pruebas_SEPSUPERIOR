import React, { useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import "./TableNivelRiesgoBySede.css";

export function TableNivelRiesgoBySede(props) {
  const { dataBySede, sedesIds } = props;
  const [activeTab, setActiveTab] = useState("1");

  // Nombres de las sedes (puedes ajustarlos según tus necesidades)
  const sedesNames = {
    1: "Sede 1",
    2: "Sede 2",
    3: "Sede 3",
    4: "Sede 4",
    5: "Sede 5",
    6: "Sede 6"
  };

  const columns = [
    { 
      name: "ID",
      selector: (row) => row.id || row._id || '',
      sortable: true,
      width: '80px'
    },
    {
      name: "Paciente",
      selector: (row) => {
        // Intentar acceder a usuario.nombre o directamente a nombre
        if (row.usuario) {
          return `${row.usuario.nombre || ''}`.trim();
        }
        return row.nombre`${row.nombre || ''} `.trim();
      },
      sortable: true,
      wrap: true,
      minWidth: '200px'
    },
    {
      name: "Correo",
      selector: (row) => row.usuario?.email || row.email || row.correo,
      sortable: true,
      wrap: true,
      minWidth: '200px'
    },
    {
      name: "Nivel de Riesgo",
      selector: (row) => row.nivel_riesgo || row.riesgo,
      sortable: true,
      minWidth: '300px',
      wrap: true
    },
    {
      name: "Puntaje",
      selector: (row) => row.evaluacion_score,
      sortable: true,
      width: '100px'
    },
    {
      name: "Fecha de Evaluación",
      selector: (row) => row.fecha_evaluacion,
      sortable: true,
      minWidth: '180px',
      format: (row) => {
        if (!row.fecha_evaluacion) return '';
        const fecha = new Date(row.fecha_evaluacion);
        return fecha.toLocaleString('es-MX', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    },
    {
      name: "Asignar paciente",
      button: true,
      width: '150px',
      cell: (row) => (
        <Button
          size="sm"
          variant="success"
          className="btn-asignar-paciente"
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      )
    }
  ];

  return (
    <div className="nivel-riesgo-tabs-container">
      <Tabs
        id="sedes-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        {sedesIds.map((sedeId) => (
          <Tab
            eventKey={String(sedeId)}
            title={sedesNames[sedeId] || `Sede ${sedeId}`}
            key={sedeId}
          >
            <div className="sede-table-container">
              <h5 className="sede-title">
                {sedesNames[sedeId] || `Sede ${sedeId}`}
                <span className="badge bg-primary ms-2">
                  {dataBySede[sedeId]?.length || 0} pacientes
                </span>
              </h5>
              <DataTable
                columns={columns}
                data={dataBySede[sedeId] || []}
                defaultSortField="name"
                striped
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 50]}
                noDataComponent={<span>No hay registros disponibles para esta sede</span>}
              />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
