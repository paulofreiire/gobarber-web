import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useForm, FormProvider} from "react-hook-form";
import {Container} from './styles';
import {signOut} from "~/store/modules/auth/actions";
import {updateProfileRequest} from "~/store/modules/user/actions";
import AvatarInput from "~/pages/Profile/AvatarInput";

export default function Profile() {
    const profile = useSelector(state => state.user.profile);

    const methods = useForm();

    const dispatch = useDispatch()
    const onSubmit = (data) => {
        dispatch(updateProfileRequest(data))
    }

    function handleSignOut(){
        dispatch(signOut())
    }


    return <Container>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <AvatarInput id="avatar_id" defaultValue={profile.avatar}/>

                <input id="name" defaultValue={profile.name} placeholder="Nome Completo" {...methods.register("name")}/>
                <input type="email" defaultValue={profile.email} id="email"
                       placeholder="Seu Email" {...methods.register("email")}/>
                <hr/>

                <input type="password" id="oldPassword"
                       placeholder="Sua senha antiga" {...methods.register("oldPassword")}/>
                <input type="password" id="Password" placeholder="Sua nova senha" {...methods.register("password")}/>
                <input type="password" id="confirmPassword"
                       placeholder="Confirme sua senha" {...methods.register("confirmPassword")}/>

                <button type="submit">Atualizar</button>
            </form>
        </FormProvider>

        <button type="submit" onClick={handleSignOut}>Sair do GoBarber</button>
    </Container>;

}
