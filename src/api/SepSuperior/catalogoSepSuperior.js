import { BASE_API_SEP_SUPERIOR_V1 } from '../../utils/constants';

export async function getTiposPacienteSepSuperior(token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/tipo_paciente_opciones/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener tipos de paciente SEP Superior");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}


export async function getHospitalesSepSuperior(token) {
  const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/hospitales/`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.status !== 200) {
    throw new Error("Error al obtener hospitales SEP Superior");
  }
  return await response.json();
}

/**
 * Obtiene opciones de categorías disponibles en SEP Superior
 */
export async function getCategoriesSepSuperior(token) {
  const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/categorias/`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.status !== 200) {
    throw new Error("Error al obtener categorías SEP Superior");
  }
  return await response.json();
}

export async function getPaisSepSuperiorApi() {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/pais/`
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result.message || "Error al obtener datos de pais");
    }
    return result;
  }
  catch (error) {
    throw error;
  }
}

export async function getEstadosByPaisSepSuperiorApi(idPais) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/estado/bypais/${idPais}/`
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result.message || "Error al obtener datos de pais");
    }
    return result;
  }
  catch (error) {
    throw error;
  }
}

export async function getCiudadesByEstadoSepSuperiorApi(idEstado) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/ciudad/byestado/${idEstado}/`
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result.message || "Error al obtener datos de pais");
    }
    return result;
  }
  catch (error) {
    throw error;
  }
}


export async function getSubsistemasSuperior(token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/ciudad/`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status !== 200) {
      throw new Error(`Error ${response.status}: al obtener subsistemas`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getUniversidadesSuperior(token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/hospitales/`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status !== 200) {
      throw new Error(`Error ${response.status}: al obtener universidades`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}


export async function getNivelRiesgoByUniversidad(sedeId, token) {
  try {
    
    const url = sedeId
      ? `${BASE_API_SEP_SUPERIOR_V1}/paciente2/pacientes/riesgo/${sedeId}/`
      : `${BASE_API_SEP_SUPERIOR_V1}/paciente2/pacientes/riesgo/`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status !== 200) {
      throw new Error(`Error ${response.status}: al obtener pacientes en riesgo`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}