import { createContext, useReducer, useEffect, Dispatch, ReactNode } from "react";
import AuthReducer, { AuthAction, AuthState } from "./AuthReducer";

interface AuthContextType extends AuthState {
    dispatch: Dispatch<AuthAction>;
}

const INITIAL_STATE: AuthState = {
    user: JSON.parse(localStorage.getItem("korisnik") || "null"),
    isFetching: false,
    error: false,
};

export const AuthContext = createContext<AuthContextType>({
    ...INITIAL_STATE,
    dispatch: () => undefined, 
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("korisnik", JSON.stringify(state.user));
        localStorage.setItem('isAuthenticated', 'true');

    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
