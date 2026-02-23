import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from '../api/token';
import { useUser } from '../hooks';

export const AuthContext = createContext({
    auth: undefined,
    login: async () => {},
    logout: () => null,
})

export function AuthProvider(props) {
    const { children } = props;

    const [auth, setAuth] = useState(undefined);

    const { getMe } = useUser();

    useEffect(() => {
        (async () => {
            const token = getToken();
            const typeLogin = localStorage.getItem("typeLogin");

            if (token && typeLogin) {
                const { exp } = jwtDecode(token);
                const expirationTime = exp * 1000 - 60000;

                if (Date.now() >= expirationTime) {
                    removeToken();
                    localStorage.removeItem("typeLogin");
                    setAuth(null);
                } else {
                    const me = await getMe(token, typeLogin);

                    const isSuper = me?.is_superuser ?? false;
                    const isStaff = me?.is_staff ?? false;

                    // BLOQUEO DE PACIENTES
                    if (!isSuper && !isStaff) {
                        removeToken();
                        localStorage.removeItem("typeLogin");
                        setAuth(null);
                        return;
                    }

                    setAuth({
                        token,
                        typeLogin,
                        me,
                        is_superuser: me?.is_superuser ?? false,
                        is_staff: me?.is_staff ?? false,
                    });
                }
            } else {
                setAuth(null);
            }
        })();
    }, []);

    const login = async (token, typeLogin) => {
        setToken(token);
        localStorage.setItem("typeLogin", typeLogin);
        const me = await getMe(token, typeLogin);

        const isSuper = me?.is_superuser ?? false;
        const isStaff = me?.is_staff ?? false;

        // BLOQUEO DE PACIENTES
        if (!isSuper && !isStaff) {
            removeToken();
            localStorage.removeItem("typeLogin");
            throw new Error("Tu cuenta no tiene acceso a esta plataforma.");
        }

        setAuth({
            token,
            me,
            typeLogin,
            is_superuser: me?.is_superuser ?? false,
            is_staff: me?.is_staff ?? false,
        });
    };

    const logout = () => {
        removeToken();
        localStorage.removeItem("typeLogin");
        setAuth(null);
    };

    if (auth === undefined) return null;

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
