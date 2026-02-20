import { AdminLayout } from '../layouts';
import { 
    HomeSuperAdminConasama,
    GestoresSuperAdminConasama,
    GraficasSuperAdminConasama,
    PacientesSuperAdminConasama,
    NoticiasSuperAdminConasama
} from '../pages/superAdminConasama';

const routesAdminConasama = [
    {
        path: "/admin/super-gestor/conasama",
        layout: AdminLayout,
        component: HomeSuperAdminConasama,
    },
    {
        path: "/admin/super-gestor/conasama/graficas",
        layout: AdminLayout,
        component: GraficasSuperAdminConasama,
    },
    {
        path: "/admin/super-gestor/conasama/pacientes-riesgo",
        layout: AdminLayout,
        component: PacientesSuperAdminConasama,
    },
    {
        path: "/admin/super-gestor/conasama/gestores",
        layout: AdminLayout,
        component: GestoresSuperAdminConasama,
    },
    {
        path: "/admin/super-gestor/conasama/noticias",
        layout: AdminLayout,
        component: NoticiasSuperAdminConasama,
    }
]

export default routesAdminConasama;
