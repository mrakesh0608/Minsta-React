import { PostListContext } from 'context/PostListContext';
import { useContext } from 'react';

export const usePostListContext = () => {
    const context = useContext(PostListContext)
    if (!context) throw Error('usePostListContext must be used inside an PostListContextProvider')
    return context
}