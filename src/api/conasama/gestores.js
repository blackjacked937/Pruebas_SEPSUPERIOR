import { BASE_API_CONASAMA_V1 } from "../../utils/constants";

export async function registerGestorApi(data, token) {
    try {
        const url = `${BASE_API_CONASAMA_V1}/Super-Gestores/gestores/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(result.message || "Error al registrar el gestor");
        }
        return result;
    } catch (error) {
        throw error;
    }
}
