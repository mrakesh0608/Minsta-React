import { Link } from 'react-router-dom';
import { userIcon } from 'helpers/importIcons';
import 'css/User/UserList.css';
export default ({ users }) => {
    return (
        <div className='user-list'>
            {users.length === 0 ?
                <div className='center-text-in-viewport'>No Users</div> :
                users.map((user, key) =>
                    <Link to={`/user/${user.Username}`} key={key} className='user-card'>
                        <div className='userimg'><img src={userIcon} alt="user" className='icons' /></div>
                        <div className='name-username'>
                            <span className='username'>{user.Username}</span>
                            <span className='name'>{user.Name}</span>
                        </div>
                        <div><button className='follow' disabled>Follow</button></div>
                    </Link>
                )
            }
        </div>
    );
}