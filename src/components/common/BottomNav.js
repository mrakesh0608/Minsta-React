import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

import { HandleScroll } from 'helpers/HandleScroll';

//Icons Import-Start
import home from 'icons/Tabs/home.png';
import homeOn from 'icons/Tabs/home-on.png';

import explore from 'icons/Tabs/explore.png';
import exploreOn from 'icons/Tabs/explore-on.png';

import reel from 'icons/Tabs/reel.png';
import reelOn from 'icons/Tabs/reel-on.png';

import heart from 'icons/Tabs/heart.png';
import heartOn from 'icons/Tabs/heart-on.png';

import user from 'icons/Tabs/user.png';
import userOn from 'icons/Tabs/user-on.png';
//Icons Import-Ends

const BottomNav = () => {

    const history = useHistory();

    useEffect(() => {
        HandleScroll();
    }, []);

    return (
        <div id="bottom" className='nav-bottom hideOnScroll hideOnScroll-bottom'>
            <div id="home" className="nav-icons" onClick={() => { history.push('/') }}>
                <img src={window.location.pathname === '/' ? homeOn : home} alt="home" />
            </div>
            <div id='explore' className="nav-icons" onClick={() => { history.push('/explore') }}>
                <img src={window.location.pathname === '/explore' ? exploreOn : explore} alt="explore" />
            </div>
            <div id='reels' className="nav-icons" onClick={() => { history.push('/reels') }}>
                <img src={window.location.pathname === '/reels' ? reelOn : reel} alt="reels" />
            </div>
            <div id='notif' className="nav-icons" onClick={() => { history.push('/notif') }}>
                <img src={window.location.pathname === '/notif' ? heartOn : heart} alt="heart" />
            </div>
            <div id='user' className="nav-icons" onClick={() => { history.push('/user') }}>
                {window.location.pathname === '/user' ?
                    <img src={userOn} alt="user" style={{ border: '1px solid black', borderRadius: '50%'}} /> :
                    <img src={user} alt="user" />
                }
            </div>
        </div>
    );
}
export default BottomNav;