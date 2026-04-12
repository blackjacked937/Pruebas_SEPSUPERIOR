import { InitialDashboard } from "../dashboard/InitialDashboard";

export default function GraficasGrid({ graficas, loading }) {
  if (loading) return <p>Cargando gráficas...</p>;
  
  // Validar que graficas sea un array
  if (!graficas || !Array.isArray(graficas) || graficas.length === 0) {
    return <p style={{ textAlign: "center", color: "#999" }}>No hay gráficas para mostrar</p>;
  }

  return (
    <div className="row g-4">
      {graficas.map((grafica, index) => (
        <div key={index} className="col-md-6">
          <div className="h-100">
            <InitialDashboard
              title={grafica?.title || "Sin título"}
              data={grafica?.data || []}
            />
          </div>
        </div>
      ))}
    </div>
  );
}