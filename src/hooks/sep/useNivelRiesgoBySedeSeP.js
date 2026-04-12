import { useState, useCallback } from 'react';
import { useAuth } from '../useAuth';
import {
  getNivelRiesgoBySedeSeP,
  getNivelRiesgoAdminSeP,
} from '../../api/sep';

/**
 * Hook para obtener nivel de riesgo por sede en SEP
 * Propósito: Indicadores de riesgo por sede con caché
 */
export function useNivelRiesgoBySedeSeP() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingBySede, setLoadingBySede] = useState({});
  const [dataBySede, setDataBySede] = useState({});
  const [error, setError] = useState(null);
  const [errorBySede, setErrorBySede] = useState({});

  const getSedeData = useCallback(
    async (sedeId) => {
      // Retornar del caché si existe
      if (dataBySede[sedeId]) {
        return dataBySede[sedeId];
      }

      try {
        setLoadingBySede((prev) => ({ ...prev, [sedeId]: true }));
        setErrorBySede((prev) => ({ ...prev, [sedeId]: null }));

        const data = await getNivelRiesgoBySedeSeP(sedeId, auth.token);
        setDataBySede((prev) => ({ ...prev, [sedeId]: data }));
        return data;
      } catch (err) {
        setErrorBySede((prev) => ({ ...prev, [sedeId]: err.message }));
        throw err;
      } finally {
        setLoadingBySede((prev) => ({ ...prev, [sedeId]: false }));
      }
    },
    [auth.token, dataBySede]
  );

  const getAdminData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNivelRiesgoAdminSeP(auth.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  return {
    loading,
    loadingBySede,
    dataBySede,
    error,
    errorBySede,
    getSedeData,
    getAdminData,
  };
}
