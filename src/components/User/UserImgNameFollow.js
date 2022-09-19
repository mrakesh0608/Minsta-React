import { useAuthContext } from 'hooks/context/useAuthContext';

import { userIcon } from 'helpers/importIcons';

import UserLink from 'components/User/UserLink';
import 'css/UserImgNameFollow.css';

const UserImgNameFollow = ({ UserName }) => {
    const { user: I } = useAuthContext();
    return (
        <div className='UserImgNameFollow'>
            <img src={userIcon} alt="user" className='icons' />
            <UserLink UserName={UserName} />
            {I.Username !== UserName &&
                <>
                    <div>&#183;</div>
                    <div>Follow</div>
                </>
            }
        </div>
    );
}
export default UserImgNameFollow;