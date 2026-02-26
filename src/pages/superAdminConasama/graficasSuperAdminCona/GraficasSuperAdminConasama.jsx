import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import SedeTabs from "../../../components/adminconasama/dashboard/SedeTabs";
import TipoGraficasTabs from "../../../components/adminconasama/dashboard/TipoGraficasTabs";
import GraficasGrid from "../../../components/adminconasama/dashboard/GraficasGrid";
import { useGraficasConasama } from "../../../hooks";

export function GraficasSuperAdminConasama() {
  const [sede, setSede] = useState(1);
  const [tipo, setTipo] = useState("cuestionarios");
  const [graficas, setGraficas] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const {
    getConteoPorNivelRiesgoCategoriaBySede,
    getGraficasPreguntasBySede,
    getRangoDePreguntasBySede
  } = useGraficasConasama();

  useEffect(() => {
    cargarDatos();
  }, [sede, tipo]);

  async function cargarDatos() {
    setLoadingData(true);

    try {
      let data = [];

      if (tipo === "cuestionarios") {
        data = await getConteoPorNivelRiesgoCategoriaBySede(sede);
      }

      if (tipo === "preguntas") {
        data = await getGraficasPreguntasBySede(sede);
      }

      if (tipo === "rangos") {
        data = await getRangoDePreguntasBySede(sede);
      }

      setGraficas(data || []);
    } catch (error) {
      console.error("Error al cargar las gráficas:", error);
    } finally {
      setLoadingData(false);
    }
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Estadísticas CONASAMA</h1>

      <SedeTabs value={sede} onChange={setSede} />
      <TipoGraficasTabs value={tipo} onChange={setTipo} />
      <div style={{ height: 20 }} />

      {loadingData ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner />
        </div>
      ) : (
        <GraficasGrid graficas={graficas} />
      )}
    </Container>
  );
}