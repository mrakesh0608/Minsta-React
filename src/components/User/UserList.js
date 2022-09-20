import { Link } from 'react-router-dom';

import { userIcon } from 'helpers/importIcons';
import FollowBtn from 'components/User/FollowBtn';
import 'css/User/UserList.css';

export default ({ users }) => {
    return (
        <div className='user-list'>
            {users.length === 0 ?
                <div className='center-text-in-viewport'>No Users</div> :
                users.map((user, key) =>
                    <div key={key} className='user-card'>
                        <Link to={`/user/${user.Username}`} className='userimg'><img src={userIcon} alt="user" className='icons' /></Link>
                        <Link to={`/user/${user.Username}`} className='name-Username'>
                            <span className='Username'>{user.Username}</span>
                            <span className='name'>{user.Name}</span>
                        </Link>
                        <div><FollowBtn user={user} /></div>
                    </div>
                )
            }
        </div>
    );
}