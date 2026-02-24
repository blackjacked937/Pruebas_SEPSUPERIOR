// HOOK PARA NIVEL DE RIESGO POR SEDE CONASAMA

import { useState } from "react";
import { useAuth } from "../useAuth";
import { getNivelRiesgoBySede } from '../../api/conasama/nivelRiesgoBySede';

export function useNivelRiesgoBySede() {
    const { auth } = useAuth();
    const [dataBySede, setDataBySede] = useState({});
    const [loadingBySede, setLoadingBySede] = useState(false);
    const [errorBySede, setErrorBySede] = useState(null);

    // IDs de sedes hardcodeadas (del 1 al 6)
    const SEDES_IDS = [1, 2, 3, 4, 5, 6];

    const getAllSedesData = async () => {
        try {
            setLoadingBySede(true);
            setErrorBySede(null);
            
            // Crear un objeto para almacenar los datos de cada sede
            const allData = {};
            
            // Hacer las llamadas a las 6 APIs
            const promises = SEDES_IDS.map(async (sedeId) => {
                try {
                    const response = await getNivelRiesgoBySede(auth.token, sedeId);
                    allData[sedeId] = response;
                } catch (error) {
                    console.log(`Error al obtener datos de sede ${sedeId}:`, error);
                    allData[sedeId] = [];
                }
            });

            await Promise.all(promises);
            
            console.log('Datos de todas las sedes:', allData);
            setDataBySede(allData);
            setLoadingBySede(false);
        } catch (error) {
            setLoadingBySede(false);
            setErrorBySede(error);
            console.log('Error al obtener datos de sedes:', error);
        }
    };

    const getSedeData = async (sedeId) => {
        try {
            const response = await getNivelRiesgoBySede(auth.token, sedeId);
            setDataBySede(prev => ({
                ...prev,
                [sedeId]: response
            }));
            return response;
        } catch (error) {
            console.log(`Error al obtener datos de sede ${sedeId}:`, error);
            throw error;
        }
    };

    return {
        dataBySede,
        loadingBySede,
        errorBySede,
        getAllSedesData,
        getSedeData,
        SEDES_IDS
    }
}
