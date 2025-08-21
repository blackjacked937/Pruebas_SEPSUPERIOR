import routesAdmin from './routes.admin';
import routesLanding from "./routes.landing";
import routesAdminFase1 from './router.adminf1';

const routes = [
    ...routesLanding,
    ...routesAdmin,
    ...routesAdminFase1
]

export default routes;