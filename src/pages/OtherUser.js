import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';

import { useAuthContext } from 'hooks/useAuthContext'
import OtherUserHeadNav from 'components/User/OtherUserHeadNav'
import UserMeta1 from 'components/User/UserMeta1';
import UserPostTag from 'components/User/UserPostTag';
import 'css/User.css';
import { iconPath } from 'helpers/Path'

import { HideScroll } from 'helpers/HandleScroll';

const OtherUser = ({ username }) => {

    const { user: I } = useAuthContext();

    const navigate = useNavigate();
    const { id } = useParams();

    const { fetchData, simpleFetch, data: user, isError, isPending } = useFetch();

    useEffect(() => {
        if (username === id) navigate('/user');
        else initialize();
    }, [])
    const initialize = () => {
        if (I)
            fetchData({ path: `/user/otherUser?Username=${id}&myUsername=${I.Username}`, method: 'GET' })
        else
            simpleFetch({ path: `/public/user?Username=${id}` })
    }

    const [userMore, setUserMore] = useState(false);
    const CloseUserMore = () => {
        document.getElementById('user-more-list').classList.remove('ani');
        document.getElementById('user-more-list').classList.add('ani-r');

        setTimeout(() => {
            HideScroll(false);
            setUserMore(false);
        }, 500);
    };

    const handleFollow = () => {
        fetchData({
            path: '/user/' + I._id,
            method: 'PATCH',
            payload: {
                "_id2": user._id,
                "update": "following_followers_users",
                "Username1": I.Username,
                "Username2": user.Username,
                "updateAdd": !user.iFollow
            }
        })
            .then(res => {
                if (res) {
                }
                else navigate('/notfound/No Such User')
            })
    };

    return (
        <div id="otheruser">
            {!user && isPending && <div className='loading'><p>Loading ...</p></div>}
            {user &&
                <OtherUserHeadNav username={user.Username} setUserMore={setUserMore} />
            }
            {isError ?
                isError === 'No Such User' ? navigate('/notfound/No Such User') :
                    <div className='err-msg'>{isError}</div> : (user &&
                        <div id="User-content">
                            <div className="user-meta">
                                <UserMeta1 user={{
                                    Posts: user.Posts,
                                    Followers: user.Followers,
                                    Following: user.Following,
                                    Name: user.Name,
                                    Username: user.Username
                                }} />
                                {I && <div className='follow-msg'>
                                    <button onClick={handleFollow} className={user.iFollow ? '' : 'follow'}>
                                        {user.iFollow ? 'Unfollow' : 'Follow'}
                                    </button>
                                    <button onClick={() => { navigate('/messenger') }}>Message</button>
                                </div>
                                }
                            </div>
                            <UserPostTag userId={user._id} token={I} />
                        </div>
                )}
            {userMore &&
                <div id='user-more-overlay' onClick={(e) => {
                    if (e.target.id === 'user-more-overlay') CloseUserMore();
                }}>
                    <div id='user-more-list' className='ani'>
                        <div id='user-more-close'>
                            <div onClick={() => CloseUserMore()}></div>
                        </div>
                        <Link to='report'>
                            <img className='more-icons' src={iconPath + 'user.png'} alt="settings" />Report...
                        </Link>
                        <div onClick={() => { }}>
                            <img className='more-icons' src={iconPath + 'settings.png'} alt="theme" />Block
                        </div>
                        <div onClick={() => { }}>
                            <img className='more-icons' src={iconPath + 'share.png'} alt="theme" />Share this profile
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default OtherUser;