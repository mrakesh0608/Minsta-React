import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userIcon } from 'helpers/importIcons';
import useFetch from 'hooks/useFetch';
import 'css/User/UserMeta1.css';

const UserMeta1 = ({ path, user: userData }) => {
    const navigate = useNavigate();
    const { fetchData, data: user, setData, isError, isPending } = useFetch();

    useEffect(() => {
        initialize();
    }, [])
    //prop update to reflect
    useEffect(() => setData(userData), [userData]);

    const initialize = () => {
        if (path) fetchData({ path, method: "GET" })
        else setData(userData);
    }
    return (
        <>
            {isError && (isError === 'No Such User' ?
                navigate('/notfound/No Such User') :
                <div className='error'>{isError}</div>
            )}
            <div className='user-meta-1'>
                <div className='userimg'>
                    <img src={userIcon} alt="user" className='icons' />
                </div>
                <div className='network'>
                    {isPending ?
                        <div className="load">Loading ...</div> :
                        <>
                            <a href='#user-posts-tags'>
                                <div>
                                    <div className='network-count'>{user ? user.Posts : '-'}</div>
                                    <div>Posts</div>
                                </div>
                            </a>
                            <Link to={`/user/${user?.Username}/followers`}>
                                <div>
                                    <div className='network-count'>{user ? user.Followers : '-'}</div>
                                    <div>Followers</div>
                                </div>
                            </Link>
                            <Link to={`/user/${user?.Username}/followings`}>
                                <div>
                                    <div className='network-count'>{user ? user.Following : '-'}</div>
                                    <div>Following</div>
                                </div>
                            </Link >
                        </>
                    }
                </div>
            </div>
        </>
    )
}
export default UserMeta1;