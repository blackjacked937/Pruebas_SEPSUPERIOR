import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from '../api/token';
import { useUser } from '../hooks';

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
})

export function AuthProvider(props) {
    const { children } = props;
    const [auth, setAuth] = useState(null);
    const { getMe } = useUser();

    useEffect(() => {
        (async () => {
            const token = getToken();
            const typeLogin = localStorage.getItem("typeLogin"); // 👈 recuperar al recargar

            if (token && typeLogin) {
                const { exp } = jwtDecode(token);
                const expirationTime = exp * 1000 - 60000;
                if (Date.now() >= expirationTime) {
                    removeToken();
                    localStorage.removeItem("typeLogin");
                    setAuth(null);
                } else {
                    const me = await getMe(token, typeLogin); // 👈 pasar typeLogin
                    setAuth({ token, me, typeLogin });
                }
            } else {
                setAuth(null);
            }
        })();
    }, []);

    const login = async (token, typeLogin) => {
        setToken(token);
        localStorage.setItem("typeLogin", typeLogin); // 👈 guardar el tipo de login
        const me = await getMe(token, typeLogin);     // 👈 pasar typeLogin
        setAuth({ token, me, typeLogin });
    };

    const logout = () => {
        if (auth) {
            removeToken();
            localStorage.removeItem("typeLogin");
            setAuth(null);
        }
    };

    const valueContext = {
        auth,
        login,
        logout
    };

    if (auth === undefined) return null;

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    );
}
