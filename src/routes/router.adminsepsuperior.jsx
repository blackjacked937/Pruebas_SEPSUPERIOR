import { AdminLayout } from '../layouts/adminLayout/AdminLayout';
import { HomeSepSuperior, GraficasSepSuperior, GrupoSepSuperior } from '../pages/adminSepSuperior'; 
import { RoleRouteSEPSuperior } from '../components/adminsepsuperior';

const routesAdminSepSuperior = [
  {
    path: '/admin/gestor/sep-superior',
    layout: AdminLayout,
    component: HomeSepSuperior,
    label: "Inicio",
    Guard: RoleRouteSEPSuperior,
    access: { allowStaff: true },
  },
  {
    path: '/admin/gestor/sep-superior/estadisticas',
    layout: AdminLayout,
    component: GraficasSepSuperior,
    label: "Estadísticas",
    Guard: RoleRouteSEPSuperior,
    access: { allowStaff: true },
  },
  {
    path: '/admin/gestor/sep-superior/grupo',
    layout: AdminLayout,
    component: GrupoSepSuperior,
    label: "Grupo de Riesgo",
    Guard: RoleRouteSEPSuperior,
    access: { allowStaff: true },
  },
];

export default routesAdminSepSuperior;