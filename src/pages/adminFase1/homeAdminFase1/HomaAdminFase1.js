import {useEffect} from 'react'
import { 
    CardInfoNavigation, 
    DemoCardInfoNavigation 
} from '../../../components/common'
import { useDashboardAdmin } from '../../../hooks';
import './HomaAdminFase1.css'
import { Row } from 'react-bootstrap';

export function HomaAdminFase1() {
      const { alertsColumbia, loadingAlertsColumbia, getAlertsColumbia } = useDashboardAdmin();
      const getData = async () => { await getAlertsColumbia(); }
    
      useEffect(() => {
        getData();
      }, [])
      
    return (
        <Row className="container-home-admin-fase-1">
            {/* Columbia */}
            <div className="card-info col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                {
                    loadingAlertsColumbia 
                    ?   <h1>Cargando</h1>
                    :   <CardInfoNavigation
                            riskLevel = {alertsColumbia?.pacientes_en_alerta === 0 ? 1: 3}
                            account = {alertsColumbia?.pacientes_en_alerta}
                            title = "Pacientes en riesgo"
                            subTitle = "Cuestionario de Columbia"
                            textLink = "Ver más detalles"
                            link = "/admin/f1/columbia"
                        />
                }
                
            </div>

            {/* Tabaquismo */}
            {/* Alcoholismo */}
            {/* Ansiedad */}
            {/* Depresion */}
            {/* Drogas */}

            <div className="card-info col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardInfoNavigation
                    riskLevel = {1}
                    account = {1}
                    title = "Ver dashboard de analíticas"
                    subTitle = "Cuestionario de Columbia"
                    textLink = "Ver más detalles"
                    link = "/admin/f1/estadisticas"
                />
            </div>
            <div className="card-info col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardInfoNavigation
                    riskLevel = {2}
                    account = {2}
                    title = "Pacientes en riesgo"
                    subTitle = "Cuestionario Alcoholismo"
                    textLink = "Ver más detalles"
                    link = "/admin/f1/"
                />
            </div>
            <div className="card-info col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <DemoCardInfoNavigation/>
            </div>
            <div className="card-info col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <DemoCardInfoNavigation/>
            </div>
            <div className="card-info col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <DemoCardInfoNavigation/>
            </div>
        </Row>
    )
}
