import { Link } from 'react-router-dom';
import userImg from 'icons/Tabs/user.png';

const UserMeta1 = ({ user }) => {
    return (
        <div className='user-meta-1'>
            <div className="user-meta-1-1">
                <div className='userimg'>
                    <img src={userImg} alt="user" className='icons' />
                </div>
                <div className='network'>
                    <a href='#user-posts-tags'>
                        <div>
                            <div className='network-count'>{user.Posts}</div>
                            <div>Posts</div>
                        </div>
                    </a>
                    <Link to={'/user/'+user.Username+'/followers'}>
                        <div>
                            <div className='network-count'>{user.Followers}</div>
                            <div>Followers</div>
                        </div>
                    </Link>
                    <Link to={'/user/'+user.Username+'/following'}>
                        <div>
                            <div className='network-count'>{user.Following}</div>
                            <div>Following</div>
                        </div>
                    </Link >
                </div>
            </div>
            <div className='user-meta-1-2'>
                <div style={{ fontWeight: 600 }}>{user.Name}</div>
                <div className='about'>About</div>
            </div>
        </div>
    );
}

export default UserMeta1;