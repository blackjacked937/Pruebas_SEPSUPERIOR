import { Tabs, Tab } from "react-bootstrap";
import styles from "./Tabs.module.css";

export default function SedeTabs({ value, onChange, organizacion }) {

  const sedesPorOrganizacion = {
    0: [
      { id: 8, nombre: "Ciudad de México" },
      { id: 9, nombre: "Morelos" },
      { id: 10, nombre: "Tlaxcala" },
      { id: 11, nombre: "Hidalgo" },
      { id: 12, nombre: "UPEM Ecatepec" },
      { id: 13, nombre: "UPEM Tecamac" },
      { id: 14, nombre: "Dra. Alma" },
    ],
    1: [
      { id: 8, nombre: "Ciudad de México" },
      { id: 9, nombre: "Morelos" },
      { id: 10, nombre: "Tlaxcala" },
      { id: 11, nombre: "Hidalgo" },
    ],
    2: [
      { id: 12, nombre: "UPEM Ecatepec" },
      { id: 13, nombre: "UPEM Tecamac" },
      { id: 14, nombre: "Dra. Alma" },
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