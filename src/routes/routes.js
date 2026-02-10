import routesAdmin from './routes.admin';
import routesLanding from "./routes.landing";
import routesAdminFase1 from './router.adminf1';
import routesAdminConasama from './router.adminconasama';

const routes = [
    ...routesLanding,
    ...routesAdmin,
    ...routesAdminFase1,
    ...routesAdminConasama
]

export default routes;