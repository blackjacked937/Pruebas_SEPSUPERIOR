import { AdminLayout } from '../layouts/adminLayout/AdminLayout';
import {
    EstadisticaConasama,
    ColumbiaPageCona,
    HomaAdminConasama
} from '../pages/adminConasama';
import { RoleRoute } from '../components/adminconasama/proteccionRutas';

const routesAdminConasama = [
    {
        path: "/admin/gestor/conasama",
        layout: AdminLayout,
        component: HomaAdminConasama,
        label: "Inicio",
        Guard: RoleRoute,
        access: { allowStaff: true },
    },
    {
        path: "/admin/gestor/conasama/estadisticas",
        layout: AdminLayout,
        component:EstadisticaConasama,
        label: "Estadísticas",
        Guard: RoleRoute,
        access: { allowStaff: true },
    },
    {
        path: "/admin/gestor/conasama/columbia",
        layout: AdminLayout,
        component: ColumbiaPageCona,
        label: "Grupo de Riesgo",
        Guard: RoleRoute,
        access: { allowStaff: true },
    }
]

export default routesAdminConasama;
