import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Filter } from '../../../ui';

export function InitialDashboard(props) {
    const customStyles = {
        cells: {
            style: {
                whiteSpace: 'normal', // Permite que el texto haga salto de línea
                overflow: 'visible', // Elimina truncamiento
                textOverflow: 'clip', // Evita que se muestren los "..."
            },
        },
    };
    const columns = [
        {
            name: "Nombre",
            selector: (row) => row.nombre,
            sortable: true,
        },
        {
            name: "Edad",
            selector: (row) => row.edad || "NO PROPORCIONADA",
            sortable: true,
        },
        {
            name: "Género",
            selector: (row) => row.genero || "NO PROPORCIONADO",
            sortable: true,
        },
        {
            name: "Municipio",
            selector: (row) => row.municipio.toUpperCase(),
            sortable: true,
        },
        {
            name: "Escolaridad",
            selector: (row) => row.escolaridad.toUpperCase() || "NO PROPORCIONADA",
            sortable: true,
        },
        {
            name: "Ocupación",
            selector: (row) => row.ocupacion.toUpperCase() || "NO PROPORCIONADO",
            sortable: true,
        },
        {
            name: "Dirección",
            selector: (row) => row.direccion.toUpperCase() || "NO PROPORCIONADO",
            sortable: true,
        },
    ];

    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = props.data
        ? props.data.filter(
            (item) =>
                JSON.stringify(item)
                    .toLowerCase()
                    .indexOf(filterText.toLowerCase()) !== -1
        )
        : "";

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <Filter
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortField="nombre"
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
            customStyles={customStyles}
        />
    );
}

const generarAnalisisGAF = (data) => {
    if (!data) return "Sin información disponible"

    const json_respuestas = JSON.parse(data);

    if (json_respuestas[0].calificacion + json_respuestas[1].calificacion === 200) return "Funcionamiento es excelente"
    if (json_respuestas[8].calificacion + json_respuestas[7].calificacion >= 140 && json_respuestas[8].calificacion + json_respuestas[7].calificacion < 200) return "Funcionamiento es bueno"
    if (json_respuestas[4].calificacion + json_respuestas[5].calificacion + json_respuestas[6].calificacion >= 90 && json_respuestas[4].calificacion + json_respuestas[5].calificacion + json_respuestas[6].calificacion < 139) return "Funcionamiento es regular"
    if (json_respuestas[3].calificacion + json_respuestas[2].calificacion + json_respuestas[1].calificacion < 90 && json_respuestas[3].calificacion + json_respuestas[2].calificacion + json_respuestas[1].calificacion >= 1) return "Funcionamiento es malo"
    else return "Analisis por determinar"
}

const generarCalificacionGAF = (data) => {
    if (!data) return "0"
    let calificacion = 0;
    const json_respuestas = JSON.parse(data);
    json_respuestas.forEach(element => {
        calificacion += element.calificacion
    });
    return calificacion;
} 
