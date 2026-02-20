import { AdminLayout } from '../layouts';
import { 
    EstadisticaConasama,
    ColumbiaPageCona,
    HomaAdminConasama
} from '../pages/adminConasama';

const routesAdminConasama = [
    {
        path: "/admin/gestor/conasama",
        layout: AdminLayout,
        component: HomaAdminConasama,
    },
    {
        path: "/admin/gestor/conasama/estadisticas",
        layout: AdminLayout,
        component: EstadisticaConasama,
    },
    {
        path: "/admin/gestor/conasama/columbia",
        layout: AdminLayout,
        component: ColumbiaPageCona,
    }
]

export default routesAdminConasama;
