import { LandingLayout } from '../layouts';
import {
    Home,
} from '../pages/landing';
import { HomeLanding } from '../pages/landingPage/home';
import { CharacteristicsPage } from '../pages/landingPage/characteristics/CharacteristicsPage';
import { SecurityPage } from '../pages/landingPage/security/SecurityPage';
import { ServicesPage } from '../pages/landingPage/services/ServicesPage';

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
]

export default routesLanding;