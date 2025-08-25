import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function InitialDashboard({ data, title }) {
    return (
        <div style={{ width: '100%', height: 400, marginBottom: "2rem" }}>
            <h3 style={{ textAlign: "center" }}>{title}</h3>
            <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Tooltip />
                    <Radar 
                        name="Score" 
                        dataKey="score" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.6} 
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
