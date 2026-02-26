import { AdminLayout } from '../layouts';
import { 
    HomeSuperAdminConasama,
    GestoresSuperAdminConasama,
    GraficasSuperAdminConasama,
    PacientesSuperAdminConasama,
    NoticiasSuperAdminConasama
} from '../pages/superAdminConasama';
import { RoleRoute } from '../components/adminconasama/proteccionRutas';

const routesAdminConasama = [
    {
        path: "/admin/super-gestor/conasama",
        layout: AdminLayout,
        component: (props) => (
            <RoleRoute allowSuper>
                <HomeSuperAdminConasama {...props} />
            </RoleRoute>
        ),
    },
    {
        path: "/admin/super-gestor/conasama/graficas",
        layout: AdminLayout,
        component: (props) => (
            <RoleRoute allowSuper>
                <GraficasSuperAdminConasama {...props} />
            </RoleRoute>
        ),
    },
    {
        path: "/admin/super-gestor/conasama/pacientes-riesgo/:id/",
        layout: AdminLayout,
        component: (props) => (
            <RoleRoute allowSuper>
                <PacientesSuperAdminConasama {...props} />
            </RoleRoute>
        ),
    },
    {
        path: "/admin/super-gestor/conasama/gestores",
        layout: AdminLayout,
        component: (props) => (
            <RoleRoute allowSuper>
                <GestoresSuperAdminConasama {...props} />
            </RoleRoute>
        ),
    },
    {
        path: "/admin/super-gestor/conasama/noticias",
        layout: AdminLayout,
        component: (props) => (
            <RoleRoute allowSuper>
                <NoticiasSuperAdminConasama {...props} />
            </RoleRoute>
        ),
    }
]

export default routesAdminConasama;
