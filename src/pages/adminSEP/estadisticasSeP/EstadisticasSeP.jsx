import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useGraficasSeP } from '../../../hooks/sep';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Página de Estadísticas para Gestores de SEP
 * Muestra análisis detallados de su sede
 * 
 * Acceso: is_staff === true (Gestor)
 * Protección: RoleRoute allowStaff
 */
export function EstadisticasSeP() {
  const auth = useAuth();
  const {
    getConteoPorNivelRiesgoCategoriaSeP,
    getGraficasPreguntasSeP,
    getRangoDePreguntasSeP,
    loading,
    error,
  } = useGraficasSeP();
  const [stats, setStats] = useState({
    conteo: null,
    graficas: null,
    rango: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [conteo, graficas, rango] = await Promise.all([
          getConteoPorNivelRiesgoCategoriaSeP(),
          getGraficasPreguntasSeP(),
          getRangoDePreguntasSeP(),
        ]);
        setStats({ conteo, graficas, rango });
      } catch (err) {
        console.error('Error cargando estadísticas:', err);
      }
    };
    loadData();
  }, []);

  return (
    <RoleRouteSEP allowStaff>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Estadísticas SEP - Mi Sede</b>
        </h1>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Conteo por Nivel de Riesgo</h5>
                <p className="text-muted">
                  {stats.conteo
                    ? `${JSON.stringify(stats.conteo).substring(0, 100)}...`
                    : 'Cargando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Gráficas por Preguntas</h5>
                <p className="text-muted">
                  {stats.graficas ? 'Datos disponibles' : 'Cargando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Rango de Preguntas</h5>
                <p className="text-muted">
                  {stats.rango ? 'Datos disponibles' : 'Cargando...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-muted">
            Aquí se mostrarán las gráficas y análisis detallados de tu sede.
          </p>
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default EstadisticasSeP;
