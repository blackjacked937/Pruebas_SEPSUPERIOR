import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import TipoGraficasTabs from "../../../components/adminsep/dashboard/TipoGraficasTabs";
import GraficasGrid from "../../../components/adminsep/dashboard/GraficasGrid";
import { useGraficasSeP } from "../../../hooks/sep";
import { SepHeader } from "../../../components/sep/sepHeader";
export function EstadisticasSeP() {
  const [tipo, setTipo] = useState("cuestionarios");
  const [graficas, setGraficas] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const {
    getConteoPorNivelRiesgoCategoriaSeP,
    getGraficasPreguntasSeP,
    getRangoDePreguntasSeP
  } = useGraficasSeP();

  useEffect(() => {
    cargarDatos();
  }, [tipo]);

  async function cargarDatos() {
    setLoadingData(true);
    try {
      let data = [];
      if (tipo === "cuestionarios") {
        data = await getConteoPorNivelRiesgoCategoriaSeP();
      }
      if (tipo === "preguntas") {
        data = await getGraficasPreguntasSeP();
      }
      if (tipo === "rangos") {
        data = await getRangoDePreguntasSeP();
      }
      setGraficas(data || []);
    } catch (error) {
      console.error("Error cargando gráficas SEP:", error);
    } finally {
      setLoadingData(false);
    }
  }

  return (
    <div style={{ backgroundColor: '#F4F6F9', minHeight: '100vh', paddingBottom: '40px' }}>
      <SepHeader 
        title="Estadísticas de Riesgo" 
        subtitle="Análisis detallado de cuestionarios, métricas por pregunta y rangos de evaluación."
      />

      <Container className="mt-2" style={{ padding: '0 20px' }}>

        <TipoGraficasTabs value={tipo} onChange={setTipo} />
        
        <div style={{ height: 20 }} />

        {loadingData ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" style={{ color: '#7DB747' }} />
          </div>
        ) : (
          <GraficasGrid graficas={graficas} />
        )}
      </Container>
    </div>
  );
}

export default EstadisticasSeP;