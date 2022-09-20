import { useAuthContext } from 'hooks/context/useAuthContext';

import { userIcon } from 'helpers/importIcons';
import FollowBtn from 'components/User/FollowBtn';
import UserLink from 'components/User/UserLink';
import 'css/User/UserImgNameFollow.css';

const UserImgNameFollow = ({ Username, userId }) => {
    const { user: I } = useAuthContext();
    return (
        <div className='UserImgNameFollow'>
            <img src={userIcon} alt="user" className='icons' />
            <UserLink Username={Username} />
            {I.Username !== Username &&
                <>
                    <div>&#183;</div>
                    <FollowBtn user={{
                        Username: Username,
                        _id: userId
                    }} />
                </>
            }
        </div>
    );
}
export default UserImgNameFollow;