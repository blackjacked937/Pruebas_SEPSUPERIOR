import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { loginApiMCSEP } from '../../../api/user';
import { useAuth } from '../../../hooks';
import logoColor from '../../../assets/img/logoColor.png';
import logoSesyn from '../../../assets/img/logoSesyn.png';
import './LoginSesyn.css';

export function LoginSesyn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); 

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

                const response = await loginApiMCSEP(formvalue, 5);
                const { access } = response;

                await login(access, 5);
                toast.success("Iniciando sesión en SESyN...");
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
        <div className="login-layout-container-sesyn">
            <div className="login-left-panel-sesyn">
                <div className="logo-container-sesyn">
                    <img src={logoColor} alt="Sistema SESyN" className="login-logo-img-sesyn" />
                </div>
            </div>

            <div className="login-right-panel-sesyn">
                <div className="login-form-container-sesyn">
                    <div className="login-header-card-sesyn">
                        <div className="mobile-logo-container-sesyn">
                            <img src={logoColor} alt="Sistema SESyN" className="login-logo-img-sesyn" />
                        </div>
                        <h2>Bienvenido de Nuevo</h2>
                        <p>Accede a tu espacio</p>
                    </div>

                    <div className="login-card-sesyn">
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Error:</strong> {error}
                                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                            </div>
                        )}

                        <Form onSubmit={formik.handleSubmit}>
                            <div className="input-group-container-sesyn">
                                <label className="input-label-sesyn">Correo Electrónico</label>
                                <div className="input-field-wrapper-sesyn">
                                    <FiUser className="input-icon-sesyn" />
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="ejemplo@gmail.com"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-sesyn ${formik.touched.username && formik.errors.username ? "input-error-sesyn" : ""}`}
                                    />
                                </div>
                                {formik.touched.username && formik.errors.username && (
                                    <div className="error-text-sesyn">{formik.errors.username}</div>
                                )}
                            </div>

                            <div className="input-group-container-sesyn">
                                <label className="input-label-sesyn">Contraseña</label>
                                <div className="input-field-wrapper-sesyn">
                                    <FiLock className="input-icon-sesyn" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        disabled={isLoading}
                                        className={`custom-login-input-sesyn ${formik.touched.password && formik.errors.password ? "input-error-sesyn" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn-sesyn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <FiEye  /> : <FiEyeOff />}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="error-text-sesyn">{formik.errors.password}</div>
                                )}
                            </div>

                            {/* Se agrega Recuérdame y se alinea con Olvidaste tu contraseña */}
                            <div className="login-options-row-sesyn">
                                <div className="remember-me-container-sesyn">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="rememberMe">Recuérdame</label>
                                </div>

                                <Link to="/login/sesyn/recuperar" className="forgot-password-link-sesyn">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <div className="login-actions-sesyn">
                                <Button
                                    type="submit"
                                    className="login-btn-orange-sesyn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" className="me-2" /> 
                                            Autenticando...
                                        </>
                                    ) : (
                                        "Iniciar Sesión"
                                    )}
                                </Button>

                                <button
                                    type="button"
                                    className="login-back-link-sesyn"
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