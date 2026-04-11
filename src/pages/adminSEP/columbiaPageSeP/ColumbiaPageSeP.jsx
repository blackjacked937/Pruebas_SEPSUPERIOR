import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Página de Evaluaciones Columbia para Gestores de SEP
 * Muestra tabla de evaluaciones Columbia de su sede
 * 
 * Acceso: is_staff === true (Gestor)
 * Protección: RoleRoute allowStaff
 */
export function ColumbiaPageSeP() {
  const auth = useAuth();
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Implementar llamada a API de evaluaciones Columbia para SEP
    setLoading(false);
  }, []);

  return (
    <RoleRouteSEP allowStaff>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Evaluaciones Columbia - Mi Sede</b>
        </h1>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tabla de Evaluaciones</h5>

            {evaluaciones.length === 0 ? (
              <p className="text-muted">
                No hay evaluaciones disponibles en tu sede.
              </p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Renderizar evaluaciones aquí */}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-muted">
            Aquí se mostrarán las evaluaciones Columbia de tu sede.
          </p>
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default ColumbiaPageSeP;
