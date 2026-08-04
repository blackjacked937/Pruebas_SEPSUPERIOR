import { useState, useCallback } from 'react';
import { useAuth } from '../useAuth';
import {
  getGestoresSepSuperior,
  registerGestorSepSuperior,
  getHospitalesSepSuperior,
  getTiposPacienteSepSuperior,
  getPaisSepSuperiorApi,
  getEstadosByPaisSepSuperiorApi,
  getCiudadesByEstadoSepSuperiorApi
} from '../../api/SepSuperior';

/**
 * Hook para gestión de gestores en SEP Superior
 */
export function useGestoresSepSuperior() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [gestores, setGestores] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [error, setError] = useState(null);

  const getCatalogosGestores = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tipos = await getTiposPacienteSepSuperior(auth.token);
      return tipos;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const getHospitales = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHospitalesSepSuperior(auth.token);
      setHospitales(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const getGestores = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGestoresSepSuperior(auth.token);
      setGestores(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const nuevoGestor = useCallback(
    async (data) => {
      try {
        setLoading(true);
        setError(null);
        const response = await registerGestorSepSuperior(data, auth.token);
        await getGestores();
        return response;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [auth.token]
  );

  const getPaises = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPaisSepSuperiorApi();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEstadosByPais = useCallback(async (idPais) => {
    setLoading(true);
    try {
      const result = await getEstadosByPaisSepSuperiorApi(idPais);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCiudadesByEstado = useCallback(async (idEstado) => {
    setLoading(true);
    try {
      const result = await getCiudadesByEstadoSepSuperiorApi(idEstado);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    gestores,
    hospitales,
    error,
    getCatalogosGestores,
    getHospitales,
    getGestores,
    nuevoGestor,
    getPaises,
    getEstadosByPais,
    getCiudadesByEstado,
  };
}
