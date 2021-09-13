import {AuthActionEnum, AuthActionType, AuthState} from "./types";
import {IUser} from "../../../models/IUser";

const initialState: AuthState = {
    isAuth: false,
    error: "",
    isLoading: false,
    user: {} as IUser
}

export const authReducer = (state = initialState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}

        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload}

        case AuthActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}

        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}

        default:
            return state
    }
}
