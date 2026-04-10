import { useFormik } from 'formik';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { GiBrain, } from "react-icons/gi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Icono_home from "../../../assets/img/Icono_home.jpeg";
import { loginApiISEM, loginApiFase1, loginApiConasama} from '../../../api/user';
import { useAuth } from '../../../hooks';
import { InputForm } from '../../ui';
import './FormLogin.css';

export function FormLogin(props) {
    const { typeLogin, onBack } = props;
    const { login } = useAuth()

    const loginMap = {
        1: loginApiISEM,
        2: loginApiFase1,
        3: loginApiConasama
    };

    const getLoginApi = (typeLogin) => loginMap[typeLogin] || loginApiISEM;

    const formik = useFormik({
        initialValues: initialValues(typeLogin),
        validationSchema: Yup.object(newSchema(typeLogin)),
        validateOnChange: false,
        onSubmit: async (formvalue) => {
            try {
                const response = await getLoginApi(typeLogin)(formvalue, typeLogin);
                const { access } = response;
                await login(access, typeLogin);
            } catch (error) {
                toast.info(error.message);
            }
        },
    });

    return (
        <div className="login-bg">
            <div className="login-wrapper">

            {/* HEADER */}
            <div className="login-header">
                <h2>Bienvenido de Nuevo</h2>
                <p>Accede a tu espacio</p>

                <div className="logo-circle">
                <img src={Icono_home} alt="logo" />
                </div>
            </div>

            {/* FORM CARD */}
            <div className="login-card">
                <Form onSubmit={formik.handleSubmit}>

                <InputForm
                    label={typeLogin === 2 || typeLogin===4 ? "Correo Electrónico" : "Usuario"}
                    labelDirection="left"
                    nameInput={typeLogin === 2 || typeLogin===4 ? "email" : "username"}
                    placeHolderInput={typeLogin === 2 || typeLogin===4 ? "correo@example.com" : "usuario"}
                    valueInput={typeLogin === 2 || typeLogin===4 ? formik.values.email : formik.values.username}
                    onChangeInput={formik.handleChange}
                    type="text"
                    error={typeLogin === 2 || typeLogin===4 ? formik.errors.email : formik.errors.username}
                    touched={typeLogin === 2 || typeLogin===4 ? formik.touched.email : formik.touched.username}
                />

                <InputForm
                    label="Contraseña"
                    labelDirection="left"
                    nameInput="password"
                    placeHolderInput="••••••••"
                    valueInput={formik.values.password}
                    onChangeInput={formik.handleChange}
                    type="password"
                    error={formik.errors.password}
                    touched={formik.touched.password}
                />

                <Button type="submit" className="login-btn">
                    Iniciar Sesión
                </Button>
                <Button
                    type="button"
                    className="login-btn login-btn-secondary"
                    onClick={onBack}
                >
                    Regresar
                </Button>

                </Form>
            </div>

            {/* FOOTER */}
            <div className="login-footer">
                🔒 Tu privacidad es nuestra prioridad. Todos tus datos están cifrados y protegidos.
            </div>

            </div>
        </div>
    )
}

function initialValues(typeLogin) {
    if (typeLogin === 2) {
        return {
            email: "",
            password: "",
        };
    }
    return {
        username: "",
        password: "",
    };
}

function newSchema(typeLogin) {
    if (typeLogin === 2) {
        return {
            email: Yup
                .string("Ingrese su correo electrónico")
                .email("Ingrese un correo válido")
                .required("Ingrese su correo electrónico"),
            password: Yup
                .string("Ingrese su contraseña")
                .required("Ingrese su contraseña"),
        };
    }
    return {
        username: Yup
            .string("Ingrese su usuario")
            .required("Ingrese su usuario"),
        password: Yup
            .string("Ingrese su contraseña")
            .required("Ingrese su contraseña"),
    };
}
