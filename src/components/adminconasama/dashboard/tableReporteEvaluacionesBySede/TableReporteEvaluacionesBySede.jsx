    import React, { useState } from "react";
    import DataTable from "react-data-table-component";
    import "./TableReporteEvaluacionesBySede.css";
    import * as XLSX from "xlsx";
    import { saveAs } from "file-saver";

    export function TableReportesEvaluacionesBySede(props) {
    const { dataBySede, sedesIds, nombresSedes, activeSede, onChangeSede } = props;

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "70px",
        },
        {
            name: "Edad",
            selector: (row) => row.edad,
            sortable: true,
            width: "90px",
        },
        {
            name: "Peso",
            selector: (row) => row.peso,
            sortable: true,
            width: "90px",
        },
        {
            name: "Estatura",
            selector: (row) => row.estatura,
            sortable: true,
            width: "120px",
        },
        {
            name: "Sexo",
            selector: (row) => row.sexo,
            sortable: true,
            width: "120px",
        },
        {
            name: "País",
            selector: (row) => row.pais,
            sortable: true,
            width: "120px",
        },
        {
            name: "Orientación Sexual",
            selector: (row) => row.orientacion_sexual,
            sortable: true,
            wrap: true,
            width: "170px",
        },
        {
            name: "Nivel de Educación",
            selector: (row) => row.nivel_educacion,
            sortable: true,
            wrap: true,
            minWidth: "250px",
        },
        {
            name: "Estado Civil",
            selector: (row) => row.estado_civil,
            sortable: true,
            wrap: true,
            width: "140px",
        },
        {
            name: "Nivel de Ingresos",
            selector: (row) => row.ingreso_mensual,
            sortable: true,
            width: "160px",
        },
        {
            name: "Ansiedad Resultado",
            selector: (row) => row.gad7_score_resultado,
            cell: (row) => {
                const value = row.gad7_score_resultado || "";

                let color = "gray";

                if (value.includes("Severa")) { color = "#d32f2f";
                } else if (value.includes("Moderada")) { color = "#f57c00";
                } else if (value.includes("Leve")) { color = "#fbc02d";
                } else if (value.includes("Mínima")) { color = "#388e3c";
                }

                return <span style={{color, fontWeight:"600"}}>{value}</span>;
            },
            sortable: true,
            wrap: true,
            minWidth: "180px",
        },
        {
            name: "Ansiedad Estatus",
            selector: (row) => row.gad7_estado,
            sortable: true,
            wrap: true,
            minWidth: "170px",
        },
        {
            name: "Depresión Resultado",
            selector: (row) => row.phq9_score_resultado,
            cell: (row) => {
                const value = row.phq9_score_resultado || "";

                let color = "gray";

                if (value.includes("Severa")) { color = "#d32f2f";
                } else if (value.includes("Moderada")) { color = "#f57c00";
                } else if (value.includes("Leve")) { color = "#fbc02d";
                } else if (value.includes("Mínima")) { color = "#388e3c";
                }

                return <span style={{color, fontWeight:"600"}}>{value}</span>;
            },
            sortable: true,
            wrap: true,
            minWidth: "180px",
        },
        {
            name: "Depresión Estatus",
            selector: (row) => row.phq9_estado,
            sortable: true,
            wrap: true,
            minWidth: "170px",
        },
        {
            name: "Alcohol Resultado",
            selector: (row) => row.alcohol_score_resultado,
            cell: (row) => {
                const value = row.alcohol_score_resultado || "";

                let color = "gray";

                if (value.includes("Alto")) { color = "#d32f2f";
                } else if (value.includes("Consumo Peligroso")) { color = "#f57c00";
                } else if (value.includes("Bajo")) { color = "#388e3c";
                }

                return <span style={{color, fontWeight:"600"}}>{value}</span>;
            },
            sortable: true,
            wrap: true,
            minWidth: "180px",
        },
        {
            name: "Alcohol Estatus",
            selector: (row) => row.alcohol_estado,
            sortable: true,
            wrap: true,
            minWidth: "170px",
        },
        {
            name: "Drogas Resultado",
            selector: (row) => row.drogas_score_resultado,
            cell: (row) => {
                const value = row.drogas_score_resultado || "";

                let color = "gray";

                if (value.includes("Alto")) { color = "#d32f2f";
                } else if (value.includes("Moderado")) { color = "#f57c00";
                } else if (value.includes("Bajo")) { color = "#388e3c";
                }

                return <span style={{color, fontWeight:"600"}}>{value}</span>;
            },
            sortable: true,
            wrap: true,
            minWidth: "170px",
        },
        {
            name: "Drogas Estatus",
            selector: (row) => row.drogas_estado,
            sortable: true,
            wrap: true,
            minWidth: "170px",
        },
        {
            name: "Tabaco Resultado",
            selector: (row) => row.tabaco_score_resultado,
            cell: (row) => {
                const value = row.tabaco_score_resultado || "";

                let color = "gray";

                if (value.includes("Alta")) { color = "#d32f2f";
                } else if (value.includes("Moderada")) { color = "#f57c00";
                } else if (value.includes("Baja")) { color = "#388e3c";
                }

                return <span style={{color, fontWeight:"600"}}>{value}</span>;
            },
            sortable: true,
            wrap: true,
            minWidth: "200px",
        },
        {
            name: "Tabaco Estatus",
            selector: (row) => row.tabaco_estado,
            sortable: true,
            wrap: true,
            minWidth: "130px",
        },
        {
            name: "Conducta Alimentaria Resultado",
            selector: (row) => row.conducta_alimentaria_score_resultado,
            cell: (row) => {
                const value = row.conducta_alimentaria_score_resultado || "";

                let color = "gray";

                if (value.includes("Alto")) { color = "#d32f2f";
                } else if (value.includes("Bajo")) { color = "#388e3c";
                }

                return <span style={{color, fontWeight:"600"}}>{value}</span>;
            },
            sortable: true,
            wrap: true,
            minWidth: "260px",
        },
        {
            name: "Conducta Alimentaria Estatus",
            selector: (row) => row.conducta_alimentaria_estado,
            sortable: true,
            wrap: true,
            minWidth: "230px",
        },
        {
            name: "Riesgo Suicidio Resultado",
            selector: (row) => row.columbia_score_resultado,
            cell: (row) => {
                const value = row.columbia_score_resultado || "";

                let color = "gray";

                if (value.includes("Alto")) { color = "#d32f2f";
                } else if (value.includes("Bajo")) { color = "#388e3c";
                }

                return <span style={{color, fontWeight:"600"}}>{value}</span>;
            },
            sortable: true,
            wrap: true,
            minWidth: "210px",
        },
        {
            name: "Riesgo Suicidio Estatus",
            selector: (row) => row.columbia_estado,
            sortable: true,
            wrap: true,
            minWidth: "200px",
        },
    ];

    const exportToExcel = () => {

        const data = Array.isArray(dataBySede[activeSede])
            ? dataBySede[activeSede]
            : [];

        if (!data.length) return;

        const formattedData = data.map((row) => ({
            "ID": row.id,
            "Edad": row.edad,
            "Peso": row.peso,
            "Estatura": row.estatura,
            "Sexo": row.sexo,
            "País": row.pais,
            "Orientación Sexual": row.orientacion_sexual,
            "Educación": row.nivel_educacion,
            "Estado Civil": row.estado_civil,
            "Nivel de Ingresos": row.ingreso_mensual,
            "Ansiedad Resultado": row.gad7_score_resultado,
            "Ansiedad Estado": row.gad7_estado,
            "Depresión Resultado": row.phq9_score_resultado,
            "Depresión Estado": row.phq9_estado,
            "Alcohol Resultado": row.alcohol_score_resultado,
            "Alcohol Estado": row.alcohol_estado,
            "Drogas Resultado": row.drogas_score_resultado,
            "Drogas Estado": row.drogas_estado,
            "Tabaco Resultado": row.tabaco_score_resultado,
            "Tabaco Estado": row.tabaco_estado,
            "Conducta Alimentaria Resultado": row.conducta_alimentaria_score_resultado,
            "Conducta Alimentaria Estado": row.conducta_alimentaria_estado,
            "Riesgo Suicidio Resultado": row.columbia_score_resultado,
            "Riesgo Suicidio Estado": row.columbia_estado,
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const sedeNombre = nombresSedes[activeSede] || `Sede_${activeSede}`;

        saveAs(file, `reporte_${sedeNombre}.xlsx`);
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
          <div className="sede-table-container">
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
              <button
                onClick={exportToExcel}
                className="btn-export-excel"
              >
                Exportar Excel
              </button>
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
              paginationRowsPerPageOptions={[10, 20, 30, 50]}
              noDataComponent={<span>No hay registros disponibles para esta sede</span>}
            />
          </div>
        </div>
      );
    }
