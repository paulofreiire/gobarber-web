import {takeLatest, call, put, all} from 'redux-saga/effects'
import {toast} from 'react-toastify'

import api from '~/services/api'
import {signInSuccess, signFailure} from "~/store/modules/auth/actions";
import history from "~/services/history";

export function* signIn({payload}) {
    try {
        const {email, password} = payload;
        const response = yield call(api.post, 'sessions', {
            email,
            password
        });

        const {token, user} = response.data;
        console.log(user)

        api.defaults.headers['authorization'] = `Bearer ${token}`

        yield put(signInSuccess(token, user))

        if (!user.provider) {
            history.push('/appointments')
        } else {
            history.push('/dashboard')
        }


    } catch (e) {
        toast.error('Login inválido')
        yield put(signFailure())
    }

}

export function* signUp({payload}) {
    try {
        const {name, email, password, provider} = payload

        yield call(api.post, 'users', {
            name, email, password, provider: provider
        });

        history.push('/')
    } catch (e) {
        toast.error('Falha no cadastro, verifique seus dados!')

        yield put(signFailure())
    }
}

export function setToken({payload}) {
    if (!payload) return;

    const {token} = payload.auth

    if (token) {
        api.defaults.headers['authorization'] = `Bearer ${token}`
    }
}

export function signOut() {
    history.push('/')
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut)
]);