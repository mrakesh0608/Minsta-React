import { useAuthContext } from 'hooks/context/useAuthContext';

import { userIcon } from 'helpers/importIcons';
import FollowBtn from 'components/User/FollowBtn';
import UserLink from 'components/User/UserLink';
import 'css/User/UserImgNameFollow.css';

const UserImgNameFollow = ({ UserName, userId }) => {
    const { user: I } = useAuthContext();
    return (
        <div className='UserImgNameFollow'>
            <img src={userIcon} alt="user" className='icons' />
            <UserLink UserName={UserName} />
            {I.Username !== UserName &&
                <>
                    <div>&#183;</div>
                    <FollowBtn user={{
                        Username: UserName,
                        _id: userId
                    }} />
                </>
            }
        </div>
    );
}
export default UserImgNameFollow;