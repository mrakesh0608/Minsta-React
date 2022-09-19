import { PostImgContext } from 'context/PostImgContext';
import { useContext } from 'react';

export const usePostImgContext = () => {
    const context = useContext(PostImgContext)
    if (!context) throw Error('usePostImgContext must be used inside an PostImgContextProvider')
    return context
}