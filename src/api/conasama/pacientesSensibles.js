// API PARA PACIENTES SENSIBLES CONASAMA

import { BASE_API_CONASAMA_V1 } from "../../utils/constants";

export async function getPacientesSensiblesApi(token) {
    try {
        const url = `${BASE_API_CONASAMA_V1}/paciente2/pacientes/sencible/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
