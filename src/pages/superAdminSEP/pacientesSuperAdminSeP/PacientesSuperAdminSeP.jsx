import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { usePacientesSensiblesSeP } from '../../../hooks/sep';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Página de Pacientes en Riesgo para SuperGestores de SEP
 * Muestra pacientes identificados en riesgo de múltiples sedes
 * 
 * Acceso: is_superuser === true (SuperGestor)
 * Protección: RoleRoute allowSuper
 */
export function PacientesSuperAdminSeP() {
  const auth = useAuth();
  const { getPacientesSensibles, pacientes, loading, error } =
    usePacientesSensiblesSeP();

  useEffect(() => {
    getPacientesSensibles();
  }, []);

  return (
    <RoleRouteSEP allowSuper>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Pacientes en Riesgo - SuperGestor SEP</b>
        </h1>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Pacientes Identificados en Riesgo ({pacientes.length})
            </h5>

            {pacientes.length === 0 ? (
              <p className="text-muted">
                No hay pacientes identificados en riesgo en este momento.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Nivel de Riesgo</th>
                      <th>Sede</th>
                      <th>Fecha Evaluación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.map((paciente) => (
                      <tr key={paciente.id}>
                        <td>{paciente.id}</td>
                        <td>{paciente.nombre || 'N/A'}</td>
                        <td>
                          <span className="badge bg-danger">
                            {paciente.nivel_riesgo || 'Alto'}
                          </span>
                        </td>
                        <td>{paciente.sede || 'N/A'}</td>
                        <td>{paciente.fecha_evaluacion || 'N/A'}</td>
                        <td>
                          <button className="btn btn-sm btn-primary">
                            Ver Detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-muted">
            Aquí se mostrarán los pacientes en riesgo de todas las sedes.
          </p>
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default PacientesSuperAdminSeP;
