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
        path: "/super-gestor/conasama",
        layout: AdminLayout,
        component: HomeSuperAdminConasama,
    },
    {
        path: "/super-gestor/conasama/graficas",
        layout: AdminLayout,
        component: GraficasSuperAdminConasama,
    },
    {
        path: "/super-gestor/conasama/pacientes-riesgo",
        layout: AdminLayout,
        component: PacientesSuperAdminConasama,
    },
    {
        path: "/super-gestor/conasama/gestores",
        layout: AdminLayout,
        component: GestoresSuperAdminConasama,
    },
    {
        path: "/super-gestor/conasama/noticias",
        layout: AdminLayout,
        component: NoticiasSuperAdminConasama,
    }
]

export default routesAdminConasama;
