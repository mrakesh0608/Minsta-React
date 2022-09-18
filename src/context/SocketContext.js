import { createContext, useState, useEffect } from 'react'
import io from "socket.io-client";
import { useAuthContext } from 'hooks/useAuthContext';
import { url } from 'helpers/Path';

export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
    const [isSockError, setIsSockError] = useState(false);
    
    const { user} = useAuthContext();

    const socket = io(url);
    useEffect(() => {
        if (user) {
            socket.emit('goOnline', { UserName: user.Username, userId: user.userId });
            socket.on('connect_error', err => {
                console.log('server is down',err);
                setIsSockError('failed to connect to server');
            });
            socket.on('connect', async err => {
                console.log('reconnect');
                socket.connect();
                setIsSockError(false);
                socket.emit('goOnline', { UserName: user.Username, userId: user.userId });
            });
        }
    }, [user])
    return (
        <SocketContext.Provider value={{ socket, isSockError}} >
            {isSockError && <div className='socket-error'>{isSockError}</div>}
            {children}
        </SocketContext.Provider>
    )
}