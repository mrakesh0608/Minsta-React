import { Link } from 'react-router-dom';
import 'css/UserHeadNav.css';

import AddNew from 'icons/add-new.png';

import { HideScroll } from 'helpers/HandleScroll';

const UserHeadNav = ({ setUserMore }) => {
    return (
        <div id="user-head" className='nav-head hideOnScroll hideOnScroll-head'>
            <div className='user-head-1' style={{ fontWeight: 600,fontSize:'20px'}}>Username</div>
            <div className='user-head-2'>
                <Link to='/add-new'>
                    <div className='nav-icons'>
                        <img src={AddNew} alt="addNew" />
                    </div>
                </Link>
                <div className='nav-icons' onClick={() => {
                    setUserMore(true);
                    HideScroll(true);
                }}>
                    <img src="icons/menu.png" alt="menu" />
                </div>
            </div>
        </div>
    );
}

export default UserHeadNav;