import React, { useState } from 'react';
import { 
    BarChart, Bar, 
    AreaChart, Area, 
    PieChart, Pie, 
    RadialBarChart, RadialBar, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';

const primaryColor = "#7DB747";
const COLORS = [
    '#7DB747', '#1279b6', '#f58a07', '#4DB6AC', '#8b5cf6', '#f43f5e', 
    '#eab308', '#0ea5e9', '#10b981', '#d946ef', '#f97316', '#6366f1', 
    '#14b8a6', '#ec4899', '#84cc16', '#64748b'
];

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length > 0) {
        const item = payload[0];
        const dataItem = item.payload;
        
        const originalValue = dataItem.originalScore !== undefined ? dataItem.originalScore : item.value;
        const color = item.color || item.fill || dataItem.fill || primaryColor;
        const displayLabel = dataItem.fullName || dataItem.name || label; 
        
        return (
            <div style={{ background: "#ffffff", border: "1px solid #eef2f7", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", maxWidth: "300px" }}>
                <p style={{ margin: 0, fontWeight: 700, color: "#1e293b", fontSize: "0.9rem", marginBottom: "4px", whiteSpace: "normal" }}>
                    {displayLabel}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color }}></div>
                    <p style={{ margin: 0, color: "#64748b", fontWeight: 600, fontSize: "0.85rem" }}>
                        Total: <span style={{ color: color, fontSize: '1rem' }}>{originalValue}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
}

export function InitialDashboard({ data, title }) {
    const [chartType, setChartType] = useState('barras');

    const formattedData = data.map((d, index) => {
        const cleanName = d.name ? d.name.replace(/^usuarios con\s*/i, "") : "";
        // se acortan los nombres muy largos para que no se pierdan
        const shortName = cleanName.length > 25 ? cleanName.substring(0, 25) + '...' : cleanName;

        return {
            ...d,
            name: shortName,
            fullName: cleanName,
            originalScore: d.score,
            fill: COLORS[index % COLORS.length] 
        };
    });

    // funciones para cada tipo de graficas
    const renderBarras = () => (
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} axisLine={{ stroke: '#eef2f7', strokeWidth: 2 }} tickLine={false} interval={0} angle={-35} textAnchor="end" />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={35} animationDuration={800}>
                {formattedData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
            </Bar>
        </BarChart>
    );

    const renderArea = () => (
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 70 }}>
            <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={primaryColor} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} axisLine={{ stroke: '#eef2f7', strokeWidth: 2 }} tickLine={false} interval={0} angle={-35} textAnchor="end" />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="score" stroke={primaryColor} strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" animationDuration={800} />
        </AreaChart>
    );

    const renderHorizontal = () => (
        <BarChart layout="vertical" data={formattedData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eef2f7" />
            <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} axisLine={{ stroke: '#eef2f7', strokeWidth: 2 }} tickLine={false} width={160} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={20} animationDuration={800}>
                {formattedData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
            </Bar>
        </BarChart>
    );

    const renderDona = () => (
        <PieChart>
            <Pie data={formattedData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="score" animationDuration={800}>
                {formattedData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={45} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }} />
        </PieChart>
    );

  const renderPastel = () => (
        <PieChart>
            <Pie 
                data={formattedData} 
                cx="50%" 
                cy="50%" 
                // Al quitar el innerRadius (o dejarlo en 0), se vuelve un pastel completo
                outerRadius={95} 
                dataKey="score" 
                animationDuration={800}
                stroke="#ffffff" // Agrega una línea blanca delgada entre rebanadas para que luzca mejor
                strokeWidth={2}
            >
                {formattedData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={45} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }} />
        </PieChart>
    );

    const renderRadial = () => (
        <RadialBarChart cx="50%" cy="45%" innerRadius="25%" outerRadius="100%" barSize={14} data={formattedData}>
            <RadialBar minAngle={15} background={{ fill: '#f1f5f9' }} clockWise={true} dataKey="score" cornerRadius={10} animationDuration={800} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend iconSize={12} iconType="circle" layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '10px' }} />
        </RadialBarChart>
    );

     // condicional para la seleccion
    const renderActiveChart = () => {
        switch (chartType) {
            case 'barras': return renderBarras();
            case 'area': return renderArea();
            case 'horizontal': return renderHorizontal();
            case 'dona': return renderDona();
            case 'pastel': return renderPastel();
            case 'radial': return renderRadial();
            default: return renderBarras();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', minHeight: '360px', padding: '15px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#4a5568", flex: 1, lineHeight: '1.3' }}>
                    {title}
                </h4>
                
                <select 
                    value={chartType} 
                    onChange={(e) => setChartType(e.target.value)}
                    style={{ 
                        padding: '6px 12px', 
                        borderRadius: '50px', 
                        border: '1px solid #eef2f7', 
                        backgroundColor: '#f8fafc',
                        fontSize: '0.85rem', 
                        fontWeight: 600,
                        color: '#64748b', 
                        outline: 'none', 
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        minWidth: '110px'
                    }}
                >
                    <option value="barras">Barras</option>
                    <option value="area">Área</option>
                    <option value="horizontal">Horizontal</option>
                    <option value="dona">Dona</option>
                    <option value="pastel">Pastel</option>
                    <option value="radial">Radial</option>
                </select>
            </div>
            
            <div style={{ flex: 1, width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {renderActiveChart()}
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default InitialDashboard;