import React, { useState } from 'react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const pastelColors = [
    "#b251ca",
];

const coloresGraficas = [
    "#4f70bd",
    "#6384cf",
    "#7da1eb",
    "#2e8bc0",
    "#b251ca",
    "#f8bc63",
];

// Tooltip personalizado
function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length > 0) {
        const punto = payload.find(p => p.value > 0 || p.value === 0);
        if (!punto) return null;
        
        // Buscar el valor original en los datos no normalizados
        const originalItem = payload[0].payload;
        const originalValue = originalItem.originalScore || Math.round(punto.value);
        
        return (
            <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
                <strong>{label}</strong>: {originalValue}
            </div>
        );
    }
    return null;
}

export function InitialDashboard({ data = [], title = "Sin título" }) {
    const [tipoVista, setTipoVista] = useState("RADAR");

    // Datos procesados
    const datosValidos = data.map((item) => ({
        ...item,
        score: Number(item?.score) || 0,
    }));

    const totalValores = datosValidos.reduce(
        (acumulado, item) => acumulado + item.score,
        0
    );

    const datosCircular = totalValores > 0 
        ? datosValidos 
        : [{ name: "sin datos", score: 1, esPlaceholder: true }];

    // Normalizar los valores para Radar
    let normalizedData = datosValidos;
    let maxValue = Math.max(...datosValidos.map(d => d.score), 1); // evitar 0

    if (datosValidos.length === 3) {
        normalizedData = datosValidos.map(d => ({
            ...d,
            score: (d.score / maxValue) * 100, // Normaliza a 100
            originalScore: d.score // Guardar el valor original
        }));
        maxValue = 100;
    } else {
        normalizedData = datosValidos.map(d => ({
            ...d,
            originalScore: d.score // Guardar el valor original
        }));
    }
    const axisCount = normalizedData.length;
    const radius = axisCount >= 5 ? "55%" : "60%";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <h4 style={{ textAlign: "center", marginBottom: 10, fontSize: "1.25rem", fontWeight: 800, color: "#0F4C75" }}>{title}</h4>
            
            <div className="graficas-sesyn-view-selector" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
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

            <div style={{ width: '100%', height: '100%', flex: 1 }}>
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
                                tick={(props) => {
                                    const { x, y, payload, textAnchor } = props;
                                    const clean = (payload?.value || "").replace(/^usuarios con\s*/i, "");
                                    const words = clean.split(" ");
                                    const lines = [];
                                    for (let i = 0; i < words.length; i += 2) {
                                        lines.push(words.slice(i, i + 2).join(" "));
                                    }
                                    const lineHeight = 13;
                                    const offsetY = -(lines.length - 1) * (lineHeight / 2);

                                    return (
                                        <text
                                            x={x}
                                            y={y + offsetY}
                                            textAnchor={textAnchor}
                                            fontSize={11}
                                            fontWeight={500}
                                            fill="#0F4C75"
                                        >
                                            {lines.map((line, index) => (
                                                <tspan key={index} x={x} dy={index === 0 ? 0 : lineHeight}>
                                                    {line}
                                                </tspan>
                                            ))}
                                        </text>
                                    );
                                }}
                            />
                            <PolarRadiusAxis 
                                domain={[0, maxValue]} 
                                tick={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Radar
                                name={title}
                                dataKey="score"
                                stroke={pastelColors[0]}
                                fill={pastelColors[0]}
                                fillOpacity={0.7}
                                dot={false}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}

                {tipoVista === "BARRAS" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={datosValidos} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                angle={-15} 
                                textAnchor="end" 
                                interval={0} 
                                fontSize={10}
                                tickFormatter={(val) => String(val || "").replace(/^usuarios con\s*/i, "")}
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="score" fill={pastelColors[0]} radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}

                {tipoVista === "DONA" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={datosCircular}
                                dataKey="score"
                                nameKey="name"
                                cx="50%"
                                cy="43%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={totalValores > 0 ? 3 : 0}
                                isAnimationActive={totalValores > 0}
                            >
                                {datosCircular.map((item, index) => (
                                    <Cell
                                        key={`${item.name}-${index}`}
                                        fill={
                                            item.esPlaceholder
                                                ? "#d7dce3"
                                                : coloresGraficas[index % coloresGraficas.length]
                                        }
                                    />
                                ))}
                            </Pie>
                            {totalValores > 0 && <Tooltip content={<CustomTooltip />} />}
                            {totalValores > 0 && (
                                <Legend
                                    verticalAlign="bottom"
                                    height={40}
                                    wrapperStyle={{ fontSize: "10px" }}
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
                                data={datosCircular}
                                dataKey="score"
                                nameKey="name"
                                cx="50%"
                                cy="43%"
                                outerRadius={90}
                                paddingAngle={totalValores > 0 ? 2 : 0}
                                isAnimationActive={totalValores > 0}
                            >
                                {datosCircular.map((item, index) => (
                                    <Cell
                                        key={`${item.name}-${index}`}
                                        fill={
                                            item.esPlaceholder
                                                ? "#d7dce3"
                                                : coloresGraficas[index % coloresGraficas.length]
                                        }
                                    />
                                ))}
                            </Pie>
                            {totalValores > 0 && <Tooltip content={<CustomTooltip />} />}
                            {totalValores > 0 && (
                                <Legend
                                    verticalAlign="bottom"
                                    height={40}
                                    wrapperStyle={{ fontSize: "10px" }}
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

export default InitialDashboard;
