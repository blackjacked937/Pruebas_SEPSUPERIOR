import { Tabs, Tab } from "react-bootstrap";
import styles from "./Tabs.module.css";

export default function SedeTabs({ value, onChange, organizacion }) {

  const sedesPorOrganizacion = {
    0: [
      { id: 1, nombre: "U Digital del Estado de México" },
      { id: 2, nombre: "U Mexiquense del Bicentenario" },
      { id: 3, nombre: "U Intercultural del Estado de México" },
    ],
    1: [
      { id: 4, nombre: "TES Ecatepec" },
      { id: 5, nombre: "TES Coacalco" },
      { id: 6, nombre: "TES Chimalhuacán" },
      { id: 7, nombre: "TES Chalco" },
      { id: 8, nombre: "TES Cuatitlán Izcalli" },
      { id: 9, nombre: "TES Huixquilucan" },
      { id: 10, nombre: "TES Ixtapaluca" },
      { id: 11, nombre: "TES Jocotitlán" },
      { id: 12, nombre: "TES San Felipe del Progreso" },
      { id: 13, nombre: "TES Tianguistengo" },
      { id: 14, nombre: "TES Valle de Bravo" },
      { id: 15, nombre: "TES Villa Guerrero" },
    ],
    2: [
      { id: 16, nombre: "UP Valle de Toluca" },
      { id: 17, nombre: "UP Valle de México" },
      { id: 18, nombre: "UP Texcoco" },
      { id: 19, nombre: "UP Atlautla" },
      { id: 20, nombre: "UP Tecamac" },
      { id: 21, nombre: "UP Atlacomulco" },
      { id: 22, nombre: "UP Otzolotepec" },
      { id: 23, nombre: "UP Cuatitlan Izcalli" },
      { id: 24, nombre: "UP Chimalhuacan" },
    ],
    3: [
      { id: 25, nombre: "UT del Valle de Toluca" },
      { id: 26, nombre: "UT Fidel Velázquez" },
      { id: 27, nombre: "UT de Coacalco" },
      { id: 28, nombre: "UT de Nezahualcóyotl" },
      { id: 29, nombre: "UT de Tecámac" },
      { id: 30, nombre: "UT de Zinacantepec" }, 
      { id: 31, nombre: "UT del Sur del Estado de México" },    
    ],
  };

  const sedes = sedesPorOrganizacion[organizacion] || [];

  return (
    <Tabs
      activeKey={value}
      onSelect={(k) => onChange(Number(k))}
      className={`mb-3 ${styles.customTabs}`}
      fill
    >
      {sedes.map((sede) => (
        <Tab
          key={sede.id}
          eventKey={sede.id}
          title={sede.nombre}
        />
      ))}
    </Tabs>
  );
}