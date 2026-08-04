import React, { useState } from 'react';
import { FiMail, FiKey, FiLock, FiEye, FiEyeOff, FiCheck, FiShield, FiLogIn } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import vector2V from '../../../assets/img/vector2V.png';
import vector1 from '../../../assets/img/Vector (1).png';
import Personaje1 from '../../../assets/img/Personaje1.jpg';
import Personaje2 from '../../../assets/img/Personaje2.jpg';
import Personaje3 from '../../../assets/img/Personaje3.jpg';
import Personaje4 from '../../../assets/img/Personaje4.jpg';
import AvatarHombre from '../../../assets/img/Personaje5.jpg';
import ContainerBg from '../../../assets/img/Container.png';
import LogoSM from '../../../assets/img/LogoSM.png';
import './ForgotPasswordSEP.css';
import { BASE_API_SEP_SUPERIOR_V1 } from '../../../utils/constants';

export function ForgotPasswordSEP({ onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(Array(6).fill(''));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Formik for Step 1: Email
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Ingrese un correo electrónico válido')
        .required('El correo electrónico es obligatorio'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_API_SEP_SUPERIOR_V1}/auth/notificacion/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: values.email, lang_code: 'es' })
        });
        if (response.status === 200) {
          setStep(2);
          toast.success("Código de recuperación enviado.");
        } else if (response.status === 400) {
          toast.error("El correo electrónico ingresado no está asociado a una cuenta.");
        } else {
          toast.error("Ocurrió un error al enviar el código. Intente de nuevo.");
        }
      } catch (error) {
        toast.error("Ocurrió un error al enviar el código. Intente de nuevo.");
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
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('Debe confirmar su contraseña'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_API_SEP_SUPERIOR_V1}/user/users/establecer_nuevo_password/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formik.values.email,
            new_password: values.password
          })
        });
        if (response.status === 200) {
          setStep(5);
        } else {
          toast.error("Ocurrió un error al actualizar la contraseña.");
        }
      } catch (error) {
        toast.error("Ocurrió un error al restablecer la contraseña. Intente de nuevo.");
      } finally {
        setIsLoading(false);
      }
    }
  });

  // Step 3 logic: Verification Code Handlers
  const handleCodeChange = (value, index) => {
    if (value !== '' && !/^[0-9]$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input if filled
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
      const newCode = pasteData.split('');
      setCode(newCode);
      const lastInput = document.getElementById('code-input-5');
      if (lastInput) lastInput.focus();
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      toast.warn("Por favor ingrese el código de 6 dígitos completo.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_SEP_SUPERIOR_V1}/user/users/validar_token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: fullCode })
      });
      if (response.status === 200) {
        setStep(4);
      } else {
        toast.error("El código proporcionado es incorrecto o ha expirado.");
      }
    } catch (error) {
      toast.error("Error al validar el código. Inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_SEP_SUPERIOR_V1}/auth/notificacion/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formik.values.email, lang_code: 'es' })
      });
      if (response.status === 200) {
        toast.success("Código reenviado con éxito.");
      } else {
        toast.error("Ocurrió un error al reenviar el código.");
      }
    } catch (error) {
      toast.error("Error al reenviar el código. Inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sep-forgot-password-container">
      {/* Background Waves */}
      <img src={vector2V} alt="Wave Top" className="sep-bg-wave-top" />
      <img src={vector1} alt="Wave Bottom" className="sep-bg-wave-bottom" />

      <div className="sep-forgot-row">
        {step === 1 && (
          <>
            {/* Step 1: Cartoon Character on the Left */}
            <img
              src={Personaje1}
              alt="Character Businessman"
              className="sep-forgot-character-left"
            />

            {/* Step 1 Card */}
            <div className="sep-forgot-card">
              <div className="sep-forgot-icon-container">
                <FiKey className="sep-forgot-icon" />
              </div>

              <h2 className="sep-forgot-title">¿Olvidaste tu contraseña?</h2>
              <p className="sep-forgot-description">
                Introduzca la dirección de correo electrónico asociada a su perfil para recuperar su contraseña.
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div className="sep-forgot-form-group">
                  <label className="sep-forgot-label">Correo electrónico</label>
                  <div className="sep-forgot-input-wrapper">
                    <FiMail className="sep-forgot-input-icon" />
                    <input
                      name="email"
                      type="text"
                      placeholder="ejemplo@correo.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`sep-forgot-input ${formik.touched.email && formik.errors.email ? 'sep-input-error' : ''
                        }`}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="sep-error-text">{formik.errors.email}</div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="sep-forgot-button"
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
                    'Enviar Codigo'
                  )}
                </button>
              </form>

              <div className="sep-forgot-footer-text">
                ¿Recordaste tu contraseña?{' '}
                <span onClick={onBackToLogin} className="sep-forgot-link">
                  Iniciar Sesión
                </span>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Step 2 Card */}
            <div className="sep-forgot-card step-2">
              <img src={LogoSM} alt="Mente Conecta Salud Mental Logo" className="sep-forgot-logo-sm" />

              <h2 className="sep-forgot-title step-2">Código enviado</h2>
              <p className="sep-forgot-description step-2">
                Mensaje enviado. Revise su bandeja de entrada, spam o correo no deseado.
              </p>

              <button onClick={() => setStep(3)} className="sep-forgot-button step-2">
                Ok
              </button>
            </div>

            {/* Step 2: Cartoon Character on the Right */}
            <img
              src={Personaje2}
              alt="Character Woman"
              className="sep-forgot-character-right"
            />
          </>
        )}

        {step === 3 && (
          <>
            {/* Step 3: Cartoon Character on the Left */}
            <img
              src={Personaje3}
              alt="Character Teacher Male"
              className="sep-forgot-character-left sep-character-3"
            />

            {/* Step 3 Card */}
            <div className="sep-forgot-card">
              <div className="sep-forgot-icon-container step-3">
                <FiMail className="sep-forgot-icon" />
              </div>

              <h2 className="sep-forgot-title">Verifica tu código</h2>
              <p className="sep-forgot-description">
                Ingresa el código de 6 dígitos que ha sido enviado a tu correo.<br />
                <strong className="sep-forgot-email-highlight">{formik.values.email || 'ejemplo@correo.com'}</strong>
              </p>

              <div className="sep-code-inputs-container">
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
                    className="sep-code-input"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyCode}
                className="sep-forgot-button"
              >
                Continuar
              </button>

              <div className="sep-forgot-footer-text">
                ¿No recibiste el código?{' '}
                <span onClick={handleResendCode} className="sep-forgot-link">
                  Reenviar
                </span>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            {/* Step 4 Card */}
            <div className="sep-forgot-card step-4">
              <div className="sep-forgot-icon-container step-4">
                <FiLock className="sep-forgot-icon" />
              </div>

              <h2 className="sep-forgot-title">Crea una nueva contraseña</h2>
              <p className="sep-forgot-description">
                Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
              </p>

              <form onSubmit={passwordFormik.handleSubmit}>
                {/* Nueva contraseña */}
                <div className="sep-forgot-form-group">
                  <label className="sep-forgot-label">Nueva contraseña</label>
                  <div className="sep-forgot-input-wrapper">
                    <FiLock className="sep-forgot-input-icon" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingresa tu nueva contraseña"
                      value={passwordFormik.values.password}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      disabled={isLoading}
                      className={`sep-forgot-input ${passwordFormik.touched.password && passwordFormik.errors.password ? 'sep-input-error' : ''
                        }`}
                    />
                    <button
                      type="button"
                      className="sep-password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {passwordFormik.touched.password && passwordFormik.errors.password && (
                    <div className="sep-error-text">{passwordFormik.errors.password}</div>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div className="sep-forgot-form-group">
                  <label className="sep-forgot-label">Confirmar contraseña</label>
                  <div className="sep-forgot-input-wrapper">
                    <FiLock className="sep-forgot-input-icon" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirma tu nueva contraseña"
                      value={passwordFormik.values.confirmPassword}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      disabled={isLoading}
                      className={`sep-forgot-input ${passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? 'sep-input-error' : ''
                        }`}
                    />
                    <button
                      type="button"
                      className="sep-password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                    <div className="sep-error-text">{passwordFormik.errors.confirmPassword}</div>
                  )}
                </div>

                {/* Requirements Box */}
                <div className="sep-requirements-box">
                  <span className="sep-requirements-title">La contraseña debe contener:</span>
                  <ul className="sep-requirements-list">
                    <li>Al menos 6 caracteres</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="sep-forgot-button"
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

            {/* Step 4: Cartoon Character on the Right */}
            <img
              src={Personaje4}
              alt="Character Teacher Female"
              className="sep-forgot-character-right"
            />
          </>
        )}

        {step === 5 && (
          <>
            {/* Step 5: Cartoon Character avatar-hombre on the Left */}
            <img
              src={AvatarHombre}
              alt="Avatar Hombre"
              className="sep-forgot-character-left sep-character-avatar"
            />

            {/* Step 5 Card */}
            <div className="sep-forgot-card sep-success-card">
              {/* Colored Banner Header */}
              <img src={ContainerBg} alt="Success Header Banner" className="sep-success-banner-img" />

              <div className="sep-success-content">
                <h2 className="sep-success-title">¡Todo listo!</h2>
                <p className="sep-success-description">
                  Tu contraseña se cambió exitosamente.<br />
                  Ahora puedes acceder a tu cuenta con tu nueva contraseña de forma segura.
                </p>

                {/* Account Protected Message Box */}
                <div className="sep-protected-box">
                  <div className="sep-protected-icon-wrapper">
                    <FiShield className="sep-protected-icon" />
                  </div>
                  <div className="sep-protected-text-wrapper">
                    <div className="sep-protected-title">Tu cuenta está protegida</div>
                    <div className="sep-protected-subtitle">Hemos guardado tu nueva contraseña de forma segura</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={onBackToLogin}
                  className="sep-success-button sep-success-btn-primary"
                >
                  <FiLogIn className="sep-success-btn-icon" /> Iniciar Sesión
                </button>

                <button
                  onClick={onBackToLogin}
                  className="sep-success-button sep-success-btn-secondary"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
