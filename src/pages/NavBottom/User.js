import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuthContext } from 'hooks/context/useAuthContext';

import UserHeadNav from 'components/User/UserHeadNav';
import UserPostTag from 'components/User/UserPostTag';
import UserMeta1 from 'components/User/UserMeta1';
import DisPeo from 'components/User/DisPeo';
import MoreSlide from 'components/common/MoreSlide';
import 'css/User/User.css';
const User = () => {

    const navigate = useNavigate();

    const { user } = useAuthContext();
    const [userMore, setUserMore] = useState(false);

    const [showDisPeo, setShowDisPeo] = useState(false);
    const handleDisPeo = (e) => {
        if (showDisPeo) {
            setShowDisPeo(false);
            e.target.style.backgroundColor = '#EFEFEF'
        }
        else {
            setShowDisPeo(true);
            e.target.style.backgroundColor = 'lightblue'
        }
    }

    return (
        <div id="User">
            <UserHeadNav Username={user.Username} setUserMore={setUserMore} />
            <div id="User-content">
                <div className='user-meta'>
                    <UserMeta1 path={`/user?Username=${user.Username}`} />
                    <div className='user-meta-2'>
                        <div className='edit-discover'>
                            <button className='edit' onClick={() => navigate('user/Username/edit-profile')}>Edit Profile</button>
                            <button className='dis' onClick={(e) => handleDisPeo(e)}>Discover People</button>
                        </div>
                    </div>
                </div>
            </div>
            {showDisPeo && <DisPeo />}
            <UserPostTag userId={user._id} token={user} />
            {userMore && <MoreSlide setUserMore={setUserMore} />}
        </div>
    )
}
export default User;