import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'css/User.css';
import UserHeadNav from 'components/User/UserHeadNav';
import UserMeta1 from 'components/User/UserMeta1';
import UserPostTag from 'components/User/UserPostTag';

import { useLogout } from 'hooks/auth/useLogout'
import { useAuthContext } from 'hooks/context/useAuthContext';
import useFetch from 'hooks/useFetch';

import { HideScroll } from 'helpers/HandleScroll';
import ToggleDarkTheme from 'helpers/ToggleDarkTheme';
import DisPeo from 'components/User/DisPeo';

const User = () => {

    const navigate = useNavigate();
    const { logout } = useLogout();

    const { user } = useAuthContext();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [userMore, setUserMore] = useState(false);

    const CloseUserMore = () => {
        document.getElementById('user-more-list').classList.remove('ani');
        document.getElementById('user-more-list').classList.add('ani-r');

        setTimeout(() => {
            HideScroll(false);
            setUserMore(false);
        }, 500);
    };

    const [showDisPeo, setShowDisPeo] = useState(false);
    const handleDisPeo = (e) => {
        if (showDisPeo) {
            setShowDisPeo(false);
            e.target.style.backgroundColor = '#EFEFEF'
        }
        else {
            setShowDisPeo(true);
            e.target.style.backgroundColor = 'lightblue'
        }
    }

    return (
        <div id="User">
            <UserHeadNav username={user.Username} setUserMore={setUserMore} />
            <div id="User-content">
                <div className='user-meta'>
                    <UserMeta1 user={{
                        Posts: userData.Posts,
                        Followers: userData.Followers_users.length,
                        Following: userData.Following_users.length,
                        Name: userData.Name,
                        Username: userData.Username
                    }} />
                    <div className='user-meta-2'>
                        <div className='edit-discover'>
                            <button className='edit' onClick={() => navigate.push('user/username/edit-profile')}>Edit Profile</button>
                            <button className='dis' onClick={(e) => handleDisPeo(e)}>Discover People</button>
                        </div>
                    </div>
                </div>
                {showDisPeo && <DisPeo />}
                <UserPostTag userId={user._id} token={user} />
            </div>
            {userMore &&
                <div id='user-more-overlay' onClick={(e) => {
                    if (e.target.id === 'user-more-overlay') CloseUserMore();
                }}>
                    <div id='user-more-list' className='ani'>
                        <div id='user-more-close'>
                            <div onClick={() => CloseUserMore()}></div>
                        </div>
                        <Link to='/user/username/settings'>
                            <img className='more-icons' src="icons/settings.png" alt="settings" />Settings
                        </Link>
                        <Link to='user/username/activity'>
                            <img className='more-icons' src="icons/activity.png" alt="activity" />Your Activity
                        </Link>
                        <Link to='user/username/saved'>
                            <img className='more-icons' src="icons/save.png" alt="save" />Saved
                        </Link>
                        <Link to='user/username/close-friends'>
                            <img className='more-icons more-icons-l' src="icons/friends.png" alt="close friends" />Close Friends
                        </Link>
                        <div onClick={() => { ToggleDarkTheme() }}>
                            <img className='more-icons' src="icons/theme.png" alt="theme" />Toggle Dark Theme
                        </div>
                        <div onClick={() => { setUserMore(false); logout(); }}>
                            <img className='more-icons' src="icons/logout.png" alt="logout" />Logout
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default User;