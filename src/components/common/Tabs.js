import BottomNav from 'components/Nav/BottomNav';

import Home from 'pages/NavBottom/Home';
import Explore from 'pages/NavBottom/Explore';
import { Reels } from 'pages/NavBottom/Reels';
import { Notif } from 'pages/NavBottom/Notif';
import User from 'pages/NavBottom/User';

const Tabs = () => {
    return (
        <>
            {window.location.pathname === '/' && <Home />}
            {window.location.pathname === '/explore' && <Explore />}
            {window.location.pathname === '/reels' && <Reels />}
            {window.location.pathname === '/notif' && <Notif />}
            {window.location.pathname === '/user' && <User />}
            <BottomNav />
        </>
    );
}
export default Tabs;