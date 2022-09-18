import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'App';
import 'css/index.css';
import 'css/NavHeadBottom.css'

import { AuthContextProvider } from 'context/AuthContext';
import { SocketContextProvider ,isError} from 'context/SocketContext';
import { PostListContextProvider } from 'context/PostListContext';
import { PostImgContextProvider } from 'context/PostImgContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <SocketContextProvider>
            <PostListContextProvider>
                <PostImgContextProvider>
                    <App />
                </PostImgContextProvider>
            </PostListContextProvider>
        </SocketContextProvider>
    </AuthContextProvider>
);