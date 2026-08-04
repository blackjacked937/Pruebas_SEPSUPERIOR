import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { loginApiConasama } from '../../../api/user';
import { useAuth } from '../../../hooks';
import logoColor from '../../../assets/img/logoColor.png';
import logoMCA from '../../../assets/img/logoMCA.png';
import './LoginConasama.css';

export function LoginConasama() {
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

                const response = await loginApiConasama(formvalue, 3);
                const { access } = response;

                await login(access, 3);
                toast.success("Iniciando sesión en Mente Conecta Adicciones...");

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
        <div className="login-layout-container-conasama">
            <div className="login-left-panel-conasama">
                <div className="logo-container-conasama">
                    <img src={logoColor} alt="Mente Conecta Adicciones" className="login-logo-img-conasama" />
                </div>
            </div>

            <div className="login-right-panel-conasama">
                <div className="login-form-container-conasama">
                    <div className="login-header-card-conasama">
                        <div className="mobile-logo-container-conasama">
                            <img src={logoColor} alt="Mente Conecta Adicciones" className="login-logo-img-conasama" />
                        </div>
                        <h2>Bienvenido de Nuevo</h2>
                        <p>Portal Administrativo CONASAMA</p>
                    </div>

                    <div className="login-card-conasama">
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Error:</strong> {error}
                                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                            </div>
                        )}

                        <Form onSubmit={formik.handleSubmit}>
                            <div className="input-group-container-conasama">
                                <label className="input-label-conasama">Correo Electrónico</label>
                                <div className="input-field-wrapper-conasama">
                                    <FiUser className="input-icon-conasama" />
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="tu@email.com"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-conasama ${formik.touched.username && formik.errors.username ? "input-error-conasama" : ""}`}
                                    />
                                </div>
                                {formik.touched.username && formik.errors.username && (
                                    <div className="error-text-conasama">{formik.errors.username}</div>
                                )}
                            </div>

                            <div className="input-group-container-conasama">
                                <label className="input-label-conasama">Contraseña</label>
                                <div className="input-field-wrapper-conasama">
                                    <FiLock className="input-icon-conasama" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-conasama ${formik.touched.password && formik.errors.password ? "input-error-conasama" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn-conasama"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="error-text-conasama">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="forgot-password-container-conasama">
                                <Link to="#" className="forgot-password-link-conasama">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <div className="login-actions-conasama">
                                <Button
                                    type="submit"
                                    className="login-btn-gradient-conasama"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <><Spinner as="span" animation="border" size="sm" className="me-2" /> Iniciando...</> : "Iniciar Sesión"}
                                </Button>

                                <button
                                    type="button"
                                    className="login-back-link-conasama"
                                    onClick={() => navigate('/admin')}
                                    disabled={isLoading}
                                >
                                    Regresar
                                </button>
                            </div>
                        </Form>
                    </div>

                    <div className="login-footer-card-isem"> 
                        <FiLock className="me-2" style={{ marginBottom: '2px' }} />
                        Tu privacidad es nuestra prioridad. Todos tus datos están cifrados y protegidos.
                    </div>
                </div>
            </div>
        </div>
    );
}