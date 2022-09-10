import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { HandleScroll } from 'helpers/HandleScroll';
import {
    homeIcon, homeOnIcon,
    exploreIcon, exploreOnIcon,
    reelIcon, reelOnIcon,
    heartIcon, heartOnIcon,
    userIcon, userOnIcon
} from 'helpers/importsIcons';

import {initPostList} from 'components/Post/PostList'
import {initPostGrid} from 'components/Post/PostGrid'
import {initNotif} from 'pages/NavBottom/Notif';

const BottomNav = () => {
    const navigate = useNavigate();

    useEffect(() => {
        HandleScroll();
    }, []);

    return (
        <div id="bottom" className='nav-bottom hideOnScroll hideOnScroll-bottom'>
            <div id="home" className="nav-icons" onClick={() => navigate('/')} onDoubleClick={()=>initPostList()}>
                <img src={window.location.pathname === '/' ? homeOnIcon : homeIcon} alt="home" />
            </div>
            <div id='explore' className="nav-icons" onClick={() => navigate('/explore')} onDoubleClick={()=>initPostGrid()}>
                <img src={window.location.pathname === '/explore' ? exploreOnIcon : exploreIcon} alt="explore" />
            </div>
            <div id='reels' className="nav-icons" onClick={() => navigate('/reels')} onDoubleClick={()=>alert('refresh')}>
                <img src={window.location.pathname === '/reels' ? reelOnIcon : reelIcon} alt="reels" />
            </div>
            <div id='notif' className="nav-icons" onClick={() => navigate('/notif')} onDoubleClick={()=>initNotif()}>
                <img src={window.location.pathname === '/notif' ? heartOnIcon : heartIcon} alt="heart" />
            </div>
            <div id='user' className="nav-icons" onClick={() => navigate('/user')} onDoubleClick={()=>alert('refresh')}>
                {window.location.pathname === '/user' ?
                    <img src={userOnIcon} alt="user" style={{ border: '1px solid black', borderRadius: '50%' }} /> :
                    <img src={userIcon} alt="user" />
                }
            </div>
        </div>
    );
}
export default BottomNav;