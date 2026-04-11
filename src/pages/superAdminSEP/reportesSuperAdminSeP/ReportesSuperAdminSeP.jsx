import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useReporteEvaluacionesBySedeSeP } from '../../../hooks/sep';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Página de Reportes para SuperGestores de SEP
 * Solo accesible para organización Nacional (org=0)
 * Muestra reportes consolidados de evaluaciones
 * 
 * Acceso: is_superuser === true (SuperGestor) + org=0
 * Protección: RoleRoute allowSuper + allowOrganizaciones={[0]}
 */
export function ReportesSuperAdminSeP() {
  const auth = useAuth();
  const { getAdminData, exportarReporte, loading, error } =
    useReporteEvaluacionesBySedeSeP();

  const [reportes, setReportes] = useState(null);
  const [selectedFormato, setSelectedFormato] = useState('xlsx');

  useEffect(() => {
    const loadReportes = async () => {
      try {
        const data = await getAdminData();
        setReportes(data);
      } catch (err) {
        console.error('Error cargando reportes:', err);
      }
    };
    loadReportes();
  }, []);

  const handleExportar = async () => {
    try {
      await exportarReporte(auth.me?.id_sede, selectedFormato);
    } catch (err) {
      console.error('Error exportando reporte:', err);
    }
  };

  return (
    <RoleRouteSEP allowSuper allowOrganizaciones={[0]}>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Reportes Consolidados - SEP (Acceso Nacional)</b>
        </h1>

        <div className="alert alert-info">
          <strong>Nota:</strong> Estos reportes son solo visibles para SuperGestores
          con acceso Nacional (org=0).
        </div>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Exportar Reportes</h5>
                <div className="mb-3">
                  <label className="form-label">Formato</label>
                  <select
                    className="form-select"
                    value={selectedFormato}
                    onChange={(e) => setSelectedFormato(e.target.value)}
                  >
                    <option value="xlsx">Excel (.xlsx)</option>
                    <option value="csv">CSV (.csv)</option>
                    <option value="pdf">PDF (.pdf)</option>
                  </select>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleExportar}
                  disabled={loading}
                >
                  Descargar Reporte
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Información del Usuario</h5>
                <p>
                  <strong>Email:</strong> {auth.me?.email}
                </p>
                <p>
                  <strong>Nivel de Acceso:</strong> SuperGestor Nacional
                </p>
                <p>
                  <strong>Organización:</strong> Nacional (org=0)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Resumen de Reportes</h5>

            {reportes ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Periodo</th>
                      <th>Total Evaluaciones</th>
                      <th>Sedes Reportando</th>
                      <th>Tasa de Finalización</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mes Actual</td>
                      <td>{reportes?.total_evaluaciones || 0}</td>
                      <td>{reportes?.sedes_count || 0}</td>
                      <td>
                        {reportes?.tasa_finalizacion
                          ? `${reportes.tasa_finalizacion}%`
                          : 'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted">Cargando reportes...</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-muted">
            Los reportes mostrados incluyen datos consolidados de todas las sedes.
          </p>
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default ReportesSuperAdminSeP;
