import { useFormik } from 'formik';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { GiBrain, } from "react-icons/gi";
import * as Yup from "yup";

import { loginApi, loginApiConasama } from '../../../api/user';
import { useAuth } from '../../../hooks';
import { InputForm } from '../../ui';
import './FormLogin.css';

export function FormLogin(props) {
    const { typeLogin } = props;
    const { login } = useAuth()

    const getLoginApi = (typeLogin) => {
        if (typeLogin === 3) return loginApiConasama;
        return loginApi;
    };

    const formik = useFormik({
        initialValues: initialValues(typeLogin),
        validationSchema: Yup.object(newSchema(typeLogin)),
        validateOnChange: false,
        onSubmit: async (formvalue) => {
            try {
            const response = await getLoginApi(typeLogin)(formvalue, typeLogin);
            const { access } = response;
            login(access, typeLogin);
            } catch (error) {
            alert(error.message);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div>
                <center>
                    <GiBrain size={'3rem'} />
                    <br />
                    <br />
                </center>
            </div>
            <div className="form-login-input">
                <InputForm
                    className="form-login-input"
                    label="Usuario"
                    labelDirection="center"
                    nameInput={typeLogin === 2 ? "email" : "username"}
                    placeHolderInput={typeLogin === 2 ? "email" : "username"}
                    valueInput={typeLogin === 2 ? formik.values.email : formik.values.username}
                    onChangeInput={formik.handleChange}
                    type="text"
                    error={typeLogin === 2 ? formik.errors.email : formik.errors.username}
                    touched={typeLogin === 2 ? formik.touched.email : formik.touched.username}
                    size="sm"
                />
            </div>
            <div className="form-login-input">
                <InputForm
                    label="Contraseña"
                    labelDirection="center"
                    nameInput="password"
                    placeHolderInput="password"
                    valueInput={formik.values.password}
                    onChangeInput={formik.handleChange}
                    type="password"
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    size="sm"
                />
            </div>

            <div className='conteiner-select'>
                <Button type="submit" style={{ background: "#4DB6AC", fontWeight: 800, borderColor: "#4DB6AC" }}>
                    Iniciar sesión
                </Button>
            </div>
        </Form>
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
