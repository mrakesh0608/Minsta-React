import { Link } from 'react-router-dom';
const UserLink = ({ UserName }) => {
    return <Link to={`/user/${UserName}`} className='username'>{UserName}</Link>;
}
export default UserLink;