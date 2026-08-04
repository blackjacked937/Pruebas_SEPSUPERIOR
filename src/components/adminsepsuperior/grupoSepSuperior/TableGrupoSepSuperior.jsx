import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { marcarAtencionEspecialSepSuperior } from "../../../api/SepSuperior/pacientesSensiblesSepSuperior";
import { useAuth } from "../../../hooks/useAuth";
import { formatPhoneLada } from "../../../utils/phone";
import React, { useState } from "react";

function TableGrupoSepSuperior(props) {
  const { data, onRefetch } = props;
  const { auth } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id || row.usuario?.id || row.evaluacion?.[0]?.id || "-",
      sortable: true,
      width: "80px",
    },
    {
      name: "Paciente",
      selector: (row) => {
        const nombre = row.usuario?.nombre || row.paciente_nombre || row.nombre || "";
        const apellidos = row.usuario?.apellidos || row.apellidos || "";
        return `${nombre} ${apellidos}`.trim() || "Sin nombre";
      },
      sortable: true,
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Correo",
      selector: (row) => row.usuario?.email || row.paciente_correo || row.email || "Sin correo",
      sortable: true,
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Riesgo",
      selector: (row) => row.nivel_riesgo || row.riesgo || "No disponible",
      sortable: true,
      minWidth: "300px",
      wrap: true,
    },
    {
      name: "Fecha de Evaluación",
      selector: (row) => row.fecha_evaluacion || row.fecha || "-",
      sortable: true,
      minWidth: "180px",
      format: (row) => {
        const fechaRaw = row.fecha_evaluacion || row.fecha;
        if (!fechaRaw) return "-";
        const fecha = new Date(fechaRaw);
        return fecha.toLocaleString("es-MX", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      name: "Celular De Emergencia",
      selector: (row) => {
        const celularUsuario =
          row.usuario?.celular_paciente ||
          row.usuario?.celular ||
          row.celular_paciente ||
          row.celular ||
          row.paciente_celular;
        if (celularUsuario) return formatPhoneLada(celularUsuario);

        const contactos = row.usuario?.contactos_emergencia || row.contactos_emergencia;
        if (Array.isArray(contactos) && contactos.length > 0) {
          return formatPhoneLada(contactos[0].celular || "");
        }
        return "Sin celular";
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Parentesco",
      selector: (row) => {
        const contactos = row.usuario?.contactos_emergencia || row.contactos_emergencia;
        if (Array.isArray(contactos) && contactos.length > 0) {
          return contactos[0].parentesco || "";
        }
        return "-";
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Asignar paciente",
      button: true,
      width: "150px",
      cell: (row) => (
        <Button
          size="sm"
          variant="success"
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
    const evaluacionId =
      selectedPaciente.id || selectedPaciente.evaluacion?.[0]?.id || "";
    if (!evaluacionId) {
      toast.error("No se puede asignar: el paciente no tiene evaluación válida.");
      return;
    }
    setLoading(true);
    try {
      await marcarAtencionEspecialSepSuperior(
        evaluacionId,
        { atendido: true },
        auth.token
      );
      toast.success("Paciente asignado correctamente.");
      setShowDialog(false);
      setSelectedPaciente(null);
      setErrorMsg("");
      if (onRefetch) onRefetch();
    } catch (error) {
      toast.error("Error al asignar paciente. Intenta nuevamente.");
      setErrorMsg("Error al asignar paciente. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
      <Modal show={showDialog} onHide={() => setShowDialog(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar asignación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de asignarte a este paciente "
          {selectedPaciente
            ? (selectedPaciente.usuario?.nombre ||
              selectedPaciente.paciente_nombre ||
              selectedPaciente.nombre ||
              "")
            : ""
          }"?
          {errorMsg && (
            <div style={{ color: "red", marginTop: 10 }}>{errorMsg}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDialog(false);
              setErrorMsg("");
            }}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleMarcarAtencion}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Aceptar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { TableGrupoSepSuperior };
export default TableGrupoSepSuperior;