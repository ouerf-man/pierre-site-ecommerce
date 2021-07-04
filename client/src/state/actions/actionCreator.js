import { RESTORE_AUTH_STATE, AUTHENTICATE, DEAUTHENTICATE } from "./types";
import * as api from "../../services/api.account.service"

export const authenticateAction = (user) => {
    return {
        type: AUTHENTICATE,
        payload: user
    };
};


export const deAuthenticateAction = () => {
    return {
        type: DEAUTHENTICATE,
    };
};


export const restoreState = (authState) => {
    return {
        type: RESTORE_AUTH_STATE,
        payload: authState
    }
};


export const login = loginDetails => (dispatch) => {
    return api.login(loginDetails).then((response) => {
        dispatch(deAuthenticateAction());
        if (response.success) {
            dispatch(authenticateAction(response.data));
        }
        return Promise.resolve(response);
    },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(deAuthenticateAction());
            return Promise.reject({ success: false, message});
        })
};


export const signUp = (signUpDetails) => (dispatch) => {
    return api.signUp(signUpDetails).then((response) => {
        dispatch(deAuthenticateAction());
        if (response.success) {
            dispatch(authenticateAction(response.data));
        }
        return Promise.resolve(response);
    },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(deAuthenticateAction());
            return Promise.reject({ success: false, message});
        })
};


export const logout = () => {
    return async dispatch => {
        dispatch(deAuthenticateAction())
    }
};


export const restore = (savedState) => {
    return dispatch => {
        dispatch(restoreState(savedState));
    };
};