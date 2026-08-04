import { useState, useCallback } from 'react';
import { useAuth } from '../useAuth';
import {
  getConteoPorNivelRiesgoCategoriaBySedeSePS,
  getGraficasPreguntasBySedeSePS,
  getRangoDePreguntasBySedeSePS,
  getConteoPorNivelRiesgoCategoriaSePS,
  getGraficasPreguntasSePS,
  getRangoDePreguntasSePS,
} from '../../api/SepSuperior';

export function useGraficasSuperiorSeP() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==================== SUPER GESTOR ====================

  const getConteoPorNivelRiesgoCategoriaBySedeSeP = useCallback(
    async (idSede) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getConteoPorNivelRiesgoCategoriaBySedeSePS(idSede, auth.token);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [auth.token]
  );

  const getGraficasPreguntasBySedeSeP = useCallback(
    async (idSede) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getGraficasPreguntasBySedeSePS(idSede, auth.token);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [auth.token]
  );

  const getRangoDePreguntasBySedeSeP = useCallback(
    async (idSede) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRangoDePreguntasBySedeSePS(idSede, auth.token);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [auth.token]
  );

  // ==================== GESTOR ADMIN ====================

  const getConteoPorNivelRiesgoCategoriaSeP = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getConteoPorNivelRiesgoCategoriaSePS(auth.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const getGraficasPreguntasSeP = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGraficasPreguntasSePS(auth.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const getRangoDePreguntasSeP = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRangoDePreguntasSePS(auth.token);
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
    error,
    getConteoPorNivelRiesgoCategoriaBySedeSeP,
    getGraficasPreguntasBySedeSeP,
    getRangoDePreguntasBySedeSeP,
    getConteoPorNivelRiesgoCategoriaSeP,
    getGraficasPreguntasSeP,
    getRangoDePreguntasSeP,
  };
}