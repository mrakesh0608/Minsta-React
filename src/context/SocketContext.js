import { createContext } from 'react'
import io from "socket.io-client";
import { url } from 'helpers/Path';
const socket = io(url);

export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={{ socket }} >
            {children}
        </SocketContext.Provider>
    )
}