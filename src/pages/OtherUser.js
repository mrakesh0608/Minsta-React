import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';

import { useAuthContext } from 'hooks/context/useAuthContext';

import OtherUserHeadNav from 'components/User/OtherUserHeadNav';
import UserPostTag from 'components/User/UserPostTag';
import UserMeta1 from 'components/User/UserMeta1';
import UserMeta2 from 'components/User/UserMeta2';

import { HideScroll } from 'helpers/HandleScroll';
import { iconPath } from 'helpers/Path';

import 'css/User/User.css';

const OtherUser = () => {

    const navigate = useNavigate();
    const { user: I } = useAuthContext();

    const { id } = useParams();
    const { fetchData, simpleFetch, data: user, isError, isPending } = useFetch();

    useEffect(() => {
        if (I.Username === id) navigate('/user');
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

        HideScroll(false);
        setTimeout(() => {
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
        }).then(res => {
            if (res) { }
            else navigate('/notfound/No Such User')
        })
    };

    return (
        <div id="otheruser">
            {!user && isPending && <div className='center-text-in-viewport'>Loading ...</div>}
            {isError ?
                (isError === 'No Such User' ?
                    navigate('/notfound/No Such User') :
                    <div className='err-msg'>{isError}</div>
                ) :
                (user && <>
                    <OtherUserHeadNav Username={user.Username} setUserMore={setUserMore} />
                    <div id="User-content">
                        <div className="user-meta">
                            <UserMeta1 key={user} user={user} />
                            <UserMeta2 Name={user.Name} Bio={user.Bio} />
                            {I &&
                                <div className='follow-msg'>
                                    <button onClick={handleFollow} className={isPending ? '' : (user.iFollow ? '' : 'follow')}>
                                        {isPending ? 'Checking ...' : (user.iFollow ? 'Unfollow' : 'Follow')}
                                    </button>
                                    <button onClick={() => { navigate(`/messenger/${id}`) }}>Message</button>
                                </div>
                            }
                        </div>
                        <UserPostTag userId={user._id} token={I} />
                    </div>
                </>
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