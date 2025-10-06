import { LandingLayout } from '../layouts';
import {
    Home,
} from '../pages/landing';
import { HomeLanding } from '../pages/landingPage/home';

import { HomeLanding } from '../pages/landingPage/home';

import { CharacteristicsPage } from '../pages/landingPage/characteristics/CharacteristicsPage';
import { SecurityPage } from '../pages/landingPage/security/SecurityPage';

const routesLanding = [
    {
        path: '/',
        layout: LandingLayout,
        component: Home,
    },
    {
        path: '/home',
        layout: LandingLayout,
        component: HomeLanding,
    },
    {
        path: '/home',
        layout: LandingLayout,
        component: HomeLanding,
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