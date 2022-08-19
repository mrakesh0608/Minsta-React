import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'App';
import 'css/index.css';
import 'css/NavHeadBottom.css'

import { AuthContextProvider } from 'context/AuthContext';
import { PostListContextProvider } from 'context/PostListContext';
import { PostImgContextProvider } from 'context/PostImgContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <PostListContextProvider>
            <PostImgContextProvider>
                <App />
            </PostImgContextProvider>
        </PostListContextProvider>
    </AuthContextProvider>
);