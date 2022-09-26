import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuthContext } from 'hooks/context/useAuthContext';

import UserHeadNav from 'components/User/UserHeadNav';
import UserPostTag from 'components/User/UserPostTag';
import UserMeta1 from 'components/User/UserMeta1';
import UserMeta2 from 'components/User/UserMeta2';
import DisPeo from 'components/User/DisPeo';
import UserMore from 'components/User/UserMore';

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
                    <UserMeta2 Name={user.Name} Bio={user.Bio} />
                </div>
                <div className='edit-discover'>
                    <button className='edit' onClick={() => navigate('user/Username/edit-profile')}>Edit Profile</button>
                    <button className='dis' onClick={(e) => handleDisPeo(e)}>Discover People</button>
                </div>
            </div>
            {showDisPeo && <DisPeo />}
            <UserPostTag userId={user._id} token={user} />
            {userMore && <UserMore setUserMore={setUserMore} />}
        </div>
    )
}
export default User;