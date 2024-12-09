import React, { useState } from 'react';
import { GiBrain, GiMaterialsScience } from "react-icons/gi";

import { IconButton } from '../../ui';
import { FormLogin } from '../formLogin/FormLogin';

export function SelectLogin() {

    const [view, setView] = useState(0)

    const views = [
        <SelectLogin />,
        <FormLogin />
    ]

    return views[view]




    function SelectLogin() {
        return (
            <div>
                <center><h3><b>¿A dónde quieres acceder?</b></h3></center>
                <br />
                <div className='conteiner-select'>
                    <IconButton
                        text="Mente Conecta"
                        icon={<GiBrain />}
                        color="cadetblue"
                        size="xl"

                        onChangeMethod={() => setView(1)}
                    />
                    <a href='http://menteconecta.net/jupyterhub/'>
                        <IconButton
                            text="Jupyter Notebook"
                            icon={<GiMaterialsScience />}
                            color="cadetblue"
                            size="xl"
                        />
                    </a>
                </div>
                <br />
                <br />
            </div>
        )
    }

}
