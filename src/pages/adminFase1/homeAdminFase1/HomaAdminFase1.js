import React from 'react'


import { 
    CardInfoNavigation, 
    DemoCardInfoNavigation 
} from '../../../components/common'
import './HomaAdminFase1.css'

export function HomaAdminFase1() {
    return (
        <div className="container-home-admin-fase-1">
            <div className="box">
                <CardInfoNavigation
                    riskLevel = {1}
                    account = {1}
                    title = "Ver dashboard de analíticas"
                    subTitle = "Cuestionario de Columbia"
                    textLink = "Ver más detalles"
                    link = "/admin/f1/estadisticas"
                />
            </div>
            <div className="box">
                <CardInfoNavigation
                    riskLevel = {2}
                    account = {2}
                    title = "Pacientes en riesgo"
                    subTitle = "Cuestionario Alcoholismo"
                    textLink = "Ver más detalles"
                    link = "/admin/f1/"
                />
            </div>
            <div className="box">
                <CardInfoNavigation
                    riskLevel = {3}
                    account = {3}
                    title = "Pacientes en riesgo"
                    subTitle = "Cuestionario de Columbia"
                    textLink = "Ver más detalles"
                    link = "/admin/f1/columbia"
                />
            </div>
            <div className="box">
                <DemoCardInfoNavigation/>
            </div>
        </div>
    )
}
