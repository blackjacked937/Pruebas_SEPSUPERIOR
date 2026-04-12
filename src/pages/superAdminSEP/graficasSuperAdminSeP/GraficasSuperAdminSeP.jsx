import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import SedeTabs from "../../../components/adminsep/dashboard/SedeTabs";
import TipoGraficasTabs from "../../../components/adminsep/dashboard/TipoGraficasTabs";
import GraficasGrid from "../../../components/adminsep/dashboard/GraficasGrid";
import { useAuth } from "../../../hooks";
import { useGraficasSeP } from "../../../hooks/sep";

const sedesPorOrganizacion = {
  0: {
    8: "Ciudad de México",
    9: "Morelos",
    10: "Tlaxcala",
    11: "Hidalgo",
    12: "UPEM Ecatepec",
    13: "UPEM Tecamac",
    14: "Dra. Alma",
  },
  1: {
    8: "Ciudad de México",
    9: "Morelos",
    10: "Tlaxcala",
    11: "Hidalgo",
  },
  2: {
    12: "UPEM Ecatepec",
    13: "UPEM Tecamac",
    14: "Dra. Alma",
  },
};

export function GraficasSuperAdminSeP() {
  const [sede, setSede] = useState(null);
  const [tipo, setTipo] = useState("cuestionarios");
  const [graficas, setGraficas] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const { auth } = useAuth();

  const {
    getConteoPorNivelRiesgoCategoriaBySedeSeP,
    getGraficasPreguntasBySedeSeP,
    getRangoDePreguntasBySedeSeP
  } = useGraficasSeP();

  // Inicio Segun la Organizacion del SuperGestor
  useEffect(() => {
    const organizacion = auth?.me?.organizacion;
    if (!organizacion) return;

    const sedesDisponibles = sedesPorOrganizacion[organizacion];
    const idsSedes = Object.keys(sedesDisponibles || {});
    if (idsSedes?.length) {
      setSede(Number(idsSedes[0]));
    }
  }, [auth]);

  // Refresh de Graficas Mostradas
  useEffect(() => {
    if (sede === null) return;

    const cargarDatos = async () => {
      setLoadingData(true);

      try {
        let data = [];

        if (tipo === "cuestionarios") {
          data = await getConteoPorNivelRiesgoCategoriaBySedeSeP(sede);
        }

        if (tipo === "preguntas") {
          data = await getGraficasPreguntasBySedeSeP(sede);
        }

        if (tipo === "rangos") {
          data = await getRangoDePreguntasBySedeSeP(sede);
        }

        setGraficas(data || []);
      } catch (error) {
        console.error("Error al cargar las gráficas SEP:", error);
      } finally {
        setLoadingData(false);
      }
    };

    cargarDatos();
  }, [sede, tipo]);

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Estadísticas SEP</h1>

      <SedeTabs
        value={sede}
        onChange={setSede}
        organizacion={auth?.me?.organizacion}
      />

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
