import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import SedeTabs from "../../../components/adminsep/dashboard/SedeTabs";
import TipoGraficasTabs from "../../../components/adminsep/dashboard/TipoGraficasTabs";
import GraficasGrid from "../../../components/adminsep/dashboard/GraficasGrid";
import { useAuth } from "../../../hooks";
import { useGraficasSeP } from "../../../hooks/sep";

const sedesPorOrganizacion = {
  0: {
    29: "Centro de Estudios Tecnológicos Ecatepec",
    30: "Preparatoria Oficial No. 128",
    31: "Secundaria Técnica 55",
    32: "Universidad Tecnológica de Nezahualcóyotl",
    33: "CBT No. 2 Nezahualcóyotl",
    34: "UAEM - Unidad Académica Toluca",
    35: "Instituto Tecnológico de Toluca",
    36: "Escuela Secundaria Oficial No. 1",
    37: "UAM Iztapalapa - Plantel Central",
    38: "CETIS No. 53 Iztapalapa",
    39: "Secundaria Diurna No. 115",
    40: "IPN - Escuela Superior de Ingeniería (ESIME)",
    41: "Preparatoria Nacional Plantel 9 UNAM",
    42: "Facultad de Filosofía y Letras UNAM",
    43: "CBTIS No. 2 Coyoacán",
    44: "Secundaria Técnica No. 17",
  },
  1: {
    29: "Centro de Estudios Tecnológicos Ecatepec",
    30: "Preparatoria Oficial No. 128",
    31: "Secundaria Técnica 55",
    32: "Universidad Tecnológica de Nezahualcóyotl",
    33: "CBT No. 2 Nezahualcóyotl",
    34: "UAEM - Unidad Académica Toluca",
    35: "Instituto Tecnológico de Toluca",
    36: "Escuela Secundaria Oficial No. 1",
    37: "UAM Iztapalapa - Plantel Central",
    38: "CETIS No. 53 Iztapalapa",
    39: "Secundaria Diurna No. 115",
    40: "IPN - Escuela Superior de Ingeniería (ESIME)",
    41: "Preparatoria Nacional Plantel 9 UNAM",
    42: "Facultad de Filosofía y Letras UNAM",
    43: "CBTIS No. 2 Coyoacán",
    44: "Secundaria Técnica No. 17",
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
