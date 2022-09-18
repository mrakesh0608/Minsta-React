import { Link } from 'react-router-dom';
import { userIcon } from 'helpers/importIcons';
import 'css/UserImgNameFollow.css';
import { useAuthContext } from 'hooks/context/useAuthContext';
const UserImgNameFollow = ({ UserName }) => {
    const { user: I } = useAuthContext();
    return (
        <div className='UserImgNameFollow'>
            <img src={userIcon} alt="user" className='icons' />
            <Link to={`/user/${UserName}`} className='username'>{UserName}</Link>
            {I.Username === UserName &&
                <>
                    <div>&#183;</div>
                    <div>Follow</div>
                </>
            }
        </div>
    );
}
export default UserImgNameFollow;