import React, { useEffect, useState } from "react"; 
import { Container, Spinner } from "react-bootstrap";
import { usePacientesSensiblesSeP } from "../../../hooks/sep"; 
import { TablePacientesSensibles } from "../../../components/adminsep/columbia/tablePacientesSensibles"; 
import { SepHeader } from "../../../components/sep/sepHeader"; 

export function ColumbiaPageSeP() {   
  const { pacientes, loadingPacientes, getPacientesSensibles } = usePacientesSensiblesSeP();   
  const [refetch, setRefetch] = useState(false);   
  
  const onRefetch = () => setRefetch((prev) => !prev);   

  useEffect(() => {     
    getPacientesSensibles();        
  }, [refetch]);   

  return (     
    <div style={{ backgroundColor: '#F4F6F9', minHeight: '100vh', paddingBottom: '40px' }}>
      
      <SepHeader 
        title="Pacientes por Grupo de Riesgo" 
        subtitle="Monitoreo y seguimiento de alumnos en situaciones sensibles o de atención prioritaria."
      />

      <Container className="mt-2" style={{ padding: '0 20px' }}>
        {loadingPacientes ? (         
          <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <Spinner animation="border" style={{ color: '#7DB747', width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted fw-bold">Cargando pacientes sensibles...</p>
          </div>
        ) : (         
          <TablePacientesSensibles           
            data={pacientes}           
            onRefetch={onRefetch}         
          />       
        )} 
      </Container>
    </div>   
  ); 
}

export default ColumbiaPageSeP;