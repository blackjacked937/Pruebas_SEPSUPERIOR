import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye, FaTrash } from 'react-icons/fa';

function StatusToggle({ row, onToggleStatus }) {
    const [isActive, setIsActive] = useState(row.is_active);

    const handleToggle = () => {
        const newStatus = !isActive;
        import('sweetalert2').then((Swal) => {
            Swal.default.fire({
                title: '¿Cambiar estatus?',
                text: `¿Deseas cambiar el estatus del gestor a ${newStatus ? 'ACTIVO' : 'INACTIVO'}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#2A9D8F',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, cambiar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsActive(newStatus);
                    row.is_active = newStatus;
                    if (onToggleStatus) {
                        onToggleStatus(row, newStatus);
                    }
                    Swal.default.fire(
                        '¡Actualizado!',
                        `El estatus se ha cambiado a ${newStatus ? 'ACTIVO' : 'INACTIVO'}.`,
                        'success'
                    );
                }
            });
        });
    };

    return (
        <div 
            onClick={handleToggle}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none'
            }}
        >
            {/* Toggle Switch */}
            <div style={{
                width: '38px',
                height: '20px',
                backgroundColor: isActive ? '#2A9D8F' : '#ccc',
                borderRadius: '10px',
                padding: '2px',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isActive ? 'flex-end' : 'flex-start'
            }}>
                <div style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s'
                }} />
            </div>
            
            {/* Status Text */}
            <span style={{
                color: isActive ? '#2A9D8F' : '#E63946',
                fontWeight: '700',
                fontSize: '12px',
                textTransform: 'uppercase'
            }}>
                {isActive ? 'ACTIVO' : 'INACTIVO'}
            </span>
        </div>
    );
}

export function TableGestores(props) {
    const { gestores, hospitales, onViewGestor, onDeleteGestor, onToggleStatus } = props;

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id || '',
            sortable: true,
            width: '80px'
        },
        {
            name: "Nombre",
            center: true,
            selector: (row) => `${row.nombre} ${row.apellido_paterno} ${row.apellido_materno}`.trim(),
            wrap: true,
            width: '200px'
        },
        {
            name: "Correo",
            center: true,
            selector: (row) => row.email || '',
            wrap: true,
            width: '250px',
            cell: (row) => (
                <span style={{ color: '#0056b3', textDecoration: 'underline', cursor: 'pointer' }}>
                    {row.email}
                </span>
            )
        },
        {
            name: "Celular",
            center: true,
            selector: (row) => row.celular_paciente || '—',
            width: '130px'
        },
        {
            name: "Matrícula",
            center: true,
            selector: (row) => row.matricula_laboral || '—',
            width: '140px'
        },
        {
            name: "Sede",
            center: true,
            selector: (row) => hospitales?.find(h => h.id === row.sede_id)?.nombre || row.sede_id || '',
            wrap: true,
            width: '120px'
        },
        {
            name: "Estatus",
            center: true,
            selector: (row) => row.is_active ? 'Activo' : 'Inactivo',
            wrap: true,
            width: '140px',
            cell: (row) => <StatusToggle row={row} onToggleStatus={onToggleStatus} />
        },
        {
            name: "Acciones",
            width: '120px',
            cell: (row) => (
                <div className="d-flex align-items-center gap-2">
                    <button
                        onClick={() => onViewGestor(row)}
                        style={{
                            backgroundColor: '#0056b3',
                            border: 'none',
                            color: 'white',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        title="Ver detalles"
                    >
                        <FaEye size={14} />
                    </button>
                    <button
                        onClick={() => onDeleteGestor && onDeleteGestor(row)}
                        style={{
                            backgroundColor: '#dc3545',
                            border: 'none',
                            color: 'white',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        title="Eliminar"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            )
        }
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#E8F0FE',
                borderBottomColor: '#cdd8e6',
                borderBottomWidth: '1px',
                borderRadius: '0',
            },
        },
        headCells: {
            style: {
                fontWeight: '800',
                color: '#1A1A1A',
                fontSize: '13px',
                textTransform: 'uppercase',
                borderRight: '1px solid #cdd8e6',
                '&:last-child': {
                    borderRight: 'none',
                },
            },
        },
        cells: {
            style: {
                borderRight: '1px solid #e9ecef',
                '&:last-child': {
                    borderRight: 'none',
                },
            },
        },
        rows: {
            style: {
                backgroundColor: '#F7F8FA',
                borderBottomColor: '#e9ecef',
                borderBottomWidth: '1px',
                fontWeight: '600',
                color: '#333',
                minHeight: '52px',
            },
            stripedStyle: {
                backgroundColor: '#ffffff',
            },
        },
    };

    return (
        <div className="tabla-blanca-container" style={{ borderLeft: '12px solid #5cb85c' }}>
            <DataTable
                columns={columns}
                data={gestores || []}
                striped
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página:',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos'
                }}
                customStyles={customStyles}
                noDataComponent={<span>No hay gestores registrados para la escuela seleccionada.</span>}
            />
        </div>
    );
}
