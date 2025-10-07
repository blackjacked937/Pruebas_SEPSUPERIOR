import React, { useState } from 'react';
import { GiBrain, GiMaterialsScience, GiBrainStem } from "react-icons/gi";

import { IconButton } from '../../ui';
import { FormLogin } from '../formLogin/FormLogin';
import imagen from '../../../assets/img/logoColor.png'

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
                <div className='conteiner-select d-flex gap-5 mr-3 mb-3 flex-wrap mt-3'>
                    <IconButton
                        text="Mente Conecta ISEM"
                        icon={<GiBrain />}
                        color="#4DB6AC"
                        size="xl"

                        onChangeMethod={() => setView(1)}
                    />
                    <a href='http://menteconecta.net/jupyterhub/'>
                        <IconButton
                            text="Jupyter Notebook"
                            icon={<GiMaterialsScience />}
                            color="#4DB6AC"
                            size="xl"
                        />
                    </a>
                    <IconButton
                        text="Mente Conecta Fase 1"
                        image={imagen}
                        color="#4DB6AC"
                        size="xl"

                        onChangeMethod={() => setView(2)}
                    />
                </div>
                <br />
                <br />
            </div>
        )
    }

}
