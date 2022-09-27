import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'App';
import 'css/index.css';
import 'css/NavHeadBottom.css';

import { AuthContextProvider } from 'context/AuthContext';
import { SocketContextProvider } from 'context/SocketContext';
import { PostListContextProvider } from 'context/PostListContext';
import { ReelContextProvider } from 'context/ReelContext';
import { PostImgContextProvider } from 'context/PostImgContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <SocketContextProvider>
            <PostListContextProvider>
                <ReelContextProvider>
                    <PostImgContextProvider>
                        <App />
                    </PostImgContextProvider>
                </ReelContextProvider>
            </PostListContextProvider>
        </SocketContextProvider>
    </AuthContextProvider>
);