import { InitialDashboardSesyn } from "./InitialDashboard/InitialDashboardSesyn";

export default function GraficasGridSesyn({
  graficas,
  loading,
}) {
  if (loading) {
    return (
      <p className="graficas-sesyn-loading-text">
        Cargando gráficas...
      </p>
    );
  }

  if (
    !graficas ||
    !Array.isArray(graficas) ||
    graficas.length === 0
  ) {
    return (
      <p className="graficas-sesyn-empty">
        No hay gráficas para mostrar.
      </p>
    );
  }

  return (
    <div className="graficas-sesyn-grid">
      {graficas.map((grafica, index) => (
        <div
          key={`${grafica?.title || "grafica"}-${index}`}
          className="graficas-sesyn-card"
        >
          <div className="graficas-sesyn-card-body">
            <InitialDashboardSesyn
              title={grafica?.title || "Sin título"}
              data={grafica?.data || []}
            />
          </div>
        </div>
      ))}
    </div>
  );
}