import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useAuthContext } from 'hooks/context/useAuthContext';

const Follows = lazy(() => import('components/User/Follows'));

export default ({hideId,Username}) => {
    
    const { user } = useAuthContext();
    
    return (
        <Routes>
            <Route exact path='followers' element={user ? <Follows Attr={'Followers_users'} hideId={hideId} Username={Username}/> : <Navigate to='/login' />} />
            <Route exact path='followings' element={user ? <Follows Attr={'Following_users'} hideId={hideId} Username={Username}/> : <Navigate to='/login' />} />
        </Routes>
    );
}