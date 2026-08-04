import { BASE_API_SEP_SUPERIOR_V1 } from '../../utils/constants';

// ==================== NOTICIAS SEP ====================

/**
 * Obtiene lista de noticias para SEP
 */
export async function getNoticiasSePSuperior(token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/noticias/`;
    const params = {
      
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Error al obtener noticias SEP Superior");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Crea una nueva noticia en SEP (solo SuperGestores)
 */
export async function createNoticiaSePSuperior(data, token) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/noticias/`;
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 201) {
      throw result;
    }
    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Editar una noticia en SEP (solo SuperGestores)
 */
export async function updateNoticiaSePSuperior(token, idNoticia, data) {
    try {
        const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/noticias/${idNoticia}/`;
        const params = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        if (response.status !== 200) {
            throw result;
        }
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Elimina una noticia en SEP (solo SuperGestores)
 */
export async function deleteNoticiaSePSuperior(token, idNoticia) {
  try {
    const url = `${BASE_API_SEP_SUPERIOR_V1}/catalogo/noticias/${idNoticia}/`;
    const params = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status !== 204) {
      throw new Error("Error al eliminar noticia SEP Superior");
    }
    return true;
  } catch (error) {
    throw error;
  }
}
