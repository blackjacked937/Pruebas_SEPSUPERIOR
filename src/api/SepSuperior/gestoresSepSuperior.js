import { BASE_API_SEP_SUPERIOR_V1 } from '../../utils/constants';

// ==================== GESTORES SEP SUPERIOR ====================

/**
 * Obtiene la lista de gestores registrados en SEP Superior
 */
export async function getGestoresSepSuperior(token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/Super-Gestores/gestores/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener la lista de gestores SEP Superior");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Registra un nuevo gestor en SEP Superior
 */
export async function registerGestorSepSuperior(data, token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/Super-Gestores/gestores/`;
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);

    if (response.status !== 201) {
      let backendData = null;
      try {
        backendData = await response.json();
      } catch (parseError) {
        backendData = null;
      }

      const message =
        backendData?.message ||
        backendData?.error ||
        backendData?.detail ||
        "Error al registrar gestor SEP Superior";

      const customError = new Error(message);
      customError.status = response.status;
      customError.data = backendData;
      throw customError;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

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

/**
 * Obtiene conteo por nivel de riesgo para SuperGestor por sede
 */
export async function getConteoNivelRiesgoSepSuperiorBySedeApi(id, token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/${id}/`;

    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error("Error al obtener conteo por nivel de riesgo SEP Superior");
    }

    const result = await response.json();
    return mergeCuestionarios(result);
  } catch (error) {
    console.error("[getConteoNivelRiesgoSepSuperiorBySedeApi] Error:", error);
    return defaultCuestionarios;
  }
}

/**
 * Obtiene conteo por nivel de riesgo para Gestor Admin de su sede
 */
export async function getConteoNivelRiesgoSepSuperiorAdminApi(token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error("Error al obtener conteo por nivel de riesgo para admin SEP Superior");
    }

    const result = await response.json();
    return mergeCuestionarios(result);
  } catch (error) {
    console.error("[getConteoNivelRiesgoSepSuperiorAdminApi] Error:", error);
    return defaultCuestionarios;
  }
}
