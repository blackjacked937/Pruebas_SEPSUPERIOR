import { AdminLayout } from '../layouts/adminLayout/AdminLayout';
import {
    Estadisticas,
    HomaAdmin
} from '../pages/admin';

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: HomaAdmin,
    },
    {
        path: "/admin/estadisticas",
        layout: AdminLayout,
        component: Estadisticas,
    },
]

export default routesAdmin;
