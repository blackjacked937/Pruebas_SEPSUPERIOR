import  React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,

  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const colorRadarSesyn = "#b251ca";
const coloresGraficasSesyn = [
  "#4f70bd",
  "#6384cf",
  "#7da1eb",
  "#2e8bc0",
  "#b251ca",
  "#f8bc63",
];
  


function TooltipSesyn({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const punto = payload.find(
    (item) => item.value > 0 || item.value === 0
  );

  if (!punto) {
    return null;
  }

  const originalItem = payload[0]?.payload;

  const originalValue =
    originalItem?.originalScore ?? Math.round(punto.value);

  return (
    <div className="graficas-sesyn-tooltip">
      <strong>{label}</strong>: {originalValue}
    </div>
  );
}

function EtiquetaPolarSesyn(props) {
  const {
    x,
    y,
    payload,
    textAnchor,
  } = props;

  const textoOriginal = String(payload?.value || "");

  const textoLimpio = textoOriginal.replace(
    /^usuarios con\s*/i,
    ""
  );

  const palabras = textoLimpio
    .split(" ")
    .filter(Boolean);

  const lineas = [];

  for (let indice = 0; indice < palabras.length; indice += 2) {
    lineas.push(
      palabras.slice(indice, indice + 2).join(" ")
    );
  }

  const lineHeight = 13;
  const offsetY =
    -(lineas.length - 1) * (lineHeight / 2);

  return (
    <text
      x={x}
      y={y + offsetY}
      textAnchor={textAnchor}
      className="graficas-sesyn-axis-label"
    >
      {lineas.map((linea, index) => (
        <tspan
          key={`${linea}-${index}`}
          x={x}
          dy={index === 0 ? 0 : lineHeight}
        >
          {linea}
        </tspan>
      ))}
    </text>
  );
}

export function InitialDashboardSesyn({
  data = [],
  title = "Sin título",
}) {
  const [tipoVista, setTipoVista] = useState("RADAR");

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="graficas-sesyn-empty-chart">
        No hay datos disponibles para esta gráfica.
      </p>
    );
  }

  const datosValidos = data.map((item) => ({
    ...item,
    score: Number(item?.score) || 0,
  }));
  const totalValores = datosValidos.reduce(
  (acumulado, item) => acumulado + item.score,
  0
);
const datosCircularSesyn = 
totalValores > 0 ? datosValidos :[{
name: "sin datos",
score: 1,
esPlaceholder: true,
},
];


  let maxValue = Math.max(
    ...datosValidos.map((item) => item.score),
    1
  );

  let normalizedData = datosValidos.map((item) => ({
    ...item,
    originalScore: item.score,
  }));

  
  if (datosValidos.length === 3) {
    normalizedData = datosValidos.map((item) => ({
      ...item,
      score: (item.score / maxValue) * 100,
      originalScore: item.score,
    }));

    maxValue = 100;
  }

  const axisCount = normalizedData.length;
  const radius = axisCount >= 5 ? "55%" : "60%";

  return (
    <div className="graficas-sesyn-dashboard">
      <h4 className="graficas-sesyn-dashboard-title">
        {title}
      </h4>
      <div className="graficas-sesyn-view-selector">
        <select 
          value={tipoVista}
          onChange={(e) => setTipoVista(e.target.value)}
          className="graficas-sesyn-view-select"
          >
            <option value="RADAR">Radar</option>
            <option value="BARRAS">Barras</option>
            <option value="DONA">Donut</option>
            <option value="PASTEL">Pastel</option>
          </select>
      </div>
      
          
      <div className="graficas-sesyn-chart-wrapper">
        {tipoVista === "RADAR" && (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="55%"
            outerRadius={radius}
            data={normalizedData}
          >
            <PolarGrid />

            <PolarAngleAxis
              dataKey="name"
              tick={<EtiquetaPolarSesyn />}
            />

            <PolarRadiusAxis
              domain={[0, maxValue]}
              tick={false}
              axisLine={false}
            />

            <Tooltip content={<TooltipSesyn />} />

            <Radar
              name={title}
              dataKey="score"
              stroke={colorRadarSesyn}
              fill={colorRadarSesyn}
              fillOpacity={0.7}
              dot={false}
            />
          </RadarChart>
        </ResponsiveContainer>)}
        {tipoVista === "BARRAS" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosValidos} margin={{ top: 20, right: 20, left: 0, bottom: 30,}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} fontSize={10}/>
              <YAxis/>
              <Tooltip />
              <Bar dataKey="score" fill={colorRadarSesyn} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      {tipoVista === "DONA" && (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={datosCircularSesyn}
        dataKey="score"
        nameKey="name"
        cx="50%"
        cy="43%"
        innerRadius={55}
        outerRadius={90}
        paddingAngle={totalValores > 0 ? 3 : 0}
        isAnimationActive={totalValores > 0}
      >
        {datosCircularSesyn.map((item, index) => (
          <Cell
            key={`${item.name}-${index}`}
            fill={
              item.esPlaceholder
                ? "#d7dce3"
                : coloresGraficasSesyn[
                    index % coloresGraficasSesyn.length
                  ]
            }
          />
        ))}
      </Pie>

      {totalValores > 0 && <Tooltip />}

      {totalValores > 0 && (
        <Legend
          verticalAlign="bottom"
          height={50}
          wrapperStyle={{
            fontSize: "10px",
          }}
        />
      )}

      {totalValores === 0 && (
        <text
          x="50%"
          y="44%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#7a8491"
          fontSize="13"
          fontWeight="600"
        >
          Sin datos
        </text>
      )}
    </PieChart>
  </ResponsiveContainer>
)}
{tipoVista === "PASTEL" && (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={datosCircularSesyn}
        dataKey="score"
        nameKey="name"
        cx="50%"
        cy="43%"
        outerRadius={90}
        paddingAngle={totalValores > 0 ? 2 : 0}
        isAnimationActive={totalValores > 0}
      >
        {datosCircularSesyn.map((item, index) => (
          <Cell
            key={`${item.name}-${index}`}
            fill={
              item.esPlaceholder
                ? "#d7dce3"
                : coloresGraficasSesyn[
                    index % coloresGraficasSesyn.length
                  ]
            }
          />
        ))}
      </Pie>

      {totalValores > 0 && <Tooltip />}

      {totalValores > 0 && (
        <Legend
          verticalAlign="bottom"
          height={50}
          wrapperStyle={{
            fontSize: "10px",
          }}
        />
      )}

      {totalValores === 0 && (
        <text
          x="50%"
          y="44%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#7a8491"
          fontSize="13"
          fontWeight="600"
        >
          Sin datos
        </text>
      )}
    </PieChart>
  </ResponsiveContainer>
)}
      </div>
    </div>
  );
}

export default InitialDashboardSesyn;