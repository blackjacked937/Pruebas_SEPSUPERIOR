import { useState } from "react";
import { useAuth } from "..";
import { getOptionsCatalogoApi, getHospitalesApi } from "../../api/conasama/catalogo";
import { registerGestorApi } from "../../api/conasama/gestores";

export function useGestores() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);

    const getCatalogosGestores = async () => {
        setLoading(true);
        try {
            const result = await getOptionsCatalogoApi(auth.token);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getHospitales = async () => {
        setLoading(true);
        try {
            const result = await getHospitalesApi(auth.token);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const nuevoGestor = async (data) => {
        setLoading(true);
        try {
            const result = await registerGestorApi(data, auth.token);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        getCatalogosGestores,
        getHospitales,
        nuevoGestor
    }
}