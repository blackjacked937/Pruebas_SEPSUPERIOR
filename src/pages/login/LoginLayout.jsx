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
            <div
                style={{
                    backgroundColor: "aliceblue",
                    margin: "10px auto",
                    border: "0.8px solid #F3F4F6",
                    borderRadius: "25px",
                    padding: "15px",
                    boxShadow: "0px 20px 12px 2px rgba(0,0,0,0.1)",
                    width: '88%'
                }}
            >
                <div className='flex'>
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
        </div >
    )
}
