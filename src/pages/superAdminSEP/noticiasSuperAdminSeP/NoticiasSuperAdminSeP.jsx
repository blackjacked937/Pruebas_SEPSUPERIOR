import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { RoleRouteSEP } from '../../../components/adminsep';

/**
 * Página de Noticias para SuperGestores de SEP
 * Permite crear y gestionar noticias/comunicados en SEP
 * 
 * Acceso: is_superuser === true (SuperGestor)
 * Protección: RoleRoute allowSuper
 */
export function NoticiasSuperAdminSeP() {
  const auth = useAuth();
  const [noticias, setNoticias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Cargar noticias desde API
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // TODO: Enviar noticia a API
      setFormData({ titulo: '', contenido: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error creando noticia:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleRouteSEP allowSuper>
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ color: '#04547B' }}>
          <b>Noticias y Comunicados - SEP</b>
        </h1>

        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : '+ Crear Nueva Noticia'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Crear Nueva Noticia</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.titulo}
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contenido</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={formData.contenido}
                    onChange={(e) =>
                      setFormData({ ...formData, contenido: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Publicar'}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="row">
          {noticias.length === 0 ? (
            <div className="col-12">
              <p className="text-muted">
                No hay noticias publicadas aún.
              </p>
            </div>
          ) : (
            noticias.map((noticia) => (
              <div key={noticia.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{noticia.titulo}</h5>
                    <p className="card-text">{noticia.contenido}</p>
                    <small className="text-muted">
                      {noticia.fecha_creacion}
                    </small>
                    <div className="mt-3">
                      <button className="btn btn-sm btn-warning">
                        Editar
                      </button>
                      <button className="btn btn-sm btn-danger ms-2">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </RoleRouteSEP>
  );
}

export default NoticiasSuperAdminSeP;
