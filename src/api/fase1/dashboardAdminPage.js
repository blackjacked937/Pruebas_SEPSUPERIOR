import { BASE_API_F1 } from "../../utils/constants";

export async function getAlertsColumbiaAPI(token) {
    try {
        const url = `${BASE_API_F1}/dashboards/Dashbord_Admin/ConteoGeneralAlertaColumbia/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getAlertsTabaquismoAPI(token) {
    try {
        const url = `${BASE_API_F1}/dashboards/Dashbord_Admin/ConteoGeneralAlertaTabaquismo/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getAlertsAlcoholismoAPI(token) {
    try {
        const url = `${BASE_API_F1}/dashboards/Dashbord_Admin/ConteoGeneralAlertaAlcoholismo/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getAlertsAnsiedadAPI(token) {
    try {
        const url = `${BASE_API_F1}/dashboards/Dashbord_Admin/ConteoGeneralAlertaAnsiedad/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getAlertsDepresionAPI(token) {
    try {
        const url = `${BASE_API_F1}/dashboards/Dashbord_Admin/ConteoGeneralAlertaTabaquismo/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getAlertsDrogasAPI(token) {
    try {
        const url = `${BASE_API_F1}/dashboards/Dashbord_Admin/ConteoGeneralAlertaDrogas/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}