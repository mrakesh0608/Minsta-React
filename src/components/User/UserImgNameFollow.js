import { Link } from 'react-router-dom';
import { userIcon } from 'helpers/importsIcons';
import 'css/UserImgNameFollow.css';

const UserImgNameFollow = ({ UserName }) => {
    return (
        <div className='UserImgNameFollow'>
            <img src={userIcon} alt="user" className='icons' />
            <Link to={`/user/${UserName}`} className='username'>{UserName}</Link>
            <div>&#183;</div>
            <div>Follow</div>
        </div>
    );
}

export default UserImgNameFollow;