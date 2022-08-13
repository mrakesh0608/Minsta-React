import { Link, useNavigate} from 'react-router-dom';
import 'css/UserHeadNav.css';

import {iconPath} from 'helpers/Path';
import AddNew from 'icons/add-new.png';

import { HideScroll } from 'helpers/HandleScroll';

const OtherUserHeadNav = ({ username, setUserMore }) => {

    const navigate = useNavigate();
    return (
        <div id="user-head" className='nav-head hideOnScroll hideOnScroll-head'>
            <div className='user-head-1'>
                <div className='nav-icons' onClick={()=>{navigate(-1)}}>
                    <img src={iconPath+'left-arrow.png'} alt="left-arrow" />
                </div>
                <div>{username}</div>
            </div>
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
                    <img src={iconPath+'more.png'} alt="menu" />
                </div>
            </div>
        </div>
    );
}

export default OtherUserHeadNav;