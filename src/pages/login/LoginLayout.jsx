import React, { useState } from 'react';
import { SelectLogin } from '../../components/login/selectLogin/SelectLogin';
import { FormLogin } from '../../components/login/formLogin/FormLogin';
import { ForgotPasswordSEP } from '../../components/login/forgotPassword/ForgotPasswordSEP';
import { ForgotPasswordSEPSuperior } from '../../components/login/forgotPassword/ForgotPasswordSEPSuperior';
import logoColor from '../../assets/img/logoColor.png';
import './LoginLayout.css';

export function LoginLayout() {
    const [view, setView] = useState(0);
    const [isForgot, setIsForgot] = useState(false);

    React.useEffect(() => {
        window.__loginView = view;
        window.dispatchEvent(new CustomEvent('loginViewChange', { detail: view }));
        setIsForgot(false);
    }, [view]);

    if (view === 0) {
        // Layout de selección de plataforma con bordes curvos
        return (
            <div className='select-layout-container'>
                <div className='costado-left'></div>
                <div className='costado-right'></div>

                <div className='login-content-wrapper'>
                    <SelectLogin onSelectView={(v) => setView(v)} />
                </div>
            </div>
        );
    }

    if (view === 4 && isForgot) {
        return <ForgotPasswordSEP onBackToLogin={() => setIsForgot(false)} />;
    }

    if (view === 5 && isForgot) {
        return <ForgotPasswordSEPSuperior onBackToLogin={() => setIsForgot(false)} />;
    }

    // Layout split-screen para formularios de login
    return (
        <div className="login-layout-container">
            {/* Panel izquierdo: sidebar con logo */}
            <div className="login-left-panel">
                <div className="logo-container">
                    <img src={logoColor} alt="Mente Conecta Logo" className="login-logo-img" />
                </div>
            </div>

            {/* Panel derecho: fondo azul con formulario */}
            <div className="login-right-panel">
                {/* Logo móvil: solo visible en pantallas pequeñas */}
                <div className="mobile-logo-container">
                    <img src={logoColor} alt="Mente Conecta Logo" className="login-logo-img" />
                </div>

                <FormLogin typeLogin={view} onBack={() => setView(0)} onForgotPassword={() => setIsForgot(true)} />
            </div>
        </div>
    );
}
