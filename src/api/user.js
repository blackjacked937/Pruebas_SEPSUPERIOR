import { BASE_API, BASE_API_F1, BASE_API_CONASAMA_V1 } from "../utils/constants";

export async function loginApi(formValue, typeLogin) {
    try {
        const url = typeLogin === 1 ? `${BASE_API}auth/login/` : `${BASE_API_F1}/auth/log/`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValue),
        };

        const response = await fetch(url, params);
        if (response.status !== 200) {
            throw new Error("Usuario o contraseña incorrectos");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function loginApiConasama(formValue, typeLogin) {
    try {
        const url = typeLogin === 1 ? `${BASE_API}auth/login/` : `${BASE_API_CONASAMA_V1}/auth/log/`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValue),
        };

        const response = await fetch(url, params);
        if (response.status !== 200) {
            throw new Error("Usuario o contraseña incorrectos");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getMeApi(token) {
    try {
        const url = `${BASE_API}auth/me/`;
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
