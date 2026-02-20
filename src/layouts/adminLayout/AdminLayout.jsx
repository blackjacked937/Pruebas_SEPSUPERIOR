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
    const isGestorConasamaRoute = pathname.startsWith("/admin/gestor/conasama");
    const isSuperConasamaRoute = pathname.startsWith("/admin/super-gestor/conasama");
    

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
    if (auth.typeLogin === 3) {

        // PATH BASE SUPER GESTOR
        if (auth.is_superuser) {
            if (!isSuperConasamaRoute) {
            return <Navigate to="/admin/super-gestor/conasama" replace />;
            }
        }

        // PATH BASE GESTOR
        else if (auth.is_staff) {
            if (!isGestorConasamaRoute) {
            return <Navigate to="/admin/gestor/conasama" replace />;
            }
        }

    }
    return (
        <Container fluid className="admin-layout">
            <Row>
                <HeaderAdmin />
            </Row>
            <Row className="row divi">
                <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
                    <LeftMenu />
                </div>
                <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9">
                    <Row>{children}</Row>
                </div>
            </Row>
        </Container>
    )
}
