import { LOGIN_SUCCESS, LOGOUT_SUCCESS, AUTH_AGE_VERIFY, SIGNUP_SUCCESS, INITIALISE_PROFILE, SOCIAL_TYPE_PROVIDER, CHAT_STATUS } from "../actionTypes";


type Dispatch = {
    type: string,
    payload: any
}

const auth = (state: any, dispatch: Dispatch) => {
    switch (dispatch.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...dispatch.payload,
                isLogin: true,
                isSignUp: false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...dispatch.payload,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                ...dispatch.payload,
                isLogin: false,
                isSignUp: true,
            }
        case INITIALISE_PROFILE:
            return {
                ...state,
                ...dispatch.payload,
            }
        default: {
            return {
                ...state,
                // case AUTH_AGE_VERIFY:
                //     return {
                //         ...state,
                //         ...dispatch.payload,
                //     }
                // case INITIALISE_PROFILE:
                //     return {
                //         ...state,
                //         ...dispatch.payload,
                //     }
                // case SOCIAL_TYPE_PROVIDER:
                //     return {
                //         ...state,
                //         provider: dispatch.payload,
                //     }
                // case CHAT_STATUS:
                //     return {
                //         ...state,
                //         ...dispatch.payload,
                //     }
            }
        }
    }
}

export default auth;