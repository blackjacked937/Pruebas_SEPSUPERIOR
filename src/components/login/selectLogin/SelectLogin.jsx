import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiMaterialsScience } from "react-icons/gi";
import { IconButton } from '../../ui';
import imagen from '../../../assets/img/logoColor.png'
import isem from '../../../assets/img/Colibri_Vertical_FondoClaro 02.png'
import jupyter from '../../../assets/img/Jupyter_log.png'
import logoMCA from '../../../assets/img/logoMCA.png'
import logoSep from '../../../assets/img/logoSep.png'
import logoSesyn from '../../../assets/img/logoSesyn.png'
import './SelectLogin.css'


export function SelectLogin({ onSelectView }) {
    const navigate = useNavigate();

    return (
        <div className="select-login-container">
            <div className="select-login-header">
                <h1 className="select-login-title">¿A dónde quieres acceder?</h1>
            </div>

            <div className='card-select-login'>
                <IconButton
                    image={isem}
                    text="Mente Conecta ISEM"
                    onChangeMethod={() => navigate('/login/isem')}
                />
                <a href='#'>
                    <IconButton
                        text="Jupyter Notebook"
                        image={jupyter}
                    />
                </a>
                <IconButton
                    text="Mente Conecta"
                    image={imagen}
                    onChangeMethod={() => navigate('/login/fase1')}
                />
                <IconButton
                    text="Mente Conecta Adicciones"
                    image={logoMCA}
                    onChangeMethod={() => navigate('/login/conasama')}
                />
                {/* Adaptar en base a la sep */}
                <IconButton
                    text="Mente Conecta SEP"
                    image={logoSep}
                    onChangeMethod={() => navigate('/login/sep')}
                />
                <IconButton
                    text="Mente Conecta SESyN"
                    image={logoSesyn}
                    onChangeMethod={() => navigate('/login/sesyn')}
                />
            </div>

            <div className="select-login-footer">
                <Link to="/" className="select-login-back-link">Regresar</Link>
            </div>
        </div>
    )
}
