import React from "react";
import { useForm, register } from 'react-hook-form';
import {Link} from "react-router-dom";


export default function SignIn() {
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return <>
        <img src={logo} alt="goBarber"/>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email', { required: true })} /> {/* register an input */}
            <input {...register('password', { required: true })} />
            <button type="submit" >Acessar</button>
            <Link to="/register" >Criar conta grátis</Link>
        </form>
    </>;
}
