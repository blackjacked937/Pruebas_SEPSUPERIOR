import { BASE_API_SEP_V1 } from "../../utils/constants";

// ==================== NOTICIAS SEP ====================

/**
 * Obtiene lista de noticias para SEP
 */
export async function getNoticiasSeP(token) {
  try {
    const url = `${BASE_API_SEP_V1}/catalogo/noticias/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener noticias SEP");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Crea una nueva noticia en SEP (solo SuperGestores)
 */
export async function createNoticiaSeP(data, token) {
  const url = `${BASE_API_SEP_V1}/catalogo/noticias/`;
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, params);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: "Error interno del servidor" };
      }
      throw {
        response: {
          status: response.status,
          data: errorData,
        },
      };
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Elimina una noticia en SEP (solo SuperGestores)
 */
export async function deleteNoticiaSeP(token, idNoticia) {
  try {
    const url = `${BASE_API_SEP_V1}/catalogo/noticias/${idNoticia}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 204) {
      throw new Error("Error al eliminar noticia SEP");
    }
    return true;
  } catch (error) {
    throw error;
  }
}
