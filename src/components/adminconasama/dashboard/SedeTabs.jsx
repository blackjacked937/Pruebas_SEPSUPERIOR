import { Tabs, Tab } from "react-bootstrap";
import styles from "./Tabs.module.css";

export default function SedeTabs({ value, onChange }) {
  return (
    <Tabs
      activeKey={value}
      onSelect={(k) => onChange(Number(k))}
      className={`mb-3 ${styles.customTabs}`}
      fill
    >
      <Tab eventKey={1} title="Ciudad de México" />
      <Tab eventKey={2} title="Morelos" />
      <Tab eventKey={3} title="Tlaxcala" />
      <Tab eventKey={4} title="Hidalgo" />
    </Tabs>
  );
}