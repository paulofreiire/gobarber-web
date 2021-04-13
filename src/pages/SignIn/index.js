import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import { signInRequest } from "~/store/modules/auth/actions";
import logo from '~/assets/logo.svg';

const schema = yup.object().shape({
    email: yup.string().email('Insira um email valido').required('Campo obrigatório'),
    password: yup.string().min(6, 'Minimo 6 caracteres').required('Campo obrigatório'),
});

export default function SignIn() {
    const {register, handleSubmit, formState: {errors}} = useForm(
        {resolver: yupResolver(schema)}
    );

    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading)

    const onSubmit = ({email, password}) => {
        dispatch(signInRequest(email, password))

    }

    return (<>
        <img src={logo} alt="goBarber"/>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="Email"
                id="email"
                {...register("email", {
                    required: "Campo requerido",
                    pattern: {
                        value: /S+@S+.S+/,
                        message: "Insiria um email valido"
                    }
                })}
                type="email"
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
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
            {errors.password && <span role="alert">{errors.password.message}</span>}
            <button type="submit" >{loading ? 'Carregando...' : 'Acessar'}</button>
            <Link to="/register" >Criar conta grátis</Link>
        </form>
    </>
    );
}
