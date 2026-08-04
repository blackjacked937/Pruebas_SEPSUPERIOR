import { AdminLayout } from '../layouts/adminLayout/AdminLayout';
import { 
    EstadisticaFase1,
    ColumbiaPage,
    HomaAdminFase1
} from '../pages/adminFase1';
const routesAdminFase1 = [
    {
        path: "/admin/f1/",
        layout: AdminLayout,
        component: HomaAdminFase1,
    },
    {
        path: "/admin/f1/estadisticas",
        layout: AdminLayout,
        component: EstadisticaFase1,
    },
    {
        path: "/admin/f1/columbia",
        layout: AdminLayout,
        component: ColumbiaPage,
    }
]

export default routesAdminFase1;
