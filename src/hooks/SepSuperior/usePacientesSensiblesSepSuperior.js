import { useState, useCallback } from 'react';
import { useAuth } from '../useAuth';
import {
  getPacientesSensiblesSepSuperior,
  marcarAtencionEspecialSepSuperior,
} from '../../api/SepSuperior';

/**
 * Hook para monitoreo de pacientes sensibles en SEP Superior
 */
export function usePacientesSensiblesSepSuperior() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState(null);

  const getPacientesSensibles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPacientesSensiblesSepSuperior(auth.token);
      setPacientes(data || []);
      return data;
    } catch (err) {
      console.error("Error al cargar pacientes sensibles SEP Superior:", err);
      setError(err.message || "Error al obtener pacientes sensibles");
      setPacientes([]);
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const marcarAtencion = useCallback(
    async (idPaciente, data) => {
      try {
        setLoading(true);
        setError(null);
        const response = await marcarAtencionEspecialSepSuperior(
          idPaciente,
          data,
          auth.token
        );
        setPacientes((prev) =>
          prev.map((p) => (p.id === idPaciente ? response : p))
        );
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

  return {
    loading,
    pacientes,
    error,
    getPacientesSensibles,
    marcarAtencion,
  };
}
