import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, Form, Spinner, Dropdown } from 'react-bootstrap';
import { toast } from "react-toastify";
import { FiUser, FiLock, FiEye, FiEyeOff, FiGlobe } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { loginApiSEP } from '../../../api/user';
import { useAuth } from '../../../hooks';
import logoColor from '../../../assets/img/logoColor.png';
import Swal from 'sweetalert2';
import { ForgotPasswordSEP } from '../../../components/login/forgotPassword/ForgotPasswordSEP';
import './LoginSep.css';
import avatarhombre from '../../../assets/img/AvatarLogin.png';


import { MX, US } from 'country-flag-icons/react/3x2';

export function LoginSep() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isForgot, setIsForgot] = useState(false);


    const [selectedLang, setSelectedLang] = useState({
        code: 'es',
        FlagComponent: MX
    });

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
                const response = await loginApiSEP(formvalue, 4);
                const { access } = response;

                const isNewUser = response.requiere_cambio_password;

                if (isNewUser) {
                    localStorage.setItem('requiere_cambio_password', 'true');
                    setIsLoading(false);

                    Swal.fire({
                        title: '¡Bienvenido a Mente Conecta!',
                        text: 'Por seguridad, al ser tu primer inicio de sesión debes completar tu información y cambiar tu contraseña.',
                        icon: 'info',
                        confirmButtonText: 'Ir a mi perfil',
                        confirmButtonColor: '#7DB747',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then(async () => {
                        toast.success("Iniciando sesión...");
                        await login(access, 4);
                        navigate('/admin/super-gestor/sep/perfil');
                    });

                    return;
                }

                await login(access, 4);
                toast.success("Iniciando sesión en Sistema SEP...");
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
                if (!localStorage.getItem('requiere_cambio_password')) {
                    setIsLoading(false);
                }
            }
        },
    });

    const handleLanguageChange = (code, FlagComponent) => {
        setSelectedLang({ code, FlagComponent });
    };

    if (isForgot) {
        return <ForgotPasswordSEP onBackToLogin={() => setIsForgot(false)} />;
    }

    const CurrentFlag = selectedLang.FlagComponent;

    return (
        <div className="login-layout-container-sep">


            <div className="language-selector-container-sep">
                <Dropdown align="end">
                    <Dropdown.Toggle variant="link" id="dropdown-language" className="language-dropdown-toggle">
                        <CurrentFlag className="flag-img" />
                        <FiGlobe className="globe-icon" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="language-dropdown-menu">
                        <Dropdown.Item onClick={() => handleLanguageChange('es', MX)}>
                            <MX className="flag-img-item" /> Español
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleLanguageChange('en', US)}>
                            <US className="flag-img-item" /> English
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


            <div className="login-image-column-sep">
                <img
                    src={avatarhombre}
                    alt="Avatar"
                    className="avatar-izquierda"
                />
            </div>


            <div className="login-form-container-sep">
                <div className="login-header-card-sep">
                    <div className="logo-container-sep">
                        <img src={logoColor} alt="Mente Conecta" className="login-logo-img-sep" />
                    </div>
                    <h2>Bienvenido de Nuevo</h2>
                    <p>Accede a tu espacio</p>
                </div>

                <div className="login-card-sep">
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Error:</strong> {error}
                            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                        </div>
                    )}

                    <Form onSubmit={formik.handleSubmit}>
                        <div className="input-group-container-sep">
                            <label className="input-label-sep">Correo Electrónico</label>
                            <div className="input-field-wrapper-sep">
                                <FiUser className="input-icon-sep" />
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="correo@gmail.com"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    disabled={isLoading}
                                    className={`custom-login-input-sep ${formik.touched.username && formik.errors.username ? "input-error-sep" : ""}`}
                                />
                            </div>
                            {formik.touched.username && formik.errors.username && (
                                <div className="error-text-sep">{formik.errors.username}</div>
                            )}
                        </div>

                        <div className="input-group-container-sep">
                            <label className="input-label-sep">Contraseña</label>
                            <div className="input-field-wrapper-sep">
                                <FiLock className="input-icon-sep" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    disabled={isLoading}
                                    className={`custom-login-input-sep ${formik.touched.password && formik.errors.password ? "input-error-sep" : ""}`}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn-sep"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex="-1"
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <div className="error-text-sep">{formik.errors.password}</div>
                            )}
                        </div>

                        <div className="login-options-row-sep">
                            <div className="remember-me-container-sep">
                                <input type="checkbox" id="remember-visual" />
                                <label htmlFor="remember-visual">Recuérdame</label>
                            </div>

                            <span
                                className="forgot-password-link-sep"
                                onClick={() => setIsForgot(true)}
                                style={{ cursor: 'pointer' }}
                            >
                                ¿Olvidaste tu contraseña?
                            </span>
                        </div>

                        <div className="login-actions-sep">
                            <Button
                                type="submit"
                                className="login-btn-orange-sep"
                                disabled={isLoading}
                            >
                                {isLoading ? <><Spinner as="span" animation="border" size="sm" className="me-2" /> Validando...</> : "Iniciar Sesión"}
                            </Button>
                            <button
                                type="button"
                                className="login-back-link-sep"
                                onClick={() => navigate('/admin')}
                                disabled={isLoading}
                            >
                                Regresar
                            </button>
                        </div>
                    </Form>
                </div>

                <div className="login-footer-card-sep">
                    <FiLock className="me-2" style={{ marginBottom: '2px', color: '#94A3B8' }} />
                    Tu privacidad es nuestra prioridad. Todos tus datos están cifrados y protegidos.
                </div>
            </div>

        </div>
    );
}