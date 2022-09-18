import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'css/User.css';
import UserHeadNav from 'components/User/UserHeadNav';
import UserMeta1 from 'components/User/UserMeta1';
import UserPostTag from 'components/User/UserPostTag';

import { useLogout } from 'hooks/auth/useLogout'
import { useAuthContext } from 'hooks/context/useAuthContext';
import useFetch from 'hooks/useFetch';

import { userIcon } from 'helpers/importIcons';
import { HideScroll } from 'helpers/HandleScroll';
import ToggleDarkTheme from 'helpers/ToggleDarkTheme';

const User = () => {

    const navigate = useNavigate();
    const { logout } = useLogout();

    const { user: old } = useAuthContext();
    const [userMore, setUserMore] = useState(false);
    const { fetchData, data: user, isError, isPending } = useFetch();

    const [DisPeo, setDisPeo] = useState(false);
    const { fetchData: fetchDisPeo, data: DisPeodata, isError: isDisPeoError, isPending: isDisPeoPending } = useFetch();

    useEffect(() => {
        initialize();
    }, [])

    const initialize = () => {
        fetchData({ path: '/user?Username=' + old.Username, method: "GET" })
    }

    const CloseUserMore = () => {
        document.getElementById('user-more-list').classList.remove('ani');
        document.getElementById('user-more-list').classList.add('ani-r');

        setTimeout(() => {
            HideScroll(false);
            setUserMore(false);
        }, 500);
    };

    const handleDisPeo = (e) => {
        if (DisPeo) {
            setDisPeo(false);
            e.target.style.backgroundColor = '#EFEFEF'
        }
        else {
            setDisPeo(true);
            e.target.style.backgroundColor = 'lightblue'
            fetchDisPeo({ path: '/user/userAll', method: "GET" })
        }
    }

    return (
        <div id="User">
            <UserHeadNav username={old.Username} setUserMore={setUserMore} />
            {user ?
                <div>
                    <div id="User-content">
                        <div className='user-meta'>
                            <UserMeta1 user={{
                                Posts: user.Posts,
                                Followers: user.Followers,
                                Following: user.Following,
                                Name: user.Name,
                                Username: user.Username
                            }} />
                            <div className='user-meta-2'>
                                <div className='edit-discover'>
                                    <button className='edit' onClick={() => navigate.push('user/username/edit-profile')}>Edit Profile</button>
                                    <button className='dis' onClick={(e) => handleDisPeo(e)}>Discover People</button>
                                </div>
                            </div>
                        </div>
                        {DisPeo &&
                            (DisPeodata ?
                                <div className='discover-people'>
                                    {DisPeodata.map((user, key) =>
                                        <div
                                            onClick={() => navigate(`/user/${user.Username}`)}
                                            key={key}
                                            className='discover-people-card'
                                        >
                                            <div className='userimg'>
                                                <img src={userIcon} alt="user" className='icons' />
                                            </div>
                                            <div>{user.Name}</div>
                                            <div>{user.Username}</div>
                                        </div>
                                    )}
                                </div> :
                                (isDisPeoError ? <div className='load' style={{ color: 'red' }}>{isDisPeoError}</div> :
                                    (isDisPeoPending &&
                                        <div className='load'>Loading ...</div>
                                    )
                                )
                            )
                        }
                        <UserPostTag userId={user._id} token={user} />
                    </div>
                </div> :
                (isError ?
                    (isError === 'No Such User' ?
                        navigate('/notfound/No Such User') :
                        <div className='err-msg'>{isError}</div>
                    ) :
                    (isPending && <div className="loading"><h2>Loading ...</h2></div>)
                )
            }
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