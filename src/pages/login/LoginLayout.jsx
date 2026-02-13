import React from 'react';
import { Link } from 'react-router-dom';
import { FcLock } from "react-icons/fc";
import { SelectLogin } from '../../components/login';
import './LoginLayout.css';

export function LoginLayout() {

    return (
        <div className='conteiner'>
            {/* <div className='sub-conteiner text-center mb-5'>
                <h1>Bienvenido de Nuevo</h1>
                <p>Accede a tu espacio</p>
                <img src="/image/welcome.png" alt="welcome-image" />
            </div> */}
            <div className='sub-conteiner'>
                <div>
                    <div>
                        <SelectLogin />
                    </div>
                    <div className='footer-text'>
                        <Link to="/"><small><b>Regresar</b></small></Link>
                    </div>
                </div>
            </div>
            {/* <div className='sub-conteiner text-center p-4 mt-5'>
                <FcLock size={20} className='me-2' />
                <span>Tu privacidad es nuestra prioridad. Todos tus datos están crifados y protegidos.</span>
            </div> */}
        </div>
    )
}
