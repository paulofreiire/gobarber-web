import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import Switch from 'react-switch';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";


import logo from '~/assets/logo.svg';

import {signUpRequest} from "~/store/modules/auth/actions";

const schema = yup.object().shape({
    name: yup.string().min(3, 'Nome muito curto').required('Campo obrigatório'),
    email: yup.string().email('Insira um email valido').required('Campo obrigatório'),
    password: yup.string().min(6, 'Minimo 6 caracteres').required('Campo obrigatório'),
});

export default function SignUp() {
    const {register, handleSubmit, formState: {errors} } = useForm(
        {resolver: yupResolver(schema)}
    );

    const dispatch = useDispatch()
    const onSubmit = ({name, email, password}) => {
        dispatch(signUpRequest(name, email, password))
    }

    return (<>
        <img src={logo} alt="goBarber"/>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="Nome"
                id="name"
                {...register("name" )}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <input
                placeholder="Email"
                id="email"
                {...register("email")}

            />
            {errors.email && <span>{errors.email.message}</span>}
            <input
                placeholder="Senha"
                id="password"
                {...register("password", {
                    required: "Campo requerido",
                    minLength: {
                        value: 6,
                        message: "minimo 6 digitos"
                    }
                })}
                type="password"
            />
            {errors.password && <span>{errors.password.message}</span>}
            <button type="submit">Criar conta grátis</button>
            <Link to="/">Já tenho login</Link>
        </form>
    </>);
}
