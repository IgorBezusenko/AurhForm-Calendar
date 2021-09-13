import {IUser} from "../../../models/IUser";
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import axios from "axios";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload: isLoading
    }),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            dispatch(AuthActionCreators.setError(""))
            setTimeout(async () => {
                const response = await axios.get<IUser[]>("./users.json")
                const mockUser = response.data.find((user) => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem("auth", "true")
                    localStorage.setItem("username", mockUser.username)
                    dispatch(AuthActionCreators.setAuth(true))
                    dispatch(AuthActionCreators.setUser(mockUser))
                } else {
                    dispatch(AuthActionCreators.setError("Не верный логин или пароль"))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 1500)
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false))
            dispatch(AuthActionCreators.setError("Произошла ошибка при логине"))

        }
    },
    logout: () => (dispatch: AppDispatch) => {
        localStorage.removeItem("auth")
        localStorage.removeItem("username")
        dispatch(AuthActionCreators.setAuth(false))
        dispatch(AuthActionCreators.setUser({} as IUser))
    },
}
