import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import "./TablePacientesSensibles.css";

export function TablePacientesSensibles(props) {
  const { data } = props;

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id || row._id || '-',
      sortable: true,
      width: '80px'
    },
    {
      name: "Paciente",
      selector: (row) => {
        if (row.usuario) {
          return `${row.usuario.nombre || ''} `.trim();
        }
        return '';
      },
      sortable: true,
      wrap: true,
      minWidth: '200px'
    },
    {
      name: "Correo",
      selector: (row) => row.usuario?.email,
      sortable: true,
      wrap: true,
      minWidth: '200px'
    },
    {
      name: "Riesgo",
      selector: (row) => row.nivel_riesgo || row.riesgo || 'No disponible',
      sortable: true,
      minWidth: '300px',
      wrap: true
    },
    {
      name: "Puntaje",
      selector: (row) => row.evaluacion_score || row.puntaje || '-',
      sortable: true,
      width: '100px'
    },
    {
      name: "Fecha de Evaluación",
      selector: (row) => row.fecha_evaluacion,
      sortable: true,
      minWidth: '180px',
      format: (row) => {
        if (!row.fecha_evaluacion) return '-';
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
          className="table-pacientes-sensibles__boton btn-boton"
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      defaultSortField="name"
      striped
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 20, 30, 50]}
      subHeader
      noDataComponent={<span>No hay registros disponibles</span>}
    />
  );
}
