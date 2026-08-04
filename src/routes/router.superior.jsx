import { AdminLayout } from '../layouts/adminLayout/AdminLayout';
import {
  HomeSuperior,
  PacientesRiesgoSuperior,
  GestoresSuperior,
  GrupoSuperior,
  NoticiasSuperior,
  PerfilSuperior,
} from '../pages/SuperiorSEP';
import { RoleRouteSEPSuperior } from '../components/adminsepsuperior';
import { GraficasSesyn } from "../pages/SuperiorSEP/GraficasSesyn";

const routerSuperior = [
  {
    path: '/admin/superior-gestor/sep-superior',
    layout: AdminLayout,
    component: HomeSuperior,
    label: "Inicio",
    Guard: RoleRouteSEPSuperior,
    access: { allowSuper: true },
  },
  {
    path: '/admin/superior-gestor/sep-superior/graficas',
    layout: AdminLayout,
    component: (props) => (
      <RoleRouteSEPSuperior allowSuper>
        <GraficasSesyn {...props} />
      </RoleRouteSEPSuperior>
    ),
  },
  {
    path: '/admin/superior-gestor/sep-superior/pacientes-riesgo',
    layout: AdminLayout,
    component: PacientesRiesgoSuperior,
    label: "Pacientes en Riesgo",
    Guard: RoleRouteSEPSuperior,
    access: { allowSuper: true },
  },
  {
    path: '/admin/superior-gestor/sep-superior/gestores',
    layout: AdminLayout,
    component: GestoresSuperior,
    label: "Gestores",
    Guard: RoleRouteSEPSuperior,
    access: { allowSuper: true },
  },
  {
    path: '/admin/superior-gestor/sep-superior/grupo',
    layout: AdminLayout,
    component: GrupoSuperior,
    label: "Grupo de Riesgo",
    Guard: RoleRouteSEPSuperior,
    access: { allowSuper: true },
  },
  {
    path: '/admin/superior-gestor/sep-superior/noticias',
    layout: AdminLayout,
    component: NoticiasSuperior,
    label: "Noticias",
    Guard: RoleRouteSEPSuperior,
    access: { allowSuper: true },
  },
  {
    path: '/admin/superior-gestor/sep-superior/perfil',
    layout: AdminLayout,
    component: PerfilSuperior,
    label: "Mi Perfil",
    Guard: RoleRouteSEPSuperior,
    access: { allowSuper: true },
  },
];

export default routerSuperior;