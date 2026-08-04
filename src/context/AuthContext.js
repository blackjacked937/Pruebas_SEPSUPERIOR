import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getToken, removeToken, setToken } from "../api/token";
import { useUser } from "../hooks";

export const AuthContext = createContext({
  auth: undefined,
  login: async () => {},
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;

  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        const typeLogin = sessionStorage.getItem("typeLogin");

        if (token && typeLogin) {
          const { exp } = jwtDecode(token);
          const expirationTime = exp * 1000 - 60000;

          if (Date.now() >= expirationTime) {
            removeToken();
            sessionStorage.removeItem("typeLogin");
            setAuth(null);
          } else {
            const me = await getMe(token, typeLogin);

            const isSuper = me?.is_superuser ?? false;
            const isStaff = me?.is_staff ?? false;

            // BLOQUEO DE PACIENTES PARA CONASAMA Y SEP
            if (Number(typeLogin) === 3 || Number(typeLogin) === 4) {
              if (!isSuper && !isStaff) {
                removeToken();
                sessionStorage.removeItem("typeLogin");
                setAuth(null);
                return;
              }
            }

            setAuth({
              token,
              typeLogin,
              me,
              is_superuser: isSuper,
              is_staff: isStaff,
            });
          }
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error("Error al cargar sesión:", error);
        removeToken();
        sessionStorage.removeItem("typeLogin");
        setAuth(null);
      }
    })();
  }, []);

  const login = async (token, typeLogin) => {
    setToken(token);
    sessionStorage.setItem("typeLogin", typeLogin);

    const me = await getMe(token, typeLogin);

    const isSuper = me?.is_superuser ?? false;
    const isStaff = me?.is_staff ?? false;

    // BLOQUEO DE PACIENTES PARA CONASAMA Y SEP
    if (Number(typeLogin) === 3 || Number(typeLogin) === 4) {
      if (!isSuper && !isStaff) {
        removeToken();
        sessionStorage.removeItem("typeLogin");
        throw new Error("Tu cuenta no tiene acceso a esta plataforma.");
      }
    }

    setAuth({
      token,
      me,
      typeLogin,
      is_superuser: isSuper,
      is_staff: isStaff,
    });
  };

  const logout = () => {
    removeToken();
    sessionStorage.removeItem("typeLogin");
    setAuth(null);
  };

  useEffect(() => {
    if (!auth && sessionStorage.getItem("inactivityTimeout") === "true") {
      Swal.fire({
        title: "Sesión cerrada",
        text: "Tu sesión ha sido cerrada por inactividad.",
        icon: "warning",
        confirmButtonColor: "#4f70bd",
        confirmButtonText: "Entendido",
        customClass: {
          popup: "rounded-4"
        }
      });
      sessionStorage.removeItem("inactivityTimeout");
    }
  }, [auth]);

  useEffect(() => {
    if (!auth) return;

    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.setItem("inactivityTimeout", "true");
        logout();
      }, INACTIVITY_LIMIT);
    };

    // Events that indicate user activity
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
      "click"
    ];

    // Initialize timer
    resetTimer();

    // Bind event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [auth]);

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}