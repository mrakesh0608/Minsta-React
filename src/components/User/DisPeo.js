import { useEffect } from "react";
import useFetch from 'hooks/useFetch';
import { Link } from 'react-router-dom';
import { userIcon } from 'helpers/importIcons';
import 'css/User/DisPeo.css';
export default () => {

    const { fetchData, data, isError, isPending } = useFetch();
    useEffect(() => {
        fetchData({ path: '/user/userAll', method: "GET" })
    }, [])

    return (
        (data ?
            (data.length === 0 ?
                <p className='center-text'>No Users</p> :
                <div className='discover-people'>
                    {data.reverse().map((user, key) =>
                        <Link to={`/user/${user.Username}`} key={key} className='discover-people-card'>
                            <div className='userimg'><img src={userIcon} alt="user" className='icons' /></div>
                            <span className='Username'>{user.Username}</span>
                            <span className='name'>{user.Name}</span>
                        </Link>
                    )}
                </div>
            ) :
            (isError ? <div className='error'>{isError}</div> :
                (isPending &&
                    <div className='load'>Loading ...</div>
                )
            )
        )
    );
}