import routesAdmin from './routes.admin';
import routesLanding from "./routes.landing";
import routesAdminFase1 from './router.adminf1';
import routesAdminConasama from './router.adminconasama';
import routesSuperAdminConasama from './router.superadminconasama';
import routesAdminSeP from './router.adminsep';
import routesSuperAdminSeP from './router.superadminsep';

const routes = [
    ...routesLanding,
    ...routesAdmin,
    ...routesAdminFase1,
    ...routesAdminConasama,
    ...routesSuperAdminConasama,
    ...routesAdminSeP,
    ...routesSuperAdminSeP
]

export default routes;