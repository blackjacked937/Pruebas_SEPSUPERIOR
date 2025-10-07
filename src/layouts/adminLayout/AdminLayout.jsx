import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useLocation, Navigate } from 'react-router-dom';
import {
    HeaderAdmin,
    LeftMenu,
} from '../../components/admin';
import { useAuth } from '../../hooks/useAuth';
import { LoginLayout } from '../../pages/login';
import './AdminLayout.css';

export function AdminLayout(props) {
    const { children } = props;
    const { auth } = useAuth();
    const { pathname } = useLocation();

    if (!auth || auth?.detail) return <LoginLayout />

    console.log(`Ruta actual: ${pathname}, Tipo de Login: ${auth.typeLogin}`);

    const isAdminF1Route = pathname.startsWith('/admin/f1');

    if (auth.typeLogin === 1) {
        if (isAdminF1Route) {
            return <Navigate to="/admin" />;
        }
    }

    if (auth.typeLogin === 2) {
        if (!isAdminF1Route) {
            return <Navigate to="/admin/f1/" />;
        }
    }

    return (
        <Container fluid className="admin-layout">
            <Row>
                <HeaderAdmin />
            </Row>
            <Row>
                <div className="divi">
                    <div className="layout-sidebar">
                        <LeftMenu />
                    </div>
                    <div className="layout-navbar">
                        <div className="layout-tablas">
                            <Row>{children}</Row>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    )
}
