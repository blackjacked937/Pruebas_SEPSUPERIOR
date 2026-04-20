import React, { useState } from 'react';
import { GiMaterialsScience } from "react-icons/gi";

import { IconButton } from '../../ui';
import { FormLogin } from '../formLogin/FormLogin';
import imagen from '../../../assets/img/logoColor.png'
import isem from '../../../assets/img/Colibri_Vertical_FondoClaro 02.png'
import jupyter from '../../../assets/img/Jupyter_log.png'
import logoMCA from '../../../assets/img/logoMCA.png'
import logoSep from '../../../assets/img/logoSep.png'
import './SelectLogin.css'


export function SelectLogin() {

    const [view, setView] = useState(0)

    const views = [
        <SelectLogin key="menu" />,
        <FormLogin key="isem" typeLogin={1} onBack={() => setView(0)} />,
        <FormLogin key="fase1" typeLogin={2} onBack={() => setView(0)} />,
        <FormLogin key="conasama" typeLogin={3} onBack={() => setView(0)} />,
        // form de las SEP
        <FormLogin key="sep" typeLogin={4} onBack={() => setView(0)} />
    ];

    return views[view]

    function SelectLogin() {
        return (
            <div>
                <center style={{ marginTop: '40px', color: '#04547B' }}><h2 ><b>¿A dónde quieres acceder?</b></h2></center>
                <br />
                <div className=' card-select-login'>
                    <IconButton
                        image={isem}
                        text="Mente Conecta ISEM"
                        onChangeMethod={() => setView(1)}
                    />
                    {/* <a href='http://menteconecta.net/jupyterhub/'> */}
                    <a href='#'>
                        <IconButton
                            text="Jupyter Notebook"
                            image={jupyter}
                        />
                    </a>
                    <IconButton
                        text="Mente Conecta"
                        image={imagen}
                        onChangeMethod={() => setView(2)}
                    />
                    <IconButton
                        text="Mente Conecta Adicciones"
                        image={logoMCA}
                        onChangeMethod={() => setView(3)}
                    />
                    {/* Adaptar en base a la sep */}
                    <IconButton
                        text="Mente Conecta SEP"
                        image={logoSep}
                        onChangeMethod={() => setView(4)}
                    />
                </div>
                <br />
                <br />
            </div>
        )
    }

}
