import React, { useState } from 'react';
import { GiMaterialsScience } from "react-icons/gi";

import { IconButton } from '../../ui';
import { FormLogin } from '../formLogin/FormLogin';
import imagen from '../../../assets/img/logoColor.png'
import isem from '../../../assets/img/Colibri_Vertical_FondoClaro 02.png'
import jupyter from '../../../assets/img/Jupyter_log.png'
import './SelectLogin.css'


export function SelectLogin() {

    const [view, setView] = useState(0)

    const views = [
        <SelectLogin />,
        <FormLogin typeLogin={1}/>,
        <FormLogin typeLogin={2}/>
    ]

    return views[view]




    function SelectLogin() {
        return (
            <div>
                <center><h3><b>¿A dónde quieres acceder?</b></h3></center>
                <br />
                <div className=' card-select-login'>
                    <IconButton
                        image={isem}
                        text="Mente Conecta ISEM"
                        onChangeMethod={() => setView(1)}
                    />
                    <a href='http://menteconecta.net/jupyterhub/'>
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
                </div>
                <br />
                <br />
            </div>
        )
    }

}
