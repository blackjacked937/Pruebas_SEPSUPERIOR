    import React, { useState } from "react";
    import DataTable from "react-data-table-component";
    import Button from "react-bootstrap/Button";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { faPencil } from "@fortawesome/free-solid-svg-icons";
    import "./TableNivelRiesgoBySede.css";

    export function TableNivelRiesgoBySede(props) {
    const { dataBySede } = props;
    const [activeTab, setActiveTab] = useState(1);

    // Define sedesNames for tab titles
    const sedesNames = {
      1: "Ciudad de México",
      2: "Morelos",
      3: "Tlaxcala",
      4: "Hidalgo"
    };

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
            const grupo = row.grupo || '';
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
            if (celularUsuario) return celularUsuario;
            if (Array.isArray(row.usuario?.contactos_emergencia) && row.usuario.contactos_emergencia.length > 0) {
              return row.usuario.contactos_emergencia[0].celular || '';
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
          selector: (row) => row.fecha_evaluacion || row.fecha || '',
          sortable: true,
          minWidth: '180px',
          format: (row) => {
            const fechaRaw = row.fecha_evaluacion || row.fecha;
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

      return (
        <div className="nivel-riesgo-tabs-container">
          <div className="tabs-sedes">
            {Object.entries(sedesNames).map(([key, name]) => (
              <button
                key={key}
                className={`tab-sede-btn${parseInt(key) === activeTab ? ' active' : ''}`}
                onClick={() => setActiveTab(parseInt(key))}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="sede-table-container">
            <div className="sede-header">
              <span className="sede-title">{sedesNames[activeTab] || `Sede ${activeTab}`}</span>
              <span className="badge-sede">
                {Array.isArray(dataBySede[activeTab])
                  ? dataBySede[activeTab].filter(p => p.usuario?.sede_id === activeTab).length
                  : 0
                } pacientes
              </span>
            </div>
            <DataTable
              columns={columns}
              data={Array.isArray(dataBySede[activeTab])
                ? dataBySede[activeTab].filter(p => p.usuario?.sede_id === activeTab)
                : []
              }
              defaultSortField="name"
              striped
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 50]}
              noDataComponent={<span>No hay registros disponibles para esta sede</span>}
            />
          </div>
        </div>
      );
    }
