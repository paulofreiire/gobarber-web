import produce from 'immer'

const INITIAL_STATE = {
    profile: null,
    provider: false
}

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCCESS': {
                draft.profile = action.payload.user;
                draft.provider = action.payload.user.provider
                break;
            }

            case '@user/UPDATE_PROFILE_SUCCESS': {
                draft.profile = action.payload.profile;
                break;
            }

            case '@auth/SIGN_OUT': {
                draft.profile = null;
                break;
            }
            default:
        }
    })
}