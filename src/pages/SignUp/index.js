import React from "react";
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';

import logo from '~/assets/logo.svg';

export default function SignIn({ login }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async data => {
        await login(data.email, data.password);
        reset();
    }

    return (<>
        <img src={logo} alt="goBarber"/>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="Nome"
                id="nome"
                {...register("name", {
                    required: "Campo requerido",
                    minLength: {
                        value: 3,
                        message: "Seu nome precisa ter pelo menos 3 digitos"
                    }
                })}
                type="email"
            />

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
            <button type="submit">Criar conta grátis</button>
            <Link to="/">Já tenho login</Link>
        </form>
    </>);
}
