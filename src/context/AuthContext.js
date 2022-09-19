import { createContext, useReducer, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                dispatch({ type: 'LOGIN', payload: user })
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
        }
    }, [])

    // console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isLoading }} >
            {children}
        </AuthContext.Provider>
    )
}