import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useGraficasSeP } from '../../../hooks/sep';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Página de Gráficas para SuperGestores de SEP
 * Muestra análisis y estadísticas de múltiples sedes
 * 
 * Acceso: is_superuser === true (SuperGestor)
 * Protección: RoleRoute allowSuper
 */
export function GraficasSuperAdminSeP() {
  const auth = useAuth();
  const {
    getConteoPorNivelRiesgoCategoriaBySedeSeP,
    getGraficasPreguntasBySedeSeP,
    getRangoDePreguntasBySedeSeP,
    loading,
    error,
  } = useGraficasSeP();

  const [selectedSede, setSelectedSede] = useState(null);
  const [graficas, setGraficas] = useState(null);
  const sedesDisponibles = {
    '8': 'CDMX',
    '9': 'Estado de México',
    '10': 'Hidalgo',
    '11': 'Querétaro',
  };

  useEffect(() => {
    if (!selectedSede) {
      setSelectedSede(Object.keys(sedesDisponibles)[0]);
    }
  }, []);

  useEffect(() => {
    if (!selectedSede) return;

    const loadGraficas = async () => {
      try {
        const [conteo, graph, rango] = await Promise.all([
          getConteoPorNivelRiesgoCategoriaBySedeSeP(selectedSede),
          getGraficasPreguntasBySedeSeP(selectedSede),
          getRangoDePreguntasBySedeSeP(selectedSede),
        ]);
        setGraficas({ conteo, graph, rango });
      } catch (err) {
        console.error('Error cargando gráficas:', err);
      }
    };
    loadGraficas();
  }, [selectedSede]);

  return (
    <RoleRouteSEP allowSuper>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Gráficas y Estadísticas - SuperGestor SEP</b>
        </h1>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-4">
          <label className="form-label">Selecciona una sede:</label>
          <select
            className="form-select"
            value={selectedSede || ''}
            onChange={(e) => setSelectedSede(e.target.value)}
          >
            {Object.entries(sedesDisponibles).map(([sedeId, sedeName]) => (
              <option key={sedeId} value={sedeId}>
                {sedeName}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Conteo por Nivel de Riesgo</h5>
                <p className="text-muted">
                  {graficas?.conteo ? 'Datos disponibles' : 'Cargando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Gráfica de Preguntas</h5>
                <p className="text-muted">
                  {graficas?.graph ? 'Datos disponibles' : 'Cargando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Rango de Preguntas</h5>
                <p className="text-muted">
                  {graficas?.rango ? 'Datos disponibles' : 'Cargando...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-muted">
            Aquí se mostrarán las gráficas de todas las sedes seleccionadas.
          </p>
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default GraficasSuperAdminSeP;
