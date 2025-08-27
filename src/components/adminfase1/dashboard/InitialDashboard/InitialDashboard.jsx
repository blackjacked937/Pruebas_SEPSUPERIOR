import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// 🎨 Paleta: alternar entre dos azules (uno a uno)
const pastelColors = [
    "#64B5F6", // azul claro
    // "#1565C0", // azul más oscuro
];

// Tooltip personalizado
function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length > 0) {
        // Buscar el valor mayor a 0 (el único visible)
        const punto = payload.find(p => p.value > 0);
        if (!punto) return null;
        return (
            <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
                <strong>{label}</strong>: {punto.value}
            </div>
        );
    }
    return null;
}

export function InitialDashboard({ data, title }) {
    // Preparar un dataset por cada pico: solo el pico i mantiene su valor, los demás quedan en 0
    const radarsData = data.map((_, i) => (
        data.map((d, j) => ({ ...d, score: j === i ? d.score : 0 }))
    ));

    return (
        <div style={{ width: '100%', height: 400, marginBottom: "2rem" }}>
            <h3 style={{ textAlign: "center" }}>{title}</h3>
            <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Tooltip content={<CustomTooltip />} />

                    {/* Renderizar un Radar por cada pico usando su dataset específico */}
                    {data.map((entry, index) => (
                        <Radar
                            key={index}
                            name={entry.name}
                            data={radarsData[index]}
                            dataKey="score"
                            stroke={pastelColors[index % pastelColors.length]}
                            fill={pastelColors[index % pastelColors.length]}
                            fillOpacity={0.7}
                            dot={false}
                        />
                    ))}
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
