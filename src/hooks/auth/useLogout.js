import { useAuthContext } from 'hooks/context/useAuthContext'
import { usePostListContext } from 'hooks/context/usePostListContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    
    const { dispatch: dispatchPostList } = usePostListContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');
        localStorage.removeItem('Following_users');

        //Clear Data
        dispatchPostList({ type: 'REFRESH' });
        
        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }
    return { logout }
}