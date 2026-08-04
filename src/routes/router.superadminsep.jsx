import { SepLayout } from '../layouts/sepLayout/SepLayout';
import {
  HomeSuperAdminSeP,
  GraficasSuperAdminSeP,
  PacientesSuperAdminSeP,
  GestoresSuperAdminSeP,
  NoticiasSuperAdminSeP,
  ReportesSuperAdminSeP,
  Perfil,
  GestionarAccesosPage
} from '../pages/superAdminSEP';
import { RoleRouteSEP } from '../components/adminsep';

/**
 * Rutas para SuperGestores de SEP (typeLogin=4, is_superuser=true)
 * 
 * Patrón de rutas: /admin/super-gestor/sep/*
 * Protección: RoleRoute con allowSuper=true
 * Algunas rutas tienen restricción adicional por organización
 */

const routesSuperAdminSeP = [
  {
    path: '/admin/super-gestor/sep',
    layout: SepLayout,
    component: HomeSuperAdminSeP,
    label: "Inicio",
    Guard: RoleRouteSEP,
    access: { allowSuper: true },
  },
  {
    path: '/admin/super-gestor/sep/graficas',
    layout: SepLayout,
    component: GraficasSuperAdminSeP,
    label: "Gráficas",
    Guard: RoleRouteSEP,
    access: { allowSuper: true },
  },
  {
    path: '/admin/super-gestor/sep/pacientes-riesgo',
    layout: SepLayout,
    component: PacientesSuperAdminSeP,
    label: "Pacientes en Riesgo",
    Guard: RoleRouteSEP,
    access: { allowSuper: true },
  },
  {
    path: '/admin/super-gestor/sep/gestores',
    layout: SepLayout,
    component: GestoresSuperAdminSeP,
    label: "Gestores",
    Guard: RoleRouteSEP,
    access: { allowSuper: true },
  },
  {
    path: '/admin/super-gestor/sep/noticias',
    layout: SepLayout,
    component: NoticiasSuperAdminSeP,
    label: "Noticias",
    Guard: RoleRouteSEP,
    access: { allowSuper: true },
  },
  {
    path: '/admin/super-gestor/sep/reportes',
    layout: SepLayout,
    component: ReportesSuperAdminSeP,
    label: "Reportes",
    Guard: RoleRouteSEP,
    access: { allowSuper: true, allowOrganizaciones: [0] },
  },
  {
    path: '/admin/super-gestor/sep/gestionar-accesos',
    layout: SepLayout,
    component: GestionarAccesosPage,
    label: "Gestionar Accesos",
    Guard: RoleRouteSEP,
    access: { allowSuper: true,  allowOrganizaciones: [0] },
  },
  {
    path: '/admin/super-gestor/sep/perfil',
    layout: SepLayout,
    component: Perfil,
    Guard: RoleRouteSEP,
    access: { allowSuper: true },
  },
];

export default routesSuperAdminSeP;
