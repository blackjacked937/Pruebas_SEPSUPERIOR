import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useGestoresSEP } from '../../../hooks/sep';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Dashboard principal para Gestores de SEP
 * Muestra indicadores de riesgo y estadísticas de su sede
 * 
 * Acceso: is_staff === true (Gestor)
 * Protección: RoleRoute allowStaff
 */
export function HomeAdminSeP() {
  const auth = useAuth();
  const { getConteoNivelRiesgoAdmin, loading, error } = useGestoresSEP();
  const [conteo, setConteo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getConteoNivelRiesgoAdmin();
        setConteo(data);
      } catch (err) {
        console.error('Error cargando conteo:', err);
      }
    };
    loadData();
  }, []);

  return (
    <RoleRouteSEP allowStaff>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Dashboard Mente Conecta SEP</b>
        </h1>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        {error && <div className="alert alert-danger">{error}</div>}

        {conteo && (
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Indicadores de Riesgo - Mi Sede</h5>
                  <p>
                    <strong>Usuario:</strong> {auth.me?.email}
                  </p>
                  <p>
                    <strong>Organización:</strong> SEP
                  </p>
                  <p>
                    <strong>Sede ID:</strong> {auth.me?.id_sede}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="text-muted">
            Aquí se mostrarán los datos específicos de tu sede.
            Los componentes de gráficas y estadísticas se pueden integrar aquí.
          </p>
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default HomeAdminSeP;
