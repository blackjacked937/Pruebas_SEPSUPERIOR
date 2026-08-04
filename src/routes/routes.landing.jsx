import { LandingLayout } from '../layouts';
import {
    Home,
    TerminosYCondicionesPage,
    TerminosDeServicioPage,
} from '../pages/landing';
import { HomeLanding } from '../pages/landingPage/home';
import { CharacteristicsPage } from '../pages/landingPage/characteristics/CharacteristicsPage';
import { SecurityPage } from '../pages/landingPage/security/SecurityPage';
import { ServicesPage } from '../pages/landingPage/services/ServicesPage';
import { LoginIsem, LoginFase1, LoginConasama, LoginSep, LoginSesyn } from '../pages/login';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordSEP } from '../components/login/forgotPassword/ForgotPasswordSEP';
import { ForgotPasswordSEPSuperior } from '../components/login/forgotPassword/ForgotPasswordSEPSuperior';

const SepRecuperarWrapper = (props) => {
    const navigate = useNavigate();
    return <ForgotPasswordSEP onBackToLogin={() => navigate('/login/sep')} {...props} />;
};

const SesynRecuperarWrapper = (props) => {
    const navigate = useNavigate();
    return <ForgotPasswordSEPSuperior onBackToLogin={() => navigate('/login/sesyn')} {...props} />;
};


const routesLanding = [
    {
        path: '/',
        layout: LandingLayout,
        component: HomeLanding,
    },
    {
        path: '/home',
        layout: LandingLayout,
        component: HomeLanding,
    },
    {
        path: '/services',
        layout: LandingLayout,
        component: ServicesPage,
    },
    {
        path: '/characteristics',
        layout: LandingLayout,
        component: CharacteristicsPage,
    },
    {
        path: '/security',
        layout: LandingLayout,
        component: SecurityPage,
    },
    {
        path: '/terminos-condiciones',
        layout: LandingLayout,
        component: TerminosYCondicionesPage,
    },
    {
        path: '/terminos-servicio',
        layout: LandingLayout,
        component: TerminosDeServicioPage,
    },

    {
        path: '/login/isem',
        layout: ({ children }) => <>{children}</>,
        component: LoginIsem,
    },
    {
        path: '/login/fase1',
        layout: ({ children }) => <>{children}</>,
        component: LoginFase1,
    },
    {
        path: '/login/conasama',
        layout: ({ children }) => <>{children}</>,
        component: LoginConasama,
    },
    {
        path: '/login/sep',
        layout: ({ children }) => <>{children}</>,
        component: LoginSep,
    }, 
     {
        path: '/login/sesyn',
        layout: ({ children }) => <>{children}</>,
        component: LoginSesyn,
    },
    {
        path: '/login/sep/recuperar',
        layout: ({ children }) => <>{children}</>,
        component: SepRecuperarWrapper,
    },
    {
        path: '/login/sesyn/recuperar',
        layout: ({ children }) => <>{children}</>,
        component: SesynRecuperarWrapper,
    }
]

export default routesLanding;