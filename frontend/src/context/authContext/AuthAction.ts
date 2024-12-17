interface User {
    id: string;
    name: string;
    email: string;
}

interface LoginStartAction {
    type: "LOGIN_START";
}

interface LoginSuccessAction {
    type: "LOGIN_SUCCESS";
    payload: User;
}

interface LoginFailureAction {
    type: "LOGIN_FAILURE";
}

interface LogoutAction {
    type: "LOGOUT";
}




export const loginStart = (): LoginStartAction => ({
    type: "LOGIN_START",
});

export const loginSuccess = (user: User): LoginSuccessAction => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const loginFailure = (): LoginFailureAction => ({
    type: "LOGIN_FAILURE",
});

export const logout = (): LogoutAction => ({
    type: "LOGOUT",
});
