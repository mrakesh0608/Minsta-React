import { ReelContext } from 'context/ReelContext';
import { useContext } from 'react';

export const useReelContext = () => {
    const context = useContext(ReelContext)
    if (!context) throw Error('useReelContext must be used inside an ReelContextProvider')
    return context
}