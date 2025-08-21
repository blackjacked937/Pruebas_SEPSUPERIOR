import { AdminLayout } from '../layouts';
import { EstadisticaFase1 } from '../pages/adminFase1';
const routesAdminFase1 = [
    {
        path: "/admin/f1/estadisticas",
        layout: AdminLayout,
        component: EstadisticaFase1,
    },
]

export default routesAdminFase1;
