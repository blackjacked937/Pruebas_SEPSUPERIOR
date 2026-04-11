import { BASE_API_SEP_V1 } from '../../utils/constants';

// ==================== GESTORES SEP ====================

/**
 * Obtiene la lista de gestores registrados en SEP
 * Solo SuperGestores pueden acceder
 */
export async function getGestoresSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/Super-Gestores/gestores/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener la lista de gestores SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Registra un nuevo gestor en SEP
 */
export async function registerGestorSeP(data, token) {
  try {
    const url = `${BASE_API_SEP_V1}/Super-Gestores/gestores/`;
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
      throw new Error("Error al registrar gestor SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene conteo por nivel de riesgo para SuperGestor por sede
 */
export async function getConteoNivelRiesgoSePBySedeApi(id, token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/${id}/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener conteo por nivel de riesgo SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene conteo por nivel de riesgo para Gestor Admin de su sede
 */
export async function getConteoNivelRiesgoSePAdminApi(token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener conteo por nivel de riesgo para admin SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
