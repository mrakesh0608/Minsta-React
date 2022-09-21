import { createContext, useState, useEffect } from 'react'
import io from "socket.io-client";
import { useAuthContext } from 'hooks/context/useAuthContext';
import { url } from 'helpers/Path';

export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
    const [isSockError, setIsSockError] = useState(false);
    
    const { user} = useAuthContext();
    
    // const socket = io(url);
    const socket = [];
    useEffect(() => {
        if (user) {
            // socket.on('connect', async err => {
            //     // console.log('connect');
            //     setIsSockError(false);
            //     socket.emit('goOnline', { Username: user.Username, userId: user.userId });
            // });
            // socket.on('connect_error', err => {
            //     setIsSockError('failed to connect to server');
            // });
            // socket.on('updateFollowingUsers',(users)=>{
            //     // console.log(users);
            //     localStorage.setItem('Following_users', JSON.stringify(users));
            // })
        }
    }, [user])
    return (
        <SocketContext.Provider value={{ socket, isSockError}} >
            {isSockError && <div className='socket-error'>{isSockError}</div>}
            {children}
        </SocketContext.Provider>
    )
}