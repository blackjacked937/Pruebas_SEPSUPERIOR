import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useGestoresSEP } from '../../../hooks/sep';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Dashboard principal para SuperGestores de SEP
 * Muestra panel de todas las sedes según su organización
 * 
 * Acceso: is_superuser === true (SuperGestor)
 * Protección: RoleRoute allowSuper
 */

// Mapeo de sedes por organización
const sedesPorOrganizacion = {
  0: {  // Nacional: todas las sedes
    '8': 'CDMX',
    '9': 'Estado de México',
    '10': 'Hidalgo',
    '11': 'Querétaro',
    '12': 'San Luis Potosí',
    '13': 'Tamaulipas',
    '14': 'Aguascalientes',
  },
  2: { // SEP actual
    '8': 'CDMX',
    '9': 'Estado de México',
    '10': 'Hidalgo',
    '11': 'Querétaro',
  },
};

export function HomeSuperAdminSeP() {
  const auth = useAuth();
  const { getConteoNivelRiesgo, loading, error } = useGestoresSEP();
  const [sedesData, setSedesData] = useState({});
  const [selectedSede, setSelectedSede] = useState(null);

  const organizacion = auth.me?.organizacion || 0;
  const sedesDisponibles = sedesPorOrganizacion[organizacion] || {};

  useEffect(() => {
    const loadSedesData = async () => {
      try {
        const data = {};
        for (const sedeId of Object.keys(sedesDisponibles)) {
          data[sedeId] = await getConteoNivelRiesgo(sedeId);
        }
        setSedesData(data);
      } catch (err) {
        console.error('Error cargando datos de sedes:', err);
      }
    };
    loadSedesData();
  }, [organizacion]);

  return (
    <RoleRouteSEP allowSuper>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Panel de Sedes - SuperGestor SEP</b>
        </h1>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Información del Usuario</h5>
                <p>
                  <strong>Email:</strong> {auth.me?.email}
                </p>
                <p>
                  <strong>Organización:</strong> SEP
                </p>
                <p>
                  <strong>Alcance:</strong> {Object.keys(sedesDisponibles).length} sedes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sedes Disponibles</h5>
                <div className="btn-group mb-3" role="group">
                  {Object.entries(sedesDisponibles).map(([sedeId, sedeName]) => (
                    <button
                      key={sedeId}
                      type="button"
                      className={`btn ${
                        selectedSede === sedeId
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                      onClick={() => setSelectedSede(sedeId)}
                    >
                      {sedeName}
                    </button>
                  ))}
                </div>

                {selectedSede && sedesData[selectedSede] && (
                  <div className="mt-3">
                    <h6>Datos de {sedesDisponibles[selectedSede]}</h6>
                    <pre>{JSON.stringify(sedesData[selectedSede], null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-muted">
            Aquí se mostrarán los datos agregados de todas tus sedes.
          </p>
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default HomeSuperAdminSeP;
