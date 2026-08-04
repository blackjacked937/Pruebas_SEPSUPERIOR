import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiShield, FiLogIn, FiGlobe } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

// Se eliminaron las importaciones de vector2V y vector1
import CastorImg from '../../../assets/img/Castor.png';
import ConejoImg from '../../../assets/img/Conejo.png';
import ContainerBg from '../../../assets/img/Container.png';
import logoColor from '../../../assets/img/logoColor.png';
import { BASE_API_SEP_SUPERIOR_V1 } from '../../../utils/constants';
import './ForgotPasswordSEPSuperior.css';

// Ícono de llave personalizado y corregido (tamaño 34px y grosor 2)
const CustomKeyIcon = ({ className }) => (
  <svg
    className={className}
    width="55"
    height="55"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="15" cy="9" r="5" />
    <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <path d="M11.5 12.5 L4.5 19.5 A1.5 1.5 0 0 0 6.5 21.5 L6.5 19.5 L8.5 19.5 L8.5 17.5 L10.5 17.5 L10.5 15.5 L12.5 13.5" />
  </svg>
);

export function ForgotPasswordSEPSuperior({ onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(Array(6).fill(''));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');
  const [codeError, setCodeError] = useState(false);

  // Formik for Step 1: Email
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El formato de correo electrónico es inválido')
        .required('Este campo es obligatorio'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        
        const url = `${BASE_API_SEP_SUPERIOR_V1}/auth/notificacion/`;
        const params = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email, lang_code: 'es' }),
        };
        
        const response = await fetch(url, params);
        if (response.status !== 200) {
          const result = await response.json().catch(() => ({}));
          const errMsg = result.detail || result.error || "";
          
          if (response.status === 404 || response.status === 400 || errMsg.toLowerCase().includes("not found") || errMsg.toLowerCase().includes("exist") || errMsg.toLowerCase().includes("registrado") || !errMsg) {
            throw new Error("Correo no registrado, verifica el texto e inténtalo de nuevo");
          }
          throw new Error(errMsg);
        }
        
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
        
        setStep(3);
      } catch (error) {
        setErrorToastMessage(error.message || "Ocurrió un error al enviar el código. Intente de nuevo.");
        setShowErrorToast(true);
        setTimeout(() => {
          setShowErrorToast(false);
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Formik for Step 4: New Password
  const passwordFormik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .oneOf([Yup.ref('confirmPassword'), null], 'Las contraseñas no coinciden')
        .required('Este campo es obligatorio'),
      confirmPassword: Yup.string()
        .min(6, 'La cantidad mínima de caracteres es de 6')
        .required('Este campo es obligatorio'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        
        const url = `${BASE_API_SEP_SUPERIOR_V1}/user/users/establecer_nuevo_password/`;
        const params = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formik.values.email,
            new_password: values.password
          }),
        };
        
        const response = await fetch(url, params);
        if (response.status !== 200) {
          const result = await response.json().catch(() => ({}));
          throw new Error(result.detail || result.error || "No se pudo actualizar la contraseña. Intente de nuevo.");
        }
        
        setStep(5);
      } catch (error) {
        setErrorToastMessage(error.message || "Ocurrió un error al restablecer la contraseña. Intente de nuevo.");
        setShowErrorToast(true);
        setTimeout(() => {
          setShowErrorToast(false);
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    }
  });

  // Step 3 logic: Verification Code Handlers
  const handleCodeChange = (value, index) => {
    if (value !== '' && !/^[0-9]$/.test(value)) return;

    setCodeError(false);

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleCodeKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        const prevInput = document.getElementById(`code-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
          const newCode = [...code];
          newCode[index - 1] = '';
          setCode(newCode);
        }
      } else {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^[0-9]{6}$/.test(pasteData)) {
      setCodeError(false);
      const newCode = pasteData.split('');
      setCode(newCode);
      const lastInput = document.getElementById('code-input-5');
      if (lastInput) lastInput.focus();
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setCodeError(true);
      setErrorToastMessage("Ingresa el código.");
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 5000);
      return;
    }
    
    setCodeError(false);
    
    try {
      setIsLoading(true);
      
      const url = `${BASE_API_SEP_SUPERIOR_V1}/user/users/validar_token/`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: fullCode }),
      };
      
      const response = await fetch(url, params);
      if (response.status !== 200) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.detail || result.error || "El código ingresado es incorrecto o ha expirado, verificalo.");
      }
      
      setStep(4);
    } catch (error) {
      setErrorToastMessage(error.message || "Error al validar el código. Intente de nuevo.");
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      
      const url = `${BASE_API_SEP_SUPERIOR_V1}/auth/notificacion/`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formik.values.email, lang_code: 'es' }),
      };
      
      const response = await fetch(url, params);
      if (response.status !== 200) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.detail || result.error || "No se pudo reenviar el código.");
      }
      
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (error) {
      setErrorToastMessage(error.message || "Error al reenviar el código.");
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sepsuperior-forgot-password-page">
      {/* Header azul superior */}
      <header className="sepsuperior-forgot-header">
        <div className="sepsuperior-header-logo-container">
          <img src={logoColor} alt="Mente Conecta" className="sepsuperior-header-logo" />
        </div>
        <div className="sepsuperior-header-right">
          <span onClick={onBackToLogin} className="sepsuperior-header-login-link">
            Iniciar Sesión
          </span>
          <div className="sepsuperior-header-user-icon">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 96a72 72 0 1 1-72 72 72 72 0 0 1 72-72zm0 240a175.55 175.55 0 0 1-125.18-53.81C145.72 293.42 201.76 288 256 288s110.28 5.42 125.18 42.19A175.55 175.55 0 0 1 256 384z"></path>
            </svg>
          </div>
          <div className="sepsuperior-header-flag">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="24" height="16" style={{ borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
              <rect width="1" height="2" fill="#006847" />
              <rect x="1" width="1" height="2" fill="#FFFFFF" />
              <rect x="2" width="1" height="2" fill="#C8102E" />
              <circle cx="1.5" cy="1" r="0.15" fill="#8B5A2B" />
            </svg>
          </div>
          <div className="sepsuperior-header-globe">
            <FiGlobe size={20} />
          </div>
        </div>
      </header>

      <div className="sepsuperior-forgot-password-container">
        
        {/* Ola Superior en SVG */}
        <svg 
          className="sepsuperior-bg-wave-top" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 280" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#64BAE9" 
            fillOpacity="1" 
            d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,96C672,85,768,107,864,133.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        {/* Ola Inferior en SVG */}
        <svg 
          className="sepsuperior-bg-wave-bottom" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 250" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#F3A70C" 
            fillOpacity="1" 
            d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,96C672,85,768,107,864,133.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"
          ></path>
        </svg>

        {/* Mascotas permanentes en el fondo */}
        <img src={CastorImg} alt="Mascota Castor" className="sepsuperior-mascot-left" />
        <img src={ConejoImg} alt="Mascota Conejo" className="sepsuperior-mascot-right" />

        <div className="sepsuperior-forgot-row">
          {step === 1 && (
            <div className="sepsuperior-forgot-card">
              <div className="sepsuperior-forgot-icon-container">
                {/* Aquí integramos el ícono personalizado */}
                <CustomKeyIcon className="sepsuperior-forgot-icon" />
              </div>

              <h2 className="sepsuperior-forgot-title">¿Olvidaste tu contraseña?</h2>
              <p className="sepsuperior-forgot-description">
                Introduce la dirección de correo electrónico asociada a tu perfil para recuperar tu contraseña.
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div className="sepsuperior-forgot-form-group">
                  <label className="sepsuperior-forgot-label">Correo electrónico</label>
                  <div className="sepsuperior-forgot-input-wrapper">
                    <FiMail className="sepsuperior-forgot-input-icon" />
                    <input
                      name="email"
                      type="text"
                      placeholder="ejemplo@correo.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`sepsuperior-forgot-input ${formik.touched.email && formik.errors.email ? 'sepsuperior-input-error' : ''
                        }`}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="sepsuperior-error-text">{formik.errors.email}</div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="sepsuperior-forgot-button"
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
                      Enviando...
                    </>
                  ) : (
                    'Enviar código'
                  )}
                </button>
              </form>

              <div className="sepsuperior-forgot-footer-text">
                ¿Recordaste tu contraseña?{' '}
                <span onClick={onBackToLogin} className="sepsuperior-forgot-link">
                  Iniciar Sesión
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="sepsuperior-forgot-card">
              <div className="sepsuperior-forgot-icon-container">
                <FiMail className="sepsuperior-forgot-icon" />
              </div>

              <h2 className="sepsuperior-forgot-title">Verifica tu código</h2>
              <p className="sepsuperior-forgot-description">
                Ingresa el código de 6 dígitos que ha sido enviado a tu correo.<br />
                <span className="sepsuperior-forgot-email-highlight">{formik.values.email || 'ejemplo@correo.com'}</span>
              </p>

              <div className="sepsuperior-code-inputs-container">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index)}
                    onKeyDown={(e) => handleCodeKeyDown(e, index)}
                    onPaste={handleCodePaste}
                    className={`sepsuperior-code-input ${codeError ? 'sepsuperior-input-error' : ''}`}
                    disabled={isLoading}
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyCode}
                className="sepsuperior-forgot-button"
                disabled={isLoading}
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
                    Validando...
                  </>
                ) : (
                  'Continuar'
                )}
              </button>

              <div className="sepsuperior-forgot-footer-text">
                ¿No recibiste el código?{' '}
                <span onClick={handleResendCode} className="sepsuperior-forgot-link">
                  Reenviar
                </span>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="sepsuperior-forgot-card">
              <div className="sepsuperior-forgot-icon-container">
                <FiLock className="sepsuperior-forgot-icon" />
              </div>

              <h2 className="sepsuperior-forgot-title">Crea una nueva contraseña</h2>
              <p className="sepsuperior-forgot-description">
                Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
              </p>

              <form onSubmit={passwordFormik.handleSubmit}>
                {/* Nueva contraseña */}
                <div className="sepsuperior-forgot-form-group">
                  <label className="sepsuperior-forgot-label">Nueva contraseña</label>
                  <div className="sepsuperior-forgot-input-wrapper">
                    <FiLock className="sepsuperior-forgot-input-icon" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingresa tu nueva contraseña"
                      value={passwordFormik.values.password}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      disabled={isLoading}
                      className={`sepsuperior-forgot-input ${passwordFormik.touched.password && passwordFormik.errors.password ? 'sepsuperior-input-error' : ''
                        }`}
                    />
                    <button
                      type="button"
                      className="sepsuperior-password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {passwordFormik.touched.password && passwordFormik.errors.password && (
                    <div className="sepsuperior-error-text">{passwordFormik.errors.password}</div>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div className="sepsuperior-forgot-form-group">
                  <label className="sepsuperior-forgot-label">Confirmar contraseña</label>
                  <div className="sepsuperior-forgot-input-wrapper">
                    <FiLock className="sepsuperior-forgot-input-icon" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirma tu nueva contraseña"
                      value={passwordFormik.values.confirmPassword}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      disabled={isLoading}
                      className={`sepsuperior-forgot-input ${passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? 'sepsuperior-input-error' : ''
                        }`}
                    />
                    <button
                      type="button"
                      className="sepsuperior-password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                    <div className="sepsuperior-error-text">{passwordFormik.errors.confirmPassword}</div>
                  )}
                </div>

                {/* Requirements Box */}
                <div className="sepsuperior-requirements-box">
                  <span className="sepsuperior-requirements-title">La contraseña debe contener:</span>
                  <ul className="sepsuperior-requirements-list">
                    {passwordFormik.values.password.length >= 6 &&
                    passwordFormik.values.confirmPassword.length >= 6 &&
                    passwordFormik.values.password === passwordFormik.values.confirmPassword ? (
                      <li className="sepsuperior-requirement-valid">
                        <svg viewBox="0 0 24 24" height="16" width="16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px', flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10" fill="#28a745" />
                          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Al menos 6 caracteres
                      </li>
                    ) : (
                      <li>Al menos 6 caracteres</li>
                    )}
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="sepsuperior-forgot-button"
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
                      Restableciendo...
                    </>
                  ) : (
                    'Restablecer Contraseña'
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 5 && (
            <div className="sepsuperior-forgot-card sepsuperior-success-card">
              {/* Colored Banner Header */}
              <img src={ContainerBg} alt="Success Header Banner" className="sepsuperior-success-banner-img" />

              <div className="sepsuperior-success-content">
                <h2 className="sepsuperior-success-title">¡Todo listo!</h2>
                <p className="sepsuperior-success-description">
                  Tu contraseña se cambió exitosamente.<br />
                  Ahora puedes acceder a tu cuenta con tu nueva contraseña de forma segura.
                </p>

                {/* Account Protected Message Box */}
                <div className="sepsuperior-protected-box">
                  <div className="sepsuperior-protected-icon-wrapper">
                    <FiShield className="sepsuperior-protected-icon" />
                  </div>
                  <div className="sepsuperior-protected-text-wrapper">
                    <div className="sepsuperior-protected-title">Tu cuenta está protegida</div>
                    <div className="sepsuperior-protected-subtitle">Hemos guardado tu nueva contraseña de forma segura</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={onBackToLogin}
                  className="sepsuperior-success-button sepsuperior-success-btn-primary"
                >
                  <FiLogIn className="sepsuperior-success-btn-icon" /> Iniciar Sesión
                </button>

                <button
                  onClick={onBackToLogin}
                  className="sepsuperior-success-button sepsuperior-success-btn-secondary"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notificación flotante verde estilo Toast de Figma */}
      {showToast && (
        <div className="sepsuperior-toast-notification">
          <div className="sepsuperior-toast-icon-container">
            <svg viewBox="0 0 24 24" height="28" width="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#00C853" />
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="sepsuperior-toast-text-wrapper">
            <div className="sepsuperior-toast-title">Código enviado</div>
            <div className="sepsuperior-toast-subtitle">
              Revisa tu bandeja de entrada, spam o correo no deseado.
            </div>
          </div>
        </div>
      )}

      {/* Notificación flotante roja estilo Toast de Figma para error */}
      {showErrorToast && (
        <div className="sepsuperior-toast-notification sepsuperior-toast-error">
          <div className="sepsuperior-toast-icon-container">
            <svg viewBox="0 0 24 24" height="28" width="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#FF0000" />
              <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="sepsuperior-toast-text-wrapper">
            <div className="sepsuperior-toast-title-error">Error</div>
            <div className="sepsuperior-toast-subtitle-error">
              {errorToastMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}