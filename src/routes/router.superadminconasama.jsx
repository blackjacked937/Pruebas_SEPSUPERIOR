import { AdminLayout } from '../layouts/adminLayout/AdminLayout';
import { 
    HomeSuperAdminConasama,
    GestoresSuperAdminConasama,
    GraficasSuperAdminConasama,
    PacientesSuperAdminConasama,
    NoticiasSuperAdminConasama,
    ReportesSuperAdminConasama
} from '../pages/superAdminConasama';
import { RoleRoute } from '../components/adminconasama/proteccionRutas';

const routesAdminConasama = [
    {
        path: "/admin/super-gestor/conasama",
        layout: AdminLayout,
        component: HomeSuperAdminConasama,
        label: "Inicio",
        Guard: RoleRoute,
        access: { allowSuper: true },
    },
    {
        path: "/admin/super-gestor/conasama/graficas",
        layout: AdminLayout,
        component: GraficasSuperAdminConasama,
        label: "Graficas",
        Guard: RoleRoute,
        access: { allowSuper: true },
    },
    {
        path: "/admin/super-gestor/conasama/pacientes-riesgo",
        layout: AdminLayout,
        component: PacientesSuperAdminConasama,
        label: "Pacientes en Riesgo",
        Guard: RoleRoute,
        access: { allowSuper: true },
    },
    {
        path: "/admin/super-gestor/conasama/gestores",
        layout: AdminLayout,
        component: GestoresSuperAdminConasama,
        label: "Gestores",
        Guard: RoleRoute,
        access: { allowSuper: true, allowOrganizaciones: [1] },
    },
    // En sep no habra apartado de noticias
    {
        path: "/admin/super-gestor/conasama/noticias",
        layout: AdminLayout,
        component: NoticiasSuperAdminConasama,
        label: "Noticias",
        Guard: RoleRoute,
        access: { allowSuper: true },
    },
    // No habra apartado de reportes para SEP
    {
        path: "/admin/super-gestor/conasama/reportes",
        layout: AdminLayout,
        component: ReportesSuperAdminConasama,
        label: "Reportes",
        Guard: RoleRoute,
        access: { allowSuper: true, allowOrganizaciones: [0] },
    },
]

export default routesAdminConasama;
