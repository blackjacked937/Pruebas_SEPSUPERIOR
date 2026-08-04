import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { GiBrain, } from "react-icons/gi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Icono_home from "../../../assets/img/Icono_home.jpeg";
import { loginApiISEM, loginApiFase1, loginApiConasama, loginApiSEP, loginApiMCSEP } from '../../../api/user';
import { useAuth } from '../../../hooks';
import { InputForm } from '../../ui';
import './FormLogin.css';

import { FiMail, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import logoColor from '../../../assets/img/logoColor.png';

export function FormLogin(props) {
    const { typeLogin, onBack, onForgotPassword } = props;
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const loginMap = {
        1: loginApiISEM,
        2: loginApiFase1,
        3: loginApiConasama,
        4: loginApiSEP, // SEP usa su propia API
        5: loginApiMCSEP,
    };

    const getLoginApi = (typeLogin) => loginMap[typeLogin] || loginApiISEM;

    const formik = useFormik({
        initialValues: initialValues(typeLogin),
        validationSchema: Yup.object(newSchema(typeLogin)),
        validateOnChange: false,
        onSubmit: async (formvalue) => {
            try {
                setIsLoading(true);
                setError(null);
                console.log(`[FormLogin] Iniciando login para typeLogin: ${typeLogin}`);
                
                // PASO 1: Llamar API de login
                console.log(`[FormLogin] Llamando API de login...`);
                const response = await getLoginApi(typeLogin)(formvalue, typeLogin);
                const { access } = response;
                console.log(`[FormLogin] ✓ Token recibido exitosamente`);
                
                // PASO 2: Guardar en contexto
                console.log(`[FormLogin] Guardando token en AuthContext...`);
                await login(access, typeLogin);
                console.log(`[FormLogin] ✓ Login completado. Esperando redirección...`);
                
                toast.success("Iniciando sesión...");
                
            } catch (error) {
                console.error(`[FormLogin]  Error en login:`, error);
                setError(error.message);
                
                // Mostrar diferentes mensajes según el tipo de error
                if (error.message.includes("404") || error.message.includes("no encontrado")) {
                    toast.error("Usuario o contraseña incorrectos");
                } else if (error.message.includes("no tiene acceso")) {
                    toast.error("Tu cuenta no tiene acceso a esta plataforma");
                } else if (error.message.includes("token")) {
                    toast.error("Error de autenticación. Intenta de nuevo");
                } else {
                    toast.error(error.message || "Error al iniciar sesión");
                }
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="login-form-container">
            {/* CARD 1: HEADER */}
            <div className="login-header-card">
                <div className="mobile-logo-container">
                    <img src={logoColor} alt="Mente Conecta Logo" className="login-logo-img" />
                </div>
                <h2>Bienvenido de Nuevo</h2>
                <p>Accede a tu espacio</p>
            </div>

            {/* CARD 2: FORM CARD */}
            <div className="login-card">
                {/* Mostrar error persistente si existe */}
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error:</strong> {error}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setError(null)}
                        ></button>
                    </div>
                )}

                <Form onSubmit={formik.handleSubmit}>
                    {/* Correo Electrónico */}
                    <div className="input-group-container">
                        <label className="input-label">Correo Electrónico</label>
                        <div className="input-field-wrapper">
                            <FiMail className="input-icon" />
                            <input
                                name={typeLogin === 2 ? "email" : "username"}
                                type="text"
                                placeholder="tu@email.com"
                                value={typeLogin === 2 ? formik.values.email : formik.values.username}
                                onChange={formik.handleChange}
                                disabled={isLoading}
                                className={`custom-login-input ${formik.touched[typeLogin === 2 ? "email" : "username"] && formik.errors[typeLogin === 2 ? "email" : "username"] ? "input-error" : ""}`}
                            />
                        </div>
                        {formik.touched[typeLogin === 2 ? "email" : "username"] && formik.errors[typeLogin === 2 ? "email" : "username"] && (
                            <div className="error-text">{formik.errors[typeLogin === 2 ? "email" : "username"]}</div>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div className="input-group-container">
                        <label className="input-label">Contraseña</label>
                        <div className="input-field-wrapper">
                            <FiLock className="input-icon" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="•••••••"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                disabled={isLoading}
                                className={`custom-login-input ${formik.touched.password && formik.errors.password ? "input-error" : ""}`}
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="error-text">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Enlace recuperar contraseña */}
                    <div className="forgot-password-container">
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                if (onForgotPassword) {
                                    onForgotPassword();
                                }
                            }} 
                            className="forgot-password-link"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {/* Acciones */}
                    <div className="login-actions">
                        <Button 
                            type="submit" 
                            className="login-btn-gradient"
                            disabled={isLoading}
                            style={{ opacity: isLoading ? 0.7 : 1 }}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </Button>

                        <button
                            type="button"
                            className="login-back-link"
                            onClick={onBack}
                            disabled={isLoading}
                        >
                            Regresar
                        </button>
                    </div>
                </Form>
            </div>

            {/* CARD 3: FOOTER */}
            <div className="login-footer-card">
                🔒 Tu privacidad es nuestra prioridad. Todos tus datos están cifrados y protegidos.
            </div>
        </div>
    )

}

function initialValues(typeLogin) {
    if (typeLogin === 2) {
        return {
            email: "",
            password: "",
        };
    }
    return {
        username: "",
        password: "",
    };
}

function newSchema(typeLogin) {
    if (typeLogin === 2) {
        return {
            email: Yup
                .string("Ingrese su correo electrónico")
                .email("Ingrese un correo válido")
                .required("Ingrese su correo electrónico"),
            password: Yup
                .string("Ingrese su contraseña")
                .required("Ingrese su contraseña"),
        };
    }
    return {
        username: Yup
            .string("Ingrese su usuario")
            .required("Ingrese su usuario"),
        password: Yup
            .string("Ingrese su contraseña")
            .required("Ingrese su contraseña"),
    };
}
