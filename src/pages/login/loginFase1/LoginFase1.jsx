import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { loginApiFase1 } from '../../../api/user';
import { useAuth } from '../../../hooks';
import logoColor from '../../../assets/img/logoColor.png';
import './LoginFase1.css';

export function LoginFase1() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Ingrese un correo válido")
                .required("Ingrese su correo electrónico"),
            password: Yup.string()
                .required("Ingrese su contraseña"),
        }),
        validateOnChange: false,
        onSubmit: async (formvalue) => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await loginApiFase1(formvalue, 2);
                const { access } = response;

                await login(access, 2);
                toast.success("Iniciando sesión en Mente Conecta...");
                navigate('/admin');

            } catch (error) {
                setError(error.message);
                if (error.message.includes("404") || error.message.includes("no encontrado")) {
                    toast.error("Correo o contraseña incorrectos");
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
        <div className="login-layout-container-fase1">
            <div className="login-left-panel-fase1">
                <div className="logo-container-fase1">
                    <img src={logoColor} alt="Mente Conecta" className="login-logo-img-fase1" />
                </div>
            </div>

            <div className="login-right-panel-fase1">
                <div className="login-form-container-fase1">

                    {/* CARD 1: HEADER */}
                    <div className="login-header-card-fase1">
                        <div className="mobile-logo-container-fase1">
                            <img src={logoColor} alt="Mente Conecta" className="login-logo-img-fase1" />
                        </div>
                        <h2>Mente Conecta</h2>
                        <p>Accede a tu espacio</p>
                    </div>

                    {/* CARD 2: FORM CARD */}
                    <div className="login-card-fase1">
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Error:</strong> {error}
                                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                            </div>
                        )}

                        <Form onSubmit={formik.handleSubmit}>
                            <div className="input-group-container-fase1">
                                <label className="input-label-fase1">Correo Electrónico</label>
                                <div className="input-field-wrapper-fase1">
                                    <FiMail className="input-icon-fase1" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-fase1 ${formik.touched.email && formik.errors.email ? "input-error-fase1" : ""}`}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <div className="error-text-fase1">{formik.errors.email}</div>
                                )}
                            </div>
                            <div className="input-group-container-fase1">
                                <label className="input-label-fase1">Contraseña</label>
                                <div className="input-field-wrapper-fase1">
                                    <FiLock className="input-icon-fase1" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-fase1 ${formik.touched.password && formik.errors.password ? "input-error-fase1" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn-fase1"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="error-text-fase1">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="forgot-password-container-fase1">
                                <Link to="#" className="forgot-password-link-fase1">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <div className="login-actions-fase1">
                                <Button
                                    type="submit"
                                    className="login-btn-gradient-fase1"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <><Spinner as="span" animation="border" size="sm" className="me-2" /> Validando...</>
                                    ) : "Iniciar Sesión"}
                                </Button>

                                <button
                                    type="button"
                                    className="login-back-link-fase1"
                                    onClick={() => navigate('/admin')}
                                    disabled={isLoading}
                                >
                                    Regresar
                                </button>
                            </div>
                        </Form>
                    </div>

                    {/* CARD 3: FOOTER */}
                    <div className="login-footer-card-isem">
                        <FiLock className="me-2" style={{ marginBottom: '2px' }} />
                        Tu privacidad es nuestra prioridad. Todos tus datos están cifrados y protegidos.
                    </div>
                </div>
            </div>
        </div>
    );
}