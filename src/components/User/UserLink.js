import { Link } from 'react-router-dom';
const UserLink = ({ Username }) => {
    return <Link to={`/user/${Username}`} className='Username'>{Username}</Link>;
}
export default UserLink;