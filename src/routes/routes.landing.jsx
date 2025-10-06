import { LandingLayout } from '../layouts';
import {
    Home,
} from '../pages/landing';
import { CharacteristicsPage } from '../pages/landingPage/characteristics/CharacteristicsPage';
import { SecurityPage } from '../pages/landingPage/security/SecurityPage';

const routesLanding = [
    {
        path: '/',
        layout: LandingLayout,
        component: Home,
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