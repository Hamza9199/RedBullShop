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

type AuthAction = LoginStartAction | LoginSuccessAction | LoginFailureAction | LogoutAction;

interface AuthState {
    user: User | null;
    isFetching: boolean;
    error: boolean;
}

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export default AuthReducer;
export type { AuthAction, AuthState };
