import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useGestoresSEP } from '../../../hooks/sep';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Página de Gestión de Gestores para SuperGestores de SEP
 * Permite registrar y visualizar gestores en SEP
 * 
 * Acceso: is_superuser === true (SuperGestor)
 * Protección: RoleRoute allowSuper + org=[2] (SEP)
 */
export function GestoresSuperAdminSeP() {
  const auth = useAuth();
  const { getGestores, nuevoGestor, gestores, loading, error } =
    useGestoresSEP();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    id_sede: '',
  });

  useEffect(() => {
    getGestores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await nuevoGestor(formData);
      setFormData({ email: '', nombre: '', apellido: '', id_sede: '' });
      setShowForm(false);
      // Recargar lista
      getGestores();
    } catch (err) {
      console.error('Error registrando gestor:', err);
    }
  };

  return (
    <RoleRouteSEP allowSuper allowOrganizaciones={[2]}>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Gestión de Gestores - SEP</b>
        </h1>

        {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : '+ Registrar Nuevo Gestor'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Registrar Nuevo Gestor</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.apellido}
                      onChange={(e) =>
                        setFormData({ ...formData, apellido: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">ID Sede</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.id_sede}
                      onChange={(e) =>
                        setFormData({ ...formData, id_sede: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success">
                  Registrar
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Gestores Registrados ({gestores.length})</h5>

            {gestores.length === 0 ? (
              <p className="text-muted">No hay gestores registrados aún.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Nombre</th>
                      <th>Sede</th>
                      <th>Fecha Registro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gestores.map((gestor) => (
                      <tr key={gestor.id}>
                        <td>{gestor.email}</td>
                        <td>{gestor.nombre || 'N/A'}</td>
                        <td>{gestor.id_sede}</td>
                        <td>{gestor.fecha_registro || 'N/A'}</td>
                        <td>
                          <button className="btn btn-sm btn-warning">
                            Editar
                          </button>
                          <button className="btn btn-sm btn-danger ms-2">
                            Eliminar
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
      </div>
    </RoleRouteSEP>
  );
}

export default GestoresSuperAdminSeP;
