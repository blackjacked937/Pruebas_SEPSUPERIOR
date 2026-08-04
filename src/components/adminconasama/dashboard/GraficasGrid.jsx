import { InitialDashboard } from "../dashboard/InitialDashboard";

export default function GraficasGrid({ graficas, loading }) {
  if (loading) return <p>Cargando gráficas...</p>;

  return (
 <div className="row g-3">
  {graficas.map((grafica, index) => (
    <div key={index} className="col-lg-3 col-xl-2">
      <div className="h-100">
        <InitialDashboard
          title={grafica.title}
          data={grafica.data}
        />
      </div>
    </div>
  ))}
</div>
  );
}