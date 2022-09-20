import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuthContext } from 'hooks/context/useAuthContext';

import BrandLogo from 'components/common/BrandLogo';
import { InitApp } from 'helpers/InitApp';

const Tabs = lazy(() => import('components/common/Tabs'));
const AddNew = lazy(() => import('pages/Upload/AddNew'));
const AddNewReel = lazy(() => import('pages/Upload/AddNewReel'));
const Messenger = lazy(() => import('pages/Msg/Messenger'));
const Chat = lazy(() => import('pages/Msg/Chat'));

const PostDetails = lazy(() => import('components/Post/PostDetails'));
const Follows = lazy(() => import('components/User/Follows'));

const OtherUser = lazy(() => import('pages/OtherUser'));
const NotFound = lazy(() => import('pages/NotFound'));

const LogIn = lazy(() => import('pages/Auth/LogIn'));
const SignUp = lazy(() => import('pages/Auth/SignUp'));

function App() {

    const { user, isLoading } = useAuthContext();
    InitApp();
    return (
        <BrowserRouter>
            <div className="App">
                <Suspense fallback={<BrandLogo />}>
                    {!isLoading &&
                        <Routes>
                            {['/', '/explore', '/reels', '/notif', '/user'].map((path, index) =>
                                <Route exact path={path} element={user ? <Tabs /> : <Navigate to='/login' />} key={index} />
                            )}
                            <Route exact path='/add-new' element={user ? <AddNew /> : <Navigate to='/login' />} />
                            <Route exact path='/add-new-reel' element={user ? <AddNewReel /> : <Navigate to='/login' />} />
                            <Route exact path='/messenger/:id' element={user ? <Chat /> : <Navigate to='/login' />} />
                            <Route exact path='/messenger' element={user ? <Messenger /> : <Navigate to='/login' />} />
                            <Route exact path='/posts/:id' element={user ? <PostDetails /> : <Navigate to='/login' />} />

                            <Route exact path='/login' element={!user ? <LogIn /> : <Navigate to='/' />} />
                            <Route exact path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />

                            <Route exact path='/user/:id' element={<OtherUser username={user ? user.Username : ''} />} />
                            <Route exact path='/user/:id/followers' element={user ? <Follows Attr={'Followers_users'}/> : <Navigate to='/login' />} />
                            <Route exact path='/user/:id/followings' element={user ? <Follows Attr={'Following_users'}/> : <Navigate to='/login' />} />
                            <Route path='/notfound/:msg' element={<NotFound />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    }
                </Suspense>
            </div>
        </BrowserRouter>
    );
};
export default App;