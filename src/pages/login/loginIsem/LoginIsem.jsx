import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { loginApiISEM } from '../../../api/user';
import { useAuth } from '../../../hooks';
import logoColor from '../../../assets/img/logoColor.png';
import isemLogo from '../../../assets/img/Colibri_Vertical_FondoClaro 02.png';
import './LoginIsem.css';

export function LoginIsem() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: { username: "", password: "" },
        validationSchema: Yup.object({
            username: Yup.string().required("Ingrese su usuario"),
            password: Yup.string().required("Ingrese su contraseña"),
        }),
        validateOnChange: false,
        onSubmit: async (formvalue) => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await loginApiISEM(formvalue, 1);
                const { access } = response;

                await login(access, 1);
                toast.success("Iniciando sesión...");
                navigate('/admin');

            } catch (error) {
                setError(error.message);
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
        <div className="login-layout-container-isem">
            <div className="login-left-panel-isem">
                <div className="logo-container-isem">
                    <img src={logoColor} alt="Mente Conecta ISEM" className="login-logo-img-isem" />
                </div>
            </div>

            <div className="login-right-panel-isem">

                <div className="login-form-container-isem">
                    {/* CARD 1: HEADER */}
                    <div className="login-header-card-isem">
                        <div className="mobile-logo-container-isem">
                            <img src={logoColor} alt="Mente Conecta ISEM" className="login-logo-img-isem" />
                        </div>
                        <h2>Bienvenido de Nuevo</h2>
                        <p>Portal Administrativo ISEM</p>
                    </div>

                    {/* CARD 2: FORM CARD */}
                    <div className="login-card-isem">
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Error:</strong> {error}
                                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                            </div>
                        )}

                        <Form onSubmit={formik.handleSubmit}>
                            <div className="input-group-container-isem">
                                <label className="input-label-isem">Correo Electrónico</label>
                                <div className="input-field-wrapper-isem">
                                    <FiUser className="input-icon-isem" />
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="tu@email.com"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-isem ${formik.touched.username && formik.errors.username ? "input-error-isem" : ""}`}
                                    />
                                </div>
                                {formik.touched.username && formik.errors.username && (
                                    <div className="error-text-isem">{formik.errors.username}</div>
                                )}
                            </div>
                            <div className="input-group-container-isem">
                                <label className="input-label-isem">Contraseña</label>
                                <div className="input-field-wrapper-isem">
                                    <FiLock className="input-icon-isem" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="•••••••"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-isem ${formik.touched.password && formik.errors.password ? "input-error-isem" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn-isem"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="error-text-isem">{formik.errors.password}</div>
                                )}
                            </div>
                            <div className="forgot-password-container-isem">
                                <Link to="#" className="forgot-password-link-isem">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <div className="login-actions-isem">
                                <Button
                                    type="submit"
                                    className="login-btn-gradient-isem"
                                    disabled={isLoading}
                                    style={{ opacity: isLoading ? 0.7 : 1 }}
                                >
                                    {isLoading ? (
                                        <><Spinner as="span" animation="border" size="sm" className="me-2" /> Iniciando sesión...</>
                                    ) : "Iniciar Sesión"}
                                </Button>

                                <button
                                    type="button"
                                    className="login-back-link-isem"
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