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
            const errorMessage = result.email?.[0] || result.message || "Error al registrar";
            throw new Error(errorMessage);
        }
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getGestoresApi(token) {
    try {
        const url = `${BASE_API_CONASAMA_V1}/Super-Gestores/gestores/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        if (response.status !== 200) {
            throw new Error("Error al obtener la lista de gestores");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

//super Admin Conasama

const defaultCuestionarios = [
  { id_cuestionario: 1, Cuestionario: "Alcohol", score: 0 },
  { id_cuestionario: 2, Cuestionario: "Ansiedad", score: 0 },
  { id_cuestionario: 3, Cuestionario: "Conducta Alimentaria", score: 0 },
  { id_cuestionario: 4, Cuestionario: "Depresión", score: 0 },
  { id_cuestionario: 5, Cuestionario: "Drogas", score: 0 },
  { id_cuestionario: 6, Cuestionario: "Riesgo de Suicidio", score: 0 },
  { id_cuestionario: 7, Cuestionario: "Tabaco", score: 0 },
  { id_cuestionario: 8, Cuestionario: "Malestar Emocional", score: 0 },
];

function mergeCuestionarios(result) {
  if (!Array.isArray(result)) {
    return defaultCuestionarios;
  }
  const merged = defaultCuestionarios.map(def => {
    const match = result.find(item => 
      item.id_cuestionario === def.id_cuestionario || 
      String(item.Cuestionario).toLowerCase().trim() === String(def.Cuestionario).toLowerCase().trim()
    );
    return match ? { ...def, ...match } : def;
  });
  const extra = result.filter(item => 
    !defaultCuestionarios.some(def => 
      def.id_cuestionario === item.id_cuestionario || 
      String(def.Cuestionario).toLowerCase().trim() === String(item.Cuestionario).toLowerCase().trim()
    )
  );
  return [...merged, ...extra];
}

export async function getConteoNivelRiesgoApi(id, token) {
    try {
        const url = `${BASE_API_CONASAMA_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/${id}/`;

        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();

        if (response.status !== 200) {
            throw new Error(result.message || "Error al obtener el conteo de nivel de riesgo");
        }

        return mergeCuestionarios(result);
    } catch (error) {
        console.error("[getConteoNivelRiesgoApi] Error:", error);
        return defaultCuestionarios;
    }
}

//Admin Conasama

export async function getConteoNivelRiesgoAdminApi(token) {
    try {
        const url = `${BASE_API_CONASAMA_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();

        if (response.status !== 200) {
            throw new Error(result.message || "Error al obtener datos de Admin");
        }
        return mergeCuestionarios(result);
    } catch (error) {
        console.error("[getConteoNivelRiesgoAdminApi] Error:", error);
        return defaultCuestionarios;
    }
}
