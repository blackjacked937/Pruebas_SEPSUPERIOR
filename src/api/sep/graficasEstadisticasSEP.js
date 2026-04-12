import { BASE_API_SEP_V1 } from '../../utils/constants';

// ==================== GRÁFICAS Y ESTADÍSTICAS SEP ====================

/**
 * Obtiene conteo por nivel de riesgo y categoría para SuperGestor por sede
 */
export async function getConteoPorNivelRiesgoCategoriaBySedeSeP(idSede, token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/${idSede}/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener conteo por nivel y categoría SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene conteo por nivel de riesgo y categoría para Gestor Admin de su sede
 */
export async function getConteoPorNivelRiesgoCategoriaSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/ConteoPorNivelRiesgo/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener conteo por nivel y categoría para admin SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene datos de gráficas por preguntas para SuperGestor por sede
 */
export async function getGraficasPreguntasBySedeSeP(idSede, token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/GraficaPreguntas/${idSede}/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener gráficas de preguntas por sede SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene datos de gráficas por preguntas para Gestor Admin de su sede
 */
export async function getGraficasPreguntasSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/GraficaPreguntas/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener gráficas de preguntas para admin SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene rango de preguntas para SuperGestor por sede
 */
export async function getRangoDePreguntasBySedeSeP(idSede, token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/RangoDePreguntas/${idSede}/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener rango de preguntas por sede SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene rango de preguntas para Gestor Admin de su sede
 */
export async function getRangoDePreguntasSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/dashboard/Dashbord_Admin/RangoDePreguntas/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener rango de preguntas para admin SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
