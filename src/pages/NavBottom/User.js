import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import 'css/User.css';
import UserHeadNav from 'components/common/UserHeadNav'
import user from 'icons/Tabs/user.png';

import PostGrid from 'components/Post/PostGrid';

import { HideScroll} from 'helpers/HandleScroll';
import ToggleDarkTheme from 'helpers/ToggleDarkTheme';


const User = () => {

    const [PostTag, setPostTag] = useState('Post');
    const [userMore, setUserMore] = useState(false);
    const [DisPeo, setDisPeo] = useState(false);

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
        }
    }

    const history = useHistory();
    return (
        <div id="User">
            <UserHeadNav setUserMore={setUserMore} />
            <div id="User-content">
                <div className='user-meta'>
                    <div className='user-meta-1'>
                        <div className='userimg'>
                            <img src={user} alt="user" className='icons' />
                        </div>
                        <div className='network'>
                            <a href='#user-posts-tags'>
                                <div>
                                    <div className='network-count'>0</div>
                                    <div>Posts</div>
                                </div>
                            </a>
                            <Link to='user/username/followers'>
                                <div>
                                    <div className='network-count'>77</div>
                                    <div>Followers</div>
                                </div>
                            </Link>
                            <Link to='user/username/following'>
                                <div>
                                    <div className='network-count'>35</div>
                                    <div>Following</div>
                                </div>
                            </Link >
                        </div>
                    </div>
                    <div className='user-meta-2'>
                        <div style={{ fontWeight: 600 }}>Full Name</div>
                        <div className='about'>About</div>
                        <div className='edit-discover'>
                            <button className='edit' onClick={() => history.push('user/username/edit-profile')}>Edit Profile</button>
                            <button className='dis' onClick={(e) => handleDisPeo(e)}>Discover People</button>
                        </div>
                    </div>
                </div>
                {DisPeo && <div className='discover-people'>Discover People</div>}
                <div id='user-posts-tags' className='user-posts-tags'>
                    <button className={
                        PostTag === 'Post' ? 'btn-active' : 'btn-not-active'}
                        onClick={() => setPostTag('Post')}
                    >
                        <img src="icons/grid.png" alt="grid" className='icons' />
                        <span>Your Posts</span>
                    </button>
                    <button className={
                        PostTag === 'Tag' ? 'btn-active' : 'btn-not-active'}
                        onClick={() => setPostTag('Tag')}
                    >
                        <img src="icons/tag.png" alt="tag" className='icons' />
                        <span>Tags</span>
                    </button>
                </div>
                {PostTag === 'Post' && <PostGrid username='srinivas' />}
                {PostTag === 'Tag' &&
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <h2>Tags</h2>
                        <p><Link to='login' style={{ color: 'blue' }}>Login</Link></p>
                        <p>or</p>
                        <p><Link to='signup' style={{ color: 'blue' }}>Sign Up</Link></p>
                    </div>
                }
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
                        <div onClick={()=>{ToggleDarkTheme()}}>
                            <img className='more-icons' src="icons/theme.png" alt="theme" />Toggle Dark Theme
                        </div>
                        <Link to='user/username/close-friends'>
                            <img className='more-icons more-icons-l' src="icons/friends.png" alt="close friends" />Close Friends
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}
export default User;