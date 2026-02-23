// HOOKS PARA GRAFICAS DE CONASAMA


/*import { useState } from "react";
import { useAuth } from ".";
import { getConteoPorNivelRiesgoCategoriaApi, getOpcionesPreguntaUsuariosApi } from "../api/dashboardf1";


export function useDashboardsF1() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [pacientes, setPacientes] = useState(undefined);

    const getConteoPorNivelRiesgoCategoria = async () => {
        setLoading(true);
        try {
            const result = await getConteoPorNivelRiesgoCategoriaApi(auth.token);
            return result;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    const getOpcionesPreguntaUsuarios = async (preguntaId) => {
        setLoading(true);
        try {
            const result = await getOpcionesPreguntaUsuariosApi(auth.token, preguntaId);
            return result;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return {
        loading,
        pacientes,
        getConteoPorNivelRiesgoCategoria,
        getOpcionesPreguntaUsuarios
    }
}*/