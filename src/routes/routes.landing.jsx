import { LandingLayout } from '../layouts';
import {
    Home
} from '../pages/landing';
import { HomeLanding } from '../pages/landingPage/home';


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
]

export default routesLanding;