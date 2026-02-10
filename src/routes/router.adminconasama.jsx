import { AdminLayout } from '../layouts';
import { 
    EstadisticaConasama,
    ColumbiaPageCona,
    HomaAdminConasama
   
   
} from '../pages/adminConasama';

const routesAdminConasama = [
    {
        path: "/admin/conasama",
        layout: AdminLayout,
        component: HomaAdminConasama,
    },
    {
        path: "/admin/conasama/estadisticas",
        layout: AdminLayout,
        component: EstadisticaConasama,
    },
    {
        path: "/admin/conasama/columbia",
        layout: AdminLayout,
        component: ColumbiaPageCona,
    }
]

export default routesAdminConasama;
