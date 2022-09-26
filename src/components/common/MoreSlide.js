import { HideScroll } from 'helpers/HandleScroll';
import { useLogout } from 'hooks/auth/useLogout';
import { Link } from 'react-router-dom';
import ToggleDarkTheme from 'helpers/ToggleDarkTheme';


export default function MoreSlide({ setUserMore }) {

    const { logout } = useLogout();

    const CloseUserMore = () => {
        document.getElementById('user-more-list').classList.remove('ani');
        document.getElementById('user-more-list').classList.add('ani-r');

        HideScroll(false);
        setTimeout(() => {
            setUserMore(false);
        }, 500);
    };

    return (
        <div id='user-more-overlay' onClick={(e) => {
            if (e.target.id === 'user-more-overlay') CloseUserMore();
        }}>
            <div id='user-more-list' className='ani'>
                <div id='user-more-close'>
                    <div onClick={() => CloseUserMore()}></div>
                </div>
                <Link to='/user/Username/settings'>
                    <img className='more-icons' src="icons/settings.png" alt="settings" />Settings
                </Link>
                <Link to='user/Username/activity'>
                    <img className='more-icons' src="icons/activity.png" alt="activity" />Your Activity
                </Link>
                <Link to='user/Username/saved'>
                    <img className='more-icons' src="icons/save.png" alt="save" />Saved
                </Link>
                <Link to='user/Username/close-friends'>
                    <img className='more-icons more-icons-l' src="icons/friends.png" alt="close friends" />Close Friends
                </Link>
                <div onClick={() => { ToggleDarkTheme() }}>
                    <img className='more-icons' src="icons/theme.png" alt="theme" />Toggle Dark Theme
                </div>
                <div onClick={() => { CloseUserMore(); logout(); }}>
                    <img className='more-icons' src="icons/logout.png" alt="logout" />Logout
                </div>
            </div>
        </div>
    );
}