import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import { marcarAtencionEspecialSeP } from "../../../../api/sep/pacientesSensiblesSEP";
import { useAuth } from "../../../../hooks/useAuth";
import { formatPhoneLada } from "../../../../utils/phone";
import "./TablePacientesSensibles.css";
import React, { useState } from "react";

function TablePacientesSensibles(props) {
  const { data, onRefetch } = props;
  const { auth } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getRiesgoColor = (clasificacion) => {
    if (!clasificacion) return 'inherit';
    const texto = String(clasificacion).toUpperCase();
    if (texto.includes('GRUPO D')) return '#E63946';
    if (texto.includes('GRUPO C')) return '#F4A261';
    if (texto.includes('GRUPO B')) return '#F46036';
    if (texto.includes('GRUPO A')) return '#2A9D8F';
    return 'inherit';
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id || "-",
      sortable: true,
      width: "70px",
    },
    {
      name: "Paciente",
      selector: (row) => {
        const nombre = row.nombre || row.usuario?.nombre || "";
        const pat = row.apellido_paterno || row.usuario?.apellido_paterno || row.apellidos || "";
        const mat = row.apellido_materno || row.usuario?.apellido_materno || "";
        const completo = `${nombre} ${pat} ${mat}`.trim();
        return completo || "Sin nombre";
      },
      sortable: true,
      wrap: true,
      grow: 1.4,
      minWidth: "160px",
    },
    {
      name: "Correo",
      selector: (row) => row.email || row.usuario?.email || "Sin correo",
      sortable: true,
      wrap: true,
      grow: 1.5,
      minWidth: "170px",
    },
    {
  name: "Riesgo",
  selector: (row) =>
    row.nivel_riesgo ||
    row.riesgo ||
    row.evaluacion?.[0]?.nivel_riesgo ||
    "No disponible",
  sortable: true,
  wrap: true,
  grow: 1.6,
  minWidth: "190px",
  cell: (row) => {
    const riesgo =
      row.nivel_riesgo ||
      row.riesgo ||
      row.evaluacion?.[0]?.nivel_riesgo ||
      "No disponible";

    return (
      <span
        style={{
          color: getRiesgoColor(riesgo),
          fontWeight: 700,
        }}
      >
        {riesgo}
      </span>
    );
  },
},
    {
      name: "Fecha de Evaluación",
      selector: (row) => {
        const rawFecha =
          row.date_joined ||
          row.fecha_evaluacion ||
          row.created_at ||
          row.createdAt ||
          row.evaluacion?.[0]?.fecha_evaluacion;

        if (!rawFecha) return "-";

        const fecha = new Date(rawFecha);
        if (isNaN(fecha.getTime())) return String(rawFecha);

        return fecha.toLocaleDateString("es-MX", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      sortable: true,
      minWidth: "155px",
      wrap: true,
    },
    {
      name: "Celular De Emergencia",
      selector: (row) => {
        const celularDirecto = row.celular_paciente || row.celular;
        if (celularDirecto) return formatPhoneLada(celularDirecto);

        const contactos = row.contactos_emergencia || row.usuario?.contactos_emergencia;
        if (Array.isArray(contactos) && contactos.length > 0) {
          return formatPhoneLada(contactos[0].celular || "");
        }
        return "Sin celular";
      },
      sortable: true,
      width: "145px",
    },
    {
      name: "Parentesco",
      selector: (row) => {
        const contactos = row.contactos_emergencia || row.usuario?.contactos_emergencia;
        if (Array.isArray(contactos) && contactos.length > 0) {
          return contactos[0].parentesco || "";
        }
        return "-";
      },
      sortable: true,
      width: "110px",
    },
    {
      name: "Asignar paciente",
      button: true,
      width: "95px",
      cell: (row) => (
        <Button
          size="sm"
          variant="success"
          className="table-pacientes-sensibles__boton btn-boton"
          onClick={() => {
            setSelectedPaciente(row);
            setShowDialog(true);
          }}
          title="Asignarte a este paciente"
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      ),
    },
  ];

  const handleMarcarAtencion = async () => {
    if (!selectedPaciente) return;
    const evaluacionId = selectedPaciente.id || "";
    if (!evaluacionId) {
      setErrorMsg("No se puede asignar: el paciente no tiene evaluación válida.");
      return;
    }
    setLoading(true);
    try {
      await marcarAtencionEspecialSeP(evaluacionId, { atendido: true }, auth.token);
      setShowDialog(false);
      setSelectedPaciente(null);
      setErrorMsg("");
      if (onRefetch) onRefetch();
    } catch (error) {
      setErrorMsg("Error al asignar paciente. Intenta nuevamente o consulta al administrador.");
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    headRow: {
      style: {
        borderBottomColor: '#c5e1a5',
        borderBottomWidth: '2px',
      },
    },
    headCells: {
      style: {
        fontWeight: '800',
        color: '#1A1A1A',
        fontSize: '14px',
      },
    },
    rows: {
      style: {
        borderBottomColor: '#dcedc8',
        borderBottomWidth: '1px',
        fontWeight: '600',
        color: '#333',
      },
    },
  };

  return (
    <div className="table-sensibles-container">
      <DataTable
        columns={columns}
        data={data}
        defaultSortField="name"
        striped={false}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        subHeader
        noDataComponent={<span className="py-4 font-weight-bold">No hay registros disponibles</span>}
        customStyles={customStyles}
      />
      <Modal show={showDialog} onHide={() => setShowDialog(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar asignación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de asignarte a este paciente "{selectedPaciente ? selectedPaciente.nombre : ""}"?
          {errorMsg && (
            <div style={{ color: 'red', marginTop: 10 }}>{errorMsg}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowDialog(false); setErrorMsg(""); }} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleMarcarAtencion} disabled={loading}>
            {loading ? "Procesando..." : "Aceptar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { TablePacientesSensibles };
export default TablePacientesSensibles;