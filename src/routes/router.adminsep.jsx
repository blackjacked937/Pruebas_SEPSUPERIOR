import { SepLayout } from '../layouts/sepLayout/SepLayout';
import {
  HomeAdminSeP,
  EstadisticasSeP,
  ColumbiaPageSeP
} from '../pages/adminSEP';
import { RoleRouteSEP } from '../components/adminsep';

/**
 * Rutas para Gestores de SEP (typeLogin=4, is_staff=true)
 * 
 * Patrón de rutas: /admin/gestor/sep/*
 * Protección: RoleRoute con allowStaff=true
 */

const routesAdminSeP = [
  {
    path: '/admin/gestor/sep',
    layout: SepLayout,
    component: HomeAdminSeP,
    label: "Inicio",
    Guard: RoleRouteSEP,
    access: { allowStaff: true },
  },
  {
    path: '/admin/gestor/sep/estadisticas',
    layout: SepLayout,
    component: EstadisticasSeP,
    label: "Estadísticas",
    Guard: RoleRouteSEP,
    access: { allowStaff: true },
  },
  {
    path: '/admin/gestor/sep/columbia',
    layout: SepLayout,
    component: ColumbiaPageSeP,
    label: "Grupo de Riesgo",
    Guard: RoleRouteSEP,
    access: { allowStaff: true },
  },
];

export default routesAdminSeP;
