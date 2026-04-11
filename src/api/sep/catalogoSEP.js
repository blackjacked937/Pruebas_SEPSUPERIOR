import { BASE_API_SEP_V1 } from '../../utils/constants';

// ==================== CATÁLOGO SEP ====================

/**
 * Obtiene tipos de pacientes disponibles en SEP
 */
export async function getTiposPacienteSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/catalogo/tipos-paciente/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener tipos de paciente SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene lista de hospitales/sedes en SEP
 */
export async function getHospitalesSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/catalogo/hospitales/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener hospitales SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene opciones de categorías disponibles en SEP
 */
export async function getCategoriesSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/catalogo/categorias/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener categorías SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
