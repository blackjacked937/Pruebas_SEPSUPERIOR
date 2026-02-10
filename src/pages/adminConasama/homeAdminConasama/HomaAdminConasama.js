import {useEffect} from 'react'
import './HomaAdminConasama.css'
import { useDashboardAdmin } from '../../../hooks';
import { CardInfoNavigation, DemoCardInfoNavigation } from '../../../components/common'
import { Row } from 'react-bootstrap';

export function HomaAdminConasama() {

    const { loadingAlerts, alerts, getAlerts } = useDashboardAdmin();

    useEffect(() => {
        getAlerts();
    }, []);

    return (
        <Row className="container-home-admin-fase-1">
            {loadingAlerts && (
                <div className="col-12 text-center">
                <h3>Cargando...</h3>
                </div>
            )}

            {!loadingAlerts && alerts?.map((alerta) => (
                <div key={alerta.id_cuestionaro} className="card-info col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                    <CardInfoNavigation
                        riskLevel={alerta.score === 0 ? 1 : alerta.score >= 5 ? 3 : 2}
                        account={alerta.score}
                        title="Pacientes en riesgo"
                        subTitle={`Cuestionario de ${alerta.cuestionario}`}
                        textLink="Ver más detalles"
                        link={`/admin/f1/${alerta.id_cuestionaro}`}
                    />
                </div>
            ))}
        </Row>
    )
}
