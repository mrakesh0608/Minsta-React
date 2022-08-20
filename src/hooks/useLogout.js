import { useAuthContext } from './useAuthContext'
import { usePostListContext } from 'hooks/usePostListContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    
    const { dispatch: dispatchPostList } = usePostListContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        //Clear Data
        dispatchPostList({ type: 'REFRESH' });
        
        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }
    return { logout }
}