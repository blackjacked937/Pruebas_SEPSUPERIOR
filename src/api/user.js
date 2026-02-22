import { BASE_API, BASE_API_F1, BASE_API_CONASAMA_V1 } from "../utils/constants";

export async function loginApiISEM(formValue) {
    try {
        const url = `${BASE_API}auth/login/`;

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

export async function loginApiFase1(formValue) {
    try {
        const url = `${BASE_API_F1}/auth/log/`;

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

export async function loginApiConasama(formValue) {
    try {
        const url = `${BASE_API_CONASAMA_V1}/auth/login/`;

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

const ME_URL_MAP = {
  1: `${BASE_API}auth/me/`,
  2: `${BASE_API_F1}/auth/me/`,
  3: `${BASE_API_CONASAMA_V1}/auth/me/`,
};

export async function getMeApi(token, typeLogin) {
    console.log("typeLogin en getMeApi:", typeLogin);
    try {
        const url = ME_URL_MAP[typeLogin] ?? ME_URL_MAP[1];
        console.log("URL auth/me:", url);
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
