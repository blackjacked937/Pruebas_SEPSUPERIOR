import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { GiBrain, } from "react-icons/gi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Icono_home from "../../../assets/img/Icono_home.jpeg";
import { loginApiISEM, loginApiFase1, loginApiConasama, loginApiSEP } from '../../../api/user';
import { useAuth } from '../../../hooks';
import { InputForm } from '../../ui';
import './FormLogin.css';

export function FormLogin(props) {
    const { typeLogin, onBack } = props;
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginMap = {
        1: loginApiISEM,
        2: loginApiFase1,
        3: loginApiConasama,
        4: loginApiSEP, // SEP usa su propia API
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
        <div className="login-bg">
            <div className="login-wrapper">

            {/* HEADER */}
            <div className="login-header">
                <h2>Bienvenido de Nuevo</h2>
                <p>Accede a tu espacio</p>

                <div className="logo-circle">
                <img src={Icono_home} alt="logo" />
                </div>
            </div>

            {/* FORM CARD */}
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

                <InputForm
                    label={typeLogin === 2 || typeLogin===4 ? "Correo Electrónico" : "Usuario"}
                    labelDirection="left"
                    nameInput={typeLogin === 2 || typeLogin===4 ? "email" : "username"}
                    placeHolderInput={typeLogin === 2 || typeLogin===4 ? "correo@example.com" : "usuario"}
                    valueInput={typeLogin === 2 || typeLogin===4 ? formik.values.email : formik.values.username}
                    onChangeInput={formik.handleChange}
                    type="text"
                    error={typeLogin === 2 || typeLogin===4 ? formik.errors.email : formik.errors.username}
                    touched={typeLogin === 2 || typeLogin===4 ? formik.touched.email : formik.touched.username}
                    disabled={isLoading}
                />

                <InputForm
                    label="Contraseña"
                    labelDirection="left"
                    nameInput="password"
                    placeHolderInput="••••••••"
                    valueInput={formik.values.password}
                    onChangeInput={formik.handleChange}
                    type="password"
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    disabled={isLoading}
                />

                {/* Botón Iniciar Sesión con Spinner */}
                <Button 
                    type="submit" 
                    className="login-btn"
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

                {/* Botón Regresar */}
                <Button
                    type="button"
                    className="login-btn login-btn-secondary"
                    onClick={onBack}
                    disabled={isLoading}
                >
                    Regresar
                </Button>

                </Form>
            </div>

            {/* FOOTER */}
            <div className="login-footer">
                🔒 Tu privacidad es nuestra prioridad. Todos tus datos están cifrados y protegidos.
            </div>

            </div>
        </div>
    )
}

function initialValues(typeLogin) {
    if (typeLogin === 2 || typeLogin === 4) {
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
    if (typeLogin === 2 || typeLogin === 4) {
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
